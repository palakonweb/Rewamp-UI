import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `minimalist top navbar with rapid svg liquid drawing underline mechanics on hover states`;

export default function LiquidUnderlineNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = ["Editorial", "Lookbook", "Collections", "Journal"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fdfcf7] dark:bg-[#121211] shadow-xl flex items-start justify-center p-8 pt-12 group">
                
                {/* 🎯 THE NAVBAR */}
                <nav className="relative flex items-center justify-center gap-12 w-full">
                    {links.map((link, index) => {
                        const isHovered = hoveredIndex === index;

                        return (
                            <button
                                key={link}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative py-2 flex flex-col items-center"
                            >
                                <span className={`text-[15px] font-medium tracking-wide uppercase transition-colors duration-300 ${isHovered ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50'}`}>
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
                                            strokeWidth="2" 
                                            strokeLinecap="round"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ 
                                                pathLength: isHovered ? 1 : 0, 
                                                opacity: isHovered ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        />
                                    </motion.svg>
                                </div>
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Liquid Underline</span>
            </div>
</div>
    );
}
