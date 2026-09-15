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

// Compute distance to fold centers and height
// Folds are 3 diagonal curved plumes matching Recording 2026-09-14 152443.mp4
void getFoldProfile(vec2 p, float t, out float hTotal, out float sharpRidge, out float fold1, out float fold2, out float fold3, out float spine) {
  // Rotate by ~ -42 degrees (-0.733 rad) to align along the diagonal
  float cosA = 0.7431;
  float sinA = -0.6691;
  vec2 rotP = vec2(p.x * cosA - p.y * sinA, p.x * sinA + p.y * cosA);
  float u = rotP.x; // along diagonal (bottom-left to top-right)
  float v = rotP.y; // across diagonal (bottom-right to top-left)

  // Fluid breathing drift
  float flowTime = t * 0.40;
  float waveU = u - flowTime * 0.24;
  float waveV = v;

  // Gentle organic domain distortion
  float dU = sin(waveV * 2.6 + flowTime * 0.75) * 0.09 + cos(waveU * 1.8 - flowTime * 0.5) * 0.05;
  float dV = cos(waveU * 2.2 - flowTime * 0.65) * 0.08 + sin(waveV * 3.1 + flowTime * 0.85) * 0.04;

  float uW = waveU + dU;
  float vW = waveV + dV;

  // Parabolic fold arch: curves toward top-right
  float arch = -0.16 * uW * uW + 0.07 * uW;
  float fCoord = vW - arch;

  // 1. Left broad ethereal dome (glowing seafoam/cyan in lower-left)
  float dist1 = fCoord - 0.52;
  fold1 = exp(-dist1 * dist1 * 14.0) * 0.88;

  // 2. Center plume with razor-sharp knife-edge crease (star fold)
  float dist2 = fCoord - 0.16;
  float flank = (dist2 > 0.0) ? exp(-dist2 * 7.5) : exp(dist2 * 11.5);
  float plumeFade = smoothstep(-1.2, -0.3, uW) * smoothstep(1.3, 0.4, uW);
  fold2 = flank * (1.10 + 0.30 * plumeFade);

  // Razor-sharp spine detection for crisp silver glint line
  sharpRidge = exp(-abs(dist2) * 55.0) * plumeFade;
  spine = sharpRidge;

  // 3. Right outer satin fold
  float dist3 = fCoord - (-0.18);
  fold3 = exp(-pow(abs(dist3), 1.4) * 16.0) * 0.95;

  // Combined heightfield
  hTotal = fold1 + fold2 + fold3;

  // Subtle micro-sheen ripples
  float micro = sin(uW * 8.5 + vW * 4.2 + flowTime * 1.5) * 0.02 * clamp(hTotal, 0.0, 1.0);
  hTotal += micro;
}

float getSilkHeight(vec2 p, float t) {
  float h, sr, f1, f2, f3, sp;
  getFoldProfile(p, t, h, sr, f1, f2, f3, sp);
  return h;
}

// Finite-difference normal for high-fidelity fabric lighting
vec3 getSilkNormal(vec2 p, float t) {
  float eps = 0.006;
  float hC = getSilkHeight(p, t);
  float hR = getSilkHeight(p + vec2(eps, 0.0), t);
  float hU = getSilkHeight(p + vec2(0.0, eps), t);
  vec2 grad = vec2(hR - hC, hU - hC) / eps;
  return normalize(vec3(-grad * 1.25, 1.0));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  // Normalized coordinate frame
  vec2 p = (uv - vec2(0.50, 0.50)) * vec2(aspect, 1.0) * (1.28 * uScale);

  float t = uTime * uSpeed * 0.75;

  // Evaluate fold components
  float h, sharpRidge, fold1, fold2, fold3, spine;
  getFoldProfile(p, t, h, sharpRidge, fold1, fold2, fold3, spine);
  vec3 norm = getSilkNormal(p, t);

  // Lighting directions: key light from top-left
  vec3 lightDir = normalize(vec3(-0.70, 0.65, 0.60));
  vec3 viewDir = vec3(0.0, 0.0, 1.0);
  vec3 halfVec = normalize(lightDir + viewDir);

  // Tangent along the diagonal fold direction for anisotropic silk reflection
  float cosA = 0.7431;
  float sinA = -0.6691;
  vec3 tangent = normalize(vec3(cosA, sinA, 0.15));

  // Anisotropic specular: highlight stretches along silk threads
  float dotTH = dot(tangent, halfVec);
  float aniso = sqrt(max(0.0, 1.0 - dotTH * dotTH));
  float anisoSpec = pow(aniso, 16.0);

  // Standard diffuse and Blinn specular
  float diff = max(dot(norm, lightDir), 0.0);
  float blinnSpec = pow(max(dot(norm, halfVec), 0.0), 20.0);
  float fresnel = pow(1.0 - max(dot(norm, viewDir), 0.0), 2.2);

  // High-vibrancy palette matching Recording 2026-09-14 152443.mp4
  vec3 colVelvetBlack  = vec3(0.010, 0.005, 0.025); // Pitch black shadow
  vec3 colDarkIndigo   = vec3(0.04, 0.015, 0.22);   // Valley shadow
  vec3 colRoyalBlue    = vec3(0.18, 0.10, 0.94);   // Saturated royal blue-violet (#2E1AF0)
  vec3 colBrightViolet = vec3(0.38, 0.18, 0.99);   // Luminous electric violet (#612EFC)
  vec3 colSeafoamCyan  = vec3(0.48, 0.76, 0.90);   // Ethereal glowing cyan/seafoam in lower-left
  vec3 colSilverLilac  = vec3(0.85, 0.91, 0.99);   // Silver crest luster
  vec3 colWhiteGlint   = vec3(1.00, 1.00, 1.00);   // Razor crease pure white spine

  // 1. Base Velvet Shadow
  vec3 col = colVelvetBlack;

  // 2. Spatial ambient lighting:
  // Lower-left glows with luminous seafoam cyan; upper-left is rich electric royal violet; right drops to dark abyss
  float leftInfluence = smoothstep(0.78, 0.05, uv.x);
  float bottomInfluence = smoothstep(0.72, 0.0, 1.0 - uv.y);
  vec3 ambientWash = mix(colRoyalBlue * 0.70, colSeafoamCyan, bottomInfluence);
  col += ambientWash * leftInfluence * 0.75;

  // 3. Fold 1 (Left Lobe): Glowing seafoam-to-royal dome
  vec3 fold1Color = mix(colRoyalBlue, colSeafoamCyan, bottomInfluence * 0.85 + 0.15);
  col = mix(col, fold1Color, fold1 * (diff * 0.40 + 0.60));

  // 4. Fold 2 (Center Plume - with razor edge):
  // Left flank is lit by royal blue / bright violet; right drops into dark indigo groove
  vec3 fold2Lit = mix(colRoyalBlue, colBrightViolet, diff * 0.60 + 0.40);
  col = mix(col, colDarkIndigo, smoothstep(0.08, 0.35, fold2) * (1.0 - diff * 0.85));
  col = mix(col, fold2Lit, smoothstep(0.20, 0.95, fold2) * (diff * 0.70 + 0.40));

  // 5. Fold 3 (Right Outer Lobe):
  // Electric violet body sloping into dark velvet on the right
  vec3 fold3Color = mix(colDarkIndigo, colBrightViolet, diff * 0.75 + 0.25);
  col = mix(col, fold3Color, fold3 * (diff * 0.70 + 0.30));

  // 6. Specular Sheen (Anisotropic satin luster across crests)
  float sheenIntensity = (anisoSpec * 0.80 + blinnSpec * 0.50 + fresnel * 0.30);
  col = mix(col, colSilverLilac, clamp(sheenIntensity * pow(h, 1.3) * 0.85, 0.0, 1.0));

  // 7. Razor-sharp silver crease along Fold 2 ridge
  float razorLine = sharpRidge * (blinnSpec * 0.75 + anisoSpec * 0.60 + 0.55);
  col += colWhiteGlint * clamp(razorLine * 1.35, 0.0, 1.0);

  // 8. Natural shadow roll-off towards bottom-right corner (framing abyss)
  float darkCorner = smoothstep(0.25, 1.05, length(uv - vec2(0.95, 0.10)));
  col *= mix(0.25, 1.0, 1.0 - darkCorner * 0.85);

  // 9. Tonemapping with rich saturation preservation
  col = vec3(1.0) - exp(-col * (1.35 * uIntensity));

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
