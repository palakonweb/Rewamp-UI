export const particleMorphOrbPrompt = `Create a dark-themed AI reasoning indicator capsule featuring a 3D undulating particle morph orb on the left and shimmery reasoning text on the right:
- Visual Theme: Deep obsidian dark matte styling (rounded-full capsule, bg-[#18181B], border border-white/12, shadow-2xl).
- Left: A real-time 3D particle mesh orb rendered with Three.js (thousands of luminous points displaced dynamically with 3D simplex noise harmonics, featuring glowing volumetric fold edges).
- Right: Shimmery text with animated specular sweep smoothly cycling through reasoning phrases:
  "deep thinking..." -> "manifesting..." -> "cooking in the dark..." -> "hold up wait..." -> "let him cook..." -> "done bestie"
- Tech: React, Three.js (WebGL), GLSL vertex/fragment shaders, and Framer Motion.`;

export const particleMorphOrbCode = `import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const PHRASES = [
  'deep thinking...',
  'manifesting...',
  'cooking in the dark...',
  'hold up wait...',
  'let him cook...',
  'done bestie',
];

export default function DarkParticleMorphCapsule() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3.5 pl-3.5 pr-6 py-2.5 rounded-full bg-[#18181B] border border-white/12 shadow-2xl shadow-black/80">
      <div className="w-11 h-11 shrink-0 flex items-center justify-center">
        <ParticleMorphCanvas size={46} />
      </div>
      <div className="min-w-[150px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={PHRASES[index]}
            initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="text-[15px] font-sans font-medium select-none bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-100 bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent"
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ParticleMorphCanvas({ size = 46 }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const baseGeom = new THREE.SphereGeometry(1.15, 64, 44);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', baseGeom.getAttribute('position'));

    const vertexShader = \`
      uniform float uTime;
      varying float vFresnel;
      varying float vAlpha;

      vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
      vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
      float snoise(vec3 v){
        const vec2 C = vec2(1.0/6.0, 1.0/3.0);
        const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
        vec3 i = floor(v + dot(v, C.yyy));
        vec3 x0 = v - i + dot(i, C.xxx);
        vec3 g = step(x0.yzx, x0.xyz);
        vec3 l = 1.0 - g;
        vec3 i1 = min(g.xyz, l.zxy);
        vec3 i2 = max(g.xyz, l.zxy);
        vec3 x1 = x0 - i1 + 1.0 * C.xxx;
        vec3 x2 = x0 - i2 + 2.0 * C.xxx;
        vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
        i = mod(i, 289.0);
        vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        float n_ = 0.142857142857;
        vec3 ns = n_ * D.wyz - D.xzx;
        vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
        vec4 x_ = floor(j * ns.z);
        vec4 y_ = floor(j - 7.0 * x_);
        vec4 x = x_ * ns.x + ns.yyyy;
        vec4 y = y_ * ns.x + ns.yyyy;
        vec4 h = 1.0 - abs(x) - abs(y);
        vec4 b0 = vec4(x.xy, y.xy);
        vec4 b1 = vec4(x.zw, y.zw);
        vec4 s0 = floor(b0) * 2.0 + 1.0;
        vec4 s1 = floor(b1) * 2.0 + 1.0;
        vec4 sh = -step(h, vec4(0.0));
        vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
        vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
        vec3 p0 = vec3(a0.xy, h.x);
        vec3 p1 = vec3(a0.zw, h.y);
        vec3 p2 = vec3(a1.xy, h.z);
        vec3 p3 = vec3(a1.zw, h.w);
        vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
        p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
        vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
        m = m * m;
        return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
      }

      void main() {
        vec3 norm = normalize(position);
        float t = uTime * 0.95;
        float breath = 0.5 + 0.5 * sin(t * 0.7);
        float angle = atan(norm.y, norm.x);
        float elevation = acos(clamp(norm.z, -1.0, 1.0));
        
        float lobeWave = sin(4.0 * angle + t * 0.85) * sin(3.0 * elevation + t * 0.45) * 0.24;
        float noise1 = snoise(norm * 1.8 + vec3(0.0, t * 0.45, t * 0.25)) * 0.18;
        float noise2 = snoise(norm * 3.5 - vec3(t * 0.35, -t * 0.25, t * 0.15)) * 0.08;
        
        float disp = (lobeWave + noise1 + noise2) * (0.65 + 0.35 * breath);
        vec3 displaced = position + norm * disp;
        vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
        gl_Position = projectionMatrix * mv;
        
        gl_PointSize = 1.35;
        vec3 viewDir = normalize(-mv.xyz);
        vec3 worldNorm = normalize(normalMatrix * norm);
        vFresnel = pow(1.0 - abs(dot(worldNorm, viewDir)), 2.2);
        vAlpha = smoothstep(-1.2, 1.0, norm.z) * 0.5 + 0.5;
      }
    \`;

    const fragmentShader = \`
      varying float vFresnel;
      varying float vAlpha;
      void main() {
        vec2 coord = gl_PointCoord - vec2(0.5);
        if (length(coord) > 0.5) discard;
        float shape = smoothstep(0.5, 0.1, length(coord));
        float brightness = 0.15 + vFresnel * 0.85;
        gl_FragColor = vec4(vec3(0.96, 0.98, 1.0), shape * brightness * vAlpha * 0.75);
      }
    \`;

    const baseGeom = new THREE.SphereGeometry(1.18, 54, 36);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', baseGeom.getAttribute('position'));

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    group.rotation.x = 0.52;
    group.rotation.z = -0.28;
    group.add(points);

    let id: number;
    const clock = new THREE.Clock();
    const animate = () => {
      id = requestAnimationFrame(animate);
      material.uniforms.uTime.value = clock.getElapsedTime() * 1.25;
      group.rotation.y += 0.005;
      group.rotation.x += 0.0025;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      baseGeom.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size]);

  return <div ref={containerRef} className="w-full h-full" />;
}
`;
