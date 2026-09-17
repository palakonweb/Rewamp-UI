import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, FolderKanban, Mail, Sun, Moon } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contacts', label: 'Contacts', icon: Mail },
];

export default function PillExpandNavbarShowcase() {
    const [active, setActive] = useState('home');
    const [hovered, setHovered] = useState(null);

    const [detectedMode, setDetectedMode] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        }
        return 'light';
    });
    const [overrideMode, setOverrideMode] = useState(null);

    useEffect(() => {
        const checkTheme = () => {
            const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
            setDetectedMode(current);
            setOverrideMode(null);
        };
        checkTheme();
        const observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
        return () => observer.disconnect();
    }, []);

    const activeMode = overrideMode || detectedMode;
    const isDark = activeMode === 'dark';

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* Interactive Light / Dark Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md mb-8 transition-colors">
                <button
                    onClick={() => setOverrideMode('light')}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        !isDark
                            ? 'bg-white text-neutral-900 shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                >
                    <Sun size={13} />
                    <span>Light</span>
                </button>
                <button
                    onClick={() => setOverrideMode('dark')}
                    className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        isDark
                            ? 'bg-[#221F2B] text-white shadow-xs'
                            : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                    }`}
                >
                    <Moon size={13} />
                    <span>Dark</span>
                </button>
            </div>

            {/* 🎯 THE EXPANDING PILL NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav
                    className={`inline-flex items-center rounded-full p-2 gap-1.5 transition-colors duration-250 border ${
                        isDark
                            ? 'bg-[#181622] border-white/12 shadow-[0_16px_36px_-8px_rgba(0,0,0,0.65)]'
                            : 'bg-white border-black/[0.08] shadow-[0_14px_32px_-8px_rgba(0,0,0,0.12)]'
                    }`}
                    onMouseLeave={() => setHovered(null)}
                >
                    {navItems.map((item) => {
                        const isActive = active === item.id;
                        const isExpanded = hovered ? hovered === item.id : isActive;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.id}
                                onClick={() => setActive(item.id)}
                                onMouseEnter={() => setHovered(item.id)}
                                animate={{ width: isExpanded ? 110 : 38 }}
                                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                                whileTap={{ scale: 0.94 }}
                                className={`h-9 flex items-center justify-center rounded-full overflow-hidden focus:outline-none transition-colors duration-200 cursor-pointer ${
                                    isExpanded
                                        ? isDark
                                            ? 'bg-white/15 gap-2 px-3'
                                            : 'bg-black/10 gap-2 px-3'
                                        : isActive
                                            ? isDark ? 'bg-white/10' : 'bg-black/5'
                                            : ''
                                }`}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon
                                    size={17}
                                    strokeWidth={2.2}
                                    className={`shrink-0 transition-colors duration-200 ${
                                        isDark
                                            ? isExpanded ? 'text-white' : 'text-white/60 hover:text-white'
                                            : isExpanded ? 'text-neutral-900' : 'text-neutral-500 hover:text-neutral-900'
                                    }`}
                                />
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -4 }}
                                            animate={{ opacity: 1, x: 0, transition: { duration: 0.25, delay: 0.1 } }}
                                            exit={{ opacity: 0, x: -4, transition: { duration: 0.1 } }}
                                            className={`text-[13px] font-semibold whitespace-nowrap ${
                                                isDark ? 'text-white' : 'text-neutral-900'
                                            }`}
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover or click tabs to expand
            </p>
        </div>
    );
}
