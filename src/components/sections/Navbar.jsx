import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LayoutTemplate, Sparkles, PlayCircle, FileText, ChevronRight, Menu, X } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.hash]);

  const navLinks = [
    { label: 'Components', href: '/components', icon: LayoutTemplate },
    { label: 'Bento', href: '/#bento', icon: Sparkles },
    { label: 'Live Demo', href: '/#live-demo', icon: PlayCircle },
    { label: 'Docs', href: '/documentation', icon: FileText },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center">
      <motion.nav
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between transition-colors duration-500 ${scrolled
            ? 'mt-3 sm:mt-4 px-3 sm:px-4 h-11 sm:h-12 rounded-full bg-white/85 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]'
            : 'mt-0 px-4 md:px-8 lg:px-12 h-16 w-full max-w-[1400px] bg-white border-b border-black/[0.06]'
          }`}
        style={{
          width: scrolled ? 'calc(100% - 24px)' : '100%',
          maxWidth: scrolled ? '500px' : '1400px',
          borderRadius: scrolled ? '9999px' : '0px',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 pr-2 sm:pr-4">
          <img
            src="/logo.svg"
            alt="Purrform Logo"
            className={`transition-all duration-500 w-auto object-contain ${scrolled ? 'h-7 sm:h-8' : 'h-8 sm:h-9'}`}
          />
          <AnimatePresence>
            {!scrolled && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-sans font-black tracking-tight text-[#1F1F1F] text-sm sm:text-base uppercase whitespace-nowrap overflow-hidden"
              >
                PURRFORM
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Center links for desktop */}
        <div className={`hidden md:flex items-center transition-all duration-500 ${scrolled ? 'gap-2 mx-2' : 'gap-8'
          }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.split('/')[1]);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative flex items-center justify-center transition-all duration-300 ${scrolled
                    ? 'w-8 h-8 rounded-full hover:bg-black/5'
                    : 'text-[13px] hover:text-[var(--text)]'
                  } ${isActive
                    ? scrolled ? 'bg-black/5 text-[var(--text)]' : 'text-[var(--text)]'
                    : 'text-[var(--text-3)]'
                  }`}
                title={scrolled ? link.label : undefined}
              >
                {scrolled ? (
                  <link.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                ) : (
                  link.label
                )}
              </Link>
            );
          })}
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            to="/components"
            className={`liquid-metal shrink-0 font-display tracking-[0.08em] transition-all duration-500 hover:shadow-[0_0_20px_var(--glow)] flex items-center justify-center ${scrolled
                ? 'w-8 h-8 rounded-full bg-white text-[var(--text)]'
                : 'text-[11px] px-3.5 sm:px-6 py-2 sm:py-2.5 text-[var(--text)]'
              }`}
            title={scrolled ? "Browse UI" : undefined}
          >
            {scrolled ? <ChevronRight size={16} strokeWidth={2.5} /> : <span className="hidden sm:inline">BROWSE UI</span>}
            {!scrolled && <span className="sm:hidden text-[10px]">BROWSE</span>}
          </Link>

          {/* Mobile burger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-neutral-800 hover:bg-black/5 active:scale-95 transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            <div className="w-4 h-3 flex flex-col justify-between items-center relative">
              <motion.span
                animate={mobileMenuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-current rounded-full origin-center"
              />
              <motion.span
                animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.15 }}
                className="w-4 h-0.5 bg-current rounded-full"
              />
              <motion.span
                animate={mobileMenuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-0.5 bg-current rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="fixed top-18 inset-x-4 z-50 bg-white/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl border border-black/10 md:hidden flex flex-col gap-1.5"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive ? 'bg-black/5 text-black font-semibold' : 'text-neutral-700 hover:bg-black/5'
                      }`}
                    >
                      <link.icon size={18} className="text-neutral-500" />
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 mt-1 border-t border-black/5">
                <Link
                  to="/components"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl bg-[#171717] text-white text-xs font-semibold tracking-wider uppercase"
                >
                  Browse 74 Components
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
