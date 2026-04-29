import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Moon, Sun } from 'lucide-react';

const promptContent = `glassmorphic translucent switch with animated icon inside frosted button over vibrant blue backdrop`;

export default function FrostedGlassToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 flex items-center justify-center p-8 group">
                
                {/* Vibrant Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0a005c] via-[#4d40db] to-[#f4f7fa] animate-[gradient_8s_ease_infinite] bg-[length:200%_200%]" />

                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative z-10 w-[280px] h-[90px] rounded-[100px] bg-white/10 backdrop-blur-md border border-white/20 shadow-[inset_0_0_10px_rgba(255,255,255,0.2),_0_10px_30px_rgba(0,0,0,0.3)] p-[6px] cursor-pointer flex items-center"
                >
                    {/* Text Area */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-semibold text-[22px] tracking-wide ml-12 shadow-sm drop-shadow-md">
                            Focus
                        </span>
                    </div>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isOn ? '188px' : '0px' }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="relative z-20 w-[76px] h-[76px] rounded-full bg-[#5d4bed] shadow-[0_4px_16px_rgba(0,0,0,0.4),_inset_0_2px_4px_rgba(255,255,255,0.3)] flex items-center justify-center"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isOn ? 'moon' : 'sun'}
                                initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
                                transition={{ duration: 0.2 }}
                                className="text-white"
                            >
                                {isOn ? <Moon size={28} fill="currentColor" /> : <Sun size={28} strokeWidth={2.5} />}
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>
                    
                    {/* Track Chevrons */}
                    <div className="absolute right-8 flex flex-col items-center justify-center gap-[2px] opacity-60 text-white">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                </div>
                
                <span className="absolute bottom-6 text-white/50 text-[13px] font-semibold tracking-widest uppercase z-10 drop-shadow-md">Frosted Toggle</span>
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
