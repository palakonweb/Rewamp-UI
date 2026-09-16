import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Purrform UI Library Sidebar Categories:
 */
export const LIBRARY_SIDEBAR_ITEMS = [
  { id: 'animated-backgrounds', label: 'Animated Backgrounds', count: 22, slug: 'bgs' },
  { id: 'buttons', label: 'Buttons', count: 8, slug: 'buttons' },
  { id: 'text-animations', label: 'Text Animations', count: 16, slug: 'text' },
  { id: 'toggles', label: 'Toggles', count: 3, slug: 'toggles' },
  { id: 'cursors', label: 'Cursors', count: 2, slug: 'cursors' },
  { id: 'navbars', label: 'Navbars', count: 5, slug: 'navbars' },
  { id: 'search-bars', label: 'Search Bars', count: 2, slug: 'search-bars' },
  { id: 'sidebars', label: 'Sidebars', count: 3, slug: 'sidebars' },
  { id: 'cards', label: 'Cards', count: 9, slug: 'cards' },
  { id: 'ui-for-ai', label: 'UI for AI', count: 5, slug: 'ai-ui' },
];

/**
 * Key Library Components dataset:
 */
export const LIBRARY_COMPONENT_ITEMS = [
  { id: 'kinetic-lens-sidebar', label: 'Kinetic Lens Sidebar', category: 'Sidebars' },
  { id: 'flightpath-toc', label: 'Flightpath TOC', category: 'Sidebars' },
  { id: 'morph-search-capsule', label: 'Morph Search Capsule', category: 'Search Bars' },
  { id: 'diagonal-card-stack', label: 'Diagonal Card Stack', category: 'Cards' },
  { id: 'perspective-flip-deck', label: 'Perspective Flip Deck', category: 'Cards' },
  { id: 'orbital-card-arch', label: 'Orbital Card Arch', category: 'Cards' },
  { id: 'editorial-3d-orbit', label: 'Editorial 3D Orbit', category: 'Cards' },
  { id: 'fluid-wave-navbar', label: 'Fluid Wave Navbar', category: 'Navbars' },
  { id: 'apple-navbar', label: 'Apple Navbar', category: 'Navbars' },
  { id: 'shimmer-button', label: 'Shimmer Button', category: 'Buttons' },
  { id: 'slide-to-confirm', label: 'Slide to Confirm', category: 'Buttons' },
  { id: 'layered-paper-waves', label: 'Layered Paper Waves', category: 'Animated Backgrounds' },
  { id: 'silk-waves', label: 'Silk Waves', category: 'Animated Backgrounds' },
  { id: 'particle-morph-orb', label: 'Particle Morph Orb', category: 'UI for AI' },
];

/**
 * Default to the Purrform Library Sidebar categories
 */
export const DEFAULT_LENS_ITEMS = LIBRARY_SIDEBAR_ITEMS;

/**
 * KineticLensSidebar
 * Exact recreation of Recording 2026-09-15 155640.mp4 with Purrform UI library sidebar:
 * - Pure pitch black canvas (#000000)
 * - Sharp vector typography with deep indigo/navy peripheral items (#282D52)
 * - Bright white center focal item (#FFFFFF) with dynamic "— " dash prefix
 * - Highly scroll-reactive with non-passive mouse wheel scrubbing, velocity inertia,
 *   touch/pointer drag, click-to-focus, and external scroll bindings.
 */
export function KineticLensSidebar({
  items = null,
  initialIndex = 7, // Default "Sidebars"
  onSelect = null,
  autoCycle = false,
  cycleInterval = 2800,
  scrollProgress = null,
  className = '',
}) {
  const menuItems = items || DEFAULT_LENS_ITEMS;
  const numItems = menuItems.length;

  const containerRef = useRef(null);
  const snapTimeoutRef = useRef(null);
  const userInteractedRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(
    Math.min(initialIndex, Math.max(0, numItems - 1))
  );
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion value representing the continuous target position
  const targetIndex = useMotionValue(
    Math.min(initialIndex, Math.max(0, numItems - 1))
  );

  // Physics spring for buttery smooth interpolation matching trackpad / iOS inertia
  const smoothIndex = useSpring(targetIndex, {
    stiffness: 260,
    damping: 28,
    mass: 0.7,
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

  // Handle external scroll progress if supplied (e.g. from page scroll or feed container)
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

  // Auto-cycle when idle
  useEffect(() => {
    if (!autoCycle || isHovered || isDragging) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % numItems;
        targetIndex.set(next);
        onSelect?.(menuItems[next]);
        return next;
      });
    }, cycleInterval);

    return () => clearInterval(timer);
  }, [autoCycle, isHovered, isDragging, numItems, cycleInterval, targetIndex, onSelect, menuItems]);

  // Native non-passive wheel listener for immediate, buttery smooth scroll reactivity
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();
      userInteractedRef.current = true;

      // Fractional delta accumulation
      const delta = e.deltaY * 0.0032;
      const current = targetIndex.get();
      const next = Math.max(0, Math.min(numItems - 1, current + delta));
      targetIndex.set(next);

      // Debounced gentle snap to nearest item after wheel ceases
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
      if (snapTimeoutRef.current) {
        clearTimeout(snapTimeoutRef.current);
      }
    };
  }, [numItems, targetIndex, onSelect, menuItems]);

  // Pointer & Touch Drag Physics
  const dragStartRef = useRef({ y: 0, initial: 0, lastY: 0, lastTime: 0, velocity: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    userInteractedRef.current = true;
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
    // 58px per row
    const deltaIndex = -totalDy / 58;
    const next = Math.max(0, Math.min(numItems - 1, dragStartRef.current.initial + deltaIndex));
    targetIndex.set(next);
  };

  const handlePointerUp = (e) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (_) {}

    // Fling momentum snap
    const current = targetIndex.get();
    const fling = dragStartRef.current.velocity * 120;
    const projected = Math.max(0, Math.min(numItems - 1, current + fling / 58));
    const nearest = Math.round(projected);

    targetIndex.set(nearest);
    setActiveIndex(nearest);
    onSelect?.(menuItems[nearest]);
  };

  // Dimensions
  const rowHeight = 58;
  const centerY = 270; // 540px container height / 2

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-[420px] sm:max-w-[460px] h-[540px] bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing px-6 sm:px-8 flex flex-col justify-center ${className}`}
      style={{
        touchAction: 'none',
      }}
    >
      {/* Top & Bottom Vignette Mask to blend peripheral items into pitch black */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.95) 12%, transparent 32%, transparent 68%, rgba(0, 0, 0, 0.95) 88%, #000000 100%)',
        }}
      />

      {/* Items List */}
      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);

          // Discard items that are far off viewport to optimize rendering
          if (absOffset > 5.2) return null;

          const y = centerY + offset * rowHeight;

          // Focal interpolation:
          // Center item (absOffset < 0.45): white #ffffff, font-semibold, larger scale, active dash
          // Peripheral items: crisp deep indigo #282D52, scale ~0.80-0.86, fading smoothly towards edges
          const isFocal = absOffset < 0.45;
          const focalFactor = Math.max(0, 1 - absOffset * 2.2); // 1 at center, 0 at >=0.45

          // Color interpolation
          const distanceFade = Math.max(0, 1 - Math.pow(absOffset / 4.4, 1.8));
          const textColor = isFocal
            ? '#FFFFFF'
            : `rgba(45, 52, 92, ${Math.min(1, distanceFade * 0.95).toFixed(3)})`;

          // Typography scale
          const scale = 0.82 + focalFactor * 0.18; // 0.82 -> 1.0

          return (
            <motion.div
              key={item.id}
              onClick={() => scrollTo(idx)}
              className="absolute left-0 right-0 flex items-center cursor-pointer pointer-events-auto"
              style={{
                top: y - 24,
                height: 48,
                transformOrigin: 'left center',
                scale,
                color: textColor,
              }}
            >
              <div className="flex items-center min-w-0">
                {/* Dynamic Dash "— " in front of focal item matching Recording 2026-09-15 155640.mp4 */}
                <div
                  className="overflow-hidden flex items-center transition-all duration-150 ease-out"
                  style={{
                    width: `${(focalFactor * 32).toFixed(1)}px`,
                    opacity: focalFactor,
                    marginRight: `${(focalFactor * 14).toFixed(1)}px`,
                  }}
                >
                  <div className="w-[28px] h-[2.5px] bg-white rounded-full flex-shrink-0" />
                </div>

                {/* Library Sidebar Item Name */}
                <span
                  className={`tracking-[-0.03em] font-sans antialiased select-none whitespace-nowrap transition-colors duration-150 ${
                    isFocal
                      ? 'text-[28px] sm:text-[34px] font-semibold text-white'
                      : 'text-[22px] sm:text-[26px] font-medium'
                  }`}
                  style={{
                    color: textColor,
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
