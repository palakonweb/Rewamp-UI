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
  Download,
  Sun,
  Moon,
  Menu,
  Home,
  FileText,
  Heart,
  Github,
  Info
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { categories, findComponentBySlug } from '../docsRegistry';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';
import CanvasShimmerSkeleton from '../ui/CanvasShimmerSkeleton';
import ErrorBoundary from '../ui/ErrorBoundary';
import InstallSection from '../ui/InstallSection';
import {
  GlowTextChipSkeleton,
  FolderCardSkeleton,
  CardSkeleton
} from '../ui/Skeleton';

// Raw source text for every showcase/component file - lazily fetched per-file
// only when the code drawer actually opens (Vite code-splits each glob entry).
const RAW_JS_MODULES = import.meta.glob('../ui/**/*.{jsx,tsx,js,ts}', { query: '?raw', import: 'default' });
const RAW_CSS_MODULES = import.meta.glob('../ui/**/*.css', { query: '?raw', import: 'default' });

// Robust resolver for glob keys in Vite dev and production build
function resolveRawPath(entry, slug) {
  const allKeys = Object.keys(RAW_JS_MODULES);
  if (!allKeys.length) return null;

  // 1. Explicit fileName from docsRegistry entry (e.g. 'AsciiMatrixHoverShowcase')
  if (entry?.fileName) {
    const fn = entry.fileName.replace(/\.(jsx|tsx|js|ts)$/, '');
    const directMatch = allKeys.find((k) =>
      k.endsWith(`/${fn}.jsx`) || k.endsWith(`/${fn}.tsx`) || k.endsWith(`/${fn}.js`) || k.endsWith(`/${fn}.ts`)
    );
    if (directMatch) return directMatch;
  }

  // 2. Try parsing importFn if function
  if (typeof entry?.importFn === 'function') {
    const str = entry.importFn.toString();
    const match = str.match(/['"]([^'"]*(?:ui\/|\/ui\/)[^'"]+)['"]/);
    if (match) {
      const clean = match[1].split('?')[0].replace(/\.(jsx|tsx|js|ts)$/, '');
      const base = clean.slice(clean.lastIndexOf('/') + 1);
      const matchKey = allKeys.find((k) =>
        k.endsWith(`/${base}.jsx`) || k.endsWith(`/${base}.tsx`) || k.endsWith(`/${base}.js`) || k.endsWith(`/${base}.ts`)
      );
      if (matchKey) return matchKey;
    }
  }

  // 3. Match by normalized slug (e.g. "ascii-matrix-hover" -> "asciimatrixhover")
  const targetSlug = (slug || entry?.slug || '').replace(/[^a-z0-9]/gi, '').toLowerCase();
  const targetTitle = (entry?.title || '').replace(/[^a-z0-9]/gi, '').toLowerCase();

  // Special cases for folder components
  if (targetSlug && (targetSlug.includes('folder') || targetTitle.includes('folder'))) {
    const folderMatch = allKeys.find((k) => k.includes('FrostedFolderCardShowcase') || k.includes('FrostedFolderCard'));
    if (folderMatch) return folderMatch;
  }

  if (targetSlug) {
    for (const k of allKeys) {
      const baseName = k.slice(k.lastIndexOf('/') + 1).replace(/\.(jsx|tsx|js|ts)$/, '');
      const normBase = baseName.replace(/[^a-z0-9]/gi, '').toLowerCase();
      const normWithoutShowcase = normBase.replace('showcase', '').replace('background', '');

      if (
        normBase === targetSlug ||
        normBase === `${targetSlug}showcase` ||
        normBase === `${targetSlug}backgroundshowcase` ||
        normWithoutShowcase === targetSlug ||
        (targetTitle && (normBase === targetTitle || normBase === `${targetTitle}showcase` || normWithoutShowcase === targetTitle))
      ) {
        return k;
      }
    }

    // Substring fallback
    for (const k of allKeys) {
      const baseName = k.slice(k.lastIndexOf('/') + 1).replace(/\.(jsx|tsx|js|ts)$/, '');
      const normBase = baseName.replace(/[^a-z0-9]/gi, '').toLowerCase();
      if (normBase.includes(targetSlug) || (targetSlug.length > 4 && targetSlug.includes(normBase.replace('showcase', '')))) {
        return k;
      }
    }
  }

  return null;
}

// Any additional local component file the showcase itself imports (e.g. a
// Showcase wraps a separate `./ui/RealComponent`), so the code view isn't just
// the thin showcase wrapper.
function extractLocalImportPaths(source, currentPath) {
  if (!source || typeof source !== 'string') return [];
  const dir = currentPath.slice(0, currentPath.lastIndexOf('/'));
  const matches = [...source.matchAll(/from\s+['"](\.\/[^'"]+)['"]/g)];
  const ignoreList = ['Source', 'Prompt', 'BackgroundHeroOverlay', 'Skeleton', 'ErrorBoundary', 'Preloader', 'ThemeToggle', 'CanvasShimmerSkeleton'];
  const paths = matches
    .map((m) => m[1])
    .filter((p) => !ignoreList.some((ign) => p.includes(ign)))
    .map((p) => `${dir}/${p.replace(/^\.\//, '')}`);
  return paths;
}

// Extract *Source file imports from a showcase file's raw text
function extractSourceImportPaths(source, currentPath) {
  if (!source || typeof source !== 'string') return [];
  const dir = currentPath.slice(0, currentPath.lastIndexOf('/'));
  const matches = [...source.matchAll(/from\s+['"](\.\/[^'"]+Source[^'"]*)['"]/g)];
  return matches
    .map((m) => m[1])
    .map((p) => `${dir}/${p.replace(/^\.\//, '')}`);
}

// Parse exported template-literal strings (*Code, *Usage, *Prompt) from a raw Source file.
// Source files export string constants as: export const fooCode = `...`;
// Most Showcase files instead declare an unexported `const promptContent = \`...\`;`
// right at the top — that's the component's one-line design description, so
// it's treated as the prompt too even though it's neither exported nor
// suffixed "Prompt".
function parseSourceExports(rawText) {
  const result = { code: '', usage: '', prompt: '' };
  if (!rawText || typeof rawText !== 'string') return result;
  const exportRegex = /export\s+const\s+(\w+(?:Code|Usage|Prompt))\s*=\s*`([\s\S]*?)`;/g;
  let m;
  while ((m = exportRegex.exec(rawText)) !== null) {
    const name = m[1];
    const value = m[2];
    if (name.endsWith('Code')) result.code = value;
    else if (name.endsWith('Usage')) result.usage = value;
    else if (name.endsWith('Prompt')) result.prompt = value;
  }

  if (!result.prompt) {
    const localPromptRegex = /const\s+(\w*[Pp]rompt\w*)\s*=\s*`([\s\S]*?)`;/;
    const localMatch = localPromptRegex.exec(rawText);
    if (localMatch) result.prompt = localMatch[2];
  }

  return result;
}

function extractDependencies(sources) {
  const deps = new Set();
  for (const src of sources) {
    if (!src || typeof src !== 'string') continue;
    const matches = [...src.matchAll(/(?:^|\n)\s*import[^'"]*from\s+['"]([^'".][^'"]*)['"]/g)];
    for (const m of matches) {
      const pkg = m[1];
      if (pkg === 'react' || pkg === 'react-dom') continue;
      // keep scoped/package root only, e.g. "lucide-react/foo" -> "lucide-react"
      const root = pkg.startsWith('@') ? pkg.split('/').slice(0, 2).join('/') : pkg.split('/')[0];
      deps.add(root);
    }
  }
  return [...deps];
}

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
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: 'spring', stiffness: 340, damping: 26 }}
        title={label}
        className={`relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-colors ${
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

  const [activeSlug, setActiveSlug] = useState(slug || 'liquid-cursor-gradient');
  const [folderColor, setFolderColor] = useState('black');
  const [theme, setTheme] = useState(() => getSiteTheme());
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [codeDrawerOpen, setCodeDrawerOpen] = useState(false);
  const [descDrawerOpen, setDescDrawerOpen] = useState(false);
  const [sourceInfo, setSourceInfo] = useState({ code: '', css: '', usage: '', prompt: '', dependencies: [], loading: false });
  const [codeTab, setCodeTab] = useState('component'); // 'component' | 'css' | 'usage' | 'deps'
  const [windowWidth, setWindowWidth] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = windowWidth >= 1024;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollContainerRef = useRef(null);

  // Derived: is any side panel open? Used to scale down the canvas component.
  const panelOpen = codeDrawerOpen || descDrawerOpen;

  useEffect(() => {
    setSiteTheme(theme);
  }, [theme]);

  // Stay in sync when some other control (e.g. a Toggle showcase demo) changes the theme
  useEffect(() => {
    const handleExternalChange = (e) => setTheme(e.detail.theme);
    window.addEventListener(SITE_THEME_EVENT, handleExternalChange);
    return () => window.removeEventListener(SITE_THEME_EVENT, handleExternalChange);
  }, []);

  useEffect(() => {
    if (slug) {
      setActiveSlug(slug);
    } else {
      setActiveSlug('liquid-cursor-gradient');
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
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarCollapsed(true);
    }
  };

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(`npx rewampui add ${activeSlug}`);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleOpenInstall = () => {
    setDescDrawerOpen(false);
    setCodeDrawerOpen(true);
    setCodeTab('install');
  };

  const handleToggleCode = () => {
    setDescDrawerOpen(false);
    setCodeDrawerOpen((prev) => !prev);
  };

  const handleToggleDescription = () => {
    setCodeDrawerOpen(false);
    setDescDrawerOpen((prev) => !prev);
  };

  // Find active component for canvas
  const currentFound = useMemo(() => {
    return findComponentBySlug(activeSlug) || findComponentBySlug('liquid-cursor-gradient') || {
      entry: { title: 'Liquid Cursor Gradient', Component: () => null }
    };
  }, [activeSlug]);

  // Load real source (+ any CSS + dependency list) for active component
  useEffect(() => {
    const entry = currentFound?.entry;
    const mainPath = resolveRawPath(entry, activeSlug);
    if (!mainPath) {
      // Fallback usage
      const title = entry?.title || 'Component';
      const componentName = title.replace(/\s+/g, '');
      setSourceInfo({
        code: `// Source for ${title}\n// Please see documentation for full props and configuration.`,
        css: '',
        usage: `import ${componentName} from './${componentName}';\n\nexport default function Example() {\n  return (\n    <div className="w-full h-full flex items-center justify-center p-8">\n      <${componentName} />\n    </div>\n  );\n}`,
        prompt: '',
        dependencies: ['lucide-react', 'framer-motion'],
        loading: false,
      });
      return;
    }

    let cancelled = false;
    setSourceInfo((prev) => ({ ...prev, loading: true }));

    (async () => {
      try {
        const mainSource = await RAW_JS_MODULES[mainPath]();
        const localPaths = extractLocalImportPaths(mainSource, mainPath);
        const sourcePaths = extractSourceImportPaths(mainSource, mainPath);

        // 1. Load the actual reusable component files (not the Showcase wrapper)
        const localSources = [];
        for (const rawRel of localPaths) {
          const candidates = [`${rawRel}.jsx`, `${rawRel}.tsx`, `${rawRel}.js`, `${rawRel}.ts`, rawRel];
          const match = candidates.find((p) => RAW_JS_MODULES[p]);
          if (match) localSources.push(await RAW_JS_MODULES[match]());
        }

        // 2. Load *Source files and parse their *Code/*Usage/*Prompt exports
        let sourceCode = '';
        let sourceUsage = '';
        let sourcePrompt = '';
        for (const rawRel of sourcePaths) {
          const candidates = [`${rawRel}.ts`, `${rawRel}.js`, `${rawRel}.tsx`, `${rawRel}.jsx`, rawRel];
          const match = candidates.find((p) => RAW_JS_MODULES[p]);
          if (match) {
            const rawSourceText = await RAW_JS_MODULES[match]();
            const parsed = parseSourceExports(rawSourceText);
            if (parsed.code) sourceCode = parsed.code;
            if (parsed.usage) sourceUsage = parsed.usage;
            if (parsed.prompt) sourcePrompt = parsed.prompt;
          }
        }

        // The Showcase file itself may inline-export a `*Prompt` constant
        if (!sourcePrompt) {
          const mainParsed = parseSourceExports(mainSource);
          if (mainParsed.prompt) sourcePrompt = mainParsed.prompt;
        }

        // 3. Load CSS files from both the showcase and component paths
        const cssCandidates = [mainPath, ...localPaths].map((p) => p.replace(/\.(jsx|tsx|js|ts)$/, '.css'));
        let cssText = '';
        for (const cssPath of cssCandidates) {
          if (RAW_CSS_MODULES[cssPath]) {
            cssText += await RAW_CSS_MODULES[cssPath]();
          }
        }

        // 4. Determine the best code to show:
        let finalCode = '';
        const allRawSources = [mainSource, ...localSources];
        const isRealComponent = sourceCode && /(?:export\s+(?:default\s+)?)?(?:function|class|const\s+\w+\s*=\s*(?:\(|React))/.test(sourceCode);

        if (sourceCode && isRealComponent) {
          // Clean embedded component code
          finalCode = sourceCode;
        } else if (localSources.length > 0) {
          // Show the actual component files
          finalCode = localSources.join('\n\n// ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ── ──\n\n');
          if (sourceCode && !isRealComponent && !sourceUsage) {
            sourceUsage = sourceCode;
          }
        } else {
          // Self-contained showcase
          finalCode = mainSource;
        }

        // 5. If no explicit usage was found, generate a clean usage snippet
        const title = entry?.title || 'Component';
        const componentName = title.replace(/\s+/g, '');
        if (!sourceUsage) {
          sourceUsage = `import ${componentName} from './${componentName}';\n\nexport default function Example() {\n  return (\n    <div className="w-full h-full flex items-center justify-center p-8">\n      <${componentName} />\n    </div>\n  );\n}`;
        }

        const deps = extractDependencies(allRawSources);
        if (deps.length === 0) {
          deps.push('lucide-react', 'framer-motion');
        }

        if (!cancelled) {
          setSourceInfo({
            code: finalCode,
            css: cssText,
            usage: sourceUsage,
            prompt: sourcePrompt,
            dependencies: deps,
            loading: false,
          });
        }
      } catch (err) {
        console.error('Failed to load source for component:', err);
        if (!cancelled) {
          setSourceInfo((prev) => ({ ...prev, loading: false }));
        }
      }
    })();

    return () => { cancelled = true; };
  }, [activeSlug, currentFound]);

  // Reset code tab when switching components
  useEffect(() => {
    setCodeTab('component');
  }, [activeSlug]);

  return (
    <div 
      className={`h-[100dvh] w-full overflow-hidden p-1.5 sm:p-2.5 flex gap-2.5 font-sans select-none transition-colors duration-250 ${
        theme === 'light' ? 'bg-[#FAFAFA]' : 'bg-[#0D0C10]'
      }`}
    >
      {/* ── 1. Airplane Flightpath Sidebar (All 74 Components) ── */}
      <AnimatePresence initial={false}>
        {!sidebarCollapsed && (
          <>
            {/* Mobile Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarCollapsed(true)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.aside
              initial={{ width: 0, opacity: 0, x: -20 }}
              animate={{ width: 280, opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="fixed md:relative inset-y-0 left-0 z-50 md:z-20 h-full w-[280px] shrink-0 flex flex-col justify-between py-3 pl-3 pr-2 overflow-hidden shadow-2xl md:shadow-none border-r md:border-r-0 border-[var(--border)]"
              style={{
                backgroundColor: theme === 'light' ? '#FAFAFA' : '#0D0C10'
              }}
            >
            <div className="flex flex-col h-full overflow-hidden">
              {/* Top Row: Sidebar Toggle on Left & RewampUI Brand */}
              <div className="flex items-center justify-between gap-2 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSidebarCollapsed(true)}
                    className="hidden md:flex w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors shadow-2xs cursor-pointer shrink-0"
                    title="Collapse sidebar"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 3v18" />
                    </svg>
                  </button>
                  <img src="/logo.svg" alt="RewampUI" className="w-8 h-8 shrink-0 object-contain" />
                  <span className="font-bold text-[16px] tracking-tight text-[var(--text-primary)]">
                    RewampUI
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[var(--elevated)] text-[var(--text-subtle)] border border-[var(--border)]">
                    {totalComponentCount}
                  </span>
                </div>

                {/* Mobile close button */}
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="md:hidden w-8 h-8 rounded-xl bg-[var(--elevated)] border border-[var(--border)] flex items-center justify-center text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
                  title="Close navigation"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Quick Nav Bar (Home & Docs) */}
              <div className="flex items-center gap-2 pb-3 md:hidden">
                <button
                  onClick={() => {
                    navigate('/');
                    setSidebarCollapsed(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] text-xs font-medium text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <Home className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/documentation');
                    setSidebarCollapsed(true);
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-xl bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] text-xs font-medium text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Docs</span>
                </button>
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

              {/* Documentation */}
              <button
                onClick={() => navigate('/documentation')}
                className="w-full flex items-center justify-center gap-1.5 mb-3 py-1.5 px-2.5 rounded-xl bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] text-xs font-medium text-[var(--text-primary)] transition-colors cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-neutral-400" />
                <span>Documentation</span>
              </button>

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
        </>
      )}
      </AnimatePresence>

      {/* ── Mobile Burger Nav Bar ── */}
      <header className="md:hidden absolute top-3 inset-x-3 z-30 flex items-center justify-between pointer-events-none">
        {/* Brand & Active Component Badge */}
        <div className="pointer-events-auto flex items-center gap-2 bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--border)] px-3 py-1.5 rounded-2xl shadow-md">
          <img src="/logo.svg" alt="RewampUI" className="w-5 h-5 object-contain shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[11px] tracking-tight text-[var(--text-primary)] leading-tight">
              RewampUI
            </span>
            <span className="text-[10px] text-[var(--text-subtle)] truncate max-w-[140px] leading-tight font-medium">
              {currentFound?.entry?.title || 'Components'}
            </span>
          </div>
        </div>

        {/* Animated 3-Bar Burger Nav Button */}
        <button
          type="button"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="pointer-events-auto w-9 h-9 rounded-2xl bg-[var(--surface)]/95 backdrop-blur-xl border border-[var(--border)] shadow-md flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--elevated)] active:scale-95 transition-all cursor-pointer shrink-0"
          aria-label={sidebarCollapsed ? "Open burger menu" : "Close burger menu"}
          title={sidebarCollapsed ? "Open navigation" : "Close navigation"}
        >
          <div className="w-4 h-3 flex flex-col justify-between items-center relative">
            <motion.span
              animate={!sidebarCollapsed ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-0.5 bg-current rounded-full origin-center"
            />
            <motion.span
              animate={!sidebarCollapsed ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
              className="w-4 h-0.5 bg-current rounded-full"
            />
            <motion.span
              animate={!sidebarCollapsed ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              className="w-4 h-0.5 bg-current rounded-full origin-center"
            />
          </div>
        </button>
      </header>

      {/* Floating Re-Open Button when sidebar is collapsed (Desktop only) */}
      {sidebarCollapsed && (
        <button
          onClick={() => setSidebarCollapsed(false)}
          className="hidden md:flex absolute top-5 left-5 z-30 w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--border)] items-center justify-center text-neutral-500 hover:text-neutral-900 transition-colors shadow-md cursor-pointer"
          title="Open sidebar"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M9 3v18" />
          </svg>
        </button>
      )}

      {/* ── 2. Main Content Area - Canvas + Side Panel Split ── */}
      <div className="flex-1 h-full flex gap-2.5 overflow-hidden relative">
        {/* Canvas Stage - shrinks on desktop when a panel is open, stays full width on mobile/tablet */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 32 }}
          className={`h-full rounded-[22px] sm:rounded-[36px] relative overflow-hidden flex items-center justify-center transition-colors duration-250 ${
            theme === 'light' ? 'bg-[#EAEAEA]' : 'bg-[#141218]'
          }`}
          style={{
            flex: isDesktop && panelOpen ? '1 1 54%' : '1 1 100%',
            minWidth: 0,
            boxShadow: theme === 'light'
              ? 'inset 0 1px 2px rgba(0,0,0,0.04)'
              : 'inset 0 1px 2px rgba(255,255,255,0.04)'
          }}
        >
          {/* Bottom-Center Liquid Glass Dock: Install, Prompt, Code, Theme */}
          <div className="absolute bottom-3 sm:bottom-5 inset-x-0 z-30 flex items-center justify-center pointer-events-none px-2">
            <div
              className="pointer-events-auto flex items-end gap-2 sm:gap-4 rounded-[22px] sm:rounded-[26px] px-2.5 sm:px-4 py-1.5 sm:py-2 backdrop-blur-2xl border max-w-[calc(100vw-20px)]"
              style={{
                background: theme === 'light'
                  ? 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 100%)'
                  : 'linear-gradient(180deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 100%)',
                borderColor: theme === 'light' ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.14)',
                boxShadow: theme === 'light'
                  ? '0 12px 32px rgba(0,0,0,0.10), inset 0 1px 1px rgba(255,255,255,0.8)'
                  : '0 12px 32px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.12)',
              }}
            >
              <DockIcon
                label="Install"
                onClick={handleOpenInstall}
                theme={theme}
                active={codeDrawerOpen && codeTab === 'install'}
              >
                <Download className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </DockIcon>

              <DockIcon
                label="Code"
                onClick={handleToggleCode}
                theme={theme}
                active={codeDrawerOpen}
              >
                <Code2 className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </DockIcon>

              <DockIcon
                label="Description"
                onClick={handleToggleDescription}
                theme={theme}
                active={descDrawerOpen}
              >
                <Info className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
              </DockIcon>

              <DockIcon
                label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                theme={theme}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === 'dark' ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Sun className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <Moon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </DockIcon>
            </div>
          </div>

          {/* ── Centered Showcase Stage ── */}
          <div className="w-full h-full flex items-center justify-center p-2 pt-14 pb-20 sm:p-6 sm:pb-24 lg:p-10 overflow-y-auto overflow-x-hidden no-scrollbar relative">
            <motion.div
              key={activeSlug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: panelOpen && isDesktop ? 0.76 : 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 26 }}
              className="canvas-stage relative flex items-center justify-center w-full max-w-full sm:max-w-[1080px] min-h-[280px] sm:min-h-0 sm:aspect-[16/10] sm:max-h-[640px] rounded-[20px] sm:rounded-[24px] overflow-visible [&_.blur-3xl]:hidden [&_.shadow-sm:has(code)]:hidden"
              style={{ transformOrigin: 'center center' }}
            >
              <ErrorBoundary key={activeSlug}>
                <Suspense fallback={getComponentSkeleton(activeSlug)}>
                  <div className="animate-component-fade-in flex items-center justify-center w-full max-w-full h-full p-1 sm:p-4 overflow-visible">
                    {currentFound?.entry?.Component && <currentFound.entry.Component />}
                  </div>
                </Suspense>
              </ErrorBoundary>
            </motion.div>

            {/* Sweeping Chromatic Shimmer Skeleton */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  key="shimmer-canvas"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="absolute inset-0 z-20 pointer-events-none rounded-[22px] sm:rounded-[36px] overflow-hidden flex items-center justify-center"
                >
                  <CanvasShimmerSkeleton theme={theme} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* ── Mobile/Tablet Backdrop for drawers ── */}
        <AnimatePresence>
          {!isDesktop && panelOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setCodeDrawerOpen(false);
                setDescDrawerOpen(false);
              }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
            />
          )}
        </AnimatePresence>

        {/* ── Side Code Panel ── */}
        <AnimatePresence>
          {codeDrawerOpen && (
            <motion.div
              initial={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : 40, opacity: 0 }}
              animate={{ width: isDesktop ? '46%' : undefined, x: 0, opacity: 1 }}
              exit={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className={`h-full overflow-hidden flex flex-col shrink-0 border ${
                isDesktop
                  ? 'rounded-[22px] sm:rounded-[24px]'
                  : 'fixed inset-y-2 right-2 z-50 w-[calc(100%-16px)] sm:w-[500px] rounded-[22px] shadow-2xl'
              } ${
                theme === 'light'
                  ? 'bg-white border-neutral-200/80 text-neutral-900'
                  : 'bg-[#17151C] border-[#2B2732] text-white'
              }`}
              style={{ minWidth: 0 }}
            >
              {/* Header bar with Install, Expand, Close, Copy */}
              <div className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                theme === 'light' ? 'border-neutral-200' : 'border-[#2B2732]'
              }`}>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold text-sm ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
                    Code Block
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {/* Copy current tab code */}
                  <button
                    onClick={() => {
                      const textToCopy = codeTab === 'css' ? sourceInfo.css
                        : codeTab === 'usage' ? sourceInfo.usage
                        : codeTab === 'deps' ? `npm install ${sourceInfo.dependencies.join(' ')}`
                        : sourceInfo.code;
                      navigator.clipboard.writeText(textToCopy || '');
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 2000);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      theme === 'light'
                        ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                        : 'bg-[#24202C] hover:bg-[#302A3C] text-neutral-300'
                    }`}
                    title="Copy code"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  {/* Close */}
                  <button
                    onClick={() => setCodeDrawerOpen(false)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      theme === 'light' ? 'hover:bg-neutral-100 text-neutral-500' : 'hover:bg-[#24202C] text-neutral-400'
                    }`}
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Code section tabs */}
              <div className={`flex items-center gap-1 px-4 py-2 border-b shrink-0 ${
                theme === 'light' ? 'border-neutral-200' : 'border-[#2B2732]'
              }`}>
                <button
                  onClick={() => setCodeTab('install')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    codeTab === 'install'
                      ? (theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900')
                      : (theme === 'light' ? 'text-neutral-500 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-[#24202C]')
                  }`}
                >
                  Install
                </button>
                <button
                  onClick={() => setCodeTab('component')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                    codeTab === 'component'
                      ? (theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900')
                      : (theme === 'light' ? 'text-neutral-500 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-[#24202C]')
                  }`}
                >
                  Component
                </button>
                {sourceInfo.css && (
                  <button
                    onClick={() => setCodeTab('css')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      codeTab === 'css'
                        ? (theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900')
                        : (theme === 'light' ? 'text-neutral-500 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-[#24202C]')
                    }`}
                  >
                    CSS
                  </button>
                )}
                {sourceInfo.usage && (
                  <button
                    onClick={() => setCodeTab('usage')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      codeTab === 'usage'
                        ? (theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900')
                        : (theme === 'light' ? 'text-neutral-500 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-[#24202C]')
                    }`}
                  >
                    Usage
                  </button>
                )}
                {sourceInfo.dependencies.length > 0 && (
                  <button
                    onClick={() => setCodeTab('deps')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                      codeTab === 'deps'
                        ? (theme === 'light' ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900')
                        : (theme === 'light' ? 'text-neutral-500 hover:bg-neutral-100' : 'text-neutral-400 hover:bg-[#24202C]')
                    }`}
                  >
                    Dependencies
                  </button>
                )}
              </div>

              {/* Code content - tabbed sections */}
              <div className="flex-1 overflow-auto p-4">
                {sourceInfo.loading ? (
                  <p className="text-neutral-400 font-mono text-xs">Loading source…</p>
                ) : (
                  <>
                    {/* Install Tab */}
                    {codeTab === 'install' && (
                      <InstallSection
                        componentName={activeSlug}
                        npmDependencies={sourceInfo.dependencies}
                        sourceCode={sourceInfo.code}
                        usageSnippet={sourceInfo.usage}
                        theme={theme}
                      />
                    )}

                    {/* Component Code Tab */}
                    {codeTab === 'component' && (
                      <pre className={`font-mono text-[12px] leading-[1.7] whitespace-pre ${
                        theme === 'light' ? 'text-neutral-800' : 'text-neutral-200'
                      }`}>{sourceInfo.code || '// Source unavailable for this component'}</pre>
                    )}

                    {/* CSS Tab */}
                    {codeTab === 'css' && sourceInfo.css && (
                      <pre className={`font-mono text-[12px] leading-[1.7] whitespace-pre ${
                        theme === 'light' ? 'text-neutral-800' : 'text-neutral-200'
                      }`}>{sourceInfo.css}</pre>
                    )}

                    {/* Usage Tab */}
                    {codeTab === 'usage' && sourceInfo.usage && (
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                            theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>Usage Example</h4>
                          <pre className={`p-3 rounded-xl font-mono text-[12px] leading-[1.7] whitespace-pre ${
                            theme === 'light' ? 'bg-neutral-50 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                          }`}>{sourceInfo.usage}</pre>
                        </div>
                      </div>
                    )}

                    {/* Dependencies Tab */}
                    {codeTab === 'deps' && sourceInfo.dependencies.length > 0 && (
                      <div className="space-y-4">
                        <div>
                          <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                            theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>Install Dependencies</h4>
                          <div className={`p-3 rounded-xl font-mono text-[12px] flex items-center justify-between ${
                            theme === 'light' ? 'bg-neutral-50 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                          }`}>
                            <code>npm install {sourceInfo.dependencies.join(' ')}</code>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(`npm install ${sourceInfo.dependencies.join(' ')}`);
                                setCopiedInstall(true);
                                setTimeout(() => setCopiedInstall(false), 2000);
                              }}
                              className="text-neutral-400 hover:text-neutral-800 dark:hover:text-white cursor-pointer shrink-0 ml-2"
                            >
                              {copiedInstall ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                            theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
                          }`}>Required Packages</h4>
                          <div className="flex flex-wrap gap-1.5">
                            {sourceInfo.dependencies.map((dep) => (
                              <code
                                key={dep}
                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono ${
                                  theme === 'light'
                                    ? 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                                    : 'bg-[#24202C] text-neutral-300 border border-[#2B2732]'
                                }`}
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#D4CBE5] shrink-0" />
                                {dep}
                              </code>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Side Description Panel ── */}
        <AnimatePresence>
          {descDrawerOpen && (
            <motion.div
              initial={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : 40, opacity: 0 }}
              animate={{ width: isDesktop ? '46%' : undefined, x: 0, opacity: 1 }}
              exit={{ width: isDesktop ? 0 : undefined, x: isDesktop ? 0 : 40, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className={`h-full overflow-hidden flex flex-col shrink-0 border ${
                isDesktop
                  ? 'rounded-[22px] sm:rounded-[24px]'
                  : 'fixed inset-y-2 right-2 z-50 w-[calc(100%-16px)] sm:w-[500px] rounded-[22px] shadow-2xl'
              } ${
                theme === 'light'
                  ? 'bg-white border-neutral-200/80 text-neutral-900'
                  : 'bg-[#17151C] border-[#2B2732] text-white'
              }`}
              style={{ minWidth: 0 }}
            >
              {/* Header bar */}
              <div className={`flex items-center justify-between px-4 py-3 border-b shrink-0 ${
                theme === 'light' ? 'border-neutral-200' : 'border-[#2B2732]'
              }`}>
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                    theme === 'light' ? 'bg-neutral-100 text-neutral-500' : 'bg-[#24202C] text-neutral-400'
                  }`}>
                    <Info className="w-3.5 h-3.5" />
                  </div>
                  <span className={`font-semibold text-sm ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
                    Description
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {sourceInfo.prompt && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(sourceInfo.prompt || '');
                        setCopiedCode(true);
                        setTimeout(() => setCopiedCode(false), 2000);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                        theme === 'light'
                          ? 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                          : 'bg-[#24202C] hover:bg-[#302A3C] text-neutral-300'
                      }`}
                      title="Copy description"
                    >
                      {copiedCode ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                    </button>
                  )}
                  <button
                    onClick={() => setDescDrawerOpen(false)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                      theme === 'light' ? 'hover:bg-neutral-100 text-neutral-500' : 'hover:bg-[#24202C] text-neutral-400'
                    }`}
                    title="Close"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Description content */}
              <div className="flex-1 overflow-auto p-5">
                {sourceInfo.loading ? (
                  <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    Loading description…
                  </div>
                ) : sourceInfo.prompt ? (
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 pb-1 mb-1 border-b ${
                      theme === 'light' ? 'border-neutral-100' : 'border-[#24202C]'
                    }`}>
                      <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
                        theme === 'light' ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {currentFound?.entry?.title || 'Component'}
                      </span>
                    </div>
                    {sourceInfo.prompt.split('\n').filter(Boolean).map((line, i) => {
                      const trimmed = line.trim();
                      const isBullet = trimmed.startsWith('-');
                      const isSubBullet = /^\s{2,}-/.test(line);
                      const text = isBullet ? trimmed.replace(/^-+\s*/, '') : trimmed;

                      if (isBullet) {
                        return (
                          <div key={i} className={`flex items-start gap-2.5 ${isSubBullet ? 'ml-4' : ''}`}>
                            <span className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${
                              isSubBullet
                                ? (theme === 'light' ? 'bg-neutral-300' : 'bg-neutral-600')
                                : 'bg-[#C1B4D8]'
                            }`} />
                            <p className={`text-[13px] leading-relaxed ${
                              theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                            }`}>
                              {text.split(/(`[^`]+`)/g).map((part, j) =>
                                part.startsWith('`') && part.endsWith('`') ? (
                                  <code
                                    key={j}
                                    className={`px-1 py-0.5 rounded font-mono text-[11.5px] ${
                                      theme === 'light' ? 'bg-neutral-100 text-neutral-800' : 'bg-[#24202C] text-neutral-200'
                                    }`}
                                  >
                                    {part.slice(1, -1)}
                                  </code>
                                ) : (
                                  <React.Fragment key={j}>{part}</React.Fragment>
                                )
                              )}
                            </p>
                          </div>
                        );
                      }

                      return (
                        <p key={i} className={`text-[14px] leading-relaxed font-medium ${
                          theme === 'light' ? 'text-neutral-900' : 'text-neutral-100'
                        }`}>{text}</p>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-2 h-full text-center py-16">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === 'light' ? 'bg-neutral-100 text-neutral-400' : 'bg-[#24202C] text-neutral-500'
                    }`}>
                      <Info className="w-5 h-5" />
                    </div>
                    <p className="text-neutral-400 font-mono text-xs">No description available for this component yet.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
