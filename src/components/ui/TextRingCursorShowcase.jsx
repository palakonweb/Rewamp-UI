import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Text Ring Cursor, clean premium agency aesthetic, circular text rotating around the cursor on a spring, expands and speeds up rotation when hovering interactive elements`;

export default function TextRingCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring settings for the ring
  const springX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const text = "EXPLORE • DISCOVER • CREATE • ";
  const characters = text.split("");

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
        onMouseLeave={() => { cursorX.set(-100); cursorY.set(-100); }}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[500px]" 
        style={{ background: '#fafafa' }} // clean light background
      >
        <p className="absolute top-10 text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">
          Text Ring Cursor
        </p>

        {/* Inner static dot */}
        <motion.div 
          className="absolute w-2 h-2 bg-black rounded-full pointer-events-none z-50"
          style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        />

        {/* The rotating text ring */}
        <motion.div 
          className="absolute pointer-events-none z-40 flex items-center justify-center"
          style={{ 
            x: springX, y: springY, 
            translateX: '-50%', translateY: '-50%',
            width: isHoveringCard ? 120 : 80, 
            height: isHoveringCard ? 120 : 80,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: isHoveringCard ? 4 : 10, repeat: Infinity, ease: "linear" }}
        >
          {characters.map((char, i) => {
            const rotation = (360 / characters.length) * i;
            return (
              <span
                key={i}
                className="absolute text-[9px] font-bold tracking-widest text-black"
                style={{
                  transform: `rotate(${rotation}deg) translateY(${isHoveringCard ? -50 : -35}px)`,
                  transformOrigin: "center",
                }}
              >
                {char}
              </span>
            );
          })}
        </motion.div>

        {/* Interactive Cards */}
        <div className="flex gap-6 z-20">
          {[1, 2].map((item) => (
            <div 
              key={item}
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}
              className="w-48 h-64 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-black/5 flex items-center justify-center pointer-events-auto transition-transform hover:-translate-y-2 duration-500"
            >
              <div className="w-24 h-24 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center">
                <span className="text-black/20 font-bold text-xl">0{item}</span>
              </div>
            </div>
          ))}
        </div>

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
