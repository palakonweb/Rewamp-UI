import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark radial spotlight interacting with mouse movement, subtle grainy noise overlay`;

export default function RadialSpotlightBackgroundShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);
    
    // Mouse tracking for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            // Center initially
            const rect = container.getBoundingClientRect();
            mouseX.set(rect.width / 2);
            mouseY.set(rect.height / 2);
        }
        return () => {
            if (container) container.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div 
                ref={containerRef}
                className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-2xl flex items-center justify-center p-8 group cursor-crosshair"
            >
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute inset-0 z-10 opacity-40 mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />
                    
                    <motion.div
                        className="absolute w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-10 mix-blend-screen -ml-[300px] -mt-[300px]"
                        style={{ x: smoothX, y: smoothY }}
                    />
                    
                    <div className="absolute inset-0 bg-[#050505] mix-blend-multiply opacity-50"></div>
                </div>

                {/* 📝 DUMMY CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg pointer-events-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="px-3 py-1 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 text-[11px] font-medium tracking-widest uppercase shadow-xl"
                    >
                        Purrform
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm"
                    >
                        Interactive Light
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
                    >
                        Responsive spotlight effect with rich film grain. Hover your cursor to interact with the environment.
                    </motion.p>
                    
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-full bg-white text-black font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow duration-300 pointer-events-auto"
                    >
                        Explore Components
                    </motion.button>
                </div>
            </div>

            {/* 📋 PROMPT CARD */}
            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                
                {/* 🔘 COPY BUTTON */}
                <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-all w-full sm:w-auto justify-center shrink-0"
                    aria-label="Copy prompt text"
                >
                    {copied ? (
                        <>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check size={16} className="text-emerald-500" />
                            </motion.div>
                            <span className="text-[13px] font-medium text-emerald-500">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} className="text-black/60 dark:text-white/60" />
                            <span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
