import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Layers, Box } from 'lucide-react';

/*
 * Design System Bento — Dark plum with morphing blob
 * Palette: dark plum #120e18, lavender #b8a9d4, pearl #e8e4ef
 */

const promptContent = `Dark plum design system bento grid with SVG morphing organic blob, soft lavender accents, floating 3D-like shapes with subtle rotation, parallax depth, ambient gradient glow, pearl text on dark background, unhurried animations, premium design tool aesthetic`;

// ── SVG Morphing Blob ──
function MorphingBlob() {
  const path1 = 'M44,14 C58,8 78,18 84,34 C90,50 82,72 66,80 C50,88 28,82 18,66 C8,50 14,28 28,18 C34,14 38,16 44,14 Z';
  const path2 = 'M48,10 C66,6 82,22 88,40 C94,58 80,78 62,84 C44,90 22,78 14,60 C6,42 18,20 34,12 C42,8 44,12 48,10 Z';

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <radialGradient id="blobGrad" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#e8e4ef" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#b8a9d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#120e18" stopOpacity="0.4" />
        </radialGradient>
        <filter id="blobShadow">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#b8a9d4" floodOpacity="0.15" />
        </filter>
      </defs>
      <motion.path
        fill="url(#blobGrad)"
        filter="url(#blobShadow)"
        stroke="#b8a9d4"
        strokeWidth="0.5"
        strokeOpacity="0.3"
        animate={{ d: [path1, path2, path1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Inner highlight edge */}
      <motion.path
        fill="none"
        stroke="#e8e4ef"
        strokeWidth="0.3"
        strokeOpacity="0.15"
        animate={{ d: [path1, path2, path1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

// ── SVG Torus Ring ──
function TorusRing({ color = '#b8a9d4', size = 100 }) {
  const id = `torus-${color.replace('#', '')}`;
  return (
    <motion.svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full"
      animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}>
      <defs>
        <radialGradient id={id} cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
          <stop offset="50%" stopColor={color} stopOpacity="0.6" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 14} fill="none"
        stroke={`url(#${id})`} strokeWidth="12" />
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 14} fill="none"
        stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3 6" opacity="0.4" />
    </motion.svg>
  );
}

// ── SVG Sphere ──
function Sphere({ color = '#c9918a', size = 80 }) {
  const id = `sphere-${color.replace('#', '')}`;
  return (
    <motion.svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full"
      animate={{ y: [-4, 4, -4] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
          <stop offset="40%" stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={size / 2 - 4} fill={`url(#${id})`} />
    </motion.svg>
  );
}

// ── Tile ──
const tileV = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0, bg }) {
  return (
    <motion.div custom={custom} variants={tileV} initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[16px] p-5 flex flex-col ${className}`}
      style={{
        background: bg || 'rgba(255,255,255,0.02)',
        border: '1px solid rgba(184,169,212,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Soft3DBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-6 sm:p-8"
        style={{ background: '#120e18', minHeight: 580 }}>

        {/* Ambient lighting */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-[10%] w-80 h-80 rounded-full blur-[100px]"
            style={{ background: 'rgba(139,126,200,0.08)' }} />
          <div className="absolute bottom-0 left-[15%] w-80 h-80 rounded-full blur-[100px]"
            style={{ background: 'rgba(126,164,200,0.06)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-3 relative z-10 auto-rows-[200px]">

          {/* ── Hero: Morphing Blob (4col × 2row) ── */}
          <Tile className="md:col-span-4 md:row-span-2 justify-between" custom={0}
            bg="linear-gradient(150deg, #1a1428 0%, #120e18 100%)">
            <div className="flex items-start justify-between z-10 relative">
              <div>
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(184,169,212,0.08)', border: '1px solid rgba(184,169,212,0.12)' }}>
                  <Box size={16} style={{ color: '#b8a9d4' }} />
                </div>
                <h2 className="font-bold text-[26px] sm:text-[30px] leading-[1.1] tracking-tight" style={{ color: '#e8e4ef' }}>
                  Tangible<br />Interactions.
                </h2>
                <p className="text-[12px] mt-3 max-w-xs leading-relaxed" style={{ color: 'rgba(232,228,239,0.35)' }}>
                  Bring depth and realism to your digital interfaces. A new dimension of design.
                </p>
              </div>
              <motion.button whileHover={{ scale: 1.05 }} transition={{ duration: 0.4 }}
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ background: 'rgba(232,228,239,0.08)', border: '1px solid rgba(232,228,239,0.12)' }}>
                <ArrowUpRight size={16} style={{ color: '#e8e4ef' }} />
              </motion.button>
            </div>

            {/* Morphing blob in the background */}
            <div className="absolute bottom-[-15%] right-[-10%] w-[260px] h-[260px] opacity-80">
              <MorphingBlob />
            </div>
          </Tile>

          {/* ── Torus: Soft Shadows ── */}
          <Tile className="md:col-span-2" custom={1} bg="linear-gradient(135deg, #0e1a26 0%, #0a1018 100%)">
            <div className="z-10 relative">
              <div className="flex items-center gap-2 mb-1">
                <Layers size={12} style={{ color: '#7ea4c8' }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(232,228,239,0.35)' }}>
                  Layered
                </span>
              </div>
              <p className="font-semibold text-[14px]" style={{ color: '#e8e4ef' }}>Soft Shadows.</p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/3 w-24 h-24 opacity-70">
              <TorusRing color="#7ea4c8" size={100} />
            </div>
          </Tile>

          {/* ── Sphere: Playful Physics ── */}
          <Tile className="md:col-span-2" custom={2} bg="linear-gradient(135deg, #201418 0%, #140e10 100%)">
            <div className="z-10 relative h-full flex flex-col justify-between">
              <div className="flex justify-end">
                <span className="px-2 py-1 rounded-full text-[9px] font-semibold"
                  style={{ background: 'rgba(201,145,138,0.12)', color: '#c9918a', border: '1px solid rgba(201,145,138,0.18)' }}>
                  Interactive
                </span>
              </div>
              <h3 className="font-semibold text-[14px]" style={{ color: '#e8e4ef' }}>Playful Physics.</h3>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 opacity-80">
              <Sphere color="#c9918a" size={80} />
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
          <code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
