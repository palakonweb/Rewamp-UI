import React, { useRef, useState, useEffect } from 'react';
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
            <pattern id="hexagons" width="50" height="87" patternUnits="userSpaceOnUse" patternTransform="scale(0.5)">
              <path 
                d="M25 0 L50 14.5 L50 43.5 L25 58 L0 43.5 L0 14.5 Z M25 87 L50 72.5 L50 43.5 L25 29 L0 43.5 L0 72.5 Z M75 29 L100 14.5 L100 43.5 L75 58 L50 43.5 L50 14.5 Z M-25 29 L0 14.5 L0 43.5 L-25 58 L-50 43.5 L-50 14.5 Z" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
              />
            </pattern>
          </defs>
        </svg>

        {/* Base Dim Hexagon Grid */}
        <div className="absolute inset-0 pointer-events-none text-white/[0.04]">
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons)" /></svg>
        </div>

        {/* Hover Highlight Hexagon Grid Layer (Uses Mask) */}
        <motion.div 
            className="absolute inset-0 pointer-events-none text-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                WebkitMaskImage: maskImage,
                maskImage: maskImage,
                filter: 'drop-shadow(0 0 8px rgba(217, 70, 239, 0.8))'
            }}
        >
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons)" /></svg>
        </motion.div>
        
        {/* Second Hover Layer for multi-color depth */}
        <motion.div 
            className="absolute inset-0 pointer-events-none text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            style={{
                // Offset the mask slightly for a chromatic aberration effect
                WebkitMaskImage: useMotionTemplate`radial-gradient(150px circle at calc(${springX}px - 10px) calc(${springY}px - 10px), black 0%, transparent 100%)`,
                maskImage: useMotionTemplate`radial-gradient(150px circle at calc(${springX}px - 10px) calc(${springY}px - 10px), black 0%, transparent 100%)`,
                filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.6))'
            }}
        >
           <svg className="w-full h-full"><rect width="100%" height="100%" fill="url(#hexagons)" /></svg>
        </motion.div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pointer-events-none">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
                HEXA_CORE
            </h2>
            <div className="px-5 py-2 rounded-full bg-white/[0.02] backdrop-blur-md border border-white/10 text-white/40 text-xs font-semibold tracking-widest uppercase">
                Interactive Honeycomb
            </div>
        </div>

      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex-1 min-w-0"><p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p><code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">{promptContent}</code></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
