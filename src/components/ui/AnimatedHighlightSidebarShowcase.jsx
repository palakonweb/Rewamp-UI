import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Inbox, Star, Clock, AlertCircle, Archive } from 'lucide-react';

const promptContent = `premium animated vertical sidebar utilizing framer motion layoutId for elastic glides between links`;

export default function AnimatedHighlightSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Inbox, label: "Inbox" },
        { icon: Star, label: "Starred" },
        { icon: Clock, label: "Snoozed" },
        { icon: AlertCircle, label: "Important" },
        { icon: Archive, label: "Archived" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fde8e8] dark:bg-[#1a0f14] shadow-xl flex">
                
                {/* 🎯 THE ANIMATED HIGHLIGHT SIDEBAR */}
                <aside className="w-[200px] h-full bg-white dark:bg-[#0a0508] border-r border-black/5 dark:border-white/5 py-8 flex flex-col z-10 shadow-[8px_0_30px_rgba(255,0,0,0.02)] pt-12">
                    
                    <nav className="flex flex-col gap-1 px-3 relative">
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 z-10 ${
                                        isActive 
                                            ? 'text-[#e11d48] dark:text-[#fb7185] font-semibold' 
                                            : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {/* Liquid Highlight Background */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active-highlight"
                                            className="absolute inset-0 bg-[#ffe4e6] dark:bg-[#4c0519] rounded-xl -z-10 shadow-sm"
                                            transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                                        />
                                    )}
                                    
                                    <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} className="relative z-20" />
                                    <span className="text-[13px] relative z-20">{link.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Dummy Content */}
                <div className="flex-1 p-10 opacity-30 select-none">
                     <div className="w-1/3 h-8 bg-[#e11d48]/10 rounded-lg mb-8"></div>
                     <div className="w-full h-12 bg-black/5 dark:bg-white/5 rounded-xl mb-3"></div>
                     <div className="w-full h-12 bg-black/5 dark:bg-white/5 rounded-xl mb-3"></div>
                     <div className="w-3/4 h-12 bg-black/5 dark:bg-white/5 rounded-xl mb-3"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Animated Highlight</span>
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
