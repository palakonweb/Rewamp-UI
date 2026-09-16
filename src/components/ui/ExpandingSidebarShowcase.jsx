import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, LayoutDashboard, FolderKanban, MessageSquare, Settings, Command } from 'lucide-react';

const promptContent = `expanding vertical sidebar navbar that reveals rich typography on hover`;

export default function ExpandingSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: FolderKanban, label: "Projects" },
        { icon: MessageSquare, label: "Messages" },
        { icon: Settings, label: "Settings" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f4f4f5] dark:bg-[#000] shadow-xl flex p-0">
                
                {/* 🎯 THE EXPANDING SIDEBAR */}
                <motion.nav 
                    initial={false}
                    animate={{ width: isExpanded ? 220 : 64 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                    className="h-full bg-white dark:bg-[#0a0a0a] border-r border-black/5 dark:border-white/10 flex flex-col shadow-2xl relative z-20 py-6"
                >
                    {/* Logo Section */}
                    <div className="px-5 mb-10 flex items-center gap-3 overflow-hidden whitespace-nowrap">
                        <div className="min-w-[24px] h-6 flex items-center justify-center bg-black dark:bg-white text-white dark:text-black rounded-md">
                            <Command size={14} />
                        </div>
                        <motion.span 
                            animate={{ opacity: isExpanded ? 1 : 0 }}
                            className="font-bold text-[15px] tracking-tight text-black dark:text-white"
                        >
                            Purrform
                        </motion.span>
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-col gap-2 px-3">
                        {navItems.map((item, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 overflow-hidden whitespace-nowrap ${
                                        isActive 
                                            ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white font-medium' 
                                            : 'text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    <div className="min-w-[20px] flex justify-center">
                                        <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <motion.span 
                                        animate={{ opacity: isExpanded ? 1 : 0 }}
                                        className="text-[14px]"
                                    >
                                        {item.label}
                                    </motion.span>
                                    
                                    {/* Active Dot Indicator */}
                                    {isActive && isExpanded && (
                                        <motion.div 
                                            layoutId="expanding-sidebar-dot"
                                            className="absolute right-3 w-1.5 h-1.5 rounded-full bg-black dark:bg-white"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.nav>

                {/* Dummy Content Area */}
                <div className="flex-1 p-8 opacity-30 select-none">
                    <div className="w-1/3 h-8 bg-black/10 dark:bg-white/10 rounded-lg mb-8"></div>
                    <div className="w-full h-32 bg-black/5 dark:bg-white/5 rounded-xl mb-4"></div>
                    <div className="w-full flex gap-4">
                         <div className="flex-1 h-24 bg-black/5 dark:bg-white/5 rounded-xl"></div>
                         <div className="flex-1 h-24 bg-black/5 dark:bg-white/5 rounded-xl"></div>
                    </div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase text-right">Expanding Sidebar</span>
            </div>
</div>
    );
}
