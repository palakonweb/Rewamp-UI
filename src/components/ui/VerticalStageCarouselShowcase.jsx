import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * VerticalStageCarousel
 * Props:
 *   items: { id: string, headline: string, body: string, shape: 'blob'|'polygon'|'spiral'|'ring' }[]
 */

const promptContent = `vertical stage carousel — cards slide up/down on scroll/swipe, partial peek cards above & below, spring physics Y-axis, rose quartz SVG shapes, vertical dot rail navigation`;

const ROSE = '#FF6B9D';
const BLUSH = '#FFB3CC';

const ITEMS = [
  {
    id: '1', headline: 'Design without compromise.', body: 'Every pixel is intentional. Every interaction is crafted to delight.',
    shape: 'blob', bg: '#141414',
  },
  {
    id: '2', headline: 'Motion is the medium.', body: 'Animation adds meaning. Motion creates emotion. Stillness is just waiting.',
    shape: 'polygon', bg: '#1A0A0F',
  },
  {
    id: '3', headline: 'Simplicity scales.', body: 'The hardest problems have the simplest solutions — if you know where to look.',
    shape: 'spiral', bg: '#141414',
  },
  {
    id: '4', headline: 'Systems over features.', body: 'A good design system compounds. Every component makes the next one easier.',
    shape: 'ring', bg: '#1A0A0F',
  },
];

// Abstract SVG shapes
function ShapeBlob({ color }) {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <path d="M80 20C100 20 130 35 135 60C140 85 120 115 95 125C70 135 40 120 30 95C20 70 35 30 60 22C68 19 72 20 80 20Z"
        fill={`${color}22`} stroke={color} strokeWidth="1.2" />
      <circle cx="80" cy="80" r="20" fill={`${color}18`} stroke={color} strokeWidth="0.8" />
    </svg>
  );
}

function ShapePolygon({ color }) {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <polygon points="80,15 140,50 140,110 80,145 20,110 20,50" fill={`${color}15`} stroke={color} strokeWidth="1.2" />
      <polygon points="80,40 115,60 115,100 80,120 45,100 45,60" fill={`${color}10`} stroke={color} strokeWidth="0.8" />
      <circle cx="80" cy="80" r="10" fill={color} opacity="0.3" />
    </svg>
  );
}

function ShapeSpiral({ color }) {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      {[60, 45, 30, 18, 9].map((r, i) => (
        <circle key={i} cx="80" cy="80" r={r} fill="none" stroke={color} strokeWidth="1"
          strokeDasharray={`${r * 0.8} ${r * 0.4}`} opacity={0.15 + i * 0.12} />
      ))}
      <circle cx="80" cy="80" r="5" fill={color} opacity="0.5" />
    </svg>
  );
}

function ShapeRing({ color }) {
  return (
    <svg width="160" height="160" viewBox="0 0 160 160" fill="none" aria-hidden="true">
      <circle cx="80" cy="80" r="60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.2" />
      <circle cx="80" cy="80" r="45" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <circle cx="80" cy="80" r="28" fill={`${color}14`} stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="80" cy="80" r="8" fill={color} opacity="0.4" />
    </svg>
  );
}

const SHAPES = { blob: ShapeBlob, polygon: ShapePolygon, spiral: ShapeSpiral, ring: ShapeRing };

export default function VerticalStageCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(1);
  const containerRef = useRef(null);
  const touchStartY = useRef(null);

  const goTo = useCallback((idx) => {
    setActive(Math.max(0, Math.min(ITEMS.length - 1, idx)));
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 30) goTo(active + 1);
      else if (e.deltaY < -30) goTo(active - 1);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [active, goTo]);

  const onTouchStart = (e) => { touchStartY.current = e.touches[0].clientY; };
  const onTouchEnd = (e) => {
    if (touchStartY.current === null) return;
    const diff = touchStartY.current - e.changedTouches[0].clientY;
    if (diff > 50) goTo(active + 1);
    else if (diff < -50) goTo(active - 1);
    touchStartY.current = null;
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowDown') goTo(active + 1);
      if (e.key === 'ArrowUp') goTo(active - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const CARD_H = 200;
  const PEEK = 60;

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center"
        style={{ background: '#141414', minHeight: 500 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-label="Vertical Stage Carousel"
        tabIndex={0}
      >
        {/* Peek fades */}
        <div className="absolute inset-x-0 top-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, #141414 0%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(0deg, #141414 0%, transparent 100%)' }} />

        {/* Stage */}
        <div className="relative overflow-hidden" style={{ width: '100%', height: CARD_H + PEEK * 2 }}>
          {ITEMS.map((item, i) => {
            const diff = i - active;
            const isActive = diff === 0;
            const isPeek = Math.abs(diff) === 1;
            const ShapeComp = SHAPES[item.shape] || ShapeBlob;

            return (
              <motion.div
                key={item.id}
                onClick={() => goTo(i)}
                animate={{
                  y: diff * (CARD_H + 16),
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : isPeek ? 0.4 : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(3px)',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  right: 0,
                  height: CARD_H,
                  marginTop: -CARD_H / 2,
                  background: item.bg,
                  borderRadius: 18,
                  overflow: 'hidden',
                  cursor: isActive ? 'default' : 'pointer',
                  border: isActive ? `1px solid ${ROSE}33` : '1px solid rgba(255,255,255,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                }}
                aria-label={item.headline}
                role="button"
                tabIndex={isActive ? 0 : -1}
              >
                {/* Left text (60%) */}
                <div className="flex-1 px-8 py-6 flex flex-col justify-center gap-3">
                  <h3 className="font-black text-white leading-tight tracking-tight" style={{ fontSize: 24 }}>
                    {item.headline}
                  </h3>
                  <p className="text-[13px] leading-relaxed" style={{ color: `${BLUSH}80` }}>
                    {item.body}
                  </p>
                </div>

                {/* Right shape (40%) */}
                <div className="flex items-center justify-center" style={{ width: '40%' }}>
                  <ShapeComp color={ROSE} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vertical dot rail — right edge */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20" aria-label="Slide indicators">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? 'true' : 'false'}
              className="flex items-center justify-center"
              style={{ height: 4 }}
            >
              <motion.div
                animate={{
                  width: i === active ? 28 : 10,
                  background: i === active ? ROSE : 'rgba(255,255,255,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{ height: 3, borderRadius: 9999 }}
              />
            </button>
          ))}
        </div>

        <span className="absolute bottom-5 right-12 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Vertical Stage
        </span>
      </div>
</div>
  );
}
