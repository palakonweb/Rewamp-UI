import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, User, Palette, MessageCircle, Sun } from 'lucide-react';

const promptContent = `white floating pill toolbar with 5 circular icon buttons, active icon sits on a dark filled circle with a layoutId spring indicator that glides between icons, hovering any icon shows a soft gray hover circle plus a small white tooltip label popping in above it (Home, Profile, Theme, Chat, Brightness)`;

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'theme', label: 'Theme', icon: Palette },
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'brightness', label: 'Brightness', icon: Sun },
];

export default function DarkModeMobileNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState('home');
    const [hovered, setHovered] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 bg-white shadow-xl flex items-center justify-center p-8">

                {/* 🎯 THE NAVBAR */}
                <nav
                    className="relative inline-flex items-center gap-1 rounded-full bg-white p-2 border border-black/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
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
                                className="relative w-11 h-11 flex items-center justify-center rounded-full focus:outline-none"
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                {/* tooltip */}
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.span
                                            initial={{ opacity: 0, y: 6, scale: 0.85 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 6, scale: 0.85 }}
                                            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                                            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-[11px] font-medium text-zinc-800 shadow-[0_4px_16px_rgba(0,0,0,0.18)] ring-1 ring-black/5 pointer-events-none"
                                        >
                                            {item.label}
                                            <span className="absolute left-1/2 top-full -translate-x-1/2 -mt-[3px] w-2 h-2 rotate-45 bg-white ring-1 ring-black/5" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>

                                {/* hover indicator */}
                                {!isActive && (
                                    <motion.span
                                        className="absolute inset-0 rounded-full bg-black/[0.05]"
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.7 }}
                                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                    />
                                )}

                                {/* active indicator */}
                                {isActive && (
                                    <motion.span
                                        layoutId="dark-nav-active"
                                        className="absolute inset-0 rounded-full bg-zinc-900"
                                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                                    />
                                )}

                                <Icon
                                    size={19}
                                    strokeWidth={2}
                                    className={`relative z-10 transition-colors duration-200 ${
                                        isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-900'
                                    }`}
                                />
                            </button>
                        );
                    })}
                </nav>

                <span className="absolute bottom-6 text-black/30 text-[13px] font-semibold tracking-widest uppercase">Floating Toolbar</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
