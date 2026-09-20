import React, { useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
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
    <div className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center flex-1 min-h-0 bg-[#050505] group"
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

        <BackgroundHeroOverlay />

      </div>
</div>
  );
}
