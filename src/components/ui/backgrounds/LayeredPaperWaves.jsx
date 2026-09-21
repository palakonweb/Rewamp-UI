import { useEffect, useRef, useMemo, useCallback } from 'react';
import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  Mesh,
  ShaderMaterial,
  Vector2,
  Vector3,
  Color
} from 'three';
import './LayeredPaperWaves.css';

const fullscreenVertexShader = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const paperFragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uAmplitude;

// 2D rotation
vec2 rotate(vec2 p, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

// Pseudo-random noise for fine paper texture grain
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * (2.2 * uScale);

  // Diagonal angle matching Recording 2026-09-14 154048.mp4 (~-39 degrees)
  vec2 rotUv = rotate(p, -0.68);

  float t = uTime * uSpeed * 0.75;

  // Background base: soft warm peach-pink into powder sky blue gradient
  vec3 bgSky   = vec3(0.89, 0.95, 1.00); // #E3F2FF
  vec3 bgPeach = vec3(0.99, 0.88, 0.91); // #FDDEE8
  vec3 col = mix(bgPeach, bgSky, clamp(uv.y * 0.7 + uv.x * 0.5, 0.0, 1.0));

  // 7 Distinct Papercraft Strata (ordered from deepest layer 6 up to top foreground layer 0)
  // Palette sampled directly from Recording 2026-09-14 154048.mp4:
  vec3 palette[7];
  palette[6] = vec3(0.92, 0.46, 0.66); // Rich rose-pink (bottom-right)
  palette[5] = vec3(0.96, 0.65, 0.78); // Pastel blush rose
  palette[4] = vec3(0.84, 0.70, 0.88); // Dusty lilac-mauve
  palette[3] = vec3(0.72, 0.77, 0.94); // Soft lilac
  palette[2] = vec3(0.78, 0.85, 0.97); // Muted periwinkle
  palette[1] = vec3(0.86, 0.92, 0.99); // Soft sky periwinkle
  palette[0] = vec3(0.94, 0.97, 1.00); // Crisp powder blue (dominant in top-left)

  // Layer base positions: Layer 0 covers upper-diagonal; steps down to Layer 6 in lower-right
  float basePos[7];
  basePos[6] = -1.20;
  basePos[5] = -0.85;
  basePos[4] = -0.55;
  basePos[3] = -0.25;
  basePos[2] =  0.05;
  basePos[1] =  0.35;
  basePos[0] =  0.65;

  // Render back-to-front (deepest layer 6 up to top layer 0)
  for (int i = 6; i >= 0; i--) {
    float fi = float(i);
    float bp = basePos[i];

    // Continuous undulating wave boundary for each paper layer
    float wave = sin(rotUv.x * 1.65 + t * 0.90 + fi * 0.85) * (0.15 * uAmplitude)
               + cos(rotUv.x * 3.10 - t * 0.70 + fi * 1.15) * (0.05 * uAmplitude)
               + sin(rotUv.x * 0.85 + t * 0.45) * 0.07;

    // Boundary edge: paper exists where rotUv.y >= edge
    float edge = bp + wave;
    float dist = edge - rotUv.y; // dist < 0 on paper; dist > 0 beneath paper (in shadow)

    // 1. Soft Realistic Drop Shadow cast downward onto lower layers (when dist > 0)
    float shadowWidth = 0.22 + fi * 0.015;
    float shadowMask = smoothstep(shadowWidth, 0.0, dist);
    // Soft mauve-indigo ambient paper shadow
    vec3 shadowColor = vec3(0.42, 0.38, 0.48);
    col = mix(col, col * shadowColor, shadowMask * 0.45);

    // 2. Paper Surface & Crisp Cut Edge (when dist <= 0)
    // Anti-aliased boundary alpha
    float aa = 0.003;
    float layerAlpha = smoothstep(aa, -aa, dist);

    // Subtle paper gradient across each sheet (lighter at cut edge, darker toward interior)
    vec3 layerCol = palette[i];
    float gradientShade = clamp(-dist * 0.15, 0.0, 1.0);
    layerCol = mix(layerCol, layerCol * 0.96, gradientShade);

    // Crisp 3D paper bevel highlight along the cut rim
    float bevel = smoothstep(-0.015, -0.001, dist) * smoothstep(0.004, -0.001, dist) * 0.35;
    layerCol += vec3(bevel);

    // Composite current paper layer over background / lower layers
    col = mix(col, layerCol, layerAlpha);
  }

  // Very subtle fine-art archival paper grain
  float grain = (hash(gl_FragCoord.xy) - 0.5) * 0.020;
  col += grain;

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

export default function LayeredPaperWaves({
  speed = 0.40,
  scale = 1.0,
  amplitude = 1.0,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const material = materialRef.current;
    if (!container || !renderer || !material) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w === 0 || h === 0) return;
    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(w, h);
    material.uniforms.uResolution.value.set(w * pr, h * pr);
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

    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new Scene();
    const geometry = new PlaneGeometry(2, 2);

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false
    });

    const pr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(pr);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const material = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: paperFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(container.offsetWidth * pr, container.offsetHeight * pr) },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uAmplitude: { value: amplitude }
      }
    });
    materialRef.current = material;

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener('resize', handleResize);
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const startTime = performance.now();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      material.uniforms.uTime.value = (performance.now() - startTime) * 0.001;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();
      rendererRef.current = null;
      materialRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize]);

  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uSpeed.value = speed;
    mat.uniforms.uScale.value = scale;
    mat.uniforms.uAmplitude.value = amplitude;
  }, [speed, scale, amplitude]);

  return <div ref={containerRef} className={`layered-paper-waves-container ${className}`} style={style} />;
}
