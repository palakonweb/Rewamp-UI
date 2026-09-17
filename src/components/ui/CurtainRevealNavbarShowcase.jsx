import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function CurtainRevealNavbarShowcase() {
    const [activeCurtain, setActiveCurtain] = useState(null);

    const links = [
        { id: "home", label: "Home", color: "from-[#121016] to-[#2E283A]" },
        { id: "about", label: "About", color: "from-[#171717] to-[#404040]" },
        { id: "projects", label: "Projects", color: "from-[#2A2433] to-[#5A4E6E]" },
        { id: "contacts", label: "Contacts", color: "from-[#352D42] to-[#C1B4D8]" }
    ];

    return (
        <div className="w-full h-full flex flex-col justify-between select-none relative overflow-hidden rounded-[20px]">
            {/* 🎯 THE CURTAIN LAYER */}
            <AnimatePresence>
                {activeCurtain && (
                    <motion.div 
                        initial={{ y: '-100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '-100%', transition: { duration: 0.3, ease: 'easeIn' } }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className={`absolute inset-0 z-10 bg-gradient-to-b ${links.find(l => l.id === activeCurtain)?.color} flex items-center justify-center`}
                    >
                         <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-white/90 font-heading text-4xl sm:text-5xl font-semibold tracking-wide"
                         >
                             {links.find(l => l.id === activeCurtain)?.label}
                         </motion.h2>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 🎯 THE NAVBAR HEADER */}
            <header className="relative z-20 w-full px-6 sm:px-8 py-5 flex items-center justify-between bg-black/90 dark:bg-black/95 backdrop-blur-xl border-b border-white/10">
                <span className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-white">
                    <img src="/logo.svg" alt="RewampUI" className="w-6 h-6 object-contain shrink-0" />
                    RewampUI
                </span>

                <nav className="flex gap-4 sm:gap-7">
                    {links.map((link) => (
                        <button
                            key={link.id}
                            onMouseEnter={() => setActiveCurtain(link.id)}
                            onMouseLeave={() => setActiveCurtain(null)}
                            className={`relative text-[11px] sm:text-[12px] font-semibold tracking-[0.18em] uppercase flex items-center gap-1 transition-colors duration-300 cursor-pointer ${
                                activeCurtain === link.id ? 'text-white' : 'text-white/60 hover:text-white'
                            }`}
                        >
                            {link.label}
                            <ChevronDown size={12} className={`transition-transform duration-300 ${activeCurtain === link.id ? 'rotate-180' : ''}`} />
                            <span
                                className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#C1B4D8] origin-left transition-transform duration-300 ${
                                    activeCurtain === link.id ? 'scale-x-100' : 'scale-x-0'
                                }`}
                            />
                        </button>
                    ))}
                </nav>
            </header>

            <div className="flex-1 flex items-end justify-center pb-4 z-20">
                {/* Centered Single-line Description */}
                <p className="text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                    Hover tabs to drop curtain reveal
                </p>
            </div>
        </div>
    );
}
