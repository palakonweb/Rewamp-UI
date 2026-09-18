import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface FrostedFolderCardProps {
  className?: string;
  /** Allow external hover control if desired */
  hovered?: boolean;
}

// Photo collage contents — swap these for any images you like.
const COLLAGE_IMAGES = [
  { src: '/cards/sky-curtain.png', rotate: -3 },
  { src: '/cards/rainbow-hill.png', rotate: 4 },
  { src: '/cards/airplane-sunset.png', rotate: -6 },
  { src: '/cards/kangaroo-planet.png', rotate: 7 },
  { src: '/cards/train-window.jpg', rotate: -2 },
];

// Scattered target position for each photo once the folder springs open —
// a loose macOS-style burst rather than a tidy grid.
const OPEN_LAYOUT = [
  { x: -132, y: -150, rotate: -14, scale: 1.02 },
  { x: 96, y: -168, rotate: 10, scale: 0.96 },
  { x: -20, y: -206, rotate: -4, scale: 1.08 },
  { x: 138, y: -108, rotate: 16, scale: 0.9 },
  { x: -138, y: -96, rotate: -18, scale: 0.92 },
];

export default function FrostedFolderCard({
  className = '',
  hovered: controlledHovered,
}: FrostedFolderCardProps) {
  const [internalHovered, setInternalHovered] = useState(false);
  const isHovered = controlledHovered !== undefined ? controlledHovered : internalHovered;

  // Natural spring physics matching tactile physical paper & glass
  const springConfig = {
    type: 'spring',
    stiffness: 260,
    damping: 22,
    mass: 0.8,
  };

  return (
    <div
      onMouseEnter={() => setInternalHovered(true)}
      onMouseLeave={() => setInternalHovered(false)}
      onClick={() => setInternalHovered((prev) => !prev)}
      className={`relative select-none cursor-pointer flex items-center justify-center p-2 sm:p-4 w-full max-w-full ${className}`}
      style={{ perspective: '1000px' }}
    >
      {/* ── Main Folder Stage ── */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={springConfig}
        className="relative w-full max-w-[320px] sm:max-w-[400px] h-[288px] sm:h-[360px]"
      >
        {/* ── 1. Deep Obsidian / Black Folder Backing with Left-Hand Tab ── */}
        <div className="absolute inset-0 filter drop-shadow-[0_24px_40px_rgba(0,0,0,0.42)] pointer-events-none">
          <svg
            viewBox="0 0 400 360"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Folder Silhouette Path matching exact geometry */}
            <path
              d="M 0 72
                 A 46 46 0 0 1 46 22
                 L 150 22
                 C 178 22, 186 78, 214 78
                 L 354 78
                 A 46 46 0 0 1 400 124
                 L 400 314
                 A 46 46 0 0 1 354 360
                 L 46 360
                 A 46 46 0 0 1 0 314
                 Z"
              fill="#08080A"
            />
          </svg>
        </div>

        {/* ── 2. Photo Collage Layer — bursts open like macOS's folder-open animation ── */}
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-visible flex items-end justify-center pointer-events-none">
          {COLLAGE_IMAGES.map((photo, i) => {
            const open = OPEN_LAYOUT[i];
            // Closed state: photos peek out from behind the flap, gently stacked/staggered.
            const closedX = (i - (COLLAGE_IMAGES.length - 1) / 2) * 14;
            const closedY = -20 - i * 4;
            const closedRotate = photo.rotate * 0.35;

            return (
              <motion.div
                key={photo.src}
                animate={
                  isHovered
                    ? { x: open.x, y: open.y, rotate: open.rotate, scale: open.scale, opacity: 1 }
                    : { x: closedX, y: closedY, rotate: closedRotate, scale: 0.9, opacity: 1 }
                }
                transition={{
                  ...springConfig,
                  delay: isHovered ? i * 0.045 : (COLLAGE_IMAGES.length - i) * 0.02,
                }}
                style={{ zIndex: isHovered ? 40 + i : 10 + i }}
                className="absolute bottom-16 w-[104px] sm:w-[122px] h-[104px] sm:h-[122px] rounded-[16px] bg-white p-1.5 shadow-[0_10px_26px_rgba(0,0,0,0.28)] origin-bottom-center"
              >
                <img
                  src={photo.src}
                  alt=""
                  draggable={false}
                  className="w-full h-full object-cover rounded-[11px] select-none pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>

        {/* ── 3. Smoked Frosted Glass Front Flap ── */}
        <motion.div
          animate={{
            rotateX: isHovered ? -8 : 0,
            y: isHovered ? 3 : 0,
          }}
          transition={springConfig}
          style={{
            transformOrigin: 'bottom center',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-x-2.5 sm:inset-x-3 bottom-3 sm:bottom-3.5 h-[162px] sm:h-[188px] rounded-[34px] sm:rounded-[38px] overflow-hidden z-30 pointer-events-none"
        >
          {/* Glass body: blurred background + translucent smoked dark gradient */}
          <div
            className="w-full h-full backdrop-blur-[16px] flex flex-col justify-end pb-8 sm:pb-9 items-center"
            style={{
              background:
                'linear-gradient(180deg, rgba(88, 90, 98, 0.72) 0%, rgba(52, 54, 60, 0.80) 30%, rgba(30, 31, 35, 0.88) 65%, rgba(18, 19, 22, 0.96) 100%)',
              boxShadow:
                '0 18px 40px -4px rgba(0, 0, 0, 0.58), inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.42), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4)',
              border: '1px solid rgba(255, 255, 255, 0.16)',
            }}
          >
            {/* Top specular rim light sheen */}
            <div
              className="absolute top-0 inset-x-0 h-[2px] pointer-events-none"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.55) 20%, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.55) 80%, rgba(255, 255, 255, 0.05) 100%)',
              }}
            />

            {/* Three horizontal embossed grip / accent lines matching reference image */}
            <div className="w-[68%] flex flex-col gap-[5px] sm:gap-[6px] opacity-60">
              <div className="w-full h-[1.5px] bg-black/55 shadow-[0_1px_0_rgba(255,255,255,0.08)] rounded-full" />
              <div className="w-full h-[1.5px] bg-black/55 shadow-[0_1px_0_rgba(255,255,255,0.08)] rounded-full" />
              <div className="w-full h-[1.5px] bg-black/55 shadow-[0_1px_0_rgba(255,255,255,0.08)] rounded-full" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
