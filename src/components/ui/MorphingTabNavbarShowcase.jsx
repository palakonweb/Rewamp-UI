import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, User, FolderKanban, MessageCircle } from 'lucide-react';

export default function MorphingTabNavbarShowcase() {
    const [activeTab, setActiveTab] = useState("Home");

    const tabs = [
        { id: "Home", icon: Home },
        { id: "About", icon: User },
        { id: "Projects", icon: FolderKanban },
        { id: "Contacts", icon: MessageCircle },
    ];

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE MORPHING NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav className="relative flex items-center p-2 rounded-full bg-white/80 dark:bg-[#181622]/90 border border-black/10 dark:border-white/12 backdrop-blur-2xl shadow-[0_10px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.6)] transition-colors duration-200">
                    {tabs.map((tab) => {
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full transition-colors duration-300 cursor-pointer ${
                                    isActive ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                }`}
                            >
                                {/* The Sliding Background Bubble */}
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTabBubble"
                                        className="absolute inset-0 bg-black/[0.08] dark:bg-white/[0.12] rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                                    />
                                )}

                                <span className="relative z-10 flex items-center justify-center">
                                    <tab.icon size={18} strokeWidth={isActive ? 2.4 : 2} />
                                </span>
                                <span className="relative z-10 text-[14px] font-semibold tracking-wide">
                                    {tab.id}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click tabs to morph glass highlight
            </p>
        </div>
    );
}
