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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

import './WaterCaustics.css';

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uDeepColor;
uniform vec3 uMidColor;
uniform vec3 uLineColor;
uniform vec3 uEdgeColor;
uniform float uSpeed;
uniform float uScale;
uniform float uIntensity;

float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123);
}

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash1(i);
  float b = hash1(i + vec2(1.0, 0.0));
  float c = hash1(i + vec2(0.0, 1.0));
  float d = hash1(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    sum += amp * valueNoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return sum;
}

// Organic caustic cell field via Voronoi (F2 - F1 gives thin bright
// borders tracing irregular polygonal cells; the nearest-seed offset lets
// each cell get its own soft directional "lit dome" shading — brighter
// toward a fixed light direction, darker on the far side — instead of a
// flat fill, so the cells read as smooth, sunlit bulges rather than a
// flat crack pattern). Seed points drift over time so cells slowly flow.
void voronoiCell(vec2 uv, float t, vec2 lightDir, out float edge, out float highlight) {
  vec2 p = floor(uv);
  vec2 f = fract(uv);

  float minDist1 = 8.0;
  float minDist2 = 8.0;
  vec2 nearestOffset = vec2(0.0);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 neighbor = vec2(float(x), float(y));
      vec2 cellId = p + neighbor;
      vec2 point = hash2(cellId);
      point += 0.55 * sin(t * 0.3 + 6.2831 * point + cellId.yx * 0.6);
      vec2 diff = neighbor + point - f;
      float dist = length(diff);

      if (dist < minDist1) {
        minDist2 = minDist1;
        minDist1 = dist;
        nearestOffset = diff;
      } else if (dist < minDist2) {
        minDist2 = dist;
      }
    }
  }

  edge = minDist2 - minDist1;

  // Shift the query point toward the light direction before measuring
  // distance to the seed, so the brightest spot inside the cell sits off
  // to one side rather than dead-center — a cheap fake of a lit, rounded
  // surface rather than a flat disc.
  float litDist = length(nearestOffset + lightDir * 0.4);
  highlight = 1.0 - smoothstep(0.0, 0.85, litDist);
}

// Sparse, crisp water-bubble highlights: a small hard-edged disc with a
// bright rim, not a soft blurred blob, so they read as tiny points of
// light rather than a smear. Each one flickers in and out on its own
// slow noise-driven timer, distinct from the caustic net.
float sunGlints(vec2 uv, float t) {
  vec2 grid = uv * 6.0;
  vec2 cellId = floor(grid);
  vec2 local = fract(grid) - 0.5;

  vec2 jitter = hash2(cellId) - 0.5;
  local -= jitter * 0.75;

  float flicker = valueNoise(cellId * 1.7 + t * 0.08);
  float glintActive = smoothstep(0.6, 0.92, flicker);

  float radius = 0.05 + hash1(cellId + 3.1) * 0.03;
  float d = length(local);

  // Hard-edged core plus a thin bright rim just outside it — crisp, not
  // feathered — so it reads as a distinct droplet of light.
  float core = 1.0 - step(radius, d);
  float rim = (1.0 - step(radius * 1.6, d)) - (1.0 - step(radius * 1.15, d));
  float bubble = clamp(core + rim * 0.7, 0.0, 1.0);

  return bubble * glintActive;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspectUv = uv;
  aspectUv.x *= uResolution.x / uResolution.y;

  float t = uTime * uSpeed;

  // Two-pass flow-noise domain warp (classic Perlin "domain warping"):
  // warp the coordinates with one FBM field, then warp again using that
  // result to offset the sampling point of a second FBM field. This is
  // what gives continuous, swirling, fluid-like motion — like the
  // liquid/silk references — instead of independently wobbling points.
  vec2 warp1 = vec2(
    fbm(aspectUv * 0.8 + t * 0.03),
    fbm(aspectUv * 0.8 + 5.3 - t * 0.025)
  );
  vec2 warp2 = vec2(
    fbm(aspectUv * 0.8 + warp1 * 1.4 + t * 0.02 + 1.7),
    fbm(aspectUv * 0.8 + warp1 * 1.4 - t * 0.017 + 9.2)
  );
  vec2 flowWarp = warp2 - 0.5;
  vec2 flowUv = aspectUv + flowWarp * 0.5;

  vec2 uvA = flowUv * uScale;
  vec2 uvB = mat2(0.7, -0.7, 0.7, 0.7) * flowUv * uScale * 1.6 + 5.2;

  vec2 lightDir = normalize(vec2(-0.4, 0.6));

  float edgeA, highlightA;
  voronoiCell(uvA, t * 0.6, lightDir, edgeA, highlightA);
  float causticA = pow(1.0 - smoothstep(0.0, 0.08, edgeA), 2.8);

  float edgeB, highlightB;
  voronoiCell(uvB, t * -0.4, lightDir, edgeB, highlightB);
  float causticB = pow(1.0 - smoothstep(0.0, 0.05, edgeB), 3.2);

  float caustic = clamp((causticA * 0.6 + causticB * 0.4) * uIntensity, 0.0, 1.0);

  // The water body's own shading is continuous, driven by the same flow
  // field as everything else — never locked to individual cell IDs, or
  // it reads as a mosaic of separately-colored tiles instead of one
  // body of water. A plain light-to-white gradient toward where the
  // light lands, plus a little large-scale flow-noise breathing, is all
  // the base needs; the bright net alone should carry the cell shapes.
  float gradientT = clamp(dot(uv - 0.5, lightDir) + 0.5, 0.0, 1.0);
  vec3 gradientBase = mix(uDeepColor, uMidColor, gradientT);
  gradientBase = mix(gradientBase, vec3(1.0), pow(gradientT, 2.2) * 0.5);

  float breathe = fbm(aspectUv * 0.5 + flowWarp * 0.3 + t * 0.04);
  vec3 base = mix(gradientBase, gradientBase * 1.08, breathe);

  // Large, slow-rolling depth pockets: a big soft noise field darkens or
  // lightens broad patches of the water independent of the cell net, the
  // way real light shafts pool unevenly over an uneven lake bed instead
  // of lighting everything the same amount.
  float depthField = fbm(aspectUv * 0.35 - flowWarp * 0.2 + t * 0.02);
  base *= mix(0.82, 1.06, depthField);

  // A subtle rolling wave: two long, slow sine ripples add a gentle sheen
  // that sweeps across the whole surface, on top of the caustic net.
  float wave = sin(aspectUv.x * 2.2 + aspectUv.y * 1.3 + t * 0.9) * 0.02
             + sin(aspectUv.x * 3.6 - aspectUv.y * 2.0 - t * 0.6) * 0.015;
  base += wave;

  vec3 causticColor = mix(uLineColor, uEdgeColor, smoothstep(0.2, 0.9, caustic));
  vec3 softWhite = mix(uEdgeColor, vec3(1.0), 0.7);
  causticColor = mix(causticColor, softWhite, smoothstep(0.9, 1.0, caustic));

  vec3 color = mix(base, causticColor, caustic * 0.85);

  float glint = sunGlints(aspectUv, t);
  color += softWhite * glint * 0.55;

  float vignette = smoothstep(1.2, 0.3, length(uv - 0.5) * 1.25);
  color *= mix(0.85, 1.0, vignette);

  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function hexToVector3(hex) {
  const threeColor = new Color(hex);
  return new Vector3(threeColor.r, threeColor.g, threeColor.b);
}

export default function WaterCaustics({
  deepColor = '#2E7EA0',
  midColor = '#6BB4D4',
  lineColor = '#B3E2EF',
  edgeColor = '#EAFAFD',
  speed = 0.16,
  scale = 7.5,
  intensity = 1.0,
  bloom = false,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef(null);
  const composerRef = useRef(null);
  const materialRef = useRef(null);
  const resizeTimeoutRef = useRef(null);

  const deepColorVector = useMemo(() => hexToVector3(deepColor), [deepColor]);
  const midColorVector = useMemo(() => hexToVector3(midColor), [midColor]);
  const lineColorVector = useMemo(() => hexToVector3(lineColor), [lineColor]);
  const edgeColorVector = useMemo(() => hexToVector3(edgeColor), [edgeColor]);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      const composer = composerRef.current;
      const material = materialRef.current;
      if (!container || !renderer || !material) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      composer?.setSize(w, h);
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
        uDeepColor: { value: deepColorVector.clone() },
        uMidColor: { value: midColorVector.clone() },
        uLineColor: { value: lineColorVector.clone() },
        uEdgeColor: { value: edgeColorVector.clone() },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uIntensity: { value: intensity }
      }
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    scene.add(new Mesh(geometry, material));

    let composer = null;
    if (bloom) {
      composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const bloomPass = new UnrealBloomPass(
        new Vector2(container.offsetWidth, container.offsetHeight),
        0.6,
        0.4,
        0.85
      );
      composer.addPass(bloomPass);
      composerRef.current = composer;
    }

    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (isVisibleRef.current) {
        material.uniforms.uTime.value = (performance.now() - startTime) * 0.001;
        if (composer) {
          composer.render();
        } else {
          renderer.render(scene, camera);
        }
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      composer?.dispose();
      composerRef.current = null;
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
  }, [handleResize, bloom]);

  useEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.uniforms.uSpeed.value = speed;
    material.uniforms.uScale.value = scale;
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uDeepColor.value.copy(deepColorVector);
    material.uniforms.uMidColor.value.copy(midColorVector);
    material.uniforms.uLineColor.value.copy(lineColorVector);
    material.uniforms.uEdgeColor.value.copy(edgeColorVector);
  }, [speed, scale, intensity, deepColorVector, midColorVector, lineColorVector, edgeColorVector]);

  return <div ref={containerRef} className={`water-caustics-container ${className}`} style={style} />;
}
