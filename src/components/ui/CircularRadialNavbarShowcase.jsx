import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Home, User, FolderKanban, Mail } from 'lucide-react';

export default function CircularRadialNavbarShowcase() {
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'contacts', label: 'Contacts', icon: Mail },
    ];
    const radius = 86; // Distance of icons from center
    const angleStep = 180 / (navItems.length - 1); // 180 degrees spread for semi-circle (60 deg each for 4 items)

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE RADIATING NAVBAR */}
            <div className="relative flex items-center justify-center h-[200px] w-full">
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
                                        delay: i * 0.04 
                                    }}
                                    whileHover={{ scale: 1.15 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="absolute w-12 h-12 rounded-full bg-white dark:bg-[#1E1B28] shadow-[0_6px_20px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.6)] border border-black/[0.08] dark:border-white/12 flex items-center justify-center z-10 cursor-pointer"
                                    title={item.label}
                                >
                                    <Icon size={19} className="text-neutral-700 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors" />
                                </motion.button>
                            );
                        })}
                    </AnimatePresence>

                    {/* The Main FAB (Floating Action Button) */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-20 w-16 h-16 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_8px_24px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_24px_rgba(255,255,255,0.2)] flex items-center justify-center border-4 border-[#EAEAEA] dark:border-[#141218] cursor-pointer"
                    >
                        <motion.div
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <Plus size={32} strokeWidth={2.2} />
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click plus button to expand radial navigation
            </p>
        </div>
    );
}
