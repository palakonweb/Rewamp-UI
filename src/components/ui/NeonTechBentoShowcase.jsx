import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, DollarSign, Award, FolderOpen } from 'lucide-react';

/*
 * Developer Tools Bento — Clean dark terminal aesthetic
 * Palette: dark graphite #0e1014, mint #7ec8a4, slate #6b7b8d
 */

const promptContent = `Dark developer tools bento grid with SVG terminal typing animation, monospace code elements, git branch diagram, clean graphite background, muted mint accents, dot-grid pattern, subtle top-edge card highlights, soft entry animations, premium dev-focused SaaS UI`;

// ── SVG Terminal with typing lines ──
function TerminalSVG() {
  const lines = [
    { text: '$ npm install @purrform/ui', color: '#7ec8a4', delay: 0.3 },
    { text: '  ✓ Installing dependencies...', color: '#6b7b8d', delay: 1.0 },
    { text: '  ✓ Built 142 components', color: '#6b7b8d', delay: 1.8 },
    { text: '  → Ready in 0.8s', color: '#7ec8a4', delay: 2.4 },
  ];

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ background: '#0a0c0e', border: '1px solid rgba(126,200,164,0.08)' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <span className="text-[9px] ml-2" style={{ color: 'rgba(255,255,255,0.2)' }}>terminal</span>
      </div>
      {/* Lines */}
      <div className="p-3 flex flex-col gap-1.5 font-mono">
        {lines.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="text-[10px]"
            style={{ color: line.color }}
          >
            {line.text}
          </motion.div>
        ))}
        {/* Blinking cursor */}
        <motion.div className="flex items-center gap-1">
          <span className="text-[10px]" style={{ color: '#7ec8a4' }}>$</span>
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
            className="inline-block w-[6px] h-[12px]"
            style={{ background: '#7ec8a4' }}
          />
        </motion.div>
      </div>
    </div>
  );
}

// ── SVG Git Branch Diagram ──
function GitBranchSVG() {
  return (
    <svg viewBox="0 0 100 80" className="w-full h-full" fill="none">
      {/* Main branch */}
      <motion.line x1="10" y1="40" x2="90" y2="40" stroke="#6b7b8d" strokeWidth="1.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      {/* Feature branch */}
      <motion.path d="M30,40 Q40,20 55,18 T75,40" stroke="#7ec8a4" strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 1.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      {/* Hotfix branch */}
      <motion.path d="M50,40 Q55,58 65,60 T80,40" stroke="#c87e7e" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      {/* Commit dots */}
      {[10, 30, 50, 75, 90].map((x, i) => (
        <motion.circle key={i} cx={x} cy="40" r="3" fill="#0e1014" stroke="#6b7b8d" strokeWidth="1.2"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }} viewport={{ once: true }} />
      ))}
      {/* Feature branch dots */}
      {[45, 55, 65].map((x, i) => (
        <motion.circle key={`f-${i}`} cx={x} cy={20 + i * 2} r="2.5" fill="#0e1014" stroke="#7ec8a4" strokeWidth="1"
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ delay: 1 + i * 0.15, duration: 0.5 }} viewport={{ once: true }} />
      ))}
      {/* Labels */}
      <text x="10" y="52" fill="#6b7b8d" fontSize="5" fontFamily="monospace">main</text>
      <text x="42" y="14" fill="#7ec8a4" fontSize="5" fontFamily="monospace">feature</text>
      <text x="58" y="70" fill="#c87e7e" fontSize="5" fontFamily="monospace">hotfix</text>
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

function Tile({ children, className, custom = 0, bg }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[16px] p-5 flex flex-col ${className}`}
      style={{ background: bg || '#151820', border: '1px solid rgba(126,200,164,0.06)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}
    >
      {/* Top edge highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(126,200,164,0.15), transparent)' }} />
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)', backgroundSize: '14px 14px' }} />
      {children}
    </motion.div>
  );
}

export default function NeonTechBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-6 sm:p-8"
        style={{ background: '#0e1014', minHeight: 640 }}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative z-10 auto-rows-[190px]">

          {/* ── Hero: Terminal (center, 1col × 2row) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="md:col-start-2 md:row-span-2 relative p-[1px] rounded-[18px] overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(126,200,164,0.2), rgba(126,200,164,0.05))' }}
          >
            <div className="w-full h-full rounded-[17px] p-5 flex flex-col gap-4"
              style={{ background: '#111418' }}>
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-[15px]" style={{ color: '#f0ede8' }}>Affiliate Network</h3>
                <motion.div whileHover={{ scale: 1.05 }} className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(126,200,164,0.1)', border: '1px solid rgba(126,200,164,0.15)' }}>
                  <ArrowUpRight size={12} style={{ color: '#7ec8a4' }} />
                </motion.div>
              </div>
              <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(240,237,232,0.35)' }}>
                Deploy automated referral tracking and multi-tier commission system.
              </p>
              <div className="flex-1 min-h-0">
                <TerminalSVG />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 rounded-xl text-[11px] font-semibold"
                style={{ background: 'rgba(126,200,164,0.1)', color: '#7ec8a4', border: '1px solid rgba(126,200,164,0.15)' }}
              >
                Get your referral link
              </motion.button>
            </div>
          </motion.div>

          {/* ── Promo Code (top-left) ── */}
          <Tile className="gap-3 justify-between" custom={0}>
            <div className="flex items-center justify-center flex-1">
              <div className="relative z-10 p-3 rounded-2xl flex items-center gap-3 w-full"
                style={{ background: '#1a1e24', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="font-bold text-[14px]" style={{ color: '#f0ede8' }}>50%</span>
                <div className="h-4 w-[1px]" style={{ background: 'rgba(255,255,255,0.08)' }} />
                <div className="flex gap-1">
                  {[0.5, 0.3, 0.15].map((o, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: `rgba(240,237,232,${o})` }} />
                  ))}
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] mb-0.5" style={{ color: '#f0ede8' }}>Promo Code</h3>
              <p className="text-[10px]" style={{ color: 'rgba(240,237,232,0.3)' }}>Dynamic discount system.</p>
            </div>
          </Tile>

          {/* ── Currency (top-right) ── */}
          <Tile className="gap-3 justify-between" custom={1}>
            <div className="flex items-center justify-center flex-1 relative">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: '#1a1e24', border: '1px solid rgba(255,255,255,0.06)' }}>
                <DollarSign size={16} style={{ color: 'rgba(240,237,232,0.5)' }} />
              </div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: '#151820', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-[10px] font-semibold" style={{ color: 'rgba(240,237,232,0.4)' }}>£</span>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ background: '#151820', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-[10px] font-semibold" style={{ color: 'rgba(240,237,232,0.4)' }}>¥</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] mb-0.5" style={{ color: '#f0ede8' }}>Multi-Currency</h3>
              <p className="text-[10px]" style={{ color: 'rgba(240,237,232,0.3)' }}>Support multiple currencies.</p>
            </div>
          </Tile>

          {/* ── Digital Inventory (bottom-left) ── */}
          <Tile className="gap-3 justify-between" custom={2}>
            <div className="flex items-center justify-center flex-1">
              <div className="w-14 h-10 rounded-lg flex items-center justify-center relative"
                style={{ background: 'linear-gradient(135deg, #1e222a, #151820)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <FolderOpen size={16} style={{ color: 'rgba(240,237,232,0.35)' }} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] mb-0.5" style={{ color: '#f0ede8' }}>Digital Inventory</h3>
              <p className="text-[10px]" style={{ color: 'rgba(240,237,232,0.3)' }}>Automated metadata management.</p>
            </div>
          </Tile>

          {/* ── Rewards (bottom-right) ── */}
          <Tile className="gap-3 justify-between" custom={3}>
            <div className="flex items-center justify-center flex-1 relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute w-16 h-16 rounded-full"
                style={{ border: '1px dashed rgba(126,200,164,0.1)' }}
              />
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center rotate-45"
                style={{ background: 'linear-gradient(135deg, #1e222a, #151820)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <Award size={16} className="-rotate-45" style={{ color: 'rgba(240,237,232,0.4)' }} />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-[13px] mb-0.5" style={{ color: '#f0ede8' }}>Earn Rewards</h3>
              <p className="text-[10px]" style={{ color: 'rgba(240,237,232,0.3)' }}>Tiered reward system.</p>
            </div>
          </Tile>

          {/* ── Git Branch (bottom-center, 2col) ── */}
          <Tile className="md:col-span-2 md:col-start-2" custom={4}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold font-mono uppercase tracking-wider" style={{ color: 'rgba(126,200,164,0.5)' }}>
                Version Control
              </span>
            </div>
            <div className="flex-1 min-h-0">
              <GitBranchSVG />
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
