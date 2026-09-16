import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Fingerprint, Calendar, MessageSquare, Briefcase } from 'lucide-react';

const promptContent = `vertical floating pill sidebar capsule offset from the edges resembling a mobile floating action bar`;

export default function FloatingPillSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Fingerprint, id: "auth" },
        { icon: Calendar, id: "calendar" },
        { icon: MessageSquare, id: "chat" },
        { icon: Briefcase, id: "work" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e4e4e7] dark:bg-[#09090b] shadow-xl flex bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px]">
                
                {/* 🎯 THE FLOATING PILL SIDEBAR */}
                <div className="absolute left-6 top-1/2 -translate-y-1/2">
                    <nav className="flex flex-col items-center gap-3 p-3 rounded-[100px] bg-white dark:bg-[#18181b] shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/5">
                        
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={link.id}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 z-10 ${
                                        isActive 
                                            ? 'text-white' 
                                            : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                                >
                                    {/* Active Pill Indicator */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="floating-pill-bg"
                                            className="absolute inset-0 bg-[#ef4444] rounded-full -z-10 shadow-[0_4px_12px_rgba(239,68,68,0.4)]"
                                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                                        />
                                    )}
                                    <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                </button>
                            );
                        })}

                    </nav>
                </div>

                {/* Dummy Content */}
                <div className="flex-1 ml-32 p-10 opacity-60">
                    <div className="w-1/2 h-10 bg-black/10 dark:bg-white/10 rounded-xl mb-6"></div>
                    <div className="w-full h-64 bg-white/50 dark:bg-black/50 rounded-2xl border border-black/5 dark:border-white/5 shadow-sm backdrop-blur-sm"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Floating Pill Offset</span>
            </div>
</div>
    );
}
