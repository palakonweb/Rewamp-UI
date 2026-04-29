import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `Magnetic Parallax Button, true magnetic physics where the cursor detaches and snaps to the button center while the button itself is pulled towards the mouse, multi-layer parallax with icon and text moving independently, ultra-premium interaction`;

function MagneticButton({ children }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring configurations for different layers to create parallax
  const springConfigBtn = { stiffness: 150, damping: 15, mass: 0.1 };
  const springConfigText = { stiffness: 200, damping: 10, mass: 0.1 };
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const btnX = useSpring(mouseX, springConfigBtn);
  const btnY = useSpring(mouseY, springConfigBtn);
  
  const textX = useSpring(useTransform(mouseX, v => v * 0.4), springConfigText);
  const textY = useSpring(useTransform(mouseY, v => v * 0.4), springConfigText);

  // Custom cursor position that snaps to center on hover
  const cursorX = useSpring(useMotionValue(0), { stiffness: 400, damping: 28 });
  const cursorY = useSpring(useMotionValue(0), { stiffness: 400, damping: 28 });
  const cursorScale = useSpring(useMotionValue(1), { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center (creates the "pull" effect)
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    mouseX.set(distanceX * 0.3); // Button moves 30% towards mouse
    mouseY.set(distanceY * 0.3);

    // If hovered, cursor snaps to center of the button's *current* animated position
    if (isHovered) {
      cursorX.set(centerX + distanceX * 0.3);
      cursorY.set(centerY + distanceY * 0.3);
    } else {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    cursorScale.set(1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    cursorScale.set(3); // Cursor expands and disappears behind text
  };

  // Global mouse tracker for the custom cursor when outside button
  useEffect(() => {
    const moveCursor = (e) => {
      if (!isHovered) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [isHovered, cursorX, cursorY]);

  return (
    <>
      {/* Custom Global Cursor */}
      <motion.div 
        className="fixed top-0 left-0 w-4 h-4 bg-white mix-blend-difference rounded-full pointer-events-none z-50 flex items-center justify-center"
        style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%', scale: cursorScale }}
      >
        {isHovered && <MousePointer2 size={4} className="text-black opacity-50" />}
      </motion.div>

      {/* Button Wrapper */}
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative px-12 py-5 rounded-full cursor-none flex items-center justify-center"
        style={{ x: btnX, y: btnY }}
      >
        {/* Physical Button Background */}
        <div className="absolute inset-0 rounded-full bg-[#111] border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
          {/* Internal Glow on hover */}
          <motion.div 
            className="absolute inset-0 bg-white/5"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Parallax Content */}
        <motion.div 
          className="relative z-10 flex items-center gap-3 text-white font-semibold tracking-wide"
          style={{ x: textX, y: textY }}
        >
          {children}
        </motion.div>
      </motion.div>
    </>
  );
}

export default function MagneticParallaxButtonShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[400px]" style={{ background: '#050505' }}>
        
        {/* Ambient background grid */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 text-white/30 text-center">
          Magnetic Parallax<br/>(Move mouse nearby)
        </p>

        <MagneticButton>
          <span>Authenticate</span>
          <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>
        </MagneticButton>

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
