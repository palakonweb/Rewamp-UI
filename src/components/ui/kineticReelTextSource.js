export const kineticReelTextPrompt = `Create an ultra-clean, modern 3D kinetic rolling cylinder / slot reel text animation in React with Tailwind CSS and Framer Motion.
- Static bold prefix text on the left (e.g. "we do").
- On the right, a vertical reel of service titles ("Websites", "Brand identity", "SEO optimization", "Digital marketing", "Lead generation", "Influencer marketing").
- The active item is front-and-center, bright and sharp.
- The previous item is stacked above, slightly tilted away with 3D perspective (rotateX: 32deg), reduced opacity (0.35), and subtle blur.
- The next item is stacked below, angled back with rotateX: -32deg and reduced opacity.
- As the reel advances, items roll vertically in 3D with snappy cubic-bezier inertia and motion blur falloff.
- Smooth looping, hover-to-pause, and click to immediately spin to the next item.
- Supports both sleek dark mode and Purrform warm light mode.`;

export const kineticReelTextCode = `import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export default function KineticReelText({
  prefix = 'we do',
  items = [
    'Websites',
    'Brand identity',
    'SEO optimization',
    'Digital marketing',
    'Lead generation',
    'Influencer marketing',
  ],
  interval = 2200,
  className = '',
  itemHeight = 64,
  theme = 'dark',
}) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, interval, isPaused, prefersReducedMotion]);

  const handleNext = () => setCurrentIndex((prev) => (prev + 1) % items.length);
  const isDark = theme === 'dark';

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={\`relative inline-flex items-center justify-center select-none font-sans \${className}\`}
      style={{ perspective: '1000px' }}
    >
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Prefix */}
        <span
          className={\`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight \${
            isDark ? 'text-white' : 'text-[#1F1F1F]'
          }\`}
          style={{ letterSpacing: '-0.03em' }}
        >
          {prefix}
        </span>

        {/* 3D Vertical Reel Slot */}
        <div
          onClick={handleNext}
          title="Click to roll to next"
          className="relative cursor-pointer overflow-hidden flex items-center"
          style={{
            height: \`\${itemHeight * 2.8}px\`,
            minWidth: '260px',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
          }}
        >
          <div className="relative w-full h-full flex flex-col items-start justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {/* Previous Word */}
              <motion.div
                key={\`prev-\${(currentIndex - 1 + items.length) % items.length}\`}
                initial={{ opacity: 0, y: -itemHeight * 0.8, rotateX: 38, filter: 'blur(4px)' }}
                animate={{
                  opacity: isDark ? 0.35 : 0.28,
                  y: -itemHeight * 0.95,
                  rotateX: 32,
                  scale: 0.9,
                  filter: 'blur(2px)',
                }}
                exit={{ opacity: 0, y: -itemHeight * 1.6, rotateX: 55, filter: 'blur(8px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={\`absolute left-0 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight pointer-events-none transform-gpu origin-bottom \${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }\`}
              >
                {items[(currentIndex - 1 + items.length) % items.length]}
              </motion.div>

              {/* Active Word */}
              <motion.div
                key={\`active-\${currentIndex}\`}
                initial={{ opacity: 0, y: itemHeight * 0.85, rotateX: -38, scale: 0.9, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1, filter: 'blur(0px)' }}
                exit={{
                  opacity: isDark ? 0.35 : 0.28,
                  y: -itemHeight * 0.95,
                  rotateX: 32,
                  scale: 0.9,
                  filter: 'blur(2px)',
                }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={\`relative text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transform-gpu origin-center \${
                  isDark ? 'text-white' : 'text-[#EC5E27]'
                }\`}
              >
                {items[currentIndex]}
              </motion.div>

              {/* Next Word */}
              <motion.div
                key={\`next-\${(currentIndex + 1) % items.length}\`}
                initial={{ opacity: 0, y: itemHeight * 1.6, rotateX: -55, filter: 'blur(8px)' }}
                animate={{
                  opacity: isDark ? 0.35 : 0.28,
                  y: itemHeight * 0.95,
                  rotateX: -32,
                  scale: 0.9,
                  filter: 'blur(2px)',
                }}
                exit={{ opacity: 0, y: itemHeight * 0.4, filter: 'blur(4px)' }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={\`absolute left-0 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight pointer-events-none transform-gpu origin-top \${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }\`}
              >
                {items[(currentIndex + 1) % items.length]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}`;
