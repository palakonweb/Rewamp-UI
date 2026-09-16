export const kineticReelTextPrompt = `Create an exact recreation of the kinetic rolling slot reel text animation from Recording 2026-09-15 155737.mp4 in React, Framer Motion, and Tailwind CSS.

Requirements:
- Pure pitch black backdrop (#000000).
- Static lowercase bold prefix "we do" on the left with letter-spacing -0.03em.
- On the right, a 3D cylindrical tumbling reel cycling through services:
  "Websites", "Brand identity", "SEO optimization", "Digital marketing", "Lead generation", "Influencer marketing".
- Active item is in the center row: crisp, sharp, full opacity pure white (#FFFFFF), matching the baseline and height of the prefix.
- Adjacent items above and below are visible on the cylinder curve with 3D perspective tilt (rotateX) and subtle opacity falloff (~0.35).
- Continuous drum index tracking with spring physics: all visible items move synchronously as a single tumbler drum.
- Interactive mouse wheel scrubbing, pointer drag, click-to-roll, and auto-tumble timer.`;

export const kineticReelTextCode = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const DEFAULT_REEL_ITEMS = [
  'Websites',
  'Brand identity',
  'SEO optimization',
  'Digital marketing',
  'Lead generation',
  'Influencer marketing',
];

export function KineticReelText({
  prefix = 'we do',
  items = DEFAULT_REEL_ITEMS,
  interval = 2200,
  className = '',
  theme = 'dark',
  autoPlay = true,
  onSelect = null,
}) {
  const numItems = items.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
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
    if (!autoPlay || isHovered) return;
    timerRef.current = setInterval(() => advance(1), interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay, isHovered, interval, advance]);

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
  const rowHeight = 56;
  const viewportHeight = 180;
  const baseCenter = Math.floor(displayPos);
  const visibleSlots = [-2, -1, 0, 1, 2];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => advance(1)}
      className={\`relative inline-flex items-center select-none cursor-pointer py-4 \${className}\`}
      style={{ perspective: '900px', touchAction: 'none' }}
    >
      <div className="flex items-center gap-3 sm:gap-5">
        <span
          className={\`text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] font-sans antialiased whitespace-nowrap \${
            isDark ? 'text-white' : 'text-[#1F1F1F]'
          }\`}
        >
          {prefix}
        </span>

        <div
          className="relative overflow-hidden flex items-center min-w-[200px] sm:min-w-[340px] md:min-w-[420px]"
          style={{
            height: \`\${viewportHeight}px\`,
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 24%, black 76%, transparent 100%)',
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
              const scale = Math.max(0.78, 1 - absOffset * 0.12);
              const opacity =
                absOffset < 0.45
                  ? 1 - absOffset * 0.4
                  : Math.max(0.08, 0.42 - (absOffset - 0.45) * 0.32);

              const isCenter = absOffset < 0.45;

              return (
                <div
                  key={\`\${itemGlobalIndex}\`}
                  className="absolute left-0 right-0 flex items-center pointer-events-none transform-gpu"
                  style={{
                    top: \`calc(50% - \${rowHeight / 2}px)\`,
                    height: \`\${rowHeight}px\`,
                    transform: \`translateY(\${y}px) translateZ(\${-absOffset * 18}px) rotateX(\${rotateX}deg) scale(\${scale})\`,
                    transformOrigin: 'left center',
                    opacity,
                  }}
                >
                  <span
                    className={\`font-sans tracking-[-0.025em] whitespace-nowrap antialiased leading-none \${
                      isCenter
                        ? isDark
                          ? 'text-3xl sm:text-5xl md:text-6xl font-semibold text-white'
                          : 'text-3xl sm:text-5xl md:text-6xl font-semibold text-[#1F1F1F]'
                        : isDark
                        ? 'text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-400'
                        : 'text-3xl sm:text-5xl md:text-6xl font-medium text-neutral-500'
                    }\`}
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

export default KineticReelText;`;
