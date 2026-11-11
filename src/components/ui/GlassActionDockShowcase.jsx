import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Inbox, Eye, ScanEye, Share, Menu } from 'lucide-react';

const dockItems = [
    { id: 'chat', label: 'Chat', icon: MessageCircle },
    { id: 'inbox', label: 'Inbox', icon: Inbox, badge: true },
    { id: 'preview', label: 'Preview', icon: Eye },
    { id: 'focus', label: 'Focus', icon: ScanEye },
    { id: 'share', label: 'Share', icon: Share },
    { id: 'menu', label: 'Menu', icon: Menu, badge: true },
];

// Same spring used for the Account Menu's sliding active-pill, kept identical
// here so every hover-driven highlight in the kit moves with the same feel.
const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 };

export default function GlassActionDockShowcase() {
    const [hovered, setHovered] = useState(null);

    return (
        <div className="w-full h-full flex items-center justify-center py-10">
            <div
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center gap-1.5 p-2 rounded-full bg-[#0c0c0f]/90 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.55)]"
            >
                {dockItems.map((item) => {
                    const Icon = item.icon;
                    const isHovered = hovered === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            onMouseEnter={() => setHovered(item.id)}
                            aria-label={item.label}
                            className="relative h-11 w-11 shrink-0 flex items-center justify-center rounded-full cursor-pointer focus:outline-none"
                        >
                            {/* Tooltip lives inside its own icon's box so it never
                                needs manual pixel math for its position - this
                                outer slot centers with plain flex (no transform),
                                leaving the inner motion.div's layoutId free to
                                drive the slide between icons without fighting
                                over the transform property. */}
                            {isHovered && (
                                <div className="absolute -top-11 inset-x-0 flex justify-center pointer-events-none z-20">
                                    <motion.div
                                        layoutId="dock-tooltip"
                                        transition={PILL_SPRING}
                                        className="relative px-3 py-1.5 rounded-lg bg-[#1a1a1f] border border-white/10 shadow-lg"
                                    >
                                        <span className="block text-[12px] font-medium text-white whitespace-nowrap">
                                            {item.label}
                                        </span>
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-[#1a1a1f]" />
                                    </motion.div>
                                </div>
                            )}

                            {isHovered && (
                                <motion.span
                                    layoutId="dock-hover-bg"
                                    transition={PILL_SPRING}
                                    className="absolute inset-0 rounded-full bg-white/10"
                                />
                            )}

                            <Icon size={18} strokeWidth={2} className="relative text-white/85" />
                            {item.badge && (
                                <span className="absolute top-1.5 right-1.5 h-[7px] w-[7px] rounded-full bg-[#3B82F6] ring-2 ring-[#0c0c0f]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
