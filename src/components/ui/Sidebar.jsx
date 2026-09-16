import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Settings, Calendar, Search } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                        Lively Animated Icon Components                     */
/* -------------------------------------------------------------------------- */

// 1. Dashboard: Staggered Quadrant Micro-Ripple
function AnimatedDashboardIcon({ isHovered, isActive }) {
  return (
    <div className="relative w-5 h-5 grid grid-cols-2 gap-[2.5px] p-0.5">
      {[0, 1, 3, 2].map((i, idx) => (
        <motion.div
          key={i}
          className={`rounded-[2px] transition-colors duration-200 ${
            isActive ? 'bg-[#171717] dark:bg-[#D4CBE5]' : 'bg-neutral-700 dark:bg-neutral-300'
          }`}
          animate={
            isHovered
              ? {
                  scale: [1, 1.22, 1],
                  rotate: [0, idx % 2 === 0 ? 8 : -8, 0],
                  borderRadius: ['2px', '3.5px', '2px'],
                }
              : { scale: 1, rotate: 0, borderRadius: '2px' }
          }
          transition={{
            duration: 0.45,
            delay: idx * 0.05,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}
    </div>
  );
}

// 2. Analytics: Dynamic 3-Bar Equalizer Wave
function AnimatedAnalyticsIcon({ isHovered, isActive }) {
  const bars = [
    { base: 8, peak: 15, delay: 0 },
    { base: 14, peak: 18, delay: 0.07 },
    { base: 10, peak: 16, delay: 0.14 },
  ];

  return (
    <div className="relative w-5 h-5 flex items-end justify-center gap-1 pb-0.5">
      {bars.map((bar, idx) => (
        <motion.div
          key={idx}
          className={`w-1 rounded-full transition-colors duration-200 ${
            isActive ? 'bg-[#171717] dark:bg-[#D4CBE5]' : 'bg-neutral-700 dark:bg-neutral-300'
          }`}
          style={{ height: bar.base }}
          animate={
            isHovered
              ? {
                  height: [bar.base, bar.peak, bar.base * 0.6, bar.peak, bar.base],
                }
              : { height: bar.base }
          }
          transition={{
            duration: 0.55,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// 3. Settings: Mechanical Gear Rotation
function AnimatedSettingsIcon({ isHovered, isActive }) {
  return (
    <motion.div
      animate={isHovered ? { rotate: 90 } : { rotate: 0 }}
      transition={{ type: 'spring', stiffness: 240, damping: 16 }}
      className="relative flex items-center justify-center"
    >
      <Settings
        size={20}
        strokeWidth={1.9}
        className={`transition-colors duration-200 ${
          isActive ? 'text-[#171717] dark:text-[#D4CBE5]' : 'text-neutral-700 dark:text-neutral-300'
        }`}
      />
    </motion.div>
  );
}

// 4. Profile / User: Nodding Avatar
function AnimatedProfileIcon({ isHovered, isActive }) {
  return (
    <div className="relative w-5 h-5 flex flex-col items-center justify-center">
      <motion.div
        animate={isHovered ? { y: -2, scale: 1.15 } : { y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
        className={`w-2.5 h-2.5 rounded-full border-[1.8px] transition-colors duration-200 ${
          isActive ? 'border-[#171717] dark:border-[#D4CBE5]' : 'border-neutral-700 dark:border-neutral-300'
        }`}
      />
      <motion.div
        animate={isHovered ? { scaleX: 1.18, y: -0.5 } : { scaleX: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className={`w-4 h-2 mt-0.5 rounded-t-full border-[1.8px] border-b-0 transition-colors duration-200 ${
          isActive ? 'border-[#171717] dark:border-[#D4CBE5]' : 'border-neutral-700 dark:border-neutral-300'
        }`}
      />
    </div>
  );
}

// 5. Documents: Sliding Content Lines
function AnimatedDocumentsIcon({ isHovered, isActive }) {
  return (
    <div className="relative w-5 h-5 flex items-center justify-center">
      <div
        className={`w-[17px] h-[19px] rounded-[3px] border-[1.8px] relative flex flex-col justify-center px-1 gap-[2.5px] transition-colors duration-200 ${
          isActive ? 'border-[#171717] dark:border-[#D4CBE5]' : 'border-neutral-700 dark:border-neutral-300'
        }`}
      >
        {[0, 1, 2].map((line) => (
          <motion.div
            key={line}
            className={`h-[1.5px] rounded-full transition-colors duration-200 ${
              isActive ? 'bg-[#171717] dark:bg-[#D4CBE5]' : 'bg-neutral-700 dark:bg-neutral-300'
            }`}
            style={{ width: line === 2 ? '55%' : '80%' }}
            animate={
              isHovered
                ? {
                    scaleX: [1, 0.4, 1.1, 1],
                    originX: 0,
                  }
                : { scaleX: 1 }
            }
            transition={{
              duration: 0.45,
              delay: line * 0.07,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// 6. Calendar: Flip Wobble & Active Glow Dot
function AnimatedCalendarIcon({ isHovered, isActive }) {
  return (
    <motion.div
      animate={
        isHovered
          ? {
              rotate: [0, -7, 7, -3, 3, 0],
              scale: [1, 1.08, 1],
            }
          : { rotate: 0, scale: 1 }
      }
      transition={{ duration: 0.48, ease: 'easeInOut' }}
      className="relative flex items-center justify-center"
    >
      <Calendar
        size={20}
        strokeWidth={1.9}
        className={`transition-colors duration-200 ${
          isActive ? 'text-[#171717] dark:text-[#D4CBE5]' : 'text-neutral-700 dark:text-neutral-300'
        }`}
      />
      <motion.span
        animate={isHovered ? { scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] } : { scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#9C8EB8] dark:bg-[#D4CBE5]"
      />
    </motion.div>
  );
}

// 7. Search: Zoom & Tilt Micro-Animation
function AnimatedSearchIcon({ isHovered, isActive }) {
  return (
    <motion.div
      animate={
        isHovered
          ? {
              rotate: [0, -12, 12, 0],
              scale: [1, 1.16, 1],
            }
          : { rotate: 0, scale: 1 }
      }
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
    >
      <Search
        size={20}
        strokeWidth={1.9}
        className={`transition-colors duration-200 ${
          isActive ? 'text-[#171717] dark:text-[#D4CBE5]' : 'text-neutral-700 dark:text-neutral-300'
        }`}
      />
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*                               Menu Datasets                                */
/* -------------------------------------------------------------------------- */

const GROUP_A = [
  { id: 'dashboard', icon: AnimatedDashboardIcon, label: 'Dashboard', shortcut: '⌘1' },
];

const GROUP_B = [
  { id: 'analytics', icon: AnimatedAnalyticsIcon, label: 'Analytics', shortcut: '⌘2' },
  { id: 'settings', icon: AnimatedSettingsIcon, label: 'Settings', shortcut: '⌘,' },
];

const GROUP_C = [
  { id: 'profile', icon: AnimatedProfileIcon, label: 'Profile', shortcut: '⌘P' },
  { id: 'documents', icon: AnimatedDocumentsIcon, label: 'Documents', shortcut: '⌘D' },
];

const GROUP_D = [
  { id: 'calendar', icon: AnimatedCalendarIcon, label: 'Calendar', shortcut: '⌘C' },
];

/* -------------------------------------------------------------------------- */
/*                       IconCell with Hover Tooltip                          */
/* -------------------------------------------------------------------------- */

function IconCell({ item, activeItem, setActiveItem, hovered, setHovered }) {
  const IconComponent = item.icon;
  const isActive = activeItem === item.id;
  const isHovered = hovered === item.id;

  return (
    <div
      className="relative w-full h-14 flex items-center justify-center"
      onMouseEnter={() => setHovered(item.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <button
        type="button"
        onClick={() => setActiveItem(item.id)}
        className="relative w-11 h-11 flex items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#D4CBE5] cursor-pointer"
        aria-label={item.label}
      >
        {/* Active Pill Background */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-xl bg-[#D4CBE5]/30 dark:bg-[#D4CBE5]/20 border border-[#D4CBE5]/50 dark:border-[#D4CBE5]/30 shadow-xs"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}

        {/* Animated Icon Container */}
        <div
          className={`relative z-10 flex items-center justify-center rounded-lg transition-colors duration-150 w-full h-full ${
            !isActive ? 'hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60' : ''
          }`}
        >
          <IconComponent isHovered={isHovered} isActive={isActive} />
        </div>

        {/* Active Side Pip */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pip"
            className="absolute -left-1 w-1 h-4 rounded-r-full bg-[#171717] dark:bg-[#D4CBE5]"
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
      </button>

      {/* Directional Hover Tooltip */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -8, scale: 0.94 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -6, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 480, damping: 28 }}
            className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-50 pointer-events-none flex items-center"
          >
            {/* Tooltip Pointer Arrow */}
            <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-neutral-900 dark:border-r-neutral-800 drop-shadow-xs" />

            {/* Tooltip Box */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/95 dark:bg-[#171717]/95 border border-white/10 dark:border-neutral-700 text-white text-xs shadow-xl backdrop-blur-md whitespace-nowrap">
              <span className="font-medium tracking-tight">{item.label}</span>
              {item.shortcut && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-neutral-300 border border-white/10">
                  {item.shortcut}
                </span>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Main Sidebar Component                          */
/* -------------------------------------------------------------------------- */

export default function Sidebar({ onWindowAction }) {
  const [activeItem, setActiveItem] = useState('dashboard');
  const [hovered, setHovered] = useState(null);

  const cellProps = { activeItem, setActiveItem, hovered, setHovered };

  return (
    <div className="w-full flex items-center justify-center py-10 px-4">
      {/* Docked Animated Sidebar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-[68px] min-h-[540px] rounded-2xl shadow-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#111216] flex flex-col justify-between overflow-visible transition-colors duration-300"
      >
        {/* Top Section */}
        <div>
          {/* Window Chrome Controls */}
          <div className="flex items-center gap-1.5 px-4 pt-4 pb-2.5">
            {[
              { color: '#FB5D57', label: 'close' },
              { color: '#FDBC40', label: 'minimize' },
              { color: '#33C748', label: 'zoom' },
            ].map((dot) => (
              <button
                key={dot.label}
                type="button"
                onClick={() => onWindowAction?.(dot.label)}
                className="w-2.5 h-2.5 rounded-full transition-transform duration-150 hover:scale-125 cursor-pointer"
                style={{ backgroundColor: dot.color }}
                aria-label={dot.label}
              />
            ))}
          </div>

          {/* Brand Flower Nav Mark */}
          <div className="flex items-center justify-center pb-2.5 border-b border-neutral-100 dark:border-neutral-800/80">
            <div className="w-9 h-9 rounded-xl bg-neutral-100/80 dark:bg-white/5 flex items-center justify-center hover:bg-[#D4CBE5]/25 dark:hover:bg-[#D4CBE5]/20 transition-all cursor-pointer shadow-xs">
              <svg 
                viewBox="0 0 24 24" 
                className="w-4 h-4 drop-shadow-[0_2px_6px_rgba(212,203,229,0.7)]" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="5.8" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="17.4" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="17.4" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="12" cy="18.2" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="6.6" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="6.6" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
                <circle cx="12" cy="12" r="3.4" fill="#262626" stroke="#FAFAFA" strokeWidth="0.8" />
                <circle cx="12" cy="12" r="1.3" fill="#D4CBE5" />
              </svg>
            </div>
          </div>

          {/* Group A */}
          <div className="border-b border-neutral-100 dark:border-neutral-800/80 py-1">
            {GROUP_A.map((item) => (
              <IconCell key={item.id} item={item} {...cellProps} />
            ))}
          </div>

          {/* Group B */}
          <div className="border-b border-neutral-100 dark:border-neutral-800/80 py-1">
            {GROUP_B.map((item) => (
              <IconCell key={item.id} item={item} {...cellProps} />
            ))}
          </div>

          {/* Group C */}
          <div className="border-b border-neutral-100 dark:border-neutral-800/80 py-1">
            {GROUP_C.map((item) => (
              <IconCell key={item.id} item={item} {...cellProps} />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div>
          {/* Group D: Calendar */}
          <div className="py-1">
            {GROUP_D.map((item) => (
              <IconCell key={item.id} item={item} {...cellProps} />
            ))}
          </div>

          {/* Search Button with Animated Icon & Tooltip */}
          <div className="relative px-3 pb-4 pt-1">
            <div
              onMouseEnter={() => setHovered('search')}
              onMouseLeave={() => setHovered(null)}
              className="relative"
            >
              <button
                type="button"
                onClick={() => setActiveItem('search')}
                className={`w-full h-11 flex items-center justify-center rounded-xl border transition-all duration-150 cursor-pointer ${
                  activeItem === 'search'
                    ? 'border-[#D4CBE5] bg-[#D4CBE5]/25 dark:bg-[#D4CBE5]/20 shadow-xs'
                    : 'border-neutral-200/80 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
                }`}
                aria-label="Search"
              >
                <AnimatedSearchIcon
                  isHovered={hovered === 'search'}
                  isActive={activeItem === 'search'}
                />
              </button>

              {/* Tooltip for Search */}
              <AnimatePresence>
                {hovered === 'search' && (
                  <motion.div
                    initial={{ opacity: 0, x: -8, scale: 0.94 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -6, scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 480, damping: 28 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-3.5 z-50 pointer-events-none flex items-center"
                  >
                    <div className="w-0 h-0 border-y-[5px] border-y-transparent border-r-[6px] border-r-neutral-900 dark:border-r-neutral-800" />
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/95 dark:bg-[#171717]/95 border border-white/10 dark:border-neutral-700 text-white text-xs shadow-xl backdrop-blur-md whitespace-nowrap">
                      <span className="font-medium tracking-tight">Search</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-white/15 text-neutral-300 border border-white/10">
                        ⌘K
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

Sidebar.customTitle = 'Animated Dock Sidebar';
Sidebar.customSlug = 'sidebar';
