import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react';
import skyCurtain from '../../assets/cards/sky-curtain.webp';
import airplaneSunset from '../../assets/cards/airplane-sunset.webp';
import rainbowHill from '../../assets/cards/rainbow-hill.webp';
import trainWindow from '../../assets/cards/train-window.webp';
import kangarooPlanet from '../../assets/cards/kangaroo-planet.webp';

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
  cardWidth = 130,
  cardHeight = 180,
  pauseOnHover = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [containerWidth, setContainerWidth] = useState(900);
  const dragStartRef = useRef({ x: 0, y: 0, initialStep: 0 });

  // Measure the component's own container (not window.innerWidth) so sizing
  // reacts continuously to the actual available width - including when a side
  // panel shrinks the stage without the window itself resizing.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    setContainerWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) setContainerWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Continuous scale (not discrete breakpoints) so the fanned cards always
  // fit the real container width, whatever caused it to shrink. The base
  // card size/stride is kept compact (see cardWidth/cardHeight defaults
  // above) so the deck comfortably fits even a narrowed stage.
  const REFERENCE_WIDTH = 480;
  const geomScale = Math.min(1, Math.max(0.5, containerWidth / REFERENCE_WIDTH));
  const isMobile = containerWidth < 480;
  const effWidth = Math.round(cardWidth * geomScale);
  const effHeight = Math.round(cardHeight * geomScale);
  const stepX = Math.round(80 * geomScale);
  const stepY = Math.round(48 * geomScale);

  // Effective ticking interval factoring in speed
  const effectiveInterval = Math.round(tickInterval / (speed || 1.0));
  const effectiveAuto = autoTick && autoRotate;

  // Pure surreal art images
  const defaultItems = [
    { id: '1', image: skyCurtain },
    { id: '2', image: airplaneSunset },
    { id: '3', image: rainbowHill },
    { id: '4', image: trainWindow },
    { id: '5', image: kangarooPlanet },
  ];

  const cards = items || defaultItems;
  const numCards = cards.length;

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
      className={`relative w-full max-w-full h-[340px] sm:h-[400px] md:h-[440px] overflow-visible select-none cursor-grab active:cursor-grabbing bg-transparent flex items-center justify-center ${className}`}
      style={{
        perspective: 1400,
        isolation: 'isolate',
      }}
    >
      {/* Cards Engine Anchor */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {cards.map((card, idx) => {
          let offset = (idx - (currentStep % numCards) + numCards) % numCards;
          if (offset > 2) {
            offset -= numCards;
          }

          const posX = offset * stepX;
          const posY = offset * stepY;

          let rotZ = 0;
          if (offset > 0) {
            rotZ = offset * 4.5;
          } else if (offset < 0) {
            rotZ = offset * 5.5;
          }

          const dist = Math.abs(offset);
          const scale = dist === 0 ? (isMobile ? 1.08 : 1.15) : Math.max(0.82, 1.0 - dist * 0.08);
          const zIndex = Math.round(40 - offset * 10);
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
                width: effWidth,
                height: effHeight,
                position: 'absolute',
                top: -effHeight / 2,
                left: -effWidth / 2,
                zIndex,
                transformStyle: 'preserve-3d',
              }}
              className="pointer-events-auto"
              onClick={() => {
                setCurrentStep((prev) => prev + offset);
              }}
            >
              {/* Pure Card Surface */}
              <div
                className="w-full h-full rounded-[18px] sm:rounded-[22px] overflow-hidden cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
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
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Editorial3DOrbitCarousel;
