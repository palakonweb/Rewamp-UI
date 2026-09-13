import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export interface MatteFolderCardProps {
  title?: string;
  subtitle?: string;
  tagsCount?: string | number;
  shotsCount?: string | number;
  className?: string;
}

export default function MatteFolderCard({
  title = 'Designs',
  subtitle = 'Web & App Designs',
  tagsCount = '04',
  shotsCount = '1012',
  className = '',
}: MatteFolderCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className={`relative w-[340px] h-[370px] rounded-[36px] p-2 bg-[#202024] shadow-2xl shadow-black/60 border border-white/10 select-none cursor-pointer overflow-hidden ${className}`}
      style={{
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 30px -4px rgba(192, 132, 252, 0.25)'
          : '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── Inner Rounded Bezel Housing ── */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#0F0F12]">
        
        {/* ── 1. Living Animated Aurora Mesh Gradient Background ── */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base ambient tone */}
          <div className="absolute inset-0 bg-[#16161D]" />

          {/* Drifting gradient orbs with heavy blur */}
          <div className="absolute inset-0 filter blur-[42px] opacity-95">
            {/* Orb 1: Warm Amber / Sunlight Yellow */}
            <motion.div
              animate={{
                x: [-20, 35, -15, -20],
                y: [-15, 20, -10, -15],
                scale: [1, 1.2, 0.95, 1],
              }}
              transition={{
                duration: 9,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-10 -left-6 w-52 h-52 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FEE066 0%, #F59E0B 75%, transparent 100%)',
              }}
            />

            {/* Orb 2: Vivid Peach / Coral Rose */}
            <motion.div
              animate={{
                x: [25, -20, 15, 25],
                y: [10, -25, 20, 10],
                scale: [1.1, 0.9, 1.15, 1.1],
              }}
              transition={{
                duration: 11,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-2 left-16 w-56 h-56 rounded-full"
              style={{
                background: 'radial-gradient(circle, #FB7185 0%, #E11D48 70%, transparent 100%)',
              }}
            />

            {/* Orb 3: Radiant Violet / Magenta */}
            <motion.div
              animate={{
                x: [10, -30, 20, 10],
                y: [-20, 25, -15, -20],
                scale: [0.95, 1.25, 1, 0.95],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-8 -right-8 w-60 h-60 rounded-full"
              style={{
                background: 'radial-gradient(circle, #C084FC 0%, #9333EA 60%, transparent 100%)',
              }}
            />

            {/* Orb 4: Sky Blue / Cyan Highlight */}
            <motion.div
              animate={{
                x: [-15, 25, -20, -15],
                y: [20, -15, 10, 20],
                scale: [1, 1.15, 0.9, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-12 right-0 w-44 h-44 rounded-full"
              style={{
                background: 'radial-gradient(circle, #38BDF8 0%, #3B82F6 70%, transparent 100%)',
              }}
            />
          </div>

          {/* Gentle film grain texture overlay for tactile realism */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '8px 8px',
            }}
          />
        </div>

        {/* ── 2. Top Right Interactive Detail / Action Indicator ── */}
        <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1">
          <motion.div
            animate={{ rotate: isHovered ? 45 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-7 h-7 rounded-full bg-black/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80"
          >
            <ArrowUpRight size={13} strokeWidth={2.2} />
          </motion.div>
        </div>

        {/* ── 3. Matte Dark Folder Flap Surface (with precision inverted fillet) ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20">
          <div className="relative w-full h-[255px]">
            {/* SVG Path drawing the inverted fillet folder flap */}
            <svg
              viewBox="0 0 324 255"
              className="w-full h-full filter drop-shadow-[0_-12px_24px_rgba(0,0,0,0.65)]"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Subtle vertical depth gradient on matte dark surface */}
                <linearGradient id="matteDarkSurface" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1A1A1E" />
                  <stop offset="50%" stopColor="#131316" />
                  <stop offset="100%" stopColor="#0E0E11" />
                </linearGradient>
                {/* Clean rim light stroke gradient */}
                <linearGradient id="rimLight" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
                </linearGradient>
              </defs>

              <path
                d="M 0 231
                   L 0 22
                   A 22 22 0 0 1 22 0
                   L 142 0
                   A 15 15 0 0 1 157 15
                   L 157 26
                   A 15 15 0 0 0 172 41
                   L 302 41
                   A 22 22 0 0 1 324 63
                   L 324 231
                   A 24 24 0 0 1 300 255
                   L 24 255
                   A 24 24 0 0 1 0 231
                   Z"
                fill="url(#matteDarkSurface)"
                stroke="url(#rimLight)"
                strokeWidth="1.2"
              />
            </svg>

            {/* ── 4. Content Overlay Inside the Matte Dark Folder Flap ── */}
            <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between pointer-events-none">
              
              {/* Tab Title (Top Left of Flap) */}
              <div className="pt-0.5 pl-0.5">
                <motion.div
                  animate={{ x: isHovered ? 2 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="text-[18px] font-bold text-white tracking-tight font-sans leading-snug normal-case"
                >
                  {title}
                </motion.div>
                <p className="text-[12px] font-medium text-white/50 tracking-normal font-sans mt-0.5 normal-case">
                  {subtitle}
                </p>
              </div>

              {/* Bottom Row: 04 Tags on Left, 1012 Shots on Right */}
              <div className="flex items-end justify-between pt-8 pb-1 px-1">
                {/* Left: 04 Tags */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[27px] font-black text-white tracking-tight font-sans leading-none">
                    {tagsCount}
                  </span>
                  <span className="text-[13px] font-semibold text-white/70 tracking-normal font-sans">
                    Tags
                  </span>
                </div>

                {/* Right: 1012 Shots */}
                <div className="flex items-center gap-1.5 text-white/55 text-[12.5px] font-medium font-sans">
                  <span>{shotsCount}</span>
                  <span className="text-white/45">Shots</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
