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

const fullscreenVertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const waveFragmentShader = `
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

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

  float t = uTime * uSpeed * 0.75;

  float angle = -0.32;
  mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
  vec2 rUv = rot * p * uScale;

  vec2 warp = vec2(
    sin(rUv.y * 2.5 + rUv.x * 1.5 + t * 0.45) * 0.16 + cos(rUv.x * 3.2 - t * 0.35) * 0.09,
    cos(rUv.x * 2.4 - rUv.y * 1.6 + t * 0.40) * 0.16 + sin(rUv.y * 3.4 + t * 0.52) * 0.09
  );
  vec2 q = rUv + warp * uRefract * 18.0;

  float waveA = q.y + sin(q.x * 2.0 + t * 0.65) * 0.22 + cos(q.x * 1.2 - t * 0.45) * 0.15 + sin(q.x * 3.8 + t * 0.85) * 0.05;
  float distA = abs(waveA);
  float coreA = exp(-distA * distA * 75.0);
  float haloA = exp(-distA * distA * 14.0);

  float waveB = q.y - 0.26 + sin(q.x * 1.7 - t * 0.55) * 0.22 + cos(q.x * 2.6 + t * 0.70) * 0.10;
  float distB = abs(waveB);
  float coreB = exp(-distB * distB * 35.0);
  float haloB = exp(-distB * distB * 8.5);

  float waveC = q.y + 0.24 + cos(q.x * 1.9 + t * 0.48) * 0.22 + sin(q.x * 3.0 - t * 0.62) * 0.12;
  float distC = abs(waveC);
  float coreC = exp(-distC * distC * 32.0);
  float haloC = exp(-distC * distC * 8.0);

  vec3 colBg = mix(vec3(0.04, 0.03, 0.07), vec3(0.09, 0.08, 0.13), clamp(p.y * 0.8 + 0.5, 0.0, 1.0));

  // Rewamp Brand Lilac & Lavender Palette
  vec3 colDeepLilac = vec3(0.48, 0.42, 0.62); // #7A6B94
  vec3 colAccentLilac = vec3(0.61, 0.56, 0.72); // #9C8EB8
  vec3 colStrongLilac = vec3(0.76, 0.71, 0.85); // #C1B4D8
  vec3 colSoftLavender = vec3(0.90, 0.87, 0.95); // #E4DDF0
  vec3 colPureWhite = vec3(1.8, 1.85, 2.0);

  float edgeMask = smoothstep(1.3, 0.2, length(p * vec2(0.85, 1.2)));

  vec3 color = colBg;
  color += mix(colDeepLilac, colAccentLilac, coreC) * (haloC * 0.75 + coreC * 0.70) * edgeMask;
  color += mix(colStrongLilac, colSoftLavender, coreB) * (haloB * 0.75 + coreB * 0.75) * edgeMask;
  color += colSoftLavender * haloA * 0.85 * edgeMask;
  color += colPureWhite * (coreA * 1.8 + pow(coreA, 3.0) * 1.5) * edgeMask;

  float vignette = smoothstep(1.2, 0.35, length(uv - 0.5) * 1.2);
  color *= mix(0.75, 1.0, vignette);

  gl_FragColor = vec4(color, 1.0);
}
`;

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

const compositeFragmentShader = `
precision highp float;
uniform sampler2D uBase;
uniform sampler2D uBloom;
uniform vec2 uResolution;
uniform float uBloomStrength;
uniform float uExposure;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 dir = uv - 0.5;
  float fringe = 0.0015;
  float bloomR = texture2D(uBloom, uv + dir * fringe).r;
  float bloomG = texture2D(uBloom, uv).g;
  float bloomB = texture2D(uBloom, uv - dir * fringe).b;
  vec3 bloom = vec3(bloomR, bloomG, bloomB);

  vec3 base = texture2D(uBase, uv).rgb;
  vec3 color = base + bloom * uBloomStrength;
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

export default function GradientWaveBackground({
  deepColor = '#070818',
  midColor = '#15143A',
  lineColor = '#E11D74',
  edgeColor = '#7C3AED',
  speed = 0.40,
  scale = 1.0,
  refract = 0.045,
  ripple = 0.015,
  bloomStrength = 0.9,
  threshold = 0.65,
  exposure = 1.2,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);
  const rendererRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const pixelRatioRef = useRef(1);

  const waveMaterialRef = useRef(null);
  const brightMaterialRef = useRef(null);
  const blurHMaterialRef = useRef(null);
  const blurVMaterialRef = useRef(null);
  const compositeMaterialRef = useRef(null);

  const scenesRef = useRef(null);
  const cameraRef = useRef(null);
  const targetsRef = useRef(null);

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

    const wave = waveMaterialRef.current;
    const bright = brightMaterialRef.current;
    const blurH = blurHMaterialRef.current;
    const blurV = blurVMaterialRef.current;
    const composite = compositeMaterialRef.current;

    if (wave) wave.uniforms.uResolution.value.set(fw, fh);
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

    const waveMaterial = new ShaderMaterial({
      vertexShader: fullscreenVertexShader,
      fragmentShader: waveFragmentShader,
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
    waveMaterialRef.current = waveMaterial;

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

    const water = makeFullscreenScene(waveMaterial);
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

      waveMaterial.uniforms.uTime.value = (performance.now() - startTime) * 0.001;

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
      [waveMaterial, brightMaterial, blurHMaterial, blurVMaterial, compositeMaterial].forEach((m) => m.dispose());

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      renderer.forceContextLoss();

      rendererRef.current = null;
      waveMaterialRef.current = null;
      brightMaterialRef.current = null;
      blurHMaterialRef.current = null;
      blurVMaterialRef.current = null;
      compositeMaterialRef.current = null;
      scenesRef.current = null;
      cameraRef.current = null;
    };
  }, [handleResize, buildTargets]);

  useEffect(() => {
    const wave = waveMaterialRef.current;
    if (!wave) return;

    wave.uniforms.uSpeed.value = speed;
    wave.uniforms.uScale.value = scale;
    wave.uniforms.uRefract.value = refract;
    wave.uniforms.uRipple.value = ripple;
    wave.uniforms.uDeepColor.value.copy(deepColorVector);
    wave.uniforms.uMidColor.value.copy(midColorVector);
    wave.uniforms.uLineColor.value.copy(lineColorVector);
    wave.uniforms.uEdgeColor.value.copy(edgeColorVector);
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

  return <div ref={containerRef} className={`w-full h-full relative overflow-hidden ${className}`} style={style} />;
}
