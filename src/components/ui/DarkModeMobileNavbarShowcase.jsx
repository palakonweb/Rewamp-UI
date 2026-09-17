import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderKanban, Mail } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contacts', label: 'Contacts', icon: Mail },
];

export default function DarkModeMobileNavbarShowcase() {
    const [active, setActive] = useState('home');
    const [hovered, setHovered] = useState(null);

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav
                    className="relative inline-flex items-center gap-1.5 rounded-full bg-white dark:bg-[#181622] p-2 border border-black/[0.08] dark:border-white/12 shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.6)] transition-colors duration-200"
                    onMouseLeave={() => setHovered(null)}
                >
                    {navItems.map((item) => {
                        const isActive = active === item.id;
                        const isHovered = hovered === item.id;
                        const Icon = item.icon;

                        return (
                            <button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                onMouseEnter={() => setHovered(item.id)}
                                className="relative w-11 h-11 flex items-center justify-center rounded-full focus:outline-none cursor-pointer"
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* Tooltip */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 6, scale: 0.85 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.85 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[11px] font-medium shadow-[0_4px_16px_rgba(0,0,0,0.18)] pointer-events-none z-30 bg-white dark:bg-[#252030] text-zinc-900 dark:text-white ring-1 ring-black/5 dark:ring-white/10"
                                        >
                                            {item.label}
                                            <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-[3px] w-2 h-2 rotate-45 bg-white dark:bg-[#252030] ring-1 ring-black/5 dark:ring-white/10" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* Hover indicator */}
                                {!isActive && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-black/[0.05] dark:bg-white/[0.08]"
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* Active indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="dark-nav-active"
                                        className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white/20"
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}

                                <Icon
                                    size={19}
                                    strokeWidth={2}
                                    className={`relative z-10 transition-colors duration-200 ${
                                        isActive
                                            ? 'text-white'
                                            : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                                />
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover icon for tooltip, click to activate
            </p>
        </div>
    );
}
