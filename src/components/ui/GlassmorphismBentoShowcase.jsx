import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight, Globe, Bell, Calendar, Settings, Gift, Mail } from 'lucide-react';

/*
 * Creative Studio Bento — Warm linen glassmorphism
 * Inspired by: Ref 3 (beige bento with illustrated tiles, serif+sans)
 * Palette: warm linen #f5f0e8, terracotta #c4836a, sage #8a9e8a, charcoal #2a2a2e
 */

const promptContent = `Warm linen glassmorphism bento grid with frosted glass cards, beige background, serif and sans-serif typography, illustrated SVG line-art icons per tile, pastel gradient blobs behind, soft hover lift, elegant editorial aesthetic, warm terracotta and sage accents, generous padding, premium design`;

// ── SVG Line-art Illustrations ──
function CalendarSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
      <motion.rect x="12" y="18" width="56" height="50" rx="8" stroke="#c4836a" strokeWidth="1.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <line x1="12" y1="32" x2="68" y2="32" stroke="#c4836a" strokeWidth="1" opacity="0.4" />
      <line x1="24" y1="14" x2="24" y2="22" stroke="#c4836a" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="56" y1="14" x2="56" y2="22" stroke="#c4836a" strokeWidth="1.5" strokeLinecap="round" />
      {/* Grid dots for dates */}
      {[0,1,2,3,4].map(row => [0,1,2,3,4].map(col => (
        <motion.circle key={`${row}-${col}`} cx={22 + col * 10} cy={40 + row * 7} r="1.5"
          fill="#c4836a" opacity={row === 1 && col === 2 ? 0.9 : 0.2}
          initial={{ scale: 0 }} whileInView={{ scale: 1 }}
          transition={{ delay: 0.8 + (row * 5 + col) * 0.03, duration: 0.4 }}
          viewport={{ once: true }} />
      )))}
    </svg>
  );
}

function GlobeSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
      <motion.circle cx="40" cy="40" r="28" stroke="#8a9e8a" strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <motion.ellipse cx="40" cy="40" rx="14" ry="28" stroke="#8a9e8a" strokeWidth="0.8" opacity="0.5"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <line x1="12" y1="32" x2="68" y2="32" stroke="#8a9e8a" strokeWidth="0.6" opacity="0.3" />
      <line x1="12" y1="48" x2="68" y2="48" stroke="#8a9e8a" strokeWidth="0.6" opacity="0.3" />
      {/* Flag */}
      <motion.g initial={{ opacity: 0, y: 4 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }} viewport={{ once: true }}>
        <line x1="52" y1="18" x2="52" y2="28" stroke="#c4836a" strokeWidth="1" />
        <path d="M52,18 L60,21 L52,24" fill="#c4836a" opacity="0.6" />
      </motion.g>
    </svg>
  );
}

function ToggleSVG() {
  return (
    <svg viewBox="0 0 60 30" className="w-14 h-7" fill="none">
      <rect x="2" y="4" width="46" height="22" rx="11" stroke="#2a2a2e" strokeWidth="1.2" fill="rgba(42,42,46,0.08)" />
      <motion.circle cx="15" cy="15" r="8" fill="#2a2a2e"
        animate={{ cx: [15, 35, 15] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.25, 0.46, 0.45, 0.94], repeatDelay: 2 }} />
    </svg>
  );
}

function BellSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
      <motion.path d="M40,16 C28,16 22,26 22,38 C22,48 18,52 16,54 L64,54 C62,52 58,48 58,38 C58,26 52,16 40,16Z"
        stroke="#c4836a" strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <motion.path d="M34,54 C34,58 36,62 40,62 C44,62 46,58 46,54"
        stroke="#c4836a" strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <motion.circle cx="40" cy="12" r="2" fill="#c4836a"
        initial={{ scale: 0 }} whileInView={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 100, damping: 20 }}
        viewport={{ once: true }} />
    </svg>
  );
}

function MailboxSVG() {
  return (
    <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none">
      <motion.rect x="16" y="28" width="36" height="32" rx="4" stroke="#8a9e8a" strokeWidth="1.2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }} />
      <line x1="52" y1="40" x2="52" y2="66" stroke="#8a9e8a" strokeWidth="1.2" />
      {/* Flag */}
      <motion.g initial={{ rotate: -30 }} whileInView={{ rotate: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} viewport={{ once: true }}
        style={{ transformOrigin: '56px 30px' }}>
        <line x1="56" y1="22" x2="56" y2="36" stroke="#c4836a" strokeWidth="1.2" />
        <rect x="56" y="22" width="12" height="8" rx="1" fill="#c4836a" opacity="0.5" />
      </motion.g>
    </svg>
  );
}

// ── Glass Tile ──
const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function GlassTile({ children, className, custom = 0, accent = false }) {
  return (
    <motion.div
      custom={custom}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-30px' }}
      whileHover={{
        y: -3,
        boxShadow: '0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
      className={`relative overflow-hidden rounded-[20px] flex flex-col cursor-default ${className}`}
      style={{
        background: accent ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.45)',
        border: '1px solid rgba(255,255,255,0.7)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function GlassmorphismBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/[0.04] p-6 sm:p-10"
        style={{ background: '#f5f0e8', minHeight: 700 }}>

        {/* ── Floating background blobs ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ filter: 'blur(80px)', opacity: 0.7 }}>
          <motion.div animate={{ x: [0, 25, 0], y: [0, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-[10%] right-[10%] w-72 h-72 rounded-full"
            style={{ background: 'rgba(196,131,106,0.25)' }} />
          <motion.div animate={{ x: [0, -20, 0], y: [0, 18, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            className="absolute bottom-[5%] left-[15%] w-80 h-80 rounded-full"
            style={{ background: 'rgba(138,158,138,0.2)' }} />
          <motion.div animate={{ x: [0, 15, -10, 0], y: [0, 10, -15, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
            className="absolute top-[40%] left-[40%] w-64 h-64 rounded-full"
            style={{ background: 'rgba(200,168,100,0.15)' }} />
        </div>

        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-10 relative z-10"
        >
          <h2 className="text-[32px] sm:text-[38px] leading-[1.15] tracking-tight mb-3"
            style={{ color: '#2a2a2e', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic' }}>
            Everything You Need.{' '}
            <span className="block">All in One Place.</span>
          </h2>
          <p className="text-[13px] max-w-md mx-auto leading-relaxed" style={{ color: 'rgba(42,42,46,0.45)' }}>
            From smart notifications to global access — our tools are designed to keep you connected, organized, and in control.
          </p>
        </motion.div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10 auto-rows-[170px]">

          {/* Smart Gifting (2col × 1row) */}
          <GlassTile className="md:col-span-2 p-6 justify-between" custom={0}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[20px] font-bold leading-tight mb-1" style={{ color: '#2a2a2e' }}>
                  Smart Gifting
                </h3>
                <p className="text-[11px] leading-relaxed max-w-[200px]" style={{ color: 'rgba(42,42,46,0.45)' }}>
                  Easily send and schedule thoughtful gifts for any occasion — right from your dashboard.
                </p>
              </div>
              <Gift size={20} style={{ color: '#c4836a' }} className="shrink-0 mt-1" />
            </div>
          </GlassTile>

          {/* Built-in Calendar */}
          <GlassTile className="md:col-span-2 p-6 justify-between" custom={1} accent>
            <div className="flex items-start gap-4">
              <CalendarSVG />
              <div>
                <h3 className="text-[18px] font-bold leading-tight mb-1" style={{ color: '#2a2a2e' }}>
                  Built-in Calendar
                </h3>
                <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(42,42,46,0.45)' }}>
                  Stay on top of events, deadlines, and special dates with an intuitive, synced calendar.
                </p>
              </div>
            </div>
          </GlassTile>

          {/* Flexible Settings */}
          <GlassTile className="p-5 justify-between items-center text-center" custom={2}>
            <ToggleSVG />
            <div>
              <h3 className="text-[14px] font-bold mb-0.5" style={{ color: '#2a2a2e' }}>Flexible Settings</h3>
              <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(42,42,46,0.4)' }}>
                Tailor the experience to your style with customizable preferences.
              </p>
            </div>
          </GlassTile>

          {/* Global Access */}
          <GlassTile className="p-5 justify-between items-center text-center" custom={3}>
            <GlobeSVG />
            <div>
              <h3 className="text-[14px] font-bold mb-0.5" style={{ color: '#2a2a2e' }}>Global Access</h3>
              <p className="text-[10px] leading-relaxed" style={{ color: 'rgba(42,42,46,0.4)' }}>
                Your data goes wherever you go — accessible from anywhere, anytime.
              </p>
            </div>
          </GlassTile>

          {/* Real-Time Notifications (2col) */}
          <GlassTile className="md:col-span-2 p-6 justify-between" custom={4}>
            <div className="flex items-start gap-4">
              <BellSVG />
              <div>
                <h3 className="text-[20px] font-bold leading-tight mb-1" style={{ color: '#2a2a2e' }}>
                  Real-Time Notifications
                </h3>
                <p className="text-[11px] leading-relaxed max-w-[220px]" style={{ color: 'rgba(42,42,46,0.45)' }}>
                  Get instant updates so you never miss a task, event, or important message.
                </p>
              </div>
            </div>
          </GlassTile>

          {/* Custom Alerts */}
          <GlassTile className="md:col-span-2 p-6 justify-between" custom={5}>
            <div className="flex items-start gap-4">
              <MailboxSVG />
              <div>
                <h3 className="text-[18px] font-bold leading-tight mb-1" style={{ color: '#2a2a2e' }}>
                  Custom Alerts
                </h3>
                <p className="text-[11px] leading-relaxed max-w-[200px]" style={{ color: 'rgba(42,42,46,0.45)' }}>
                  Set personal alerts to keep your priorities front and center, no matter how busy life gets.
                </p>
              </div>
            </div>
          </GlassTile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
