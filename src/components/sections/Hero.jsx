import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PLACEHOLDERS = [
  'buttons',
  'bento grids',
  'cards',
  'navbars',
  'modals',
  'sidebars',
  'carousels',
];

export function Hero() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col bg-[var(--bg)]">

      <div className="flex-1 flex flex-col lg:flex-row items-stretch w-full">
        
        {/* ─── LEFT COLUMN ─── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 lg:py-0 lg:max-w-[50%] relative">
          
          {/* Vertical divider */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-px bg-black/[0.06]" />

          {/* Heading — Clean, simple fade up */}
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.2rem,4.8vw,3.8rem)] leading-[1.2] tracking-[0.04em] text-[var(--text)] mb-6"
          >
            Design, from<br />
            a sentence.
          </motion.h1>

          {/* Subtitle — Clean fade up */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16px] text-[var(--text-2)] font-serif italic leading-relaxed max-w-sm mb-10"
          >
            Generate clean, production-ready UI components instantly.
          </motion.p>

          {/* Search bar — liquid metal border with rolling placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 max-w-md"
          >
            <div className="liquid-metal">
              <div className="relative flex items-center h-14 px-4 gap-3 bg-white rounded-[5px]">
                <Search size={18} className="text-[var(--text-3)] flex-shrink-0" strokeWidth={1.5} />
                
                <div className="relative flex-1 h-full flex items-center overflow-hidden">
                  {!search && (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={placeholderIndex}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 0.35, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-0 text-sm text-[var(--text)] font-sans pointer-events-none select-none"
                      >
                        {PLACEHOLDERS[placeholderIndex]}
                      </motion.span>
                    </AnimatePresence>
                  )}
                  <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full h-full bg-transparent border-none outline-none text-sm text-[var(--text)] font-sans relative z-10"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA — Browse Components with liquid metal border */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <button 
              onClick={() => navigate('/components')}
              className="liquid-metal inline-flex items-center justify-center px-8 py-3.5 text-[12px] font-display tracking-[0.1em] text-[var(--text)] bg-white cursor-pointer hover:shadow-[0_0_24px_var(--glow)] transition-shadow duration-500"
            >
              BROWSE COMPONENTS
            </button>
          </motion.div>

        </div>

        {/* ─── RIGHT COLUMN — VIDEO ─── */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex-1 relative flex items-center justify-center overflow-hidden bg-[var(--surface)]"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            src="/ascii-art.mp4"
            className="w-full h-full object-cover"
          />

          {/* Corner accents */}
          <svg className="absolute top-6 left-6 w-10 h-10 pointer-events-none opacity-25" fill="none" viewBox="0 0 40 40">
            <path d="M0 40 L0 10 L10 0 L40 0" stroke="var(--text)" strokeWidth="0.5" fill="none" />
          </svg>
          <svg className="absolute bottom-6 right-6 w-10 h-10 pointer-events-none opacity-25" fill="none" viewBox="0 0 40 40">
            <path d="M40 0 L40 30 L30 40 L0 40" stroke="var(--text)" strokeWidth="0.5" fill="none" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
