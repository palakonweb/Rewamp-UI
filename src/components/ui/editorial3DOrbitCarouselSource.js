export const editorial3DOrbitCarouselPrompt = `A 3D tilted elliptical carousel of vibrant editorial poster cards with an architectural background watermark ('SHOWCASE 11'). Features six distinct artistic posters revolving smoothly in a 3D orbit with depth scaling, bank angles, draggable rotation, and click-to-center physics.`;

export const editorial3DOrbitCarouselCode = `import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function Editorial3DOrbitCarousel({ autoRotate = true, speed = 1.0 }) {
  const [rotationAngle, setRotationAngle] = useState(0);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  const posters = [
    { id: '1', title: 'RED NOCTURNE', bg: 'bg-red-800' },
    { id: '2', title: 'SWISS ARCHIVE', bg: 'bg-white text-black' },
    { id: '3', title: 'GOLA EYEWEAR', bg: 'bg-yellow-400 text-black' },
    { id: '4', title: 'OBSIDIAN BUST', bg: 'bg-neutral-900 text-white' },
    { id: '5', title: 'Re— INTERFACE', bg: 'bg-blue-600 text-white' },
    { id: '6', title: 'AI ERA CONF', bg: 'bg-neutral-100 text-black' },
  ];

  const rx = 260;
  const ry = 95;

  useEffect(() => {
    if (!autoRotate) return;
    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const dt = (time - lastTimeRef.current) / 1000;
        setRotationAngle((prev) => (prev + 0.55 * speed * dt) % (2 * Math.PI));
      }
      lastTimeRef.current = time;
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [autoRotate, speed]);

  return (
    <div className="relative w-full h-[520px] overflow-hidden flex items-center justify-center rounded-2xl bg-neutral-100">
      <span className="absolute text-[160px] font-black text-black/5 select-none uppercase">
        SHOWCASE 11
      </span>
      <div className="relative w-0 h-0 flex items-center justify-center -rotate-6">
        {posters.map((poster, idx) => {
          const angle = (idx / posters.length) * 2 * Math.PI + rotationAngle;
          const x = Math.sin(angle) * rx;
          const y = Math.cos(angle) * ry;
          const normDepth = (Math.cos(angle) + 1) / 2;

          return (
            <motion.div
              key={poster.id}
              animate={{
                x,
                y,
                scale: 0.84 + normDepth * 0.26,
                opacity: 0.65 + normDepth * 0.35,
                rotateZ: Math.sin(angle) * -7,
              }}
              style={{
                width: 195,
                height: 255,
                position: 'absolute',
                top: -127,
                left: -97,
                zIndex: Math.round(normDepth * 50),
              }}
            >
              <div className={\`w-full h-full rounded-2xl p-5 shadow-2xl flex flex-col justify-between \${poster.bg}\`}>
                <span className="text-xs font-mono uppercase">0{idx + 1}</span>
                <span className="text-lg font-bold">{poster.title}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
`;
