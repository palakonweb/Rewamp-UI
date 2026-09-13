export const archCardCarouselPrompt = `Create an animated curved arch card carousel with smooth pendulum gliding motion:
- Cards: Borderless rounded portrait stock images riding along a circular convex wheel trajectory.
- Animation: Continuous smooth harmonic pendulum oscillation (gliding right, pausing gently, gliding left) matching reference motion design.
- Geometry: Tangential z-rotation aligned with the circle normal, apex elevation, and depth scaling.
- Dome Track: A large subtle circular dome horizon at the bottom.
- Interactive: Touch and pointer drag to freely scrub and inspect cards with inertia coasting.
- Tech: React, TypeScript, Tailwind CSS, and requestAnimationFrame physics.`;

export const archCardCarouselCode = `import React, { useState, useEffect, useRef } from 'react';

const STOCK_IMAGES = [
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
];

export default function ArchCardCarousel({
  images = STOCK_IMAGES,
  radius = 860,
  stepAngleDeg = 14.0,
  cardWidth = 185,
  cardHeight = 255,
}: {
  images?: string[];
  radius?: number;
  stepAngleDeg?: number;
  cardWidth?: number;
  cardHeight?: number;
}) {
  const [rotation, setRotation] = useState(0);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const userInteractedTimeRef = useRef(0);

  const count = images.length;
  const stepAngleRad = (stepAngleDeg * Math.PI) / 180;
  const totalSpanRad = count * stepAngleRad;

  useEffect(() => {
    let startTime = performance.now();
    let currentDeg = 0;
    let animId: number;

    const loop = (now: number) => {
      const elapsedSec = (now - startTime) / 1000;
      const timeSinceInteract = (now - userInteractedTimeRef.current) / 1000;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.04) {
          currentDeg += velocityRef.current;
          velocityRef.current *= 0.93;
          setRotation(currentDeg);
        } else if (timeSinceInteract > 1.2) {
          // Smooth pendulum oscillation: slides right, eases, slides left, eases
          const osc = Math.sin((elapsedSec - 1.2) * 0.75);
          const smoothOsc = Math.sign(osc) * Math.pow(Math.abs(osc), 0.85);
          const targetDeg = smoothOsc * (stepAngleDeg * 2.1);
          currentDeg += (targetDeg - currentDeg) * 0.05;
          setRotation(currentDeg);
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [stepAngleDeg]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    userInteractedTimeRef.current = performance.now();
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = rotation;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    userInteractedTimeRef.current = performance.now();
    const currentX = e.clientX;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);

    const deltaX = currentX - startXRef.current;
    const degDelta = (deltaX / radius) * (180 / Math.PI) * 1.35;
    setRotation(startRotationRef.current + degDelta);

    velocityRef.current = ((currentX - lastXRef.current) / dt) * 0.5;
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    userInteractedTimeRef.current = performance.now();
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ height: \`\${cardHeight + 160}px\` }}
      >
        {/* Dome arc horizon */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: \`\${radius * 2}px\`,
            height: \`\${radius * 2}px\`,
            bottom: \`-\${radius * 2 - (cardHeight + 110)}px\`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F3ED 40%, #E6E2D6 100%)',
            border: '1px solid rgba(0, 0, 0, 0.08)',
            boxShadow: '0 -25px 60px -15px rgba(0, 0, 0, 0.07)',
          }}
        />

        {/* Cards along arch */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {images.map((src, i) => {
            const rotRad = (rotation * Math.PI) / 180;
            const baseAngle = i * stepAngleRad + rotRad;
            let offsetAngle = ((baseAngle % totalSpanRad) + totalSpanRad) % totalSpanRad;
            if (offsetAngle > totalSpanRad / 2) offsetAngle -= totalSpanRad;

            const offsetDeg = (offsetAngle * 180) / Math.PI;
            if (Math.abs(offsetDeg) > 58) return null;

            const x = radius * Math.sin(offsetAngle);
            const y = radius * (1 - Math.cos(offsetAngle));
            const dist = Math.abs(offsetDeg);

            return (
              <div
                key={i}
                onClick={() => {
                  userInteractedTimeRef.current = performance.now();
                  setRotation(-i * stepAngleDeg);
                }}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  width: \`\${cardWidth}px\`,
                  height: \`\${cardHeight}px\`,
                  transformOrigin: '50% 100%',
                  transform: \`translate3d(\${x}px, \${y}px, 0px) rotateZ(\${offsetDeg}deg) scale(\${Math.max(0.85, 1.0 - (dist / 58) * 0.16)})\`,
                  zIndex: Math.round(100 - dist * 1.5),
                  opacity: dist > 48 ? 1 - (dist - 48) / 10 : 1,
                  filter: \`drop-shadow(0 \${16 - dist * 0.18}px 22px rgba(0, 0, 0, 0.16))\`,
                }}
              >
                <div className="w-full h-full rounded-[24px] overflow-hidden bg-zinc-200 border border-black/5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                  <img
                    src={src}
                    alt={\`Card \${i + 1}\`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
`;
