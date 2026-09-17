import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';

/**
 * Editorial3DOrbitCarousel
 * Recreating Recording 2026-09-15 154902.mp4:
 * Clock-arm ticking motion where posters tick sequentially along an airy diagonal path.
 * Features:
 * - Clock-arm ticking rhythm: snappy mechanical step every ~1.5s with pause between ticks
 * - Breathing space: wide 195px × 120px stride so cards have generous air and don't crowd
 * - Refined tilt angle: gentle clock-arm rotation (from +9deg to 0deg upright to -11deg)
 * - Pure image cards with no black overlays and no text
 * - Watermark "SHOWCASE 11" and editorial header/footer
 */
export function Editorial3DOrbitCarousel({
  items = null,
  autoTick = true,
  autoRotate = true,
  speed = 1.0,
  tickInterval = 1800,
  cardWidth = 210,
  cardHeight = 290,
  pauseOnHover = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialStep: 0 });

  // Effective ticking interval factoring in speed
  const effectiveInterval = Math.round(tickInterval / (speed || 1.0));
  const effectiveAuto = autoTick && autoRotate;

  // Pure surreal art images
  const defaultItems = [
    { id: '1', image: '/cards/sky-curtain.png' },
    { id: '2', image: '/cards/airplane-sunset.png' },
    { id: '3', image: '/cards/rainbow-hill.png' },
    { id: '4', image: '/cards/train-window.jpg' },
    { id: '5', image: '/cards/kangaroo-planet.png' },
  ];

  const cards = items || defaultItems;
  const numCards = cards.length;

  // Generous breathing space stride along diagonal path
  const stepX = 195;
  const stepY = 115;

  // Mark entrance animation complete after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // Clock-arm ticking timer: ticks sequentially on load and repeats
  useEffect(() => {
    if (!effectiveAuto || isPaused || isDragging) return;

    // Start first tick shortly after load so animation immediately begins
    const initialKickstart = setTimeout(() => {
      setCurrentStep((prev) => prev + 1);
    }, 1000);

    let intervalId = null;
    const startInterval = setTimeout(() => {
      intervalId = setInterval(() => {
        setCurrentStep((prev) => prev + 1);
      }, effectiveInterval);
    }, 1000);

    return () => {
      clearTimeout(initialKickstart);
      clearTimeout(startInterval);
      if (intervalId) clearInterval(intervalId);
    };
  }, [effectiveAuto, isPaused, isDragging, effectiveInterval]);

  // Pointer drag to scrub or tick cards
  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialStep: currentStep,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    const dist = (dx + dy * 0.6) / -120;
    if (Math.abs(dist) >= 1) {
      const stepDelta = Math.round(dist);
      setCurrentStep(dragStartRef.current.initialStep + stepDelta);
    }
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => {
        if (pauseOnHover) setIsPaused(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsPaused(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full h-[600px] md:h-[660px] overflow-hidden select-none cursor-grab active:cursor-grabbing rounded-[24px] sm:rounded-[32px] border border-black/5 dark:border-white/10 bg-[#f7f5f2] dark:bg-[#100e16] shadow-xl flex items-center justify-center ${className}`}
      style={{
        perspective: 1400,
      }}
    >
      {/* Top Header Controls: Arrow + SHOWCASE 11 */}
      <div className="absolute top-4 left-5 right-5 flex items-center justify-between pointer-events-none z-20 text-neutral-800 dark:text-neutral-200">
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          className="p-1.5 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors pointer-events-auto cursor-pointer"
          title="Previous tick"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono tracking-widest uppercase font-semibold text-neutral-500 dark:text-neutral-400">
            SHOWCASE 11
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors pointer-events-auto cursor-pointer"
            title={isPaused ? 'Resume ticking' : 'Pause ticking'}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Giant Architectural Background Watermark: "SHOWCASE 11" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <div className="flex items-center justify-center w-full px-6 opacity-[0.09] dark:opacity-[0.07]">
          <span className="text-[130px] sm:text-[190px] md:text-[240px] font-black tracking-tighter text-black uppercase leading-none">
            SH
          </span>
          <span className="w-28 sm:w-52" />
          <span className="text-[130px] sm:text-[190px] md:text-[240px] font-black tracking-tighter text-black uppercase leading-none">
            E 11
          </span>
        </div>
      </div>

      {/* Diagonal Stream Center Anchor */}
      <div
        className="relative w-0 h-0 flex items-center justify-center pointer-events-none z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {cards.map((card, idx) => {
          // Relative position slot from currentStep:
          // Center card is offset = 0
          // Offset can wrap around [-2, -1, 0, 1, 2]
          let offset = (idx - (currentStep % numCards) + numCards) % numCards;
          if (offset > 2) {
            offset -= numCards; // Wrap so range is -2, -1, 0, 1, 2
          }

          // Visual coordinates along diagonal with generous breathing room
          // offset > 0 is bottom-right; offset < 0 is top-left
          const posX = offset * stepX;
          const posY = offset * stepY;

          // Clock-arm motion angles (subtle and reduced per user request):
          // Bottom-right entrance (offset = +2): +9° clockwise
          // Approaching center (offset = +1): +4.5°
          // Center focus (offset = 0): 0° strictly upright
          // Departing center (offset = -1): -5.5°
          // Top-left exit (offset = -2): -11° counter-clockwise
          let rotZ = 0;
          if (offset > 0) {
            rotZ = offset * 4.5; // +4.5deg at +1, +9deg at +2
          } else if (offset < 0) {
            rotZ = offset * 5.5; // -5.5deg at -1, -11deg at -2
          }

          // Center hero card is prominent; side cards scale gently
          const dist = Math.abs(offset);
          const scale = dist === 0 ? 1.15 : Math.max(0.85, 1.0 - dist * 0.08);

          // zIndex: lower-right card overlaps card behind it
          const zIndex = Math.round(40 - offset * 10);

          // Opacity fades smoothly for cards furthest away
          const opacity = dist > 2.2 ? 0 : dist > 1.6 ? 0.6 : 1;

          return (
            <motion.div
              key={card.id}
              initial={{
                x: posX,
                y: posY + 100,
                scale: 0.65,
                opacity: 0,
                rotateZ: rotZ * 1.3,
              }}
              animate={{
                x: posX,
                y: posY,
                scale,
                opacity,
                rotateZ: rotZ,
              }}
              transition={
                !hasEntered
                  ? {
                      type: 'spring',
                      stiffness: 240,
                      damping: 22,
                      mass: 0.9,
                      delay: idx * 0.08,
                    }
                  : {
                      type: 'spring',
                      stiffness: 380,
                      damping: 32,
                      mass: 0.8,
                    }
              }
              style={{
                width: cardWidth,
                height: cardHeight,
                position: 'absolute',
                top: -cardHeight / 2,
                left: -cardWidth / 2,
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              className="pointer-events-auto"
              onClick={() => {
                // Clicking any card ticks it into center hero position
                setCurrentStep((prev) => prev + offset);
              }}
            >
              {/* Pure Card Surface - Full bleed surreal art, zero text, zero black overlays */}
              <div
                className="w-full h-full rounded-[22px] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
                style={{
                  boxShadow:
                    dist === 0
                      ? '0 32px 64px -14px rgba(0, 0, 0, 0.45), 0 12px 24px -6px rgba(0, 0, 0, 0.25)'
                      : '0 16px 36px -8px rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.45)',
                }}
              >
                <img
                  src={card.image}
                  alt="Artwork"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Editor Bar: JITTER · VIDEO · TEMPLATE */}
      <div className="absolute bottom-3 left-6 right-6 flex items-center justify-between pointer-events-none z-20 text-[10px] font-mono tracking-wider uppercase text-neutral-500 dark:text-neutral-400">
        <span>JITTER</span>
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {cards.map((_, i) => {
            const activeIdx = ((currentStep % numCards) + numCards) % numCards;
            return (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIdx
                    ? 'w-4 bg-neutral-900 dark:bg-white'
                    : 'bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
                }`}
                title={`Card ${i + 1}`}
              />
            );
          })}
        </div>
        <span>TEMPLATE</span>
      </div>
    </div>
  );
}

export default Editorial3DOrbitCarousel;
