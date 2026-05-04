import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { LayoutTemplate, Sparkles, PlayCircle, FileText, ChevronRight } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Components', href: '/components', icon: LayoutTemplate },
    { label: 'Bento', href: '/#bento', icon: Sparkles },
    { label: 'Live Demo', href: '/#live-demo', icon: PlayCircle },
    { label: 'Docs', href: '/documentation', icon: FileText },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
      <motion.nav
        layout
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`flex items-center justify-between transition-colors duration-500 ${
          scrolled
            ? 'mt-4 px-4 h-12 rounded-full bg-white/80 backdrop-blur-2xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.6)]'
            : 'mt-0 px-4 md:px-8 lg:px-12 h-16 w-full max-w-[1400px] bg-white border-b border-black/[0.06]'
        }`}
        style={{
          width: scrolled ? 'auto' : '100%',
          maxWidth: scrolled ? '500px' : '1400px',
          borderRadius: scrolled ? '9999px' : '0px',
        }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 pr-4">
          <img 
            src="/logo.png" 
            alt="Conjure UI Logo" 
            className={`transition-all duration-500 w-auto ${scrolled ? 'h-10' : 'h-14'}`} 
          />
          <AnimatePresence>
            {!scrolled && (
              <motion.span 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="font-display tracking-[0.12em] text-[var(--text)] text-[11px] whitespace-nowrap overflow-hidden"
              >
                CONJURE UI
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        {/* Center links */}
        <div className={`hidden md:flex items-center transition-all duration-500 ${
          scrolled ? 'gap-2 mx-2' : 'gap-8'
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href || (location.pathname === '/' && location.hash === link.href.split('/')[1]);
            return (
              <Link
                key={link.label}
                to={link.href}
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  scrolled 
                    ? 'w-8 h-8 rounded-full hover:bg-black/5' 
                    : 'text-[13px] hover:text-[var(--text)]'
                } ${
                  isActive 
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

        {/* Right CTA */}
        <Link
          to="/components"
          className={`liquid-metal shrink-0 font-display tracking-[0.08em] transition-all duration-500 hover:shadow-[0_0_20px_var(--glow)] flex items-center justify-center ${
            scrolled 
              ? 'w-8 h-8 rounded-full bg-white text-[var(--text)] ml-4' 
              : 'text-[11px] px-6 py-2.5 text-[var(--text)]'
          }`}
          title={scrolled ? "Browse UI" : undefined}
        >
          {scrolled ? <ChevronRight size={16} strokeWidth={2.5} /> : "BROWSE UI"}
        </Link>
      </motion.nav>
    </div>
  );
}
