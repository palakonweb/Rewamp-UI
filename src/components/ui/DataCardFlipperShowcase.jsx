import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

/*
 * DataCardFlipper
 * Props:
 *   items: {
 *     id: string, label: string, stat: string, descriptor: string,
 *     graphData: number[], details: string[]
 *   }[]
 */

const promptContent = `data card flipper carousel — 3-card row with Y-axis flip animation, one-at-a-time flip, matrix green terminal aesthetic, sparkline SVG graph on back, scanline texture overlay`;

const GREEN = '#00FF41';
const MOSS = '#1A2A1A';
const MINT = '#CCFFCC';
const TERMINAL_BG = '#0A0A0A';

const ALL_ITEMS = [
  { id: '1', label: 'SYS_PERF', stat: '99.8%', descriptor: 'Uptime last 30 days', graphData: [80, 88, 92, 85, 94, 97, 99, 96, 98, 99.8], details: ['Zero incidents this quarter', 'P99 latency: 12ms avg', 'Auto-healing triggered 0×'] },
  { id: '2', label: 'REQ_RATE', stat: '4.2M', descriptor: 'Requests per second', graphData: [1.8, 2.1, 2.6, 3.0, 3.4, 3.8, 4.0, 4.1, 4.2, 4.2], details: ['Peak: 6.1M/s last spike', 'Traffic spread: 220 nodes', 'Cache hit rate: 94.2%'] },
  { id: '3', label: 'ERR_RATE', stat: '0.003%', descriptor: 'Error rate (5xx)', graphData: [0.02, 0.015, 0.01, 0.008, 0.006, 0.005, 0.004, 0.004, 0.003, 0.003], details: ['95% reduction YoY', 'MTTR: avg 8 minutes', 'Root cause: 100% tracked'] },
  { id: '4', label: 'DATA_FLOW', stat: '18.4TB', descriptor: 'Processed daily', graphData: [6, 8, 10, 12, 13, 14, 15, 16, 17, 18.4], details: ['Storage efficiency: 4.2×', 'Compression active: LZ4', 'Cold tier: 80TB archived'] },
  { id: '5', label: 'LATENCY', stat: '0.8ms', descriptor: 'P99 across edge', graphData: [5.2, 3.8, 2.9, 2.1, 1.8, 1.4, 1.2, 1.0, 0.9, 0.8], details: ['Sub-ms: 89% of requests', 'Global PoP count: 224', 'TCP Fast Open enabled'] },
  { id: '6', label: 'COST_EFF', stat: '$0.0004', descriptor: 'Per million requests', graphData: [0.002, 0.0016, 0.0013, 0.001, 0.0008, 0.0007, 0.0006, 0.0005, 0.0004, 0.0004], details: ['68% reduction vs Q1-2024', 'Spot auto-allocation on', 'Reserved: 40% of fleet'] },
];

// Sparkline SVG
function Sparkline({ data, color }) {
  const w = 160, h = 60;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * (h - 10) - 5;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={`0,${h} ${pts} ${w},${h}`} fill={`url(#sg-${color})`} stroke="none" />
      {/* Last point dot */}
      {(() => {
        const last = data[data.length - 1];
        const lx = w, ly = h - ((last - min) / range) * (h - 10) - 5;
        return <circle cx={lx} cy={ly} r="3" fill={color} />;
      })()}
    </svg>
  );
}

// Blinking cursor
function Cursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 0.9, repeat: Infinity, ease: 'steps(2)' }}
      style={{ color: GREEN, fontFamily: 'monospace', fontSize: 14 }}
    >█</motion.span>
  );
}

function FlipCard({ item, isFlipped, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ perspective: 900, width: '100%', height: 280, cursor: 'pointer' }}
      role="button"
      aria-label={`${item.label}: ${item.stat}. ${isFlipped ? 'Showing back. Click to unflip.' : 'Click to flip.'}`}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 24 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* FRONT */}
        <div
          style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            background: TERMINAL_BG,
            border: `1px solid ${GREEN}33`,
            borderRadius: 14,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 18,
          }}
        >
          {/* Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.035) 3px, rgba(0,255,65,0.035) 4px)`,
          }} />

          {/* Label */}
          <div className="flex justify-between items-start">
            <code className="text-[10px] font-bold tracking-widest" style={{ color: `${GREEN}99` }}>
              {item.label}
            </code>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: GREEN, boxShadow: `0 0 6px ${GREEN}` }} />
          </div>

          {/* Big stat */}
          <div className="flex flex-col items-center justify-center flex-1 gap-1">
            <span className="font-black leading-none tracking-tighter" style={{ fontSize: 44, color: GREEN }}>
              {item.stat}
            </span>
            <span className="text-[11px]" style={{ color: `${MINT}60` }}>{item.descriptor}</span>
          </div>

          {/* Bottom cursor */}
          <div className="flex justify-end">
            <Cursor />
          </div>
        </div>

        {/* BACK */}
        <div
          style={{
            position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
            rotateY: '180deg',
            background: MOSS,
            border: `1px solid ${GREEN}44`,
            borderRadius: 14,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 18,
          }}
        >
          {/* Scanline */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)`,
          }} />

          {/* Sparkline */}
          <Sparkline data={item.graphData} color={GREEN} />

          {/* Details */}
          <div className="w-full flex flex-col gap-1.5">
            {item.details.map((d, i) => (
              <div key={i} className="flex items-start gap-2">
                <span style={{ color: GREEN, fontSize: 10, marginTop: 1 }}>▸</span>
                <span className="text-[11px]" style={{ color: MINT }}>{d}</span>
              </div>
            ))}
          </div>

          {/* View Report button */}
          <button className="w-full py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all border"
            style={{ borderColor: `${GREEN}44`, color: GREEN, background: `${GREEN}0a` }}
            tabIndex={-1}
          >
            View Full Report →
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function DataCardFlipperShowcase() {
  const [copied, setCopied] = useState(false);
  const [startIdx, setStartIdx] = useState(0);
  const [flippedId, setFlippedId] = useState(null);

  const visible = [0, 1, 2].map(i => ALL_ITEMS[(startIdx + i) % ALL_ITEMS.length]);

  const slideBy = (dir) => {
    setFlippedId(null);
    setTimeout(() => setStartIdx(prev => ((prev + dir) + ALL_ITEMS.length) % ALL_ITEMS.length), 200);
  };

  const handleFlip = (id) => {
    setFlippedId(prev => prev === id ? null : id);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-12 px-6 gap-8"
        style={{ background: TERMINAL_BG, minHeight: 480 }}
        aria-label="Data Card Flipper Carousel"
      >
        {/* Header */}
        <div className="w-full flex items-center gap-3">
          <div className="w-2 h-2 rounded-full" style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
          <code className="text-[11px] font-bold uppercase tracking-widest" style={{ color: `${GREEN}66` }}>
            PURRFORM_METRICS:// live_dashboard
          </code>
        </div>

        {/* Card row */}
        <div className="w-full grid grid-cols-3 gap-4" style={{ maxWidth: 680 }}>
          {visible.map((item) => (
            <FlipCard
              key={item.id}
              item={item}
              isFlipped={flippedId === item.id}
              onClick={() => handleFlip(item.id)}
            />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => slideBy(-1)}
            aria-label="Previous cards"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
            style={{ borderColor: `${GREEN}33`, background: `${GREEN}0a`, color: GREEN }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
          </button>

          {ALL_ITEMS.map((it, i) => (
            <button
              key={it.id}
              onClick={() => { setFlippedId(null); setStartIdx(i); }}
              aria-label={`Go to page starting at ${it.label}`}
              className="relative flex flex-col items-center gap-1"
            >
              <div
                style={{
                  width: 24, height: 4, borderRadius: 9999,
                  background: i >= startIdx && i < startIdx + 3 ? GREEN : `${GREEN}22`,
                  transition: 'all 0.3s',
                }}
              />
              {flippedId === it.id && (
                <div style={{ width: 6, height: 6, borderRadius: 9999, background: GREEN, position: 'absolute', top: -8 }} />
              )}
            </button>
          ))}

          <button
            onClick={() => slideBy(1)}
            aria-label="Next cards"
            className="w-9 h-9 rounded-full flex items-center justify-center border transition-all"
            style={{ borderColor: `${GREEN}33`, background: `${GREEN}0a`, color: GREEN }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Data Flipper
        </span>
      </div>
</div>
  );
}
