import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `edgy cyberpunk neon glitch button with intense chromatic aberration typography`;

export default function CyberGlitchButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0a0a0c] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-[240px] h-[64px] cursor-pointer"
                >
                    {/* The Button */}
                    <motion.button 
                        className="relative z-10 w-full h-full flex items-center justify-center bg-transparent border-2 border-[#fff] overflow-hidden group/btn"
                    >
                        {/* Glitch Borders (Cyan/Magenta flashes) */}
                        <motion.div 
                            variants={{
                                hover: { opacity: [0, 1, 0, 1, 0], x: [-5, 5, -2, 2, 0] }
                            }}
                            transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
                            className="absolute inset-[-2px] border-2 border-cyan-400 opacity-0 mix-blend-screen pointer-events-none"
                        />
                        <motion.div 
                            variants={{
                                hover: { opacity: [0, 1, 0, 1, 0], x: [5, -5, 2, -2, 0] }
                            }}
                            transition={{ duration: 0.4, times: [0, 0.2, 0.4, 0.6, 1] }}
                            className="absolute inset-[-2px] border-2 border-fuchsia-500 opacity-0 mix-blend-screen pointer-events-none"
                        />

                        {/* Text Container for Chromatic Aberration */}
                        <div className="relative z-20 flex items-center justify-center">
                            {/* Base Text */}
                            <span className="text-white text-[18px] font-bold tracking-[0.2em] uppercase mix-blend-difference">OVERRIDE</span>
                            
                            {/* Cyan Glitch Text */}
                            <motion.span 
                                variants={{
                                    hover: { opacity: [0, 1, 1, 0], x: [-3, -4, 2, 0], y: [1, 0, -1, 0], clipPath: ['inset(20% 0 80% 0)', 'inset(50% 0 30% 0)', 'inset(10% 0 60% 0)', 'inset(0 0 0 0)'] }
                                }}
                                transition={{ duration: 0.3, ease: "linear" }}
                                className="absolute text-cyan-400 text-[18px] font-bold tracking-[0.2em] uppercase opacity-0 pointer-events-none"
                            >
                                OVERRIDE
                            </motion.span>
                            
                            {/* Magenta Glitch Text */}
                            <motion.span 
                                variants={{
                                    hover: { opacity: [0, 1, 1, 0], x: [3, 4, -2, 0], y: [-1, 0, 1, 0], clipPath: ['inset(60% 0 10% 0)', 'inset(20% 0 50% 0)', 'inset(80% 0 10% 0)', 'inset(0 0 0 0)'] }
                                }}
                                transition={{ duration: 0.3, ease: "linear" }}
                                className="absolute text-fuchsia-500 text-[18px] font-bold tracking-[0.2em] uppercase opacity-0 pointer-events-none"
                            >
                                OVERRIDE
                            </motion.span>
                        </div>
                        
                        {/* Hover Fill */}
                        <motion.div 
                            variants={{
                                hover: { scaleY: 1 }
                            }}
                            initial={{ scaleY: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-white origin-bottom z-10 mix-blend-difference"
                        />
                    </motion.button>
                </motion.div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Cyber Glitch</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <motion.button onClick={handleCopy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </motion.button>
            </div>
        </div>
    );
}
