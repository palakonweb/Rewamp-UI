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

    const navItems = ["About", "Projects", "Contact"];

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">
                
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
</div>
    );
}
