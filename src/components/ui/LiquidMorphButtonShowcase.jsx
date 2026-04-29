import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Copy, Check, Droplets } from 'lucide-react';

const promptContent = `organic liquid morphing button utilizing SVG gooey filters and heavy bezier path manipulation`;

export default function LiquidMorphButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eef2f6] shadow-xl flex items-center justify-center p-8 group">
                
                {/* Defs to create gooey filter */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="gooey">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="gooey" />
                            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                {/* 🎯 THE BUTTON */}
                <div style={{ filter: "url('#gooey')" }} className="relative flex items-center justify-center p-[20px]">
                    <motion.button 
                        whileHover="hover"
                        whileTap="tap"
                        className="relative z-10 flex items-center gap-3 bg-[#4285F4] text-white px-10 py-5 rounded-full text-[17px] font-semibold tracking-wide border-none shadow-[0_10px_30px_rgba(66,133,244,0.4)]"
                    >
                        <Droplets className="w-5 h-5" />
                        Morph
                    </motion.button>
                    
                    {/* Morphing blobs */}
                    <motion.div 
                        variants={{
                            hover: { x: -40, y: -20, scale: 1.2 },
                            tap: { scale: 0.8 }
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="absolute bg-[#4285F4] w-12 h-12 rounded-full -z-10"
                    />
                    <motion.div 
                        variants={{
                            hover: { x: 40, y: 20, scale: 1.3 },
                            tap: { scale: 0.8 }
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                        className="absolute bg-[#4285F4] w-14 h-14 rounded-full -z-10"
                    />
                </div>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Liquid UI</span>
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
