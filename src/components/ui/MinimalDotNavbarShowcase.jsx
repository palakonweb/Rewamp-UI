import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper minimalist unstyled navbar relying solely on a gliding cherry red dot for layoutId indicator state`;

export default function MinimalDotNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = ["About", "Projects", "Contact"];

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">
                
                {/* 🎯 THE NAVBAR */}
                <nav className="relative flex items-center gap-10">
                    {links.map((link, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <button
                                key={link}
                                onClick={() => setActiveIndex(index)}
                                className="relative py-4 group"
                            >
                                <span className={`text-[12px] font-bold tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-black dark:text-white' : 'text-black/40 dark:text-white/40 group-hover:text-black/70 dark:group-hover:text-white/70'}`}>
                                    {link}
                                </span>
                                
                                {/* The Minimal Dot */}
                                {isActive && (
                                    <motion.div
                                        layoutId="minimal-dot"
                                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[0_0_8px_var(--color-accent-red)]"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Minimal Dot</span>
            </div>
</div>
    );
}
