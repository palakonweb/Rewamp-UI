import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Folder, ClipboardEdit, Copy, Trophy, Flag, CalendarCheck } from 'lucide-react';

const createOptions = [
    { id: 'project', label: 'Project', icon: Folder },
    { id: 'task', label: 'Task', icon: ClipboardEdit },
    { id: 'note', label: 'Note', icon: Copy },
    { id: 'goal', label: 'Goal', icon: Trophy },
    { id: 'milestone', label: 'Milestone', icon: Flag },
    { id: 'reminder', label: 'Reminder', icon: CalendarCheck },
];

const SPRING = { type: 'spring', stiffness: 420, damping: 32 };

export default function CreateNewButtonShowcase() {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative w-full h-full flex items-center justify-center p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <motion.button
                type="button"
                onClick={() => setOpen(true)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                className="flex items-center gap-2.5 h-14 px-7 rounded-full cursor-pointer"
                style={{
                    backgroundColor: 'var(--surface)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 10px 22px -10px rgba(0,0,0,0.14)',
                }}
            >
                <Plus size={18} strokeWidth={2} style={{ color: 'var(--text-secondary)' }} />
                <span className="text-[16px] font-medium" style={{ color: 'var(--text-primary)' }}>
                    Create New
                </span>
            </motion.button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        onClick={() => setOpen(false)}
                        className="absolute inset-0 z-30 flex items-center justify-center p-6"
                        style={{ backgroundColor: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(2px)' }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.92, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.92, y: 10, transition: { duration: 0.15 } }}
                            transition={SPRING}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm rounded-[26px] overflow-hidden"
                            style={{ backgroundColor: '#EFEAE0', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.35)' }}
                        >
                            {/* Sand-colored header frame, behind the white content card */}
                            <div className="flex items-center justify-between px-6 pt-5 pb-5">
                                <h3 className="text-[19px] font-semibold text-neutral-800">Create New</h3>
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    aria-label="Close"
                                    className="h-7 w-7 flex items-center justify-center rounded-full bg-neutral-300/70 hover:bg-neutral-400/70 cursor-pointer transition-colors"
                                >
                                    <X size={14} strokeWidth={2.5} className="text-white" />
                                </button>
                            </div>

                            {/* White content card, inset within the sand frame */}
                            <div className="bg-white rounded-[22px] mx-2 mb-2 px-6 py-8 shadow-[0_8px_20px_-10px_rgba(0,0,0,0.15)]">
                                <div className="grid grid-cols-3 gap-x-4 gap-y-7">
                                    {createOptions.map((option) => {
                                        const OptionIcon = option.icon;
                                        return (
                                            <motion.button
                                                key={option.id}
                                                type="button"
                                                whileHover={{ scale: 1.06 }}
                                                whileTap={{ scale: 0.95 }}
                                                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                                                onClick={() => setOpen(false)}
                                                className="flex flex-col items-center gap-2.5 cursor-pointer group"
                                            >
                                                <OptionIcon
                                                    size={26}
                                                    strokeWidth={1.75}
                                                    className="text-neutral-400 group-hover:text-neutral-800 transition-colors"
                                                />
                                                <span className="text-[13px] font-medium text-neutral-600 group-hover:text-neutral-900 transition-colors">
                                                    {option.label}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
