export const singularityFlareSource = `import React, { useEffect, useRef, useMemo } from 'react';
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

const vertexShader = \`
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
\`;

const fragmentShader = \`
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uPinchX;
uniform float uFlareHeight;
uniform float uFlowIntensity;
uniform float uSparkleIntensity;

uniform vec3 uColorBg;
uniform vec3 uColorCore;
uniform vec3 uColorCyan;
uniform vec3 uColorBlue;
uniform vec3 uColorViolet;
uniform vec3 uColorMagenta;
uniform vec3 uColorBeam;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = rot * p * 2.1 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;

  // Strictly fixed center line (zero silhouette movement)
  float centerY = 0.5;
  
  float pinchX = clamp(uPinchX, 0.35, 0.85);
  float halfH0 = clamp(uFlareHeight * 0.5, 0.25, 0.52);

  float distY = abs(uv.y - centerY);
  float signedY = (uv.y - centerY);
  float t = uTime * uSpeed * 0.65;

  float H_x = 0.0;
  float normX = uv.x / pinchX;

  if (uv.x < pinchX) {
    float taper = 1.0 - normX;
    H_x = halfH0 * pow(taper, 2.35) * (1.0 + 0.35 * normX);
  }

  // Beam Region (x >= pinchX)
  if (uv.x >= pinchX) {
    float beamDist = distY;
    float coreLine = exp(-beamDist * beamDist * 18000.0);
    float beamGlow = exp(-beamDist * 42.0) * 0.75;
    float travelingSoliton = exp(-pow(fract((uv.x - pinchX) * 1.5 - t * 0.8) * 6.0 - 1.0, 2.0) * 8.0);
    
    vec3 beamCol = mix(uColorBeam, uColorMagenta, 0.45);
    beamCol = mix(beamCol, uColorCore, coreLine * (0.85 + 0.15 * travelingSoliton));
    
    float beamFade = smoothstep(1.0, pinchX, uv.x * 0.1 + 0.9);
    float totalBeam = (coreLine + beamGlow * 0.65 + travelingSoliton * 0.35 * coreLine) * beamFade;

    vec3 finalColor = mix(uColorBg, beamCol, clamp(totalBeam, 0.0, 1.0));
    gl_FragColor = vec4(finalColor, 1.0);
    return;
  }

  // Inside Horn Region (x < pinchX)
  float insideDist = H_x - distY;
  float normalizedV = clamp(distY / max(H_x, 0.0001), 0.0, 1.0);

  float accel = 1.0 + pow(normX, 2.0) * 2.5;
  vec2 flowUV = vec2(uv.x * 3.5 - t * 1.2 * accel, signedY * 2.8 / max(H_x * 2.0, 0.1));
  
  float f1 = fbm(flowUV * 1.2 + vec2(t * 0.4, -t * 0.2));
  float f2 = fbm(flowUV * 2.4 - vec2(-t * 0.6, t * 0.3 + f1 * 0.8));
  float wavePattern = sin((flowUV.x + f2 * 1.5) * 4.0 + t * 2.0) * 0.5 + 0.5;

  float isTop = smoothstep(-0.1, -0.6, signedY / max(H_x, 0.001));
  vec3 outerColor = mix(uColorBlue, uColorViolet, isTop);
  outerColor = mix(outerColor, uColorMagenta, isTop * (0.4 + 0.3 * sin(t + uv.x * 4.0)));
  
  vec3 midColor = mix(uColorCyan, uColorBlue, (1.0 - normalizedV) * 0.3);
  midColor += uColorCyan * wavePattern * 0.35 * uFlowIntensity;

  vec3 gradColor = mix(midColor, outerColor, pow(normalizedV, 1.4));
  
  float coreAxis = exp(-pow(distY / max(H_x * 0.35, 0.001), 2.0) * 6.0);
  float throatHot = exp(-pow(1.0 - normX, 2.0) * 8.0);
  vec3 luminousCore = mix(uColorCyan, uColorCore, clamp(coreAxis * 0.8 + throatHot * 0.6, 0.0, 1.0));
  
  gradColor = mix(gradColor, luminousCore, clamp(coreAxis * 0.75 + throatHot * 0.5, 0.0, 1.0));

  float edgeWidth = 0.0035;
  float mask = smoothstep(-edgeWidth, edgeWidth, insideDist);
  float rimGlow = exp(-abs(insideDist) * 160.0) * (0.9 + 0.3 * wavePattern);
  
  vec2 sparkleUV = vec2(uv.x * 90.0, signedY * 120.0);
  float spkNoise = hash21(floor(sparkleUV) + floor(t * 12.0));
  float sparkle = pow(spkNoise, 16.0) * exp(-abs(insideDist) * 90.0) * smoothstep(0.2, 0.98, normX) * uSparkleIntensity;
  
  float outsideDist = max(0.0, distY - H_x);
  float ambientGlow = exp(-outsideDist * 32.0) * (1.0 - smoothstep(0.0, pinchX, uv.x)) * 0.22;
  vec3 ambientCol = mix(uColorBlue, uColorViolet, isTop) * 0.7;

  vec3 color = gradColor * mask;
  color += (uColorCore * 0.9 + uColorCyan * 0.3) * rimGlow * mask;
  color += vec3(1.0) * sparkle * 1.8;
  color += ambientCol * ambientGlow * (1.0 - mask);

  vec3 finalColor = mix(uColorBg, color, clamp(mask + ambientGlow + rimGlow * 0.5, 0.0, 1.0));
  gl_FragColor = vec4(finalColor, 1.0);
}
\`;

export default function SingularityFlareBackground({
  speed = 1.0,
  pinchX = 0.50,
  flareHeight = 0.94,
  flowIntensity = 1.0,
  sparkleIntensity = 1.0,
  colorBg = '#020205',
  colorCore = '#ffffff',
  colorCyan = '#00d2ff',
  colorBlue = '#0d2b6b',
  colorViolet = '#a855f7',
  colorMagenta = '#d946ef',
  colorBeam = '#c084fc',
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const materialRef = useRef(null);
  const animIdRef = useRef(null);

  const parsedColors = useMemo(() => ({
    bg: new Color(colorBg),
    core: new Color(colorCore),
    cyan: new Color(colorCyan),
    blue: new Color(colorBlue),
    violet: new Color(colorViolet),
    magenta: new Color(colorMagenta),
    beam: new Color(colorBeam),
  }), [colorBg, colorCore, colorCyan, colorBlue, colorViolet, colorMagenta, colorBeam]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new Vector2(width, height) },
      uSpeed: { value: speed },
      uPinchX: { value: pinchX },
      uFlareHeight: { value: flareHeight },
      uFlowIntensity: { value: flowIntensity },
      uSparkleIntensity: { value: sparkleIntensity },
      uColorBg: { value: new Vector3(parsedColors.bg.r, parsedColors.bg.g, parsedColors.bg.b) },
      uColorCore: { value: new Vector3(parsedColors.core.r, parsedColors.core.g, parsedColors.core.b) },
      uColorCyan: { value: new Vector3(parsedColors.cyan.r, parsedColors.cyan.g, parsedColors.cyan.b) },
      uColorBlue: { value: new Vector3(parsedColors.blue.r, parsedColors.blue.g, parsedColors.blue.b) },
      uColorViolet: { value: new Vector3(parsedColors.violet.r, parsedColors.violet.g, parsedColors.violet.b) },
      uColorMagenta: { value: new Vector3(parsedColors.magenta.r, parsedColors.magenta.g, parsedColors.magenta.b) },
      uColorBeam: { value: new Vector3(parsedColors.beam.r, parsedColors.beam.g, parsedColors.beam.b) },
    };

    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    materialRef.current = material;

    const geometry = new PlaneGeometry(2, 2);
    const quad = new Mesh(geometry, material);
    scene.add(quad);

    let lastTime = performance.now();
    const animate = (currentTime) => {
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      uniforms.uTime.value += delta;
      renderer.render(scene, camera);
      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      resizeObserver.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!materialRef.current) return;
    const u = materialRef.current.uniforms;
    u.uSpeed.value = speed;
    u.uPinchX.value = pinchX;
    u.uFlareHeight.value = flareHeight;
    u.uFlowIntensity.value = flowIntensity;
    u.uSparkleIntensity.value = sparkleIntensity;
    u.uColorBg.value.set(parsedColors.bg.r, parsedColors.bg.g, parsedColors.bg.b);
    u.uColorCore.value.set(parsedColors.core.r, parsedColors.core.g, parsedColors.core.b);
    u.uColorCyan.value.set(parsedColors.cyan.r, parsedColors.cyan.g, parsedColors.cyan.b);
    u.uColorBlue.value.set(parsedColors.blue.r, parsedColors.blue.g, parsedColors.blue.b);
    u.uColorViolet.value.set(parsedColors.violet.r, parsedColors.violet.g, parsedColors.violet.b);
    u.uColorMagenta.value.set(parsedColors.magenta.r, parsedColors.magenta.g, parsedColors.magenta.b);
    u.uColorBeam.value.set(parsedColors.beam.r, parsedColors.beam.g, parsedColors.beam.b);
  }, [speed, pinchX, flareHeight, flowIntensity, sparkleIntensity, parsedColors]);

  return (
    <div
      ref={containerRef}
      className={\`relative w-full h-full overflow-hidden \${className}\`}
      style={{
        backgroundColor: colorBg,
        ...style,
      }}
    />
  );
}
\`;
