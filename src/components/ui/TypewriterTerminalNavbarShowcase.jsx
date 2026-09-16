import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Terminal } from 'lucide-react';

const promptContent = `pure hacker terminal navbar where hidden links are typed out via blinking cursor on hover`;

export default function TypewriterTerminalNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = ["ROOT", "NETWORK", "PROXY", "BYPASS"];

    // Custom hook for typewriter effect
    const useTypewriter = (text, isHovering) => {
        const [displayedText, setDisplayedText] = useState("");

        useEffect(() => {
            if (!isHovering) {
                // If not hovering, display asterisks or dashes
                setDisplayedText(text.replace(/./g, '*'));
                return;
            }

            let currentIndex = 0;
            // Clear initially to start typing
            setDisplayedText(""); 

            const typingInterval = setInterval(() => {
                if (currentIndex < text.length) {
                    setDisplayedText(text.substring(0, currentIndex + 1));
                    currentIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 60); // typing speed

            return () => clearInterval(typingInterval);
        }, [text, isHovering]);

        return displayedText;
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#000000] shadow-[inset_0_0_100px_rgba(0,255,0,0.05)] flex items-start justify-center p-8 group font-mono">
                
                {/* 🎯 THE TERMINAL NAVBAR */}
                <nav className="relative flex items-center justify-between w-full max-w-lg border-b border-[#0f0]/30 pb-4 mt-12">
                    
                    {/* Prompt Header */}
                    <div className="flex items-center gap-2 text-[#0f0]">
                        <Terminal size={18} />
                        <span className="font-bold text-[15px]">user@sys:~$</span>
                    </div>

                    <div className="flex gap-8">
                        {links.map((link, index) => {
                            const isHovered = hoveredIndex === index;
                            const typedText = useTypewriter(link, isHovered);

                            return (
                                <button
                                    key={link}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative flex items-center text-[14px] text-[#0f0] group/btn"
                                >
                                    <span className={`transition-opacity duration-150 ${isHovered ? 'opacity-100 font-bold' : 'opacity-50'}`}>
                                        {typedText}
                                    </span>
                                    
                                    {/* Blinking Cursor at the end if hovered */}
                                    <AnimatePresence>
                                        {isHovered && (
                                            <motion.span 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="inline-block w-2 bg-[#0f0] ml-0.5"
                                            >
                                                &nbsp;
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Pure CSS blinking cursor for the entire row when nothing is hovered, but we attach it strictly to styling.
                                        Instead, the AnimatePresence handles the active typing cursor.
                                    */}

                                </button>
                            );
                        })}
                    </div>
                </nav>
                
                <span className="absolute bottom-6 text-[#0f0]/30 text-[13px] font-semibold tracking-widest uppercase">System Terminal</span>
                
                {/* Scanline overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,_3px_100%] opacity-20"></div>
            </div>
</div>
    );
}
