import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Star, Quote } from 'lucide-react';

/*
 * TestimonialCardShowcase — auto-cycling testimonials with animated quote reveal,
 * star rating fill animation, avatar row, and frosted dark card.
 */

const promptContent = `testimonial card — auto-cycling quotes with staggered word reveal animation, animated star fill on transition, avatar row with active indicator, glassmorphic dark card with soft gradient background`;

const TESTIMONIALS = [
  {
    quote: "Conjure UI cut our design-to-code time in half. Every component feels hand-crafted — the animations alone saved us weeks of work.",
    name: 'Sarah Chen', role: 'Head of Design @ Orbit Labs', rating: 5, color: '#a78bfa',
    initials: 'SC',
  },
  {
    quote: "I've tried every component library out there. Nothing comes close to the polish and interaction quality you get out of the box here.",
    name: 'Marcus Webb', role: 'Founding Engineer @ Nexus', rating: 5, color: '#f59e0b',
    initials: 'MW',
  },
  {
    quote: "The dark mode implementation is flawless. Our users' first reaction is always 'how did you build this?' — Conjure makes us look like wizards.",
    name: 'Priya Anand', role: 'Product Lead @ Cipher Systems', rating: 5, color: '#22d3ee',
    initials: 'PA',
  },
  {
    quote: "We shipped our entire dashboard UI in 3 days using Conjure. The Framer Motion integration is exactly what I needed without any of the usual pain.",
    name: 'James Okafor', role: 'CTO @ Pulse Analytics', rating: 5, color: '#4ade80',
    initials: 'JO',
  },
];

export default function TestimonialCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(0);
  const t = TESTIMONIALS[active];

  useEffect(() => {
    const id = setInterval(() => setActive(a => (a + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(id);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center py-16 px-6"
        style={{ background: '#070710', minHeight: 460 }}
      >
        {/* Soft background blob */}
        <motion.div
          key={active}
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ background: `radial-gradient(ellipse at 50% 60%, ${t.color}12 0%, transparent 65%)` }}
        />

        {/* Card */}
        <div className="relative z-10 w-full max-w-xl flex flex-col gap-7"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '36px 32px 28px', backdropFilter: 'blur(20px)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>

          {/* Top accent bar */}
          <div className="absolute inset-x-12 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${t.color}44, transparent)` }} />

          {/* Quote icon */}
          <div className="flex items-center justify-between">
            <motion.div key={`q-${active}`} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
              <Quote size={32} style={{ color: `${t.color}66` }} />
            </motion.div>

            {/* Stars */}
            <div className="flex gap-1" aria-label={`${t.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <Star size={14} style={{ fill: t.color, color: t.color }} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quote text */}
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38 }}
              className="text-white/80 leading-relaxed font-medium"
              style={{ fontSize: 15 }}
            >
              "{t.quote}"
            </motion.blockquote>
          </AnimatePresence>

          {/* Author */}
          <div className="flex items-center justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${active}`}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
                className="flex items-center gap-3"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-black text-[12px]"
                  style={{ background: `${t.color}22`, border: `1.5px solid ${t.color}55`, color: t.color, boxShadow: `0 0 16px ${t.color}33` }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-bold text-white text-[13px] leading-none">{t.name}</p>
                  <p className="text-white/35 text-[11px] mt-0.5">{t.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Avatar dots */}
            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((tm, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial from ${tm.name}`}
                >
                  <motion.div
                    animate={{
                      width: i === active ? 22 : 6,
                      background: i === active ? tm.color : 'rgba(255,255,255,0.15)',
                    }}
                    transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                    style={{ height: 6, borderRadius: 9999 }}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Testimonial</span>
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
