export const fluidWaveNavbarPrompt = `Create an interactive floating pill navbar component with a liquid sliding scoop notch indicator, based on the reference video, using dark grey accents instead of blue:
- Canvas: An expansive, sophisticated dark grey surface (#222227).
- Navbar Pill: A pristine white rounded capsule (350px) with generous border radius and ambient drop shadows.
- Navigation Items: 4 tabs (Home, Favorites, Messages, Files) with clean minimalist icons.
- Hover & Motion Dynamics:
  - Works on hover: hovering over any tab smoothly shifts the active state.
  - Active icon springs up (-5px, scale: 1.15) and fills with solid dark grey (#18181B).
  - Inactive icons sit in muted cool grey (#9CA3AF) outlines.
  - A dark grey liquid scoop notch smoothly glides along the bottom edge directly beneath the active item via spring physics, revealing the dark grey background curving upwards into the white bar.
  - A small dark accent dot floats at the crest of the scoop beneath the active icon.
- Styling: Premium dark grey/graphite tones, tactile micro-interactions, and responsive layout.`;

export const fluidWaveNavbarCode = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Heart, MessageCircle, Folder } from 'lucide-react';

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
      id: 'home',
      label: 'Home',
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
      id: 'favorites',
      label: 'Favorites',
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
      id: 'messages',
      label: 'Messages',
      icon: (active) => (
        <MessageCircle
          size={24}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
    {
      id: 'files',
      label: 'Files',
      icon: (active) => (
        <Folder
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

  return (
    <div className={\`relative flex flex-col items-center select-none \${className}\`}>
      {/* ── Main White Navbar Pill with Upward Scooped Notch ── */}
      <div className="relative w-[340px] sm:w-[350px] h-[76px] bg-white rounded-[28px] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] flex items-center justify-between px-2 overflow-hidden border border-black/5 z-20">
        
        {/* ── The Gliding Liquid Notch Scoop at the Bottom ── */}
        <motion.div
          animate={{
            x: activeIndex * (334 / 4) + (334 / 8) - 37,
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
            className="w-1.5 h-1.5 rounded-full bg-[#18181B] mb-1.5 shadow-sm"
          />

          {/* Upward concave arch carved into bottom edge matching dark grey backdrop */}
          <svg
            viewBox="0 0 74 20"
            className="w-full h-[18px]"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="notchDarkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2D2D33" />
                <stop offset="50%" stopColor="#222227" />
                <stop offset="100%" stopColor="#18181D" />
              </linearGradient>
            </defs>
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
