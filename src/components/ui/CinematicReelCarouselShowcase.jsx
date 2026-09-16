import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, animate } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * CinematicReelCarousel
 * Props:
 *   items: { id: string, title: string, category: string, number: string, bgColor: string }[]
 *   autoPlay?: boolean
 */

const promptContent = `cinematic reel carousel — center-focused 3D fan with rotateY perspective, drag momentum snap, golden hour accent glow on active card, staggered mount, wide 16:9 cinematic cards`;

const ITEMS = [
  { id: '1', title: 'The Architecture of Light', category: 'Visual Arts', number: '01', bgColor: '#1a0f00' },
  { id: '2', title: 'Shadows in Motion', category: 'Cinematography', number: '02', bgColor: '#0a0a1a' },
  { id: '3', title: 'Echoes of Tomorrow', category: 'Concept Design', number: '03', bgColor: '#0f1a0a' },
  { id: '4', title: 'Neon Horizons', category: 'Digital Art', number: '04', bgColor: '#1a0a0f' },
  { id: '5', title: 'The Silent Machine', category: 'Industrial', number: '05', bgColor: '#0f0f0f' },
];

const GOLD = '#F5A623';
const CARD_W = 560;
const CARD_H = 315; // 16:9

export default function CinematicReelCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(2);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const containerRef = useRef(null);

  const n = ITEMS.length;

  const goTo = useCallback((idx) => {
    setActive(((idx % n) + n) % n);
  }, [n]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goTo(active - 1);
      if (e.key === 'ArrowRight') goTo(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, goTo]);

  const getProps = (i) => {
    const diff = i - active;
    const absDiff = Math.abs(diff);
    if (absDiff > 2) return null;
    const rotateY = diff * 30;
    const scale = absDiff === 0 ? 1 : absDiff === 1 ? 0.85 : 0.72;
    const x = diff * (CARD_W * 0.55);
    const z = absDiff === 0 ? 0 : -120 * absDiff;
    const brightness = absDiff === 0 ? 1 : absDiff === 1 ? 0.55 : 0.3;
    const zIndex = 10 - absDiff;
    return { rotateY, scale, x, z, brightness, zIndex };
  };

  const handleDragEnd = (e, info) => {
    setDragging(false);
    const vx = info.velocity.x;
    const offset = info.offset.x;
    if (vx < -300 || offset < -60) goTo(active + 1);
    else if (vx > 300 || offset > 60) goTo(active - 1);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        ref={containerRef}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-12 gap-6"
        style={{ background: '#080808', minHeight: 480, perspective: 1200 }}
        aria-label="Cinematic Reel Carousel"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 50%, ${GOLD}0d 0%, transparent 60%)`
        }} />

        {/* Cards stage */}
        <div
          className="relative flex items-center justify-center"
          style={{ width: CARD_W, height: CARD_H, transformStyle: 'preserve-3d', userSelect: 'none' }}
        >
          {ITEMS.map((item, i) => {
            const p = getProps(i);
            if (!p) return null;
            const isActive = i === active;
            return (
              <motion.div
                key={item.id}
                drag={isActive ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragStart={() => setDragging(true)}
                onDragEnd={handleDragEnd}
                onClick={() => !dragging && goTo(i)}
                initial={{ opacity: 0, scale: 0.7, rotateY: p.rotateY }}
                animate={{
                  rotateY: p.rotateY,
                  scale: p.scale,
                  x: p.x,
                  z: p.z,
                  opacity: p.brightness,
                  zIndex: p.zIndex,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                style={{
                  position: 'absolute',
                  width: CARD_W,
                  height: CARD_H,
                  cursor: isActive ? 'grab' : 'pointer',
                  transformStyle: 'preserve-3d',
                  boxShadow: isActive ? `0 0 40px 2px ${GOLD}44` : 'none',
                  border: isActive ? `1.5px solid ${GOLD}66` : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  background: item.bgColor,
                }}
                aria-label={`${item.title} — ${item.category}`}
                role="button"
                tabIndex={isActive ? 0 : -1}
              >
                {/* Subtle texture overlay */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)'
                }} />

                {/* Category top-left */}
                <div className="absolute top-5 left-5">
                  <span
                    className="text-[11px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full"
                    style={{ background: `${GOLD}22`, color: GOLD, border: `1px solid ${GOLD}44` }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                  style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.88) 0%, transparent 100%)' }}
                />

                {/* Number bottom-left */}
                <div className="absolute bottom-5 left-5">
                  <span className="font-black leading-none" style={{
                    fontSize: 72, color: `${GOLD}22`, fontVariantNumeric: 'tabular-nums',
                    lineHeight: 1,
                  }}>
                    {item.number}
                  </span>
                </div>

                {/* Title */}
                <div className="absolute bottom-8 left-5 right-5">
                  <h3 className="font-black text-white leading-[1.1] tracking-tight" style={{ fontSize: 22 }}>
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Arrow buttons */}
        <button
          onClick={() => goTo(active - 1)}
          className="absolute left-6 transition-opacity hover:opacity-100 opacity-50 z-20"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Previous slide"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke={GOLD} strokeWidth="1" strokeOpacity="0.4" />
            <path d="M21 12L15 18L21 24" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          onClick={() => goTo(active + 1)}
          className="absolute right-6 transition-opacity hover:opacity-100 opacity-50 z-20"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
          aria-label="Next slide"
        >
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <circle cx="18" cy="18" r="17" stroke={GOLD} strokeWidth="1" strokeOpacity="0.4" />
            <path d="M15 12L21 18L15 24" stroke={GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2.5 z-20 relative" aria-label="Slide indicators">
          {ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? 'true' : 'false'}
            >
              <motion.div
                animate={{
                  width: i === active ? 20 : 6,
                  background: i === active ? GOLD : 'rgba(255,255,255,0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{ height: 6, borderRadius: 9999 }}
              />
            </button>
          ))}
        </div>

        <span className="absolute bottom-6 right-6 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Cinematic Reel
        </span>
      </div>

      {/* Prompt strip */}
</div>
  );
}
