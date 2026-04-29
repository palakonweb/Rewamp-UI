import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Split text reveal animation where individual characters fly in from random vertical offsets with staggered timing, each character animates independently, dark background, large bold heading, smooth easing with blur transition`;

const text = "Conjure UI";

const charVariants = {
  hidden: (i) => ({
    opacity: 0,
    y: (i % 2 === 0 ? -1 : 1) * (30 + Math.random() * 40),
    rotateZ: (i % 2 === 0 ? -1 : 1) * (5 + Math.random() * 10),
    filter: 'blur(8px)',
  }),
  visible: (i) => ({
    opacity: 1, y: 0, rotateZ: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function SplitTextRevealShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const characters = text.split('');

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: 'linear-gradient(150deg, #120e18 0%, #0a0a0a 100%)' }}>

        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(184,169,212,0.06) 0%, transparent 50%)' }} />

        <p className="text-[10px] uppercase tracking-[0.3em] mb-8 relative z-10" style={{ color: 'rgba(184,169,212,0.4)' }}>Split Reveal</p>

        <div key={key} className="flex justify-center relative z-10">
          {characters.map((char, i) => (
            <motion.span key={i} custom={i} variants={charVariants} initial="hidden" animate="visible"
              className="text-[48px] sm:text-[72px] font-bold tracking-tight leading-none inline-block"
              style={{ color: '#e8e4ef', display: 'inline-block', whiteSpace: 'pre' }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </div>

        <motion.p key={`sub-${key}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-[13px] mt-6 relative z-10"
          style={{ color: 'rgba(232,228,239,0.3)' }}>
          Each character finds its place.
        </motion.p>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setKey(k => k + 1)}
          className="mt-8 px-5 py-2 rounded-full text-[11px] font-medium relative z-10"
          style={{ background: 'rgba(184,169,212,0.1)', color: '#b8a9d4', border: '1px solid rgba(184,169,212,0.2)' }}>
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
