import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `cyberpunk neon navigation bar with chromatic text glitching on hover states`;

export default function CyberpunkGlitchNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = ["NEXUS", "MAINFRAME", "CYBERDECK", "ARCHIVE"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#060608] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE CYBERPUNK NAVBAR */}
                <nav className="relative flex items-center gap-6 p-4 border border-cyan-500/30 bg-[#0a0a0c]/80 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,204,0.1)] skew-x-[-10deg]">
                    
                    {/* Top inner line */}
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff0055] to-transparent opacity-50" />
                    
                    {links.map((link, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <button
                                key={link}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative group/link overflow-hidden px-4 py-2"
                            >
                                {/* Base Text */}
                                <span className={`relative z-20 font-bold font-mono tracking-widest text-[14px] transition-colors duration-300 ${isHovered ? 'text-white' : 'text-cyan-400/70'}`}>
                                    {link}
                                </span>

                                {/* Glitch Layer: Cyan */}
                                <motion.span 
                                    className="absolute inset-0 px-4 py-2 text-cyan-400 font-bold font-mono tracking-widest text-[14px] pointer-events-none mix-blend-screen opacity-0"
                                    animate={{ 
                                        opacity: isHovered ? [0, 1, 0, 1, 0] : 0,
                                        x: isHovered ? [-3, 3, -1, 0] : 0,
                                        y: isHovered ? [1, -1, 1, 0] : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {link}
                                </motion.span>

                                {/* Glitch Layer: Magenta */}
                                <motion.span 
                                    className="absolute inset-0 px-4 py-2 text-fuchsia-500 font-bold font-mono tracking-widest text-[14px] pointer-events-none mix-blend-screen opacity-0"
                                    animate={{ 
                                        opacity: isHovered ? [0, 1, 0, 1, 0] : 0,
                                        x: isHovered ? [3, -3, 1, 0] : 0,
                                        y: isHovered ? [-1, 1, -1, 0] : 0
                                    }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {link}
                                </motion.span>
                                
                                {/* Neon Underline Indicator */}
                                <motion.div 
                                    className="absolute bottom-0 left-0 h-[2px] bg-[#00ffcc] shadow-[0_0_8px_#00ffcc] w-full origin-left"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: isHovered ? 1 : 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Cyber Glitch</span>
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
