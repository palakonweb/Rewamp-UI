import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Pin, PinOff, Terminal, Cpu, HardDrive, Wifi } from 'lucide-react';

const promptContent = `collapsible sidebar toggled via a smooth pinning animation state maintaining strict layout bounds`;

export default function CollapsiblePinSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isPinned, setIsPinned] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Terminal, label: "Console" },
        { icon: Cpu, label: "Compute" },
        { icon: HardDrive, label: "Storage" },
        { icon: Wifi, label: "Network" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f4f4f5] dark:bg-[#111111] shadow-xl flex p-0">
                
                {/* 🎯 THE COLLAPSIBLE SIDEBAR */}
                <motion.aside 
                    initial={false}
                    animate={{ width: isPinned ? 240 : 72 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full bg-white dark:bg-[#050505] border-r border-black/5 dark:border-white/5 flex flex-col z-20 py-4"
                >
                    {/* Header + Pin Toggle */}
                    <div className="flex items-center justify-between px-5 mb-8 h-8">
                        <motion.span 
                            animate={{ opacity: isPinned ? 1 : 0 }}
                            className="font-mono font-bold text-[14px] text-black dark:text-white whitespace-nowrap overflow-hidden"
                        >
                            SYS_ADMIN
                        </motion.span>
                        <button 
                            onClick={() => setIsPinned(!isPinned)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-black/50 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5 transition-colors shrink-0"
                        >
                            <motion.div animate={{ rotate: isPinned ? 0 : -45 }}>
                                {isPinned ? <Pin size={16} /> : <PinOff size={16} />}
                            </motion.div>
                        </button>
                    </div>

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-2 px-3">
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex items-center gap-4 px-3 py-2.5 rounded-xl transition-all duration-200 overflow-hidden whitespace-nowrap ${
                                        isActive 
                                            ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' 
                                            : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <div className="min-w-[20px] flex justify-center shrink-0">
                                        <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    </div>
                                    <motion.span 
                                        animate={{ opacity: isPinned ? 1 : 0 }}
                                        className="text-[13px] font-medium"
                                    >
                                        {link.label}
                                    </motion.span>
                                </button>
                            );
                        })}
                    </nav>
                </motion.aside>

                {/* Dummy Content */}
                <div className="flex-1 p-8 opacity-30 select-none overflow-hidden">
                    <div className="w-1/3 h-8 bg-black/10 dark:bg-white/10 rounded-lg mb-8"></div>
                    <div className="w-full flex gap-4 mb-4">
                         <div className="flex-1 h-32 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10"></div>
                         <div className="flex-1 h-32 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10"></div>
                    </div>
                    <div className="w-full h-48 bg-black/5 dark:bg-white/5 rounded-xl border border-black/10 dark:border-white/10"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">Collapsible Pin</span>
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
