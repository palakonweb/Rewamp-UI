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

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ArchCardCarousel({
  images = STOCK_IMAGES,
  radius = 760,
  stepAngleDeg = 11.6,
  cardWidth = 180,
  cardHeight = 248,
}: {
  images?: string[];
  radius?: number;
  stepAngleDeg?: number;
  cardWidth?: number;
  cardHeight?: number;
}) {
  const [rotation, setRotation] = useState(0);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const userInteractedTimeRef = useRef(0);
  const currentRotationRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 640) setScreenSize('mobile');
      else if (w < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effRadius = screenSize === 'mobile' ? 440 : screenSize === 'tablet' ? 620 : radius;
  const effCardWidth = screenSize === 'mobile' ? Math.min(cardWidth, 110) : screenSize === 'tablet' ? Math.min(cardWidth, 136) : cardWidth;
  const effCardHeight = screenSize === 'mobile' ? Math.min(cardHeight, 154) : screenSize === 'tablet' ? Math.min(cardHeight, 190) : cardHeight;
  const effStepAngleDeg = screenSize === 'mobile' ? 15.5 : screenSize === 'tablet' ? 14.5 : stepAngleDeg;

  const count = images.length;
  const stepAngleRad = (effStepAngleDeg * Math.PI) / 180;
  const totalSpanRad = count * stepAngleRad;

  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    const cycleDuration = 5200;
    const maxAmplitudeDeg = effStepAngleDeg * 1.55;

    const tick = (now: number) => {
      const timeSinceInteract = now - userInteractedTimeRef.current;

      if (isDraggingRef.current) {
        // Dragging
      } else if (Math.abs(velocityRef.current) > 0.04) {
        currentRotationRef.current += velocityRef.current;
        velocityRef.current *= 0.92;
        setRotation(currentRotationRef.current);
      } else if (timeSinceInteract > 1200) {
        const elapsed = (now - startTime) % cycleDuration;
        const progress = elapsed / cycleDuration;
        let targetDeg = 0;

        if (progress < 0.10) {
          targetDeg = 0;
        } else if (progress < 0.42) {
          const segProgress = (progress - 0.10) / 0.32;
          targetDeg = easeInOutCubic(segProgress) * maxAmplitudeDeg;
        } else if (progress < 0.56) {
          targetDeg = maxAmplitudeDeg;
        } else if (progress < 0.88) {
          const segProgress = (progress - 0.56) / 0.32;
          targetDeg = (1 - easeInOutCubic(segProgress)) * maxAmplitudeDeg;
        } else {
          targetDeg = 0;
        }

        currentRotationRef.current += (targetDeg - currentRotationRef.current) * 0.08;
        setRotation(currentRotationRef.current);
      } else {
        setRotation(currentRotationRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [effStepAngleDeg]);

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
    const degDelta = (deltaX / effRadius) * (180 / Math.PI) * 1.35;
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
    <div className="relative w-full max-w-full flex flex-col items-center select-none">
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{ height: \`\${effCardHeight + (screenSize === 'mobile' ? 95 : 140)}px\` }}
      >
        {/* Dome arc horizon */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: \`\${effRadius * 2}px\`,
            height: \`\${effRadius * 2}px\`,
            bottom: \`-\${effRadius * 2 - (effCardHeight + 85)}px\`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F3ED 42%, #E7E3D8 100%)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            boxShadow: '0 -20px 50px -15px rgba(0, 0, 0, 0.06), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
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
            if (Math.abs(offsetDeg) > 52) return null;

            const x = effRadius * Math.sin(offsetAngle);
            const y = effRadius * (1 - Math.cos(offsetAngle));
            const dist = Math.abs(offsetDeg);

            return (
              <div
                key={i}
                onClick={() => {
                  userInteractedTimeRef.current = performance.now();
                  setRotation(-i * effStepAngleDeg);
                }}
                className="absolute pointer-events-auto cursor-pointer"
                style={{
                  width: \`\${effCardWidth}px\`,
                  height: \`\${effCardHeight}px\`,
                  transformOrigin: '50% 100%',
                  transform: \`translate3d(\${x}px, \${y}px, 0px) rotateZ(\${offsetDeg}deg) scale(\${Math.max(0.85, 1.0 - (dist / 58) * 0.16)})\`,
                  zIndex: Math.round(100 - dist * 1.5),
                  opacity: dist > 48 ? 1 - (dist - 48) / 10 : 1,
                  filter: \`drop-shadow(0 \${16 - dist * 0.18}px 22px rgba(0, 0, 0, 0.16))\`,
                }}
              >
                <div className="w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-zinc-200 border border-black/5 shadow-xs transition-all duration-500 ease-out hover:border-black/10 hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12),0_0_24px_3px_rgba(236,94,39,0.13)]">
                  <img
                    src={src}
                    alt={\`Card \${i + 1}\`}
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out hover:scale-[1.025]"
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
