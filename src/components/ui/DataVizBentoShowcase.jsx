import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, TrendingUp, Activity, DollarSign, Users, Zap } from 'lucide-react';

/*
 * Analytics Command Center Bento — Dark dashboard
 * Palette: charcoal #111318, soft cyan #7ec8c8, muted amber #c8a87e
 */

const promptContent = `Dark analytics dashboard bento grid with animated SVG sparkline drawing, donut chart with stroke animation, bar chart with spring-up bars, counter numbers counting up on scroll, soft cyan and amber accents, muted dark palette, smooth easing, premium SaaS data visualization`;

// ── Animated counter ──
function Counter({ target, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 1500;
    const steps = 60;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(decimals ? Math.round(cur * 10) / 10 : Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(id);
  }, [inView, target, decimals]);

  return <span ref={ref}>{prefix}{inView ? val.toLocaleString() : 0}{suffix}</span>;
}

// ── Tile ──
const tileV = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0, bg }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[16px] p-5 flex flex-col gap-3 ${className}`}
      style={{ background: bg || '#161820', border: '1px solid rgba(126,200,200,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
    >
      {children}
    </motion.div>
  );
}

export default function DataVizBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-6 sm:p-8"
        style={{ background: '#111318', minHeight: 580 }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 60% 20%, rgba(126,200,200,0.05) 0%, transparent 55%)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 auto-rows-[190px]">

          {/* ── Revenue Hero (2col) ── */}
          <Tile className="md:col-span-2 justify-between" custom={0} bg="linear-gradient(135deg, #141a24 0%, #111318 100%)">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <DollarSign size={10} style={{ color: 'rgba(126,200,200,0.4)' }} />
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>
                    Total Revenue
                  </span>
                </div>
                <p className="font-bold leading-none tracking-tight" style={{ fontSize: 36, color: '#f0ede8' }}>
                  $<Counter target={248940} />
                </p>
              </div>
              <div className="flex items-center gap-1 px-2 py-1 rounded-xl text-[10px] font-semibold"
                style={{ background: 'rgba(126,200,200,0.08)', color: '#7ec8c8' }}>
                <TrendingUp size={10} /> +28.4%
              </div>
            </div>

            {/* SVG Sparkline with pathLength animation */}
            <svg width="100%" height="60" viewBox="0 0 400 60" preserveAspectRatio="none" className="mt-auto">
              <defs>
                <linearGradient id="dvSparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7ec8c8" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#7ec8c8" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,50 Q40,35 80,38 T160,25 T240,20 T320,12 T400,18 L400,60 L0,60 Z"
                fill="url(#dvSparkFill)"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }} viewport={{ once: true }}
              />
              <motion.path
                d="M0,50 Q40,35 80,38 T160,25 T240,20 T320,12 T400,18"
                fill="none" stroke="#7ec8c8" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
              />
              <motion.circle cx="400" cy="18" r="3" fill="#7ec8c8"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.5 }} viewport={{ once: true }} />
            </svg>

            <div className="flex gap-6 mt-2">
              {[['MRR', '$24.1k', '#7ec8c8'], ['ARR', '$289k', '#8b7ec8'], ['Churn', '1.2%', '#c8a87e']].map(([l, v, c]) => (
                <div key={l}>
                  <p className="text-[9px] uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.25)' }}>{l}</p>
                  <p className="font-bold text-[13px]" style={{ color: c }}>{v}</p>
                </div>
              ))}
            </div>
          </Tile>

          {/* ── Active Users ── */}
          <Tile custom={1}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Users size={10} style={{ color: 'rgba(139,126,200,0.5)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Users</span>
              </div>
              <div className="flex items-center gap-1 text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(139,126,200,0.08)', color: '#b8a9d4' }}>
                <Activity size={8} /> Live
              </div>
            </div>
            <p className="font-bold text-[28px] leading-none" style={{ color: '#f0ede8' }}>
              <Counter target={12847} />
            </p>
            {/* Mini bar chart */}
            <div className="flex items-end gap-[3px] flex-1 mt-auto" style={{ maxHeight: 40 }}>
              {[55, 72, 65, 80, 68, 88, 78, 92, 85, 95].map((h, i) => (
                <motion.div key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  style={{ flex: 1, height: `${h}%`, borderRadius: 3, background: i >= 8 ? '#8b7ec8' : 'rgba(139,126,200,0.2)', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
            <p className="text-[10px]" style={{ color: 'rgba(240,237,232,0.25)' }}>+4,249 this month</p>
          </Tile>

          {/* ── Conversion (donut) ── */}
          <Tile custom={2}>
            <div className="flex items-center gap-1.5">
              <TrendingUp size={10} style={{ color: 'rgba(126,200,200,0.5)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Conversion</span>
            </div>
            <div className="flex items-center gap-4 flex-1">
              <div>
                <p className="font-bold text-[26px] leading-none" style={{ color: '#f0ede8' }}>7.3%</p>
                <span className="text-[10px] font-semibold" style={{ color: '#7ec8c8' }}>↑ 1.2pp</span>
              </div>
              {/* SVG Donut */}
              <svg width="70" height="70" viewBox="0 0 70 70" className="shrink-0">
                <circle cx="35" cy="35" r="28" fill="none" stroke="rgba(126,200,200,0.06)" strokeWidth="6" />
                <motion.circle cx="35" cy="35" r="28" fill="none" stroke="#7ec8c8" strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
                  whileInView={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - 0.073) }}
                  transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
                <text x="35" y="38" textAnchor="middle" fill="#f0ede8" fontSize="10" fontWeight="700">7.3%</text>
              </svg>
            </div>
          </Tile>

          {/* ── Throughput ── */}
          <Tile custom={3}>
            <div className="flex items-center gap-1.5">
              <Zap size={10} style={{ color: 'rgba(200,168,126,0.5)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Throughput</span>
            </div>
            <p className="font-bold text-[26px] leading-none" style={{ color: '#f0ede8' }}>
              4.2M<span className="text-[13px] font-normal" style={{ color: 'rgba(240,237,232,0.25)' }}>/min</span>
            </p>
            <svg width="100%" height="30" viewBox="0 0 120 30" className="mt-auto">
              <defs>
                <linearGradient id="dvThroughFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c8a87e" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#c8a87e" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path d="M0,24 Q15,18 30,20 T60,14 T90,10 T120,16 L120,30 L0,30 Z"
                fill="url(#dvThroughFill)" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }} />
              <motion.path d="M0,24 Q15,18 30,20 T60,14 T90,10 T120,16"
                fill="none" stroke="#c8a87e" strokeWidth="1.2" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
            </svg>
          </Tile>

          {/* ── Error Rate ── */}
          <Tile custom={4}>
            <div className="flex items-center gap-1.5">
              <Activity size={10} style={{ color: 'rgba(200,126,126,0.5)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Error Rate</span>
            </div>
            <div className="flex items-end gap-2">
              <p className="font-bold text-[26px] leading-none" style={{ color: '#f0ede8' }}>0.003%</p>
              <span className="text-[10px] font-semibold mb-0.5" style={{ color: '#7ec8c8' }}>↓ 68%</span>
            </div>
            <div className="flex flex-col gap-1.5 mt-auto">
              {[['5xx Errors', '#c87e7e', 3], ['4xx Errors', '#c8a87e', 18], ['Timeouts', '#8b7ec8', 6]].map(([l, c, v]) => (
                <div key={l} className="flex items-center gap-2">
                  <span className="text-[9px] w-16 shrink-0" style={{ color: 'rgba(240,237,232,0.25)' }}>{l}</span>
                  <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <motion.div className="h-full rounded-full"
                      initial={{ width: 0 }} whileInView={{ width: `${v}%` }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }} style={{ background: c }} />
                  </div>
                  <span className="text-[9px] font-semibold w-4 text-right" style={{ color: c }}>{v}</span>
                </div>
              ))}
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
          <code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
