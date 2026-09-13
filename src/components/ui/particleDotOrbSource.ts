export const particleDotOrbPrompt = `Create an AI thinking capsule in clean white styling with an animated 3D particle dot orb on the left and shimmery reasoning text on the right:
- Pill Capsule: Pure white floating pill (rounded-full, bg-white, border border-black/10, soft shadow).
- Left: 3D rotating Fibonacci particle sphere rendered with Three.js (crisp charcoal dots with depth scaling).
- Right: Shimmery text with animated light sweep, smoothly switching through AI reasoning phrases:
  "thinking..." -> "manifesting...." -> "cooking...." -> "hold.upp..." -> "let me cookkk............" -> "donebestiee..."
- Tech: React, Three.js (WebGL), and Framer Motion.`;

export const particleDotOrbCode = `import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

const PHRASES = [
  'thinking...',
  'manifesting....',
  'cooking....',
  'hold.upp...',
  'let me cookkk............',
  'donebestiee...',
];

export default function ParticleDotCapsule() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-3.5 pl-3.5 pr-6 py-2.5 rounded-full bg-white border border-black/10 shadow-lg shadow-black/5">
      <div className="w-10 h-10 shrink-0 flex items-center justify-center">
        <ParticleDotCanvas size={40} />
      </div>
      <div className="min-w-[150px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={PHRASES[index]}
            initial={{ opacity: 0, y: 4, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -4, filter: 'blur(2px)' }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
            className="text-[15px] font-sans font-medium select-none bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-900 bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent"
          >
            {PHRASES[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ParticleDotCanvas({ size = 40 }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 0, 4.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const count = 190;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      positions[i * 3] = Math.cos(theta) * radiusAtY * 1.15;
      positions[i * 3 + 1] = y * 1.15;
      positions[i * 3 + 2] = Math.sin(theta) * radiusAtY * 1.15;
      sizes[i] = 0.85 + Math.random() * 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      vertexShader: \`
        uniform float uTime;
        attribute float aSize;
        varying float vAlpha;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = aSize * (13.5 / -mv.z);
          vAlpha = smoothstep(-1.1, 1.0, normalize(position).z) * 0.72 + 0.28;
        }
      \`,
      fragmentShader: \`
        varying float vAlpha;
        void main() {
          vec2 c = gl_PointCoord - vec2(0.5);
          if (length(c) > 0.5) discard;
          gl_FragColor = vec4(vec3(0.12), smoothstep(0.5, 0.18, length(c)) * vAlpha);
        }
      \`,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    let id: number;
    const animate = () => {
      id = requestAnimationFrame(animate);
      group.rotation.y += 0.007;
      group.rotation.x += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [size]);

  return <div ref={containerRef} className="w-full h-full" />;
}
`;
