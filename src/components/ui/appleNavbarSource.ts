export const appleNavbarPrompt = `Create an authentic MacBook Dynamic Notch Navbar:
- Resting AI Thinking State (matching Claude AI assistant style):
  - Black dynamic notch hanging from the top screen bezel (276px wide by 66px tall).
  - Top line: Live assistant action status (e.g. "Read input.tsx 23 lines").
  - Bottom line: Glowing orange breathing indicator pill (Purrform brand #EC5E27) accompanied by "Thinking" status text.
  - Authentic top-left and top-right concave flares (SVG paths) curving seamlessly into the top bezel line.
- Alternative Camera Notch State:
  - Compact camera notch with optical lens aperture and pulsing green indicator LED.
- Hover & Dynamic Island Expansion:
  - On hover or touch, the notch fluidly expands using spring physics (stiffness: 360, damping: 28) into a full-featured macOS NotchNook navbar (710px wide by 104px tall).
  - Top Bar: "Nook" / "Tray" pill tabs, live calendar days strip (with active date highlight), and settings gear.
  - Main Row:
    - Left: Mini Spotify/media player widget with album art, Purrform paw glyph, and play/pause/skip controls.
    - Center: Navigation links with a magnetic Framer Motion sliding hover pill.
    - Right: "+ Add To Reminders" pill button with check confirmation, mirror camera icon, and primary CTA.
- Smooth contraction back to the compact notch on mouse leave.
- Tech Stack: React, Framer Motion, TypeScript, Tailwind CSS, Lucide Icons.`;

export const appleNavbarCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Sparkles, Play, Pause, SkipForward, SkipBack, Settings, Camera, Music, Check, Folder } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export interface AppleNavbarProps {
  brandName?: string;
  items?: NavItem[];
  downloadText?: string;
  onDownload?: () => void;
  activeHref?: string;
  className?: string;
  /** Force expanded state */
  alwaysExpanded?: boolean;
  /** Resting notch display mode: 'ai-thinking' (matching user screenshot) or 'camera' */
  notchMode?: 'ai-thinking' | 'camera';
  /** Custom action text in AI Thinking mode */
  actionText?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
  { label: 'Components', href: '#components' },
  { label: 'Features', href: '#features' },
  { label: 'Templates', href: '#templates' },
  { label: 'Pricing', href: '#pricing' },
];

const CALENDAR_DAYS = [
  { day: 'S', date: 10 },
  { day: 'M', date: 11 },
  { day: 'T', date: 12 },
  { day: 'W', date: 13, isToday: true },
  { day: 'T', date: 14 },
  { day: 'F', date: 15 },
  { day: 'S', date: 16 },
];

const AI_STEPS = [
  'Read input.tsx 23 lines',
  'Analyzed design tokens',
  'Editing AppleNavbar.tsx',
  'Compiling Vite bundle',
];

export const AppleNavbar: React.FC<AppleNavbarProps> = ({
  brandName = 'Purrform',
  items = DEFAULT_ITEMS,
  downloadText = 'Browse',
  onDownload,
  activeHref = '#components',
  className = '',
  alwaysExpanded = false,
  notchMode = 'ai-thinking',
  actionText,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<'nook' | 'tray'>('nook');
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredNavIdx, setHoveredNavIdx] = useState<number | null>(null);
  const [currentHref, setCurrentHref] = useState(activeHref);
  const [reminderAdded, setReminderAdded] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (notchMode !== 'ai-thinking' || actionText) return;
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % AI_STEPS.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [notchMode, actionText]);

  const expanded = alwaysExpanded || isHovered;
  const currentActionText = actionText || AI_STEPS[stepIndex];

  const handleAddReminder = (e: React.MouseEvent) => {
    e.stopPropagation();
    setReminderAdded(true);
    setTimeout(() => setReminderAdded(false), 2000);
  };

  const restingWidth = notchMode === 'ai-thinking' ? 276 : 184;
  const restingHeight = notchMode === 'ai-thinking' ? 66 : 33;
  const restingRadius = notchMode === 'ai-thinking' ? 24 : 18;

  return (
    <header className={\`relative w-full select-none flex justify-center z-50 \${className}\`}>
      {/* ── Top Bezel Line ── */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-black pointer-events-none" />

      {/* ── Dynamic MacBook Notch Container ── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredNavIdx(null);
        }}
        className="relative flex justify-center"
      >
        <motion.nav
          layout
          initial={false}
          animate={{
            width: expanded ? 710 : restingWidth,
            height: expanded ? 104 : restingHeight,
            borderBottomLeftRadius: expanded ? 28 : restingRadius,
            borderBottomRightRadius: expanded ? 28 : restingRadius,
          }}
          transition={{
            type: 'spring',
            stiffness: 360,
            damping: 28,
            mass: 0.85,
          }}
          className={\`relative bg-black border-x border-b border-white/[0.08] shadow-[0_20px_48px_rgba(0,0,0,0.65)] cursor-pointer overflow-hidden flex flex-col justify-between \${
            expanded
              ? 'p-3.5 sm:p-4'
              : notchMode === 'ai-thinking'
              ? 'px-4 pt-2 pb-2.5 items-center justify-center'
              : 'px-3 py-1.5 items-center justify-center'
          }\`}
          style={{
            maxWidth: 'calc(100vw - 2rem)',
          }}
        >
          {/* Left Concave Flare */}
          <svg
            className="absolute top-0 left-0 -translate-x-full w-4 h-4 pointer-events-none"
            viewBox="0 0 16 16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,0 L16,0 L16,16 C16,7 9,0 0,0 Z" fill="#000000" />
          </svg>

          {/* Right Concave Flare */}
          <svg
            className="absolute top-0 right-0 translate-x-full w-4 h-4 pointer-events-none [transform:scaleX(-1)]"
            viewBox="0 0 16 16"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path d="M0,0 L16,0 L16,16 C16,7 9,0 0,0 Z" fill="#000000" />
          </svg>

          {/* 1. RESTING STATE A: CLAUDE AI CODE THINKING NOTCH */}
          {!expanded && notchMode === 'ai-thinking' && (
            <motion.div
              key="notch-ai-thinking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col items-center justify-center w-full h-full text-center select-none"
            >
              <span className="text-[13px] text-[#A1A1AA] font-mono tracking-tight leading-none truncate max-w-[240px]">
                {currentActionText}
              </span>

              <div className="flex items-center justify-center gap-2.5 mt-2">
                <motion.div
                  animate={{
                    scaleX: [1, 1.08, 1],
                    opacity: [0.85, 1, 0.85],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-[22px] h-[7.5px] rounded-full bg-[#EC5E27] shadow-[0_0_12px_rgba(236,94,39,0.85),0_0_4px_rgba(251,162,122,0.9)]"
                />
                <span className="text-[16px] font-medium text-white tracking-tight leading-none">
                  Thinking
                </span>
              </div>
            </motion.div>
          )}

          {/* 1. RESTING STATE B: MACBOOK CAMERA NOTCH */}
          {!expanded && notchMode === 'camera' && (
            <motion.div
              key="notch-camera"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center justify-between w-full h-full px-2"
            >
              <div className="flex items-center gap-1 opacity-50">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative w-3.5 h-3.5 rounded-full bg-[#070709] border border-white/20 flex items-center justify-center shadow-inner">
                  <div className="w-1 h-1 rounded-full bg-emerald-500/70" />
                  <div className="absolute top-0.5 right-0.5 w-0.5 h-0.5 rounded-full bg-white/80" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399] animate-pulse" />
              </div>

              <div className="flex items-center gap-1 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
              </div>
            </motion.div>
          )}

          {/* 2. EXPANDED STATE: Full Dynamic Island & MacBook NotchNook Navbar */}
          {expanded && (
            <motion.div
              key="notch-expanded"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, delay: 0.05 }}
              className="w-full h-full flex flex-col justify-between gap-2"
            >
              {/* Top Row: Tabs + Calendar + Settings */}
              <div className="flex items-center justify-between w-full text-white/80 text-[11px] font-medium border-b border-white/[0.08] pb-1.5 px-0.5">
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('nook');
                    }}
                    className={\`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer \${
                      activeTab === 'nook'
                        ? 'bg-white/18 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Sparkles size={11} className="text-[#FBA27A]" />
                    <span>Nook</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('tray');
                    }}
                    className={\`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold transition-all cursor-pointer \${
                      activeTab === 'tray'
                        ? 'bg-white/18 text-white shadow-xs'
                        : 'text-neutral-400 hover:text-white'
                    }\`}
                  >
                    <Folder size={11} />
                    <span>Tray</span>
                  </button>
                </div>

                {/* Calendar Strip */}
                <div className="hidden sm:flex items-center gap-2 select-none">
                  <span className="font-bold text-white text-[12px] tracking-tight">Aug</span>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-400">
                    {CALENDAR_DAYS.map((item) => (
                      <div
                        key={item.date}
                        className={\`flex flex-col items-center justify-center w-5 h-5 rounded-full transition-colors \${
                          item.isToday
                            ? 'bg-[#007AFF] text-white font-bold shadow-[0_0_8px_rgba(0,122,255,0.6)]'
                            : 'hover:text-white'
                        }\`}
                      >
                        <span>{item.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Settings */}
                <div className="flex items-center gap-2 text-neutral-400">
                  <button
                    className="p-1 hover:text-white transition-colors cursor-pointer"
                    title="Notch Settings"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Settings size={12} />
                  </button>
                </div>
              </div>

              {/* Main Interactive Navbar Row */}
              <div className="flex items-center justify-between gap-3 w-full">
                {/* Media Widget */}
                <div className="flex items-center gap-2.5 shrink-0">
                  <div className="relative w-10 h-10 rounded-[10px] overflow-hidden bg-gradient-to-br from-[#1C1C1E] to-[#2C2C2E] border border-white/15 shrink-0 flex items-center justify-center shadow-md">
                    <div className="w-full h-full flex items-center justify-center bg-[#252528]">
                      <PawPrint size={18} className="text-[#EC5E27]" />
                    </div>
                    <div className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-[#1ED760] flex items-center justify-center shadow-xs">
                      <Music size={8} className="text-black" />
                    </div>
                  </div>

                  <div className="flex flex-col justify-center min-w-0">
                    <span className="text-white text-[12px] font-semibold tracking-tight truncate max-w-[85px] sm:max-w-[100px]">
                      {brandName}
                    </span>
                    <span className="text-[10px] text-neutral-400 truncate max-w-[85px] sm:max-w-[100px]">
                      Dynamic Notch
                    </span>

                    <div className="flex items-center gap-1.5 mt-0.5 text-neutral-300">
                      <button onClick={(e) => e.stopPropagation()} className="hover:text-white transition-colors">
                        <SkipBack size={10} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPlaying(!isPlaying);
                        }}
                        className="hover:text-white transition-colors"
                      >
                        {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                      </button>
                      <button onClick={(e) => e.stopPropagation()} className="hover:text-white transition-colors">
                        <SkipForward size={10} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nav Links */}
                <div
                  className="hidden md:flex items-center gap-0.5 min-w-0"
                  onMouseLeave={() => setHoveredNavIdx(null)}
                >
                  {items.map((item, index) => {
                    const isActive = currentHref === item.href;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onMouseEnter={() => setHoveredNavIdx(index)}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentHref(item.href);
                        }}
                        className={\`relative px-2.5 py-1 text-[12px] font-medium transition-colors duration-200 z-10 \${
                          isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                        }\`}
                      >
                        {hoveredNavIdx === index && (
                          <motion.span
                            layoutId="apple-navbar-pill"
                            className="absolute inset-0 rounded-full bg-white/12 -z-10"
                            transition={{ type: 'spring', stiffness: 480, damping: 34 }}
                          />
                        )}
                        {isActive && hoveredNavIdx === null && (
                          <span className="absolute inset-0 rounded-full bg-white/[0.08] -z-10" />
                        )}
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddReminder}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/18 text-white text-[11.5px] font-medium border border-white/10 transition-colors shadow-xs cursor-pointer"
                  >
                    {reminderAdded ? (
                      <>
                        <Check size={12} className="text-emerald-400" />
                        <span className="text-emerald-400">Added</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={11} className="text-[#EC5E27]" />
                        <span className="hidden sm:inline">Add To Reminders</span>
                        <span className="sm:hidden">Remind</span>
                      </>
                    )}
                  </motion.button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDownload) onDownload();
                    }}
                    title="Mirror / Web Display"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex flex-col items-center justify-center transition-colors border border-white/10 cursor-pointer shrink-0"
                  >
                    <Camera size={13} />
                  </button>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onDownload) onDownload();
                    }}
                    className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-semibold text-[11.5px] tracking-tight hover:bg-neutral-100 transition-colors shadow-[0_2px_12px_rgba(255,255,255,0.2)] cursor-pointer"
                  >
                    <span>{downloadText}</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.nav>
      </div>
    </header>
  );
};

export default AppleNavbar;
`;
