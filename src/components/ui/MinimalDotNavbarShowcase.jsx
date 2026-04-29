import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper minimalist unstyled navbar relying solely on a gliding cherry red dot for layoutId indicator state`;

export default function MinimalDotNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = ["Work", "About", "Services", "Contact"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#ffffff] dark:bg-[#000] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE NAVBAR */}
                <nav className="relative flex items-center gap-10">
                    {links.map((link, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={link}
                                onClick={() => setActiveIndex(index)}
                                className="relative py-4 group"
                            >
                                <span className={`text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40 group-hover:text-black/70 dark:group-hover:text-white/70'}`}>
                                    {link}
                                </span>
                                
                                {/* The Minimal Dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="minimal-dot"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[0_0_8px_var(--color-accent-red)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Minimal Dot</span>
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
