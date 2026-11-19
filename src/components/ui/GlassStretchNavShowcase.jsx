import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Bell, Folder, MessageCircle, Plus, FileText, FolderPlus, CheckSquare } from 'lucide-react';

// Every item is labeled the same way Home was, instead of three of the four
// being icon-only - that also removes the width-stretch-on-label-reveal
// animation, since there's no longer a label that mounts/unmounts.
const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'files', label: 'Files', icon: Folder },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
];

const createOptions = [
    { id: 'note', label: 'New Note', icon: FileText },
    { id: 'folder', label: 'New Folder', icon: FolderPlus },
    { id: 'task', label: 'New Task', icon: CheckSquare },
];

// Lower damping than the kit's usual sliding-pill spring so the pill still
// visibly stretches as it resizes between differently-sized labeled items,
// then settles - the "stretch" in "stretch pill hover". Each button's own
// padding is now fixed (not animated), so only the shared pill moves/resizes,
// not the buttons themselves.
const STRETCH_SPRING = { type: 'spring', stiffness: 380, damping: 22, mass: 0.8 };
const POPOVER_SPRING = { type: 'spring', stiffness: 420, damping: 34 };

export default function GlassStretchNavShowcase() {
    const [active, setActive] = useState('home');
    const [hovered, setHovered] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);

    // The pill previews whatever's hovered, falling back to the clicked
    // item once the cursor leaves - a hover-driven stretch, not just a
    // click-driven slide.
    const highlighted = hovered ?? active;

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div className="flex items-center gap-4" onMouseLeave={() => setHovered(null)}>
                {/* Glass track */}
                <div
                    className="relative flex items-center gap-1 rounded-full p-2"
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.6)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.8)',
                        boxShadow: '0 16px 32px -14px rgba(0,0,0,0.18)',
                    }}
                >
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isHighlighted = highlighted === item.id;

                        return (
                            <button
                                key={item.id}
                                type="button"
                                onMouseEnter={() => setHovered(item.id)}
                                onClick={() => setActive(item.id)}
                                className="relative z-10 flex items-center gap-2 h-12 px-4 rounded-full cursor-pointer"
                            >
                                {isHighlighted && (
                                    <motion.span
                                        layoutId="glass-stretch-pill"
                                        transition={STRETCH_SPRING}
                                        className="absolute inset-0 rounded-full bg-white"
                                        style={{ boxShadow: '0 8px 18px -8px rgba(0,0,0,0.25)' }}
                                    />
                                )}
                                <Icon
                                    size={18}
                                    strokeWidth={2}
                                    className="relative shrink-0 transition-colors duration-150"
                                    style={{ color: isHighlighted ? '#171717' : '#C9C9C9' }}
                                />
                                <span
                                    className="relative text-[15px] font-semibold whitespace-nowrap transition-colors duration-150"
                                    style={{ color: isHighlighted ? '#171717' : '#C9C9C9' }}
                                >
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Standalone create button, with its own hover submenu */}
                <div className="relative" onMouseEnter={() => setCreateOpen(true)} onMouseLeave={() => setCreateOpen(false)}>
                    <AnimatePresence>
                        {createOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.94, y: 6 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.94, y: 6, transition: { duration: 0.12 } }}
                                transition={POPOVER_SPRING}
                                style={{ originY: 1 }}
                                className="absolute bottom-full right-0 mb-3 w-44 z-20"
                            >
                                <div className="rounded-xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.25)] p-1.5">
                                    {createOptions.map((option) => {
                                        const OptionIcon = option.icon;
                                        return (
                                            <div
                                                key={option.id}
                                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                                            >
                                                <OptionIcon size={15} strokeWidth={2} className="text-neutral-400 shrink-0" />
                                                {option.label}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="absolute right-6 top-full -mt-1.5 h-2.5 w-2.5 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.92 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                        aria-label="Create"
                        className="relative z-10 h-16 w-16 shrink-0 rounded-full flex items-center justify-center cursor-pointer bg-white"
                        style={{ boxShadow: '0 14px 26px -10px rgba(0,0,0,0.22)' }}
                    >
                        <Plus size={24} strokeWidth={2.5} className="text-neutral-900" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
