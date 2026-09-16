import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Layers, MessageCircle, Code2 } from 'lucide-react';

/*
 * Enterprise Platform Bento — Bold typography grid
 * Inspired by: Ref 2 (Universe "UNLOCKED" layout)
 * Palette: off-white #f0ede8, royal blue #4a5ec8, charcoal #1a1a2e
 */

const promptContent = `Bold enterprise bento grid with large condensed heading, clean off-white background, dark charcoal border, one royal blue accent card, two neutral cards with tag pills, corner arrow links, subtle mouse spotlight, strong typographic hierarchy, editorial design, premium SaaS UI`;

// ── Mouse-follow spotlight for the grid ──
function useMouseSpotlight(containerRef) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spotX = useSpring(mx, { stiffness: 80, damping: 25 });
  const spotY = useSpring(my, { stiffness: 80, damping: 25 });

  const onMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return { spotX, spotY, onMove, onLeave };
}

// ── Arrow link that draws on hover ──
function ArrowLink({ color = '#1a1a2e' }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-8 h-8 rounded-full flex items-center justify-center"
      style={{ border: `1.5px solid ${color}`, opacity: 0.5 }}
    >
      <ArrowUpRight size={14} style={{ color }} />
    </motion.div>
  );
}

// ── Tag Pill ──
function TagPill({ label, delay = 0, dark = false }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      className="inline-flex px-3 py-1.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
      style={{
        background: dark ? 'rgba(255,255,255,0.1)' : 'rgba(74,94,200,0.1)',
        color: dark ? 'rgba(255,255,255,0.7)' : '#4a5ec8',
        border: dark ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(74,94,200,0.2)',
      }}
    >
      {label}
    </motion.span>
  );
}

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export default function InteractiveCardsBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const gridRef = useRef(null);
  const { spotX, spotY, onMove, onLeave } = useMouseSpotlight(gridRef);
  const spotBg = useTransform([spotX, spotY], ([x, y]) =>
    `radial-gradient(circle 300px at ${x * 100}% ${y * 100}%, rgba(74,94,200,0.04) 0%, transparent 100%)`
  );

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div
        ref={gridRef}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative w-full rounded-[24px] overflow-hidden p-6 sm:p-10"
        style={{ background: '#f0ede8', border: '2px solid #1a1a2e', minHeight: 700 }}
      >
        {/* Mouse spotlight overlay */}
        <motion.div className="absolute inset-0 pointer-events-none z-0" style={{ background: spotBg }} />

        {/* ── Navbar ── */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10 relative z-10"
        >
          <span className="text-[13px] font-medium tracking-[0.3em] uppercase" style={{ color: '#1a1a2e' }}>
            Universe
          </span>
          <div className="flex items-center gap-6">
            <span className="px-4 py-1.5 rounded-full text-[11px] font-semibold"
              style={{ border: '1.5px solid #1a1a2e', color: '#1a1a2e' }}>
              Universal Software ●
            </span>
            <span className="text-[11px] font-medium hidden sm:inline" style={{ color: '#1a1a2e' }}>Our Features</span>
            <span className="text-[11px] font-medium hidden sm:inline" style={{ color: '#1a1a2e' }}>Pricing List</span>
          </div>
        </motion.div>

        {/* ── Hero Heading ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative z-10"
          style={{ borderBottom: '1px solid rgba(26,26,46,0.1)', paddingBottom: 32 }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-[48px] sm:text-[64px] leading-[0.9] tracking-tighter font-black uppercase"
            style={{ color: '#1a1a2e', fontFamily: 'system-ui, -apple-system, sans-serif' }}
          >
            Unlocked
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-[11px] leading-relaxed max-w-[260px] uppercase tracking-wider"
            style={{ color: 'rgba(26,26,46,0.4)' }}
          >
            Modern network programming standards based on the universe and global connections. —
          </motion.p>
        </div>

        {/* ── Three Column Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10">

          {/* Services — Blue accent card */}
          <motion.div
            custom={0} variants={tileVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
            className="rounded-[16px] p-6 flex flex-col justify-between min-h-[280px]"
            style={{ background: '#4a5ec8' }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Space Planner
              </p>
              <h3 className="text-[24px] font-bold leading-tight tracking-tight mb-4" style={{ color: '#fff' }}>
                Services
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <TagPill label="Modules" delay={0.4} dark />
                <TagPill label="Analysis" delay={0.5} dark />
              </div>
            </div>
            <div className="mt-auto pt-6">
              <p className="text-[10px] uppercase tracking-wider leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Data analysis and artificial intelligence used in various fields of science —
              </p>
              <ArrowLink color="#fff" />
            </div>
          </motion.div>

          {/* Social Media — Dark card */}
          <motion.div
            custom={1} variants={tileVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
            className="rounded-[16px] p-6 flex flex-col justify-between min-h-[280px]"
            style={{ background: '#1a1a2e' }}
          >
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Meetings
              </p>
              <h3 className="text-[24px] font-bold leading-tight tracking-tight mb-4" style={{ color: '#f0ede8' }}>
                Social Media
              </h3>
              <div className="flex flex-wrap gap-1.5">
                <TagPill label="Community" delay={0.5} dark />
              </div>
            </div>
            <div className="mt-auto pt-6">
              <p className="text-[10px] uppercase tracking-wider leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
                Global social network covering education and health and web software development —
              </p>
              <ArrowLink color="#f0ede8" />
            </div>
          </motion.div>

          {/* Technology — Dark with gradient overlay */}
          <motion.div
            custom={2} variants={tileVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}
            whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
            className="rounded-[16px] p-6 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
            style={{ background: '#24243a' }}
          >
            {/* Subtle tech pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />

            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Social Technology
              </p>
              <div className="flex flex-wrap gap-1.5">
                <TagPill label="Metaverse" delay={0.5} dark />
                <TagPill label="Blog" delay={0.6} dark />
                <TagPill label="System" delay={0.7} dark />
              </div>
            </div>

            {/* SVG abstract circuit */}
            <div className="absolute top-[30%] right-4 w-32 h-32 opacity-10 pointer-events-none">
              <svg viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="30" stroke="#fff" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="15" stroke="#fff" strokeWidth="0.5" />
                <line x1="20" y1="50" x2="80" y2="50" stroke="#fff" strokeWidth="0.3" />
                <line x1="50" y1="20" x2="50" y2="80" stroke="#fff" strokeWidth="0.3" />
              </svg>
            </div>

            <div className="mt-auto pt-6 relative z-10">
              <p className="text-[11px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Using artificial intelligence technologies to research and develop science and security — Machine learning (ML) and implementation of monitoring systems.
              </p>
              <ArrowLink color="#f0ede8" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
