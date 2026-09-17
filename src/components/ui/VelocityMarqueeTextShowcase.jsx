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
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div
                className="relative w-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
            >
                <div className="w-full flex flex-col gap-4">
                    <div className="text-neutral-900 dark:text-[#E4DDF0]">
                        <ParallaxText baseVelocity={-2} isDragging={isDragging} dragDelta={dragDelta}>Creative Velocity</ParallaxText>
                    </div>
                    <div className="text-[#7A6B94] dark:text-[#C1B4D8]">
                        <ParallaxText baseVelocity={2} isDragging={isDragging} dragDelta={dragDelta}>Limitless Momentum</ParallaxText>
                    </div>
                </div>
            </div>

            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click and drag horizontally to accelerate velocity
            </p>
        </div>
    );
}
