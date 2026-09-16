import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';

const promptContent = `Text Ring Cursor, dark mode premium agency aesthetic. Circular text rotates smoothly around the cursor pointer on a spring, expanding heavily and glowing neon when hovering interactive elements.`;

export default function TextRingCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Spring settings
  const springX = useSpring(cursorX, { stiffness: 200, damping: 20 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 20 });

  const [isHovering, setIsHovering] = useState(false);

  const text = "SCROLL TO DISCOVER • SCROLL TO DISCOVER • ";
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
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[600px] bg-[#0c0c0e]" 
      >
        <p className="absolute top-10 text-[11px] uppercase tracking-[0.4em] font-semibold text-white/30">
          Typographic Cursor
        </p>

        {/* Inner static dot */}
        <motion.div 
          className="absolute flex items-center justify-center pointer-events-none z-50"
          style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        >
           <motion.div 
               animate={{ scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }}
               className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]"
           />
           {/* Center icon that appears on hover */}
           <motion.div
               animate={{ scale: isHovering ? 1 : 0, opacity: isHovering ? 1 : 0 }}
               className="absolute w-10 h-10 bg-emerald-400 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.4)]"
           >
               <ArrowRight className="text-black w-4 h-4" />
           </motion.div>
        </motion.div>

        {/* The rotating text ring */}
        <motion.div 
          className="absolute pointer-events-none z-40 flex items-center justify-center"
          style={{ 
            x: springX, y: springY, 
            translateX: '-50%', translateY: '-50%',
            width: isHovering ? 180 : 100, 
            height: isHovering ? 180 : 100,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: isHovering ? 3 : 12, repeat: Infinity, ease: "linear" }}
        >
          {characters.map((char, i) => {
            const rotation = (360 / characters.length) * i;
            return (
              <span
                key={i}
                className={`absolute text-[10px] font-bold tracking-widest transition-colors duration-300 ${isHovering ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'text-white/60'}`}
                style={{
                  transform: `rotate(${rotation}deg) translateY(${isHovering ? -80 : -45}px)`,
                  transformOrigin: "center",
                }}
              >
                {char}
              </span>
            );
          })}
        </motion.div>

        {/* Interactive Target */}
        <div className="z-20 flex flex-col items-center">
            <motion.div 
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              whileHover={{ scale: 1.05 }}
              className="w-64 aspect-[4/3] bg-white/[0.03] rounded-2xl border border-white/10 flex items-center justify-center pointer-events-auto cursor-none overflow-hidden relative group"
            >
               <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-80 transition-opacity duration-700 grayscale group-hover:grayscale-0" alt="abstract" />
               <div className="absolute inset-0 bg-black/40" />
               <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase">Hover Me</span>
            </motion.div>
        </div>
      </div>
</div>
  );
}
