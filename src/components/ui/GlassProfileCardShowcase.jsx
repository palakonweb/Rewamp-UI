import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, MessageCircle, UserPlus, Link2, MapPin, Star, Users, FolderOpen } from 'lucide-react';

/*
 * GlassProfileCard — frosted-glass floating profile card with ambient aurora blob background
 * Three palette variants: Dark · Light · Accent
 */

const promptContent = `glassmorphism profile card — frosted glass with backdrop-blur floating above soft blurred aurora blob background, circular avatar, stats row with hover lift, pill action buttons, ambient grain texture`;

const VARIANTS = {
  dark:   { label: 'Dark',   bg: '#06060f', b1: '#1e0a5ecc', b2: '#0a2a6ecc', b3: '#1a0e60cc', card: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.10)', shadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)', tp: '#fff', ts: 'rgba(255,255,255,0.42)', statBg: 'rgba(255,255,255,0.06)', statBorder: 'rgba(255,255,255,0.08)', btn: 'rgba(255,255,255,0.07)', btnB: 'rgba(255,255,255,0.10)', btnT: 'rgba(255,255,255,0.72)', accent: '#a78bfa', avatarRing: 'rgba(255,255,255,0.14)' },
  light:  { label: 'Light',  bg: '#f0ede8', b1: '#e8d5f5cc', b2: '#d5e5ffcc', b3: '#f5d5e8cc', card: 'rgba(255,255,255,0.58)', border: 'rgba(255,255,255,0.85)', shadow: '0 32px 80px rgba(0,0,0,0.09), inset 0 1px 0 rgba(255,255,255,0.9)', tp: '#0f0f14', ts: 'rgba(15,15,20,0.42)', statBg: 'rgba(255,255,255,0.65)', statBorder: 'rgba(0,0,0,0.06)', btn: 'rgba(0,0,0,0.04)', btnB: 'rgba(0,0,0,0.07)', btnT: 'rgba(0,0,0,0.62)', accent: '#7c3aed', avatarRing: 'rgba(255,255,255,0.9)' },
  accent: { label: 'Accent', bg: '#050916', b1: '#0c2a6ecc', b2: '#1a0060cc', b3: '#0a3a8ecc', card: 'rgba(14,30,80,0.45)', border: 'rgba(100,140,255,0.18)', shadow: '0 32px 80px rgba(10,20,60,0.7), inset 0 1px 0 rgba(100,140,255,0.12)', tp: '#e8efff', ts: 'rgba(180,200,255,0.48)', statBg: 'rgba(80,120,255,0.10)', statBorder: 'rgba(80,120,255,0.15)', btn: 'rgba(80,120,255,0.10)', btnB: 'rgba(80,120,255,0.18)', btnT: 'rgba(180,200,255,0.78)', accent: '#60a5fa', avatarRing: 'rgba(100,160,255,0.3)' },
};

function StatChip({ label, value, icon: Icon, v }) {
  return (
    <motion.div whileHover={{ scale: 1.06, y: -2 }} transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      className="flex flex-col items-center gap-1 px-4 py-2.5 rounded-2xl cursor-default select-none flex-1"
      style={{ background: v.statBg, border: `1px solid ${v.statBorder}` }}>
      <Icon size={12} style={{ color: v.accent }} />
      <span className="font-black text-[16px] leading-none" style={{ color: v.tp }}>{value}</span>
      <span className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: v.ts }}>{label}</span>
    </motion.div>
  );
}

export default function GlassProfileCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [variant, setVariant] = useState('dark');
  const v = VARIANTS[variant];

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center" style={{ minHeight: 500, background: v.bg }}>

        {/* Blurred aurora blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <motion.div animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-[420px] h-[420px] rounded-full" style={{ background: v.b1, filter: 'blur(90px)', top: '-10%', left: '-5%' }} />
          <motion.div animate={{ x: [0, -50, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute w-[360px] h-[360px] rounded-full" style={{ background: v.b2, filter: 'blur(80px)', bottom: '-10%', right: '-5%' }} />
          <motion.div animate={{ x: [0, 30, -20, 0], y: [0, 20, -30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            className="absolute w-[300px] h-[300px] rounded-full" style={{ background: v.b3, filter: 'blur(100px)', top: '30%', right: '20%' }} />
        </div>

        {/* Variant pills */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5">
          {Object.entries(VARIANTS).map(([k, val]) => (
            <button key={k} onClick={() => setVariant(k)}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{ background: variant === k ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${variant === k ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)'}`, color: variant === k ? '#fff' : 'rgba(255,255,255,0.42)', backdropFilter: 'blur(12px)' }}>
              {val.label}
            </button>
          ))}
        </div>

        {/* Glass card */}
        <AnimatePresence mode="wait">
          <motion.div key={variant} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-5 w-[320px] my-12"
            style={{ background: v.card, border: `1px solid ${v.border}`, borderRadius: 24, boxShadow: v.shadow, backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)', padding: '28px 20px 20px' }}>
            <div className="absolute inset-x-6 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${v.border}, transparent)` }} />

            {/* Avatar */}
            <div className="relative">
              <div className="w-18 h-18 rounded-full flex items-center justify-center font-black text-2xl"
                style={{ width: 72, height: 72, background: `linear-gradient(135deg, ${v.accent}55, ${v.accent}22)`, border: `2.5px solid ${v.avatarRing}`, boxShadow: `0 8px 28px ${v.accent}33`, color: v.accent }}>A</div>
              <div className="absolute bottom-1 right-0.5 w-3 h-3 rounded-full border-2" style={{ background: '#22c55e', borderColor: v.bg }} />
            </div>

            <div className="text-center">
              <h3 className="font-black text-[18px] tracking-tight" style={{ color: v.tp }}>Alex Mercer</h3>
              <p className="text-[11px] mt-0.5" style={{ color: v.ts }}>Product Designer & Creative Director</p>
              <div className="flex items-center justify-center gap-1 mt-1.5">
                <MapPin size={9} style={{ color: v.accent }} />
                <span className="text-[10px]" style={{ color: v.ts }}>San Francisco, CA</span>
              </div>
            </div>

            <div className="flex gap-2 w-full">
              <StatChip label="Projects" value="142" icon={FolderOpen} v={v} />
              <StatChip label="Followers" value="8.4k" icon={Users} v={v} />
              <StatChip label="Stars" value="2.1k" icon={Star} v={v} />
            </div>

            <div className="flex flex-wrap gap-1.5 justify-center">
              {['Motion Design', 'Glassmorphism', 'Systems'].map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                  style={{ background: v.btn, border: `1px solid ${v.btnB}`, color: v.btnT }}>{tag}</span>
              ))}
            </div>

            <div className="flex gap-2 w-full">
              {[{ icon: MessageCircle, label: 'Message' }, { icon: Link2, label: 'Portfolio' }].map(({ icon: Icon, label }) => (
                <motion.button key={label} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-1.5 flex-1 py-2.5 rounded-2xl text-[11px] font-semibold"
                  style={{ background: v.btn, border: `1px solid ${v.btnB}`, color: v.btnT }}>
                  <Icon size={12} style={{ color: v.accent }} />{label}
                </motion.button>
              ))}
            </div>

            <motion.button whileHover={{ scale: 1.03, boxShadow: `0 8px 28px ${v.accent}33` }} whileTap={{ scale: 0.97 }}
              className="w-full py-2.5 rounded-2xl text-[12px] font-bold flex items-center justify-center gap-2"
              style={{ background: v.btn, border: `1px solid ${v.btnB}`, color: v.tp }}>
              <UserPlus size={13} style={{ color: v.accent }} />Follow Alex
            </motion.button>
          </motion.div>
        </AnimatePresence>

        <span className="absolute bottom-4 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">Glass Profile</span>
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
