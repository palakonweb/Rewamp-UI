import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, ListChecks, PieChart, Settings } from 'lucide-react';
import { Skeleton } from './Skeleton';

const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'tasks', label: 'Tasks', icon: ListChecks },
    { id: 'goals', label: 'Goals', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings },
];

// Same spring used for the Account Menu's sliding active-pill and the Glass
// Action Dock's tooltip, kept identical so every hover-driven highlight in
// the kit moves with the same feel.
const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 };

export default function SkeletonNavRevealShowcase() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="w-full h-full flex items-center justify-center py-14">
            <div
                onMouseLeave={() => setHovered(null)}
                className="flex items-center gap-6"
            >
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isHovered = hovered === item.id;

                    return (
                        <div
                            key={item.id}
                            onMouseEnter={() => setHovered(item.id)}
                            className="relative flex items-center py-3 cursor-pointer"
                        >
                            {/* Tooltip lives inside its own item's box so it never
                                needs manual pixel math for its position - this
                                outer slot centers with plain flex (no transform),
                                leaving the inner motion.div's layoutId free to
                                drive the slide between items without fighting
                                over the transform property. */}
                            {isHovered && (
                                <div className="absolute -top-2 inset-x-0 flex justify-center pointer-events-none z-20 -translate-y-full">
                                    <motion.div
                                        layoutId="skeleton-nav-tooltip"
                                        transition={PILL_SPRING}
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-black shadow-lg"
                                    >
                                        <Icon size={16} strokeWidth={2} className="text-white shrink-0" />
                                        <span className="text-[14px] font-medium text-white whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    </motion.div>
                                </div>
                            )}

                            <Skeleton className="w-20 h-2.5 rounded-full" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
