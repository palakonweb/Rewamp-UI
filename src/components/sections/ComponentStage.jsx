import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { motion, animate, cubicBezier, useReducedMotion } from 'framer-motion';
import {
  Code2,
  Sparkles,
  Layers,
  Compass,
  Sliders,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Home,
  User,
  FolderKanban,
  Mail,
  Check,
  Copy,
  Search,
  Zap,
  CreditCard,
  Lock,
  ArrowRight,
  Maximize2,
  Folder,
  FileCode,
  MousePointer,
  RotateCw,
  Play,
  Volume2
} from 'lucide-react';

function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

const CANVAS_W = 3480;
const CANVAS_H = 2520;
const FOCUS_INTERVAL_MS = 4600;
const MIN_HOP_DISTANCE = 1100;

const flightPanEase = cubicBezier(0.65, 0, 0.35, 1);
const flightDurationFor = (distance) => Math.min(2.7, Math.max(1.35, 0.95 + distance / 1050));
const flightZoomOutFor = (distance) => Math.min(0.86, Math.max(0.68, 0.86 - distance * 0.00006));

function shuffled(length) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

/* ── Individual Interactive Component Cards ── */

// 1. Fluid Wave Navbar
function CardFluidWaveNavbar() {
  const [active, setActive] = useState(1);
  const items = [
    { icon: Home, label: 'Home' },
    { icon: User, label: 'About' },
    { icon: FolderKanban, label: 'Projects' },
    { icon: Mail, label: 'Contact' },
  ];

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Active: <span className="text-[#171717] dark:text-white">{items[active].label}</span></span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#D4CBE5]/30 text-[#6B5B87] dark:text-[#D4CBE5] font-medium">Spring Physics</span>
      </div>
      <div className="relative my-auto py-2 flex items-center justify-center">
        <div className="relative w-full max-w-[340px] h-14 bg-[#F5F5F5] dark:bg-[#1A1824] rounded-full border border-[#E5E5E5] dark:border-white/10 flex items-center justify-around px-3 shadow-inner">
          <motion.div
            animate={{
              left: `${(active + 0.5) * (100 / items.length)}%`,
              x: '-50%',
            }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            className="absolute bottom-0 w-12 h-3.5 pointer-events-none flex flex-col items-center justify-end"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#171717] dark:bg-white mb-0.5" />
            <div className="w-10 h-2 rounded-t-full bg-white dark:bg-[#121118] border-t border-[#D4D4D4] dark:border-white/20 shadow-xs" />
          </motion.div>
          {items.map((item, idx) => {
            const Icon = item.icon;
            const isActive = active === idx;
            return (
              <button
                key={item.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(idx);
                }}
                className={cn(
                  "relative z-10 p-2 rounded-full transition-all duration-200 cursor-pointer flex flex-col items-center",
                  isActive ? "text-[#171717] dark:text-white scale-110" : "text-[#737373] hover:text-[#171717] dark:hover:text-white"
                )}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      </div>
      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Click tabs to trigger fluid wave scoop
      </div>
    </div>
  );
}

// 2. Day / Night Celestial Sky Toggle
function CardDayNightToggle() {
  const [isNight, setIsNight] = useState(false);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Mode: <span className="text-[#171717] dark:text-white">{isNight ? 'Midnight Sky' : 'Sunny Horizon'}</span></span>
        <span className="text-[10px] font-mono text-[#9C8EB8]">Interactive</span>
      </div>
      <div className="flex items-center justify-center my-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsNight(!isNight);
          }}
          className={cn(
            "relative w-44 h-20 rounded-full p-2 transition-colors duration-500 cursor-pointer shadow-inner overflow-hidden border border-black/5 dark:border-white/10",
            isNight ? "bg-[#0F172A]" : "bg-[#60A5FA]"
          )}
        >
          {/* Stars & Clouds */}
          {isNight ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-4 w-1 h-1 rounded-full bg-white animate-ping" />
              <div className="absolute bottom-4 left-8 w-1.5 h-1.5 rounded-full bg-[#D4CBE5]" />
              <div className="absolute top-5 right-6 w-1 h-1 rounded-full bg-white opacity-60" />
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 pointer-events-none">
              <div className="absolute bottom-2 right-4 w-10 h-4 rounded-full bg-white/40 blur-xs" />
              <div className="absolute top-3 right-8 w-8 h-3 rounded-full bg-white/50" />
            </motion.div>
          )}

          <motion.div
            animate={{ x: isNight ? 96 : 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform",
              isNight ? "bg-[#F3E8FF] text-[#4C1D95]" : "bg-[#FBBF24] text-[#B45309]"
            )}
          >
            {isNight ? <Moon size={26} className="text-[#312E81]" /> : <Sun size={28} className="text-[#D97706]" />}
          </motion.div>
        </button>
      </div>
      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Click to toggle celestial illumination
      </div>
    </div>
  );
}

// 3. Googly Eyes Button
function CardGooglyEyes() {
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = Math.max(-5, Math.min(5, (e.clientX - cx) / 12));
    const dy = Math.max(-5, Math.min(5, (e.clientY - cy) / 12));
    setMouseOffset({ x: dx, y: dy });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118] select-none"
    >
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Eye Tracker</span>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#9C8EB8]/20 text-[#6B5B87] dark:text-[#D4CBE5]">Spring Eyes</span>
      </div>
      <div className="flex items-center justify-center my-auto">
        <button
          onClick={(e) => e.stopPropagation()}
          className="px-6 py-3.5 rounded-2xl bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center gap-3.5 shadow-md hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span className="font-bold text-sm tracking-tight">Hover & Move Cursor</span>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-full bg-white dark:bg-[#171717] flex items-center justify-center shadow-inner border border-black/10 dark:border-white/20">
              <motion.div
                animate={{ x: mouseOffset.x, y: mouseOffset.y }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white"
              />
            </div>
            <div className="w-5 h-5 rounded-full bg-white dark:bg-[#171717] flex items-center justify-center shadow-inner border border-black/10 dark:border-white/20">
              <motion.div
                animate={{ x: mouseOffset.x, y: mouseOffset.y }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white"
              />
            </div>
          </div>
        </button>
      </div>
      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Pupils follow cursor across the canvas
      </div>
    </div>
  );
}

// 4. Kinetic Reel 3D Text
function CardKineticReel() {
  const words = ['Interfaces', 'Animations', 'Navbars', 'Framer Spring', 'Card Decks'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 1900);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Kinetic Words</span>
        <span className="text-[10px] font-mono text-[#9C8EB8]">Slot Reel</span>
      </div>
      <div className="flex flex-col items-center justify-center my-auto text-center">
        <span className="text-xs uppercase tracking-widest text-[#737373] dark:text-[#A8A8A8] font-mono font-semibold mb-1">
          Ship exceptional
        </span>
        <div className="relative h-10 overflow-hidden flex items-center justify-center">
          <motion.div
            key={index}
            initial={{ y: 24, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -24, opacity: 0, rotateX: -45 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="text-2xl font-black tracking-tight text-[#171717] dark:text-white bg-gradient-to-r from-[#9C8EB8] via-[#C1B4D8] to-[#171717] dark:to-white bg-clip-text text-transparent"
          >
            {words[index]}
          </motion.div>
        </div>
      </div>
      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Continuous vertical reel transition
      </div>
    </div>
  );
}

// 5. Claude AI Reasoning Thinking Capsule
function CardThinkingCapsule() {
  const steps = [
    'Synthesizing spring physics...',
    'Calculating fluid paths...',
    'Rendering camera matrices...',
    'Optimal state reached ✨'
  ];
  const [stepIdx, setStepIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIdx((prev) => (prev + 1) % steps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Reasoning Core</span>
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
      </div>
      <div className="flex flex-col items-center justify-center my-auto gap-3">
        <div className="flex items-center gap-3 px-4 py-2.5 bg-[#FAFAFA] dark:bg-[#1A1824] rounded-2xl border border-[#E5E5E5] dark:border-white/10 shadow-xs max-w-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#9C8EB8] via-[#D4CBE5] to-[#C1B4D8] p-0.5 shrink-0"
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-[#1A1824]" />
          </motion.div>
          <span className="text-xs font-mono font-semibold text-[#171717] dark:text-white truncate">
            {steps[stepIdx]}
          </span>
        </div>
      </div>
      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Live reasoning status capsule
      </div>
    </div>
  );
}

// 6. Tactile Fintech Wallet & Card Reveal
function CardWalletReveal() {
  const [revealed, setRevealed] = useState(false);
  const [balance, setBalance] = useState('$84,290.40');

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Vault Security</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setRevealed(!revealed);
          }}
          className="p-1 rounded-md hover:bg-[#F5F5F5] dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          {revealed ? <Eye size={15} /> : <EyeOff size={15} />}
        </button>
      </div>

      <div className="relative my-auto flex flex-col items-center">
        <motion.div
          animate={{ y: revealed ? -6 : 0 }}
          className="w-full max-w-[280px] p-4 rounded-2xl bg-gradient-to-br from-[#171717] via-[#242130] to-[#171717] text-white shadow-xl border border-white/10 relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <CreditCard size={18} className="text-[#C1B4D8]" />
            <span className="text-[10px] font-mono tracking-widest text-[#D4CBE5]">PLATINUM</span>
          </div>
          <div className="text-lg font-mono font-bold tracking-tight">
            {revealed ? balance : '•••• •••• •••• 9410'}
          </div>
          <div className="flex items-center justify-between mt-3 text-[10px] text-white/60 font-mono">
            <span>EXP 09/29</span>
            <span>REWAMP CARD</span>
          </div>
        </motion.div>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Click eye icon to reveal balance & tactile layer
      </div>
    </div>
  );
}

// 7. Morph Search Capsule
function CardMorphSearch() {
  const [query, setQuery] = useState('');
  const tags = ['Buttons', 'Toggles', 'Navbars', 'Carousels', 'Cards'];

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Command Palette</span>
        <span className="text-[10px] font-mono text-[#9C8EB8]">⌘ + K</span>
      </div>

      <div className="my-auto flex flex-col gap-2.5">
        <div className="relative flex items-center bg-[#FAFAFA] dark:bg-[#1A1824] rounded-xl border border-[#E5E5E5] dark:border-white/10 px-3 py-2">
          <Search size={15} className="text-[#737373] mr-2" />
          <input
            type="text"
            placeholder="Search Rewamp components..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-transparent text-xs text-[#171717] dark:text-white outline-none font-medium"
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {tags.map((tag) => (
            <span
              key={tag}
              onClick={(e) => {
                e.stopPropagation();
                setQuery(tag);
              }}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#F5F5F5] dark:bg-white/5 border border-[#E5E5E5] dark:border-white/5 text-[#737373] hover:text-[#171717] dark:hover:text-white cursor-pointer transition-colors"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Instant fuzzy filter morph capsule
      </div>
    </div>
  );
}

// 8. 3D Orbital Arch Card Carousel
function CardArchCarousel() {
  const [activeCard, setActiveCard] = useState(1);
  const cards = [
    { title: 'Alpha', color: 'from-[#9C8EB8] to-[#6B5B87]' },
    { title: 'Beta', color: 'from-[#C1B4D8] to-[#9C8EB8]' },
    { title: 'Gamma', color: 'from-[#D4CBE5] to-[#B3A4CC]' },
  ];

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Arch Carousel</span>
        <span className="text-[10px] font-mono text-[#9C8EB8]">3D Orbit</span>
      </div>

      <div className="relative my-auto h-28 flex items-center justify-center perspective-[600px]">
        {cards.map((card, idx) => {
          const offset = idx - activeCard;
          return (
            <motion.div
              key={card.title}
              onClick={(e) => {
                e.stopPropagation();
                setActiveCard(idx);
              }}
              animate={{
                x: offset * 65,
                scale: 1 - Math.abs(offset) * 0.18,
                rotateY: offset * -25,
                zIndex: 10 - Math.abs(offset),
                opacity: 1 - Math.abs(offset) * 0.35,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={cn(
                "absolute w-24 h-24 rounded-2xl p-2.5 bg-gradient-to-tr text-white shadow-lg cursor-pointer flex flex-col justify-between border border-white/20",
                card.color
              )}
            >
              <div className="text-[10px] font-mono font-bold">0{idx + 1}</div>
              <div className="text-xs font-bold">{card.title}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Click cards to rotate orbital arc
      </div>
    </div>
  );
}

// 9. Folder Tab Card
function CardFolderTab() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Design', 'Code', 'Tokens'];

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Folder Tabs</span>
        <Folder size={14} className="text-[#9C8EB8]" />
      </div>

      <div className="my-auto w-full max-w-[280px] mx-auto">
        <div className="flex items-center gap-1 -mb-px relative z-10 pl-2">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              onClick={(e) => {
                e.stopPropagation();
                setActiveTab(idx);
              }}
              className={cn(
                "px-3 py-1 text-[11px] font-mono font-semibold rounded-t-lg transition-colors cursor-pointer border-t border-x",
                activeTab === idx
                  ? "bg-[#FAFAFA] dark:bg-[#1A1824] border-[#E5E5E5] dark:border-white/10 text-[#171717] dark:text-white"
                  : "bg-transparent border-transparent text-[#737373] hover:text-[#171717] dark:hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-3 bg-[#FAFAFA] dark:bg-[#1A1824] rounded-xl rounded-tl-none border border-[#E5E5E5] dark:border-white/10 text-xs font-mono text-[#737373] dark:text-[#A8A8A8] shadow-inner">
          {activeTab === 0 && <p className="text-[#171717] dark:text-white">→ 8px Grid · Lilac Accent · SF Pro</p>}
          {activeTab === 1 && <p className="text-[#171717] dark:text-white">→ Framer Motion + Tailwind v4</p>}
          {activeTab === 2 && <p className="text-[#171717] dark:text-white">→ #D4CBE5, #C1B4D8, #171717</p>}
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Overlapping folder tabs with active state
      </div>
    </div>
  );
}

// 10. Ambient Liquid Cursor Glow
function CardLiquidGlow() {
  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Liquid Cursor</span>
        <span className="text-[10px] font-mono text-[#9C8EB8]">Shader Mesh</span>
      </div>

      <div className="relative my-auto h-24 rounded-2xl bg-[#0A0910] overflow-hidden flex items-center justify-center border border-white/5">
        <motion.div
          animate={{
            scale: [1, 1.35, 0.9, 1],
            x: [-18, 18, -12, -18],
            y: [-12, 12, -6, -12],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-full bg-[#9C8EB8] blur-xl opacity-80"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.3, 1, 0.9],
            x: [12, -14, 18, 12],
            y: [8, -16, 12, 8],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-14 h-14 rounded-full bg-[#D4CBE5] blur-lg opacity-70"
        />
        <span className="relative z-10 text-xs font-mono font-semibold text-white/90">
          Fluid Gradient Light
        </span>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Multi-point dynamic mesh refraction
      </div>
    </div>
  );
}

// 11. Slide to Confirm Button
function CardSlideToConfirm() {
  const [confirmed, setConfirmed] = useState(false);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Slide Action</span>
        <span className={cn("text-[10px] font-mono font-semibold", confirmed ? "text-[#10B981]" : "text-[#737373]")}>
          {confirmed ? 'CONFIRMED ✓' : 'LOCKED'}
        </span>
      </div>

      <div className="my-auto flex items-center justify-center">
        <div className="relative w-full max-w-[260px] h-12 rounded-full bg-[#F5F5F5] dark:bg-[#1A1824] border border-[#E5E5E5] dark:border-white/10 p-1 flex items-center shadow-inner overflow-hidden">
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-mono font-semibold text-[#737373] select-none pl-6">
            {confirmed ? 'Action Complete' : 'Drag to confirm →'}
          </span>
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 195 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.x > 140) setConfirmed(true);
              else setConfirmed(false);
            }}
            animate={{ x: confirmed ? 195 : 0 }}
            className="relative z-10 w-10 h-10 rounded-full bg-[#171717] dark:bg-white text-white dark:text-[#171717] flex items-center justify-center shadow-md cursor-grab active:cursor-grabbing"
          >
            {confirmed ? <Check size={16} /> : <ArrowRight size={16} />}
          </motion.div>
        </div>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Tactile swipe slider with spring snap
      </div>
    </div>
  );
}

// 12. Perspective Flip Deck
function CardPerspectiveFlip() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flex flex-col h-full justify-between p-4 bg-white dark:bg-[#121118]">
      <div className="flex items-center justify-between text-xs text-[#737373] dark:text-[#A8A8A8]">
        <span className="font-mono uppercase tracking-wider text-[11px] font-semibold">Flip Deck</span>
        <RotateCw size={13} className="text-[#9C8EB8]" />
      </div>

      <div className="relative my-auto h-28 flex items-center justify-center perspective-[800px]">
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            setFlipped(!flipped);
          }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-44 h-24 rounded-2xl cursor-pointer shadow-lg"
        >
          {/* Front */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0 rounded-2xl p-3 bg-gradient-to-tr from-[#171717] to-[#2E2B38] text-white border border-white/10 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-[#C1B4D8]">FRONT SIDE</span>
              <Sparkles size={14} className="text-[#D4CBE5]" />
            </div>
            <span className="text-xs font-bold">Tap to flip 180°</span>
          </div>

          {/* Back */}
          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute inset-0 rounded-2xl p-3 bg-gradient-to-tr from-[#9C8EB8] to-[#C1B4D8] text-[#171717] border border-white/20 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#4A3E60]">REVERSE SIDE</span>
              <Check size={14} className="text-[#4A3E60]" />
            </div>
            <span className="text-xs font-bold">3D Card Transform</span>
          </div>
        </motion.div>
      </div>

      <div className="text-[11px] font-mono text-[#737373] dark:text-[#A8A8A8] text-center">
        Click to flip between front and reverse
      </div>
    </div>
  );
}

/* ── All Stage Cards on the 3480 x 2520 Virtual Canvas ── */
const CARDS = [
  // Column 1 (x: 60)
  { id: "fluid-wave-navbar", title: "fluid-wave-navbar.tsx", x: 60, y: -40, w: 510, h: 320, node: <CardFluidWaveNavbar /> },
  { id: "googly-eyes-button", title: "googly-eyes-button.tsx", x: 60, y: 320, w: 470, h: 290, node: <CardGooglyEyes /> },
  { id: "claude-reasoning-orb", title: "claude-reasoning-orb.tsx", x: 60, y: 650, w: 470, h: 290, node: <CardThinkingCapsule /> },
  { id: "perspective-flip-deck", title: "perspective-flip-deck.tsx", x: 60, y: 980, w: 470, h: 290, node: <CardPerspectiveFlip /> },
  { id: "folder-tab-card", title: "folder-tab-card.tsx", x: 60, y: 1310, w: 510, h: 320, node: <CardFolderTab /> },
  { id: "liquid-cursor-glow", title: "liquid-cursor-glow.tsx", x: 60, y: 1670, w: 470, h: 290, node: <CardLiquidGlow /> },
  { id: "slide-to-confirm", title: "slide-to-confirm.tsx", x: 60, y: 2000, w: 480, h: 300, node: <CardSlideToConfirm /> },

  // Column 2 (x: 615)
  { id: "wallet-card-reveal", title: "wallet-card-reveal.tsx", x: 615, y: 40, w: 510, h: 320, node: <CardWalletReveal /> },
  { id: "day-night-toggle", title: "day-night-sky-toggle.tsx", x: 615, y: 400, w: 480, h: 300, node: <CardDayNightToggle /> },
  { id: "kinetic-reel-text", title: "kinetic-reel-text.tsx", x: 615, y: 740, w: 480, h: 300, node: <CardKineticReel /> },
  { id: "morph-search-capsule", title: "morph-search-capsule.tsx", x: 615, y: 1080, w: 470, h: 290, node: <CardMorphSearch /> },
  { id: "arch-card-carousel", title: "arch-card-carousel.tsx", x: 615, y: 1410, w: 510, h: 320, node: <CardArchCarousel /> },
  { id: "fluid-wave-nav-2", title: "fluid-wave-navbar.tsx", x: 615, y: 1770, w: 470, h: 290, node: <CardFluidWaveNavbar /> },
  { id: "googly-eyes-2", title: "googly-eyes-button.tsx", x: 615, y: 2100, w: 470, h: 290, node: <CardGooglyEyes /> },

  // Column 3 (x: 1170)
  { id: "kinetic-reel-2", title: "kinetic-reel-text.tsx", x: 1170, y: 200, w: 510, h: 320, node: <CardKineticReel /> },
  { id: "wallet-card-2", title: "wallet-card-reveal.tsx", x: 1170, y: 560, w: 520, h: 330, node: <CardWalletReveal /> },
  { id: "thinking-capsule-2", title: "claude-reasoning-orb.tsx", x: 1170, y: 930, w: 480, h: 300, node: <CardThinkingCapsule /> },
  { id: "day-night-2", title: "day-night-sky-toggle.tsx", x: 1170, y: 1270, w: 470, h: 300, node: <CardDayNightToggle /> },
  { id: "folder-tab-2", title: "folder-tab-card.tsx", x: 1170, y: 1610, w: 510, h: 320, node: <CardFolderTab /> },
  { id: "arch-carousel-2", title: "arch-card-carousel.tsx", x: 1170, y: 1970, w: 470, h: 290, node: <CardArchCarousel /> },

  // Column 4 (x: 1735)
  { id: "liquid-glow-2", title: "liquid-cursor-glow.tsx", x: 1735, y: 40, w: 480, h: 300, node: <CardLiquidGlow /> },
  { id: "slide-to-confirm-2", title: "slide-to-confirm.tsx", x: 1735, y: 380, w: 480, h: 300, node: <CardSlideToConfirm /> },
  { id: "morph-search-2", title: "morph-search-capsule.tsx", x: 1735, y: 720, w: 520, h: 330, node: <CardMorphSearch /> },
  { id: "perspective-flip-2", title: "perspective-flip-deck.tsx", x: 1735, y: 1090, w: 470, h: 290, node: <CardPerspectiveFlip /> },
  { id: "fluid-wave-3", title: "fluid-wave-navbar.tsx", x: 1735, y: 1420, w: 510, h: 320, node: <CardFluidWaveNavbar /> },
  { id: "googly-eyes-3", title: "googly-eyes-button.tsx", x: 1735, y: 1780, w: 510, h: 320, node: <CardGooglyEyes /> },
  { id: "day-night-3", title: "day-night-sky-toggle.tsx", x: 1735, y: 2140, w: 470, h: 290, node: <CardDayNightToggle /> },

  // Column 5 (x: 2300)
  { id: "wallet-card-3", title: "wallet-card-reveal.tsx", x: 2300, y: 60, w: 510, h: 320, node: <CardWalletReveal /> },
  { id: "kinetic-reel-3", title: "kinetic-reel-text.tsx", x: 2300, y: 420, w: 520, h: 330, node: <CardKineticReel /> },
  { id: "thinking-capsule-3", title: "claude-reasoning-orb.tsx", x: 2300, y: 790, w: 480, h: 300, node: <CardThinkingCapsule /> },
  { id: "folder-tab-3", title: "folder-tab-card.tsx", x: 2300, y: 1130, w: 500, h: 320, node: <CardFolderTab /> },
  { id: "slide-confirm-3", title: "slide-to-confirm.tsx", x: 2300, y: 1490, w: 470, h: 290, node: <CardSlideToConfirm /> },
  { id: "liquid-glow-3", title: "liquid-cursor-glow.tsx", x: 2300, y: 1820, w: 480, h: 300, node: <CardLiquidGlow /> },
  { id: "morph-search-3", title: "morph-search-capsule.tsx", x: 2300, y: 2160, w: 470, h: 290, node: <CardMorphSearch /> },
];

const START_INDEX = CARDS.findIndex((card) => card.id === "wallet-card-reveal");

const hopDistance = (a, b) => {
  const ca = CARDS[a];
  const cb = CARDS[b];
  return Math.hypot(ca.x + ca.w / 2 - cb.x - cb.w / 2, ca.y + ca.h / 2 - cb.y - cb.h / 2);
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

function CardShell({ title, children }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[14px] bg-[#F3F2F6] dark:bg-[#1A1824] p-1 border border-[#E5E5E5] dark:border-white/10 shadow-sm transition-all">
      <div className="flex h-7 shrink-0 items-center justify-between px-2.5">
        <span className="text-[#737373] dark:text-[#A8A8A8] flex items-center gap-1.5 font-mono text-[11px]">
          <FileCode size={13} className="text-[#9C8EB8]" />
          <span className="line-clamp-1 font-semibold">{title}</span>
        </span>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4CBE5]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#C1B4D8]" />
        </div>
      </div>
      <div className="bg-white dark:bg-[#121118] min-h-0 flex-1 overflow-hidden rounded-[10px] border border-[#E5E5E5]/80 dark:border-white/5">
        {children}
      </div>
    </div>
  );
}

export function ComponentStage({ className }) {
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(START_INDEX);
  const [prevActive, setPrevActive] = useState(START_INDEX);
  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);
  const [engaged, setEngaged] = useState(false);
  const queueRef = useRef([]);
  const lastPickRef = useRef(START_INDEX);
  const shownRef = useRef(START_INDEX);
  const flightRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      if (queueRef.current.length === 0) {
        queueRef.current = shuffled(CARDS.length);
      }
      const current = lastPickRef.current;
      let pickAt = queueRef.current.findIndex((i) => hopDistance(i, current) >= MIN_HOP_DISTANCE);
      if (pickAt === -1) {
        pickAt = queueRef.current.reduce(
          (best, i, k, queue) =>
            hopDistance(i, current) > hopDistance(queue[best], current) ? k : best,
          0,
        );
      }
      const next = queueRef.current.splice(pickAt, 1)[0];
      setPrevActive(current);
      lastPickRef.current = next;
      setEngaged(true);
      setActive(next);
    }, FOCUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, paused]);

  const measured = viewport.w > 0 && viewport.h > 0;
  const scale = measured ? clamp(0.5, Math.min(viewport.w / 1050, viewport.h / 950), 0.9) : 0.7;
  const focus = CARDS[active];
  const prevFocus = CARDS[prevActive];
  const estimatedDistance = Math.hypot(
    (focus.x + focus.w / 2 - prevFocus.x - prevFocus.w / 2) * scale,
    (focus.y + focus.h / 2 - prevFocus.y - prevFocus.h / 2) * scale,
  );
  const focusDelay = !reducedMotion && engaged ? flightDurationFor(estimatedDistance) * 0.65 : 0;

  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el || !measured) return;
    const setCamera = (lookX, lookY, s) => {
      el.style.transform = `translate(${viewport.w / 2 - lookX * s}px, ${viewport.h / 2 - lookY * s}px) scale(${s})`;
    };
    const targetX = focus.x + focus.w / 2;
    const targetY = focus.y + focus.h / 2;

    flightRef.current?.stop();
    if (!engaged || reducedMotion || shownRef.current === active) {
      setCamera(targetX, targetY, scale);
    } else {
      const computed = getComputedStyle(el).transform;
      const matrix = computed !== "none" ? new DOMMatrix(computed) : null;
      const fromScale = matrix ? matrix.a : scale;
      const fromX = matrix ? (viewport.w / 2 - matrix.e) / fromScale : targetX;
      const fromY = matrix ? (viewport.h / 2 - matrix.f) / fromScale : targetY;

      const distance = Math.hypot((targetX - fromX) * scale, (targetY - fromY) * scale);
      const duration = flightDurationFor(distance);
      const zoomDepth = scale * (1 - flightZoomOutFor(distance));

      flightRef.current = animate(0, 1, {
        duration,
        ease: "linear",
        onUpdate: (t) => {
          const pan = flightPanEase(t);
          const dip = Math.sin(Math.PI * t) ** 2;
          setCamera(
            fromX + (targetX - fromX) * pan,
            fromY + (targetY - fromY) * pan,
            fromScale + (scale - fromScale) * pan - zoomDepth * dip,
          );
        },
      });
    }
    shownRef.current = active;
  }, [active, focus, measured, scale, viewport.w, viewport.h, engaged, reducedMotion]);

  return (
    <div
      ref={viewportRef}
      className={cn(
        "relative w-full h-[520px] sm:h-[600px] lg:h-[660px] overflow-hidden rounded-3xl select-none",
        className
      )}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => {
        setPaused(false);
        setHovered(null);
      }}
    >
      {/* Edge Vignette Mask for Seamless Hero Integration */}
      <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_60px_rgba(250,250,250,0.9)] dark:shadow-[inset_0_0_70px_rgba(13,12,16,0.9)]" />

      {measured && (
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{ width: CANVAS_W, height: CANVAS_H, transformOrigin: "0 0" }}
        >
          {/* Dot Grid Background */}
          <div
            aria-hidden
            className="absolute -inset-[1600px] bg-[radial-gradient(circle,#9C8EB8_1.2px,transparent_1.2px)] bg-[size:28px_28px] opacity-25 dark:opacity-20 will-change-transform"
          />

          {CARDS.map((card, index) => {
            const isFocused = index === active;
            const isLifted = isFocused || (!reducedMotion && hovered === index);
            return (
              <motion.div
                key={card.id + index}
                onClick={() => {
                  setPrevActive(active);
                  lastPickRef.current = index;
                  setEngaged(true);
                  setActive(index);
                }}
                className={cn(
                  "absolute rounded-[14px] transition-shadow duration-500 cursor-pointer",
                  isFocused
                    ? "shadow-[0_24px_60px_rgba(193,180,216,0.35),0_12px_24px_rgba(0,0,0,0.08)] ring-2 ring-[#C1B4D8]/80 dark:ring-[#D4CBE5]/50"
                    : "shadow-md hover:shadow-xl"
                )}
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.w,
                  height: card.h,
                  zIndex: isFocused ? 10 : hovered === index ? 5 : 1,
                }}
                initial={false}
                animate={{
                  opacity: reducedMotion || isLifted ? 1 : 0.35,
                  scale: !reducedMotion && isFocused ? 1.05 : 1,
                }}
                transition={{
                  opacity: {
                    duration: 0.85,
                    ease: "easeInOut",
                    delay: isFocused ? focusDelay : 0,
                  },
                  scale: {
                    type: "spring",
                    stiffness: 180,
                    damping: 26,
                    delay: isFocused ? focusDelay : 0,
                  },
                }}
                onPointerEnter={() => setHovered(index)}
                onPointerLeave={() => setHovered((prev) => (prev === index ? null : prev))}
              >
                <CardShell title={card.title}>{card.node}</CardShell>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ComponentStage;
