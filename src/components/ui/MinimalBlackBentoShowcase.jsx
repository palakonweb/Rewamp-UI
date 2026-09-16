import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';

/*
 * Visual Masterpieces Bento — Dark portfolio grid
 * Inspired by: "We Turn Ideas into Visual Masterpieces" reference
 * Palette: true black #0a0a0a, warm white #f0ede8, muted gold #c8a864
 */

const promptContent = `Dark portfolio bento grid with italic serif heading, stat counter tiles showing project numbers, SVG particle globe animation, starburst light illustration, warm white on black contrast, elegant and cinematic, unhurried animations, muted gold accents, generous whitespace, Dribbble-level premium design`;

// ── Animated counter that counts up when in view ──
function AnimatedCounter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value);
    const duration = 1500;
    const steps = 60;
    const increment = num / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= num) { setCount(num); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{prefix}{inView ? count : 0}{suffix}</span>;
}

// ── SVG Particle Globe ──
function ParticleGlobe() {
  const points = [];
  for (let i = 0; i < 80; i++) {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / 80);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const x = 50 + 38 * Math.sin(phi) * Math.cos(theta);
    const y = 50 + 38 * Math.sin(phi) * Math.sin(theta);
    const z = Math.cos(phi);
    points.push({ x, y, opacity: 0.25 + (z + 1) * 0.35, r: 1 + (z + 1) * 0.6 });
  }

  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
    >
      {/* Equator ring */}
      <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="rgba(240,237,232,0.08)" strokeWidth="0.5" />
      <ellipse cx="50" cy="50" rx="12" ry="38" fill="none" stroke="rgba(240,237,232,0.06)" strokeWidth="0.5" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="#f0ede8" opacity={p.opacity} />
      ))}
    </motion.svg>
  );
}

// ── SVG Starburst ──
function Starburst() {
  const lines = 24;
  return (
    <svg viewBox="0 0 100 100" className="w-full h-full">
      {/* Central glow */}
      <circle cx="50" cy="50" r="8" fill="url(#starburstGlow)" />
      <defs>
        <radialGradient id="starburstGlow">
          <stop offset="0%" stopColor="#f0ede8" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#f0ede8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {Array.from({ length: lines }).map((_, i) => {
        const angle = (i / lines) * Math.PI * 2;
        const innerR = 6;
        const outerR = 18 + (i % 3) * 14;
        const x1 = 50 + innerR * Math.cos(angle);
        const y1 = 50 + innerR * Math.sin(angle);
        const x2 = 50 + outerR * Math.cos(angle);
        const y2 = 50 + outerR * Math.sin(angle);
        return (
          <motion.line
            key={i} x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="#f0ede8"
            strokeWidth="0.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.15 + (i % 3) * 0.12 }}
            transition={{ duration: 1.8, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          />
        );
      })}
      {/* Center dot */}
      <circle cx="50" cy="50" r="2" fill="#f0ede8" opacity="0.9" />
    </svg>
  );
}

// ── Tile wrapper ──
const tileVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

function Tile({ children, className, custom = 0 }) {
  return (
    <motion.div
      custom={custom}
      variants={tileVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -3, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }}
      className={`relative overflow-hidden rounded-[16px] ${className}`}
      style={{
        background: '#141414',
        border: '1px solid rgba(240,237,232,0.06)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {children}
    </motion.div>
  );
}

export default function MinimalBlackBentoShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-6 sm:p-10"
        style={{ background: '#0a0a0a', minHeight: 700 }}>

        {/* ── Header section ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-[36px] sm:text-[44px] leading-[1.1] tracking-tight max-w-[400px]"
            style={{ color: '#f0ede8', fontFamily: 'Georgia, "Times New Roman", serif', fontStyle: 'italic', fontWeight: 400 }}
          >
            We Turn Ideas{' '}
            <span className="block">into Visual</span>
            <span className="block">Masterpieces</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="max-w-[280px]"
          >
            <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(240,237,232,0.4)' }}>
              Whether it's an engaging explainer video, a vibrant social media campaign, or captivating motion graphics, we bring creativity and expertise to every project.
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-medium"
              style={{ color: '#0a0a0a', background: '#f0ede8', border: 'none' }}
            >
              Know More About us <ArrowRight size={13} />
            </motion.button>
          </motion.div>
        </div>

        {/* ── Bento Grid ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px]">

          {/* Stat: 200+ Projects */}
          <Tile className="p-6 flex flex-col justify-between" custom={0}>
            <div />
            <div>
              <p className="text-[38px] font-light leading-none tracking-tight" style={{ color: '#f0ede8' }}>
                <AnimatedCounter value="200" suffix="+" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(240,237,232,0.3)' }}>
                Projects Delivered
              </p>
            </div>
          </Tile>

          {/* Visual: Deer / Abstract Art (SVG silhouette) */}
          <Tile className="p-0" custom={1}>
            <div className="w-full h-full flex items-center justify-center p-4">
              <svg viewBox="0 0 100 100" className="w-full h-full opacity-60">
                {/* Stylized deer silhouette */}
                <path d="M35,85 C35,70 25,65 25,50 C25,35 35,30 40,25 L38,10 L42,20 L45,12 L44,22 C50,20 55,22 55,30 C60,28 65,32 62,40 C70,42 72,50 68,58 C72,62 75,70 70,80 C65,85 55,88 50,88 C45,88 38,87 35,85Z"
                  fill="none" stroke="#f0ede8" strokeWidth="0.8" />
                {/* Antlers detail */}
                <path d="M38,10 L32,5 M38,10 L36,3 M45,12 L48,4 M45,12 L50,6"
                  fill="none" stroke="#f0ede8" strokeWidth="0.5" opacity="0.5" />
              </svg>
            </div>
          </Tile>

          {/* Visual: Particle Globe */}
          <Tile className="md:col-span-2 p-4" custom={2}>
            <div className="w-full h-full">
              <ParticleGlobe />
            </div>
          </Tile>

          {/* Stat: 100+ Happy Clients */}
          <Tile className="p-6 flex flex-col justify-between" custom={3}>
            <div />
            <div>
              <p className="text-[38px] font-light leading-none tracking-tight" style={{ color: '#f0ede8' }}>
                <AnimatedCounter value="100" suffix="+" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(240,237,232,0.3)' }}>
                Happy Clients
              </p>
            </div>
          </Tile>

          {/* Visual: Starburst */}
          <Tile className="md:col-span-2 p-4" custom={4}>
            <div className="w-full h-full">
              <Starburst />
            </div>
          </Tile>

          {/* Stat: 15 Years of Experience */}
          <Tile className="p-6 flex flex-col justify-between" custom={5}>
            <div />
            <div>
              <p className="text-[38px] font-light leading-none tracking-tight" style={{ color: '#f0ede8' }}>
                <AnimatedCounter value="15" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(240,237,232,0.3)' }}>
                Years of Experience
              </p>
            </div>
          </Tile>

          {/* Stat: 95% Satisfaction */}
          <Tile className="p-6 flex flex-col justify-between" custom={6}>
            <div />
            <div>
              <p className="text-[38px] font-light leading-none tracking-tight" style={{ color: '#f0ede8' }}>
                <AnimatedCounter value="95" suffix="%" />
              </p>
              <p className="text-[10px] uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(240,237,232,0.3)' }}>
                Client Satisfaction
              </p>
            </div>
          </Tile>

        </div>
      </div>

      {/* Prompt footer */}
</div>
  );
}
