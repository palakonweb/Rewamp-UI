import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Layers, Hexagon } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'profile', label: null, icon: User },
    { id: 'layers', label: null, icon: Layers },
];

// Buttery spring: fairly high stiffness with enough damping that it settles
// without any visible overshoot wobble - the "smooth" the reference's
// sliding pill and hexagon button both share.
const SPRING = { type: 'spring', stiffness: 500, damping: 40, mass: 0.6 };

export default function InvertedSegmentNavShowcase() {
    const [active, setActive] = useState('home');

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div className="flex items-center gap-3 rounded-[28px] bg-white p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.25)]">
                {/* Black track holding the sliding active pill */}
                <div className="relative flex items-center gap-1 rounded-full bg-black p-1.5">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = active === item.id;

                        return (
                            <motion.button
                                key={item.id}
                                type="button"
                                onClick={() => setActive(item.id)}
                                whileTap={{ scale: 0.94 }}
                                className="relative z-10 flex items-center gap-2 h-11 rounded-full cursor-pointer"
                                animate={{ paddingLeft: isActive ? 18 : 14, paddingRight: isActive ? 18 : 14 }}
                                transition={SPRING}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="inverted-segment-pill"
                                        transition={SPRING}
                                        className="absolute inset-0 rounded-full bg-white"
                                    />
                                )}
                                <Icon
                                    size={18}
                                    strokeWidth={2}
                                    className="relative shrink-0 transition-colors duration-150"
                                    style={{ color: isActive ? '#111111' : 'rgba(255,255,255,0.75)' }}
                                />
                                {item.label && (
                                    <AnimatePresence initial={false}>
                                        {isActive && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: 'auto' }}
                                                exit={{ opacity: 0, width: 0 }}
                                                transition={SPRING}
                                                className="relative text-[15px] font-semibold text-black whitespace-nowrap overflow-hidden"
                                            >
                                                {item.label}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                )}
                            </motion.button>
                        );
                    })}
                </div>

                {/* Standalone action button */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.92 }}
                    transition={SPRING}
                    aria-label="Menu"
                    className="h-[60px] w-[60px] shrink-0 rounded-full bg-black flex items-center justify-center cursor-pointer"
                >
                    <Hexagon size={20} strokeWidth={2} className="text-white" />
                </motion.button>
            </div>
        </div>
    );
}
