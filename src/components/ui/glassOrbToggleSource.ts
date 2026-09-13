export const glassOrbTogglePrompt = `Create an interactive Dark/Light mode toggle component with a 3D glass sphere thumb, based on the reference video:
- Pill Track: A sleek rounded pill track (236px by 78px) with inset shadow and subtle rim border.
  - In Dark mode: Deep black surface (#141416) with "Light" label clearly visible on the right.
  - In Light mode: Soft matte graphite surface (#38383F) with "Dark" label clearly visible on the left.
- 3D Glass Orb Thumb:
  - An oversized 3D crystal glass orb (106px diameter) that extends beyond the top and bottom of the track.
  - Realistic multi-layered glass shader highlights:
    - Specular crescent reflection highlight on the top-left.
    - Meniscus subsurface caustic glow on the bottom-right.
    - Soft refractive backdrop blur allowing the underlying track labels to refract through the glass sphere as it slides.
  - Inside the glass sphere:
    - Dark mode: A glowing white crescent moon.
    - Light mode: A radiant glowing white sun with 8 beams.
    - Animated rotation and scale morph with cushioned spring physics on transition.
- Interaction: Smooth spring-driven sliding on click or drag with dynamic ambient background glow.`;

export const glassOrbToggleCode = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface GlassOrbToggleProps {
  initialIsLight?: boolean;
  className?: string;
  onChange?: (isLight: boolean) => void;
}

export default function GlassOrbToggle({
  initialIsLight = false,
  className = '',
  onChange,
}: GlassOrbToggleProps) {
  const [isLight, setIsLight] = useState(initialIsLight);
  const [isHovered, setIsHovered] = useState(false);

  const toggle = () => {
    const next = !isLight;
    setIsLight(next);
    onChange?.(next);
  };

  return (
    <div className={\`relative flex flex-col items-center justify-center select-none \${className}\`}>
      {/* ── Ambient Glow Behind the Toggle ── */}
      <motion.div
        animate={{
          opacity: isLight ? 0.35 : 0.08,
          scale: isLight ? 1.2 : 0.9,
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="absolute w-[280px] h-[160px] rounded-full filter blur-[40px] pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(200, 200, 220, 0.2) 60%, transparent 100%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        }}
      />

      {/* ── Outer Interactive Pill Track ── */}
      <motion.div
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative w-[236px] h-[78px] rounded-full cursor-pointer p-1 flex items-center justify-between overflow-visible transition-colors duration-500"
        style={{
          backgroundColor: isLight ? '#38383F' : '#141416',
          boxShadow: isLight
            ? 'inset 0 2px 6px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.15), 0 12px 30px -8px rgba(0,0,0,0.6)'
            : 'inset 0 3px 8px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.06), 0 16px 36px -10px rgba(0,0,0,0.7)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {/* Track Label: "Dark" on the left */}
        <div className="w-[110px] h-full flex items-center justify-center pl-2">
          <motion.span
            animate={{
              opacity: isLight ? 0.92 : 0.25,
              x: isLight ? 0 : -4,
            }}
            transition={{ duration: 0.35 }}
            className="text-[17px] font-semibold text-white tracking-tight font-sans"
          >
            Dark
          </motion.span>
        </div>

        {/* Track Label: "Light" on the right */}
        <div className="w-[110px] h-full flex items-center justify-center pr-2">
          <motion.span
            animate={{
              opacity: isLight ? 0.25 : 0.92,
              x: isLight ? 4 : 0,
            }}
            transition={{ duration: 0.35 }}
            className="text-[17px] font-semibold text-white tracking-tight font-sans"
          >
            Light
          </motion.span>
        </div>

        {/* ── Oversized 3D Glass Orb Thumb (Liquid Crystal Lens) ── */}
        <motion.div
          animate={{
            x: isLight ? 130 : -4,
          }}
          transition={{
            type: 'spring',
            stiffness: 280,
            damping: 24,
            mass: 0.9,
          }}
          className="absolute -top-[14px] left-0 w-[106px] h-[106px] rounded-full cursor-grab active:cursor-grabbing pointer-events-none z-30"
        >
          {/* Glass Sphere Multi-Layer Material */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_20px_40px_-8px_rgba(0,0,0,0.85),0_0_25px_rgba(255,255,255,0.12)]">
            
            {/* Backdrop Blur to refract underneath track & text */}
            <div className="absolute inset-0 backdrop-blur-[5px]" />

            {/* Spherical Depth Gradient (Convex Lens shading) */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.08) 40%, rgba(20, 20, 25, 0.45) 75%, rgba(10, 10, 14, 0.85) 100%)',
              }}
            />

            {/* Specular Rim Light Ring */}
            <div className="absolute inset-0 rounded-full border border-white/30" />

            {/* Top-Left Crisp Specular Reflection */}
            <div
              className="absolute top-2.5 left-3.5 w-9 h-5 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.85) 0%, rgba(255, 255, 255, 0.35) 50%, transparent 100%)',
                transform: 'rotate(-25deg)',
                filter: 'blur(0.6px)',
              }}
            />

            {/* Bottom-Right Subsurface Reflection Meniscus */}
            <div
              className="absolute bottom-2.5 right-4 w-11 h-6 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 80%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)',
                transform: 'rotate(-15deg)',
                filter: 'blur(1px)',
              }}
            />

            {/* Inner Glowing Celestial Icon (Moon or Sun) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!isLight ? (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.5, opacity: 0, rotate: -35 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: 35 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Moon Glow Aura */}
                    <div className="absolute w-10 h-10 rounded-full bg-white/20 filter blur-[8px]" />

                    {/* Crescent Moon SVG matching video */}
                    <svg
                      viewBox="0 0 32 32"
                      className="w-[32px] h-[32px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.85)]"
                      fill="currentColor"
                    >
                      <path d="M 23.5 16 C 23.5 22.35 18.35 27.5 12 27.5 C 10.1 27.5 8.3 27.04 6.7 26.22 C 12.8 28.5 19.5 25.5 21.8 19.4 C 22.8 16.7 22.8 13.7 21.6 11.2 C 20.7 9.3 19.2 7.7 17.4 6.6 C 21.1 8.4 23.5 12 23.5 16 Z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.5, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.5, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Sun Glow Aura */}
                    <div className="absolute w-12 h-12 rounded-full bg-white/25 filter blur-[9px]" />

                    {/* Radiant Sun SVG matching video */}
                    <svg
                      viewBox="0 0 36 36"
                      className="w-[36px] h-[36px] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.9)]"
                      fill="currentColor"
                    >
                      {/* Sun Central Disc */}
                      <circle cx="18" cy="18" r="7.5" />
                      {/* 8 Radiating Beams */}
                      <line x1="18" y1="3.5" x2="18" y2="6.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="18" y1="29.5" x2="18" y2="32.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="3.5" y1="18" x2="6.5" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="29.5" y1="18" x2="32.5" y2="18" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="7.7" y1="7.7" x2="9.9" y2="9.9" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="26.1" y1="26.1" x2="28.3" y2="28.3" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="7.7" y1="28.3" x2="9.9" y2="26.1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="26.1" y1="9.9" x2="28.3" y2="7.7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
`;
