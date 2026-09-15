export const kineticLensSidebarPrompt = `Create a vertical kinetic lens rolodex sidebar menu with cylindrical magnification physics.

Requirements:
- Vertical list of navigation items that wheel smoothly along an optical center line.
- The active item crossing the center focal line expands with an animated horizontal dash "— " and sharp, high-emphasis bold typography.
- Peripheral items above and below the focal line scale down, blur via CSS filter, and fade smoothly into a cylindrical vignette.
- Full interactive wheel scrubbing, pointer drag physics with inertia snapping, and click-to-center animation.
- Clean minimalist aesthetic matching Purrform UI components.`;

export const kineticLensSidebarCode = `import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

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

  const scrollTo = (idx) => {
    const clamped = Math.max(0, Math.min(numItems - 1, idx));
    targetIndex.set(clamped);
    setActiveIndex(clamped);
    onSelect?.(menuItems[clamped]);
  };

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

  const itemRowHeight = 54;
  const centerY = 260;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsDragging(false);
      }}
      className={\`relative w-full max-w-[340px] h-[520px] rounded-3xl bg-[#090A0C] border border-white/10 overflow-hidden select-none p-6 flex flex-col justify-between shadow-2xl \${className}\`}
    >
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, #090A0C 0%, rgba(9, 10, 12, 0.7) 18%, transparent 35%, transparent 65%, rgba(9, 10, 12, 0.7) 82%, #090A0C 100%)',
        }}
      />

      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);
          const y = centerY + offset * itemRowHeight;

          const scale = Math.max(0.72, 1.08 - absOffset * 0.14);
          const opacity = Math.max(0.08, 1 - Math.pow(absOffset / 2.8, 1.6));
          const blurAmount = Math.min(4, absOffset * 0.85);
          const isFocal = Math.abs(offset) < 0.4;

          return (
            <motion.div
              key={item.id}
              onClick={() => scrollTo(idx)}
              className="absolute left-2 right-2 flex items-center cursor-pointer transition-colors"
              style={{
                top: y - 24,
                height: 48,
                transformOrigin: 'left center',
                scale,
                opacity,
                filter: \`blur(\${blurAmount}px)\`,
              }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{
                    width: isFocal ? 22 : 0,
                    opacity: isFocal ? 1 : 0,
                    marginRight: isFocal ? 4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  className="h-[2px] bg-white rounded-full flex-shrink-0"
                />
                <span
                  className={\`tracking-tight font-heading select-none \${
                    isFocal
                      ? 'text-2xl font-bold text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)]'
                      : 'text-lg font-medium text-neutral-400 hover:text-neutral-200'
                  }\`}
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

export default KineticLensSidebar;`;
