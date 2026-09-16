export const kineticLensSidebarPrompt = `Create a vertical kinetic lens rolodex sidebar menu matching Recording 2026-09-15 155640.mp4.

Requirements:
- Pure pitch black canvas (#000000) with crisp vector typography.
- Items represent design agency services: Design Gráfico, Branding, Estratégia, Design de Posts, Landing Page, Copywritter, Site, Identidade Verbal, Design Editorial, Consultoria, Naming, Identidade Visual, Criativos.
- The active center item is bright pure white (#FFFFFF), larger scale, semibold, with an animated horizontal dash "— " preceding it.
- Peripheral items are crisp deep indigo (#282D52) fading smoothly towards top and bottom edges into pitch black.
- Scroll-reactive: continuous fractional mouse wheel scrubbing with inertia, touch/pointer drag, debounced snap to nearest item, and support for page or container scroll progress binding.`;

export const kineticLensSidebarCode = `import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const DEFAULT_LENS_ITEMS = [
  { id: 'design-grafico', label: 'Design Gráfico' },
  { id: 'branding', label: 'Branding' },
  { id: 'estrategia', label: 'Estratégia' },
  { id: 'design-de-posts', label: 'Design de Posts' },
  { id: 'landing-page', label: 'Landing Page' },
  { id: 'copywritter', label: 'Copywritter' },
  { id: 'site', label: 'Site' },
  { id: 'identidade-verbal', label: 'Identidade Verbal' },
  { id: 'design-editorial', label: 'Design Editorial' },
  { id: 'consultoria', label: 'Consultoria' },
  { id: 'naming', label: 'Naming' },
  { id: 'identidade-visual', label: 'Identidade Visual' },
  { id: 'criativos', label: 'Criativos' },
];

export function KineticLensSidebar({
  items = null,
  initialIndex = 4,
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
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const targetIndex = useMotionValue(initialIndex);
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

  useEffect(() => {
    if (scrollProgress === null || scrollProgress === undefined) return;
    if (typeof scrollProgress === 'number') {
      const clamped = Math.max(0, Math.min(numItems - 1, scrollProgress * (numItems - 1)));
      targetIndex.set(clamped);
    } else if (scrollProgress?.get) {
      return scrollProgress.on('change', (latest) => {
        const clamped = Math.max(0, Math.min(numItems - 1, Number(latest) * (numItems - 1)));
        targetIndex.set(clamped);
      });
    }
  }, [scrollProgress, numItems, targetIndex]);

  const scrollTo = useCallback(
    (idx) => {
      const clamped = Math.max(0, Math.min(numItems - 1, idx));
      targetIndex.set(clamped);
      setActiveIndex(clamped);
      onSelect?.(menuItems[clamped]);
    },
    [numItems, targetIndex, onSelect, menuItems]
  );

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

  // Non-passive wheel scrubbing with continuous fractional delta and inertia snap
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleNativeWheel = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const delta = e.deltaY * 0.0032;
      const current = targetIndex.get();
      const next = Math.max(0, Math.min(numItems - 1, current + delta));
      targetIndex.set(next);

      if (snapTimeoutRef.current) clearTimeout(snapTimeoutRef.current);
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
    };
  }, [numItems, targetIndex, onSelect, menuItems]);

  const rowHeight = 58;
  const centerY = 270;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={\`relative w-full max-w-[380px] h-[540px] bg-black overflow-hidden select-none cursor-grab active:cursor-grabbing px-6 sm:px-8 flex flex-col justify-center \${className}\`}
    >
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            'linear-gradient(to bottom, #000000 0%, rgba(0, 0, 0, 0.95) 12%, transparent 32%, transparent 68%, rgba(0, 0, 0, 0.95) 88%, #000000 100%)',
        }}
      />

      <div className="relative w-full h-full z-10">
        {menuItems.map((item, idx) => {
          const offset = idx - displayIndex;
          const absOffset = Math.abs(offset);
          if (absOffset > 5.2) return null;

          const y = centerY + offset * rowHeight;
          const isFocal = absOffset < 0.45;
          const focalFactor = Math.max(0, 1 - absOffset * 2.2);

          const distanceFade = Math.max(0, 1 - Math.pow(absOffset / 4.4, 1.8));
          const textColor = isFocal
            ? '#FFFFFF'
            : \`rgba(45, 52, 92, \${Math.min(1, distanceFade * 0.95).toFixed(3)})\`;

          const scale = 0.82 + focalFactor * 0.18;

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
              <div className="flex items-center">
                <div
                  className="overflow-hidden flex items-center transition-all duration-150 ease-out"
                  style={{
                    width: \`\${(focalFactor * 32).toFixed(1)}px\`,
                    opacity: focalFactor,
                    marginRight: \`\${(focalFactor * 14).toFixed(1)}px\`,
                  }}
                >
                  <div className="w-[28px] h-[2.5px] bg-white rounded-full flex-shrink-0" />
                </div>

                <span
                  className={\`tracking-[-0.03em] font-sans antialiased select-none whitespace-nowrap transition-colors duration-150 \${
                    isFocal
                      ? 'text-[32px] sm:text-[36px] font-semibold text-white'
                      : 'text-[24px] sm:text-[27px] font-medium'
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
