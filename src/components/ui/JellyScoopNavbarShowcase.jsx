import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `playful stretchable jelly scoop active state indicator utilizing heavy framer motion spring scale morphing (About, Projects, Contact)`;

export default function JellyScoopNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = ["About", "Projects", "Contact"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#F6F4FB] dark:bg-[#1A1620] shadow-xl flex items-center justify-center p-8 group">

                {/* 🎯 THE JELLY NAVBAR */}
                <nav className="relative flex items-center p-3 rounded-3xl bg-white dark:bg-[#2A2433] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#C1B4D8]/20">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveIndex(index)}
                                className={`relative px-8 py-3 rounded-2xl text-[15px] font-bold transition-colors duration-300 z-10 ${
                                    isActive
                                        ? 'text-[#171717]'
                                        : 'text-[#9C8EB8]/50 hover:text-[#171717] dark:text-[#D4CBE5]/40 dark:hover:text-[#E4DDF0]'
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
                                        className="absolute inset-0 bg-[#D4CBE5] dark:bg-[#4A4056] rounded-2xl -z-10 shadow-[0_1px_3px_rgba(0,0,0,0.06)] origin-center"
                                    />
                                )}
                                <span className="relative z-20">{item}</span>
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Jelly Scoop Elastic</span>
            </div>
</div>
    );
}
