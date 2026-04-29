import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Magnetic SVG Gooey Melt Cursor, a specialized cursor that physically stretches and melts into interactive buttons using an SVG feColorMatrix filter, organic snap-together physics, ultra-premium component`;

export default function MagneticGooeyCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Springy cursor
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  const [isHoveringBtn, setIsHoveringBtn] = useState(false);
  const [btnCenter, setBtnCenter] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    if (isHoveringBtn) {
      // Pull cursor slightly towards button center
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const pullX = x + (btnCenter.x - x) * 0.8;
      const pullY = y + (btnCenter.y - y) * 0.8;
      cursorX.set(pullX);
      cursorY.set(pullY);
    } else {
      cursorX.set(e.clientX - rect.left);
      cursorY.set(e.clientY - rect.top);
    }
  };

  const handleBtnEnter = (e) => {
    if (!containerRef.current) return;
    const btnRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setBtnCenter({
      x: btnRect.left - containerRect.left + btnRect.width / 2,
      y: btnRect.top - containerRect.top + btnRect.height / 2
    });
    setIsHoveringBtn(true);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { cursorX.set(-100); cursorY.set(-100); }}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[500px]" 
        style={{ background: '#fafafa' }} 
      >
        <p className="absolute top-10 text-[10px] uppercase tracking-[0.3em] font-bold text-black/30">
          Magnetic Gooey Snap
        </p>

        {/* SVG Filter Definition */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="cursor-goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* The Gooey Layer (Applies to children inside) */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ filter: 'url(#cursor-goo)' }}>
          {/* Target Button Node */}
          <div 
            className="absolute w-[180px] h-[60px] bg-black rounded-full pointer-events-auto"
            style={{ 
              left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            }}
            onMouseEnter={handleBtnEnter}
            onMouseLeave={() => setIsHoveringBtn(false)}
          />

          {/* The Cursor Node */}
          <motion.div 
            className="absolute rounded-full bg-black pointer-events-none"
            style={{ 
              x: springX, y: springY, translateX: '-50%', translateY: '-50%',
              width: 30, height: 30
            }}
          />
        </div>

        {/* Text Layer (Outside gooey filter so it doesn't melt) */}
        <div className="pointer-events-none z-20 font-bold text-white tracking-widest text-[14px]">
          APPROACH ME
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
