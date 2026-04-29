import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `sleek pill navigation bar using layoutId for a magnetic sliding active background state`;

export default function MagneticPillNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = ["Overview", "Integrations", "Activity", "Settings"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f9fafb] dark:bg-[#09090b] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE NAVBAR */}
                <nav className="relative flex items-center p-2 rounded-full bg-white dark:bg-[#18181b] shadow-sm border border-black/5 dark:border-white/5 box-border">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveIndex(index)}
                                className={`relative px-6 py-2.5 rounded-full text-[14px] font-medium transition-colors duration-300 z-10 ${
                                    isActive 
                                        ? 'text-white' 
                                        : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="magnetic-pill-indicator"
                                        className="absolute inset-0 bg-black dark:bg-[#27272a] rounded-full -z-10 shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-20">{item}</span>
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Magnetic Pill</span>
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
