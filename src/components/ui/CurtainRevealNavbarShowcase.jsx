import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';

const promptContent = `editorial luxury navbar (About, Projects, Contact) dropping a full height brand-orange background curtain via framer motion, RewampUI wordmark and logo in SF Pro Semibold`;

export default function CurtainRevealNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeCurtain, setActiveCurtain] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { id: "about", label: "About", color: "from-[#1F1F1F] to-[#3A3A3A]" },
        { id: "projects", label: "Projects", color: "from-[#D2471A] to-[#EC5E27]" },
        { id: "contact", label: "Contact", color: "from-[#7A2D12] to-[#D2471A]" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#0a0a0a] shadow-xl flex flex-col justify-start group">
                
                {/* 🎯 THE CURTAIN LAYER */}
                <AnimatePresence>
                    {activeCurtain && (
                        <motion.div 
                            initial={{ y: '-100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '-100%', transition: { duration: 0.3, ease: 'easeIn' } }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // smooth apple-like bezier
                            className={`absolute inset-0 z-10 bg-gradient-to-b ${links.find(l => l.id === activeCurtain)?.color} flex items-center justify-center`}
                        >
                             <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-white/90 font-heading text-5xl font-semibold tracking-wide mix-blend-overlay"
                             >
                                 {links.find(l => l.id === activeCurtain)?.label}
                             </motion.h2>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* 🎯 THE NAVBAR HEADER */}
                <header className="relative z-20 w-full px-8 py-6 flex items-center justify-between border-b border-black/10 dark:border-white/10">
                    <span className={`flex items-center gap-2 font-heading text-xl font-semibold tracking-tight ${activeCurtain ? 'text-white' : 'text-black dark:text-white'} transition-colors duration-500`}>
                        <img src="/logo.svg" alt="RewampUI" className="w-6 h-6 object-contain shrink-0" />
                        RewampUI
                    </span>

                    <nav className="flex gap-8">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onMouseEnter={() => setActiveCurtain(link.id)}
                                onMouseLeave={() => setActiveCurtain(null)}
                                className={`text-[12px] font-semibold tracking-[0.2em] uppercase flex items-center gap-1 transition-colors duration-500 ${
                                    activeCurtain
                                        ? (activeCurtain === link.id ? 'text-white' : 'text-white/40')
                                        : 'text-black/60 dark:text-white/60 hover:text-[#EC5E27] dark:hover:text-[#EC5E27]'
                                }`}
                            >
                                {link.label}
                                <ChevronDown size={12} className={`transition-transform duration-300 ${activeCurtain === link.id ? 'rotate-180' : ''}`} />
                            </button>
                        ))}
                    </nav>
                </header>
                
                <span className={`absolute bottom-6 right-6 text-[13px] font-semibold tracking-widest uppercase transition-colors z-20 ${activeCurtain ? 'text-white/30' : 'text-black/30 dark:text-white/30'}`}>Curtain Reveal</span>
            </div>
</div>
    );
}
