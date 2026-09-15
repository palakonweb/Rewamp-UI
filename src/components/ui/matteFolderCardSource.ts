export const matteFolderCardPrompt = `Create a sleek modern folder-tab card component with an animated living aurora mesh gradient background and a matte dark folder flap, based on the reference design.
- Outer container: A squircle card with rounded corners, subtle dark bezel, and soft drop shadow.
- Background: A living, continuous animated aurora mesh gradient with fluid motion drifting between sunny amber yellow, coral peach, radiant violet-magenta, and sky blue beneath a subtle tactile noise texture.
- Folder Flap: Precision inverted-fillet tab geometry on top of a dark matte obsidian surface (#1A1A1E to #0E0E11) with a delicate rim-light stroke.
- Content:
  - Top tab: "Designs" in clean bold sans-serif, with "Web & App Designs" subtitle.
  - Top right: Interactive glass action indicator icon with hover tilt.
  - Bottom row: High-contrast "04 Tags" with prominent bold numerals and "1012 Shots" count on the right.
- Motion: Hover elevation with spring physics, rotation on the top indicator, and continuous silky drifting fluid motion on the gradient background.`;

export const matteFolderCardCode = `import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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
      className={\`relative w-[340px] h-[370px] rounded-[36px] p-2 bg-[#202024] shadow-2xl shadow-black/60 border border-white/10 select-none cursor-pointer overflow-hidden \${className}\`}
      style={{
        boxShadow: isHovered
          ? '0 24px 48px -12px rgba(0, 0, 0, 0.7), 0 0 30px -4px rgba(192, 132, 252, 0.25)'
          : '0 20px 40px -10px rgba(0, 0, 0, 0.6)',
      }}
    >
      {/* ── Inner Rounded Bezel Housing ── */}
      <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#0F0F12]">
        
        {/* ── 1. Living Animated Gradient Background (Gloss Button Style) ── */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Base ambient backdrop */}
          <div className="absolute inset-0 bg-[#16161D]" />

          {/* Shifting iridescent aurora gradient like Gloss Button */}
          <motion.div
            className="absolute -inset-6"
            style={{
              background:
                'linear-gradient(115deg, #FEE066 0%, #FBBF24 10%, #FB7185 22%, #F43F5E 34%, #C084FC 46%, #8B5CF6 58%, #38BDF8 70%, #FEE066 84%, #FB7185 100%)',
              backgroundSize: '190% 190%',
            }}
            animate={{
              backgroundPosition: ['0% 40%', '100% 60%', '0% 40%'],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Subtle secondary radial light drift for added depth */}
          <motion.div
            className="absolute inset-0 opacity-70 filter blur-[32px] pointer-events-none mix-blend-screen"
            style={{
              background:
                'radial-gradient(circle at 40% 30%, rgba(254, 224, 102, 0.8) 0%, rgba(244, 114, 182, 0.6) 45%, rgba(192, 132, 252, 0.6) 75%, transparent 100%)',
              backgroundSize: '180% 180%',
            }}
            animate={{
              backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Fixed glossy highlight sheen (matching Gloss Button aesthetic) */}
          <div className="pointer-events-none absolute inset-x-3 top-1.5 h-16 rounded-full bg-gradient-to-b from-white/30 via-white/10 to-transparent blur-[4px]" />

          {/* Gentle tactile film grain texture */}
          <div
            className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
              backgroundSize: '6px 6px',
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
`;
