import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Plus, Home, FolderKanban, Mail } from 'lucide-react';

const promptContent = `circular action floating button that expands into a radial animated layout of icons (About, Projects, Contact)`;

export default function CircularRadialNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = [
        { id: 'about', label: 'About', icon: Home },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];
    const radius = 80; // Distance of icons from center
    const angleStep = 180 / (navItems.length - 1); // 180 degrees spread for a semi-circle

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-end justify-center pb-12 group">
                
                {/* 🎯 THE RADIATING NAVBAR */}
                <div className="relative flex items-center justify-center">
                    
                    {/* The Menu Items */}
                    <AnimatePresence>
                        {isOpen && navItems.map((item, i) => {
                            const Icon = item.icon;
                            const angle = 180 + (i * angleStep); // start at 180 degrees (left) mapping to 360 (right)
                            const x = radius * Math.cos((angle * Math.PI) / 180);
                            const y = radius * Math.sin((angle * Math.PI) / 180);

                            return (
                                <motion.button
                                    key={item.id}
                                    aria-label={item.label}
                                    initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    animate={{ x, y, scale: 1, opacity: 1 }}
                                    exit={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                                    transition={{ 
                                        type: "spring", 
                                        stiffness: 400, 
                                        damping: 25, 
                                        delay: i * 0.05 
                                    }}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute w-12 h-12 rounded-full bg-white dark:bg-[#1a1a1c] shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 flex items-center justify-center z-10"
                                >
                                    <Icon size={20} className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors" />
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>

                    {/* The Main FAB (Floating Action Button) */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-20 w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.2)] flex items-center justify-center border-4 border-[#f9fafb] dark:border-[#0a0a0c]"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Plus size={32} strokeWidth={2} />
                        </motion.div>
                    </motion.button>

                </div>
                
                <span className="absolute bottom-6 left-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Circular Radial FAB</span>
            </div>
</div>
    );
}
