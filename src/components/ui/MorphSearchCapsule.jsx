import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MorphSearchCapsule
 * Exact recreation of Recording 2026-09-15 204056.mp4:
 * Interactive glowing search capsule with an icon that turns/spins on click,
 * morphing from a magnifying glass into a blinking vertical text input cursor.
 */
export function MorphSearchCapsule({
  placeholder = 'Search components...',
  onSearch = null,
  color = '#6D28D9', // Deep royal purple from recording
  className = '',
}) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [ripples, setRipples] = useState([]);
  const inputRef = useRef(null);

  const handleClick = (e) => {
    // Add click ripple matching video
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev.slice(-3), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (!isActive) {
      setIsActive(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  };

  const handleBlur = () => {
    if (!query) {
      setIsActive(false);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-45 pointer-events-none transition-opacity duration-300"
        style={{
          background: color,
        }}
      />

      {/* Capsule Button / Input */}
      <motion.div
        onClick={handleClick}
        animate={{
          scale: isActive ? 1.02 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
        className="relative h-13 sm:h-14 w-64 sm:w-72 rounded-full overflow-hidden flex items-center px-5 cursor-pointer z-10"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, #7C3AED 100%)`,
          boxShadow: '0 14px 28px -6px rgba(109, 40, 217, 0.45), 0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Click Ripple Effect from Recording */}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute rounded-full pointer-events-none bg-white/40"
            style={{
              left: r.x - 25,
              top: r.y - 25,
              width: 50,
              height: 50,
            }}
          />
        ))}

        {/* Morphing Turn-On-Click Icon: Search Glass -> Blinking Cursor */}
        <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3 text-white">
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 overflow-visible"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Morphing Lens Ring: Turns and collapses into center */}
            <motion.circle
              cx="10.5"
              cy="10.5"
              animate={{
                r: isActive ? 0 : 6,
                opacity: isActive ? 0 : 1,
                rotate: isActive ? 180 : 0,
                scale: isActive ? 0 : 1,
              }}
              transition={{
                duration: 0.32,
                ease: [0.34, 1.3, 0.64, 1],
              }}
              className="origin-center"
            />

            {/* Handle that turns into the vertical text cursor line '|' */}
            <motion.line
              animate={
                isActive
                  ? {
                      x1: 10.5,
                      y1: 4,
                      x2: 10.5,
                      y2: 20,
                      rotate: 0,
                      opacity: [1, 0, 1],
                    }
                  : {
                      x1: 15,
                      y1: 15,
                      x2: 20.5,
                      y2: 20.5,
                      rotate: 0,
                      opacity: 1,
                    }
              }
              transition={
                isActive
                  ? {
                      opacity: { repeat: Infinity, duration: 0.9, ease: 'linear' },
                      x1: { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] },
                      y1: { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] },
                      x2: { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] },
                      y2: { duration: 0.35, ease: [0.34, 1.2, 0.64, 1] },
                    }
                  : {
                      duration: 0.3,
                      ease: 'easeInOut',
                    }
              }
            />
          </svg>
        </div>

        {/* Text Input / Placeholder */}
        <div className="flex-1 relative flex items-center">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            onBlur={handleBlur}
            placeholder={isActive ? placeholder : ''}
            className="w-full bg-transparent text-white font-medium placeholder:text-white/60 outline-none text-sm tracking-wide"
          />
          {!isActive && !query && (
            <span className="text-white/80 text-sm font-medium tracking-wide pointer-events-none select-none">
              Search
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default MorphSearchCapsule;
