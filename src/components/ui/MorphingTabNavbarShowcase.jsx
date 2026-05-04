import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Home, Search, Compass, MessageCircle, Settings } from 'lucide-react';

const promptContent = `Fluid Pill Navbar. A highly polished glassmorphic navigation bar where the active tab background smoothly glides and morphs between items using Framer Motion layoutId.`;

export default function MorphingTabNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const [activeTab, setActiveTab] = useState("Home");

    const tabs = [
        { id: "Home", icon: Home },
        { id: "Search", icon: Search },
        { id: "Explore", icon: Compass },
        { id: "Messages", icon: MessageCircle },
        { id: "Settings", icon: Settings },
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10 bg-[#09090b] shadow-xl flex items-center justify-center">
                
                {/* 🎯 THE MORPHING NAVBAR */}
                <nav className="relative flex items-center p-2 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex items-center gap-2 px-6 py-3 rounded-full transition-colors duration-300 ${
                                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                                }`}
                            >
                                {/* The Sliding Background Bubble */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBubble"
                                        className="absolute inset-0 bg-white/10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] mix-blend-screen"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                
                                <span className="relative z-10 flex items-center justify-center">
                                    <tab.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                </span>
                                <span className="relative z-10 text-[14px] font-medium tracking-wide">
                                    {tab.id}
                                </span>
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase">Fluid Pill Navbar</span>
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
