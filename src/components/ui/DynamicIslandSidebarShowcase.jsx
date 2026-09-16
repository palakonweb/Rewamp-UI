import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Menu, Code, Cpu, Target, Layers } from 'lucide-react';

const promptContent = `dynamic island style sidebar that springs open from a tiny pill clip-path into a full height vertical menu component`;

export default function DynamicIslandSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Code, label: "Codebase" },
        { icon: Cpu, label: "Hardware" },
        { icon: Target, label: "Missions" },
        { icon: Layers, label: "Protocols" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e4e4e7] dark:bg-[#111111] shadow-xl flex p-6">
                
                {/* 🎯 THE DYNAMIC ISLAND SIDEBAR */}
                <motion.div 
                    initial={false}
                    animate={{ 
                        width: isOpen ? 260 : 56,
                        height: isOpen ? '100%' : 56,
                        borderRadius: isOpen ? 32 : 100, // Round pill vs smooth rounded rectangle
                    }}
                    transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.8 }}
                    className="relative bg-black dark:bg-white flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)] z-20"
                >
                    {/* Tiny state: Just a hamburger menu icon */}
                    <AnimatePresence>
                        {!isOpen && (
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                onClick={() => setIsOpen(true)}
                                className="absolute inset-0 flex items-center justify-center text-white dark:text-black hover:text-white/70 dark:hover:text-black/70"
                            >
                                <Menu size={24} />
                            </motion.button>
                        )}
                    </AnimatePresence>

                    {/* Open State: Full Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                                transition={{ delay: 0.1 }}
                                className="w-[260px] h-full flex flex-col p-6"
                            >
                                <div className="flex items-center justify-between mb-10 w-full shrink-0">
                                    <span className="font-bold text-[18px] text-white dark:text-black tracking-tight">System Control</span>
                                    {/* Close Button */}
                                    <button 
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/10 flex items-center justify-center text-white dark:text-black hover:bg-white/20 dark:hover:bg-black/20"
                                    >
                                        <Menu size={16} />
                                    </button>
                                </div>

                                <nav className="flex flex-col gap-2 w-full">
                                    {links.map((link, index) => {
                                        const isActive = activeIndex === index;
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => setActiveIndex(index)}
                                                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${
                                                    isActive 
                                                        ? 'bg-white text-black dark:bg-black dark:text-white font-bold shadow-lg' 
                                                        : 'text-white/60 dark:text-black/60 hover:text-white dark:hover:text-black hover:bg-white/10 dark:hover:bg-black/10'
                                                }`}
                                            >
                                                <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                                <span className="text-[15px]">{link.label}</span>
                                            </button>
                                        );
                                    })}
                                </nav>

                                <div className="mt-auto pt-6 border-t border-white/10 dark:border-black/10 w-full flex items-center justify-center shrink-0">
                                     <span className="text-white/40 dark:text-black/40 text-[11px] font-mono tracking-widest uppercase">System Active - Link Secure</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Dummy Content */}
                <div className="flex-1 pl-8 flex flex-col justify-center opacity-40">
                     <h1 className="text-4xl font-bold text-black dark:text-white mb-4">Dashboard</h1>
                     <p className="text-black/60 dark:text-white/60 max-w-sm leading-relaxed">
                          Click the pill in the top left corner to spring open the Dynamic Island Sidebar.
                     </p>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Dynamic Pill Island</span>
            </div>
</div>
    );
}
