import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `playful stretchable jelly scoop active state indicator utilizing heavy framer motion spring scale morphing`;

export default function JellyScoopNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = ["Design", "Prototyping", "Handoff", "Feedback"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f7e8ff] dark:bg-[#1f1025] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE JELLY NAVBAR */}
                <nav className="relative flex items-center p-3 rounded-3xl bg-white dark:bg-[#2c1a35] shadow-[0_10px_30px_rgba(150,0,255,0.1)] border border-purple-500/10">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveIndex(index)}
                                className={`relative px-8 py-3 rounded-2xl text-[15px] font-bold transition-colors duration-300 z-10 ${
                                    isActive 
                                        ? 'text-white' 
                                        : 'text-purple-900/40 hover:text-purple-900 dark:text-purple-200/40 dark:hover:text-purple-200'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="jelly-scoop-indicator"
                                        // The jelly effect is achieved utilizing extreme spring elasticity and minimal damping constraints
                                        transition={{ 
                                            type: "spring", 
                                            stiffness: 250, 
                                            damping: 15,
                                            mass: 0.8
                                        }}
                                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-fuchsia-500 rounded-2xl -z-10 shadow-[0_4px_12px_rgba(168,85,247,0.4)] origin-center"
                                    />
                                )}
                                <span className="relative z-20">{item}</span>
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Jelly Scoop Elastic</span>
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
