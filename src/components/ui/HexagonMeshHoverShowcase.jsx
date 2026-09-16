import React, { useRef, useState, useEffect } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Hexagon Mesh Hover Background. A geometric honeycomb grid where the user's cursor acts as a spotlight, revealing vivid glowing neon borders of the hexagons nearest to the mouse.`;

export default function HexagonMeshHoverShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Spotlight physics
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(-1000);
    mouseY.set(-1000);
  };

  // Hexagon SVG pattern logic
  // We use a CSS repeating background trick to make hexagons, or inline SVG.
  // An inline SVG pattern is cleanest for exact border control.
  
  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 flex flex-col items-center justify-center min-h-[500px] bg-[#000] cursor-crosshair group"
      >
        
        <svg width="0" height="0" className="absolute">
          <defs>
            <pattern id="hexagons-base" width="50" height="87" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path 
                d="M25 0 L50 14.5 L50 43.5 L25 58 L0 43.5 L0 14.5 Z M25 87 L50 72.5 L50 43.5 L25 29 L0 43.5 L0 72.5 Z M75 29 L100 14.5 L100 43.5 L75 58 L50 43.5 L50 14.5 Z M-25 29 L0 14.5 L0 43.5 L-25 58 L-50 43.5 L-50 14.5 Z" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.08)" 
                strokeWidth="1.5" 
              />
            </pattern>
            <pattern id="hexagons-fuchsia" width="50" height="87" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path 
                d="M25 0 L50 14.5 L50 43.5 L25 58 L0 43.5 L0 14.5 Z M25 87 L50 72.5 L50 43.5 L25 29 L0 43.5 L0 72.5 Z M75 29 L100 14.5 L100 43.5 L75 58 L50 43.5 L50 14.5 Z M-25 29 L0 14.5 L0 43.5 L-25 58 L-50 43.5 L-50 14.5 Z" 
                fill="none" 
                stroke="#D946EF" 
                strokeWidth="2" 
              />
            </pattern>
            <pattern id="hexagons-cyan" width="50" height="87" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path 
                d="M25 0 L50 14.5 L50 43.5 L25 58 L0 43.5 L0 14.5 Z M25 87 L50 72.5 L50 43.5 L25 29 L0 43.5 L0 72.5 Z M75 29 L100 14.5 L100 43.5 L75 58 L50 43.5 L50 14.5 Z M-25 29 L0 14.5 L0 43.5 L-25 58 L-50 43.5 L-50 14.5 Z" 
                fill="none" 
                stroke="#22D3EE" 
                strokeWidth="2" 
              />
            </pattern>
          </defs>
        </svg>

        {/* Base Dim Hexagon Grid (Always subtle rgba white, never affected by dark mode) */}
        <div className="absolute inset-0 pointer-events-none">
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons-base)" /></svg>
        </div>

        {/* Hover Highlight Hexagon Grid Layer (Uses Mask) */}
        <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
                filter: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.8))'
            }}
        >
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons-fuchsia)" /></svg>
        </motion.div>
        
        {/* Second Hover Layer for multi-color depth */}
        <motion.div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                WebkitMaskImage: useMotionTemplate`radial-gradient(150px circle at calc(${springX}px - 10px) calc(${springY}px - 10px), black 0%, transparent 100%)`,
                maskImage: useMotionTemplate`radial-gradient(150px circle at calc(${springX}px - 10px) calc(${springY}px - 10px), black 0%, transparent 100%)`,
                filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))'
            }}
        >
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons-cyan)" /></svg>
        </motion.div>

        <BackgroundHeroOverlay />
      </div>
</div>
  );
}
