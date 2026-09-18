import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LiquidUnderlineNavbarShowcase() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const links = ["Home", "About", "Projects", "Contacts"];

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* THE NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav className="relative flex items-center justify-center gap-8 sm:gap-12 px-6 sm:px-10 py-3 rounded-full bg-white dark:bg-[#181622] border border-black/[0.08] dark:border-white/12 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.08)] dark:shadow-[0_14px_34px_-8px_rgba(0,0,0,0.5)] transition-colors duration-200">
                    {links.map((link, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <button
                                key={link}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative py-2 flex flex-col items-center cursor-pointer"
                            >
                                <span className={`text-[14px] sm:text-[15px] font-semibold tracking-wide uppercase transition-colors duration-300 ${
                                    isHovered ? 'text-black dark:text-white' : 'text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                                }`}>
                                    {link}
                                </span>
                                
                                {/* The animated SVG liquid line */}
                                <div className="absolute -bottom-1 w-full h-2 pointer-events-none stroke-black dark:stroke-white">
                                    <motion.svg 
                                        width="100%" 
                                        height="100%" 
                                        viewBox="0 0 100 10" 
                                        preserveAspectRatio="none"
                                        className="overflow-visible"
                                    >
                                        <motion.path 
                                            d="M 0,5 Q 25,0 50,5 T 100,5" 
                                            fill="none" 
                                            strokeWidth="2.5" 
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ 
                                                pathLength: isHovered ? 1 : 0, 
                                                opacity: isHovered ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.35, ease: "easeOut" }}
                                        />
                                    </motion.svg>
                                </div>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover navigation links to draw liquid underline
            </p>
        </div>
    );
}
