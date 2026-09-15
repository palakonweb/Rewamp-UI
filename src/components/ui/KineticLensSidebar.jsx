import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * KineticLensSidebar
 * Exact recreation of Recording 2026-09-15 155640.mp4:
 * Vertical kinetic lens rolodex sidebar where menu items smoothly wheel
 * through an optical center focal line.
 * Features:
 * - Active center item expands with an animated horizontal dash "— "
 * - Smooth cylindrical/lens magnification: center item is sharp, bold, and high-opacity;
 *   peripheral items scale down, blur, and fade into dark vignette.
 * - Wheel scroll, touch drag, and click-to-center physics.
 * - Populated with real Purrform UI categories and components.
 */
export function KineticLensSidebar({
  items = null,
  initialIndex = 3,
  onSelect = null,
  autoCycle = true,
  cycleInterval = 2600,
  className = '',
}) {
  const defaultItems = useMemo(
    () => [
      { id: 'cards', label: 'Cards' },
      { id: 'diagonal-stack', label: 'Diagonal Stack' },
      { id: 'perspective-flip', label: 'Perspective Flip' },
      { id: 'orbital-arch', label: 'Orbital Card Arch' },
      { id: 'editorial-orbit', label: 'Editorial 3D Orbit' },
      { id: 'flightpath-toc', label: 'Flightpath TOC' },
      { id: 'sidebars', label: 'Sidebars' },
      { id: 'navbars', label: 'Navbars' },
      { id: 'buttons', label: 'Buttons' },
      { id: 'toggles', label: 'Toggles' },
      { id: 'text-animations', label: 'Text Animations' },
      { id: 'backgrounds', label: 'Animated Backgrounds' },
    ],
    []
  );

  const menuItems = items || defaultItems;
  const numItems = menuItems.length;

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Motion value for smooth index tracking
  const targetIndex = useMotionValue(initialIndex);
  const smoothIndex = useSpring(targetIndex, {
    stiffness: 280,
    damping: 30,
    mass: 0.8,
  });

  const [displayIndex, setDisplayIndex] = useState(initialIndex);

  useEffect(() => {
    return smoothIndex.on('change', (latest) => {
      setDisplayIndex(latest);
      const rounded = Math.round(latest);
      if (rounded !== activeIndex && rounded >= 0 && rounded < numItems) {
        setActiveIndex(rounded);
      }
    });
  }, [smoothIndex, activeIndex, numItems]);

  // Sync state
  const scrollTo = (idx) => {
    const clamped = Math.max(0, Math.min(numItems - 1, idx));
    targetIndex.set(clamped);
    setActiveIndex(clamped);
    onSelect?.(menuItems[clamped]);
  };

  // Auto-cycling matching the recording
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

  // Wheel scrubbing
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    scrollTo(activeIndex + delta);
  };

  // Drag physics
  const dragStartRef = useRef({ y: 0, initial: 0 });

  const handlePointerDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      y: e.clientY,
      initial: targetIndex.get(),
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const dy = e.clientY - dragStartRef.current.y;
    // Every 45px of drag moves 1 index
    const delta = -dy / 48;
    const next = Math.max(0, Math.min(numItems - 1, dragStartRef.current.initial + delta));
    targetIndex.set(next);
  };

  const handlePointerUp = (e) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture?.(e.pointerId);
      } catch (err) {}
      // Snap to nearest integer index
      const nearest = Math.round(targetIndex.get());
      scrollTo(nearest);
    }
  };

  // Layout parameters
  const itemRowHeight = 54; // Spacing between items
  const centerY = 260; // Center focal plane in container

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative w-full max-w-[340px] h-[520px] rounded-3xl bg-[#090A0C] border border-white/10 overflow-hidden select-none cursor-grab active:cursor-grabbing p-6 flex flex-col justify-between shadow-2xl ${className}`}
      style={{
        boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      {/* Top & Bottom Vignette Mask to produce infinite cylindrical lens falloff */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, #090A0C 0%, rgba(9, 10, 12, 0.7) 18%, transparent 35%, transparent 65%, rgba(9, 10, 12, 0.7) 82%, #090A0C 100%)',
        }}
      />

      {/* Subtle center focal rail glow */}
      <div
        className="absolute left-6 right-6 pointer-events-none z-0"
        style={{
          top: centerY - 26,
          height: 52,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(236, 94, 39, 0.14) 0%, transparent 70%)',
        }}
      />

      {/* Items Container */}
      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          // Distance from active center index
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);

          // Position calculation along vertical axis
          const y = centerY + offset * itemRowHeight;

          // Cylindrical lens physics:
          // Center item (absOffset ~ 0): scale 1.05, opacity 1.0, blur 0px
          // absOffset 1: scale 0.90, opacity 0.45, blur 0.5px
          // absOffset >= 2: scale 0.80, opacity 0.18, blur 1.8px
          const scale = Math.max(0.72, 1.08 - absOffset * 0.14);
          const opacity = Math.max(0.08, 1 - Math.pow(absOffset / 2.8, 1.6));
          const blurAmount = Math.min(4, absOffset * 0.85);

          const isFocal = Math.abs(offset) < 0.4;

          return (
            <motion.div
              key={item.id}
              onClick={() => scrollTo(idx)}
              className="absolute left-2 right-2 flex items-center cursor-pointer pointer-events-auto transition-colors"
              style={{
                top: y - 24,
                height: 48,
                transformOrigin: 'left center',
                scale,
                opacity,
                filter: `blur(${blurAmount}px)`,
              }}
            >
              {/* Animated Dash "— " for focal item matching Recording 155640 */}
              <div className="flex items-center gap-3">
                <motion.div
                  initial={false}
                  animate={{
                    width: isFocal ? 22 : 0,
                    opacity: isFocal ? 1 : 0,
                    marginRight: isFocal ? 4 : 0,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 450,
                    damping: 32,
                  }}
                  className="h-[2px] bg-white rounded-full flex-shrink-0"
                />

                <span
                  className={`tracking-tight font-heading transition-all select-none ${
                    isFocal
                      ? 'text-2xl sm:text-[26px] font-bold text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]'
                      : 'text-lg sm:text-xl font-medium text-neutral-400 hover:text-neutral-200'
                  }`}
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
