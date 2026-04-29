import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, Search, Bell, Mail, User } from 'lucide-react';

const promptContent = `macos inspired floating dock navbar with smooth scaling spring animations on hover`;

export default function FloatingDockNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const icons = [
        { icon: Home, label: "Home" },
        { icon: Search, label: "Search" },
        { icon: Bell, label: "Notifications" },
        { icon: Mail, label: "Messages" },
        { icon: User, label: "Profile" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f5f5f7] dark:bg-[#0a0a0a] shadow-xl flex items-end justify-center pb-8 group">
                
                {/* 🎯 THE NAVBAR */}
                <div className="relative flex items-center gap-2 p-3 rounded-2xl bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {icons.map((item, index) => {
                        // Calculate scale based on distance from hovered index
                        let scale = 1;
                        let filter = 'blur(0px)';
                        
                        if (hoveredIndex !== null) {
                            const distance = Math.abs(hoveredIndex - index);
                            if (distance === 0) scale = 1.4;
                            else if (distance === 1) scale = 1.15;
                            else scale = 0.95;
                        }

                        return (
                            <div key={index} className="relative flex flex-col items-center">
                                {/* Tooltip */}
                                <AnimatePresence>
                                    {hoveredIndex === index && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                            animate={{ opacity: 1, y: -8, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute -top-12 px-3 py-1.5 rounded-lg bg-black text-white text-[11px] font-medium tracking-wide whitespace-nowrap shadow-xl"
                                        >
                                            {item.label}
                                            {/* Tooltip triangle */}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-black"></div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Icon Button */}
                                <motion.button
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    animate={{ 
                                        scale: scale,
                                        y: hoveredIndex === index ? -8 : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                    className="w-12 h-12 rounded-xl flex items-center justify-center bg-white dark:bg-[#1a1a1a] shadow-[0_4px_10px_rgba(0,0,0,0.05),_inset_0_2px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_4px_10px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/5 mx-1"
                                >
                                    <item.icon size={20} className="text-black/70 dark:text-white/70" />
                                </motion.button>
                            </div>
                        );
                    })}
                </div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Floating Dock</span>
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
