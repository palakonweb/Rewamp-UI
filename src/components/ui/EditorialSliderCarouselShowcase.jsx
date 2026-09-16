import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * EditorialSliderCarousel
 * Props:
 *   items: { id: string, headline: string, description: string, label: string, accentColor: string }[]
 * Note: Light-mode luxury editorial aesthetic
 */

const promptContent = `editorial slider carousel — luxury magazine wipe transition with cubic bezier ease, ink curtain sweep, progress bar depletion, editorial red label rotated -90deg, serif high-contrast headline`;

const RED = '#E63946';
const INK = '#0F0F0F';
const SAND = '#C9A87C';
const OFFWHITE = '#F5F0E8';

const ITEMS = [
  {
    id: '1',
    headline: 'The Future\nof Interface',
    description: 'Where digital meets desire. A complete rethinking of what software can feel like.',
    label: 'Interaction',
    accentColor: '#1a1a2e',
  },
  {
    id: '2',
    headline: 'Motion\nAs Language',
    description: 'Every transition tells a story. Animation isn\'t decoration — it\'s communication.',
    label: 'Motion',
    accentColor: '#1e1a10',
  },
  {
    id: '3',
    headline: 'Precision\nAt Scale',
    description: 'Systems designed for a hundred users work for a hundred million. No compromises.',
    label: 'Engineering',
    accentColor: '#111820',
  },
  {
    id: '4',
    headline: 'Luxury\nBy Default',
    description: 'Premium doesn\'t need to be complicated. The best experiences feel effortless.',
    label: 'Design',
    accentColor: '#1a1010',
  },
];

const WIPE_EASE = [0.76, 0, 0.24, 1];
const AUTO_ADVANCE = 5000;

export default function EditorialSliderCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [progress, setProgress] = useState(0);
  const [wiping, setWiping] = useState(false);
  const [hovered, setHovered] = useState(false);
  const progressRef = useRef(null);
  const startRef = useRef(null);

  const n = ITEMS.length;

  const goTo = (idx) => {
    if (wiping) return;
    setPrev(current);
    setCurrent(((idx % n) + n) % n);
    setWiping(true);
    setProgress(0);
    startRef.current = null;
    setTimeout(() => { setPrev(null); setWiping(false); }, 900);
  };

  // Progress animation
  useEffect(() => {
    if (wiping || hovered) { setProgress(0); startRef.current = null; return; }
    let rafId;
    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const p = Math.min(elapsed / AUTO_ADVANCE, 1);
      setProgress(p);
      if (p >= 1) { goTo(current + 1); }
      else { rafId = requestAnimationFrame(tick); }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [current, wiping, hovered]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const item = ITEMS[current];
  const prevItem = prev !== null ? ITEMS[prev] : null;

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden"
        style={{ background: OFFWHITE, minHeight: 460 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Editorial Slider Carousel"
      >
        {/* Card content — lives underneath the curtain */}
        <div className="relative w-full flex" style={{ minHeight: 460 }}>
          {/* Left editorial text — 55% */}
          <div className="flex flex-col justify-center px-10 py-12 gap-5" style={{ width: '55%' }}>
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-px w-8" style={{ background: RED }} />
              <span className="text-[10px] font-black uppercase tracking-[0.22em]" style={{ color: RED }}>
                {item.label}
              </span>
            </div>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h2
                key={`h-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: WIPE_EASE, delay: 0.4 }}
                className="font-black leading-[1.0] tracking-tighter"
                style={{
                  fontSize: 52,
                  color: INK,
                  whiteSpace: 'pre-line',
                  fontFamily: 'Georgia, serif',
                }}
              >
                {item.headline}
              </motion.h2>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={`d-${current}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: WIPE_EASE, delay: 0.55 }}
                className="text-[13px] leading-relaxed"
                style={{ color: `${INK}99`, maxWidth: 320 }}
              >
                {item.description}
              </motion.p>
            </AnimatePresence>

            {/* Explore link */}
            <motion.a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="group w-fit flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider"
              style={{ color: INK }}
              whileHover="hover"
            >
              Explore
              <motion.span
                className="h-px bg-current origin-left"
                style={{ width: 24 }}
                variants={{ hover: { width: 48 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </div>

          {/* Right photo placeholder — 45% */}
          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`photo-${current}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                style={{ background: item.accentColor }}
              />
            </AnimatePresence>

            {/* Label rotated -90° along right edge */}
            <div
              className="absolute right-0 top-1/2 z-10 flex items-center justify-center px-3 py-2"
              style={{
                transform: 'translateX(50%) translateY(-50%) rotate(-90deg)',
                background: RED,
                transformOrigin: 'center',
                whiteSpace: 'nowrap',
              }}
            >
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                {item.label}
              </span>
            </div>

            {/* Subtle grain */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }} />
          </div>
        </div>

        {/* INK CURTAIN WIPE — sweeps right to left */}
        <AnimatePresence>
          {wiping && (
            <motion.div
              className="absolute inset-0 z-20 pointer-events-none"
              initial={{ x: '0%' }}
              animate={{ x: '-100%' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.72, ease: WIPE_EASE }}
              style={{ background: INK }}
            />
          )}
        </AnimatePresence>

        {/* Bottom navigation bar */}
        <div className="absolute bottom-0 inset-x-0 px-10 py-6 flex items-end justify-between z-10">
          {/* Current number */}
          <div className="flex items-center gap-4">
            <span className="font-black leading-none" style={{ fontSize: 40, color: `${INK}15`, fontVariantNumeric: 'tabular-nums' }}>
              {String(current + 1).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {ITEMS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className="transition-all"
                  style={{
                    width: i === current ? 20 : 8,
                    height: 3,
                    borderRadius: 9999,
                    background: i === current ? RED : `${INK}30`,
                    transition: 'width 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3">
            <button onClick={() => goTo(current - 1)} aria-label="Previous slide"
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:bg-black/5"
              style={{ borderColor: `${INK}20` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <div className="w-24 h-px overflow-hidden" style={{ background: `${INK}15` }}>
              <motion.div
                className="h-full origin-left"
                style={{ background: RED }}
                animate={{ scaleX: progress }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>
            <button onClick={() => goTo(current + 1)} aria-label="Next slide"
              className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:bg-black/5"
              style={{ borderColor: `${INK}20` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
</div>
  );
}
