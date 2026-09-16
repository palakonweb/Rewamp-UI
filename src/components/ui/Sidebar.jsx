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
            isActive ? 'bg-[#EC5E27]' : 'bg-neutral-800 dark:bg-neutral-200'
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
            isActive ? 'bg-[#EC5E27]' : 'bg-neutral-800 dark:bg-neutral-200'
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
          isActive ? 'text-[#EC5E27]' : 'text-neutral-800 dark:text-neutral-200'
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
          isActive ? 'border-[#EC5E27]' : 'border-neutral-800 dark:border-neutral-200'
        }`}
      />
      <motion.div
        animate={isHovered ? { scaleX: 1.18, y: -0.5 } : { scaleX: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        className={`w-4 h-2 mt-0.5 rounded-t-full border-[1.8px] border-b-0 transition-colors duration-200 ${
          isActive ? 'border-[#EC5E27]' : 'border-neutral-800 dark:border-neutral-200'
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
          isActive ? 'border-[#EC5E27]' : 'border-neutral-800 dark:border-neutral-200'
        }`}
      >
        {[0, 1, 2].map((line) => (
          <motion.div
            key={line}
            className={`h-[1.5px] rounded-full transition-colors duration-200 ${
              isActive ? 'bg-[#EC5E27]' : 'bg-neutral-800 dark:bg-neutral-200'
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
          isActive ? 'text-[#EC5E27]' : 'text-neutral-800 dark:text-neutral-200'
        }`}
      />
      <motion.span
        animate={isHovered ? { scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] } : { scale: 1, opacity: 0.9 }}
        transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
        className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#EC5E27]"
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
          isActive ? 'text-[#EC5E27]' : 'text-neutral-800 dark:text-neutral-200'
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
        className="relative w-11 h-11 flex items-center justify-center rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#EC5E27] cursor-pointer"
        aria-label={item.label}
      >
        {/* Active Pill Background */}
        {isActive && (
          <motion.div
            layoutId="sidebar-active-pill"
            className="absolute inset-0 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/80 dark:border-neutral-700/80 shadow-xs"
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
            className="absolute -left-1 w-1 h-4 rounded-r-full bg-[#EC5E27]"
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/95 dark:bg-neutral-800/95 border border-white/10 text-white text-xs shadow-xl backdrop-blur-md whitespace-nowrap">
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
  const [isDark, setIsDark] = useState(false);

  const cellProps = { activeItem, setActiveItem, hovered, setHovered };

  return (
    <div className={`w-full flex items-center justify-center p-6 ${isDark ? 'dark' : ''}`}>
      <div className="flex items-center gap-6">
        {/* Docked Animated Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-[68px] min-h-[560px] rounded-2xl shadow-xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white dark:bg-[#111216] flex flex-col justify-between overflow-visible transition-colors duration-300"
        >
          {/* Top Section */}
          <div>
            {/* Window Chrome Controls */}
            <div className="flex items-center gap-1.5 px-4 pt-4 pb-3">
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

            {/* Theme Toggle Button */}
            <div className="border-b border-neutral-100 dark:border-neutral-800/80 px-3 pb-3">
              <button
                type="button"
                onClick={() => setIsDark((d) => !d)}
                className="w-full h-10 flex items-center justify-center rounded-xl border border-neutral-200/60 dark:border-neutral-800 hover:bg-neutral-100/60 dark:hover:bg-neutral-800/60 text-neutral-800 dark:text-neutral-200 transition-colors cursor-pointer"
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isDark ? (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Moon size={18} strokeWidth={1.9} className="text-amber-400" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Sun size={18} strokeWidth={1.9} className="text-neutral-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
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
                      ? 'border-[#EC5E27] bg-neutral-100 dark:bg-neutral-800'
                      : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 bg-transparent'
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
                      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-900/95 dark:bg-neutral-800/95 border border-white/10 text-white text-xs shadow-xl backdrop-blur-md whitespace-nowrap">
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

        {/* Companion Interactive Workspace Preview */}
        <div className="hidden sm:flex flex-col w-[260px] md:w-[320px] h-[560px] rounded-2xl border border-neutral-200/80 dark:border-neutral-800/80 bg-white/80 dark:bg-[#111216]/80 p-5 shadow-lg backdrop-blur-md justify-between transition-colors">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-[11px] font-mono uppercase text-[#EC5E27] tracking-wider font-semibold">
                Active View
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                Dock Mode
              </span>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white capitalize">
                {activeItem}
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                Hover over the sidebar icons on the left to see bespoke micro-animations and directional tooltips.
              </p>
            </div>

            {/* Mini preview card */}
            <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/60 dark:border-neutral-800">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span>Selected</span>
                <span className="text-[#EC5E27] font-semibold">{activeItem}</span>
              </div>
              <div className="h-1.5 w-full bg-neutral-200 dark:bg-neutral-800 rounded-full mt-3 overflow-hidden">
                <motion.div
                  className="h-full bg-[#EC5E27] rounded-full"
                  initial={{ width: '30%' }}
                  animate={{ width: `${Math.floor(Math.random() * 40 + 50)}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono text-neutral-400 text-center">
            Interactive macOS Dock
          </div>
        </div>
      </div>
    </div>
  );
}

Sidebar.customTitle = 'Animated Dock Sidebar';
Sidebar.customSlug = 'sidebar';
