import { useCallback, useEffect, useMemo, useRef } from 'react';
import {
  Color,
  HalfFloatType,
  LinearFilter,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  RGBAFormat,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
  WebGLRenderTarget
} from 'three';

import './WaterCaustics.css';

const fullscreenVertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

// ---------- PASS 1: water / caustics (renders to an HDR half-float target) ----------
const waterFragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uDeepColor;
uniform vec3 uMidColor;
uniform vec3 uLineColor;
uniform vec3 uEdgeColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRefract;
uniform float uRipple;

float hash1(vec2 p) {
  return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453123);
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

// Classic layered-refraction caustic net. The large -250.0 offset is
// load-bearing: it sets the scale of p relative to the intensity term
// below, which is what produces genuine branching light filaments
// instead of noise or a saturated wash. Do not simplify it to a small
// centered range -- it changes the ratio and breaks the pattern.
float caustic(vec2 uv, float t, float tileMult, float intensity) {
  const float TAU = 6.28318530718;
  vec2 p = mod(uv * tileMult * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;

  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - 3.5 / float(n + 1));
    i = p + vec2(cos(tt - i.x) + sin(tt + i.y), sin(tt - i.y) + cos(tt + i.x));
    float sx = sin(i.x + tt) / intensity;
    float cy = cos(i.y + tt) / intensity;
    c += 1.0 / length(vec2(p.x / sx, p.y / cy));
  }
  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspectUv = uv;
  aspectUv.x *= uResolution.x / uResolution.y;

  float t = uTime * uSpeed;

  // Three overlapping layers at different scale/speed/intensity: fine
  // sharp net, a medium counter-flowing net, and a large slow layer
  // that creates bigger sunlit patches -- real pool caustics are never
  // one uniform frequency, they're several wave trains overlapping.
  float causticA = caustic(aspectUv, t * 0.6, uScale, uRefract);
  float causticB = caustic(aspectUv, t * -0.42, uScale * 1.7, uRefract * 1.6);
  float causticC = caustic(aspectUv, t * 0.23, uScale * 0.45, uRefract * 0.5);
  float c = causticA * 0.62 + causticB * 0.42 + causticC * 0.3;

  vec2 lightDir = normalize(vec2(-0.35, 0.55));
  float gradientT = clamp(dot(uv - 0.5, lightDir) + 0.5, 0.0, 1.0);
  vec3 base = mix(uDeepColor, uMidColor, gradientT);

  float breathe = fbm(aspectUv * 0.6 + t * 0.06);
  base *= mix(0.94, 1.04, breathe);

  float microRipple = fbm(aspectUv * 40.0 + t * 1.4) - 0.5;
  base += microRipple * uRipple;

  vec3 causticColor = mix(uLineColor, uEdgeColor, smoothstep(0.15, 0.55, c));
  causticColor = mix(causticColor, vec3(1.0), smoothstep(0.55, 1.1, c));

  vec3 color = mix(base, causticColor, clamp(c * 1.1, 0.0, 1.0));

  // Extra HDR punch on the very brightest peaks, left unclamped here
  // on purpose -- this pass writes to a half-float target so values
  // over 1.0 survive into the bloom extraction pass instead of being
  // clipped immediately.
  color += vec3(1.1, 1.15, 1.2) * pow(clamp(c, 0.0, 3.0), 3.0) * 0.6;

  float vignette = smoothstep(1.25, 0.35, length(uv - 0.5) * 1.2);
  color *= mix(0.9, 1.0, vignette);

  gl_FragColor = vec4(color, 1.0);
}
`;

// ---------- PASS 2: bright extraction ----------
const brightFragmentShader = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uResolution;
uniform float uThreshold;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec3 color = texture2D(uTex, uv).rgb;
  vec3 bright = max(color - vec3(uThreshold), 0.0);
  gl_FragColor = vec4(bright, 1.0);
}
`;

// ---------- PASS 3/4: separable gaussian blur ----------
const blurFragmentShader = `
precision highp float;
uniform sampler2D uTex;
uniform vec2 uResolution;
uniform vec2 uDirection;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 texel = uDirection / uResolution;
  vec3 sum = vec3(0.0);
  float weights[5];
  weights[0] = 0.227027;
  weights[1] = 0.1945946;
  weights[2] = 0.1216216;
  weights[3] = 0.054054;
  weights[4] = 0.016216;
  sum += texture2D(uTex, uv).rgb * weights[0];
  for (int i = 1; i < 5; i++) {
    float fi = float(i);
    sum += texture2D(uTex, uv + texel * fi).rgb * weights[i];
    sum += texture2D(uTex, uv - texel * fi).rgb * weights[i];
  }
  gl_FragColor = vec4(sum, 1.0);
}
`;

// ---------- PASS 5: composite (base + bloom, chromatic fringe, filmic tonemap) ----------
const compositeFragmentShader = `
precision highp float;
uniform sampler2D uBase;
uniform sampler2D uBloom;
uniform vec2 uResolution;
uniform float uBloomStrength;
uniform float uExposure;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // Tiny chromatic fringe on the bloom sample only, radiating from
  // center -- a subtle lens-like fringing around the brightest
  // highlights, the way real overexposed water sparkle photographs.
  vec2 dir = uv - 0.5;
  float fringe = 0.0015;
  float bloomR = texture2D(uBloom, uv + dir * fringe).r;
  float bloomG = texture2D(uBloom, uv).g;
  float bloomB = texture2D(uBloom, uv - dir * fringe).b;
  vec3 bloom = vec3(bloomR, bloomG, bloomB);

  vec3 base = texture2D(uBase, uv).rgb;
  vec3 color = base + bloom * uBloomStrength;

  // Filmic-ish exposure tonemap so highlights roll off softly instead
  // of clipping to a hard flat white disc.
  color = vec3(1.0) - exp(-color * uExposure);

  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

function hexToVector3(hex) {
  const c = new Color(hex);
  return new Vector3(c.r, c.g, c.b);
}

function makeFullscreenScene(material) {
  const scene = new Scene();
  const geometry = new PlaneGeometry(2, 2);
  scene.add(new Mesh(geometry, material));
  return { scene, geometry };
}

function makeRenderTarget(w, h) {
  return new WebGLRenderTarget(Math.max(1, w), Math.max(1, h), {
    minFilter: LinearFilter,
    magFilter: LinearFilter,
    format: RGBAFormat,
    type: HalfFloatType,
    depthBuffer: false,
    stencilBuffer: false
  });
}

export default function WaterCaustics({
  deepColor = '#0A6FA8',
  midColor = '#189CEA',
  lineColor = '#49C6FE',
  edgeColor = '#FFFFFF',
  speed = 0.35,
  scale = 1.0,
  refract = 0.005,
  ripple = 0.025,
  bloomStrength = 0.8,
  threshold = 0.7,
  exposure = 1.15,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const pixelRatioRef = useRef(1);

  const waterMaterialRef = useRef(null);
  const brightMaterialRef = useRef(null);
  const blurHMaterialRef = useRef(null);
  const blurVMaterialRef = useRef(null);
  const compositeMaterialRef = useRef(null);

  const scenesRef = useRef(null); // { water, bright, blurH, blurV, composite }
  const cameraRef = useRef(null);
  const targetsRef = useRef(null); // { water, bright, blurH, blurV }

  const deepColorVector = useMemo(() => hexToVector3(deepColor), [deepColor]);
  const midColorVector = useMemo(() => hexToVector3(midColor), [midColor]);
  const lineColorVector = useMemo(() => hexToVector3(lineColor), [lineColor]);
  const edgeColorVector = useMemo(() => hexToVector3(edgeColor), [edgeColor]);

  const buildTargets = useCallback((width, height) => {
    const pr = pixelRatioRef.current;
    const fw = Math.max(1, Math.floor(width * pr));
    const fh = Math.max(1, Math.floor(height * pr));
    const bw = Math.max(1, Math.floor(fw / 2));
    const bh = Math.max(1, Math.floor(fh / 2));

    const prevTargets = targetsRef.current;
    if (prevTargets) {
      prevTargets.water.dispose();
      prevTargets.bright.dispose();
      prevTargets.blurH.dispose();
      prevTargets.blurV.dispose();
    }

    const targets = {
      water: makeRenderTarget(fw, fh),
      bright: makeRenderTarget(bw, bh),
      blurH: makeRenderTarget(bw, bh),
      blurV: makeRenderTarget(bw, bh)
    };
    targetsRef.current = targets;

    const water = waterMaterialRef.current;
    const bright = brightMaterialRef.current;
    const blurH = blurHMaterialRef.current;
    const blurV = blurVMaterialRef.current;
    const composite = compositeMaterialRef.current;

    if (water) water.uniforms.uResolution.value.set(fw, fh);
    if (bright) bright.uniforms.uResolution.value.set(bw, bh);
    if (blurH) blurH.uniforms.uResolution.value.set(bw, bh);
    if (blurV) blurV.uniforms.uResolution.value.set(bw, bh);
    if (composite) composite.uniforms.uResolution.value.set(fw, fh);
  }, []);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = window.setTimeout(() => {
      const container = containerRef.current;
      const renderer = rendererRef.current;
      if (!container || !renderer) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      buildTargets(w, h);
    }, 100);
  }, [buildTargets]);

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
    cameraRef.current = camera;

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false,
      depth: false
    });

    const pr = Math.min(window.devicePixelRatio, 2);
    pixelRatioRef.current = pr;
    renderer.setPixelRatio(pr);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const waterMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: waterFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(1, 1) },
        uDeepColor: { value: deepColorVector.clone() },
        uMidColor: { value: midColorVector.clone() },
        uLineColor: { value: lineColorVector.clone() },
        uEdgeColor: { value: edgeColorVector.clone() },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uRefract: { value: refract },
        uRipple: { value: ripple }
      }
    });
    waterMaterialRef.current = waterMaterial;

    const brightMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: brightFragmentShader,
      uniforms: {
        uTex: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uThreshold: { value: threshold }
      }
    });
    brightMaterialRef.current = brightMaterial;

    const blurHMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: blurFragmentShader,
      uniforms: {
        uTex: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uDirection: { value: new Vector2(1, 0) }
      }
    });
    blurHMaterialRef.current = blurHMaterial;

    const blurVMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: blurFragmentShader,
      uniforms: {
        uTex: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uDirection: { value: new Vector2(0, 1) }
      }
    });
    blurVMaterialRef.current = blurVMaterial;

    const compositeMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: compositeFragmentShader,
      uniforms: {
        uBase: { value: null },
        uBloom: { value: null },
        uResolution: { value: new Vector2(1, 1) },
        uBloomStrength: { value: bloomStrength },
        uExposure: { value: exposure }
      }
    });
    compositeMaterialRef.current = compositeMaterial;

    const water = makeFullscreenScene(waterMaterial);
    const bright = makeFullscreenScene(brightMaterial);
    const blurH = makeFullscreenScene(blurHMaterial);
    const blurV = makeFullscreenScene(blurVMaterial);
    const composite = makeFullscreenScene(compositeMaterial);
    scenesRef.current = { water, bright, blurH, blurV, composite };

    buildTargets(container.offsetWidth, container.offsetHeight);

    window.addEventListener('resize', handleResize);

    const startTime = performance.now();
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      const targets = targetsRef.current;
      if (!targets) return;

      waterMaterial.uniforms.uTime.value = (performance.now() - startTime) * 0.001;

      renderer.setRenderTarget(targets.water);
      renderer.render(water.scene, camera);

      brightMaterial.uniforms.uTex.value = targets.water.texture;
      renderer.setRenderTarget(targets.bright);
      renderer.render(bright.scene, camera);

      blurHMaterial.uniforms.uTex.value = targets.bright.texture;
      renderer.setRenderTarget(targets.blurH);
      renderer.render(blurH.scene, camera);

      blurVMaterial.uniforms.uTex.value = targets.blurH.texture;
      renderer.setRenderTarget(targets.blurV);
      renderer.render(blurV.scene, camera);

      compositeMaterial.uniforms.uBase.value = targets.water.texture;
      compositeMaterial.uniforms.uBloom.value = targets.blurV.texture;
      renderer.setRenderTarget(null);
      renderer.render(composite.scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      const targets = targetsRef.current;
      if (targets) {
        targets.water.dispose();
        targets.bright.dispose();
        targets.blurH.dispose();
        targets.blurV.dispose();
      }
      targetsRef.current = null;

      [water, bright, blurH, blurV, composite].forEach(({ geometry }) => geometry.dispose());
      [waterMaterial, brightMaterial, blurHMaterial, blurVMaterial, compositeMaterial].forEach((m) => m.dispose());

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();

      rendererRef.current = null;
      waterMaterialRef.current = null;
      brightMaterialRef.current = null;
      blurHMaterialRef.current = null;
      blurVMaterialRef.current = null;
      compositeMaterialRef.current = null;
      scenesRef.current = null;
      cameraRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleResize, buildTargets]);

  // Live-update uniforms when props change, without tearing down the
  // renderer/render-targets/animation loop.
  useEffect(() => {
    const water = waterMaterialRef.current;
    if (!water) return;

    water.uniforms.uSpeed.value = speed;
    water.uniforms.uScale.value = scale;
    water.uniforms.uRefract.value = refract;
    water.uniforms.uRipple.value = ripple;
    water.uniforms.uDeepColor.value.copy(deepColorVector);
    water.uniforms.uMidColor.value.copy(midColorVector);
    water.uniforms.uLineColor.value.copy(lineColorVector);
    water.uniforms.uEdgeColor.value.copy(edgeColorVector);
  }, [speed, scale, refract, ripple, deepColorVector, midColorVector, lineColorVector, edgeColorVector]);

  useEffect(() => {
    const bright = brightMaterialRef.current;
    if (bright) bright.uniforms.uThreshold.value = threshold;
  }, [threshold]);

  useEffect(() => {
    const composite = compositeMaterialRef.current;
    if (!composite) return;
    composite.uniforms.uBloomStrength.value = bloomStrength;
    composite.uniforms.uExposure.value = exposure;
  }, [bloomStrength, exposure]);

  return <div ref={containerRef} className={`water-caustics-container ${className}`} style={style} />;
}
