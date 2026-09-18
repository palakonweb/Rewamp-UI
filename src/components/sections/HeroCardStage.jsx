import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, animate, cubicBezier, useReducedMotion } from 'framer-motion';
import { FileCode2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Lightweight, self-contained preview mocks — one per card.
   Kept cheap (CSS + a few motion values) since ~24 render at once.
   ═══════════════════════════════════════════════════════════ */

function GlowButtonPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)]">
      <motion.div
        className="px-5 py-2.5 rounded-full bg-[var(--brand-strong)] text-white text-[11px] font-semibold font-sans"
        animate={{ boxShadow: ['0 0 0px rgba(193,180,216,0)', '0 0 28px rgba(193,180,216,0.85)', '0 0 0px rgba(193,180,216,0)'] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        Get started
      </motion.div>
    </div>
  );
}

function AuroraTextPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)]">
      <span
        className="text-[22px] font-bold bg-clip-text text-transparent font-sans animate-text-shimmer"
        style={{ backgroundImage: 'linear-gradient(90deg, var(--brand-strong), var(--text-primary), var(--brand-strong))', backgroundSize: '200% auto' }}
      >
        Aurora
      </span>
    </div>
  );
}

function OrbPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)]">
      <motion.div
        className="w-16 h-16 rounded-full"
        style={{ background: 'radial-gradient(circle at 35% 30%, var(--brand-soft), var(--brand-strong) 70%)' }}
        animate={{ scale: [1, 1.12, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function NavbarPillPreview() {
  const items = ['Home', 'Docs', 'Pricing'];
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)] p-4">
      <div className="flex items-center gap-1 bg-[var(--surface)] border border-[var(--border)] rounded-full px-2 py-1.5 shadow-sm">
        {items.map((it, i) => (
          <span
            key={it}
            className={`px-2.5 py-1 rounded-full text-[9px] font-medium font-sans ${i === 1 ? 'bg-[var(--brand-soft)] text-[var(--brand-strong)]' : 'text-[var(--text-subtle)]'}`}
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardStackPreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)] relative">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-14 rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-md"
          initial={{ y: 0, rotate: 0 }}
          animate={{ y: -i * 3, rotate: (i - 1) * 6, x: (i - 1) * 10 }}
          transition={{ duration: 0.6 }}
          style={{ zIndex: 3 - i }}
        />
      ))}
    </div>
  );
}

function MarqueeTextPreview() {
  return (
    <div className="w-full h-full flex items-center bg-[var(--elevated)] overflow-hidden">
      <motion.div
        className="flex gap-4 whitespace-nowrap text-[11px] font-semibold text-[var(--text-subtle)] font-sans"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      >
        {Array(6).fill('MOTION · MOTION ·').map((t, i) => <span key={i}>{t}</span>)}
      </motion.div>
    </div>
  );
}

function TogglePreview() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--elevated)]">
      <motion.div
        className="w-11 h-6 rounded-full p-1 flex"
        animate={{ backgroundColor: ['var(--border)', 'var(--brand-strong)', 'var(--border)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-white shadow"
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </div>
  );
}

function CarouselDotsPreview() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[var(--elevated)]">
      <div className="w-24 h-14 rounded-lg bg-[var(--surface)] border border-[var(--border)] shadow-sm" />
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 rounded-full"
            animate={{ backgroundColor: i === 1 ? 'var(--brand-strong)' : 'var(--border)', scale: i === 1 ? 1.3 : 1 }}
            transition={{ duration: 0.4 }}
          />
        ))}
      </div>
    </div>
  );
}

function CursorTrailPreview() {
  return (
    <div className="w-full h-full relative bg-[var(--elevated)] overflow-hidden">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute w-2.5 h-2.5 rounded-full bg-[var(--brand-strong)]"
          style={{ opacity: 1 - i * 0.22 }}
          animate={{ left: ['20%', '75%', '20%'], top: ['30%', '65%', '30%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function CodeSnippetPreview({ label = 'export' }) {
  return (
    <div className="w-full h-full bg-[#171717] p-3 font-mono text-[9px] leading-[1.8] text-[#d4d4d4]">
      <div><span className="text-[#c586c0]">import</span> {'{ '}<span className="text-[#dcdcaa]">{label}</span>{' }'}</div>
      <div className="text-[#6a9955]">{'// animated & accessible'}</div>
      <div>{'<'}<span className="text-[#4ec9b0]">{label}</span> <span className="text-[#9cdcfe]">variant</span>{'='}<span className="text-[#ce9178]">"glow"</span> {'/>'}</div>
    </div>
  );
}

const KIND_COMPONENTS = {
  glow: GlowButtonPreview,
  aurora: AuroraTextPreview,
  orb: OrbPreview,
  navbar: NavbarPillPreview,
  stack: CardStackPreview,
  marquee: MarqueeTextPreview,
  toggle: TogglePreview,
  carousel: CarouselDotsPreview,
  cursor: CursorTrailPreview,
  code: CodeSnippetPreview,
};

/* ═══════════════════════════════════════════════════════════
   Canvas layout — fixed slots, camera pans/zooms between them.
   ═══════════════════════════════════════════════════════════ */

const CANVAS_W = 2760;
const CANVAS_H = 1760;
const COL_W = 470;

const RAW_CARDS = [
  { id: 'glow-button', kind: 'glow', col: 0, y: 30, w: 400, h: 260 },
  { id: 'aurora-text', kind: 'aurora', col: 0, y: 320, w: 400, h: 240 },
  { id: 'diagonal-card-stack', kind: 'stack', col: 0, y: 590, w: 400, h: 260 },
  { id: 'pill-trail-cursor', kind: 'cursor', col: 0, y: 880, w: 400, h: 240 },

  { id: 'magnetic-pill-navbar', kind: 'navbar', col: 1, y: 90, w: 420, h: 240 },
  { id: 'glow-button.tsx', kind: 'code', col: 1, y: 360, w: 420, h: 240 },
  { id: 'aurora-toggle', kind: 'toggle', col: 1, y: 630, w: 420, h: 240 },
  { id: 'orbital-card-arch', kind: 'carousel', col: 1, y: 900, w: 420, h: 260 },

  { id: 'particle-dot-orb', kind: 'orb', col: 2, y: 20, w: 400, h: 260 },
  { id: 'velocity-marquee-text', kind: 'marquee', col: 2, y: 310, w: 400, h: 220 },
  { id: 'shimmer-button', kind: 'glow', col: 2, y: 560, w: 400, h: 250 },
  { id: 'aurora-text.tsx', kind: 'code', col: 2, y: 840, w: 400, h: 240 },

  { id: 'frosted-folder-card', kind: 'stack', col: 3, y: 80, w: 420, h: 250 },
  { id: 'wireframe-ring-orb', kind: 'orb', col: 3, y: 360, w: 420, h: 250 },
  { id: 'day-night-sky-toggle', kind: 'toggle', col: 3, y: 640, w: 420, h: 240 },
  { id: 'floating-dock-navbar', kind: 'navbar', col: 3, y: 910, w: 420, h: 250 },

  { id: 'confetti-button', kind: 'glow', col: 4, y: 10, w: 400, h: 250 },
  { id: 'kinetic-reel-text', kind: 'aurora', col: 4, y: 290, w: 400, h: 230 },
  { id: 'wallet-card-reveal', kind: 'stack', col: 4, y: 550, w: 400, h: 260 },
  { id: 'halftone-dot-cursor', kind: 'cursor', col: 4, y: 840, w: 400, h: 240 },

  { id: 'circular-radial-navbar', kind: 'navbar', col: 5, y: 60, w: 400, h: 250 },
  { id: 'editorial-3d-orbit-carousel', kind: 'carousel', col: 5, y: 340, w: 400, h: 260 },
  { id: 'toggle.tsx', kind: 'code', col: 5, y: 630, w: 400, h: 240 },
  { id: 'archie-card-carousel', kind: 'orb', col: 5, y: 900, w: 400, h: 250 },
];

const CARDS = RAW_CARDS.map((c) => ({ ...c, x: 60 + c.col * COL_W }));

const START_INDEX = CARDS.findIndex((c) => c.id === 'particle-dot-orb');
const FOCUS_INTERVAL_MS = 4200;
// Never hop to a card bordering the current one — a focus change should read
// as a real flight, not a shuffle to a neighbor.
const MIN_HOP_DISTANCE = 700;

const hopDistance = (a, b) => {
  const ca = CARDS[a];
  const cb = CARDS[b];
  return Math.hypot(ca.x + ca.w / 2 - (cb.x + cb.w / 2), ca.y + ca.h / 2 - (cb.y + cb.h / 2));
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

// ── Camera model ─────────────────────────────────────────────────────────
// The camera is (lookAt, zoom): the canvas point under the viewport center
// and the scale it renders at. Every frame derives the transform from those
// two so the look-at point travels a straight line while the zoom breathes —
// GTA-character-switch profile: the look-at glides on one S-curve (slow, fast
// middle, slow) while the zoom follows a sin² bell, deepest mid-flight.
const flightPanEase = cubicBezier(0.65, 0, 0.35, 1);
const flightDurationFor = (distance) => clamp(1.1, 0.8 + distance / 950, 2.3);
const flightZoomOutFor = (distance) => clamp(0.7, 0.88 - distance * 0.00008, 0.88);

function shuffled(length) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function CardShell({ title, children }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[10px] bg-[var(--elevated)] p-1">
      <div className="flex h-7 shrink-0 items-center px-2">
        <span className="flex items-center gap-1.5 text-[var(--text-subtle)] font-mono text-[10px]">
          <FileCode2 size={12} />
          <span className="line-clamp-1">{title}</span>
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[7px] border border-[var(--border)]">
        {children}
      </div>
    </div>
  );
}

export function HeroCardStage({ className = '' }) {
  const viewportRef = useRef(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(START_INDEX);
  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);
  const queueRef = useRef([]);
  const lastPickRef = useRef(START_INDEX);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      if (queueRef.current.length === 0) queueRef.current = shuffled(CARDS.length);
      const current = lastPickRef.current;
      let pickAt = queueRef.current.findIndex((i) => hopDistance(i, current) >= MIN_HOP_DISTANCE);
      if (pickAt === -1) pickAt = 0;
      const next = queueRef.current.splice(pickAt, 1)[0];
      lastPickRef.current = next;
      setActive(next);
    }, FOCUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [paused]);

  const measured = viewport.w > 0 && viewport.h > 0;
  const scale = measured ? clamp(0.55, Math.min(viewport.w / 900, viewport.h / 820), 0.85) : 0.65;
  const focus = CARDS[active];
  const targetX = focus.x + focus.w / 2;
  const targetY = focus.y + focus.h / 2;

  return (
    <div
      ref={viewportRef}
      className={`relative overflow-hidden ${className}`}
    >
      {measured && (
        <motion.div
          className="absolute top-0 left-0 will-change-transform"
          style={{ width: CANVAS_W, height: CANVAS_H, transformOrigin: '0 0' }}
          animate={{
            x: viewport.w / 2 - targetX * scale,
            y: viewport.h / 2 - targetY * scale,
            scale,
          }}
          transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
        >
          <div
            aria-hidden
            className="absolute -inset-[800px] bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-[size:26px_26px] opacity-60"
          />
          {CARDS.map((card, index) => {
            const isFocused = index === active;
            const isLifted = isFocused || hovered === index;
            const Preview = KIND_COMPONENTS[card.kind];
            return (
              <motion.div
                key={card.id}
                className="absolute rounded-[10px]"
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.w,
                  height: card.h,
                  zIndex: isFocused ? 10 : hovered === index ? 5 : 1,
                  boxShadow: isFocused
                    ? '0 30px 60px -15px rgba(0,0,0,0.25)'
                    : '0 4px 14px rgba(0,0,0,0.08)',
                }}
                animate={{ opacity: isLifted ? 1 : 0.3, scale: isFocused ? 1.06 : 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onPointerEnter={() => {
                  setHovered(index);
                  setPaused(true);
                }}
                onPointerLeave={() => {
                  setHovered((p) => (p === index ? null : p));
                  setPaused(false);
                }}
              >
                <CardShell title={card.id.endsWith('.tsx') ? card.id : `${card.id}.tsx`}>
                  <Preview label={card.id.split('-')[0]} />
                </CardShell>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default HeroCardStage;
