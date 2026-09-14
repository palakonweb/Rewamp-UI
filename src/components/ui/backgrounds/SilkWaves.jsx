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
import './SilkWaves.css';

const fullscreenVertexShader = `
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const silkFragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uShadowColor;
uniform vec3 uVioletColor;
uniform vec3 uHighlightColor;
uniform vec3 uAmbientColor;
uniform float uSpeed;
uniform float uScale;
uniform float uIntensity;

// 2D rotation
vec2 rotate(vec2 p, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

// Multi-tendril satin heightfield with true diagonal parabolic swags matching Recording 2026-09-14 152443.mp4
float getSilkHeight(vec2 p, float t) {
  // Diagonal projection: u is along bottom-left to top-right; v is across to top-left
  float u = (p.x + p.y) * 0.7071;
  float v = (p.y - p.x) * 0.7071;

  // Fluid breathing wave
  float w1 = sin(u * 1.35 + t * 0.85) * 0.22 + cos(v * 1.60 - t * 0.65) * 0.16;
  float w2 = cos(u * 2.10 - t * 1.05) * 0.12 + sin(v * 2.40 + t * 0.75) * 0.10;
  float uw = u + w1;
  float vw = v + w2;

  // Parabolic tendril coordinate:
  // Folds curve in inverted U-shapes pointing toward the upper-right (positive u)
  float swagCoord = uw - 0.78 * (vw * vw);

  // 3-4 nested parabolic swags
  float fold = sin(swagCoord * 3.60 - t * 0.80 + sin(vw * 2.2 + t * 0.6) * 0.55);

  // Sharp, sculpted satin ridge with broad parabolic valley
  float ridge = pow(clamp(fold * 0.5 + 0.5, 0.0, 1.0), 2.2);

  // Secondary fine satin ripples
  float micro = sin(u * 4.8 + v * 4.2 + t * 1.2) * 0.05 * ridge;
  return ridge + micro;
}

// Numerical 3D surface normal for realistic directional fabric lighting
vec3 getSilkNormal(vec2 p, float t) {
  float eps = 0.015;
  float hC = getSilkHeight(p, t);
  float hR = getSilkHeight(p + vec2(eps, 0.0), t);
  float hU = getSilkHeight(p + vec2(0.0, eps), t);
  vec2 grad = vec2(hR - hC, hU - hC) / eps;
  return normalize(vec3(-grad * 0.85, 1.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * (2.8 * uScale);

  float t = uTime * uSpeed * 0.75;

  // Surface height and normal
  float h = getSilkHeight(p, t);
  vec3 norm = getSilkNormal(p, t);

  // Directional illumination from upper-left (skims across tendril ridges)
  vec3 lightDir = normalize(vec3(-0.75, 0.70, 0.55));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);

  // Diffuse shading: lit upper-flank vs dark lower-flank
  float diff = max(dot(norm, lightDir), 0.0);

  // Specular satin sheen along ridge crests
  vec3 halfVec = normalize(lightDir + viewDir);
  float spec = pow(max(dot(norm, halfVec), 0.0), 16.0);

  // Grazing Fresnel rim light along ridges
  float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 2.2);

  // Exact color palette matching Recording 2026-09-14 152443.mp4:
  vec3 colBlack        = vec3(0.008, 0.003, 0.020); // Velvet pitch black
  vec3 colIndigo       = vec3(0.07, 0.02, 0.32);    // Deep indigo shadow
  vec3 colRoyalViolet  = vec3(0.24, 0.16, 0.95);   // #3D29F2 royal electric violet
  vec3 colBrightViolet = vec3(0.42, 0.28, 0.99);   // Luminous violet flank
  vec3 colLavender     = vec3(0.72, 0.80, 0.98);   // Silver-lavender ridge sheen
  vec3 colWhiteGlint   = vec3(0.98, 1.00, 1.00);   // Glistening ridge highlight
  vec3 colTealAmbient  = vec3(0.55, 0.75, 0.85);   // Soft pale cyan/seafoam in lower-left

  // Underlying spatial ambient wash:
  // Left side is luminous cyan (lower) and electric violet (upper); right side drops into velvet black
  vec3 bgTopLeft = colRoyalViolet;
  vec3 bgBottomLeft = colTealAmbient;
  vec3 bgLeft = mix(bgBottomLeft, bgTopLeft, clamp(uv.y * 1.1 - 0.1, 0.0, 1.0));
  float leftLight = smoothstep(0.85, 0.15, uv.x);
  vec3 ambientField = bgLeft * leftLight * 0.45;

  // Shading composition:
  float foldBody = smoothstep(0.08, 0.65, h);
  vec3 col = mix(colBlack, colIndigo, smoothstep(0.04, 0.38, h));
  // Add ambient illumination on the left
  col += ambientField * (1.0 - h * 0.35);

  // Lit flank: rich royal electric violet
  col = mix(col, colRoyalViolet, foldBody * (diff * 0.60 + 0.45));
  col = mix(col, colBrightViolet, smoothstep(0.35, 0.82, h) * (diff * 0.70 + 0.35));

  // Crest sheen: silver-lavender satin highlights along ridge lines
  float sheen = (spec * 0.85 + fresnel * 0.45) * pow(h, 1.8);
  col = mix(col, colLavender, clamp(sheen * 0.85, 0.0, 1.0));

  // Pure white glints on peak ridge lines
  col += colWhiteGlint * pow(spec, 2.0) * pow(h, 1.6) * 0.65;

  // Natural dark falloff towards bottom-right corner (exact match to video)
  float darkFalloff = smoothstep(0.20, 1.1, length(uv - vec2(0.92, 0.15)));
  col *= mix(0.45, 1.0, 1.0 - darkFalloff * 0.65);

  // Soft vignette
  float vignette = smoothstep(1.5, 0.6, length(uv - 0.5));
  col *= mix(0.92, 1.0, vignette);

  // Filmic exposure tonemapping
  col = vec3(1.0) - exp(-col * (1.25 * uIntensity));

  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

function hexToVector3(hex) {
  const c = new Color(hex);
  return new Vector3(c.r, c.g, c.b);
}

export default function SilkWaves({
  speed = 0.45,
  scale = 1.0,
  intensity = 1.0,
  shadowColor = '#080314',
  violetColor = '#461CEB',
  highlightColor = '#B2CEF5',
  ambientColor = '#2F6A82',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animationRef = useRef(0);
  const isVisibleRef = useRef(true);

  const shadowVec = useMemo(() => hexToVector3(shadowColor), [shadowColor]);
  const violetVec = useMemo(() => hexToVector3(violetColor), [violetColor]);
  const highlightVec = useMemo(() => hexToVector3(highlightColor), [highlightColor]);
  const ambientVec = useMemo(() => hexToVector3(ambientColor), [ambientColor]);

  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    const material = materialRef.current;
    if (!container || !renderer || !material) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
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
      fragmentShader: silkFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vector2(container.offsetWidth * pr, container.offsetHeight * pr) },
        uShadowColor: { value: shadowVec.clone() },
        uVioletColor: { value: violetVec.clone() },
        uHighlightColor: { value: highlightVec.clone() },
        uAmbientColor: { value: ambientVec.clone() },
        uSpeed: { value: speed },
        uScale: { value: scale },
        uIntensity: { value: intensity }
      }
    });
    materialRef.current = material;

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    window.addEventListener('resize', handleResize);

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

  // Update uniforms when props change
  useEffect(() => {
    const mat = materialRef.current;
    if (!mat) return;
    mat.uniforms.uSpeed.value = speed;
    mat.uniforms.uScale.value = scale;
    mat.uniforms.uIntensity.value = intensity;
    mat.uniforms.uShadowColor.value.copy(shadowVec);
    mat.uniforms.uVioletColor.value.copy(violetVec);
    mat.uniforms.uHighlightColor.value.copy(highlightVec);
    mat.uniforms.uAmbientColor.value.copy(ambientVec);
  }, [speed, scale, intensity, shadowVec, violetVec, highlightVec, ambientVec]);

  return <div ref={containerRef} className={`silk-waves-container ${className}`} style={style} />;
}
