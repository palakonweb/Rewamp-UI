import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Magnetic SVG Gooey Melt Cursor, dark-mode premium component. The cursor physically stretches, melts, and snaps into interactive buttons using an SVG feColorMatrix filter and organic spring physics.`;

export default function MagneticGooeyCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Springy cursor
  const springX = useSpring(cursorX, { stiffness: 300, damping: 25 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 25 });

  const [activeBtnId, setActiveBtnId] = useState(null);
  const [btnCenter, setBtnCenter] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (activeBtnId !== null) {
      // Pull cursor heavily towards button center, stretching it
      const pullX = x + (btnCenter.x - x) * 0.85;
      const pullY = y + (btnCenter.y - y) * 0.85;
      cursorX.set(pullX);
      cursorY.set(pullY);
    } else {
      cursorX.set(x);
      cursorY.set(y);
    }
  };

  const handleBtnEnter = (e, id) => {
    if (!containerRef.current) return;
    const btnRect = e.currentTarget.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    const centerX = btnRect.left - containerRect.left + btnRect.width / 2;
    const centerY = btnRect.top - containerRect.top + btnRect.height / 2;
    setBtnCenter({ x: centerX, y: centerY });
    setActiveBtnId(id);
    
    // Snap immediately even if mouse stops moving
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;
    cursorX.set(x + (centerX - x) * 0.85);
    cursorY.set(y + (centerY - y) * 0.85);
  };

  const handleMouseLeaveBtn = (e) => {
    setActiveBtnId(null);
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    cursorX.set(e.clientX - containerRect.left);
    cursorY.set(e.clientY - containerRect.top);
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => { cursorX.set(-100); cursorY.set(-100); }}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[600px] bg-[#030303]" 
      >
        <p className="absolute top-10 text-[11px] uppercase tracking-[0.4em] font-semibold text-white/20">
          Magnetic Gooey Snap
        </p>

        {/* SVG Filter Definition */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="magnetic-goo-filter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* The Gooey Layer (Applies to children inside) */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ filter: 'url(#magnetic-goo-filter)' }}>
          
          <div className="w-full h-full flex items-center justify-center gap-12">
             {[1, 2].map((id) => (
               <motion.div 
                 key={id}
                 animate={{ scale: activeBtnId === id ? 1.05 : 1 }}
                 className="relative w-[160px] h-[60px] bg-indigo-500 rounded-full pointer-events-auto"
                 onMouseEnter={(e) => handleBtnEnter(e, id)}
                 onMouseLeave={handleMouseLeaveBtn}
               />
             ))}
          </div>

          {/* The Cursor Node that melts into the buttons */}
          <motion.div 
            className="absolute rounded-full bg-indigo-500 pointer-events-none"
            style={{ 
              top: 0, left: 0,
              x: springX, y: springY, translateX: '-50%', translateY: '-50%',
              width: 36, height: 36
            }}
          />
        </div>

        {/* Text Layer (Outside gooey filter so it doesn't melt, layered perfectly on top of buttons) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center gap-12">
            <div className="w-[160px] h-[60px] flex items-center justify-center text-white font-bold tracking-widest text-[13px] uppercase">
                Approach
            </div>
            <div className="w-[160px] h-[60px] flex items-center justify-center text-white font-bold tracking-widest text-[13px] uppercase">
                Snap
            </div>
        </div>

      </div>
</div>
  );
}
