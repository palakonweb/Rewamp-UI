import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Star, Zap, Globe, Shield, Database, Cpu } from 'lucide-react';

/*
 * FloatingOrbitCarousel
 * Props:
 *   items: { id: string, icon: string, title: string, stats: { label: string, value: string }[] }[]
 *   orbitCount?: number
 */

const promptContent = `floating orbit carousel — cards arranged on elliptical orbit with sin/cos math, idle auto-rotation, click to bring to front, Framer Motion x/y/scale/opacity per orbit position`;

const PURPLE = '#7B2FBE';
const STARDUST = '#C9B8FF';
const PINK = '#FF6EB4';
const SPACE = '#06060F';

const ICON_MAP = { Star, Zap, Globe, Shield, Database, Cpu };

const ITEMS = [
  { id: '1', icon: 'Cpu', title: 'Neural Core', stats: [{ label: 'Throughput', value: '2.4 TFLOPS' }, { label: 'Latency', value: '4ms' }] },
  { id: '2', icon: 'Globe', title: 'Edge Mesh', stats: [{ label: 'Nodes', value: '220+' }, { label: 'Coverage', value: '99.9%' }] },
  { id: '3', icon: 'Shield', title: 'Cipher Guard', stats: [{ label: 'Threats', value: '0 / day' }, { label: 'Uptime', value: '100%' }] },
  { id: '4', icon: 'Database', title: 'Vault Store', stats: [{ label: 'Capacity', value: '1 PB' }, { label: 'IOPS', value: '800k' }] },
  { id: '5', icon: 'Zap', title: 'Pulse Engine', stats: [{ label: 'Events/s', value: '4.2M' }, { label: 'P99', value: '0.8ms' }] },
];

const CARD_SIZE = 180;
const RX = 220; // orbit x radius
const RY = 100; // orbit y radius

function getOrbitPos(index, total, activeIndex, orbitOffset) {
  // Active card is at bottom (angle = PI/2)
  const baseAngle = (Math.PI / 2); // bottom position
  const step = (2 * Math.PI) / total;
  const relIndex = (index - activeIndex + total) % total;
  const angle = baseAngle + relIndex * step + orbitOffset;
  const x = Math.cos(angle) * RX;
  const y = Math.sin(angle) * RY;
  // Scale: front card (angle≈PI/2) is largest
  const normalizedAngle = ((angle - Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  const proximity = Math.cos(normalizedAngle); // 1 = front, -1 = back
  const scale = 0.55 + 0.45 * ((proximity + 1) / 2);
  const opacity = 0.3 + 0.7 * ((proximity + 1) / 2);
  const zIndex = Math.round(scale * 10);
  return { x, y, scale, opacity, zIndex };
}

export default function FloatingOrbitCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const [orbitOffset, setOrbitOffset] = useState(0);
  const [hovered, setHovered] = useState(false);
  const rafRef = useRef(null);
  const offsetRef = useRef(0);
  const lastTRef = useRef(null);

  // Auto-rotate
  useEffect(() => {
    if (hovered) { lastTRef.current = null; return; }
    const tick = (t) => {
      if (lastTRef.current !== null) {
        const delta = (t - lastTRef.current) / 1000;
        offsetRef.current += delta * 0.25; // rad/s
        setOrbitOffset(offsetRef.current);
      }
      lastTRef.current = t;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]);

  const rotate = (dir) => {
    offsetRef.current += dir * ((2 * Math.PI) / ITEMS.length);
    setOrbitOffset(offsetRef.current);
    setActive((prev) => ((prev - dir) + ITEMS.length) % ITEMS.length);
  };

  const handleCardClick = (i) => {
    const diff = (i - active + ITEMS.length) % ITEMS.length;
    const shortDiff = diff <= ITEMS.length / 2 ? diff : diff - ITEMS.length;
    offsetRef.current -= shortDiff * ((2 * Math.PI) / ITEMS.length);
    setOrbitOffset(offsetRef.current);
    setActive(i);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeItem = ITEMS[active];
  const ActiveIcon = ICON_MAP[activeItem.icon] || Star;

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-10"
        style={{ background: SPACE, minHeight: 540 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label="Floating Orbit Carousel"
      >
        {/* Star field */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 2 + 0.5,
                height: Math.random() * 2 + 0.5,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.1,
              }}
              animate={{ opacity: [null, Math.random() * 0.4 + 0.05, null] }}
              transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </div>

        {/* Orbit ellipse */}
        <div className="relative flex items-center justify-center" style={{ width: RX * 2 + CARD_SIZE, height: RY * 2 + CARD_SIZE }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <svg width={RX * 2 + 20} height={RY * 2 + 20} viewBox={`${-RX - 10} ${-RY - 10} ${RX * 2 + 20} ${RY * 2 + 20}`}>
              <ellipse cx="0" cy="0" rx={RX} ry={RY} fill="none" stroke={`${PURPLE}30`} strokeWidth="1" strokeDasharray="4 8" />
            </svg>
          </div>

          {/* Orbit cards */}
          {ITEMS.map((item, i) => {
            const { x, y, scale, opacity, zIndex } = getOrbitPos(i, ITEMS.length, active, orbitOffset);
            const isActive = i === active;
            const IconComp = ICON_MAP[item.icon] || Star;

            return (
              <motion.div
                key={item.id}
                onClick={() => handleCardClick(i)}
                animate={{ x, y, scale, opacity, zIndex }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                style={{
                  position: 'absolute',
                  width: CARD_SIZE,
                  height: CARD_SIZE,
                  marginLeft: -CARD_SIZE / 2,
                  marginTop: -CARD_SIZE / 2,
                  cursor: isActive ? 'default' : 'pointer',
                  backdropFilter: 'blur(12px)',
                  background: 'rgba(6,6,15,0.7)',
                  border: isActive ? `1.5px solid ${PURPLE}99` : `1px solid ${PURPLE}33`,
                  borderRadius: 20,
                  boxShadow: isActive ? `0 0 40px ${PURPLE}55, 0 0 80px ${PURPLE}22` : 'none',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 16,
                }}
                aria-label={item.title}
                role="button"
                tabIndex={isActive ? 0 : -1}
              >
                {/* Icon badge */}
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: `${PURPLE}22`,
                    border: `1px solid ${STARDUST}33`,
                    boxShadow: isActive ? `0 0 20px ${STARDUST}44` : 'none',
                  }}
                >
                  <IconComp size={18} style={{ color: STARDUST }} />
                </div>

                {/* Title */}
                <span className="font-black text-center text-white leading-tight" style={{ fontSize: 13 }}>
                  {item.title}
                </span>

                {/* Stats */}
                <div className="w-full flex flex-col gap-1">
                  {item.stats.map((s, si) => (
                    <div key={si} className="flex justify-between items-center">
                      <span className="text-[9px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
                      <span className="text-[10px] font-bold" style={{ color: PINK }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Chevron controls */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => rotate(-1)}
            aria-label="Rotate orbit left"
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:opacity-100 opacity-50"
            style={{ border: `1px solid ${PURPLE}55`, background: `${PURPLE}11` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={STARDUST} strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20">
          <button
            onClick={() => rotate(1)}
            aria-label="Rotate orbit right"
            className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:opacity-100 opacity-50"
            style={{ border: `1px solid ${PURPLE}55`, background: `${PURPLE}11` }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={STARDUST} strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Orbit Carousel
        </span>
      </div>
</div>
  );
}
