import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `minimalist white navbar where each link is preceded by a tiny pixel-grid icon (info circle, magnifier, briefcase — replicating real Hugeicons glyphs as a 5x5 dot matrix), dots are light gray at idle and snap to dark charcoal with a slight scale pop on hover/active, staggered spring per dot`;

// 7x7 dot-matrix glyphs, hand-mapped to resemble real Hugeicons line icons
const ICONS = {
    About: [
        // info circle with dot + stem
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 0], [1, 6],
        [2, 0], [2, 3], [2, 6],
        [3, 0], [3, 6],
        [4, 0], [4, 3], [4, 6],
        [5, 0], [5, 3], [5, 6],
        [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
    ],
    Research: [
        // magnifier: ring + angled handle
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 0], [1, 4],
        [2, 0], [2, 4],
        [3, 0], [3, 4],
        [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
        [5, 4], [5, 5],
        [6, 5], [6, 6],
    ],
    Careers: [
        // briefcase: handle + latch + body
        [0, 2], [0, 3], [0, 4],
        [1, 2], [1, 4],
        [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
        [3, 0], [3, 6],
        [4, 0], [4, 3], [4, 6],
        [5, 0], [5, 6],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
    ],
};

const GRID = 7;
const CELL = 2.5;
const SIZE = GRID * CELL;

function PixelIcon({ dots, active }) {
    return (
        <span className="relative inline-block shrink-0" style={{ width: SIZE, height: SIZE }}>
            {dots.map(([row, col], i) => {
                const seed = ((i * 29) % 5) - 2;
                return (
                    <motion.span
                        key={i}
                        className="absolute rounded-[0.5px]"
                        style={{
                            width: 1.5,
                            height: 1.5,
                            left: col * CELL,
                            top: row * CELL,
                        }}
                        animate={
                            active
                                ? {
                                    x: 0,
                                    y: 0,
                                    scale: 1.15,
                                    backgroundColor: '#27272a',
                                }
                                : {
                                    x: seed * 0.25,
                                    y: -seed * 0.25,
                                    scale: 1,
                                    backgroundColor: '#a1a1aa',
                                }
                        }
                        transition={{ type: 'spring', stiffness: 500, damping: 22, mass: 0.5, delay: i * 0.01 }}
                    />
                );
            })}
        </span>
    );
}

export default function PixelDotNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(null);
    const [hovered, setHovered] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = Object.keys(ICONS);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 bg-white shadow-xl flex items-center justify-center p-8">

                {/* THE NAVBAR */}
                <nav className="relative flex items-center gap-8" onMouseLeave={() => setHovered(null)}>
                    {links.map((link) => {
                        const isOn = active === link || hovered === link;
                        return (
                            <button
                                key={link}
                                onClick={() => setActive((prev) => (prev === link ? null : link))}
                                onMouseEnter={() => setHovered(link)}
                                className="group flex items-center gap-2.5 py-3 cursor-pointer select-none"
                            >
                                <PixelIcon dots={ICONS[link]} active={isOn} />
                                <span
                                    className={`text-[15px] font-medium tracking-tight transition-colors duration-200 ${
                                        isOn ? 'text-zinc-900' : 'text-zinc-400'
                                    }`}
                                >
                                    {link}
                                </span>
                            </button>
                        );
                    })}
                </nav>

                <span className="absolute bottom-6 text-black/30 text-[13px] font-semibold tracking-widest uppercase">Pixel Dot</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
