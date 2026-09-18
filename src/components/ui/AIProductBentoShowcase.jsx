import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Sparkles, Zap, BarChart3 } from 'lucide-react';

/*
 * AI Copilot Bento — Dark violet neural network grid
 * Palette: slate #0f1117, soft violet #8b7ec8, warm white #f0ede8
 */

const promptContent = `Dark themed AI product bento grid with animated SVG neural network, soft violet accents, interconnected nodes pulsing gently, prompt engine tile with typewriter cursor, latency stat with progress bar, muted palette, buttery smooth animations, premium SaaS UI`;

// ── Neural Network SVG ──
function NeuralNetwork() {
  const nodes = [
    // Input layer
    { x: 15, y: 25, layer: 0 }, { x: 15, y: 50, layer: 0 }, { x: 15, y: 75, layer: 0 },
    // Hidden layer 1
    { x: 38, y: 20, layer: 1 }, { x: 38, y: 40, layer: 1 }, { x: 38, y: 60, layer: 1 }, { x: 38, y: 80, layer: 1 },
    // Hidden layer 2
    { x: 62, y: 25, layer: 2 }, { x: 62, y: 50, layer: 2 }, { x: 62, y: 75, layer: 2 },
    // Output layer
    { x: 85, y: 35, layer: 3 }, { x: 85, y: 65, layer: 3 },
  ];

  const connections = [];
  nodes.forEach((from, fi) => {
    nodes.forEach((to, ti) => {
      if (to.layer === from.layer + 1) {
        connections.push({ from: fi, to: ti });
      }
    });
  });

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Connections */}
      {connections.map((c, i) => (
        <motion.line
          key={i}
          x1={nodes[c.from].x} y1={nodes[c.from].y}
          x2={nodes[c.to].x} y2={nodes[c.to].y}
          stroke="#8b7ec8"
          strokeWidth="0.3"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.2 }}
          transition={{ duration: 2, delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      ))}
      {/* Nodes */}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r="2.5"
          fill="#0f1117"
          stroke="#8b7ec8"
          strokeWidth="0.8"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      ))}
      {/* Pulsing glow on random nodes */}
      {[3, 7, 10].map((ni) => (
        <motion.circle
          key={`glow-${ni}`} cx={nodes[ni].x} cy={nodes[ni].y} r="5"
          fill="none" stroke="#8b7ec8" strokeWidth="0.5"
          animate={{ r: [5, 10, 5], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, delay: ni * 0.5, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

// ── Animated counter ──
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseFloat(value);
    const duration = 1200;
    const steps = 50;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current * 10) / 10);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{inView ? count : 0}{suffix}</span>;
}

// ── Tile ──
const tileVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0, bg }) {
  return (
    <motion.div
      custom={custom} variants={tileVariants} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[16px] p-5 flex flex-col ${className}`}
      style={{
        background: bg || '#161620',
        border: '1px solid rgba(139,126,200,0.08)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function AIProductBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto px-1 sm:px-0">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-4 sm:p-8"
        style={{ background: '#0f1117', minHeight: 480 }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(139,126,200,0.08) 0%, transparent 60%)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 auto-rows-auto sm:auto-rows-[200px]">

          {/* ── Hero: Neural Network (2col × 2row) ── */}
          <Tile className="md:col-span-2 md:row-span-2 justify-between" custom={0}
            bg="linear-gradient(150deg, #1a1630 0%, #0f1117 100%)">

            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-semibold uppercase tracking-widest mb-4"
                  style={{ background: 'rgba(139,126,200,0.12)', color: '#b8a9d4', border: '1px solid rgba(139,126,200,0.2)' }}>
                  <Sparkles size={9} /> AI-Powered
                </div>
                <h2 className="text-[26px] sm:text-[30px] font-bold leading-[1.1] tracking-tight" style={{ color: '#f0ede8' }}>
                  Build smarter<br />products, faster.
                </h2>
                <p className="text-[12px] mt-3 leading-relaxed max-w-[280px]" style={{ color: 'rgba(240,237,232,0.35)' }}>
                  From prompt to production in seconds with our AI-first workflow engine.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-1"
                style={{ background: 'rgba(139,126,200,0.15)', border: '1px solid rgba(139,126,200,0.25)' }}
              >
                <ArrowUpRight size={15} style={{ color: '#b8a9d4' }} />
              </motion.button>
            </div>

            {/* Neural Network */}
            <div className="flex-1 min-h-0 relative">
              <div className="absolute inset-0">
                <NeuralNetwork />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 py-2.5 rounded-2xl text-[12px] font-medium mt-3"
              style={{ background: 'rgba(139,126,200,0.2)', color: '#b8a9d4', border: '1px solid rgba(139,126,200,0.25)' }}
            >
              Start Building <ArrowUpRight size={12} />
            </motion.button>
          </Tile>

          {/* ── Prompt Engine ── */}
          <Tile className="gap-3" custom={1}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(139,126,200,0.12)', border: '1px solid rgba(139,126,200,0.2)' }}>
                <Zap size={12} style={{ color: '#8b7ec8' }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Prompt Engine
              </span>
            </div>
            <p className="font-semibold text-[14px] leading-snug" style={{ color: '#f0ede8' }}>
              Generate any UI from a single sentence.
            </p>
            <div className="flex flex-col gap-1.5 mt-auto">
              {['Dark glass card with avatar', 'Animated pricing toggle', 'Feature bento grid'].map((p, i) => (
                <motion.div key={p}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="px-2.5 py-1.5 rounded-xl text-[10px] font-mono"
                  style={{ background: 'rgba(255,255,255,0.03)', color: 'rgba(240,237,232,0.4)', border: '1px solid rgba(255,255,255,0.04)' }}
                >
                  "{p}"
                  {i === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="inline-block w-[1px] h-3 ml-1 align-middle"
                      style={{ background: '#8b7ec8' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </Tile>

          {/* ── Analytics ── */}
          <Tile className="gap-2" custom={2}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(139,126,200,0.12)', border: '1px solid rgba(139,126,200,0.2)' }}>
                <BarChart3 size={12} style={{ color: '#8b7ec8' }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Analytics
              </span>
            </div>
            <div className="flex items-end gap-3">
              <div>
                <p className="font-bold text-[28px] leading-none" style={{ color: '#f0ede8' }}>
                  <AnimatedCounter value="98.4" suffix="%" />
                </p>
                <p className="text-[10px] mt-1" style={{ color: 'rgba(240,237,232,0.3)' }}>Accuracy rate</p>
              </div>
              <div className="flex items-end gap-[3px] h-10 flex-1">
                {[40, 65, 52, 78, 60, 88, 72, 95].map((h, i) => (
                  <motion.div key={i}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true }}
                    style={{
                      flex: 1, height: `${h}%`, borderRadius: 3,
                      background: i === 7 ? '#8b7ec8' : 'rgba(139,126,200,0.2)',
                      transformOrigin: 'bottom'
                    }}
                  />
                ))}
              </div>
            </div>
          </Tile>

          {/* ── Latency ── */}
          <Tile className="gap-2 justify-between" custom={3}>
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full"
                style={{ background: '#7ec8a4' }}
              />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Latency
              </span>
            </div>
            <div>
              <p className="font-bold text-[32px] leading-none tracking-tight" style={{ color: '#f0ede8' }}>
                &lt;8ms
              </p>
              <p className="text-[10px] mt-1" style={{ color: 'rgba(126,200,164,0.6)' }}>
                Global P99 edge latency
              </p>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(126,200,164,0.08)' }}>
              <motion.div className="h-full rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: '94%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                style={{ background: 'rgba(126,200,164,0.5)' }}
              />
            </div>
          </Tile>

          {/* ── Integrations ── */}
          <Tile className="gap-2" custom={4}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Integrations
              </span>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(139,126,200,0.1)', color: '#b8a9d4' }}>
                200+ apps
              </span>
            </div>
            <div className="grid grid-cols-4 gap-1.5 mt-auto">
              {['Fg', 'Nt', 'Sl', 'Gh', 'Lp', 'Vs', 'Tw', 'Cf'].map((l, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -2, transition: { duration: 0.4 } }}
                  className="aspect-square rounded-xl flex items-center justify-center text-[9px] font-bold"
                  style={{ background: 'rgba(139,126,200,0.06)', color: 'rgba(240,237,232,0.4)', border: '1px solid rgba(139,126,200,0.08)' }}
                >
                  {l}
                </motion.div>
              ))}
            </div>
          </Tile>

          {/* ── Speed ── */}
          <Tile className="gap-2 justify-between" custom={5}>
            <div className="flex items-center gap-2">
              <Zap size={10} style={{ color: 'rgba(126,200,164,0.6)' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Throughput
              </span>
            </div>
            <p className="font-bold text-[26px] leading-none tracking-tight" style={{ color: '#f0ede8' }}>
              4.2M<span className="text-[14px] font-normal" style={{ color: 'rgba(240,237,232,0.3)' }}>/min</span>
            </p>
            {/* Mini sparkline */}
            <svg width="100%" height="30" viewBox="0 0 120 30" className="mt-auto">
              <defs>
                <linearGradient id="aiSparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7ec8a4" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#7ec8a4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path
                d="M0,25 Q15,18 30,20 T60,12 T90,8 T120,14 L120,30 L0,30 Z"
                fill="url(#aiSparkFill)"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
              />
              <motion.path
                d="M0,25 Q15,18 30,20 T60,12 T90,8 T120,14"
                fill="none" stroke="#7ec8a4" strokeWidth="1.2" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
              />
            </svg>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
