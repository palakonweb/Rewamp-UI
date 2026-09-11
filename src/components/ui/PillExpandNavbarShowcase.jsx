import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, LayoutGrid, ShoppingBag, Bookmark, User } from 'lucide-react';

const promptContent = `black pill bottom navbar with 5 icons, active/hovered tab expands into a rounded label pill with icon + text, spring motion`;

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'category', label: 'Category', icon: LayoutGrid },
    { id: 'cart', label: 'Cart', icon: ShoppingBag },
    { id: 'save', label: 'Save', icon: Bookmark },
    { id: 'profile', label: 'Profile', icon: User },
];

export default function PillExpandNavbarShowcase() {
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
            <div className="relative w-full h-[420px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f2f2f3] dark:bg-[#09090b] shadow-xl flex items-center justify-center p-6 sm:p-8">

                {/* 🎯 THE NAVBAR */}
                <nav
                    className="inline-flex items-center rounded-full bg-black p-1.5 gap-1"
                    onMouseLeave={() => setHovered(null)}
                >
                    {navItems.map((item) => {
                        const isActive = active === item.id;
                        const isExpanded = hovered ? hovered === item.id : isActive;
                        const Icon = item.icon;

                        return (
                            <motion.button
                                key={item.id}
                                layout
                                onClick={() => setActive(item.id)}
                                onMouseEnter={() => setHovered(item.id)}
                                transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.9 }}
                                whileTap={{ scale: 0.94 }}
                                className={`h-8 flex items-center justify-center rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                                    isExpanded ? 'bg-white/15 px-3 gap-1.5' : 'w-8'
                                } ${isActive && !isExpanded ? 'bg-white/10' : ''}`}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon size={15} className="text-white shrink-0" strokeWidth={2} />
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.15 } }}
                                            exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                            className="text-white text-[13px] font-medium whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </nav>

                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Pill Expand</span>
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
