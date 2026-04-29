import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper-realistic skeuomorphic plastic glossy button with soft inset shadows`;

export default function SkeuomorphicButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e8e9eb] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97, boxShadow: 'inset 0px 10px 20px rgba(0,0,0,0.1), 0px 2px 5px rgba(0,0,0,0.05)' }}
                    className="relative bg-[#f0f2f5] px-12 py-4 rounded-full text-[#4a4f56] text-[18px] font-medium tracking-wide border border-white/60 flex items-center justify-center overflow-hidden transition-shadow"
                    style={{
                        boxShadow: `
                            -6px -6px 14px rgba(255, 255, 255, 0.9), 
                            6px 6px 14px rgba(0, 0, 0, 0.08), 
                            inset 0px -4px 6px rgba(0,0,0,0.02),
                            inset 0px 4px 6px rgba(255,255,255,0.7)
                        `
                    }}
                >
                    {/* Glossy top highlight */}
                    <div className="absolute top-0 left-[10%] w-[80%] h-[40%] bg-gradient-to-b from-white to-transparent opacity-60 rounded-t-full pointer-events-none filter blur-[1px]"></div>
                    
                    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Unlock It</span>
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Skeuomorphic UI</span>
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
