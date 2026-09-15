import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * KineticReelText
 * Exact recreation of user's reference video (Recording 2026-09-15 155737.mp4):
 * Static prefix (e.g. "we do") paired with a 3D kinetic rolling cylinder / slot reel
 * that smoothly rolls through service items ("Websites", "Brand identity", "SEO optimization",
 * "Digital marketing", "Lead generation", "Influencer marketing") with optical depth,
 * 3D rotateX perspective, blur falloff, and realistic mechanical tumbler inertia.
 */
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
  theme = 'dark', // 'dark' or 'light'
}) {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  // Auto cycling
  useEffect(() => {
    if (isPaused || prefersReducedMotion) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [items.length, interval, isPaused, prefersReducedMotion]);

  // Handle manual navigation on wheel or click
  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const isDark = theme === 'dark';

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative inline-flex items-center justify-center select-none font-sans ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* Container wrapper */}
      <div className="flex items-center gap-4 sm:gap-6">
        {/* Static Prefix: "we do" */}
        <span
          className={`text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-[#1F1F1F]'
          }`}
          style={{ letterSpacing: '-0.03em' }}
        >
          {prefix}
        </span>

        {/* 3D Vertical Reel Slot Viewport */}
        <div
          onClick={handleNext}
          title="Click to roll to next"
          className="relative cursor-pointer overflow-hidden flex items-center"
          style={{
            height: `${itemHeight * 2.8}px`,
            minWidth: '260px',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)',
          }}
        >
          {/* Reel Drum Track */}
          <div className="relative w-full h-full flex flex-col items-start justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {/* Previous Word (Stacked above with tilt and blur) */}
              <motion.div
                key={`prev-${(currentIndex - 1 + items.length) % items.length}`}
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
                className={`absolute left-0 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight pointer-events-none transform-gpu origin-bottom ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {items[(currentIndex - 1 + items.length) % items.length]}
              </motion.div>

              {/* Active Word (Center stage, crisp and illuminated) */}
              <motion.div
                key={`active-${currentIndex}`}
                initial={{
                  opacity: 0,
                  y: itemHeight * 0.85,
                  rotateX: -38,
                  scale: 0.9,
                  filter: 'blur(4px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: isDark ? 0.35 : 0.28,
                  y: -itemHeight * 0.95,
                  rotateX: 32,
                  scale: 0.9,
                  filter: 'blur(2px)',
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`relative text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight transform-gpu origin-center ${
                  isDark ? 'text-white' : 'text-[#EC5E27]'
                }`}
                style={{
                  letterSpacing: '-0.025em',
                  textShadow: isDark
                    ? '0 0 20px rgba(255, 255, 255, 0.2)'
                    : '0 2px 10px rgba(236, 94, 39, 0.15)',
                }}
              >
                {items[currentIndex]}
              </motion.div>

              {/* Next Word (Stacked below with tilt and blur) */}
              <motion.div
                key={`next-${(currentIndex + 1) % items.length}`}
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
                className={`absolute left-0 text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight pointer-events-none transform-gpu origin-top ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}
                style={{ letterSpacing: '-0.02em' }}
              >
                {items[(currentIndex + 1) % items.length]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
