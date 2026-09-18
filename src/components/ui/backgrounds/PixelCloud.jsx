import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Color,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three';

import './PixelCloud.css';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// Ported from Aceternity UI's Cloud Shader (domain-warped billow noise,
// asymmetric dome-top/flat-base envelope, self-shadowing via a second
// density sample toward the sun), then pixelated: fragCoord is snapped to
// a chunky grid before any sampling, and both the density field and its
// self-shadow occlusion are quantized into flat steps instead of smooth
// gradients - together that turns the soft photographic clouds into
// flat-shaded, blocky pixel-art ones while keeping the original cloud
// silhouettes and drift.
const fragmentShader = `
precision highp float;

varying vec2 vUv;

uniform vec2 uResolution;
uniform float uTime;
uniform float uCount;
uniform vec3 uCloudColor;
uniform vec3 uSkyTopColor;
uniform vec3 uSkyBottomColor;
uniform float uPixelSize;

const mat2 R = mat2(0.80, 0.60, -0.60, 0.80);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(41.31, 289.17))) * 26737.367);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * vnoise(p);
    p = R * p * 2.03 + 19.19;
    amp *= 0.5;
  }
  return sum;
}

// billow noise: sharp puffy ridges, like cauliflower cloud tops
float billow(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    sum += amp * (1.0 - abs(2.0 * vnoise(p) - 1.0));
    p = R * p * 2.11 + 13.37;
    amp *= 0.5;
  }
  return sum;
}

// raw density for one cloud at point p
float cloudDensity(vec2 p, vec2 c, vec2 r, float seed, float t) {
  vec2 q = p - c;

  // envelope: dome above the center, flat base below
  float ry = q.y > 0.0 ? r.y : r.y * 0.42;
  float env = 1.0 - length(vec2(q.x / r.x, q.y / ry));
  if (env < -0.35) return 0.0;

  vec2 dp = q * (2.4 / r.x) + seed;
  dp += 0.6 * vec2(
    fbm(dp * 1.4 + t * 0.04),
    fbm(dp * 1.4 + 7.7 - t * 0.03)
  );
  float detail = billow(dp * 1.6);

  return env + (detail - 0.62) * 0.62;
}

// shades one cloud and blends it over the current color - quantized into
// flat density/occlusion steps so the shading reads as posterized bands.
vec3 shadeCloud(vec3 color, vec3 sky, vec2 p, vec2 c, vec2 r, float seed, float t, float dist) {
  float d = cloudDensity(p, c, r, seed, t);
  d = floor(d / 0.1) * 0.1;
  if (d < 0.02) return color;

  float dUp = cloudDensity(p + vec2(0.0, r.y * 0.55), c, r, seed, t);
  float occl = clamp((dUp - d) * 1.1 + d * 0.55, 0.0, 1.0);
  occl = floor(occl * 3.0) / 3.0;

  vec3 lit = uCloudColor * 1.04;
  vec3 shadow = mix(uCloudColor * 0.60, sky, 0.38);
  vec3 cloudCol = mix(lit, shadow, occl * 0.85);

  float alpha = step(0.02, d);
  cloudCol = mix(cloudCol, sky, dist * 0.35);

  return mix(color, cloudCol, alpha);
}

// one drifting cloud: horizontal wrap + gentle vertical bob
vec3 cloudPass(vec3 color, vec3 sky, vec2 p, float aspect, float t,
               float spd, float phase, float y, vec2 r, float seed, float dist) {
  float cx = mix(-r.x - 0.25, aspect + r.x + 0.25, fract(t * spd + phase));
  float cy = y + sin(t * 0.05 + phase * 6.2831) * 0.012;
  return shadeCloud(color, sky, p, vec2(cx, cy), r, seed, t, dist);
}

void main() {
  // Snap to a chunky pixel grid FIRST so every downstream sample stays
  // blocky - this is what turns the original shader's smooth clouds into
  // pixel art instead of soft photographic ones.
  vec2 pixelCoord = floor(gl_FragCoord.xy / uPixelSize) * uPixelSize;
  vec2 uv = pixelCoord / uResolution;

  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);
  float t = uTime;

  vec3 sky = mix(uSkyBottomColor, uSkyTopColor, uv.y);
  vec3 color = sky;

  // faint haze band near the horizon
  color = mix(color, uSkyBottomColor * 1.06, smoothstep(0.35, 0.0, uv.y) * 0.5);

  // far layer: small, high, slow
  if (uCount > 5.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.006, 0.10, 0.84, vec2(0.20, 0.10), 43.7, 1.0);
  }
  if (uCount > 4.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.008, 0.62, 0.73, vec2(0.24, 0.12), 71.3, 0.85);
  }

  // middle layer
  if (uCount > 3.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.011, 0.33, 0.60, vec2(0.34, 0.16), 17.3, 0.55);
  }
  if (uCount > 2.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.013, 0.80, 0.47, vec2(0.30, 0.15), 29.9, 0.45);
  }

  // near layer: big, low, fast
  if (uCount > 1.5) {
    color = cloudPass(color, sky, p, aspect, t, 0.016, 0.05, 0.35, vec2(0.46, 0.20), 91.1, 0.15);
  }
  color = cloudPass(color, sky, p, aspect, t, 0.020, 0.48, 0.20, vec2(0.56, 0.24), 57.2, 0.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function hexToVector3(hex) {
  const threeColor = new Color(hex);
  return new Vector3(threeColor.r, threeColor.g, threeColor.b);
}

export default function PixelCloud({
  cloudColor = '#fbf8f2',
  skyTopColor = '#3876ba',
  skyBottomColor = '#8cbfe8',
  speed = 1,
  count = 6,
  pixelSize = 6,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const speedRef = useRef(speed);
  speedRef.current = speed;

  const cloudColorVector = useMemo(() => hexToVector3(cloudColor), [cloudColor]);
  const skyTopColorVector = useMemo(() => hexToVector3(skyTopColor), [skyTopColor]);
  const skyBottomColorVector = useMemo(() => hexToVector3(skyBottomColor), [skyBottomColor]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const material = materialRef.current;
      if (!container || !renderer || !material) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    }, 100);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false
    });

    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(container.offsetWidth, container.offsetHeight) },
        uCount: { value: count },
        uCloudColor: { value: cloudColorVector.clone() },
        uSkyTopColor: { value: skyTopColorVector.clone() },
        uSkyBottomColor: { value: skyBottomColorVector.clone() },
        uPixelSize: { value: pixelSize }
      }
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const startTime = performance.now();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isVisibleRef.current) {
        material.uniforms.uTime.value = ((performance.now() - startTime) * 0.001) * speedRef.current;
        renderer.render(scene, camera);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
      geometry.dispose();
      material.dispose();
      rendererRef.current = null;
      materialRef.current = null;
    };
  }, [handleResize]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uCount.value = count;
    material.uniforms.uPixelSize.value = pixelSize;
    material.uniforms.uCloudColor.value.copy(cloudColorVector);
    material.uniforms.uSkyTopColor.value.copy(skyTopColorVector);
    material.uniforms.uSkyBottomColor.value.copy(skyBottomColorVector);
  }, [count, pixelSize, cloudColorVector, skyTopColorVector, skyBottomColorVector]);

  return <div ref={containerRef} className={`pixel-cloud-container ${className}`} style={style} />;
}
