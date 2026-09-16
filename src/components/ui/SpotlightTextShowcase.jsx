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
                className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10 bg-[#000] shadow-xl flex items-center justify-center cursor-crosshair group select-none"
            >
                
                {/* Dark Base Text (Barely Visible) */}
                <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-white/[0.03] text-center w-full absolute pointer-events-none">
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
                    {/* The text has a vibrant background-clip gradient */}
                    <h2 className="text-6xl sm:text-8xl md:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-500 text-center w-full">
                        EXPLORE
                    </h2>
                </motion.div>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase pointer-events-none">Interactive Spotlight Reveal</span>
            </div>
</div>
    );
}
