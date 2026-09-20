import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * MorphSearchCapsule
 * Sleek, tactile search pill capsule with click ripple physics and a buttery-smooth
 * fluid SVG morph transition between the magnifying glass search icon and an animated vertical text cursor.
 */
export function MorphSearchCapsule({
  placeholder = 'Type anything to search...',
  onSearch = null,
  mode = null, // auto-detects from document theme if null
  className = '',
}) {
  const [isActive, setIsActive] = useState(false);
  const [query, setQuery] = useState('');
  const [ripples, setRipples] = useState([]);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  const [detectedMode, setDetectedMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (mode) return;
    const checkTheme = () => {
      setDetectedMode(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, [mode]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (!query) {
          setIsActive(false);
        }
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [query]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev.slice(-2), newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    if (!isActive) {
      setIsActive(true);
    }
    setTimeout(() => inputRef.current?.focus(), 80);
  };

  const handleBlur = (e) => {
    if (containerRef.current?.contains(e.relatedTarget)) return;
    if (!query) {
      setIsActive(false);
    }
  };

  const activeMode = mode || detectedMode;
  const isDark = activeMode === 'dark';

  const theme = {
    capsule: isDark
      ? 'bg-[#1E1B24] border-white/12 text-white'
      : 'bg-white border-black/[0.08] text-[#18181B]',
    shadow: isDark
      ? '0 14px 34px -6px rgba(0,0,0,0.65), 0 4px 14px rgba(0,0,0,0.35)'
      : '0 12px 30px -6px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.04)',
    innerGlow: isDark
      ? 'inset 0 1px 1px 0 rgba(255,255,255,0.18), inset 0 -1px 1px 0 rgba(0,0,0,0.4)'
      : 'inset 0 1px 1.5px 0 rgba(255,255,255,1), inset 0 -1px 1px 0 rgba(0,0,0,0.04)',
    iconColor: isDark ? '#FFFFFF' : '#18181B',
    rippleColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
    inputColor: isDark ? 'text-white' : 'text-[#18181B]',
    placeholderColor: isDark ? 'placeholder:text-white/40' : 'placeholder:text-neutral-400',
    ambientGlow: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
  };

  const isMorphedToCaret = isActive && !query;

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center select-none ${className}`}
    >
      {/* Ambient Diffuse Back Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl pointer-events-none transition-opacity duration-300"
        style={{
          background: theme.ambientGlow,
          opacity: isActive ? 0.8 : 0.4,
        }}
      />

      {/* Capsule Body */}
      <motion.div
        onClick={handleClick}
        animate={{
          scale: isActive ? 1.018 : 1,
        }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
        className={`relative h-[52px] sm:h-[56px] w-[270px] sm:w-[320px] rounded-full overflow-hidden flex items-center pl-4 pr-4 cursor-pointer z-10 border transition-colors duration-200 ${theme.capsule}`}
        style={{
          boxShadow: theme.shadow,
        }}
      >
        {/* Specular Inner Rim Highlight */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: theme.innerGlow }}
        />

        {/* Dynamic Click Ripple */}
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.7 }}
            animate={{ scale: 2.8, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: r.x - 30,
              top: r.y - 30,
              width: 60,
              height: 60,
              backgroundColor: theme.rippleColor,
            }}
          />
        ))}

        {/* ── Seamless Fluid SVG Search Icon ↔ Cursor Morph ── */}
        <div className="relative w-6 h-6 flex items-center justify-center flex-shrink-0 mr-2">
          <svg
            viewBox="0 0 24 24"
            className="w-6 h-6 overflow-visible"
            fill="none"
          >
            {/* Morphing Lens Ring to Vertical Caret Line */}
            <motion.g
              style={{ transformOrigin: '11px 11px' }}
              animate={
                isMorphedToCaret
                  ? {
                      rotate: -45,
                      scaleX: 0.08,
                      scaleY: 1.35,
                      x: -0.5,
                      y: 0,
                    }
                  : {
                      rotate: 0,
                      scaleX: 1,
                      scaleY: 1,
                      x: 0,
                      y: 0,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 380,
                damping: 26,
                mass: 0.8,
              }}
            >
              {/* Luminous Pulsing Caret / Glass Lens */}
              <motion.circle
                cx="11"
                cy="11"
                r="6.5"
                stroke={theme.iconColor}
                strokeWidth="2.4"
                strokeLinecap="round"
                animate={
                  isMorphedToCaret
                    ? {
                        opacity: [1, 1, 0, 0, 1],
                      }
                    : {
                        opacity: 1,
                      }
                }
                transition={
                  isMorphedToCaret
                    ? {
                        opacity: {
                          repeat: Infinity,
                          duration: 1.0,
                          delay: 0.35,
                          ease: 'easeInOut',
                          times: [0, 0.45, 0.5, 0.95, 1],
                        },
                      }
                    : { duration: 0.15 }
                }
              />
            </motion.g>

            {/* Magnifier Diagonal Stem Handle (Retracts smoothly into lens) */}
            <motion.line
              stroke={theme.iconColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              animate={
                isMorphedToCaret
                  ? {
                      x1: 15.5,
                      y1: 15.5,
                      x2: 15.5,
                      y2: 15.5,
                      opacity: 0,
                    }
                  : {
                      x1: 15.8,
                      y1: 15.8,
                      x2: 20.8,
                      y2: 20.8,
                      opacity: 1,
                    }
              }
              transition={{
                type: 'spring',
                stiffness: 420,
                damping: 28,
              }}
            />
          </svg>
        </div>

        {/* Real Interactive Text Input */}
        <div className="flex-1 relative flex items-center h-full">
          <input
            ref={inputRef}
            data-testid="morph-capsule-input"
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch?.(e.target.value);
            }}
            onBlur={handleBlur}
            placeholder={isActive ? placeholder : ''}
            style={{
              caretColor: query ? (isDark ? '#FFFFFF' : '#18181B') : 'transparent',
            }}
            className={`w-full bg-transparent font-medium outline-none text-[15px] tracking-normal cursor-text transition-all duration-200 ${theme.inputColor} ${theme.placeholderColor}`}
          />
        </div>

        {/* Clear Button when text exists */}
        {query && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              setQuery('');
              onSearch?.('');
              inputRef.current?.focus();
            }}
            className={`w-5 h-5 rounded-full flex items-center justify-center text-xs opacity-60 hover:opacity-100 transition-opacity cursor-pointer ${
              isDark ? 'bg-white/10 text-white' : 'bg-black/10 text-black'
            }`}
          >
            ×
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}

export default MorphSearchCapsule;
