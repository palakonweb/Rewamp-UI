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
  radius = 800,
  stepAngleDeg = 13.5,
  cardWidth = 156,
  cardHeight = 218,
  className = '',
}: ArchCardCarouselProps) {
  const [rotation, setRotation] = useState(0);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
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

  // Exact animation timeline
  useEffect(() => {
    let animId: number;
    let accumulatedTime = 0;
    let lastStamp = performance.now();
    const cycleDuration = 5200; // 5.2s full cycle
    const maxAmplitudeDeg = effStepAngleDeg * 1.55;

    const tick = (now: number) => {
      const dt = now - lastStamp;
      lastStamp = now;

      const timeSinceInteract = now - userInteractedTimeRef.current;

      if (isDraggingRef.current) {
        // Controlled by pointer
      } else if (Math.abs(velocityRef.current) > 0.04) {
        // Coasting with inertia
        currentRotationRef.current += velocityRef.current;
        velocityRef.current *= 0.92;
        setRotation(currentRotationRef.current);
      } else if (isHoveredRef.current) {
        setRotation(currentRotationRef.current);
      } else if (timeSinceInteract > 1200) {
        accumulatedTime += dt;
        const elapsed = accumulatedTime % cycleDuration;
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
    const degDelta = (deltaX / effRadius) * (180 / Math.PI) * 1.35;
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
    <div className={`relative w-full max-w-full flex flex-col items-center select-none ${className}`}>
      {/* ── Viewport ── */}
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          setHoveredCardIndex(null);
        }}
        className="relative w-full overflow-hidden flex items-end justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        style={{
          height: `${effCardHeight + (screenSize === 'mobile' ? 95 : 165)}px`,
        }}
      >
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
            if (Math.abs(offsetDeg) > 55) return null;

            // Convex circular path
            const x = effRadius * Math.sin(offsetAngle);
            const y = effRadius * (1 - Math.cos(offsetAngle));

            const rotateZ = offsetDeg;

            const distFromCenter = Math.abs(offsetDeg);
            const baseScale = Math.max(0.86, 1.0 - (distFromCenter / 55) * 0.15);
            const isHovered = hoveredCardIndex === i;
            const scale = isHovered ? baseScale * 1.025 : baseScale;
            const opacity = distFromCenter > 46 ? 1 - (distFromCenter - 46) / 9 : 1;
            const zIndex = isHovered ? 250 : Math.round(100 - distFromCenter * 1.5);
            const isCenter = distFromCenter < effStepAngleDeg / 2;

            return (
              <div
                key={i}
                onMouseEnter={() => {
                  setHoveredCardIndex(i);
                  isHoveredRef.current = true;
                }}
                onMouseLeave={() => {
                  setHoveredCardIndex(null);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  userInteractedTimeRef.current = performance.now();
                  currentRotationRef.current = -i * effStepAngleDeg;
                  setRotation(currentRotationRef.current);
                }}
                className="absolute pointer-events-auto cursor-pointer transition-all duration-300 ease-out"
                style={{
                  width: `${effCardWidth}px`,
                  height: `${effCardHeight}px`,
                  transformOrigin: '50% 100%',
                  transform: `translate3d(${x}px, ${y}px, 0px) rotateZ(${rotateZ}deg) scale(${scale})`,
                  zIndex,
                  opacity,
                  filter: isHovered
                    ? 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.12))'
                    : `drop-shadow(0 ${14 - distFromCenter * 0.16}px ${20 + (isCenter ? 12 : 0)}px rgba(0, 0, 0, ${0.18 + (isCenter ? 0.08 : 0)}))`,
                }}
              >
                {/* Pure Borderless Rounded Image Card with soft, delicate hover glow */}
                <div
                  className={`w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-zinc-200 transition-all duration-500 ease-out relative ${
                    isHovered
                      ? 'border border-black/10 shadow-[0_12px_28px_-6px_rgba(0,0,0,0.12),0_0_24px_3px_rgba(236,94,39,0.13),0_0_8px_1px_rgba(255,255,255,0.8)]'
                      : 'border border-black/5 shadow-xs'
                  }`}
                >
                  <img
                    src={src}
                    alt={`Card ${i + 1}`}
                    className={`w-full h-full object-cover select-none pointer-events-none transition-transform duration-500 ease-out ${
                      isHovered ? 'scale-[1.025]' : 'scale-100'
                    }`}
                    loading="lazy"
                    draggable={false}
                  />

                  {/* Soft ambient inner sheen on hover */}
                  {isHovered && (
                    <div className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[22px] ring-1 ring-inset ring-white/30 bg-gradient-to-t from-white/10 via-transparent to-white/15" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
