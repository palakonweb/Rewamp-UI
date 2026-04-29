import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * HorizontalTickerCarousel
 * Props:
 *   items: { id: string, glyph: string, title: string, descriptor: string, accentColor: string }[]
 *   speed?: number  (pixels per second, default 40)
 */

const promptContent = `infinite horizontal ticker carousel — continuous auto-scroll with hover-pause, neon lime glow on hover, Framer Motion velocity-based speed control, portrait card design`;

const LIME = '#AAFF00';
const CONCRETE = '#1A1A1A';

const ITEMS = [
  { id: '1', glyph: '⚡', title: 'Lightning Deploy', descriptor: 'Ship in seconds, not hours', accentColor: '#AAFF00' },
  { id: '2', glyph: '🔮', title: 'AI Inference', descriptor: 'Real-time model serving', accentColor: '#FFFF00' },
  { id: '3', glyph: '🌊', title: 'Stream Processing', descriptor: 'Handle millions of events', accentColor: '#AAFF00' },
  { id: '4', glyph: '🛡️', title: 'Zero Trust', descriptor: 'Security at every layer', accentColor: '#FFFF00' },
  { id: '5', glyph: '📡', title: 'Edge Network', descriptor: 'Global low-latency reach', accentColor: '#AAFF00' },
  { id: '6', glyph: '🧠', title: 'Neural Ops', descriptor: 'Self-healing infrastructure', accentColor: '#FFFF00' },
  { id: '7', glyph: '♾️', title: 'Infinite Scale', descriptor: 'No limits, ever', accentColor: '#AAFF00' },
  { id: '8', glyph: '🔥', title: 'Hot Reload', descriptor: 'Zero-downtime updates', accentColor: '#FFFF00' },
];

const CARD_W = 200;
const CARD_H = 300;
const GAP = 16;
const CARD_STEP = CARD_W + GAP;

// Triple items for seamless loop
const TRIPLED = [...ITEMS, ...ITEMS, ...ITEMS];

export default function HorizontalTickerCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);
  const speed = 40; // px/s

  const xRef = useRef(0);
  const xMotion = useMotionValue(0);
  const loopWidth = ITEMS.length * CARD_STEP;

  useAnimationFrame((_, delta) => {
    if (paused) return;
    xRef.current -= (speed * delta) / 1000;
    if (xRef.current <= -loopWidth) {
      xRef.current += loopWidth;
    }
    xMotion.set(xRef.current);
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-14"
        style={{ background: '#000000', minHeight: 440 }}
        aria-label="Horizontal Ticker Carousel"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setHoveredId(null); }}
      >
        {/* Fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(90deg, #000 0%, transparent 100%)' }} />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(270deg, #000 0%, transparent 100%)' }} />

        {/* Label */}
        <div className="absolute top-5 left-6 z-20">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full"
            style={{ background: `${LIME}18`, color: LIME, border: `1px solid ${LIME}33` }}>
            {paused ? '⏸ Paused' : '▶ Live Feed'}
          </span>
        </div>

        {/* Ticker track */}
        <div className="w-full overflow-visible" style={{ height: CARD_H }}>
          <motion.div
            style={{ x: xMotion, display: 'flex', gap: GAP, alignItems: 'center', paddingLeft: GAP }}
          >
            {TRIPLED.map((item, i) => {
              const isHovered = hoveredId === `${item.id}-${i}`;
              const cardBg = i % 2 === 0 ? CONCRETE : '#000';
              return (
                <motion.div
                  key={`${item.id}-${i}`}
                  onMouseEnter={() => setHoveredId(`${item.id}-${i}`)}
                  onMouseLeave={() => setHoveredId(null)}
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered ? `0 0 32px 4px ${LIME}55, 0 0 0 1.5px ${LIME}` : '0 0 0 1px rgba(255,255,255,0.06)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{
                    width: CARD_W, height: CARD_H,
                    background: cardBg,
                    borderRadius: 16,
                    flexShrink: 0,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  aria-label={item.title}
                >
                  {/* Top glyph half */}
                  <div className="absolute top-0 left-0 right-0 flex items-center justify-center"
                    style={{ height: '50%', background: `${item.accentColor}14`, borderBottom: `1px solid ${item.accentColor}22` }}>
                    <motion.span
                      animate={{ scale: isHovered ? 1.15 : 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      style={{ fontSize: 52, lineHeight: 1 }}
                    >
                      {item.glyph}
                    </motion.span>
                  </div>

                  {/* Bottom text half */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col justify-between"
                    style={{ height: '50%' }}>
                    <div>
                      <h4 className="font-bold text-white text-[14px] leading-tight line-clamp-2">{item.title}</h4>
                      <p className="text-[11px] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{item.descriptor}</p>
                    </div>
                    {/* Arrow icon bottom-right */}
                    <div className="flex justify-end">
                      <motion.div
                        animate={{ x: isHovered ? 3 : 0, opacity: isHovered ? 1 : 0.4 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                          <path d="M3 9h12M10 4l5 5-5 5" stroke={LIME} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Ticker Feed
        </span>
      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 overflow-hidden">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
          <code className="text-[13px] text-black/80 dark:text-white/80 font-mono">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
