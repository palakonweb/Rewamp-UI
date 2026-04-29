import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Cpu, Globe, Layers, Zap, Shield, Database } from 'lucide-react';

/*
 * MorphingShowcaseCarousel
 * Props:
 *   items: { id: string, icon: string, title: string, subtitle: string, features: string[], bgColor: string }[]
 */

const promptContent = `morphing showcase carousel — card background color & border-radius interpolates between states, breathing idle animation, AnimatePresence cross-fade, teal mesh gradient, feature pills`;

const TEAL = '#00CED1';
const SEAFOAM = '#20B2AA';
const ICE = '#E0FFFF';

const ICON_MAP = { Cpu, Globe, Layers, Zap, Shield, Database };

const ITEMS = [
  {
    id: '1', icon: 'Cpu', title: 'Inference Engine', subtitle: 'Run any model at any scale',
    features: ['GPU Clusters', 'Sub-10ms P99', 'Auto-scaling'],
    bgColor: '#0c2020', borderRadius: '24px 48px 24px 48px',
  },
  {
    id: '2', icon: 'Globe', title: 'Global CDN', subtitle: 'Your app, everywhere, instantly',
    features: ['220+ PoPs', 'DDoS Shield', 'Smart Cache'],
    bgColor: '#0c1a20', borderRadius: '48px 24px 48px 24px',
  },
  {
    id: '3', icon: 'Layers', title: 'Storage Layer', subtitle: 'Persistent, replicated, fast',
    features: ['S3 Compatible', '11 9s Durability', 'Hot Tier'],
    bgColor: '#080c20', borderRadius: '24px 24px 48px 48px',
  },
  {
    id: '4', icon: 'Shield', title: 'Security Suite', subtitle: 'Zero-day protection, built-in',
    features: ['mTLS Always', 'WAF Included', 'SOC2 Type II'],
    bgColor: '#101020', borderRadius: '48px 48px 24px 24px',
  },
];

export default function MorphingShowcaseCarouselShowcase() {
  const [copied, setCopied] = useState(false);
  const [current, setCurrent] = useState(0);
  const item = ITEMS[current];
  const IconComp = ICON_MAP[item.icon] || Cpu;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const goPrev = () => setCurrent((current - 1 + ITEMS.length) % ITEMS.length);
  const goNext = () => setCurrent((current + 1) % ITEMS.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex flex-col items-center justify-center py-16 gap-6"
        style={{ background: '#0C0C0C', minHeight: 560 }}
        aria-label="Morphing Showcase Carousel"
      >
        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse at 50% 50%, ${TEAL}12 0%, transparent 65%)`
        }} />

        {/* Morphing card */}
        <motion.div
          key={item.id}
          layout
          layoutId="morphCard"
          animate={{
            background: item.bgColor,
            borderRadius: item.borderRadius,
            scale: [1, 1.012, 1],
          }}
          transition={{
            background: { duration: 0.7, ease: 'easeInOut' },
            borderRadius: { duration: 0.7, ease: 'easeInOut' },
            scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
          }}
          style={{
            width: 360,
            border: `1.5px solid ${TEAL}44`,
            boxShadow: `0 0 60px ${TEAL}22, inset 0 0 40px ${TEAL}08`,
            overflow: 'hidden',
            position: 'relative',
          }}
          aria-live="polite"
        >
          {/* Mesh gradient background */}
          <svg width="360" height="360" className="absolute inset-0 opacity-20 pointer-events-none" aria-hidden="true">
            <defs>
              <filter id="morph-turb">
                <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" seed={current} result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="30" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>
            <ellipse cx="180" cy="180" rx="160" ry="140" fill={TEAL} filter="url(#morph-turb)" />
          </svg>

          <div className="relative z-10 p-8 flex flex-col gap-6 min-h-[320px]">
            {/* Icon badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${item.id}`}
                initial={{ opacity: 0, scale: 0.7, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.7, y: -10 }}
                transition={{ duration: 0.35, type: 'spring', stiffness: 320, damping: 22 }}
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{
                  background: `${TEAL}22`,
                  border: `1.5px solid ${TEAL}55`,
                  boxShadow: `0 0 24px ${TEAL}44`,
                }}
              >
                <IconComp size={24} style={{ color: TEAL }} />
              </motion.div>
            </AnimatePresence>

            {/* Title + Subtitle */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${item.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-2"
              >
                <h2 className="font-black text-white tracking-tight leading-tight" style={{ fontSize: 34 }}>
                  {item.title}
                </h2>
                <p style={{ color: `${ICE}80` }} className="text-[14px]">{item.subtitle}</p>
              </motion.div>
            </AnimatePresence>

            {/* Feature pills */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`pills-${item.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="flex flex-wrap gap-2"
              >
                {item.features.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider"
                    style={{
                      border: `1px solid ${TEAL}44`,
                      background: `${TEAL}0c`,
                      color: TEAL,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center gap-5 z-20 relative">
          <motion.button
            onClick={goPrev}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all"
            style={{ border: `1px solid ${TEAL}55`, color: TEAL, background: `${TEAL}08` }}
            aria-label="Previous card"
          >
            ← Prev
          </motion.button>

          <span className="font-mono text-[14px] font-bold" style={{ color: `${ICE}55` }}>
            {String(current + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}
          </span>

          <motion.button
            onClick={goNext}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all"
            style={{ border: `1px solid ${TEAL}55`, color: TEAL, background: `${TEAL}08` }}
            aria-label="Next card"
          >
            Next →
          </motion.button>
        </div>

        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Morphing Showcase
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
