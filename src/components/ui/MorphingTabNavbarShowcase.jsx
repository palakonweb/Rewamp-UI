import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Home, Compass, MessageCircle } from 'lucide-react';

const promptContent = `Fluid Pill Navbar. A highly polished glassmorphic navigation bar where the active tab background smoothly glides and morphs between items using Framer Motion layoutId.`;

export default function MorphingTabNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const [activeTab, setActiveTab] = useState("About");

    const tabs = [
        { id: "About", icon: Home },
        { id: "Projects", icon: Compass },
        { id: "Contact", icon: MessageCircle },
    ];

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center">
                
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
</div>
    );
}
