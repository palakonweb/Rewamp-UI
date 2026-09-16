import React, { useRef, useState, useEffect } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Liquid Cursor Gradient Background, ultra-premium SaaS aesthetic. Uses extreme blur layers over massive colored orbs. One orb smoothly tracks the cursor using spring physics.`;

export default function LiquidCursorGradientShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Buttery smooth liquid spring tracking
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20, mass: 0.8 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20, mass: 0.8 });

  useEffect(() => {
    // Initial center position
    if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(rect.width / 2);
        mouseY.set(rect.height / 2);
    }
  }, [mouseX, mouseY]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 min-h-[500px] bg-[#000]"
      >
        
        {/* The Colored Orbs Layer */}
        <div className="absolute inset-0 z-0">
            {/* Static Ambient Orbs */}
            <motion.div 
                animate={{ 
                    x: [0, 50, 0, -50, 0], 
                    y: [0, -50, 50, -20, 0],
                    scale: [1, 1.2, 0.9, 1.1, 1]
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-violet-600 rounded-full mix-blend-screen opacity-80"
            />
            <motion.div 
                animate={{ 
                    x: [0, -60, 20, 40, 0], 
                    y: [0, 40, -40, 30, 0],
                    scale: [1, 0.8, 1.3, 0.9, 1]
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[60%] bg-fuchsia-600 rounded-full mix-blend-screen opacity-80"
            />
            
            {/* The Mouse Tracking Orb */}
            <motion.div 
                className="absolute w-[400px] h-[400px] bg-cyan-400 rounded-full mix-blend-screen opacity-70"
                style={{
                    x: springX,
                    y: springY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </div>

        {/* The Heavy Blur Glass Layer (The Magic) */}
        <div className="absolute inset-0 z-10 backdrop-blur-[80px] bg-black/10" />

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 z-10 opacity-20 pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

        <BackgroundHeroOverlay title="Liquid cursor gradients to enhance your UI" />

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
