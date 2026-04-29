import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Animated count-up number statistics with eased counting, large bold numbers with suffixes, stats row layout, scroll-triggered animation, dark background, muted cyan and amber accents, premium SaaS dashboard feel`;

function CountUp({ target, prefix = '', suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const dur = 2000;
    const steps = 80;
    const inc = target / steps;
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= target) { setVal(target); clearInterval(id); }
      else setVal(decimals ? Math.round(cur * 10) / 10 : Math.floor(cur));
    }, dur / steps);
    return () => clearInterval(id);
  }, [inView, target, decimals]);

  return (
    <span ref={ref}>
      {prefix}{inView ? (decimals ? val.toFixed(decimals) : val.toLocaleString()) : 0}{suffix}
    </span>
  );
}

const stats = [
  { label: 'Active Users', value: 12847, suffix: '+', color: '#7ec8c8' },
  { label: 'Uptime', value: 99.9, suffix: '%', decimals: 1, color: '#7ec8a4' },
  { label: 'Revenue', value: 4.2, prefix: '$', suffix: 'M', decimals: 1, color: '#c8a87e' },
  { label: 'Components', value: 248, suffix: '+', color: '#b8a9d4' },
];

export default function CountUpTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: '#0f1117' }}>

        <p className="text-[10px] uppercase tracking-[0.3em] mb-8" style={{ color: 'rgba(240,237,232,0.3)' }}>Count Up</p>

        <div key={key} className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-12 w-full max-w-2xl">
          {stats.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center"
            >
              <p className="text-[32px] sm:text-[40px] font-bold leading-none tracking-tight" style={{ color: s.color }}>
                <CountUp target={s.value} prefix={s.prefix || ''} suffix={s.suffix || ''} decimals={s.decimals || 0} />
              </p>
              <p className="text-[11px] mt-2 font-medium uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setKey(k => k + 1)}
          className="mt-10 px-5 py-2 rounded-full text-[11px] font-medium"
          style={{ background: 'rgba(126,200,200,0.1)', color: '#7ec8c8', border: '1px solid rgba(126,200,200,0.2)' }}>
          Replay
        </motion.button>
      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0"><p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p><code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
