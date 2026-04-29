import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Info } from 'lucide-react';

const promptContent = `advanced 3D flip button revealing secondary content on hover utilizing preserve-3d`;

export default function Flip3DButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eef2f6] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER for 3D Context */}
                <div className="relative w-48 h-14 [perspective:1000px]">
                    <motion.div 
                        className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                        whileHover={{ rotateX: 180 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        {/* Front Face */}
                        <div className="absolute inset-0 w-full h-full bg-[#111] text-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 [backface-visibility:hidden]">
                            <Info className="w-4 h-4" />
                            <span className="font-semibold tracking-wide">Hover for details</span>
                        </div>
                        
                        {/* Back Face */}
                        <div className="absolute inset-0 w-full h-full bg-[var(--color-accent-red)] text-white rounded-xl shadow-[0_4px_15px_rgba(154,0,2,0.3)] flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(180deg)] border border-white/20">
                            <span className="font-bold tracking-widest text-sm uppercase">Pro Feature</span>
                        </div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">3D Flip UI</span>
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
