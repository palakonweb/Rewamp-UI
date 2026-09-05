import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `floating blurred blobs with layered depth and parallax effect, deep high-contrast UI background`;

export default function FloatingBlobsBackgroundShowcase() {
    const [copied, setCopied] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Parallax values based on mock scroll (since it's inside a div, we'll just use animation to simulate parallax drift)
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#080808] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Far background blob */}
                    <motion.div
                        style={{ y: y1 }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-600/20 rounded-[40%] blur-[80px]"
                    />
                    
                    {/* Mid blob */}
                    <motion.div
                        style={{ y: y2 }}
                        animate={{
                            y: [0, 40, 0],
                            x: [0, -30, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-[50%] blur-[90px]"
                    />
                    
                    {/* Foreground sharp blob */}
                    <motion.div
                        animate={{
                            y: [0, -20, 20, 0],
                            x: [0, -20, 10, 0],
                            scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-purple-500/30 rounded-full blur-[60px]"
                    />
                </div>

                {/* 📝 DUMMY CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="px-3 py-1 mb-6 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white/70 text-[11px] font-medium tracking-widest uppercase"
                    >
                        Purrform
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm"
                    >
                        Floating Depth
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md"
                    >
                        Create spatial awareness with distinct, layered blurred shapes that move independently.
                    </motion.p>
                    
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="px-6 py-3 rounded-full bg-white text-black font-medium text-sm shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow duration-300"
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
