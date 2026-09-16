import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Purrform UI Library Items (Buttons, Sidebars, Shaders, Loaders, Orbs, etc.):
 */
export const LIBRARY_LENS_ITEMS = [
  { id: 'buttons', label: 'Buttons' },
  { id: 'sidebars', label: 'Sidebars' },
  { id: 'shaders', label: 'Shaders' },
  { id: 'loaders', label: 'Loaders' },
  { id: 'orbs', label: 'Orbs' },
  { id: 'cards', label: 'Cards' },
  { id: 'navbars', label: 'Navbars' },
  { id: 'toggles', label: 'Toggles' },
  { id: 'cursors', label: 'Cursors' },
  { id: 'text-animations', label: 'Text Animations' },
  { id: 'search-bars', label: 'Search Bars' },
  { id: 'backgrounds', label: 'Backgrounds' },
];

export const DEFAULT_LENS_ITEMS = LIBRARY_LENS_ITEMS;

/**
 * KineticLensSidebar
 * Automated kinetic lens rolodex sidebar with centered text and library items:
 * - Text: Buttons, Sidebars, Shaders, Loaders, Orbs, Cards, Navbars, etc.
 * - Text centered horizontally with symmetrical focal dashes "— Item —"
 * - Automated continuous text scrolling by default
 * - Compact typography (focal: ~19-21px, peripheral: ~14-16px) with tight row height (44px)
 * - Pure pitch black canvas (#000000)
 * - Crisp deep indigo/navy peripheral items (#282D52)
 * - Bright white center focal item (#FFFFFF)
 * - Highly scroll-reactive with non-passive mouse wheel scrubbing, velocity inertia,
 *   touch/pointer drag, click-to-focus.
 */
export function KineticLensSidebar({
  items = null,
  initialIndex = 0, // Default "Buttons"
  onSelect = null,
  autoCycle = true, // Automated text scroll ON by default
  cycleInterval = 2000,
  scrollProgress = null,
  align = 'center', // 'center' or 'left'
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

  // Motion value representing the continuous target position
  const targetIndex = useMotionValue(
    Math.min(initialIndex, Math.max(0, numItems - 1))
  );

  // Physics spring for buttery smooth interpolation
  const smoothIndex = useSpring(targetIndex, {
    stiffness: 240,
    damping: 26,
    mass: 0.75,
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

  // Automated text scrolling: loops continuously through items
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

  // Temporarily pause auto-scroll during user wheel/drag and auto-resume after 1.8s
  const markUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (autoResumeTimeoutRef.current) clearTimeout(autoResumeTimeoutRef.current);
    autoResumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 1800);
  }, []);

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
      }, 160);
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
    const deltaIndex = -totalDy / 44;
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
    const fling = dragStartRef.current.velocity * 100;
    const projected = Math.max(0, Math.min(numItems - 1, current + fling / 44));
    const nearest = Math.round(projected);

    targetIndex.set(nearest);
    setActiveIndex(nearest);
    onSelect?.(menuItems[nearest]);
    markUserInteraction();
  };

  const rowHeight = 44;
  const centerY = 240;
  const isCentered = align === 'center';

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-[340px] sm:max-w-[380px] h-[480px] bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing px-6 sm:px-8 flex flex-col justify-center ${className}`}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Top & Bottom Vignette Mask to blend peripheral items into pitch black */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.95) 12%, transparent 30%, transparent 70%, rgba(0, 0, 0, 0.95) 88%, #000000 100%)',
        }}
      />

      {/* Items List */}
      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);

          if (absOffset > 5.8) return null;

          const y = centerY + offset * rowHeight;
          const isFocal = absOffset < 0.45;
          const focalFactor = Math.max(0, 1 - absOffset * 2.2);

          const distanceFade = Math.max(0, 1 - Math.pow(absOffset / 5.0, 1.8));
          const textColor = isFocal
            ? '#FFFFFF'
            : `rgba(45, 52, 92, ${Math.min(1, distanceFade * 0.95).toFixed(3)})`;

          const scale = 0.86 + focalFactor * 0.14;

          return (
            <motion.div
              key={item.id}
              onClick={() => {
                scrollTo(idx);
                markUserInteraction();
              }}
              className={`absolute left-0 right-0 flex items-center cursor-pointer pointer-events-auto ${
                isCentered ? 'justify-center text-center' : 'justify-start text-left'
              }`}
              style={{
                top: y - 18,
                height: 36,
                transformOrigin: isCentered ? 'center center' : 'left center',
                scale,
                color: textColor,
              }}
            >
              <div className="flex items-center justify-center gap-2.5">
                {/* Left Dash */}
                <div
                  className="overflow-hidden flex items-center justify-end transition-all duration-150 ease-out"
                  style={{
                    width: `${(focalFactor * 22).toFixed(1)}px`,
                    opacity: focalFactor,
                  }}
                >
                  <div className="w-[18px] h-[2px] bg-white rounded-full flex-shrink-0" />
                </div>

                {/* Centered Item Label */}
                <span
                  className={`tracking-[-0.02em] font-sans antialiased select-none whitespace-nowrap transition-colors duration-150 ${
                    isFocal
                      ? 'text-[18px] sm:text-[21px] font-semibold text-white'
                      : 'text-[14px] sm:text-[16px] font-medium'
                  }`}
                  style={{
                    color: textColor,
                  }}
                >
                  {item.label}
                </span>

                {/* Right Dash (when centered, creates clean balanced focal framing) */}
                {isCentered && (
                  <div
                    className="overflow-hidden flex items-center justify-start transition-all duration-150 ease-out"
                    style={{
                      width: `${(focalFactor * 22).toFixed(1)}px`,
                      opacity: focalFactor,
                    }}
                  >
                    <div className="w-[18px] h-[2px] bg-white rounded-full flex-shrink-0" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default KineticLensSidebar;
