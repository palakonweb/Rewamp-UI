export const fluidWaveNavbarPrompt = `Create an interactive floating pill navbar component with a liquid sliding scoop notch indicator, based on the reference video, using dark grey accents instead of blue:
- Canvas: An expansive, sophisticated dark grey surface (#222227).
- Navbar Pill: A pristine white rounded capsule (350px) with generous border radius and ambient drop shadows.
- Navigation Items: 3 tabs (About, Projects, Contact) with clean minimalist icons.
- Hover & Motion Dynamics:
  - Works on hover: hovering over any tab smoothly shifts the active state.
  - Active icon springs up (-5px, scale: 1.15) and fills with solid dark grey (#18181B).
  - Inactive icons sit in muted cool grey (#9CA3AF) outlines.
  - A dark grey liquid scoop notch smoothly glides along the bottom edge directly beneath the active item via spring physics, revealing the dark grey background curving upwards into the white bar.
  - A small dark accent dot floats at the crest of the scoop beneath the active icon.
- Styling: Premium dark grey/graphite tones, tactile micro-interactions, and responsive layout.`;

export const fluidWaveNavbarCode = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, MessageCircle } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: (active: boolean) => React.ReactNode;
}

export interface FluidWaveNavbarProps {
  initialActive?: number;
  className?: string;
  onChange?: (index: number) => void;
}

export default function FluidWaveNavbar({
  initialActive = 0,
  className = '',
  onChange,
}: FluidWaveNavbarProps) {
  const [activeIndex, setActiveIndex] = useState(initialActive);

  const items: NavItem[] = [
    {
      id: 'about',
      label: 'About',
      icon: (active) => (
        <Home
          size={24}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: (active) => (
        <Heart
          size={24}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: (active) => (
        <MessageCircle
          size={24}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
  ];

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  const navWidth = 360;
  const innerWidth = navWidth - 16;
  const slotWidth = innerWidth / items.length;

  return (
    <div className={\`relative flex flex-col items-center select-none \${className}\`}>
      {/* ── Main Navbar Pill with Upward Scooped Notch ── */}
      <div
        className={\`relative w-[320px] sm:w-[360px] h-[70px] sm:h-[74px] rounded-[28px] flex items-center justify-between px-2 overflow-hidden border transition-colors duration-200 z-20 shrink-0 \${
          isDark
            ? 'bg-[#1E1B28] border-white/12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)]'
            : 'bg-white border-black/[0.08] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)]'
        }\`}
      >
        
        {/* ── The Gliding Liquid Notch Scoop at the Bottom ── */}
        <motion.div
          animate={{
            left: \`\${(activeIndex + 0.5) * (100 / items.length)}%\`,
            x: '-50%',
          }}
          transition={{
            type: 'spring',
            stiffness: 340,
            damping: 26,
            mass: 0.8,
          }}
          className="absolute bottom-0 w-[74px] h-[22px] pointer-events-none z-10 flex flex-col items-center justify-end"
        >
          {/* Dot floating right at the crest of the scoop */}
          <motion.div
            key={activeIndex}
            initial={{ scale: 0.4, opacity: 0, y: 3 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 450, damping: 20 }}
            className={\`w-1.5 h-1.5 rounded-full mb-1.5 shadow-sm \${
              isDark ? 'bg-white' : 'bg-[#18181B]'
            }\`}
          />

          {/* Upward concave arch carved into bottom edge matching stage backdrop */}
          <svg
            viewBox="0 0 74 20"
            className="w-full h-[18px]"
            preserveAspectRatio="none"
          >
            <path
              d="M 0 20
                 C 16 20, 22 2, 37 2
                 C 52 2, 58 20, 74 20
                 Z"
              fill="url(#notchDarkGradient)"
            />
          </svg>
        </motion.div>

        {/* ── Tab Buttons ── */}
        {items.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <button
              key={item.id}
              type="button"
              onMouseEnter={() => handleSelect(index)}
              onClick={() => handleSelect(index)}
              aria-label={item.label}
              className="relative flex-1 h-full flex flex-col items-center justify-center cursor-pointer group focus:outline-none z-20 pt-1"
            >
              {/* Icon Container with Spring Pop Elevation */}
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  y: isActive ? -5 : 0,
                  color: isActive ? '#18181B' : '#9CA3AF',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 22,
                }}
                className="relative z-20 flex items-center justify-center text-[#9CA3AF] group-hover:text-[#18181B] transition-colors"
              >
                {item.icon(isActive)}
              </motion.div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
`;
