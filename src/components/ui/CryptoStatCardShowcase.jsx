import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, TrendingUp, TrendingDown, Activity, ArrowUpRight } from 'lucide-react';

/*
 * CryptoStatCardShowcase — live-style crypto price card with animated sparkline,
 * pulsing live dot, and percentage ticker that counts up/down.
 */

const promptContent = `crypto stat card — animated SVG sparkline price chart, pulsing live indicator dot, percentage change ticker with color-coded up/down animation, dark terminal aesthetic with neon green/red accents`;

const COINS = [
  { symbol: 'BTC', name: 'Bitcoin',  price: '$67,420', change: '+4.82%', up: true,  color: '#f59e0b', data: [40,55,48,60,52,70,65,80,72,90,85,95,88,100] },
  { symbol: 'ETH', name: 'Ethereum', price: '$3,248',  change: '-2.14%', up: false, color: '#818cf8', data: [80,75,85,70,75,65,72,60,68,58,65,55,60,50] },
  { symbol: 'SOL', name: 'Solana',   price: '$182.50', change: '+11.3%', up: true,  color: '#22d3ee', data: [30,38,35,50,42,55,60,72,65,80,75,88,82,95] },
];

function Sparkline({ data, color, up }) {
  const w = 200, h = 48;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 4 - ((v - min) / range) * (h - 8);
    return [x, y];
  });
  const pathD = pts.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
  const areaD = `${pathD} L${w},${h} L0,${h} Z`;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
      <defs>
        <linearGradient id={`sg-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={areaD} fill={`url(#sg-${color})`} />
      <path d={pathD} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last dot */}
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={color} />
      <motion.circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="7"
        fill={color} fillOpacity="0" stroke={color} strokeWidth="1.2"
        animate={{ r: [5, 10], opacity: [0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
    </svg>
  );
}

export default function CryptoStatCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const coin = COINS[active];

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-14"
        style={{ background: '#080808', minHeight: 440 }}>
        {/* Ambient */}
        <motion.div animate={{ opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${coin.color}22 0%, transparent 65%)` }} />

        <div className="relative z-10 w-[380px] flex flex-col gap-4">
          {/* Coin tabs */}
          <div className="flex gap-2" role="tablist">
            {COINS.map((c, i) => (
              <button key={c.symbol} onClick={() => setActive(i)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[11px] font-bold transition-all"
                style={{ background: active === i ? `${c.color}22` : 'rgba(255,255,255,0.04)', border: `1px solid ${active === i ? c.color + '55' : 'rgba(255,255,255,0.07)'}`, color: active === i ? c.color : 'rgba(255,255,255,0.35)' }}
                role="tab" aria-selected={active === i}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                {c.symbol}
              </button>
            ))}
          </div>

          {/* Main card */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-5 p-6 rounded-[22px]"
              style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid rgba(255,255,255,0.07)`, boxShadow: `0 0 60px ${coin.color}0d` }}>

              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center font-black text-[13px]"
                      style={{ background: `${coin.color}22`, color: coin.color, border: `1px solid ${coin.color}33` }}>
                      {coin.symbol[0]}
                    </div>
                    <div>
                      <p className="text-white font-bold text-[14px] leading-none">{coin.symbol}</p>
                      <p className="text-white/35 text-[10px] mt-0.5">{coin.name}</p>
                    </div>
                  </div>
                </div>
                {/* Live pill */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
                </div>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3">
                <span className="font-black text-white leading-none tracking-tight" style={{ fontSize: 38 }}>{coin.price}</span>
                <div className="flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-lg"
                  style={{ background: coin.up ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)' }}>
                  {coin.up ? <TrendingUp size={13} className="text-emerald-400" /> : <TrendingDown size={13} className="text-red-400" />}
                  <span className="font-bold text-[12px]" style={{ color: coin.up ? '#4ade80' : '#f87171' }}>{coin.change}</span>
                </div>
              </div>

              {/* Sparkline */}
              <Sparkline data={coin.data} color={coin.color} up={coin.up} />

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-2">
                {[['Market Cap', '$1.3T'], ['Volume 24h', '$42.8B'], ['Circ. Supply', '19.7M']].map(([label, val]) => (
                  <div key={label} className="flex flex-col gap-0.5 p-2.5 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span className="text-[9px] text-white/30 font-medium uppercase tracking-wider">{label}</span>
                    <span className="text-white/80 font-bold text-[11px]">{val}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-xl text-[12px] font-bold flex items-center justify-center gap-2 text-white"
                style={{ background: `linear-gradient(135deg, ${coin.color}cc, ${coin.color}88)`, boxShadow: `0 4px 20px ${coin.color}44` }}
                aria-label={`Trade ${coin.symbol}`}>
                Trade {coin.symbol} <ArrowUpRight size={14} />
              </motion.button>
            </motion.div>
          </AnimatePresence>
        </div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Crypto Card</span>
      </div>
</div>
  );
}
