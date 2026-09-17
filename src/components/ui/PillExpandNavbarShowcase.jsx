import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, FolderKanban, Mail } from 'lucide-react';

const promptContent = `black pill bottom navbar with 3 icons, active/hovered tab expands into a rounded label pill with icon + text, spring motion`;

const navItems = [
    { id: 'about', label: 'About', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contact', label: 'Contact', icon: Mail },
];

export default function PillExpandNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState('about');
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
                                onClick={() => setActive(item.id)}
                                onMouseEnter={() => setHovered(item.id)}
                                animate={{ width: isExpanded ? 100 : 32 }}
                                transition={{ type: 'spring', stiffness: 140, damping: 24, mass: 1.1 }}
                                whileTap={{ scale: 0.94 }}
                                className={`h-8 flex items-center justify-center rounded-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${
                                    isExpanded ? 'bg-white/15 gap-1.5 px-3' : ''
                                } ${isActive && !isExpanded ? 'bg-white/10' : ''}`}
                                aria-label={item.label}
                                aria-current={isActive ? 'page' : undefined}
                            >
                                <Icon size={15} className="text-white shrink-0" strokeWidth={2} />
                                <AnimatePresence initial={false}>
                                    {isExpanded && (
                                        <motion.span
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.2 } }}
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
</div>
    );
}
