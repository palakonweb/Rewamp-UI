import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `minimalist white navbar where each link (About, Projects, Contact) is preceded by a tiny pixel-grid icon (info circle, folder, envelope — replicating real Hugeicons glyphs as a 7x7 dot matrix), dots are light gray at idle and snap to the brand lilac accent with a slight scale pop on hover/active, staggered spring per dot`;

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
    Projects: [
        // folder: top tab + body outline
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 0], [2, 6],
        [3, 0], [3, 6],
        [4, 0], [4, 6],
        [5, 0], [5, 6],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
    ],
    Contact: [
        // envelope: outline + center flap point
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
        [1, 0], [1, 1], [1, 5], [1, 6],
        [2, 0], [2, 2], [2, 4], [2, 6],
        [3, 0], [3, 3], [3, 6],
        [4, 0], [4, 6],
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
                                    backgroundColor: '#C1B4D8',
                                }
                                : {
                                    x: seed * 0.25,
                                    y: -seed * 0.25,
                                    scale: 1,
                                    backgroundColor: '#D4D4D4',
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

                {/* 🎯 THE NAVBAR */}
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
                                        isOn ? 'text-[#171717]' : 'text-zinc-400'
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
</div>
    );
}
