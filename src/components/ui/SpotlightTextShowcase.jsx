import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Spotlight Text Reveal. A pitch black container where text is hidden. The cursor acts as a highly saturated gradient spotlight, revealing the text underneath using CSS mask-image and Framer Motion template math.`;

export default function SpotlightTextShowcase() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const containerRef = useRef(null);
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
    const maskImage = useMotionTemplate`radial-gradient(150px circle at ${springX}px ${springY}px, black 0%, transparent 100%)`;

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
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/10 dark:border-white/10 bg-[#0c0c10] shadow-2xl flex items-center justify-center cursor-crosshair group select-none"
            >
                
                {/* Base Text with subtle readable glow */}
                <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white/15 text-center w-full absolute pointer-events-none">
                    EXPLORE
                </h2>

                {/* Bright Spotlight Text Layer */}
                <motion.div 
                    className="absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                        WebkitMaskImage: maskImage,
                        maskImage: maskImage
                    }}
                >
                    {/* The text has a vibrant background-clip gradient in brand lilac */}
                    <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#9C8EB8] via-[#D4CBE5] to-[#FFFFFF] text-center w-full">
                        EXPLORE
                    </h2>
                </motion.div>
            </div>

            <p className="text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover across to reveal with the spotlight
            </p>
        </div>
    );
}
