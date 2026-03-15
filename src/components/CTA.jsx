import React from 'react';
import { motion } from 'framer-motion';

const CTA = () => {
    return (
        <section className="w-full pt-32 pb-16 flex flex-col items-center text-center gap-8 relative overflow-hidden z-20">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/2 left-[30%] -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,42,42,0.1),transparent_70%)] pointer-events-none z-0"></div>
            <div className="absolute top-1/2 right-[30%] -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(154,0,2,0.15),transparent_70%)] pointer-events-none z-0"></div>

            {/* Central Graphic (Simulated with CSS for now) */}
            <div className="relative w-48 h-48 mb-4 flex items-center justify-center">
                {/* Outer Ring */}
                <div className="absolute inset-0 rounded-full border border-black/10 dark:border-white/10 border-t-[var(--color-accent-red)] border-l-[var(--color-accent-red)]/50 border-r-black/10 dark:border-r-white/10 animate-[spin_10s_linear_infinite] opacity-70"></div>
                {/* Inner Ring */}
                <div className="absolute inset-4 rounded-full border border-black/5 dark:border-white/5 border-b-[var(--color-accent-red)] border-r-[var(--color-accent-red)]/50 border-l-black/10 dark:border-l-white/10 animate-[spin_7s_linear_infinite_reverse] opacity-50"></div>

                {/* Central Spear/Arrow */}
                <div className="w-[2px] h-32 bg-gradient-to-b from-transparent via-[var(--color-accent-red)] to-[#ff2a2a] relative z-10 shadow-[0_0_15px_var(--color-accent-red)]">
                    {/* Horizontal crossbar lines simulating the arrow head */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-red)] to-transparent"></div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-gradient-to-r from-transparent via-[var(--color-accent-red)] to-transparent"></div>
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-[1px] bg-gradient-to-r from-transparent via-black/50 dark:via-white/50 to-transparent"></div>
                </div>
            </div>

            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl lg:text-5xl text-black dark:text-white font-medium tracking-tight relative z-10 max-w-2xl leading-[1.1]"
            >
                <span className="text-[var(--color-accent-red)]">Stop Rebuilding</span> the Same<br />
                UI
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-black/60 dark:text-white/60 text-base md:text-lg font-light relative z-10 max-w-lg mx-auto leading-relaxed"
            >
                Generate modern UI components instantly using plain text prompts and focus on building what matters.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row items-center gap-4 mt-8 relative z-10"
            >


                {/* Secondary Outlined Button */}
                <button className="h-12 px-8 rounded-lg border border-black/20 dark:border-white/20 text-black dark:text-white font-medium bg-[#f5f5f5]/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm transition-all hover:bg-[var(--color-accent-red)]/10 hover:border-[var(--color-accent-red)]/50 hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)]">
                    Browse Library
                </button>
            </motion.div>
        </section>
    );
};

export default CTA;
