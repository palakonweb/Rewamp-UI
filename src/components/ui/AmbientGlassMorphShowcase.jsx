import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import { Copy, Check, MapPin, Link2, Star, Users, FolderOpen, MessageCircle, UserPlus } from 'lucide-react';

/*
 * AmbientGlassMorphShowcase
 * Animated ambient gradient background with centered frosted-glass profile card.
 * Three variants: light · dark · accent
 */

const promptContent = `ambient glassmorphism background — slow flowing multi-blob gradient aurora, layered depth blur, frosted glass card floating above with backdrop-filter, soft grain noise texture, seamless loop`;

// ─── VARIANT DEFINITIONS ─────────────────────────────────────────────────────
const VARIANTS = {
  dark: {
    label: 'Dark',
    bg: '#06060f',
    blobs: ['#1e0a5e', '#0a2a6e', '#0f0a4e', '#1a0e60', '#061a4e'],
    noise: 0.04,
    card: {
      bg: 'rgba(255,255,255,0.05)',
      border: 'rgba(255,255,255,0.10)',
      shadow: '0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)',
      blur: 'blur(32px)',
      textPrimary: '#fff',
      textSecondary: 'rgba(255,255,255,0.45)',
      statBg: 'rgba(255,255,255,0.06)',
      statBorder: 'rgba(255,255,255,0.08)',
      btnBg: 'rgba(255,255,255,0.08)',
      btnBorder: 'rgba(255,255,255,0.12)',
      btnText: 'rgba(255,255,255,0.75)',
      ctaBg: 'rgba(255,255,255,0.12)',
      ctaBorder: 'rgba(255,255,255,0.18)',
      ctaText: '#fff',
      avatarRing: 'rgba(255,255,255,0.15)',
      accent: '#a78bfa',
    },
  },
  light: {
    label: 'Light',
    bg: '#f0ede8',
    blobs: ['#e8d5f5', '#d5e5ff', '#f5d5e8', '#d5f5ee', '#eee0ff'],
    noise: 0.025,
    card: {
      bg: 'rgba(255,255,255,0.55)',
      border: 'rgba(255,255,255,0.8)',
      shadow: '0 32px 80px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)',
      blur: 'blur(28px)',
      textPrimary: '#0f0f14',
      textSecondary: 'rgba(15,15,20,0.45)',
      statBg: 'rgba(255,255,255,0.6)',
      statBorder: 'rgba(0,0,0,0.06)',
      btnBg: 'rgba(0,0,0,0.04)',
      btnBorder: 'rgba(0,0,0,0.06)',
      btnText: 'rgba(0,0,0,0.65)',
      ctaBg: 'rgba(0,0,0,0.06)',
      ctaBorder: 'rgba(0,0,0,0.08)',
      ctaText: '#0f0f14',
      avatarRing: 'rgba(255,255,255,0.9)',
      accent: '#7c3aed',
    },
  },
  accent: {
    label: 'Accent',
    bg: '#050916',
    blobs: ['#0c2a6e', '#1a0060', '#0a3a8e', '#050a40', '#0f1860'],
    noise: 0.045,
    card: {
      bg: 'rgba(14,30,80,0.45)',
      border: 'rgba(100,140,255,0.18)',
      shadow: '0 32px 80px rgba(10,20,60,0.7), 0 0 0 1px rgba(100,140,255,0.08), inset 0 1px 0 rgba(100,140,255,0.12)',
      blur: 'blur(36px)',
      textPrimary: '#e8efff',
      textSecondary: 'rgba(180,200,255,0.5)',
      statBg: 'rgba(80,120,255,0.10)',
      statBorder: 'rgba(80,120,255,0.15)',
      btnBg: 'rgba(80,120,255,0.12)',
      btnBorder: 'rgba(80,120,255,0.2)',
      btnText: 'rgba(180,200,255,0.8)',
      ctaBg: 'rgba(100,140,255,0.18)',
      ctaBorder: 'rgba(120,160,255,0.25)',
      ctaText: '#c8d8ff',
      avatarRing: 'rgba(100,160,255,0.3)',
      accent: '#60a5fa',
    },
  },
};

// ─── ANIMATED BLOBS ──────────────────────────────────────────────────────────
function AuroraBlobs({ blobs, bg }) {
  const canvasRef = useRef(null);
  const timeRef = useRef(0);
  const blobDataRef = useRef(
    blobs.map((_, i) => ({
      x: 0.2 + (i / blobs.length) * 0.6,
      y: 0.2 + (i % 2) * 0.5,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00012,
      r: 0.3 + Math.random() * 0.2,
    }))
  );

  useAnimationFrame((t, delta) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const W = canvas.width, H = canvas.height;
    timeRef.current += delta / 1000;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    blobDataRef.current = blobDataRef.current.map((b, i) => {
      let nx = b.x + b.vx + Math.sin(timeRef.current * 0.18 + i * 1.3) * 0.0002;
      let ny = b.y + b.vy + Math.cos(timeRef.current * 0.14 + i * 0.9) * 0.0002;
      let nvx = b.vx;
      let nvy = b.vy;
      if (nx < 0.05 || nx > 0.95) nvx *= -1;
      if (ny < 0.05 || ny > 0.95) nvy *= -1;
      nx = Math.max(0.05, Math.min(0.95, nx));
      ny = Math.max(0.05, Math.min(0.95, ny));
      return { ...b, x: nx, y: ny, vx: nvx, vy: nvy };
    });

    // Draw blobs
    blobDataRef.current.forEach((b, i) => {
      const grad = ctx.createRadialGradient(b.x * W, b.y * H, 0, b.x * W, b.y * H, b.r * Math.min(W, H));
      grad.addColorStop(0, hexAlpha(blobs[i], 0.45));
      grad.addColorStop(1, hexAlpha(blobs[i], 0));
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(b.x * W, b.y * H, b.r * Math.min(W, H), 0, Math.PI * 2);
      ctx.fill();
    });

    // Grain overlay
    const imageData = ctx.getImageData(0, 0, W, H);
    const data = imageData.data;
    for (let px = 0; px < data.length; px += 4) {
      const noise = (Math.random() - 0.5) * 20;
      data[px] = clamp(data[px] + noise);
      data[px + 1] = clamp(data[px + 1] + noise);
      data[px + 2] = clamp(data[px + 2] + noise);
    }
    ctx.putImageData(imageData, 0, 0);
  });

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={500}
      className="absolute inset-0 w-full h-full"
      style={{ objectFit: 'cover' }}
      aria-hidden="true"
    />
  );
}

function hexAlpha(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
function clamp(v) { return Math.max(0, Math.min(255, Math.round(v))); }

// ─── STAT MINI CARD ───────────────────────────────────────────────────────────
function StatChip({ label, value, icon: Icon, c }) {
  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: 'spring', stiffness: 360, damping: 22 }}
      className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl cursor-default select-none"
      style={{
        background: c.statBg,
        border: `1px solid ${c.statBorder}`,
      }}
    >
      <Icon size={13} style={{ color: c.accent }} />
      <span className="font-black text-[17px] leading-none" style={{ color: c.textPrimary }}>{value}</span>
      <span className="text-[10px] font-medium uppercase tracking-widest" style={{ color: c.textSecondary }}>{label}</span>
    </motion.div>
  );
}

// ─── GLASS CARD ───────────────────────────────────────────────────────────────
function GlassCard({ c }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col items-center gap-5 w-[340px]"
      style={{
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: 24,
        boxShadow: c.shadow,
        backdropFilter: c.blur,
        WebkitBackdropFilter: c.blur,
        padding: '32px 24px 24px',
      }}
    >
      {/* Top inner highlight */}
      <div className="absolute inset-x-0 top-0 h-px rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${c.border}, transparent)` }} />

      {/* Avatar */}
      <div className="relative">
        <div
          className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center font-black text-3xl"
          style={{
            background: `linear-gradient(135deg, ${c.accent}55, ${c.accent}22)`,
            border: `2.5px solid ${c.avatarRing}`,
            boxShadow: `0 8px 32px ${c.accent}33`,
            color: c.accent,
          }}
        >
          A
        </div>
        {/* Online dot */}
        <div
          className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
          style={{ background: '#22c55e', borderColor: c.bg }}
        />
      </div>

      {/* Name & subtitle */}
      <div className="text-center flex flex-col gap-1">
        <h3 className="font-black text-[19px] tracking-tight leading-tight" style={{ color: c.textPrimary }}>
          Alex Mercer
        </h3>
        <p className="text-[12px] font-medium" style={{ color: c.textSecondary }}>
          Product Designer & Creative Director
        </p>
        <div className="flex items-center justify-center gap-1.5 mt-1">
          <MapPin size={10} style={{ color: c.accent }} />
          <span className="text-[11px]" style={{ color: c.textSecondary }}>San Francisco, CA</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex gap-3 w-full">
        <StatChip label="Projects" value="142" icon={FolderOpen} c={c} />
        <StatChip label="Followers" value="8.4k" icon={Users} c={c} />
        <StatChip label="Stars" value="2.1k" icon={Star} c={c} />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 justify-center">
        {['Motion Design', 'Glassmorphism', 'Systems'].map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
            style={{ background: c.btnBg, border: `1px solid ${c.btnBorder}`, color: c.btnText }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex gap-2.5 w-full">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-2xl text-[12px] font-semibold"
          style={{ background: c.btnBg, border: `1px solid ${c.btnBorder}`, color: c.btnText }}
          aria-label="Message"
        >
          <MessageCircle size={13} style={{ color: c.accent }} /> Message
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center gap-2 flex-1 py-2.5 rounded-2xl text-[12px] font-semibold"
          style={{ background: c.btnBg, border: `1px solid ${c.btnBorder}`, color: c.btnText }}
          aria-label="Portfolio"
        >
          <Link2 size={13} style={{ color: c.accent }} /> Portfolio
        </motion.button>
      </div>

      {/* CTA button */}
      <motion.button
        whileHover={{ scale: 1.03, boxShadow: `0 8px 32px ${c.accent}33` }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-3 rounded-2xl text-[13px] font-bold flex items-center justify-center gap-2"
        style={{ background: c.ctaBg, border: `1px solid ${c.ctaBorder}`, color: c.ctaText }}
        aria-label="Follow Alex Mercer"
      >
        <UserPlus size={14} style={{ color: c.accent }} />
        Follow Alex
      </motion.button>
    </motion.div>
  );
}

// ─── MAIN EXPORT ─────────────────────────────────────────────────────────────
export default function AmbientGlassMorphShowcase() {
  const [copied, setCopied] = useState(false);
  const [activeVariant, setActiveVariant] = useState('dark');

  const v = VARIANTS[activeVariant];
  const c = v.card;

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">

      {/* ── Preview Stage ── */}
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center" style={{ minHeight: 520 }}>

        {/* Light theme plain background */}
        <div className="absolute inset-0 bg-[#0f111a]" />

        {/* Glass card — centered */}
        <div className="relative z-10 flex items-center justify-center w-full py-14 px-4">
          <GlassCard c={c} key={activeVariant} />
        </div>

        {/* Variant switcher — top-right */}
        <div className="absolute top-4 right-4 z-20 flex gap-1.5" role="group" aria-label="Color variant">
          {Object.entries(VARIANTS).map(([key, val]) => (
            <motion.button
              key={key}
              onClick={() => setActiveVariant(key)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all"
              style={{
                background: activeVariant === key ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                border: `1px solid ${activeVariant === key ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'}`,
                color: activeVariant === key ? '#fff' : 'rgba(255,255,255,0.45)',
                backdropFilter: 'blur(12px)',
              }}
              aria-pressed={activeVariant === key}
            >
              {val.label}
            </motion.button>
          ))}
        </div>

        {/* Watermark */}
        <span className="absolute bottom-5 right-5 text-white/10 text-[11px] font-semibold tracking-widest uppercase">
          Ambient Glass
        </span>
      </div>

      {/* ── Prompt Card ── */}
</div>
  );
}
