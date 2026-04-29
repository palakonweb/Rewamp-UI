import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, FolderKanban, Users, Shield, PieChart } from 'lucide-react';

const promptContent = `ultra slim icon only sidebar where hovering springs icons out and displays elegantly positioned tooltip labels`;

export default function MinimalIconSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Home, label: "Home Base" },
        { icon: PieChart, label: "Analytics" },
        { icon: FolderKanban, label: "Projects" },
        { icon: Users, label: "Team Members" },
        { icon: Shield, label: "Security" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#000] shadow-xl flex group">
                
                {/* 🎯 THE MINIMAL SIDEBAR */}
                <aside className="w-20 h-full bg-white dark:bg-[#0a0a0a] border-r border-black/5 dark:border-white/10 flex flex-col items-center py-6 z-20">
                    
                    {/* Top Logo */}
                    <div className="w-10 h-10 rounded-xl bg-black dark:bg-white flex items-center justify-center mb-12 shadow-md">
                        <div className="w-3 h-3 bg-white dark:bg-black rounded-sm" />
                    </div>

                    {/* Item Stack */}
                    <nav className="flex flex-col gap-4 w-full px-3">
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            const isHovered = hoveredIndex === index;

                            return (
                                <div 
                                    key={index}
                                    className="relative flex justify-center w-full"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <button
                                        onClick={() => setActiveIndex(index)}
                                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 relative ${
                                            isActive 
                                                ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg' 
                                                : 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                                        }`}
                                    >
                                        <motion.div
                                            animate={{ scale: isHovered && !isActive ? 1.1 : 1 }}
                                        >
                                            <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                        </motion.div>
                                    </button>

                                    {/* Tooltip Popup */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10, scale: 0.9 }}
                                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                                exit={{ opacity: 0, x: -5, scale: 0.9, transition: { duration: 0.1 } }}
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                                className="absolute left-[64px] top-1/2 -translate-y-1/2 px-3 py-2 rounded-lg bg-black text-white text-[12px] font-semibold whitespace-nowrap shadow-xl z-50 flex items-center"
                                            >
                                                {link.label}
                                                {/* Tooltip Triangle */}
                                                <div className="absolute -left-[4px] top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-black"></div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </nav>

                </aside>

                {/* Dummy Content */}
                <div className="flex-1 p-10 opacity-30 select-none">
                    <div className="w-1/4 h-8 bg-black/10 dark:bg-white/10 rounded-lg mb-8"></div>
                    <div className="w-full h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3"></div>
                    <div className="w-full h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3"></div>
                    <div className="w-3/4 h-8 bg-black/5 dark:bg-white/5 rounded-md mb-3"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Minimal Icon Only</span>
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
