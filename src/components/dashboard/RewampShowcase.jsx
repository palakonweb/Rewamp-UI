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
  Sparkles
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, findComponentBySlug } from '../docsRegistry';
import { getPromptForSlug } from '../componentPrompts';
import ThemeToggle from '../ui/ThemeToggle';
import CanvasShimmerSkeleton from '../ui/CanvasShimmerSkeleton';
import ErrorBoundary from '../ui/ErrorBoundary';
import { 
  ContributionActivitySkeleton, 
  GlowTextChipSkeleton, 
  FolderCardSkeleton, 
  CardSkeleton 
} from '../ui/Skeleton';

/**
 * Get dedicated zero-CLS skeleton matching the component's reserved dimensions
 */
function getComponentSkeleton(slug) {
  if (slug === 'contribution-activity') {
    return <ContributionActivitySkeleton />;
  }
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

// Clean Folder Component
function CleanFolderComponent({ color = 'black' }) {
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseLeave={() => setIsHovered(false)}
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

      <div className="absolute inset-x-6 top-0 bottom-10 flex items-end justify-center pointer-events-none">
        <motion.div
          animate={{
            rotate: isHovered ? -16 : -7,
            y: isHovered ? -45 : -16,
            x: isHovered ? -24 : -10,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="absolute w-[78%] h-[85%] rounded-[20px] bg-[#E8E8E8] shadow-sm border border-black/5 p-4 flex flex-col gap-2.5 origin-bottom-center"
        >
          <div className="w-1/3 h-2.5 rounded-full bg-neutral-300" />
          <div className="w-full h-2.5 rounded-full bg-neutral-300/70" />
          <div className="w-2/3 h-2.5 rounded-full bg-neutral-300/70" />
        </motion.div>

        <motion.div
          animate={{
            rotate: isHovered ? 16 : 7,
            y: isHovered ? -45 : -16,
            x: isHovered ? 24 : 10,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.02 }}
          className="absolute w-[78%] h-[85%] rounded-[20px] bg-[#F2F2F2] shadow-sm border border-black/5 p-4 flex flex-col gap-2.5 origin-bottom-center"
        >
          <div className="w-1/2 h-2.5 rounded-full bg-neutral-300" />
          <div className="w-5/6 h-2.5 rounded-full bg-neutral-300/70" />
          <div className="w-3/4 h-2.5 rounded-full bg-neutral-300/70" />
        </motion.div>

        <motion.div
          animate={{
            rotate: 0,
            y: isHovered ? -60 : -26,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.04 }}
          className="absolute w-[82%] h-[90%] rounded-[22px] bg-white shadow-md border border-black/5 p-5 flex flex-col gap-3 origin-bottom"
        >
          <div className="w-2/5 h-3 rounded-full bg-neutral-400" />
          <div className="w-full h-2.5 rounded-full bg-neutral-200" />
          <div className="w-4/5 h-2.5 rounded-full bg-neutral-200" />
          <div className="w-3/4 h-2.5 rounded-full bg-neutral-200 mt-1" />
        </motion.div>
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
        {/* Top-Right Floating Action Bar */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
          {/* Copy Prompt Button in Brand Asset Lilac */}
          <button
            onClick={handleCopyPrompt}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-[#D4CBE5] hover:bg-[#C1B4D8] text-[#171717] shadow-xs transition-all cursor-pointer hover:shadow-sm active:scale-95"
            title="Copy exact natural-language component prompt"
          >
            {copiedPrompt ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#171717]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#171717]" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>

          {/* Icon Dock: Fullscreen, Code, Theme */}
          <div className="flex items-center gap-0.5 rounded-xl bg-white dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-2xs p-1">
            <button
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                } else {
                  document.exitFullscreen();
                }
              }}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>

            <button
              onClick={() => setCodeDrawerOpen(!codeDrawerOpen)}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title="View code"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </button>

            <div className="pl-0.5 pr-0.5 flex items-center">
              <ThemeToggle
                isDark={theme === 'dark'}
                onChange={(nextDark) => setTheme(nextDark ? 'dark' : 'light')}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* ── Centered Showcase Stage (Canvas Background Only — No Component Card Box) ── */}
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-12 overflow-hidden relative">
          {/* Main Component Canvas Stage (Mounted immediately for instantaneous fast loading) */}
          <motion.div
            key={activeSlug}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 26 }}
            className="canvas-stage flex items-center justify-center max-w-full max-h-full w-full [&_.blur-3xl]:hidden [&_.max-w-4xl>div:last-child]:hidden [&_.max-w-5xl>div:last-child]:hidden [&_.max-w-3xl>div:last-child]:hidden [&_.shadow-sm:has(code)]:hidden"
          >
            <ErrorBoundary key={activeSlug}>
              <Suspense fallback={getComponentSkeleton(activeSlug)}>
                <div className="animate-component-fade-in flex items-center justify-center w-full h-full">
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
