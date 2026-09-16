import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Globe, Shield, Database, BarChart2, Zap } from 'lucide-react';

/*
 * Motion Studio Bento — Dark cinematic with play rings
 * Palette: deep navy #0a0e1a, dusty rose #c9918a, steel #6b7b8d
 */

const promptContent = `Dark cinematic motion studio bento grid with SVG concentric play rings animation, deep navy background, dusty rose accents, card-border highlight on hover, sparkline and progress bars, muted palette, editorial typography, buttery smooth animations, premium SaaS design`;

// ── SVG Play Rings ──
function PlayRingsSVG() {
  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {/* Concentric rings expanding */}
      {[18, 30, 42].map((r, i) => (
        <motion.circle key={i} cx="60" cy="60" r={r} fill="none"
          stroke="#c9918a" strokeWidth={i === 0 ? '1.5' : '0.8'}
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: [0, 0.4 - i * 0.1, 0.4 - i * 0.1] }}
          transition={{ delay: i * 0.3, duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
        />
      ))}
      {/* Outer pulsing ring */}
      <motion.circle cx="60" cy="60" r="50" fill="none" stroke="#c9918a" strokeWidth="0.5"
        animate={{ r: [50, 55, 50], opacity: [0.15, 0.05, 0.15] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Play triangle */}
      <motion.path d="M54,48 L54,72 L74,60 Z" fill="#c9918a"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 0.6, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        style={{ transformOrigin: '60px 60px' }}
      />
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

function Tile({ children, className, custom = 0, accent, bg }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{
        y: -3,
        borderColor: accent ? `${accent}33` : 'rgba(201,145,138,0.12)',
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      className={`relative overflow-hidden rounded-[16px] p-5 flex flex-col gap-3 ${className}`}
      style={{ background: bg || '#101624', border: `1px solid ${accent ? `${accent}11` : 'rgba(201,145,138,0.06)'}`, boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
    >
      {/* Inner glow */}
      {accent && <div className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 30% 0%, ${accent}10 0%, transparent 60%)` }} />}
      {children}
    </motion.div>
  );
}

export default function GradientGlowBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-6 sm:p-8"
        style={{ background: '#0a0e1a', minHeight: 580 }}>

        {/* Ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 40% 50%, rgba(201,145,138,0.06) 0%, transparent 55%)' }} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 auto-rows-[190px]">

          {/* ── Hero (2col) ── */}
          <Tile className="md:col-span-2 justify-between" custom={0} accent="#c9918a"
            bg="linear-gradient(135deg, #121830 0%, #0a0e1a 100%)">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-2xl flex items-center justify-center"
                    style={{ background: 'rgba(201,145,138,0.12)', border: '1px solid rgba(201,145,138,0.2)' }}>
                    <Zap size={14} style={{ color: '#c9918a' }} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>
                    Automation Engine
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-1.5 h-1.5 rounded-full" style={{ background: '#7ec8a4' }} />
                <span className="text-[10px]" style={{ color: 'rgba(240,237,232,0.25)' }}>Live</span>
              </div>
            </div>
            <div>
              <h2 className="font-bold text-[24px] leading-tight tracking-tight" style={{ color: '#f0ede8' }}>
                Automate anything. <span style={{ color: '#c9918a' }}>Ship everything.</span>
              </h2>
              <p className="text-[11px] mt-2 max-w-sm leading-relaxed" style={{ color: 'rgba(240,237,232,0.3)' }}>
                From triggers to transformations — build complex workflows in minutes.
              </p>
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 rounded-2xl font-semibold text-[11px] w-fit"
              style={{ background: 'rgba(201,145,138,0.2)', color: '#c9918a', border: '1px solid rgba(201,145,138,0.25)' }}>
              See Demo <ArrowUpRight size={11} />
            </motion.button>
          </Tile>

          {/* ── Play Rings (1col, 2row) ── */}
          <Tile className="md:row-span-2 items-center justify-center" custom={1} accent="#c9918a">
            <PlayRingsSVG />
          </Tile>

          {/* ── AI Insights ── */}
          <Tile className="" custom={2} accent="#8b7ec8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(139,126,200,0.12)', border: '1px solid rgba(139,126,200,0.2)' }}>
                <BarChart2 size={11} style={{ color: '#8b7ec8' }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>AI Insights</span>
            </div>
            <div className="flex flex-col gap-1.5 mt-auto">
              {[['Anomaly detected', '2s ago', '#c9918a'], ['Model retrained', '5m ago', '#8b7ec8'], ['Forecast ready', '1h ago', '#7ec8c8']].map(([l, t, c]) => (
                <div key={l} className="flex items-center justify-between p-2 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: c }} />
                    <span className="text-[10px]" style={{ color: 'rgba(240,237,232,0.5)' }}>{l}</span>
                  </div>
                  <span className="text-[9px]" style={{ color: 'rgba(240,237,232,0.2)' }}>{t}</span>
                </div>
              ))}
            </div>
          </Tile>

          {/* ── Integrations ── */}
          <Tile custom={3} accent="#7ec8c8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(126,200,200,0.1)', border: '1px solid rgba(126,200,200,0.18)' }}>
                <Globe size={11} style={{ color: '#7ec8c8' }} />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Integrations</span>
            </div>
            <p className="font-semibold text-[13px]" style={{ color: '#f0ede8' }}>Connect your entire stack.</p>
            <div className="flex gap-1.5 flex-wrap mt-auto">
              {['Stripe', 'GitHub', 'Slack', 'Notion', 'Vercel'].map(n => (
                <span key={n} className="px-2 py-1 rounded-lg text-[9px] font-semibold"
                  style={{ background: 'rgba(126,200,200,0.06)', color: 'rgba(240,237,232,0.4)', border: '1px solid rgba(126,200,200,0.1)' }}>
                  {n}
                </span>
              ))}
            </div>
          </Tile>

          {/* ── Security ── */}
          <Tile custom={4} accent="#8b7ec8">
            <div className="flex items-center gap-2">
              <Shield size={11} style={{ color: '#8b7ec8' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Security</span>
            </div>
            <p className="font-semibold text-[13px]" style={{ color: '#f0ede8' }}>Zero-trust by default.</p>
            <div className="grid grid-cols-2 gap-1 mt-auto">
              {['SOC2', 'HIPAA', 'GDPR', 'ISO27001'].map(c => (
                <div key={c} className="flex items-center gap-1.5 p-1.5 rounded-lg"
                  style={{ background: 'rgba(139,126,200,0.05)', border: '1px solid rgba(139,126,200,0.08)' }}>
                  <Shield size={8} style={{ color: '#8b7ec8' }} />
                  <span className="text-[9px] font-semibold" style={{ color: 'rgba(240,237,232,0.4)' }}>{c}</span>
                </div>
              ))}
            </div>
          </Tile>

          {/* ── Data Storage ── */}
          <Tile custom={5} accent="#7ec8a4">
            <div className="flex items-center gap-2">
              <Database size={11} style={{ color: '#7ec8a4' }} />
              <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(240,237,232,0.3)' }}>Data</span>
            </div>
            <div>
              <p className="font-bold text-[26px] leading-none" style={{ color: '#f0ede8' }}>1 PB</p>
              <p className="text-[10px] mt-0.5" style={{ color: 'rgba(126,200,164,0.5)' }}>11 nines durability</p>
            </div>
            <div className="flex gap-[3px] items-end mt-auto" style={{ height: 24 }}>
              {[90, 72, 88, 65, 95, 80, 98].map((v, i) => (
                <motion.div key={i}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                  style={{ flex: 1, height: `${v}%`, borderRadius: 2, background: i === 6 ? '#7ec8a4' : 'rgba(126,200,164,0.18)', transformOrigin: 'bottom' }}
                />
              ))}
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
