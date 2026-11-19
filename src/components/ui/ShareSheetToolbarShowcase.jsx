import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Send,
    Trash2,
    Share2,
    UserPlus,
    Bookmark,
    Mail,
    MessageCircle,
    Archive,
    Link2,
    Star,
    FolderPlus,
} from 'lucide-react';

// Every toolbar icon gets the same minimal 2-3 row popover - plain icon +
// label, no colors, no secondary buttons, no footer. This replaces the
// earlier elaborate multi-platform share sheet, which only "share" had.
const toolbarItems = [
    {
        id: 'send',
        icon: Send,
        panel: [
            { icon: Mail, label: 'Email' },
            { icon: MessageCircle, label: 'Message' },
        ],
    },
    {
        id: 'delete',
        icon: Trash2,
        panel: [
            { icon: Archive, label: 'Archive' },
            { icon: Trash2, label: 'Delete' },
        ],
    },
    {
        id: 'share',
        icon: Share2,
        label: 'share',
        highlighted: true,
        panel: [
            { icon: Link2, label: 'Copy link' },
            { icon: Mail, label: 'Email' },
            { icon: MessageCircle, label: 'Message' },
        ],
    },
    {
        id: 'invite',
        icon: UserPlus,
        panel: [
            { icon: Mail, label: 'Invite by email' },
            { icon: Link2, label: 'Invite by link' },
        ],
    },
    {
        id: 'save',
        icon: Bookmark,
        panel: [
            { icon: Star, label: 'Favorites' },
            { icon: FolderPlus, label: 'Collection' },
        ],
    },
];

const SPRING = { type: 'spring', stiffness: 420, damping: 34 };

function ToolbarButton({ item, isOpen, onEnter, onLeave }) {
    const Icon = item.icon;
    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.94, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.94, y: 6, transition: { duration: 0.12 } }}
                        transition={SPRING}
                        style={{ originY: 1 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-40 z-20"
                    >
                        <div className="rounded-xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.25)] p-1.5">
                            {item.panel.map((row) => {
                                const RowIcon = row.icon;
                                return (
                                    <div
                                        key={row.label}
                                        className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium text-neutral-700 hover:bg-neutral-100 cursor-pointer transition-colors"
                                    >
                                        <RowIcon size={15} strokeWidth={2} className="text-neutral-400 shrink-0" />
                                        {row.label}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1.5 h-2.5 w-2.5 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                    </motion.div>
                )}
            </AnimatePresence>

            {item.highlighted ? (
                <div className="flex items-center gap-2 h-10 px-4 rounded-full bg-white text-neutral-900 shadow-[0_4px_10px_-4px_rgba(0,0,0,0.2)] cursor-pointer">
                    <span className="text-[14px] font-semibold">{item.label}</span>
                    <Icon size={16} strokeWidth={2} />
                </div>
            ) : (
                <button
                    type="button"
                    aria-label={item.id}
                    className="h-10 w-10 flex items-center justify-center rounded-full text-neutral-500 hover:text-neutral-700 cursor-pointer"
                >
                    <Icon size={18} strokeWidth={2} />
                </button>
            )}
        </div>
    );
}

export default function ShareSheetToolbarShowcase() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div className="flex items-center gap-1 rounded-full px-2 py-2" style={{ backgroundColor: '#EFEFEF' }}>
                {toolbarItems.map((item) => (
                    <ToolbarButton
                        key={item.id}
                        item={item}
                        isOpen={hoveredId === item.id}
                        onEnter={() => setHoveredId(item.id)}
                        onLeave={() => setHoveredId(null)}
                    />
                ))}
            </div>
        </div>
    );
}
