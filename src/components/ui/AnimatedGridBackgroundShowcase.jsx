import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `animated 3D grid with perspective distortion and glowing fade-out edges, futuristic minimalist UI`;

export default function AnimatedGridBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#020202] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden perspective-[1000px]">
                    {/* Dark gradient fade for the top to make the grid taper off */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent h-1/2 w-full" />
                    
                    <motion.div
                        animate={{
                            backgroundPosition: ['0px 0px', '0px 40px'],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-100%] w-[300%] h-[300%] top-1/2 left-1/2 flex items-center justify-center"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            transform: 'translate(-50%, -10%) rotateX(60deg) scale(2)',
                            transformOrigin: 'top center'
                        }}
                    />
                    
                    {/* Glowing highlight in the center */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[var(--color-accent-red)]/10 blur-[80px] pointer-events-none rounded-t-full mask-image:linear-gradient(to top, white, transparent)" />
                </div>

                {/* 📝 DUMMY CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg">
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
                        Infinite Grid
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
                    >
                        Retrofuturistic perspective plane creating an illusion of infinite forward motion.
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
