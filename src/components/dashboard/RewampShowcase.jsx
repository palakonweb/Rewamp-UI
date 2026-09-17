// perf: lazy-loaded component streaming with Suspense, zero-CLS per-component skeletons, isolated ErrorBoundary
import React, { useState, useEffect, useMemo, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plane,
  Copy,
  Check,
  Code2,
  Maximize2,
  Minimize2,
  X,
  Search,
  RotateCw,
  Sparkles,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, findComponentBySlug } from '../docsRegistry';
import { getPromptForSlug } from '../componentPrompts';
import CanvasShimmerSkeleton from '../ui/CanvasShimmerSkeleton';
import ErrorBoundary from '../ui/ErrorBoundary';
import {
  GlowTextChipSkeleton,
  FolderCardSkeleton,
  CardSkeleton
} from '../ui/Skeleton';

/**
 * Get dedicated zero-CLS skeleton matching the component's reserved dimensions
 */
function getComponentSkeleton(slug) {
  if (slug === 'glow-text-chip' || slug?.includes('chip')) {
    return <GlowTextChipSkeleton />;
  }
  if (slug === 'matte-folder-card' || slug === 'frosted-folder-card' || slug === 'foldercomponent' || slug?.includes('folder')) {
    return <FolderCardSkeleton />;
  }
  return <CardSkeleton />;
}

// Clean SVG Flower Icon for the Sidebar Rail
function FlowerIcon({ className = "w-4 h-4" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 

      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 6 Blooming Petals in Lilac Palette */}
      <circle cx="12" cy="5.8" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="17.4" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="17.4" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="12" cy="18.2" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="6.6" cy="15.1" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      <circle cx="6.6" cy="8.9" r="3.6" fill="#D4CBE5" stroke="#C1B4D8" strokeWidth="0.8" />
      {/* Center Core */}
      <circle cx="12" cy="12" r="3.4" fill="#262626" stroke="#FAFAFA" strokeWidth="0.8" />
      <circle cx="12" cy="12" r="1.3" fill="#D4CBE5" />
    </svg>
  );
}

// Photos revealed inside the folder — swap these for any images you like.
const FOLDER_PHOTOS = [
  '/cards/sky-curtain.png',
  '/cards/rainbow-hill.png',
  '/cards/airplane-sunset.png',
  '/cards/kangaroo-planet.png',
];

// Target position for each photo once the folder opens — one to each side (top, right, bottom, left).
const FOLDER_PHOTO_LAYOUT = [
  { x: 0, y: -190, rotate: -2 },
  { x: 168, y: -14, rotate: 4 },
  { x: 0, y: 128, rotate: 3 },
  { x: -168, y: -14, rotate: -4 },
];

// Clean Folder Component
function CleanFolderComponent({ color = 'black' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const themes = {
    black: {
      back: 'bg-[#121215]',
      flap: 'bg-black/75 border-t border-white/20 backdrop-blur-xl',
      border: 'border-white/10',
      shadow: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]',
    },
    white: {
      back: 'bg-[#E5E5E5]',
      flap: 'bg-white/80 border-t border-white/60 backdrop-blur-xl',
      border: 'border-black/10',
      shadow: 'shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]',
    },
    blue: {
      back: 'bg-[#0284C7]',
      flap: 'bg-[#38BDF8]/80 border-t border-white/40 backdrop-blur-xl',
      border: 'border-white/20',
      shadow: 'shadow-[0_25px_50px_-12px_rgba(2,132,199,0.4)]',
    },
    lilac: {
      back: 'bg-[#9C8EB8]',
      flap: 'bg-[#D4CBE5]/85 border-t border-white/50 backdrop-blur-xl',
      border: 'border-white/30',
      shadow: 'shadow-[0_25px_50px_-12px_rgba(193,180,216,0.6)]',
    }
  };

  const current = themes[color] || themes.black;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => !dialogOpen && setIsHovered(false)}
      onClick={() => {
        setIsHovered(true);
        setTimeout(() => setDialogOpen(true), 380);
      }}
      className="relative w-[340px] sm:w-[390px] h-[260px] sm:h-[290px] flex items-end justify-center cursor-pointer select-none"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ y: isHovered ? -4 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className={`absolute inset-0 rounded-[32px] ${current.back} ${current.border} border shadow-2xl overflow-hidden`}
      >
        <div className={`absolute top-0 left-0 w-[42%] h-8 rounded-t-[18px] ${current.back} -translate-y-2`} />
      </motion.div>

      <div className="absolute inset-x-0 top-0 bottom-10 flex items-end justify-center pointer-events-none">
        {FOLDER_PHOTOS.map((src, i) => {
          const target = FOLDER_PHOTO_LAYOUT[i];
          return (
            <motion.div
              key={src}
              animate={
                isHovered
                  ? { x: target.x, y: target.y, rotate: target.rotate, scale: 1, opacity: 1 }
                  : { x: 0, y: -16 - i * 3, rotate: target.rotate * 0.3, scale: 0.92, opacity: 1 }
              }
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: isHovered ? i * 0.03 : 0 }}
              style={{ zIndex: isHovered ? 40 + i : 10 + i }}
              className="absolute w-[104px] sm:w-[118px] h-[104px] sm:h-[118px] rounded-[18px] overflow-hidden bg-neutral-200 shadow-[0_10px_24px_rgba(0,0,0,0.25)] border border-black/5 origin-bottom-center"
            >
              <img src={src} alt="" draggable={false} className="w-full h-full object-cover select-none" />
            </motion.div>
          );
        })}
      </div>

      <motion.div
        animate={{
          rotateX: isHovered ? -24 : -8,
          y: isHovered ? 6 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        className="relative z-10 w-full h-[76%] rounded-[28px] overflow-hidden origin-bottom"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div 
          className={`w-full h-full rounded-[28px] ${
            color === 'black'
              ? 'bg-gradient-to-b from-[#2B2B30]/90 to-[#101012]/95 border-t border-white/20 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.6)]'
              : color === 'white'
              ? 'bg-gradient-to-b from-white/90 to-[#EAEAEA]/95 border-t border-white/60 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.1)]'
              : color === 'blue'
              ? 'bg-gradient-to-b from-[#38BDF8]/90 to-[#0284C7]/95 border-t border-white/40 backdrop-blur-xl shadow-[0_20px_40px_rgba(2,132,199,0.3)]'
              : 'bg-gradient-to-b from-[#D4CBE5]/95 to-[#C1B4D8]/95 border-t border-white/50 backdrop-blur-xl shadow-[0_20px_40px_rgba(193,180,216,0.4)]'
          }`}
        >
          <div className="absolute top-0 inset-x-0 h-10 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />
        </div>
      </motion.div>

      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-6"
            onClick={(e) => {
              e.stopPropagation();
              setDialogOpen(false);
              setIsHovered(false);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative w-full max-w-2xl rounded-[28px] bg-[#141218] border border-white/10 shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  setDialogOpen(false);
                  setIsHovered(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {FOLDER_PHOTOS.map((src, i) => (
                  <div key={src} className="aspect-square rounded-2xl overflow-hidden bg-neutral-800">
                    <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" draggable={false} />
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Single icon in the bottom liquid-glass dock: macOS-style magnify on hover + tooltip
function DockIcon({ children, label, onClick, theme, accent = false, active = false }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className={`absolute -top-9 px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap pointer-events-none ${
              theme === 'light' ? 'bg-black/85 text-white' : 'bg-white/90 text-black'
            }`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        whileHover={{ scale: 1.22, y: -7 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 420, damping: 20 }}
        title={label}
        className={`relative flex items-center justify-center w-10 h-10 rounded-full cursor-pointer transition-colors ${
          accent
            ? 'bg-[#D4CBE5] text-[#171717] shadow-[0_4px_14px_rgba(193,180,216,0.5)]'
            : active
            ? (theme === 'light' ? 'bg-black/10 text-black' : 'bg-white/20 text-white')
            : (theme === 'light'
                ? 'bg-white/50 text-neutral-700 hover:bg-white/80 hover:text-black'
                : 'bg-white/10 text-white/75 hover:bg-white/20 hover:text-white')
        }`}
      >
        {children}
      </motion.button>
    </div>
  );
}

export default function RewampShowcase() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [activeSlug, setActiveSlug] = useState(slug || 'matte-folder-card');
  const [folderColor, setFolderColor] = useState('black');
  const [theme, setTheme] = useState(() => localStorage.getItem('rewamp-theme') || 'light');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [codeDrawerOpen, setCodeDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('rewamp-theme', theme);
  }, [theme]);

  useEffect(() => {
    if (slug) {
      setActiveSlug(slug);
    }
  }, [slug]);

  // Trigger quick loading skeleton transition on slug changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [activeSlug]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const totalComponentCount = useMemo(() => {
    return categories.reduce((sum, cat) => sum + cat.components.length, 0);
  }, []);

  // Build the 74-component tree navigation items
  const navItems = useMemo(() => {
    const list = [];
    const trimmed = query.trim().toLowerCase();

    categories.forEach(cat => {
      const matchingComps = trimmed
        ? cat.components.filter(c => c.title.toLowerCase().includes(trimmed) || c.slug.includes(trimmed))
        : cat.components;

      if (matchingComps.length > 0) {
        list.push({
          id: `cat-${cat.id}`,
          label: cat.name,
          level: 0,
          isCategory: true,
        });

        matchingComps.forEach(comp => {
          list.push({
            id: comp.slug,
            label: comp.title,
            slug: comp.slug,
            level: 1,
            Component: comp.Component,
          });
        });
      }
    });

    return list;
  }, [query]);

  // Geometry for airplane supersonic flightpath
  const itemHeight = 32;
  const startY = 16;
  const rootX = 16;
  const nestedX = 30;

  const nodes = useMemo(() => {
    return navItems.map((item, index) => ({
      ...item,
      x: item.level === 0 ? rootX : nestedX,
      y: startY + index * itemHeight,
      index,
    }));
  }, [navItems]);

  // Curved SVG rail
  const railPath = useMemo(() => {
    if (nodes.length === 0) return '';
    let d = `M ${nodes[0].x} ${nodes[0].y}`;

    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];

      if (prev.x === curr.x) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }, [nodes]);

  const activeNode = useMemo(() => {
    const found = nodes.find(n => n.id === activeSlug && !n.isCategory);
    return found || nodes.find(n => !n.isCategory) || nodes[0] || { x: rootX, y: startY, index: 0 };
  }, [nodes, activeSlug]);

  // Covered rail path up to the active flower node (drawn in a darker shade of grey)
  const coveredRailPath = useMemo(() => {
    if (!activeNode || nodes.length === 0 || activeNode.index <= 0) return '';
    const activeIdx = Math.min(activeNode.index, nodes.length - 1);
    let d = `M ${nodes[0].x} ${nodes[0].y}`;

    for (let i = 1; i <= activeIdx; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];

      if (prev.x === curr.x) {
        d += ` L ${curr.x} ${curr.y}`;
      } else {
        const midY = (prev.y + curr.y) / 2;
        d += ` C ${prev.x} ${midY}, ${curr.x} ${midY}, ${curr.x} ${curr.y}`;
      }
    }
    return d;
  }, [nodes, activeNode]);

  // Auto-scroll sidebar to follow flower indicator
  useEffect(() => {
    if (activeNode && scrollContainerRef.current) {
      const targetY = activeNode.y - 100;
      scrollContainerRef.current.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
    }
  }, [activeNode]);

  const handleSelectComponent = (compNode) => {
    if (compNode.isCategory) return;
    setActiveSlug(compNode.id);
    navigate(`/components/${compNode.id}`);
  };

  const handleCopyPrompt = () => {
    const promptText = getPromptForSlug(activeSlug, currentFound?.entry?.title);
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`npx rewampui add ${activeSlug}`);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  // Find active component for canvas
  const currentFound = useMemo(() => {
    return findComponentBySlug(activeSlug) || findComponentBySlug('matte-folder-card') || {
      entry: { title: 'Folder component', Component: CleanFolderComponent }
    };
  }, [activeSlug]);

  const isFolder = activeSlug === 'matte-folder-card' || activeSlug === 'frosted-folder-card' || activeSlug === 'foldercomponent';

  return (
    <div 
      className={`h-screen w-screen overflow-hidden p-2 sm:p-2.5 flex gap-2.5 font-sans select-none transition-colors duration-250 ${
        theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-[#0D0C10]'
      }`}
    >
      {/* ── 1. Airplane Flightpath Sidebar (All 74 Components) ── */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <motion.aside
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: 280, opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="h-full shrink-0 flex flex-col justify-between py-3 pl-3 pr-2 overflow-hidden z-20"
          >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Top Row: Sidebar Toggle on Left & RewampUI Brand */}
              <div className="flex items-center gap-2.5 pb-3">
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-2xs cursor-pointer shrink-0"
                  title="Collapse sidebar"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M9 3v18" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="RewampUI" className="w-8 h-8 shrink-0 object-contain" />
                  <span className="font-bold text-[16px] tracking-tight text-[var(--text-primary)]">
                    RewampUI
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--elevated)] text-[var(--text-subtle)] border border-[var(--border)]">
                    {totalComponentCount}
                  </span>
                </div>
              </div>

              {/* Instant Search Bar */}
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder={`Search ${totalComponentCount} components...`}
                  className="w-full bg-[var(--elevated)] border border-[var(--border)] rounded-xl pl-8 pr-3 py-1.5 text-xs text-[var(--text-primary)] placeholder-neutral-400 outline-none focus:border-[var(--brand-strong)] transition-colors"
                />
                {query && (
                  <button 
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-700"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Flower Flightpath Tree */}
              <div 
                ref={scrollContainerRef}
                className="flex-1 overflow-y-auto no-scrollbar relative pr-1"
                style={{ height: 'calc(100% - 100px)' }}
              >
                <div className="relative" style={{ height: Math.max(nodes.length * itemHeight + 30, 400) }}>
                  {/* Organic Curved SVG Rail Path */}
                  <svg
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ overflow: 'visible' }}
                  >
                    {/* 1. Base / Uncovered Path (Subtle light grey dashed) */}
                    <path
                      d={railPath}
                      fill="none"
                      stroke={theme === 'light' ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.12)'}
                      strokeWidth={1.5}
                      strokeDasharray="2 3"
                    />

                    {/* 2. Covered Path (Darker shade of grey as requested!) */}
                    {coveredRailPath && (
                      <path
                        d={coveredRailPath}
                        fill="none"
                        stroke={theme === 'light' ? '#404040' : '#A8A8A8'}
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}

                    {/* Node Dots on the Rail */}
                    {nodes.map(node => {
                      const isActive = node.id === activeSlug;
                      const isCovered = node.index <= activeNode.index;

                      return (
                        <circle
                          key={`dot-${node.id}`}
                          cx={node.x}
                          cy={node.y}
                          r={isActive ? 0 : node.level === 0 ? 3.2 : 2}
                          fill={
                            node.level === 0
                              ? (isCovered ? '#C1B4D8' : '#D4CBE5')
                              : isCovered
                              ? (theme === 'light' ? '#404040' : '#A8A8A8')
                              : (theme === 'light' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.2)')
                          }
                        />
                      );
                    })}
                  </svg>

                  {/* Blooming Lilac Flower Indicator Gliding Along Rail */}
                  <motion.div
                    className="absolute z-20 pointer-events-none flex items-center justify-center"
                    animate={{
                      x: activeNode.x - 9,
                      y: activeNode.y - 9,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 26,
                      mass: 0.75,
                    }}
                    style={{ width: 18, height: 18 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="flex items-center justify-center"
                    >
                      <FlowerIcon className="w-4 h-4 drop-shadow-[0_2px_6px_rgba(193,180,216,0.6)]" />
                    </motion.div>
                  </motion.div>

                  {/* Interactive Tree Labels */}
                  {nodes.map(node => {
                    const isActive = node.id === activeSlug;
                    const textLeft = node.level === 0 ? 32 : 46;

                    if (node.isCategory) {
                      return (
                        <div
                          key={node.id}
                          className="absolute flex items-center select-none"
                          style={{
                            top: node.y - 9,
                            left: textLeft,
                            height: 18,
                            right: 0,
                          }}
                        >
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-neutral-400 dark:text-neutral-500">
                            {node.label}
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={node.id}
                        onClick={() => handleSelectComponent(node)}
                        className={`absolute flex items-center cursor-pointer transition-colors text-left group truncate ${
                          isActive
                            ? theme === 'light'
                              ? 'font-bold text-[#171717]'
                              : 'font-bold text-[#FAFAFA]'
                            : theme === 'light'
                            ? 'font-normal text-neutral-400 hover:text-neutral-800'
                            : 'font-normal text-neutral-400 hover:text-neutral-100'
                        }`}
                        style={{
                          top: node.y - 10,
                          left: textLeft,
                          height: 20,
                          right: 0,
                        }}
                      >
                        <span className="text-[12.5px] truncate">
                          {node.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Floating Re-Open Button when sidebar is collapsed */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="absolute top-5 left-5 z-30 w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors shadow-md cursor-pointer"
          title="Open sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      )}

      {/* ── 2. Massive Rounded Elevated Stage (Canvas Only, Zero Component Background Boxes) ── */}
      <div 
        className={`flex-1 h-full rounded-[32px] sm:rounded-[36px] relative overflow-hidden flex items-center justify-center transition-colors duration-250 ${
          theme === 'light' ? 'bg-[#EAEAEA]' : 'bg-[#141218]'
        }`}
        style={{
          boxShadow: theme === 'light'
            ? 'inset 0 1px 2px rgba(0,0,0,0.04)'
            : 'inset 0 1px 2px rgba(255,255,255,0.04)'
        }}
      >
        {/* Bottom-Center Liquid Glass Dock: Install, Prompt, Code, Theme */}
        <div className="absolute bottom-5 inset-x-0 z-30 flex items-center justify-center pointer-events-none">
          <div
            className="pointer-events-auto flex items-end gap-1.5 rounded-[26px] px-2.5 py-2 backdrop-blur-2xl border"
            style={{
              background: theme === 'light'
                ? 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.28) 100%)'
                : 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)',
              borderColor: theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.14)',
              boxShadow: theme === 'light'
                ? '0 12px 32px rgba(0,0,0,0.10), inset 0 1px 1px rgba(255,255,255,0.8)'
                : '0 12px 32px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.12)',
            }}
          >
            <DockIcon
              label="Install"
              onClick={handleCopyInstall}
              theme={theme}
            >
              {copiedInstall ? <Check className="w-[18px] h-[18px]" /> : <Download className="w-[18px] h-[18px]" />}
            </DockIcon>

            <DockIcon
              label={copiedPrompt ? 'Copied' : 'Copy Prompt'}
              onClick={handleCopyPrompt}
              theme={theme}
              accent
            >
              {copiedPrompt ? <Check className="w-[18px] h-[18px]" /> : <Sparkles className="w-[18px] h-[18px]" />}
            </DockIcon>

            <DockIcon
              label="Code"
              onClick={() => setCodeDrawerOpen(!codeDrawerOpen)}
              theme={theme}
              active={codeDrawerOpen}
            >
              <Code2 className="w-[18px] h-[18px]" />
            </DockIcon>

            <DockIcon
              label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              theme={theme}
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun className="w-[18px] h-[18px]" />
                  </motion.span>
                ) : (
                  <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon className="w-[18px] h-[18px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </DockIcon>
          </div>
        </div>

        {/* ── Centered Showcase Stage (Canvas Background Only — No Component Card Box) ── */}
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-12 overflow-hidden relative">
          {/* Main Component Canvas Stage (Mounted immediately for instantaneous fast loading) */}
          {/* bugfix: this used to also hide `.max-w-4xl/5xl/3xl > div:last-child` to strip a
              trailing decorative element from a couple of showcases. That rule matched a plain
              DOM position, not a specific element, so any component whose real content
              happened to render as the last div inside one of those wrappers (e.g.
              ContributionActivity's glass frame, or AsciiMatrixHoverShowcase's single content
              div) had its entire visible output hidden — reproducing exactly "skeleton renders,
              then the card goes blank" once Suspense resolved. Removed; only the narrowly-scoped
              decorative-glow and inline-code-snippet hides remain. */}
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="canvas-stage relative flex items-center justify-center w-full max-w-[1080px] h-full max-h-[640px] aspect-[16/10] rounded-[24px] overflow-hidden [&_.blur-3xl]:hidden [&_.shadow-sm:has(code)]:hidden"
          >
            <ErrorBoundary key={activeSlug}>
              <Suspense fallback={getComponentSkeleton(activeSlug)}>
                <div className="animate-component-fade-in flex items-center justify-center w-full h-full p-6 overflow-hidden">
                  {isFolder ? (
                    <CleanFolderComponent color={folderColor} />
                  ) : (
                    <currentFound.entry.Component />
                  )}
                </div>
              </Suspense>
            </ErrorBoundary>
          </motion.div>

          {/* Sweeping Chromatic Shimmer Skeleton (Matching Recording 2026-09-16 213029.mp4) */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                key="shimmer-canvas"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.24, ease: 'easeOut' }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <CanvasShimmerSkeleton theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Floating Controls Pill (When Folder is selected) */}
        {isFolder && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white dark:bg-neutral-900 shadow-md border border-neutral-200/80 dark:border-neutral-800"
          >
            <span className="text-neutral-400 text-xs font-mono pr-0.5 select-none opacity-60">:::</span>

            <button
              onClick={() => setFolderColor('black')}
              className={`w-6 h-6 rounded-lg bg-[#111113] border transition-transform cursor-pointer ${
                folderColor === 'black'
                  ? 'scale-110 border-neutral-900 ring-2 ring-neutral-400'
                  : 'border-neutral-300 hover:scale-105'
              }`}
              title="Black"
            />

            <button
              onClick={() => setFolderColor('white')}
              className={`w-6 h-6 rounded-lg bg-white border transition-transform cursor-pointer ${
                folderColor === 'white'
                  ? 'scale-110 border-neutral-900 ring-2 ring-neutral-400'
                  : 'border-neutral-300 hover:scale-105'
              }`}
              title="White"
            />

            <button
              onClick={() => setFolderColor('blue')}
              className={`w-6 h-6 rounded-lg bg-[#38BDF8] border transition-transform cursor-pointer ${
                folderColor === 'blue'
                  ? 'scale-110 border-sky-600 ring-2 ring-sky-300'
                  : 'border-neutral-300 hover:scale-105'
              }`}
              title="Blue (Original)"
            />

            <button
              onClick={() => setFolderColor('lilac')}
              className={`w-6 h-6 rounded-lg bg-[#D4CBE5] border transition-transform cursor-pointer ${
                folderColor === 'lilac'
                  ? 'scale-110 border-[#9C8EB8] ring-2 ring-[#C1B4D8]'
                  : 'border-neutral-300 hover:scale-105'
              }`}
              title="Lilac (Brand)"
            />
          </motion.div>
        )}

        {/* Slide-over Code Drawer */}
        <AnimatePresence>
          {codeDrawerOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`absolute right-0 top-0 bottom-0 z-40 w-full max-w-md border-l shadow-2xl p-6 flex flex-col justify-between ${
                theme === 'light'
                  ? 'bg-white border-neutral-200 text-neutral-900'
                  : 'bg-[#17151C] border-[#2B2732] text-white'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between pb-4 border-b ${
                  theme === 'light' ? 'border-neutral-200' : 'border-[#2B2732]'
                }`}>
                  <div>
                    <h3 className={`font-bold ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
                      {currentFound.entry.title}
                    </h3>
                    <span className="text-[11px] font-mono text-neutral-400">
                      RewampUI Component
                    </span>
                  </div>
                  <button
                    onClick={() => setCodeDrawerOpen(false)}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-4 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase text-neutral-400">
                        Prompt
                      </span>
                      <button
                        onClick={handleCopyPrompt}
                        className="text-[11px] font-mono text-[#9C8EB8] dark:text-[#D4CBE5] hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedPrompt ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedPrompt ? 'Copied' : 'Copy prompt'}</span>
                      </button>
                    </div>
                    <div className={`p-3 rounded-xl font-mono text-xs leading-relaxed max-h-40 overflow-y-auto ${
                      theme === 'light' ? 'bg-neutral-100 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                    }`}>
                      <p className="whitespace-pre-wrap">{getPromptForSlug(activeSlug, currentFound?.entry?.title)}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
                      Install
                    </span>
                    <div className={`p-3 rounded-xl font-mono text-xs flex items-center justify-between ${
                      theme === 'light' ? 'bg-neutral-100 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                    }`}>
                      <code>npx rewampui add {activeSlug}</code>
                      <button
                        onClick={handleCopyInstall}
                        className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer"
                      >
                        {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <span className="text-[11px] font-mono uppercase text-neutral-400 block mb-1.5">
                      Usage
                    </span>
                    <div className={`p-3.5 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto ${
                      theme === 'light' ? 'bg-neutral-100 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                    }`}>
                      <pre>{`import { ${currentFound.entry.title.replace(/[^a-zA-Z0-9]/g, '')} } from "@/components/ui/${activeSlug}";

export default function Demo() {
  return <${currentFound.entry.title.replace(/[^a-zA-Z0-9]/g, '')} />;
}`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
