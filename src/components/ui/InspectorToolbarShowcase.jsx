import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Palette,
    Boxes,
    Type,
    Target,
    Droplet,
    Grid2x2,
    Component,
    Ruler,
    AlignCenter,
    Spline,
} from 'lucide-react';

// Only the "Style" panel's content (Brand colors + Style: Default) is shown
// in the reference. The other three panels below follow the same
// icon+label / value-or-swatches row pattern but their copy is inferred,
// written for a UI component library's own inspector toolbar rather than
// the video-editor copy ("Upsells", "Captions", "Aspect ratio") this
// started from.
const toolbarItems = [
    {
        id: 'style',
        label: 'Style',
        icon: Palette,
        panel: [
            { icon: Droplet, label: 'Brand colors', swatches: true },
            { icon: Grid2x2, label: 'Style', value: 'Default' },
        ],
    },
    {
        id: 'components',
        label: 'Components',
        icon: Boxes,
        panel: [
            { icon: Component, label: 'Variant', value: 'Primary' },
            { icon: Ruler, label: 'Size', value: 'Medium' },
        ],
    },
    {
        id: 'content',
        label: 'Content',
        icon: Type,
        panel: [
            { icon: Type, label: 'Label', value: 'Custom' },
            { icon: AlignCenter, label: 'Alignment', value: 'Center' },
        ],
    },
    {
        id: 'customize',
        label: 'Customize',
        icon: Target,
        panel: [
            { icon: Droplet, label: 'Accent color', swatches: true },
            { icon: Spline, label: 'Corner radius', value: 'Default' },
        ],
    },
];

function Swatches() {
    return (
        <div className="flex items-center gap-1.5">
            {/* Two-tone circle: the "current selection" indicator */}
            <span
                className="h-4 w-4 rounded-full"
                style={{
                    background: 'conic-gradient(from 180deg, #dbe3ee 0deg 180deg, #ffffff 180deg 360deg)',
                    border: '1.5px solid #60a5fa',
                }}
            />
            {/* Petal/teardrop swatches */}
            <span className="h-3.5 w-3.5 rotate-45" style={{ borderRadius: '0 50% 50% 50%', backgroundColor: '#2F8FE0' }} />
            <span className="h-3.5 w-3.5 rotate-45" style={{ borderRadius: '0 50% 50% 50%', backgroundColor: '#2FBF8F' }} />
        </div>
    );
}

function ToolbarButton({ item, isOpen, onEnter, onLeave }) {
    const Icon = item.icon;
    return (
        <div
            className="relative"
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 6 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.92, y: 6, transition: { duration: 0.12 } }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        style={{ originY: 1 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 z-20"
                    >
                        <div className="rounded-2xl bg-white shadow-[0_16px_36px_-10px_rgba(0,0,0,0.3)] px-4 py-3">
                            {item.panel.map((row) => {
                                const RowIcon = row.icon;
                                return (
                                    <div key={row.label} className="flex items-center justify-between py-1.5">
                                        <span className="flex items-center gap-2 text-[13px] font-medium text-neutral-800">
                                            <RowIcon size={15} strokeWidth={2} className="text-neutral-500" />
                                            {row.label}
                                        </span>
                                        {row.swatches ? (
                                            <Swatches />
                                        ) : (
                                            <span className="text-[13px] font-medium text-neutral-900">{row.value}</span>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        {/* Speech-bubble pointer: a rotated square tucked under
                            the card, pointing down at this specific button. */}
                        <div className="absolute left-1/2 top-full -translate-x-1/2 -mt-1.5 h-3 w-3 rotate-45 bg-white shadow-[2px_2px_3px_-1px_rgba(0,0,0,0.08)]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                type="button"
                className="relative z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-[13px] font-medium text-neutral-800 hover:bg-black/5 transition-colors"
            >
                <Icon size={16} strokeWidth={2} />
                {item.label}
            </button>
        </div>
    );
}

export default function InspectorToolbarShowcase() {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div className="flex items-center gap-1 rounded-full bg-white px-1.5 py-1.5 shadow-[0_12px_28px_-10px_rgba(0,0,0,0.35)]">
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
