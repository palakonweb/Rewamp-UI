import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `tab bar where the active bounding box dynamically morphs its width and border radius to swallow active text`;

export default function MorphingTabNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabs = ["Home", "Components Database", "API", "Changelog"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#111111] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE MORPHING NAVBAR */}
                <nav className="relative flex items-center gap-2 p-2 rounded-[24px] bg-white dark:bg-[#050505] shadow-sm border border-black/5 dark:border-white/5 overflow-hidden">
                    {tabs.map((tab, index) => {
                        const isActive = activeIndex === index;
                        // Morphing logic implies a tightly wrapping layout box.
                        
                        return (
                            <button
                                key={tab}
                                onClick={() => setActiveIndex(index)}
                                className={`relative z-10 px-4 py-2 transition-colors duration-300 ${
                                    isActive ? 'text-white dark:text-black' : 'text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
                                }`}
                            >
                                <span className="relative z-20 font-medium text-[14px]">
                                    {tab}
                                </span>
                                
                                {isActive && (
                                    <motion.div
                                        layoutId="morphing-tab"
                                        // Standard tabs use pills, but a "morphing" tab often feels more square-ish or perfectly hugs the text shape
                                        className="absolute inset-0 bg-black dark:bg-white rounded-lg -z-10 shadow-md"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Morphing Tab</span>
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
