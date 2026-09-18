import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutTemplate, Sparkles, PlayCircle, FileText, ChevronRight, Menu, X, ArrowDownUp, Sun, Moon } from 'lucide-react';

export const heroMorphNavbarPrompt = `A responsive, dual-state morphing navigation header built in React with Tailwind CSS and Framer Motion:
- Top State (Full Header): Full-width navbar (max 1400px, 64px height) with brand logo, typography, clean desktop navigation links (Components, Bento, Live Demo, Docs), and tactile action button.
- Scrolled State (Floating Dynamic Pill): Smoothly contracts using layout spring physics into a compact floating pill (max 500px, 48px height) with rounded-full geometry, frosted glass backdrop (backdrop-blur-2xl), icon tooltips, and compact chevron action button.
- Mobile Support: Integrated responsive burger toggle with animated 3-bar icon and frosted slide-down menu sheet.
- Dark and Light Mode: Supports both dark (#181622) and light (white) themes with subtle borders and elevation shadows.`;

export default function HeroMorphNavbarShowcase() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('components');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false);
  const scrollRef = useRef(null);

  // Drive the morph off real scroll position of the demo's own scroll area,
  // same as a real page header would react to window scroll.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setScrolled(el.scrollTop > 24);
    };
    handleScroll();
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // Measure the demo's own container (not the window) so the nav collapses
  // into its mobile layout correctly when a side panel shrinks the stage
  // without the window itself resizing.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const applyWidth = (w) => setIsNarrow(w < 560);
    applyWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) applyWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
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

  const navLinks = [
    { id: 'components', label: 'Components', icon: LayoutTemplate },
    { id: 'bento', label: 'Bento', icon: Sparkles },
    { id: 'live-demo', label: 'Live Demo', icon: PlayCircle },
    { id: 'docs', label: 'Docs', icon: FileText },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8 select-none">
      {/* ── State Control Toolbar ── */}
      <div className="flex items-center gap-2 mb-4 bg-black/5 dark:bg-white/10 p-1.5 rounded-2xl backdrop-blur-md">
        <button
          onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            !scrolled
              ? 'bg-white dark:bg-[#1E1B28] text-neutral-900 dark:text-white shadow-xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          Full Header
        </button>

        <button
          onClick={() => scrollRef.current?.scrollTo({ top: 80, behavior: 'smooth' })}
          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
            scrolled
              ? 'bg-white dark:bg-[#1E1B28] text-neutral-900 dark:text-white shadow-xs font-semibold'
              : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
          }`}
        >
          Floating Pill (Scrolled)
        </button>

        <button
          onClick={() => scrollRef.current?.scrollTo({ top: scrolled ? 0 : 80, behavior: 'smooth' })}
          className="p-1.5 rounded-xl text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition-colors cursor-pointer"
          title="Toggle morph state"
        >
          <ArrowDownUp size={14} />
        </button>
      </div>

      {/* ── Navbar Morph Stage: real scrollable area so the nav reacts to actual scroll ── */}
      <div
        ref={scrollRef}
        className="relative w-full max-w-full h-[280px] sm:h-[320px] overflow-y-auto overflow-x-hidden rounded-2xl no-scrollbar"
      >
        <div className="sticky top-0 z-10 flex items-center justify-center py-3">
        <motion.nav
          layout
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 28,
            mass: 0.8,
          }}
          className={`relative flex items-center justify-between transition-colors duration-300 ${
            scrolled
              ? isDark
                ? 'px-3 sm:px-4 h-12 rounded-full bg-[#181622]/90 backdrop-blur-2xl border border-white/12 shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                : 'px-3 sm:px-4 h-12 rounded-full bg-white/90 backdrop-blur-2xl border border-black/10 shadow-[0_12px_36px_rgba(0,0,0,0.12)]'
              : isDark
                ? 'px-4 sm:px-8 h-16 w-full max-w-[640px] rounded-2xl bg-[#181622] border border-white/10 shadow-lg'
                : 'px-4 sm:px-8 h-16 w-full max-w-[640px] rounded-2xl bg-white border border-black/8 shadow-md'
          }`}
          style={{
            width: scrolled ? 'calc(100% - 24px)' : '100%',
            maxWidth: scrolled ? '460px' : '640px',
            borderRadius: scrolled ? '9999px' : '20px',
          }}
        >
          {/* Logo & Wordmark */}
          <div className="flex items-center gap-2 shrink-0 cursor-pointer">
            <img
              src="/logo.svg"
              alt="Logo"
              className={`transition-all duration-300 w-auto object-contain ${scrolled ? 'h-6 sm:h-7' : 'h-8'}`}
            />
            <AnimatePresence>
              {!scrolled && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-bold tracking-tight text-xs sm:text-sm whitespace-nowrap overflow-hidden text-neutral-900 dark:text-white"
                >
                  RewampUI
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Nav Links */}
          <div
            className={`items-center transition-all duration-300 ${
              scrolled ? 'flex gap-1.5' : isNarrow ? 'hidden' : 'flex gap-3 sm:gap-6'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              const Icon = link.icon;

              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`relative flex items-center justify-center transition-all duration-200 cursor-pointer ${
                    scrolled
                      ? 'w-8 h-8 rounded-full hover:bg-black/5 dark:hover:bg-white/10'
                      : 'text-xs sm:text-[13px] font-medium hover:text-black dark:hover:text-white px-2 py-1'
                  } ${
                    isActive
                      ? scrolled
                        ? 'bg-black/10 dark:bg-white/20 text-neutral-900 dark:text-white'
                        : 'text-neutral-900 dark:text-white font-semibold'
                      : 'text-neutral-500 dark:text-neutral-400'
                  }`}
                  title={link.label}
                >
                  {scrolled ? (
                    <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                  ) : (
                    <>
                      <span>{link.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="hero-nav-active-pill"
                          className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[#D4CBE5] dark:bg-[#D4CBE5] rounded-full"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Burger Toggle (Full Header only) */}
          {!scrolled && isNarrow && (
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          )}

          {/* Right Action Button */}
          <div className={`${isNarrow ? 'hidden' : 'flex'} items-center gap-1.5`}>
            <button
              onClick={() => setScrolled(prev => !prev)}
              className={`flex items-center justify-center font-semibold transition-all duration-300 cursor-pointer ${
                scrolled
                  ? 'w-8 h-8 rounded-full bg-[#D4CBE5] text-neutral-900 shadow-sm hover:scale-105'
                  : 'text-xs px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#D4CBE5] text-neutral-900 shadow-xs hover:bg-[#C1B4D8]'
              }`}
            >
              {scrolled ? (
                <ChevronRight size={16} strokeWidth={2.4} />
              ) : (
                <span>Explore</span>
              )}
            </button>
          </div>

          {/* Scrolled state action button (always visible, incl. narrow) */}
          {scrolled && isNarrow && (
            <button
              onClick={() => setScrolled(prev => !prev)}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-[#D4CBE5] text-neutral-900 shadow-sm hover:scale-105 font-semibold transition-all duration-300 cursor-pointer"
            >
              <ChevronRight size={16} strokeWidth={2.4} />
            </button>
          )}

          {/* Mobile Slide-down Menu Sheet */}
          <AnimatePresence>
            {!scrolled && isNarrow && mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
                className={`absolute left-0 right-0 top-[calc(100%+8px)] z-20 flex flex-col gap-1 p-2 rounded-2xl backdrop-blur-2xl border ${
                  isDark
                    ? 'bg-[#181622]/95 border-white/10'
                    : 'bg-white/95 border-black/8'
                } shadow-lg`}
              >
                {navLinks.map((link) => {
                  const isActive = activeTab === link.id;
                  const Icon = link.icon;
                  return (
                    <button
                      key={link.id}
                      onClick={() => {
                        setActiveTab(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-black/10 dark:bg-white/10 text-neutral-900 dark:text-white'
                          : 'text-neutral-500 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} strokeWidth={isActive ? 2.4 : 2} />
                      {link.label}
                    </button>
                  );
                })}
                <button
                  onClick={() => setScrolled(prev => !prev)}
                  className="mt-1 text-xs px-3 py-2 rounded-xl bg-[#D4CBE5] text-neutral-900 font-semibold shadow-xs hover:bg-[#C1B4D8] cursor-pointer"
                >
                  Explore
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
        </div>

        {/* Filler scroll content so the container actually scrolls */}
        <div className="px-4 sm:px-8 pb-6 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10"
            />
          ))}
        </div>
      </div>

      {/* Description */}
      <p className="mt-4 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Scroll the demo area (or use the toggle buttons) to morph the header into a floating pill
      </p>
    </div>
  );
}

HeroMorphNavbarShowcase.customTitle = 'Hero Morph Navbar';
HeroMorphNavbarShowcase.customSlug = 'hero-morph-navbar';
