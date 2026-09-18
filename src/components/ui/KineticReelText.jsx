import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Library component types matching "we make buttons sidebars shaders loaders orbs"
 */
export const DEFAULT_REEL_ITEMS = [
  'buttons',
  'sidebars',
  'shaders',
  'loaders',
  'orbs',
  'cards',
  'navbars',
  'toggles',
  'cursors',
];

/**
 * KineticReelText
 * Centered 3D mechanical cylinder reel matching:
 * "we make buttons sidebars shaders loaders orbs"
 */
export function KineticReelText({
  prefix = 'we make',
  items = DEFAULT_REEL_ITEMS,
  interval = 2000,
  className = '',
  theme = 'dark',
  autoPlay = true,
  onSelect = null,
}) {
  const numItems = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);
  const timerRef = useRef(null);
  const snapTimeoutRef = useRef(null);

  const drumIndex = useMotionValue(0);
  const smoothDrum = useSpring(drumIndex, {
    stiffness: 240,
    damping: 26,
    mass: 0.75,
  });

  const [displayPos, setDisplayPos] = useState(0);

  useEffect(() => {
    return smoothDrum.on('change', (latest) => {
      setDisplayPos(latest);
      const normalized = ((Math.round(latest) % numItems) + numItems) % numItems;
      if (normalized !== activeIndex) {
        setActiveIndex(normalized);
        onSelect?.(items[normalized]);
      }
    });
  }, [smoothDrum, activeIndex, numItems, items, onSelect]);

  const advance = useCallback(
    (direction = 1) => {
      const current = drumIndex.get();
      drumIndex.set(Math.round(current) + direction);
    },
    [drumIndex]
  );

  useEffect(() => {
    if (!autoPlay) return;
    timerRef.current = setInterval(() => advance(1), interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, interval, advance]);

  // Non-passive wheel scrubbing
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY * 0.0035;
      drumIndex.set(drumIndex.get() + delta);

      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      snapTimeoutRef.current = setTimeout(() => {
        drumIndex.set(Math.round(drumIndex.get()));
      }, 160);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
    };
  }, [drumIndex]);

  const isDark = theme === 'dark';
  const rowHeight = 48;
  const viewportHeight = 160;
  const baseCenter = Math.floor(displayPos);
  const visibleSlots = [-2, -1, 0, 1, 2];

  return (
    <div
      ref={containerRef}
      onClick={() => advance(1)}
      className={`relative w-full max-w-full flex items-center justify-center select-none cursor-pointer py-4 px-2 ${className}`}
      style={{ perspective: '900px', touchAction: 'none' }}
      title="Click or scroll mouse wheel to roll"
    >
      {/* Centered lockup with fluid responsive typography */}
      <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 max-w-full overflow-visible">
        {/* Centered Prefix: "we make" */}
        <span
          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.03em] font-sans antialiased shrink-0 text-right ${
            isDark ? 'text-white' : 'text-[#1F1F1F]'
          }`}
        >
          {prefix}
        </span>

        {/* 3D Cylindrical Tumbler Viewport centered */}
        <div
          className="relative overflow-hidden flex items-center justify-start w-[130px] sm:w-[210px] md:w-[280px] lg:w-[320px] shrink-0"
          style={{
            height: `${viewportHeight}px`,
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
          }}
        >
          <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            {visibleSlots.map((slotOffset) => {
              const itemGlobalIndex = baseCenter + slotOffset;
              const offset = itemGlobalIndex - displayPos;
              const absOffset = Math.abs(offset);
              const itemIndex = ((itemGlobalIndex % numItems) + numItems) % numItems;
              const itemLabel = items[itemIndex];

              const y = offset * rowHeight;
              const rotateX = offset * -32;
              const scale = Math.max(0.82, 1 - absOffset * 0.1);
              const opacity =
                absOffset < 0.45
                  ? 1 - absOffset * 0.4
                  : Math.max(0.08, 0.42 - (absOffset - 0.45) * 0.32);

              const isCenter = absOffset < 0.45;

              return (
                <div
                  key={`${itemGlobalIndex}`}
                  className="absolute left-0 right-0 flex items-center justify-start pointer-events-none transform-gpu text-left"
                  style={{
                    top: `calc(50% - ${rowHeight / 2}px)`,
                    height: `${rowHeight}px`,
                    transform: `translateY(${y}px) translateZ(${
                      -absOffset * 18
                    }px) rotateX(${rotateX}deg) scale(${scale})`,
                    transformOrigin: 'left center',
                    opacity,
                  }}
                >
                  <span
                    className={`font-sans tracking-[-0.025em] whitespace-nowrap antialiased leading-none text-left ${
                      isCenter
                        ? isDark
                          ? 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#D4CBE5]'
                          : 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#6D5896]'
                        : isDark
                        ? 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-400'
                        : 'text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-neutral-500'
                    }`}
                  >
                    {itemLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KineticReelText;
