import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const promptContent = `Massive difference lens cursor that perfectly inverts colors beneath it. High-contrast, brutalist dark-mode typography layout where the cursor acts as a portal revealing the inverse spectrum.`;

export default function DifferenceLensCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-500);
  const cursorY = useMotionValue(-500);
  
  // Smooth buttery spring for the massive lens
  const springX = useSpring(cursorX, { stiffness: 120, damping: 25, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 25, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    // Hide cursor when leaving
    cursorX.set(-500);
    cursorY.set(-500);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-12 sm:p-20 flex flex-col items-center justify-center min-h-[600px] bg-[#050505]"
        style={{ isolation: 'isolate' }}
      >
        {/* Subtle Background Grid */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        {/* Content to be inverted */}
        <div className="relative z-10 w-full flex flex-col items-center text-center">
          <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="w-32 h-32 mb-8 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-600 blur-[2px]"
          />
          
          <h1 className="text-[60px] sm:text-[100px] font-black tracking-tighter leading-[0.85] text-[#ededed]">
            INVERT <br/> <span className="text-transparent border-text-white" style={{ WebkitTextStroke: '2px #ededed' }}>REALITY</span>
          </h1>
          
          <div className="mt-12 flex flex-wrap justify-center gap-4">
             {['Brutalist', 'Difference', 'Spectrum'].map((tag, i) => (
                <div key={i} className="px-6 py-2 rounded-full border border-white/20 text-white/60 text-sm font-semibold tracking-widest uppercase">
                   {tag}
                </div>
             ))}
          </div>
        </div>

        {/* THE LENS CURSOR */}
        <motion.div 
          className="absolute z-50 pointer-events-none rounded-full flex items-center justify-center"
          style={{ 
            top: 0, left: 0,
            x: springX, 
            y: springY, 
            translateX: '-50%', 
            translateY: '-50%',
            width: 280, 
            height: 280,
            mixBlendMode: 'difference',
            background: 'white',
          }}
        >
           {/* Inner crosshair for detail */}
           <div className="w-1 h-4 bg-black absolute" />
           <div className="w-4 h-1 bg-black absolute" />
        </motion.div>

        <span className="absolute bottom-6 right-6 text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Focus Difference Lens</span>
      </div>
</div>
  );
}
