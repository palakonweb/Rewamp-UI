export const frostedFolderCardPrompt = `Create a tactile 3D folder component with a smoked frosted acrylic front flap and realistic spring fan-out animation:
- Structure: A solid deep obsidian/black folder backing with a curved left-hand tab and smooth rounded silhouette.
- Documents: Three clean rounded document sheets tucked inside at rest:
  - Left and right sheets upright with wireframe text placeholder lines.
  - Middle sheet elevated and tilted slightly (-5.5 degrees) overlapping both sheets, with 3 rounded text lines.
- Smoked Glass Front Flap:
  - Translucent smoked dark acrylic with backdrop blur diffusion so the document bases show through.
  - Specular rim light sheen along the top edge.
  - Three subtle horizontal embossed grip lines across the lower flap.
- Hover & Click Interaction:
  - On hover or click, spring physics smoothly fan out the documents: middle sheet springs upwards, side sheets fan outward symmetrically with angled rotations.
  - The front flap subtly breathes forward with 3D perspective.
- Tech Stack: React, Framer Motion, TypeScript, Tailwind CSS.`;

export const frostedFolderCardCode = `import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface FrostedFolderCardProps {
  className?: string;
  /** Allow external hover control if desired */
  hovered?: boolean;
}

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
      className={\`relative select-none cursor-pointer flex items-center justify-center p-4 \${className}\`}
      style={{ perspective: '1000px' }}
    >
      {/* ── Main Folder Stage (400px x 360px) ── */}
      <motion.div
        animate={{
          y: isHovered ? -8 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={springConfig}
        className="relative w-[340px] sm:w-[400px] h-[306px] sm:h-[360px]"
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

        {/* ── 2. Documents Layer (3 rounded wireframe sheets) ── */}
        <div className="absolute inset-x-0 bottom-0 top-0 overflow-visible flex items-center justify-center pointer-events-none">
          {/* Left Document Sheet */}
          <motion.div
            animate={{
              x: isHovered ? -68 : -42,
              y: isHovered ? -64 : -24,
              rotate: isHovered ? -13 : 0,
              scale: isHovered ? 1.02 : 1,
            }}
            transition={springConfig}
            className="absolute bottom-12 w-[126px] sm:w-[146px] h-[165px] sm:h-[190px] rounded-[20px] bg-[#ECECEE] border border-black/[0.04] p-4 flex flex-col gap-2.5 shadow-[0_4px_14px_rgba(0,0,0,0.12)] origin-bottom-center z-10"
          >
            <div className="h-2 sm:h-2.5 w-3/4 rounded-full bg-[#D4D4D8] mt-1" />
            <div className="h-2 sm:h-2.5 w-5/6 rounded-full bg-[#D4D4D8]" />
          </motion.div>

          {/* Right Document Sheet */}
          <motion.div
            animate={{
              x: isHovered ? 68 : 44,
              y: isHovered ? -54 : -12,
              rotate: isHovered ? 13 : 0,
              scale: isHovered ? 1.02 : 0.98,
            }}
            transition={springConfig}
            className="absolute bottom-12 w-[124px] sm:w-[142px] h-[160px] sm:h-[185px] rounded-[20px] bg-[#E8E8EC] border border-black/[0.04] p-4 flex flex-col gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.10)] origin-bottom-center z-10"
          >
            <div className="h-2 sm:h-2.5 w-2/3 rounded-full bg-[#D8D8DC] mt-1" />
            <div className="h-2 sm:h-2.5 w-1/2 rounded-full bg-[#E0E0E4]" />
          </motion.div>

          {/* Middle Document Sheet (Tilted ~-5.5°, elevated, overlaps left & right sheets) */}
          <motion.div
            animate={{
              x: isHovered ? 0 : -8,
              y: isHovered ? -98 : -54,
              rotate: isHovered ? -2.5 : -5.5,
              scale: isHovered ? 1.05 : 1,
            }}
            transition={springConfig}
            className="absolute bottom-12 w-[134px] sm:w-[155px] h-[175px] sm:h-[200px] rounded-[22px] bg-[#F5F5F7] border border-black/[0.03] p-4 sm:p-5 flex flex-col gap-2.5 shadow-[0_12px_28px_rgba(0,0,0,0.18)] origin-bottom-center z-20"
          >
            <div className="h-2.5 sm:h-3 w-1/2 rounded-full bg-[#D4D4D8] mt-1" />
            <div className="h-2.5 sm:h-3 w-5/6 rounded-full bg-[#D4D4D8]" />
            <div className="h-2.5 sm:h-3 w-3/5 rounded-full bg-[#D4D4D8]" />
          </motion.div>
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
`;
