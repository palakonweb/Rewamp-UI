import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, Zap, Globe, Shield, Database, Cpu, Star } from 'lucide-react';

/*
 * ParallaxDepthCarousel
 * Props:
 *   items: { id: string, icon: string, title: string, subtitle: string, accentColor: string }[]
 * Interaction: Cards move at different speeds during drag (parallax depth).
 *   Internal card elements have mousemove parallax at different depths.
 */

const promptContent = `parallax depth carousel — multi-layer drag parallax (1x/0.7x/0.4x speeds), internal card element parallax on mousemove, electric blue accent, storm grey depth layers`;

const BLUE = '#0EA5E9';
const SKY = '#BAE6FD';
const STORM = '#0D0D0F';

const ICON_MAP = { Zap, Globe, Shield, Database, Cpu, Star };

const ITEMS = [
  { id: '1', icon: 'Cpu', title: 'Neural Processing', subtitle: 'AI inference at the edge', accentColor: '#0EA5E9', bg: '#080e14' },
  { id: '2', icon: 'Globe', title: 'Global Mesh', subtitle: 'Connected everywhere', accentColor: '#38bdf8', bg: '#081014' },
  { id: '3', icon: 'Shield', title: 'Secure Layer', subtitle: 'Zero-trust by design', accentColor: '#0284c7', bg: '#060a10' },
  { id: '4', icon: 'Database', title: 'Data Fabric', subtitle: 'Unified storage strategy', accentColor: '#0ea5e9', bg: '#080d12' },
  { id: '5', icon: 'Zap', title: 'Event Stream', subtitle: 'Real-time at any scale', accentColor: '#7dd3fc', bg: '#07101a' },
];

const CARD_W = 320;
const CARD_H = 400;
const GAP = 32;

function InternalParallaxCard({ item, isCenter, isLeft, isRight }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const IconComp = ICON_MAP[item.icon] || Zap;

  // Different layers move at different speeds
  const bgX = useSpring(useTransform(mouseX, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });
  const bgY = useSpring(useTransform(mouseY, [-1, 1], [-12, 12]), { stiffness: 80, damping: 20 });
  const midX = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), { stiffness: 100, damping: 18 });
  const midY = useSpring(useTransform(mouseY, [-1, 1], [-6, 6]), { stiffness: 100, damping: 18 });
  const fgX = useSpring(useTransform(mouseX, [-1, 1], [-3, 3]), { stiffness: 120, damping: 16 });
  const fgY = useSpring(useTransform(mouseY, [-1, 1], [-3, 3]), { stiffness: 120, damping: 16 });

  const handleMouseMove = (e) => {
    if (!isCenter) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0); mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ width: CARD_W, height: CARD_H, position: 'relative', overflow: 'hidden', borderRadius: 22, background: item.bg }}
    >
      {/* Layer 1 — Background shape (deepest parallax) */}
      <motion.div
        style={{ x: bgX, y: bgY, position: 'absolute', inset: -24, pointerEvents: 'none' }}
      >
        <div className="absolute" style={{
          width: 280, height: 280,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${item.accentColor}18 0%, transparent 70%)`,
          top: '5%', right: -40,
        }} />
        <svg width="200" height="200" className="absolute" style={{ top: '10%', right: 0, opacity: 0.15 }} aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="none" stroke={item.accentColor} strokeWidth="1" strokeDasharray="6 12" />
          <circle cx="100" cy="100" r="55" fill="none" stroke={item.accentColor} strokeWidth="0.6" strokeDasharray="3 8" />
        </svg>
      </motion.div>

      {/* Layer 2 — Mid elements */}
      <motion.div style={{ x: midX, y: midY, position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', bottom: -20, left: -20,
          width: 200, height: 200, borderRadius: '50%',
          background: `${item.accentColor}08`,
          border: `1px solid ${item.accentColor}22`,
        }} />
      </motion.div>

      {/* Layer 3 — Foreground content */}
      <motion.div
        style={{ x: fgX, y: fgY, position: 'absolute', inset: 0, padding: 28 }}
        className="flex flex-col justify-between"
      >
        {/* Top: icon + label */}
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-2xl flex items-center justify-center"
            style={{ background: `${item.accentColor}1a`, border: `1px solid ${item.accentColor}44`, boxShadow: `0 0 20px ${item.accentColor}22` }}
          >
            <IconComp size={20} style={{ color: item.accentColor }} />
          </div>
          <div
            className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest"
            style={{ background: `${item.accentColor}14`, border: `1px solid ${item.accentColor}33`, color: item.accentColor }}
          >
            Active
          </div>
        </div>

        {/* Center: large title */}
        <div>
          <h3 className="font-black text-white leading-tight tracking-tight" style={{ fontSize: 30 }}>
            {item.title}
          </h3>
          <p className="mt-2 text-[13px]" style={{ color: `${SKY}66` }}>{item.subtitle}</p>
        </div>

        {/* Bottom: metric bar */}
        <div className="flex flex-col gap-2">
          {['Performance', 'Reliability', 'Efficiency'].map((label, i) => {
            const vals = [92, 99, 87];
            return (
              <div key={label} className="flex items-center gap-3">
                <span className="text-[10px] w-20 shrink-0" style={{ color: `${SKY}55` }}>{label}</span>
                <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${vals[i]}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                    style={{ background: item.accentColor }}
                  />
                </div>
                <span className="text-[10px] font-bold tabular-nums" style={{ color: item.accentColor }}>{vals[i]}%</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Top sheen */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${item.accentColor}55, transparent)` }} />
    </div>
  );
}

export default function ParallaxDepthCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(2);
  const [dragging, setDragging] = useState(false);
  const dragX = useMotionValue(0);
  const n = ITEMS.length;

  const goTo = useCallback((idx) => {
    setActive(((idx % n) + n) % n);
    dragX.set(0);
  }, [n]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(active - 1);
      if (e.key === 'ArrowRight') goTo(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  const handleDragEnd = (_, info) => {
    setDragging(false);
    if (info.velocity.x < -300 || info.offset.x < -60) goTo(active + 1);
    else if (info.velocity.x > 300 || info.offset.x > 60) goTo(active - 1);
    dragX.set(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // For each card position relative to active, compute parallax-adjusted x
  const getCardProps = (i) => {
    const diff = i - active;
    const absDiff = Math.abs(diff);
    if (absDiff > 1) return null;

    // Parallax multiplier by depth
    const multipliers = [1, 0.7, 0.4]; // center, adjacent, far (only 3 visible)
    const mult = absDiff === 0 ? multipliers[0] : multipliers[1];

    const baseX = diff * (CARD_W + GAP);
    const scale = absDiff === 0 ? 1 : 0.82;
    const opacity = absDiff === 0 ? 1 : 0.45;
    const zIndex = absDiff === 0 ? 10 : 5;

    return { baseX, scale, opacity, zIndex, mult, isCenter: diff === 0, isLeft: diff < 0, isRight: diff > 0 };
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-12 gap-8"
        style={{ background: STORM, minHeight: 560, perspective: 1000 }}
        aria-label="Parallax Depth Carousel"
      >
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{
          backgroundImage: `linear-gradient(${BLUE}33 1px, transparent 1px), linear-gradient(90deg, ${BLUE}33 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }} />

        {/* Cards stage */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.06}
          onDragStart={() => setDragging(true)}
          onDragEnd={handleDragEnd}
          style={{ x: dragX, display: 'flex', alignItems: 'center', position: 'relative', height: CARD_H, width: CARD_W + (CARD_W + GAP) * 2 }}
          aria-label="Drag to advance"
        >
          {ITEMS.map((item, i) => {
            const p = getCardProps(i);
            if (!p) return null;

            return (
              <motion.div
                key={item.id}
                animate={{
                  x: p.baseX,
                  scale: p.scale,
                  opacity: p.opacity,
                  zIndex: p.zIndex,
                }}
                transition={{ type: 'spring', stiffness: 220, damping: 28 }}
                onClick={() => !dragging && goTo(i)}
                style={{
                  position: 'absolute',
                  left: '50%',
                  marginLeft: -CARD_W / 2,
                  top: 0,
                  cursor: p.isCenter ? 'grab' : 'pointer',
                  boxShadow: p.isCenter ? `0 0 60px ${item.accentColor}22, 0 20px 60px rgba(0,0,0,0.5)` : 'none',
                  border: p.isCenter ? `1px solid ${item.accentColor}33` : '1px solid rgba(255,255,255,0.04)',
                  borderRadius: 22,
                  overflow: 'hidden',
                }}
              >
                <InternalParallaxCard item={item} isCenter={p.isCenter} isLeft={p.isLeft} isRight={p.isRight} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-4 z-20">
          <button onClick={() => goTo(active - 1)} aria-label="Previous card"
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:opacity-100 opacity-60"
            style={{ border: `1px solid ${BLUE}44`, background: `${BLUE}0a`, color: BLUE }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          <div className="flex gap-2">
            {ITEMS.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Go to slide ${i + 1}`}>
                <motion.div
                  animate={{ width: i === active ? 18 : 5, background: i === active ? BLUE : 'rgba(255,255,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  style={{ height: 5, borderRadius: 9999 }}
                />
              </button>
            ))}
          </div>

          <button onClick={() => goTo(active + 1)} aria-label="Next card"
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:opacity-100 opacity-60"
            style={{ border: `1px solid ${BLUE}44`, background: `${BLUE}0a`, color: BLUE }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Parallax Depth
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
