import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, TrendingUp, Zap } from 'lucide-react';

/*
 * Product Launch Bento — Warm cream with sage accent
 * Inspired by: Ref 1 (hearing tech bento) — clean layout, one bold accent tile
 * Palette: warm cream #faf8f4, sage #7c9a82, charcoal #2a2a2e
 */

const promptContent = `Light SaaS feature bento grid with warm cream background, one bold sage green accent hero card, smaller feature cards for collaboration, progress tracking, and integrations, avatar stack, animated bar chart, SVG vine illustration, clean sans-serif typography, premium editorial design`;

// ── SVG Growing Vine ──
function VineSVG() {
  return (
    <svg viewBox="0 0 100 140" className="w-20 h-28 shrink-0" fill="none">
      {/* Main stem */}
      <motion.path
        d="M50,140 Q50,110 48,90 Q46,70 50,55 Q54,40 50,25 Q48,15 50,5"
        stroke="#7c9a82" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
      />
      {/* Leaves */}
      {[
        { d: 'M48,90 Q35,82 30,75 Q38,78 48,90', delay: 0.8 },
        { d: 'M52,75 Q65,68 70,60 Q62,65 52,75', delay: 1.1 },
        { d: 'M48,55 Q32,48 28,40 Q36,44 48,55', delay: 1.4 },
        { d: 'M52,40 Q68,34 72,26 Q64,30 52,40', delay: 1.7 },
        { d: 'M48,25 Q35,18 32,10 Q38,14 48,25', delay: 2.0 },
      ].map((leaf, i) => (
        <motion.path key={i} d={leaf.d} fill="#7c9a82"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          transition={{ delay: leaf.delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          style={{ transformOrigin: 'center' }}
        />
      ))}
      {/* Small berries */}
      <motion.circle cx="30" cy="75" r="2" fill="#7c9a82" opacity="0.3"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        transition={{ delay: 2.2, duration: 0.5 }} viewport={{ once: true }} />
      <motion.circle cx="72" cy="26" r="2" fill="#7c9a82" opacity="0.3"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        transition={{ delay: 2.4, duration: 0.5 }} viewport={{ once: true }} />
    </svg>
  );
}

// ── Tile ──
const tileV = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0, style }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.06)', transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[20px] flex flex-col ${className}`}
      style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', ...style }}
    >
      {children}
    </motion.div>
  );
}

export default function SaaSFeatureBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const avatarColors = ['#e8c8a4', '#a4c8e8', '#c8a4e8', '#a4e8c8'];

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/[0.04] p-6 sm:p-8"
        style={{ background: '#faf8f4', minHeight: 580 }}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 auto-rows-[190px]">

          {/* ── Hero: Sage accent card (1col × 2row) ── */}
          <Tile className="md:row-span-2 p-6 justify-between" custom={0}
            style={{ background: '#7c9a82', border: 'none' }}>
            <div>
              <div className="w-9 h-9 rounded-2xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(0,0,0,0.1)' }}>
                <Zap size={16} style={{ color: '#2a2a2e' }} />
              </div>
              <h2 className="text-[22px] font-bold leading-tight tracking-tight mb-2" style={{ color: '#fff' }}>
                Maximum creativity.
              </h2>
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                Engage your audience with your unique style — no limits, no compromises.
              </p>
            </div>
            <div className="flex items-end justify-between mt-auto">
              <VineSVG />
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-[12px]"
                style={{ background: '#2a2a2e', color: '#fff' }}
              >
                Explore <ArrowUpRight size={12} />
              </motion.button>
            </div>
          </Tile>

          {/* ── Invite People (2col) ── */}
          <Tile className="md:col-span-2 p-6 gap-3" custom={1}>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'rgba(42,42,46,0.35)' }}>
              Collaboration
            </span>
            <div className="flex items-center gap-2">
              {avatarColors.map((c, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[12px] border-2 border-white"
                  style={{ marginLeft: i ? -10 : 0, background: c, color: '#2a2a2e', zIndex: 10 - i }}
                >
                  {String.fromCharCode(65 + i)}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                viewport={{ once: true }}
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-[10px] border-2 border-white"
                style={{ marginLeft: -10, background: 'rgba(0,0,0,0.04)', color: 'rgba(42,42,46,0.4)', border: '1px solid rgba(0,0,0,0.08)' }}
              >
                +8
              </motion.div>
              <span className="ml-2 px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{ background: 'rgba(124,154,130,0.1)', color: '#7c9a82', border: '1px solid rgba(124,154,130,0.2)' }}>
                Eliah
              </span>
            </div>
            <h3 className="font-bold text-[16px]" style={{ color: '#2a2a2e' }}>Invite people</h3>
          </Tile>

          {/* ── Design Iterations ── */}
          <Tile className="p-5 justify-between" custom={2}>
            <div>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center mb-2"
                style={{ background: 'rgba(124,154,130,0.1)', border: '1px solid rgba(124,154,130,0.15)' }}>
                <TrendingUp size={12} style={{ color: '#7c9a82' }} />
              </div>
              <h3 className="font-bold text-[14px] mb-0.5" style={{ color: '#2a2a2e' }}>Design iterations</h3>
              <p className="text-[10px]" style={{ color: 'rgba(42,42,46,0.4)' }}>As many tweaks as you need.</p>
            </div>
            {/* Sparkline */}
            <svg width="100%" height="28" viewBox="0 0 120 28" className="mt-auto">
              <motion.polyline
                points="0,24 20,17 40,21 60,9 80,13 100,4 120,8"
                fill="none" stroke="#7c9a82" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
                transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
              />
              <motion.circle cx="120" cy="8" r="3" fill="#7c9a82"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.5 }} viewport={{ once: true }} />
            </svg>
          </Tile>

          {/* ── Track Progress ── */}
          <Tile className="p-5 justify-between" custom={3}>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#7c9a82' }}>Growth</span>
              <TrendingUp size={11} style={{ color: '#7c9a82' }} />
            </div>
            <div className="flex items-end gap-[3px] flex-1 mt-3">
              {[30, 50, 40, 70, 55, 85, 65, 90, 75, 95].map((h, i) => (
                <motion.div key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  style={{ flex: 1, height: `${h * 0.6}%`, borderRadius: 3, background: i >= 8 ? '#7c9a82' : 'rgba(124,154,130,0.25)', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
            <div>
              <h3 className="font-bold text-[13px]" style={{ color: '#2a2a2e' }}>Track progress</h3>
              <p className="text-[10px]" style={{ color: 'rgba(42,42,46,0.35)' }}>Blazing fast delivery.</p>
            </div>
          </Tile>

          {/* ── Custom Support ── */}
          <Tile className="p-5 gap-2" custom={4}>
            <div className="flex items-start gap-2 p-2.5 rounded-xl" style={{ background: 'rgba(0,0,0,0.02)' }}>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: '#e8c8a4', color: '#2a2a2e' }}>T</div>
              <div>
                <p className="text-[9px]" style={{ color: 'rgba(42,42,46,0.4)' }}>Trina says:</p>
                <p className="text-[10px] font-medium" style={{ color: '#2a2a2e' }}>"Hey there! How can I help you?"</p>
              </div>
            </div>
            <h3 className="font-bold text-[13px] mt-auto" style={{ color: '#2a2a2e' }}>Custom support</h3>
          </Tile>

          {/* ── Integrations ── */}
          <Tile className="p-5 gap-2" custom={5}>
            <div className="grid grid-cols-3 gap-1.5">
              {['Fg', 'Nt', 'Sl', '✦', 'Gh', '💬'].map((l, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="aspect-square rounded-xl flex items-center justify-center text-[11px] font-bold"
                  style={{ background: 'rgba(0,0,0,0.03)', color: 'rgba(42,42,46,0.4)', border: '1px solid rgba(0,0,0,0.05)' }}
                >
                  {l}
                </motion.div>
              ))}
            </div>
            <div className="mt-auto">
              <h3 className="font-bold text-[13px]" style={{ color: '#2a2a2e' }}>100% Integrated</h3>
              <p className="text-[10px]" style={{ color: 'rgba(42,42,46,0.35)' }}>Connect all your apps.</p>
            </div>
          </Tile>

          {/* ── Fast Iterations ── */}
          <Tile className="p-5 gap-2" custom={6}>
            <div className="flex items-center gap-2 p-2 rounded-xl" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: '#2a2a2e' }}>
                <Zap size={10} style={{ color: '#7c9a82' }} />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#7c9a82' }} />
                  <span className="text-[8px]" style={{ color: 'rgba(42,42,46,0.35)' }}>NEW</span>
                </div>
                <p className="text-[10px] font-semibold" style={{ color: '#2a2a2e' }}>Latest design</p>
              </div>
            </div>
            <h3 className="font-bold text-[13px] mt-auto" style={{ color: '#2a2a2e' }}>Fast iterations</h3>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
