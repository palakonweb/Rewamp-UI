import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * RewampUI Sidebar Categories:
 */
export const REWAMP_SIDEBAR_ITEMS = [
  { id: 'search-bars', label: 'Search Bars' },
  { id: 'sidebars', label: 'Sidebars' },
  { id: 'cards', label: 'Cards' },
  { id: 'ui-for-ai', label: 'UI for AI' },
  { id: 'buttons', label: 'Buttons' },
  { id: 'text-animations', label: 'Text Animations' },
  { id: 'toggles', label: 'Toggles' },
  { id: 'cursors', label: 'Cursors' },
  { id: 'navbars', label: 'Navbars' },
  { id: 'animated-backgrounds', label: 'Animated Backgrounds' },
];

export const DEFAULT_LENS_ITEMS = REWAMP_SIDEBAR_ITEMS;

/**
 * KineticLensSidebar
 * Exact recreation of Recording 2026-09-15 155640.mp4:
 * - Left-aligned vertical kinetic lens rolodex list
 * - Active / focal item features an em-dash prefix " -  " and enlarges in bold high-contrast text
 * - Surrounding items recede into deep indigo/slate with reduced opacity and scale
 * - Interactive via hover tracking, mouse wheel scrolling with momentum, touch/pointer drag,
 *   and smooth automated cycling.
 */
export function KineticLensSidebar({
  items = null,
  initialIndex = 1, // Default to "Sidebars"
  onSelect = null,
  autoCycle = true,
  cycleInterval = 2200,
  scrollProgress = null,
  align = 'left',
  className = '',
}) {
  const menuItems = items || DEFAULT_LENS_ITEMS;
  const numItems = menuItems.length;

  const containerRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const autoResumeTimeoutRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(
    Math.min(initialIndex, Math.max(0, numItems - 1))
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  // Motion value representing the continuous target position
  const targetIndex = useMotionValue(
    Math.min(initialIndex, Math.max(0, numItems - 1))
  );

  // Physics spring for buttery smooth interpolation
  const smoothIndex = useSpring(targetIndex, {
    stiffness: 260,
    damping: 28,
    mass: 0.65,
  });

  const [displayIndex, setDisplayIndex] = useState(initialIndex);

  useEffect(() => {
    return smoothIndex.on('change', (latest) => {
      setDisplayIndex(latest);
      const rounded = Math.round(latest);
      if (rounded >= 0 && rounded < numItems && rounded !== activeIndex) {
        setActiveIndex(rounded);
      }
    });
  }, [smoothIndex, activeIndex, numItems]);

  // Handle external scroll progress if supplied
  useEffect(() => {
    if (scrollProgress === null || scrollProgress === undefined) return;

    if (typeof scrollProgress === 'number') {
      const clamped = Math.max(0, Math.min(numItems - 1, scrollProgress * (numItems - 1)));
      targetIndex.set(clamped);
    } else if (scrollProgress && typeof scrollProgress.get === 'function') {
      return scrollProgress.on('change', (latest) => {
        const clamped = Math.max(0, Math.min(numItems - 1, Number(latest) * (numItems - 1)));
        targetIndex.set(clamped);
      });
    }
  }, [scrollProgress, numItems, targetIndex]);

  // Smooth scroll to a specific index
  const scrollTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(numItems - 1, idx));
      targetIndex.set(clamped);
      setActiveIndex(clamped);
      onSelect?.(menuItems[clamped]);
    },
    [numItems, targetIndex, onSelect, menuItems]
  );

  // Temporarily pause auto-scroll during user wheel/hover/drag and auto-resume after 2.5s
  const markUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (autoResumeTimeoutRef.current) clearTimeout(autoResumeTimeoutRef.current);
    autoResumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  }, []);

  // Automated text scrolling: smoothly cycles through items when idle
  useEffect(() => {
    if (!autoCycle || isDragging || isUserInteracting) return;

    const timer = setInterval(() => {
      const current = targetIndex.get();
      const next = (Math.round(current) + 1) % numItems;
      targetIndex.set(next);
      setActiveIndex(next);
      onSelect?.(menuItems[next]);
    }, cycleInterval);

    return () => clearInterval(timer);
  }, [autoCycle, isDragging, isUserInteracting, numItems, cycleInterval, targetIndex, onSelect, menuItems]);

  // Native non-passive wheel listener for immediate, buttery smooth scroll reactivity
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      markUserInteraction();

      const delta = e.deltaY * 0.0035;
      const current = targetIndex.get();
      const next = Math.max(0, Math.min(numItems - 1, current + delta));
      targetIndex.set(next);

      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
      snapTimeoutRef.current = setTimeout(() => {
        const nearest = Math.round(targetIndex.get());
        targetIndex.set(nearest);
        setActiveIndex(nearest);
        onSelect?.(menuItems[nearest]);
      }, 150);
    };

    el.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleNativeWheel);
      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
      if (autoResumeTimeoutRef.current) clearTimeout(autoResumeTimeoutRef.current);
    };
  }, [numItems, targetIndex, onSelect, menuItems, markUserInteraction]);

  // Pointer & Touch Drag Physics
  const dragStartRef = useRef({ y: 0, initial: 0, lastY: 0, lastTime: 0, velocity: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    markUserInteraction();
    dragStartRef.current = {
      y: e.clientY,
      initial: targetIndex.get(),
      lastY: e.clientY,
      lastTime: performance.now(),
      velocity: 0,
    };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (_) {}
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const now = performance.now();
    const dt = Math.max(1, now - dragStartRef.current.lastTime);
    const dySinceLast = e.clientY - dragStartRef.current.lastY;
    dragStartRef.current.velocity = -dySinceLast / dt;
    dragStartRef.current.lastY = e.clientY;
    dragStartRef.current.lastTime = now;

    const totalDy = e.clientY - dragStartRef.current.y;
    const deltaIndex = -totalDy / 52;
    const next = Math.max(0, Math.min(numItems - 1, dragStartRef.current.initial + deltaIndex));
    targetIndex.set(next);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    const current = targetIndex.get();
    const fling = dragStartRef.current.velocity * 120;
    const projected = Math.max(0, Math.min(numItems - 1, current + fling / 52));
    const nearest = Math.round(projected);

    targetIndex.set(nearest);
    setActiveIndex(nearest);
    onSelect?.(menuItems[nearest]);
    markUserInteraction();
  };

  const rowHeight = 54;
  const centerY = 240;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-[360px] sm:max-w-[420px] h-[480px] overflow-hidden select-none cursor-grab active:cursor-grabbing px-6 sm:px-10 flex flex-col justify-center transition-colors duration-300 ${
        isDark ? 'bg-black text-white' : 'bg-[#FAFAFC] text-neutral-900'
      } ${className}`}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Top & Bottom Vignette Mask to softly fade peripheral items into background */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: isDark
            ? 'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.96) 12%, transparent 28%, transparent 72%, rgba(0, 0, 0, 0.96) 88%, #000000 100%)'
            : 'linear-gradient(to bottom, #FAFAFC 0%, rgba(250, 250, 252, 0.96) 12%, transparent 28%, transparent 72%, rgba(250, 250, 252, 0.96) 88%, #FAFAFC 100%)',
        }}
      />

      {/* Items List */}
      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);

          if (absOffset > 5.5) return null;

          const y = centerY + offset * rowHeight;
          const isFocal = absOffset < 0.45;
          const focalFactor = Math.max(0, 1 - absOffset * 2.0);

          // Optical scale and positioning
          const scale = 0.78 + focalFactor * 0.32; // scales from ~0.78 to ~1.10
          const distanceFade = Math.max(0, 1 - Math.pow(absOffset / 4.8, 1.7));

          // Color calibration matching video (deep indigo-slate peripheral, bright pure white focal)
          let textColor;
          if (isDark) {
            textColor = isFocal
              ? '#FFFFFF'
              : `rgba(45, 52, 92, ${Math.min(1, distanceFade * 0.95).toFixed(3)})`;
          } else {
            textColor = isFocal
              ? '#171717'
              : `rgba(156, 142, 184, ${Math.min(1, distanceFade * 0.85).toFixed(3)})`;
          }

          return (
            <motion.div
              key={item.id}
              onClick={() => {
                scrollTo(idx);
                markUserInteraction();
              }}
              onPointerEnter={() => {
                if (!isDragging) {
                  scrollTo(idx);
                  markUserInteraction();
                }
              }}
              className="absolute left-0 right-0 flex items-center justify-start text-left cursor-pointer pointer-events-auto"
              style={{
                top: y - 22,
                height: 44,
                transformOrigin: 'left center',
                scale,
                color: textColor,
              }}
            >
              <div className="flex items-center justify-start gap-3 w-full">
                {/* Em-dash Indicator: strictly on the left side only (matches video) */}
                <div
                  className="overflow-hidden flex items-center justify-start transition-all duration-180 ease-out shrink-0"
                  style={{
                    width: `${(focalFactor * 32).toFixed(1)}px`,
                    opacity: focalFactor,
                  }}
                >
                  <div 
                    className={`h-[2.5px] rounded-full flex-shrink-0 transition-colors duration-150 ${
                      isDark ? 'bg-white' : 'bg-neutral-900'
                    }`}
                    style={{
                      width: '26px',
                    }}
                  />
                </div>

                {/* Text Label */}
                <span
                  className={`tracking-[-0.02em] font-sans antialiased select-none whitespace-nowrap transition-colors duration-150 ${
                    isFocal
                      ? 'text-[28px] sm:text-[34px] font-bold text-white'
                      : 'text-[18px] sm:text-[20px] font-medium'
                  }`}
                  style={{
                    color: textColor,
                    fontWeight: isFocal ? 700 : 500,
                  }}
                >
                  {item.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default KineticLensSidebar;
