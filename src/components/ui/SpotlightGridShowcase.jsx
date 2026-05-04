import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Spotlight Grid Background, ultra-premium dark mode background. A hidden geometric grid is beautifully revealed by a smooth, cursor-tracking radial flashlight mask using Framer Motion templates.`;

export default function SpotlightGridShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Smooth out the spotlight movement
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Generate the dynamic mask using useMotionTemplate
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

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

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[500px] bg-[#050505] group"
      >
        
        {/* Base dark layer with very faint grid so it's not totally pitch black */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', 
            backgroundSize: '40px 40px' 
          }} 
        />

        {/* The Spotlight Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
          style={{
            // This is the bright grid that only shows where the mask is
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', 
            backgroundSize: '40px 40px',
            WebkitMaskImage: maskImage,
            maskImage: maskImage,
          }}
        >
            {/* Soft inner glow following the cursor */}
            <motion.div 
                className="absolute inset-0 bg-indigo-500/10 pointer-events-none"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                }}
            />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center pointer-events-none">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4 drop-shadow-md">
                Spotlight Mesh
            </h2>
            <p className="text-white/50 tracking-wide text-sm max-w-sm text-center">
                Move your cursor to reveal the hidden architecture underneath the void.
            </p>
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
