import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `premium liquid metal button with dynamic chrome light sweeps and deep inner shadows`;

export default function LiquidMetalButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f5f5f5] dark:bg-[#111111] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-[200px] h-[64px] rounded-full p-[2px] bg-gradient-to-b from-[#e6e6e6] to-[#999999] dark:from-[#444] dark:to-[#1a1a1a] shadow-[0_10px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden"
                >
                    {/* The Inner Button */}
                    <motion.button 
                        className="relative w-full h-full rounded-full bg-gradient-to-b from-[#f8f8f8] via-[#e2e2e2] to-[#c8c8c8] dark:from-[#3a3a3a] dark:via-[#222] dark:to-[#111] overflow-hidden shadow-[inset_0_-4px_8px_rgba(0,0,0,0.1),_inset_0_4px_8px_rgba(255,255,255,0.8)] dark:shadow-[inset_0_-4px_8px_rgba(0,0,0,0.5),_inset_0_4px_8px_rgba(255,255,255,0.1)]"
                    >
                        <span className="relative z-20 text-[#333] dark:text-[#f0f0f0] text-[16px] font-semibold tracking-widest uppercase mix-blend-difference">Chrome</span>
                        
                        {/* Core Sheen */}
                        <motion.div 
                            variants={{
                                hover: { opacity: 0.8, filter: 'blur(8px)' }
                            }}
                            className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent dark:from-white/20 opacity-50"
                        />

                        {/* Animated Light Sweep */}
                        <motion.div 
                            variants={{
                                hover: { 
                                    x: ['-150%', '200%']
                                }
                            }}
                            initial={{ x: '-150%' }}
                            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
                            className="absolute inset-0 z-10 w-[50%] bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/20 skew-x-[45deg]"
                        />
                    </motion.button>
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/40 text-[13px] font-semibold tracking-widest uppercase">Liquid Metal</span>
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
