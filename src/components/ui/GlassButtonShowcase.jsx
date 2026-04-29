import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `glassmorphic translucent button utilizing backdrop-filter blur over colored background`;

export default function GlassButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e8e9eb] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🌀 Colorful animated underlying blobs to showcase glassmorphism */}
                <motion.div 
                    animate={{ rotate: 360, scale: [1, 1.2, 1] }} 
                    transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    className="absolute w-[300px] h-[300px] bg-gradient-to-tr from-pink-400 to-indigo-400 rounded-full blur-[40px] opacity-40 mix-blend-multiply" 
                />
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.45)' }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 bg-white/30 backdrop-blur-xl px-10 py-4 text-[#2a2a2a] text-[18px] font-medium tracking-wide shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.7)] border border-white/40 transition-colors"
                    style={{ borderRadius: '100px' }} // Highly rounded pill
                >
                    Book now
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase z-20">Glass UI</span>
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
