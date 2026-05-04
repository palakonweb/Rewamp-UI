import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Velocity Marquee Text. A massive, continuously scrolling text track that dynamically increases its speed when the user drags their cursor or scrolls, simulating momentum physics.`;

function ParallaxText({ children, baseVelocity = 100, isDragging, dragDelta }) {
  const baseX = useMotionValue(0);
  
  // Smooth out the velocity multiplier based on drag speed
  const velocitySpring = useSpring(0, { damping: 50, stiffness: 400 });

  useEffect(() => {
    if (isDragging) {
        velocitySpring.set(dragDelta * 0.1);
    } else {
        // Return to 0 quickly when dragging stops
        velocitySpring.set(0);
    }
  }, [isDragging, dragDelta, velocitySpring]);

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  if (baseVelocity < 0) directionFactor.current = -1;

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // Apply the spring velocity boost
    moveBy += directionFactor.current * moveBy * Math.abs(velocitySpring.get());

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
      <motion.div className="flex whitespace-nowrap gap-12 font-black text-6xl sm:text-8xl md:text-9xl tracking-tighter uppercase pr-12" style={{ x }}>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
        <span>{children}</span>
      </motion.div>
    </div>
  );
}

// Utility to wrap a value in a range
const wrap = (min, max, v) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export default function VelocityMarqueeTextShowcase() {
    const [copied, setCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [dragDelta, setDragDelta] = useState(0);
    const lastMouseX = useRef(0);

    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const delta = Math.abs(e.clientX - lastMouseX.current);
        setDragDelta(delta);
        lastMouseX.current = e.clientX;
    };

    const handleMouseDown = (e) => {
        setIsDragging(true);
        lastMouseX.current = e.clientX;
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragDelta(0);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10 bg-[#09090b] shadow-xl flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 0%, #000 100%)' }} />
                
                <div className="w-full flex flex-col gap-4 text-white/90">
                    <ParallaxText baseVelocity={-2} isDragging={isDragging} dragDelta={dragDelta}>Creative Velocity</ParallaxText>
                    <ParallaxText baseVelocity={2} isDragging={isDragging} dragDelta={dragDelta}>Limitless Momentum</ParallaxText>
                </div>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase pointer-events-none">Interactive Marquee (Drag)</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
