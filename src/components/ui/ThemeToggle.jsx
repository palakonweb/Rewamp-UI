// perf: memoized export with React.memo, optimized callback handlers
import React, { useState, useEffect, useCallback, memo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

/**
 * Size variants config for track, knob, and icons
 */
const SIZES = {
  sm: {
    track: 'w-[48px] h-[24px] p-[2.5px]',
    knob: 'w-[19px] h-[19px]',
    knobIcon: 'w-2.5 h-2.5',
    trackIcon: 'w-2.5 h-2.5',
    staticLeft: 'left-[6.5px]',
    staticRight: 'right-[6.5px]',
  },
  md: {
    track: 'w-[56px] h-[28px] p-[3px]',
    knob: 'w-[22px] h-[22px]',
    knobIcon: 'w-3 h-3',
    trackIcon: 'w-3 h-3',
    staticLeft: 'left-[7.5px]',
    staticRight: 'right-[7.5px]',
  },
  lg: {
    track: 'w-[68px] h-[34px] p-[3.5px]',
    knob: 'w-[27px] h-[27px]',
    knobIcon: 'w-3.5 h-3.5',
    trackIcon: 'w-3.5 h-3.5',
    staticLeft: 'left-[9.5px]',
    staticRight: 'right-[9.5px]',
  },
};

/**
 * RewampUI ThemeToggle Component
 * A smooth, tactile Light / Dark mode toggle switch with layout-interpolated
 * spring physics, spinning icon crossfades, and brand-token styling.
 */
export const ThemeToggle = memo(function ThemeToggle({
  isDark: controlledIsDark,
  onChange,
  size = 'md',
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();

  // Support uncontrolled mode with fallback to document theme or false
  const [internalIsDark, setInternalIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') === 'dark';
    }
    return false;
  });

  const isDark = controlledIsDark !== undefined ? controlledIsDark : internalIsDark;

  // Sync internal state if controlled prop changes
  useEffect(() => {
    if (controlledIsDark !== undefined) {
      setInternalIsDark(controlledIsDark);
    }
  }, [controlledIsDark]);

  const handleToggle = useCallback(() => {
    const nextState = !isDark;
    if (controlledIsDark === undefined) {
      setInternalIsDark(nextState);
    }
    onChange?.(nextState);
  }, [isDark, controlledIsDark, onChange]);

  const config = SIZES[size] || SIZES.md;

  // Motion physics configuration
  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 500, damping: 32, mass: 0.9 };

  const crossfadeTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.35, ease: 'easeInOut' };

  return (
    <motion.button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.92 }}
      animate={{
        backgroundColor: isDark ? '#262626' : '#E5E5E5',
        borderColor: isDark ? 'rgba(212, 203, 229, 0.25)' : '#D4D4D4',
      }}
      transition={crossfadeTransition}
      className={`relative inline-flex items-center select-none cursor-pointer rounded-full border ${
        isDark
          ? 'shadow-[inset_0_0_12px_rgba(212,203,229,0.15)]'
          : 'shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)]'
      } ${
        isDark ? 'justify-end' : 'justify-start'
      } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4DDF0] focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#141218] ${
        config.track
      } ${className}`}
    >
      {/* ── Background Static Glyphs (Dimmed) ── */}
      {/* Sun icon on the left */}
      <motion.div
        animate={{
          opacity: isDark ? 0.28 : 0.75,
          scale: isDark ? 0.85 : 1,
        }}
        transition={crossfadeTransition}
        className={`absolute ${config.staticLeft} top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#736685] dark:text-[#A8A8A8]`}
      >
        <Sun className={config.trackIcon} strokeWidth={2} />
      </motion.div>

      {/* Moon icon on the right */}
      <motion.div
        animate={{
          opacity: isDark ? 0.75 : 0.28,
          scale: isDark ? 1 : 0.85,
        }}
        transition={crossfadeTransition}
        className={`absolute ${config.staticRight} top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#736685] dark:text-[#C1B4D8]`}
      >
        <Moon className={config.trackIcon} strokeWidth={2} fill="currentColor" />
      </motion.div>

      {/* ── Active Sliding Knob ── */}
      <motion.div
        layout
        transition={springTransition}
        animate={{
          backgroundColor: isDark ? '#EEEAF7' : '#FFFFFF',
          boxShadow: isDark
            ? '0 0 12px rgba(212, 203, 229, 0.45), 0 2px 6px rgba(0, 0, 0, 0.35)'
            : '0 2px 5px rgba(0, 0, 0, 0.12), 0 0 8px rgba(212, 203, 229, 0.25)',
        }}
        className={`relative z-10 rounded-full flex items-center justify-center shrink-0 border ${
          isDark ? 'border-[#D4CBE5]/40' : 'border-black/5'
        } ${config.knob}`}
      >
        {/* Animated Icon Swap Inside Knob */}
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="active-moon"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex items-center justify-center text-[#262626]"
            >
              <Moon className={config.knobIcon} strokeWidth={2.2} fill="currentColor" />
            </motion.div>
          ) : (
            <motion.div
              key="active-sun"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
              className="flex items-center justify-center text-[#5E4F75]"
            >
              <Sun className={config.knobIcon} strokeWidth={2.2} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.button>
  );
});

export default ThemeToggle;

