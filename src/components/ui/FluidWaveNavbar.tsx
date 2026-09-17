import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, User, FolderKanban, Mail } from 'lucide-react';

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
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
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

  const items: NavItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: (active) => (
        <Home
          size={22}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
    {
      id: 'about',
      label: 'About',
      icon: (active) => (
        <User
          size={22}
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
        <FolderKanban
          size={22}
          strokeWidth={active ? 0 : 2.2}
          fill={active ? 'currentColor' : 'none'}
          className="transition-all duration-200"
        />
      ),
    },
    {
      id: 'contacts',
      label: 'Contacts',
      icon: (active) => (
        <Mail
          size={22}
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
    <div className={`relative flex flex-col items-center select-none ${className}`}>
      {/* ── Main Navbar Pill with Upward Scooped Notch ── */}
      <div
        className={`relative w-[340px] sm:w-[360px] h-[74px] rounded-[28px] flex items-center justify-between px-2 overflow-hidden border transition-colors duration-200 z-20 ${
          isDark
            ? 'bg-[#1E1B28] border-white/12 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)]'
            : 'bg-white border-black/[0.08] shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)]'
        }`}
      >
        {/* ── The Gliding Liquid Notch Scoop at the Bottom ── */}
        <motion.div
          animate={{
            x: activeIndex * slotWidth + (slotWidth / 2) - 37,
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
            className={`w-1.5 h-1.5 rounded-full mb-1.5 shadow-sm ${
              isDark ? 'bg-white' : 'bg-[#18181B]'
            }`}
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
              fill={isDark ? '#141218' : '#EAEAEA'}
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
                  color: isDark
                    ? isActive ? '#FFFFFF' : '#8A8494'
                    : isActive ? '#18181B' : '#9CA3AF',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 420,
                  damping: 22,
                }}
                className={`relative z-20 flex items-center justify-center transition-colors ${
                  isDark
                    ? 'text-[#8A8494] group-hover:text-white'
                    : 'text-[#9CA3AF] group-hover:text-[#18181B]'
                }`}
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
