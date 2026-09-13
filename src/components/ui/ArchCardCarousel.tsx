import React, { useState, useEffect, useRef } from 'react';

const STOCK_IMAGES = [
  // Curated stock photos matching the clean editorial aesthetic in the video
  'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=600&q=85', // Pigeon studio portrait
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85', // Noir profile
  'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=85', // Blue abstract geometry
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=85', // Colorful abstract
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=85', // Modern portrait
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=85', // Red / plaid textile
  'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=600&q=85', // Minimalist ceramic vase
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=85', // Architecture
];

// Smooth cubic easing matching the video's natural acceleration and deceleration
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export interface ArchCardCarouselProps {
  images?: string[];
  radius?: number;
  stepAngleDeg?: number;
  cardWidth?: number;
  cardHeight?: number;
  className?: string;
}

export default function ArchCardCarousel({
  images = STOCK_IMAGES,
  radius = 760,
  stepAngleDeg = 11.6,
  cardWidth = 180,
  cardHeight = 248,
  className = '',
}: ArchCardCarouselProps) {
  const [rotation, setRotation] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const startRotationRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const userInteractedTimeRef = useRef(0);
  const currentRotationRef = useRef(0);

  const count = images.length;
  const stepAngleRad = (stepAngleDeg * Math.PI) / 180;
  const totalSpanRad = count * stepAngleRad;

  // Exact animation timeline matching Recording 2026-09-13 220628.mp4:
  // 0.0s - 0.5s: Hold at Center
  // 0.5s - 2.1s: Smoothly slide to the Right (+17.5 degrees)
  // 2.1s - 2.9s: Hold at Peak Right
  // 2.9s - 4.5s: Smoothly slide back to Center
  // 4.5s - 5.1s: Hold at Center, loop
  useEffect(() => {
    let animId: number;
    let startTime = performance.now();
    const cycleDuration = 5200; // 5.2s full cycle
    const maxAmplitudeDeg = stepAngleDeg * 1.55; // Glide distance matching video (~1.55 card steps)

    const tick = (now: number) => {
      const timeSinceInteract = now - userInteractedTimeRef.current;

      if (isDraggingRef.current) {
        // Controlled by pointer
      } else if (Math.abs(velocityRef.current) > 0.04) {
        // Coasting with inertia
        currentRotationRef.current += velocityRef.current;
        velocityRef.current *= 0.92;
        setRotation(currentRotationRef.current);
      } else if (timeSinceInteract > 1200) {
        // Exact animated sequence from the video
        const elapsed = (now - startTime) % cycleDuration;
        const progress = elapsed / cycleDuration;
        let targetDeg = 0;

        if (progress < 0.10) {
          // Pause at center (0.0s - 0.52s)
          targetDeg = 0;
        } else if (progress < 0.42) {
          // Slide right smoothly (0.52s - 2.18s)
          const segProgress = (progress - 0.10) / 0.32;
          targetDeg = easeInOutCubic(segProgress) * maxAmplitudeDeg;
        } else if (progress < 0.56) {
          // Pause at right peak (2.18s - 2.91s)
          targetDeg = maxAmplitudeDeg;
        } else if (progress < 0.88) {
          // Slide left back to center (2.91s - 4.58s)
          const segProgress = (progress - 0.56) / 0.32;
          targetDeg = (1 - easeInOutCubic(segProgress)) * maxAmplitudeDeg;
        } else {
          // Pause at center (4.58s - 5.20s)
          targetDeg = 0;
        }

        // Smooth transition into the animated curve
        currentRotationRef.current += (targetDeg - currentRotationRef.current) * 0.08;
        setRotation(currentRotationRef.current);
      } else {
        // Standby right after interaction
        setRotation(currentRotationRef.current);
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [stepAngleDeg]);

  // Pointer drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    userInteractedTimeRef.current = performance.now();
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    startRotationRef.current = currentRotationRef.current;
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
    const newRot = startRotationRef.current + degDelta;

    currentRotationRef.current = newRot;
    setRotation(newRot);

    velocityRef.current = ((currentX - lastXRef.current) / dt) * 0.45;
    lastXRef.current = currentX;
    lastTimeRef.current = now;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    userInteractedTimeRef.current = performance.now();
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  return (
    <div className={`relative w-full flex flex-col items-center select-none ${className}`}>
      {/* ── Viewport ── */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          height: `${cardHeight + 140}px`,
        }}
      >
        {/* ── Giant Bottom Convex Dome Arc (matching video horizon) ── */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            width: `${radius * 2}px`,
            height: `${radius * 2}px`,
            bottom: `-${radius * 2 - (cardHeight + 85)}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 50% 0%, #FFFFFF 0%, #F5F3ED 42%, #E7E3D8 100%)',
            border: '1px solid rgba(0, 0, 0, 0.07)',
            boxShadow: '0 -20px 50px -15px rgba(0, 0, 0, 0.06), inset 0 2px 4px rgba(255, 255, 255, 0.9)',
          }}
        />

        {/* ── Cards Rendered Along Circular Arch ── */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {images.map((src, i) => {
            const rotRad = (rotation * Math.PI) / 180;
            const baseAngle = i * stepAngleRad + rotRad;

            // Smooth circular wrapping
            let offsetAngle = ((baseAngle % totalSpanRad) + totalSpanRad) % totalSpanRad;
            if (offsetAngle > totalSpanRad / 2) {
              offsetAngle -= totalSpanRad;
            }

            const offsetDeg = (offsetAngle * 180) / Math.PI;

            // Visible arc horizon
            if (Math.abs(offsetDeg) > 52) return null;

            // Convex circular path:
            // x moves out, y drops down from the crest
            const x = radius * Math.sin(offsetAngle);
            const y = radius * (1 - Math.cos(offsetAngle));

            // Tangential tilt
            const rotateZ = offsetDeg;

            // Distance scaling and z-index layering
            const distFromCenter = Math.abs(offsetDeg);
            const scale = Math.max(0.86, 1.0 - (distFromCenter / 52) * 0.15);
            const opacity = distFromCenter > 44 ? 1 - (distFromCenter - 44) / 8 : 1;
            const zIndex = Math.round(100 - distFromCenter * 1.5);
            const isCenter = distFromCenter < stepAngleDeg / 2;

            return (
              <div
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  userInteractedTimeRef.current = performance.now();
                  currentRotationRef.current = -i * stepAngleDeg;
                  setRotation(currentRotationRef.current);
                }}
                className="absolute pointer-events-auto cursor-pointer transition-shadow duration-300"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transformOrigin: '50% 100%',
                  transform: `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: `drop-shadow(0 ${14 - distFromCenter * 0.16}px ${20 + (isCenter ? 12 : 0)}px rgba(0, 0, 0, ${0.18 + (isCenter ? 0.08 : 0)}))`,
                }}
              >
                {/* Pure Borderless Rounded Image Card (matching video) */}
                <div className="w-full h-full rounded-[22px] overflow-hidden bg-zinc-200 border border-black/5 shadow-xs transition-transform duration-200 hover:scale-[1.02]">
                  <img
                    src={src}
                    alt={`Card ${i + 1}`}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="lazy"
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
