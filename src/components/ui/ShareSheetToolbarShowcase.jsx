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
    Check,
} from 'lucide-react';

// Every toolbar icon is labeled the same way "share" was, and every icon
// gets the same minimal 2-3 row popover - plain icon + label, no secondary
// buttons, no footer. The delete panel's own "Delete" row is marked danger
// so it renders red even before its parent button is highlighted.
const toolbarItems = [
    {
        id: 'send',
        label: 'send',
        icon: Send,
        panel: [
            { id: 'email', icon: Mail, label: 'Email', doneLabel: 'Sent' },
            { id: 'message', icon: MessageCircle, label: 'Message', doneLabel: 'Sent' },
        ],
    },
    {
        id: 'delete',
        label: 'delete',
        icon: Trash2,
        panel: [
            { id: 'archive', icon: Archive, label: 'Archive', doneLabel: 'Archived' },
            { id: 'delete', icon: Trash2, label: 'Delete', doneLabel: 'Deleted', danger: true },
        ],
    },
    {
        id: 'share',
        label: 'share',
        icon: Share2,
        panel: [
            { id: 'copy', icon: Link2, label: 'Copy link', doneLabel: 'Copied' },
            { id: 'email', icon: Mail, label: 'Email', doneLabel: 'Shared' },
            { id: 'message', icon: MessageCircle, label: 'Message', doneLabel: 'Shared' },
        ],
    },
    {
        id: 'invite',
        label: 'invite',
        icon: UserPlus,
        panel: [
            { id: 'email', icon: Mail, label: 'Invite by email', doneLabel: 'Invited' },
            { id: 'link', icon: Link2, label: 'Invite by link', doneLabel: 'Invited' },
        ],
    },
    {
        id: 'save',
        label: 'save',
        icon: Bookmark,
        panel: [
            { id: 'favorites', icon: Star, label: 'Favorites', doneLabel: 'Saved' },
            { id: 'collection', icon: FolderPlus, label: 'Collection', doneLabel: 'Saved' },
        ],
    },
];

const SPRING = { type: 'spring', stiffness: 420, damping: 34 };

// Staggered entrance for the popover's rows - the container fades/scales in
// first, then each row cascades in a beat after the last.
const panelVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.035, delayChildren: 0.03 } },
};
const rowVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: SPRING },
};

function PanelRow({ row }) {
    const RowIcon = row.icon;
    const [done, setDone] = useState(false);

    const handleClick = () => {
        setDone(true);
        setTimeout(() => setDone(false), 1100);
    };

    const textColor = row.danger ? 'text-red-600' : 'text-neutral-700';
    const hoverBg = row.danger ? 'hover:bg-red-50' : 'hover:bg-neutral-100';

    return (
        <motion.button
            type="button"
            variants={rowVariants}
            onClick={handleClick}
            className={`relative w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium ${textColor} ${hoverBg} cursor-pointer transition-colors overflow-hidden`}
        >
            <AnimatePresence mode="wait" initial={false}>
                {done ? (
                    <motion.span
                        key="done"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.14 }}
                        className="flex items-center gap-2.5"
                    >
                        <motion.span
                            initial={{ scale: 0.6 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                        >
                            <Check size={15} strokeWidth={2.5} className={row.danger ? 'text-red-600' : 'text-emerald-600'} />
                        </motion.span>
                        <span>{row.doneLabel}</span>
                    </motion.span>
                ) : (
                    <motion.span
                        key="default"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.14 }}
                        className="flex items-center gap-2.5"
                    >
                        <RowIcon size={15} strokeWidth={2} className={row.danger ? 'text-red-400' : 'text-neutral-400'} />
                        <span>{row.label}</span>
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}

function ToolbarButton({ item, isHighlighted, isOpen, onEnter, onLeave, onClick }) {
    const Icon = item.icon;
    // Delete is destructive, so it stays red instead of following the
    // normal neutral highlighted/unhighlighted coloring.
    const color = item.id === 'delete' ? (isHighlighted ? '#DC2626' : '#E79A9A') : isHighlighted ? '#171717' : '#9A9A9A';
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
                        <motion.div
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            className="rounded-xl bg-white shadow-[0_16px_32px_-12px_rgba(0,0,0,0.25)] p-1.5"
                        >
                            {item.panel.map((row) => (
                                <PanelRow key={row.id} row={row} />
                            ))}
                        </motion.div>
                        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1.5 h-2.5 w-2.5 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                type="button"
                onClick={onClick}
                className="relative z-10 flex items-center gap-2 h-10 px-4 rounded-full cursor-pointer"
            >
                {isHighlighted && (
                    <motion.span
                        layoutId="share-sheet-pill"
                        transition={SPRING}
                        className="absolute inset-0 rounded-full bg-white"
                        style={{ boxShadow: '0 4px 10px -4px rgba(0,0,0,0.2)' }}
                    />
                )}
                <span
                    className="relative text-[14px] font-semibold whitespace-nowrap transition-colors duration-150"
                    style={{ color }}
                >
                    {item.label}
                </span>
                <Icon
                    size={16}
                    strokeWidth={2}
                    className="relative shrink-0 transition-colors duration-150"
                    style={{ color }}
                />
            </button>
        </div>
    );
}

export default function ShareSheetToolbarShowcase() {
    const [active, setActive] = useState('share');
    const [hovered, setHovered] = useState(null);

    // The pill (and its popover) follow whatever's hovered, falling back to
    // the last clicked item once the cursor leaves - same shift-on-hover
    // behavior as the Glass Stretch Nav.
    const highlighted = hovered ?? active;

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div
                className="flex items-center gap-1 rounded-full px-2 py-2"
                style={{ backgroundColor: '#EFEFEF' }}
                onMouseLeave={() => setHovered(null)}
            >
                {toolbarItems.map((item) => (
                    <ToolbarButton
                        key={item.id}
                        item={item}
                        isHighlighted={highlighted === item.id}
                        isOpen={highlighted === item.id}
                        onEnter={() => setHovered(item.id)}
                        onLeave={() => {}}
                        onClick={() => setActive(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}
