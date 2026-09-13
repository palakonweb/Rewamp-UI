export const glassOrbTogglePrompt = `Create an interactive Dark/Light mode toggle component with an oversized 3D crystal glass sphere thumb, identical to the reference video:
- Pill Track: A sleek rounded pill track (248px by 78px) with inset shadow and subtle rim border.
  - In Dark mode: Deep charcoal surface (#18181B) with "Light" label clearly visible on the right.
  - In Light mode: Soft smoke graphite surface (#56565E) with "Dark" label clearly visible on the left.
- 3D Glass Orb Thumb:
  - An oversized 3D crystal glass sphere (104px diameter) that extends beyond the top and bottom of the track.
  - Realistic multi-layered glass shader highlights:
    - Top-left crisp curved specular reflection arc.
    - Bottom-right subsurface caustic glow.
    - Soft refractive backdrop blur allowing the underlying track labels to refract through the glass sphere as it slides.
  - Inside the glass sphere:
    - Dark mode: A glowing white crescent moon (horns pointing right).
    - Light mode: A radiant glowing white sun with central disc and 8 rounded pill beams.
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
      {/* ── Ambient Glow Behind the Toggle (matches video bloom) ── */}
      <motion.div
        animate={{
          opacity: isLight ? 0.32 : 0.05,
          scale: isLight ? 1.25 : 0.85,
        }}
        transition={{ duration: 0.55, ease: 'easeInOut' }}
        className="absolute w-[320px] h-[180px] rounded-full filter blur-[50px] pointer-events-none"
        style={{
          background: isLight
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(180, 180, 200, 0.25) 50%, transparent 80%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* ── Outer Interactive Pill Track ── */}
      <motion.div
        onClick={toggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.985 }}
        className="relative w-[248px] h-[78px] rounded-full cursor-pointer flex items-center justify-between overflow-visible transition-colors duration-450"
        style={{
          backgroundColor: isLight ? '#56565E' : '#18181B',
          boxShadow: isLight
            ? 'inset 0 3px 8px rgba(0,0,0,0.35), inset 0 -1px 2px rgba(255,255,255,0.2), 0 16px 36px -10px rgba(0,0,0,0.5)'
            : 'inset 0 3px 8px rgba(0,0,0,0.8), inset 0 -1px 2px rgba(255,255,255,0.06), 0 16px 36px -10px rgba(0,0,0,0.6)',
          border: isLight
            ? '1px solid rgba(255, 255, 255, 0.18)'
            : '1px solid rgba(255, 255, 255, 0.07)',
        }}
      >
        {/* Track Label: "Dark" on the left half */}
        <div className="w-[124px] h-full flex items-center justify-center pl-3">
          <motion.span
            animate={{
              opacity: isLight ? 0.95 : 0,
              scale: isLight ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
            className="text-[17.5px] font-medium text-white tracking-normal font-sans"
          >
            Dark
          </motion.span>
        </div>

        {/* Track Label: "Light" on the right half */}
        <div className="w-[124px] h-full flex items-center justify-center pr-3">
          <motion.span
            animate={{
              opacity: isLight ? 0 : 0.95,
              scale: isLight ? 0.9 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="text-[17.5px] font-medium text-white tracking-normal font-sans"
          >
            Light
          </motion.span>
        </div>

        {/* ── Oversized 3D Glass Sphere Thumb (Liquid Crystal Lens) ── */}
        <motion.div
          animate={{
            x: isLight ? 154 : -10,
          }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 23,
            mass: 0.85,
          }}
          className="absolute -top-[13px] left-0 w-[104px] h-[104px] rounded-full pointer-events-none z-30 flex items-center justify-center"
        >
          {/* Glass Sphere Material */}
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_18px_38px_-6px_rgba(0,0,0,0.75),0_0_20px_rgba(255,255,255,0.14)]">
            
            {/* Backdrop Blur to refract underlying track & labels */}
            <div className="absolute inset-0 backdrop-blur-[4px]" />

            {/* Clear Spherical Glass Convex Shading */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'radial-gradient(circle at 35% 28%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.08) 35%, rgba(0, 0, 0, 0.12) 65%, rgba(0, 0, 0, 0.48) 100%)',
              }}
            />

            {/* Specular Rim Light Ring */}
            <div className="absolute inset-0 rounded-full border border-white/40" />

            {/* Top-Left Crisp Curved Specular Reflection Arc */}
            <div
              className="absolute top-2 left-3 w-10 h-5 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.4) 45%, transparent 80%)',
                transform: 'rotate(-28deg)',
                filter: 'blur(0.5px)',
              }}
            />

            {/* Bottom-Right Subsurface Meniscus Glow */}
            <div
              className="absolute bottom-2.5 right-3.5 w-11 h-6 rounded-full pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 50% 80%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.08) 60%, transparent 100%)',
                transform: 'rotate(-18deg)',
                filter: 'blur(1.2px)',
              }}
            />

            {/* Inner Glowing Celestial Icon (Moon or Sun) */}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <AnimatePresence mode="wait">
                {!isLight ? (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0.45, opacity: 0, rotate: -30 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.45, opacity: 0, rotate: 30 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Moon Glow Aura */}
                    <div className="absolute w-9 h-9 rounded-full bg-white/20 filter blur-[7px]" />

                    {/* Waxing Crescent Moon matching video: back on left, horns point right */}
                    <svg
                      viewBox="0 0 24 24"
                      className="w-[30px] h-[30px] text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.95)]"
                      fill="currentColor"
                      style={{ transform: 'rotate(-38deg)' }}
                    >
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0.45, opacity: 0, rotate: 45 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    exit={{ scale: 0.45, opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.26, ease: 'easeOut' }}
                    className="relative flex items-center justify-center"
                  >
                    {/* Sun Glow Aura */}
                    <div className="absolute w-11 h-11 rounded-full bg-white/25 filter blur-[8px]" />

                    {/* Radiant Sun matching video: central disc + 8 rounded pill beams */}
                    <svg
                      viewBox="0 0 40 40"
                      className="w-[36px] h-[36px] text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]"
                      fill="currentColor"
                    >
                      {/* Sun Central Disc */}
                      <circle cx="20" cy="20" r="8" />

                      {/* 8 Radiating Beams with rounded caps */}
                      <line x1="20" y1="4" x2="20" y2="7.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="20" y1="32.5" x2="20" y2="36" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="4" y1="20" x2="7.5" y2="20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="32.5" y1="20" x2="36" y2="20" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      
                      <line x1="8.7" y1="8.7" x2="11.2" y2="11.2" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="28.8" y1="28.8" x2="31.3" y2="31.3" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="8.7" y1="31.3" x2="11.2" y2="28.8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
                      <line x1="28.8" y1="11.2" x2="31.3" y2="8.7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
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
