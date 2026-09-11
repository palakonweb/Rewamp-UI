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
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uSkyColor;
uniform vec3 uCloudShadowColor;
uniform vec3 uCloudHighlightColor;
uniform float uSpeed;
uniform float uPixelSize;
uniform float uGrain;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return v;
}

void main() {
  // Snap to a chunky pixel grid FIRST so every downstream noise sample
  // stays blocky — this is what makes the clouds read as pixel art
  // instead of a smooth soft-edged blob.
  vec2 uv = gl_FragCoord.xy;
  vec2 pixelUv = floor(uv / uPixelSize) * uPixelSize;
  vec2 p = pixelUv / uResolution;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * uSpeed;

  // Two FBM layers drifting sideways at different speeds/scales give a
  // cheap parallax: a dominant foreground mass plus smaller distant puffs.
  float layer1 = fbm(p * 3.0 + vec2(t * 0.6, 0.0));
  float layer2 = fbm(p * 5.0 - vec2(t * 1.1, 0.0) + 50.0);
  float clouds = max(layer1 - 0.15, layer2 - 0.25);

  // Hard thresholds (not smoothstep) posterize the field into exactly
  // three flat bands — sky, shadow underside, lit highlight — with no
  // gradient between them.
  vec3 color = uSkyColor;
  if (clouds > 0.28) color = uCloudShadowColor;
  if (clouds > 0.40) color = uCloudHighlightColor;

  float grain = hash(gl_FragCoord.xy + uTime) * uGrain - (uGrain * 0.5);
  color += grain;

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function hexToVector3(hex) {
  const threeColor = new Color(hex);
  return new Vector3(threeColor.r, threeColor.g, threeColor.b);
}

export default function PixelCloud({
  skyColor = '#4FADF5',
  cloudShadowColor = '#95D2EF',
  cloudHighlightColor = '#F5F5F5',
  speed = 0.03,
  pixelSize = 6,
  grain = 0.04,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const skyColorVector = useMemo(() => hexToVector3(skyColor), [skyColor]);
  const cloudShadowColorVector = useMemo(() => hexToVector3(cloudShadowColor), [cloudShadowColor]);
  const cloudHighlightColorVector = useMemo(() => hexToVector3(cloudHighlightColor), [cloudHighlightColor]);

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
        uSkyColor: { value: skyColorVector.clone() },
        uCloudShadowColor: { value: cloudShadowColorVector.clone() },
        uCloudHighlightColor: { value: cloudHighlightColorVector.clone() },
        uSpeed: { value: speed },
        uPixelSize: { value: pixelSize },
        uGrain: { value: grain }
      }
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isVisibleRef.current) {
        material.uniforms.uTime.value = (performance.now() - startTime) * 0.001;
        renderer.render(scene, camera);
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
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

    material.uniforms.uSpeed.value = speed;
    material.uniforms.uPixelSize.value = pixelSize;
    material.uniforms.uGrain.value = grain;
    material.uniforms.uSkyColor.value.copy(skyColorVector);
    material.uniforms.uCloudShadowColor.value.copy(cloudShadowColorVector);
    material.uniforms.uCloudHighlightColor.value.copy(cloudHighlightColorVector);
  }, [speed, pixelSize, grain, skyColorVector, cloudShadowColorVector, cloudHighlightColorVector]);

  return <div ref={containerRef} className={`pixel-cloud-container ${className}`} style={style} />;
}
