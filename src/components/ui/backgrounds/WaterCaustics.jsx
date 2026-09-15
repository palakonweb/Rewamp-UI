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

// Authentic 3D Liquid Swimming Pool Water Simulation
// Uses iterative wave-refraction convergence (no Voronoi) to produce real curved fluid caustic ribbons

// Multi-octave 3D surface wave height field
float getWaterHeight(vec2 p, float t) {
  float h = 0.0;
  // Primary fluid wave swells
  h += sin(p.x * 1.35 + p.y * 0.75 + t * 1.25) * 0.40;
  h += sin(-p.x * 0.85 + p.y * 1.45 - t * 1.10) * 0.35;
  h += sin(p.x * 1.10 - p.y * 1.30 + t * 1.40) * 0.30;
  h += sin(-p.x * 1.40 - p.y * 0.65 - t * 0.95) * 0.25;

  // Secondary surface ripples
  h += sin(p.x * 2.8 + p.y * 2.1 - t * 2.2) * 0.12;
  h += sin(-p.x * 2.4 + p.y * 2.7 + t * 2.0) * 0.10;
  h += sin(p.x * 4.2 - p.y * 3.6 + t * 2.8) * 0.06;
  return h;
}

// Surface wave normal for 3D Fresnel sky reflection and specular glints
vec3 getSurfaceNormal(vec2 p, float t) {
  float eps = 0.020;
  float hL = getWaterHeight(p - vec2(eps, 0.0), t);
  float hR = getWaterHeight(p + vec2(eps, 0.0), t);
  float hD = getWaterHeight(p - vec2(0.0, eps), t);
  float hU = getWaterHeight(p + vec2(0.0, eps), t);
  vec2 grad = vec2(hR - hL, hU - hD) / (2.0 * eps);
  return normalize(vec3(-grad * 0.50, 1.0));
}

// Fluid wave-convergence caustic algorithm
// Computes how light rays bend through moving wave surfaces and focus onto the pool bottom
float getWaveCaustic(vec2 p, float t, float scale, float tightness) {
  vec2 uv = p * scale;

  // Wave displacement iteration 1
  vec2 d1 = vec2(
    sin(uv.y * 1.5 + t * 1.15) * 0.42 + sin(uv.x * 2.8 - t * 1.3) * 0.18,
    cos(uv.x * 1.4 - t * 1.05) * 0.42 + cos(uv.y * 2.5 + t * 1.2) * 0.18
  );
  vec2 p2 = uv + d1;

  // Wave displacement iteration 2 (creates organic fluid loop curvature)
  vec2 d2 = vec2(
    sin(p2.y * 2.2 - t * 1.4 + 1.2) * 0.28,
    cos(p2.x * 2.0 + t * 1.3 - 0.8) * 0.28
  );
  vec2 p3 = p2 + d2;

  // Wave crest convergence: light focuses where wave slopes meet
  float s1 = sin(p3.x * 2.1 + p3.y * 1.2 + t * 1.5);
  float s2 = sin(-p3.x * 1.4 + p3.y * 2.3 - t * 1.3);
  float s3 = sin(p3.x * 1.8 - p3.y * 1.9 + t * 1.6);
  float s4 = sin(-p3.x * 2.2 - p3.y * 1.1 - t * 1.2);

  float convergence = (s1 + s2 + s3 + s4) * 0.25;

  // Tight focal ribbon with soft blurred halo
  float ribbon = clamp(1.0 - abs(convergence), 0.0, 1.0);

  // Slender, thin caustic ribbon profile with soft blurred edges
  float coreMin = mix(0.76, 0.86, tightness);
  float haloMin = mix(0.56, 0.72, tightness);
  float core = smoothstep(coreMin, 0.99, ribbon);
  float halo = smoothstep(haloMin, 0.96, ribbon) * 0.26;

  // Soft secondary cross-ripples (thin and subtle)
  float crossRibbon = sin(p3.x * 4.2 - p3.y * 3.4 + t * 2.2) * sin(p3.x * 3.1 + p3.y * 4.5 - t * 2.0);
  float micro = smoothstep(0.78, 0.98, crossRibbon * 0.5 + 0.5) * 0.08;

  return core + halo + micro;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // Perspective camera angle looking down into shallow swimming pool
  // (distant water at top recedes with tighter wave ripples; foreground has broad fluid loops)
  float persp = mix(1.24, 0.86, uv.y);
  vec2 aspectUv = (uv - vec2(0.5, 0.28)) * persp + vec2(0.5, 0.28);
  aspectUv.x *= uResolution.x / uResolution.y;

  float t = uTime * uSpeed * 0.75;

  // 1. 3D Surface Water Normals & Refraction
  vec3 surfNorm = getSurfaceNormal(aspectUv * 3.2, t);
  vec2 floorUv = aspectUv + surfNorm.xy * 0.024; // subtle liquid refraction

  // Top waves thinness: naturally thinner and more delicate towards the top (perspective distance)
  float topThinness = mix(0.35, 0.85, uv.y);

  // 2. Triple-Scale Fluid Caustic Networks
  // Primary main dancing loops
  float c1 = getWaveCaustic(floorUv, t, 11.0 * uScale, topThinness);
  // Secondary intersecting shimmering loops (top waves: thinner with tightness 0.75)
  float c2 = getWaveCaustic(floorUv + vec2(2.8, -1.9), -t * 0.95 + 4.0, 17.5 * uScale, 0.75);
  // Delicate micro capillary network (tightness 0.85)
  float c3 = getWaveCaustic(floorUv * 1.4 + vec2(-1.5, 2.3), t * 1.15 + 1.5, 26.0 * uScale, 0.85);

  // Halved secondary & micro top wave contributions
  float caustics = c1 * 0.92 + c2 * 0.06 + c3 * 0.03;

  // Top surface waves modulation (opacity halved towards top of water)
  float topWaveOpacity = mix(0.50, 0.88, 1.0 - uv.y);
  caustics = mix(caustics * 0.72, caustics, topWaveOpacity);

  // Modulate caustic brightness by surface swell wave
  float swell = sin(aspectUv.x * 2.6 - aspectUv.y * 1.8 + t * 0.85) * 0.08 + 0.92;
  caustics *= swell;

  // 3. Authentic Sunlit Caribbean Swimming Pool Water Palette:
  // Sampled directly from user video (Recording 2026-09-14 153504.mp4)
  vec3 colDeep    = vec3(0.14, 0.52, 0.64);   // Deep clear shadow
  vec3 colMid     = vec3(0.24, 0.68, 0.78);   // Luminous pool water
  vec3 colBright  = vec3(0.44, 0.82, 0.90);   // Shallow aqua floor
  vec3 colHalo    = vec3(0.78, 0.94, 0.98);   // Soft radiant caustic halo
  vec3 colWhite   = vec3(1.00, 1.00, 1.00);   // Pure caustic white core
  vec3 colSky     = vec3(0.68, 0.92, 0.98);   // Sky reflection on wave crests
  vec3 colPeak    = vec3(1.8, 1.95, 2.1);     // Overdrive for HDR bloom

  // Gentle pool floor depth gradient with subtle wave ripple lighting (halved amplitude)
  float waveShade = getWaterHeight(aspectUv * 2.2, t * 0.5) * 0.006;
  float depthGrad = clamp(uv.y * 0.35 + 0.62 + waveShade, 0.0, 1.0);
  vec3 water = mix(colDeep, colMid, depthGrad);

  // Ambient pool illumination from caustic scatter
  water = mix(water, colBright, clamp(caustics * 0.20, 0.0, 1.0));

  // Blend caustic light lines: glowing cyan halo to soft white core
  vec3 causticColor = mix(colHalo, colWhite, smoothstep(0.30, 0.90, caustics));
  vec3 color = mix(water, causticColor, clamp(caustics * 0.86, 0.0, 1.0));

  // Over-bright peaks for realistic soft bloom pass
  color += colPeak * pow(clamp(caustics, 0.0, 2.5), 2.2) * 0.35;

  // 4. 3D Surface Water Highlights: Reduced opacity Fresnel sky reflection (halved to 0.03)
  float fresnel = pow(clamp(1.0 - surfNorm.z, 0.0, 1.0), 3.0);
  color = mix(color, colSky, fresnel * 0.03);

  // 5. Gentle sunlight specular glints along moving surface wave crests (halved to 0.035)
  vec3 sunDir = normalize(vec3(0.20, 0.45, 0.85));
  vec3 halfVec = normalize(sunDir + vec3(0.0, 0.0, 1.0));
  float spec = pow(max(dot(surfNorm, halfVec), 0.0), 40.0) * 0.035;
  color += vec3(0.96, 1.0, 1.0) * spec;

  // Soft subtle vignette
  float vignette = smoothstep(1.4, 0.55, length(uv - 0.5));
  color *= mix(0.98, 1.0, vignette);

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
  // Soft blur filter spread for silky light diffusion
  vec2 texel = (uDirection / uResolution) * 2.6;
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
  float fringe = 0.0018;
  float bloomR = texture2D(uBloom, uv + dir * fringe).r;
  float bloomG = texture2D(uBloom, uv).g;
  float bloomB = texture2D(uBloom, uv - dir * fringe).b;
  vec3 bloom = vec3(bloomR, bloomG, bloomB);

  vec3 base = texture2D(uBase, uv).rgb;
  vec3 color = base + bloom * (uBloomStrength * 0.90);

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
  deepColor = '#104E63',
  midColor = '#22A1BD',
  lineColor = '#4DE0F8',
  edgeColor = '#FFFFFF',
  speed = 0.35,
  scale = 1.0,
  refract = 0.006,
  ripple = 0.025,
  bloomStrength = 0.85,
  threshold = 0.72,
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
