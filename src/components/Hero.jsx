import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const placeholders = ['button', 'bento', 'Hero', 'login'];
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 2000);
        return () => clearInterval(interval);
    }, []);
    return (
        <section
            className="relative w-full min-h-[80vh] flex flex-col items-center justify-center text-center pt-32 pb-10 z-10 mx-auto overflow-hidden bg-transparent"
        >
            {/* Badge */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex items-center gap-2 px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-[#050505]/40 backdrop-blur-md mb-8 shadow-xl"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[0_0_8px_var(--color-accent-red)]"></div>
                <span className="text-black/80 dark:text-white/80 text-xs font-medium tracking-wide">Prompt to Component</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                className="relative z-10 text-[44px] leading-[1.1] sm:text-[52px] md:text-[60px] font-medium tracking-[-0.02em] max-w-[800px] text-transparent bg-clip-text bg-gradient-to-b from-black via-neutral-700 to-neutral-500 dark:from-[#ffffff] dark:via-[#e2e2e2] dark:to-[#8a8a8a]"
            >
                Design UI at the Speed of Thought
            </motion.h1>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="relative z-10 mt-6 text-base sm:text-[17px] text-black/60 dark:text-white/80 max-w-[500px] font-light leading-[1.6]"
            >
                <p className="text-black/60 dark:text-text-gray text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-10 relative z-10">
                    Turn simple prompts into beautiful, production-ready UI components instantly.<br />

                </p>
            </motion.p>

            {/* Action Area - Unified Toggle Style with Liquid Metal Border */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="mt-12 relative flex items-center w-full max-w-[460px] bg-white dark:bg-[#0a0a0a] rounded-[100px] p-2 border border-black/5 dark:border-white/5 shadow-xl dark:shadow-[inset_0_4px_24px_rgba(0,0,0,1)] z-20"
                onSubmit={(e) => e.preventDefault()}
            >
                <div className="relative flex-1 flex items-center h-full min-w-0">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-full bg-transparent border-none outline-none text-black/90 dark:text-white/90 px-6 py-2.5 font-medium text-[15px] z-10 relative focus:bg-transparent"
                    />
                    {!inputValue && (
                        <div className="absolute inset-0 flex items-center pl-6 pointer-events-none overflow-hidden text-black/40 dark:text-white/40 font-medium text-[15px]">
                            <span>Search&nbsp;</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={placeholders[placeholderIndex]}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -10, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="inline-block"
                                >
                                    {placeholders[placeholderIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    className="relative group p-[2px] rounded-[100px] overflow-hidden shrink-0 flex items-center justify-center transition-transform hover:scale-105"
                >
                    {/* Liquid metal spinning gradient masks (Silver/Gray tones with Cherry Red Hint) */}
                    <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cccccc_0%,var(--color-accent-red)_20%,#cccccc_40%,#999999_45%,#666666_50%,#aaaaaa_55%,#cccccc_60%,#cccccc_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#050505_0%,var(--color-accent-red)_20%,#050505_40%,#bbbbbb_45%,#ffffff_50%,#777777_55%,#050505_60%,#050505_100%)] opacity-80 group-hover:opacity-100" />
                    <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite_reverse] bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,transparent_40%,#999999_45%,#666666_50%,transparent_55%,transparent_100%)] dark:bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,transparent_40%,#dcdcdc_45%,#ffffff_50%,transparent_55%,transparent_100%)] opacity-60 mix-blend-overlay dark:mix-blend-screen" />

                    {/* Inner dark button surface / thumb */}
                    <div className="relative h-[48px] px-8 bg-neutral-100 dark:bg-[#111111] rounded-[100px] flex items-center justify-center gap-3 backdrop-blur-xl border border-black/5 dark:border-white/5 dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]">
                        <span className="text-black/90 dark:text-white/90 font-medium text-[15px] group-hover:text-[var(--color-accent-red)] transition-colors">Search</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black/50 dark:text-white/50 group-hover:text-[var(--color-accent-red)] transition-colors duration-300">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </button>
            </motion.form>

        </section>
    );
};

export default Hero;
