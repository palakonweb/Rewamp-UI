import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function MagneticPillNavbarShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);

    const navItems = ["Home", "About", "Projects", "Contacts"];

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* THE NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav className="relative flex items-center p-1.5 rounded-full bg-white dark:bg-[#181622] shadow-[0_10px_30px_-6px_rgba(0,0,0,0.1)] dark:shadow-[0_14px_34px_-6px_rgba(0,0,0,0.6)] border border-black/[0.08] dark:border-white/12 transition-colors duration-200">
                    {navItems.map((item, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={item}
                                onClick={() => setActiveIndex(index)}
                                className={`relative px-5 sm:px-6 py-2.5 rounded-full text-[14px] font-semibold transition-colors duration-300 z-10 cursor-pointer ${
                                    isActive 
                                        ? 'text-white' 
                                        : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white'
                                }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="magnetic-pill-indicator"
                                        className="absolute inset-0 bg-[#18181B] dark:bg-[#272333] rounded-full -z-10 shadow-[0_2px_8px_rgba(0,0,0,0.18)]"
                                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
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
                Click tabs for magnetic sliding indicator
            </p>
        </div>
    );
}
