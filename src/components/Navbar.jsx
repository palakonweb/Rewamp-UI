import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Sun, Moon } from 'lucide-react';

const Navbar = ({ isDarkMode, toggleTheme }) => {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 flex justify-center" style={{ perspective: '1000px' }}>
            <motion.nav
                initial={{ opacity: 0, y: -20, rotateX: 10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative group p-[1px] rounded-[100px] w-full overflow-hidden"
            >
                {/* Liquid Metal Border with Cherry red hint (spinning conic gradients) */}
                <div className="absolute inset-[-100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#cccccc_0%,var(--color-accent-red)_10%,#cccccc_20%,#999999_25%,#666666_30%,#aaaaaa_35%,#cccccc_40%,#cccccc_100%)] dark:bg-[conic-gradient(from_90deg_at_50%_50%,#050505_0%,var(--color-accent-red)_10%,#050505_20%,#bbbbbb_25%,#ffffff_30%,#777777_35%,#050505_40%,#050505_100%)] opacity-80" />
                <div className="absolute inset-[-100%] animate-[spin_7s_linear_infinite_reverse] bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,transparent_40%,#999999_45%,#666666_50%,transparent_55%,transparent_100%)] dark:bg-[conic-gradient(from_270deg_at_50%_50%,transparent_0%,transparent_40%,#dcdcdc_45%,#ffffff_50%,transparent_55%,transparent_100%)] opacity-50" />

                {/* Glass Inner Container matching the 3D pop */}
                <div className="relative w-full flex justify-between items-center px-6 py-3 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl rounded-[100px] shadow-[inset_0_1px_1px_rgba(255,255,255,1),0_16px_40px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_16px_40px_rgba(0,0,0,0.6)]">
                    {/* Left: Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="Conjure UI Logo" className="w-8 h-8 object-contain" />
                        <span className="text-black dark:text-white font-medium text-[15px] tracking-tight">Conjure UI</span>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-6 text-[13px] text-black/50 dark:text-white/50 font-medium">
                        <a href="#components" className="hover:text-black dark:hover:text-white transition-colors duration-300">Components</a>
                        <a href="#features" className="hover:text-black dark:hover:text-white transition-colors duration-300">Features</a>
                        <a href="#about" className="hover:text-black dark:hover:text-white transition-colors duration-300">About</a>
                    </div>

                    {/* Action Area */}
                    <div className="flex items-center gap-2">
                        {/* Theme Toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/90 dark:text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group"
                            aria-label="Toggle Theme"
                        >
                            {isDarkMode ? (
                                <Sun size={14} className="opacity-80 group-hover:text-[var(--color-accent-red)] transition-colors" />
                            ) : (
                                <Moon size={14} className="opacity-80 group-hover:text-[var(--color-accent-red)] transition-colors" />
                            )}
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-black/90 dark:text-white/90 text-[13px] font-medium shadow-[inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-black/10 dark:hover:bg-white/10 transition-all duration-300 group"
                        >
                            <Sparkles size={14} className="opacity-80 group-hover:text-[var(--color-accent-red)] transition-colors" />
                            Browse
                        </motion.button>
                    </div>
                </div>
            </motion.nav>
        </div>
    );
};

export default Navbar;
