import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check, Zap, Users, TrendingUp, Star } from 'lucide-react';

/*
 * StackedDeckCarousel
 * Props:
 *   items: { id: string, title: string, subtitle: string, tag: string, stats: {icon: string, value: string}[], color: string }[]
 */

const promptContent = `stacked deck carousel — physical card stack with velocity-based throw, rotateZ flyoff animation, peek layers at 95%/90% scale, drag-swipeable with snap-back physics`;

const INDIGO = '#4F46E5';
const PERIWINKLE = '#A5B4FC';

const ICON_MAP = { Zap, Users, TrendingUp, Star };

const ITEMS = [
  {
    id: '1', title: 'Orbit Analytics', subtitle: 'Real-time insights for modern teams', tag: 'Analytics',
    stats: [{ icon: 'Zap', value: '4.2ms' }, { icon: 'Users', value: '12.4k' }, { icon: 'TrendingUp', value: '+38%' }],
    color: '#1a1060',
  },
  {
    id: '2', title: 'Nexus Infrastructure', subtitle: 'Scale without limits or complexity', tag: 'Infrastructure',
    stats: [{ icon: 'Zap', value: '99.99%' }, { icon: 'Users', value: '220+' }, { icon: 'Star', value: '4.9' }],
    color: '#0a1845',
  },
  {
    id: '3', title: 'Pulse Monitoring', subtitle: 'Stay ahead of every anomaly', tag: 'Observability',
    stats: [{ icon: 'Zap', value: '<1ms' }, { icon: 'TrendingUp', value: '-62%' }, { icon: 'Users', value: '8.1k' }],
    color: '#10104a',
  },
  {
    id: '4', title: 'Axiom Storage', subtitle: 'Cold to ultra-hot, seamless tiers', tag: 'Storage',
    stats: [{ icon: 'TrendingUp', value: '10×' }, { icon: 'Zap', value: '1PB+' }, { icon: 'Star', value: '5.0' }],
    color: '#0f0f2e',
  },
  {
    id: '5', title: 'Cipher Security', subtitle: 'Zero-trust by default, everywhere', tag: 'Security',
    stats: [{ icon: 'Users', value: '50M+' }, { icon: 'Zap', value: 'E2E' }, { icon: 'TrendingUp', value: '+99%' }],
    color: '#180820',
  },
];

// Geometric SVG pattern per card
function GeoPat({ color }) {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id={`geo-${color}`} x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
          <polygon points="30,4 56,18 56,42 30,56 4,42 4,18" fill="none" stroke={color} strokeWidth="0.6" opacity="0.3" />
          <circle cx="30" cy="30" r="3" fill={color} opacity="0.2" />
        </pattern>
      </defs>
      <rect width="300" height="300" fill={`url(#geo-${color})`} />
    </svg>
  );
}

export default function StackedDeckCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [deck, setDeck] = useState(ITEMS.map((_, i) => i)); // indices, deck[0] = top
  const [exiting, setExiting] = useState(null);
  const [entering, setEntering] = useState(null);
  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [-200, 0, 200], [-8, 0, 8]);
  const dragOpacity = useTransform(dragX, [-300, -100, 0, 100, 300], [0.3, 0.9, 1, 0.9, 0.3]);

  const throwCard = (direction = 'left') => {
    if (deck.length <= 1) return;
    const topIdx = deck[0];
    setExiting({ idx: topIdx, dir: direction });
    setTimeout(() => {
      setDeck(prev => {
        const newDeck = [...prev.slice(1), prev[0]];
        return newDeck;
      });
      setExiting(null);
    }, 420);
  };

  const pullBack = () => {
    if (deck.length <= 1) return;
    const bottomIdx = deck[deck.length - 1];
    setEntering(bottomIdx);
    setTimeout(() => {
      setDeck(prev => [prev[prev.length - 1], ...prev.slice(0, prev.length - 1)]);
      setEntering(null);
    }, 420);
  };

  const handleDragEnd = (_, info) => {
    const vx = info.velocity.x;
    const ox = info.offset.x;
    if (vx < -400 || ox < -80) throwCard('left');
    else if (vx > 400 || ox > 80) throwCard('right');
    dragX.set(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const visibleStack = deck.slice(0, 3);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-16 gap-8"
        style={{ background: '#0A0E1A', minHeight: 560 }}
        aria-label="Stacked Deck Carousel"
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 40%, ${INDIGO}1a 0%, transparent 65%)`
        }} />

        {/* Stack */}
        <div className="relative" style={{ width: 320, height: 320 }}>
          {visibleStack.slice().reverse().map((itemIdx, revI) => {
            const stackPos = visibleStack.length - 1 - revI; // 0=top, 1=second, 2=third
            const item = ITEMS[itemIdx];
            const isTop = stackPos === 0;
            const yOffset = stackPos * 8;
            const scale = stackPos === 0 ? 1 : stackPos === 1 ? 0.95 : 0.9;
            const brightness = stackPos === 0 ? 1 : stackPos === 1 ? 0.7 : 0.5;
            const isExiting = exiting && exiting.idx === itemIdx;

            return (
              <motion.div
                key={item.id}
                drag={isTop ? 'x' : false}
                dragElastic={0.08}
                onDragEnd={handleDragEnd}
                style={{
                  x: isTop ? dragX : 0,
                  rotate: isTop ? dragRotate : 0,
                  opacity: isExiting ? dragOpacity : brightness,
                  position: 'absolute', top: 0, left: 0,
                  width: 320, height: 320,
                  cursor: isTop ? 'grab' : 'default',
                  zIndex: 10 - stackPos,
                }}
                animate={isExiting
                  ? { x: exiting.dir === 'left' ? -800 : 800, rotate: exiting.dir === 'left' ? -20 : 20, opacity: 0 }
                  : { y: yOffset, scale, opacity: brightness }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                className="rounded-[22px] overflow-hidden"
                aria-label={item.title}
              >
                {/* Background pattern */}
                <div className="absolute inset-0" style={{ background: item.color }}>
                  <GeoPat color={PERIWINKLE} />
                </div>

                {/* Tag chip */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: `${INDIGO}55`, color: PERIWINKLE, border: `1px solid ${INDIGO}77` }}>
                    {item.tag}
                  </span>
                </div>

                {/* Bottom content */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-3"
                  style={{ background: 'linear-gradient(0deg, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.4) 100%)' }}>
                  <div>
                    <h3 className="font-black text-white text-[20px] leading-tight tracking-tight">{item.title}</h3>
                    <p style={{ color: PERIWINKLE + '99' }} className="text-[12px] mt-0.5">{item.subtitle}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    {item.stats.map((s, si) => {
                      const IconComp = ICON_MAP[s.icon] || Zap;
                      return (
                        <div key={si} className="flex items-center gap-1.5">
                          <IconComp size={11} style={{ color: INDIGO }} />
                          <span className="text-[12px] font-bold" style={{ color: PERIWINKLE }}>{s.value}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3 z-20 relative">
          <button
            onClick={() => pullBack()}
            className="px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all border"
            style={{ borderColor: `${INDIGO}55`, color: PERIWINKLE, background: `${INDIGO}11` }}
            aria-label="Previous card"
          >
            ← Prev
          </button>
          <button
            onClick={() => throwCard('left')}
            className="px-6 py-2.5 rounded-xl text-[12px] font-bold transition-all"
            style={{ background: INDIGO, color: 'white', boxShadow: `0 4px 24px ${INDIGO}55` }}
            aria-label="Swipe to reveal next"
          >
            Swipe to Reveal
          </button>
          <button
            onClick={() => throwCard('right')}
            className="px-4 py-2.5 rounded-xl text-[12px] font-semibold transition-all border"
            style={{ borderColor: `${INDIGO}55`, color: PERIWINKLE, background: `${INDIGO}11` }}
            aria-label="Next card"
          >
            Next →
          </button>
        </div>

        {/* Deck indicator */}
        <div className="flex gap-1.5 z-20">
          {ITEMS.map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full transition-all"
              style={{ background: deck[0] === i ? INDIGO : 'rgba(255,255,255,0.15)' }} />
          ))}
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Stacked Deck
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
