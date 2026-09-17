import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function JellyScoopNavbarShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    const navItems = ["Home", "About", "Projects", "Contacts"];

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE JELLY NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav className="relative flex items-center p-2 sm:p-2.5 rounded-3xl bg-white dark:bg-[#1E1B28] shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] border border-black/[0.08] dark:border-white/12 transition-colors duration-200">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveIndex(index)}
                                className={`relative px-5 sm:px-7 py-2.5 sm:py-3 rounded-2xl text-[14px] sm:text-[15px] font-bold transition-colors duration-300 z-10 cursor-pointer ${
                                    isActive
                                        ? 'text-[#171717] dark:text-[#171717]'
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="jelly-scoop-indicator"
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 16,
                                            mass: 0.8
                                        }}
                                        className="absolute inset-0 bg-[#D4CBE5] rounded-2xl -z-10 shadow-[0_2px_8px_rgba(0,0,0,0.1)] origin-center"
                                    />
                                )}
                                <span className="relative z-20">{item}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click tabs for elastic jelly scoop effect
            </p>
        </div>
    );
}
