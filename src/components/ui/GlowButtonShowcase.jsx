import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';

const promptContent = `copper glow button utilizing intense layered box shadows for magical ambient light`;

export default function GlowButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#1e2029] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    className="relative"
                >
                    {/* Glowing underlay */}
                    <motion.div 
                        variants={{
                            hover: { opacity: 1, scale: 1.15, filter: 'blur(30px)' },
                            tap: { scale: 0.95, opacity: 0.8 }
                        }}
                        initial={{ opacity: 0.7, scale: 1, filter: 'blur(20px)' }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 bg-gradient-to-r from-[#e78c71] to-[#dd7660] rounded-full z-0"
                    />
                    
                    {/* The Button */}
                    <motion.button 
                        className="relative z-10 flex items-center gap-3 bg-gradient-to-b from-[#e78c71] to-[#ba5f4b] border border-[#f0ab97] px-8 py-4 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.4),_0_2px_10px_rgba(0,0,0,0.5)]"
                    >
                        <Sparkles className="w-5 h-5 text-[#3a1c14]" fill="currentColor" />
                        <span className="text-[#3a1c14] text-[18px] font-bold tracking-wide">Generate</span>
                        
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                            <motion.div 
                                animate={{ x: ['-200%', '200%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
                                className="w-[50%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[30deg]"
                            />
                        </div>
                    </motion.button>

                </motion.div>
                
                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Glow UI</span>
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
