import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Droplets } from 'lucide-react';

const promptContent = `glass card with a gooey, liquid morphing blob background that constantly shifts and reacts organically`;

export default function LiquidMorphCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eef2f5] dark:bg-[#09090b] flex items-center justify-center p-8">
                
                {/* SVG Filter for Gooey Effect */}
                <svg className="hidden">
                    <defs>
                        <filter id="goo">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                            <feBlend in="SourceGraphic" in2="goo" />
                        </filter>
                    </defs>
                </svg>

                {/* THE LIQUID MORPH CARD */}
                <div className="relative w-full max-w-[340px] aspect-square rounded-[32px] bg-transparent flex items-center justify-center group">
                    
                    {/* Liquid Background Container */}
                    <div 
                        className="absolute inset-0 z-0 overflow-hidden rounded-[32px]"
                        style={{ filter: "url('#goo')" }}
                    >
                        {/* Main dark blob */}
                        <div className="absolute inset-0 bg-black dark:bg-[#111111]" />
                        
                        {/* Animated colored blobs */}
                        <motion.div
                            animate={{
                                x: [0, 50, -30, 0],
                                y: [0, -40, 50, 0],
                                scale: [1, 1.2, 0.8, 1],
                            }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-500 rounded-full mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                x: [0, -60, 40, 0],
                                y: [0, 50, -30, 0],
                                scale: [1, 0.9, 1.3, 1],
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-blue-600 rounded-full mix-blend-screen"
                        />
                        <motion.div
                            animate={{
                                x: [0, 40, -50, 0],
                                y: [0, 30, -60, 0],
                                scale: [1, 1.4, 0.9, 1],
                            }}
                            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 w-24 h-24 bg-violet-500 rounded-full mix-blend-screen"
                        />
                    </div>

                    {/* Glass Foreground Content */}
                    <div className="relative z-10 w-[90%] h-[90%] rounded-[24px] bg-white/5 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl p-8 flex flex-col items-center justify-center text-center transition-transform duration-500 group-hover:scale-[1.02]">
                        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-6 shadow-lg group-hover:rotate-12 transition-transform duration-500">
                            <Droplets className="text-white w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Liquid State</h3>
                        <p className="text-white/70 text-[14px] leading-relaxed font-light">
                            Harness organic, fluid animations driven by SVG filters and physics-based motion to create stunning visual depth.
                        </p>
                    </div>

                </div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Liquid Morph</span>
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
