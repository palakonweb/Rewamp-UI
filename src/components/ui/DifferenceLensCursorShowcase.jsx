import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Difference Lens Cursor, massive circular cursor using mix-blend-mode difference and backdrop-filter invert to perfectly invert and magnify typography and images underneath it`;

export default function DifferenceLensCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { cursorX.set(-200); cursorY.set(-200); }}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[500px] bg-white" 
      >
        {/* Content to be inverted */}
        <div className="relative z-10 w-full max-w-lg">
          <h1 className="text-[64px] sm:text-[96px] font-black tracking-tighter leading-[0.9] text-black">
            SEE <br /> THINGS <br /> DIFFERENTLY.
          </h1>
          <div className="mt-8 flex gap-4">
            <div className="w-24 h-24 rounded-full bg-blue-600" />
            <div className="w-24 h-24 rounded-full bg-red-500" />
            <div className="w-24 h-24 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* The Lens Cursor */}
        <motion.div 
          className="absolute z-50 pointer-events-none rounded-full"
          style={{ 
            x: springX, y: springY, translateX: '-50%', translateY: '-50%',
            width: 200, height: 200,
            // The magic happens here:
            mixBlendMode: 'difference',
            background: 'white',
          }}
        />

      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0"><p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p><code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
