import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown } from 'lucide-react';

const promptContent = `editorial luxury navbar (About, Projects, Contact) dropping a full height brand lilac background curtain via framer motion, RewampUI wordmark and logo in SF Pro Semibold`;

export default function CurtainRevealNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeCurtain, setActiveCurtain] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { id: "about", label: "About", color: "from-[#171717] to-[#404040]" },
        { id: "projects", label: "Projects", color: "from-[#525252] to-[#C1B4D8]" },
        { id: "contact", label: "Contact", color: "from-[#404040] to-[#C1B4D8]" }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex flex-col justify-start group">
                
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
                <header className="relative z-20 w-full px-8 py-6 flex items-center justify-between bg-black border-b border-white/10">
                    <span className="flex items-center gap-2 font-heading text-xl font-semibold tracking-tight text-white transition-colors duration-500">
                        <img src="/logo.svg" alt="RewampUI" className="w-6 h-6 object-contain shrink-0" />
                        RewampUI
                    </span>

                    <nav className="flex gap-8">
                        {links.map((link) => (
                            <button
                                key={link.id}
                                onMouseEnter={() => setActiveCurtain(link.id)}
                                onMouseLeave={() => setActiveCurtain(null)}
                                className={`relative text-[12px] font-semibold tracking-[0.2em] uppercase flex items-center gap-1 transition-colors duration-500 ${
                                    activeCurtain === link.id ? 'text-white' : 'text-white/50 hover:text-[#E4DDF0]'
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
                
                <span className={`absolute bottom-6 right-6 text-[13px] font-semibold tracking-widest uppercase transition-colors z-20 ${activeCurtain ? 'text-white/30' : 'text-black/30 dark:text-white/30'}`}>Curtain Reveal</span>
            </div>
</div>
    );
}
