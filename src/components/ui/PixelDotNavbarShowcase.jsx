import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 7x7 dot-matrix glyphs for the 4 core navigation items
const ICONS = {
    Home: [
        [0, 3],
        [1, 2], [1, 3], [1, 4],
        [2, 1], [2, 5],
        [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], [3, 6],
        [4, 1], [4, 5],
        [5, 1], [5, 3], [5, 5],
        [6, 1], [6, 2], [6, 4], [6, 5],
    ],
    About: [
        [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
        [1, 0], [1, 6],
        [2, 0], [2, 3], [2, 6],
        [3, 0], [3, 6],
        [4, 0], [4, 3], [4, 6],
        [5, 0], [5, 3], [5, 6],
        [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
    ],
    Projects: [
        [0, 0], [0, 1], [0, 2],
        [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
        [2, 0], [2, 6],
        [3, 0], [3, 6],
        [4, 0], [4, 6],
        [5, 0], [5, 6],
        [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5], [6, 6],
    ],
    Contacts: [
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
                                    backgroundColor: '#9C8EB8',
                                }
                                : {
                                    x: seed * 0.25,
                                    y: -seed * 0.25,
                                    scale: 1,
                                    backgroundColor: '#A1A1AA',
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
    const [active, setActive] = useState('Home');
    const [hovered, setHovered] = useState(null);

    const links = Object.keys(ICONS);

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE NAVBAR */}
            <div className="relative flex items-center justify-center">
                <nav
                    className="relative flex items-center gap-6 sm:gap-8 px-6 sm:px-8 py-3 rounded-full bg-white dark:bg-[#181622] border border-black/[0.08] dark:border-white/12 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.1)] dark:shadow-[0_16px_36px_-8px_rgba(0,0,0,0.6)] transition-colors duration-200"
                    onMouseLeave={() => setHovered(null)}
                >
                    {links.map((link) => {
                        const isOn = active === link || hovered === link;
                        return (
                            <button
                                key={link}
                                onClick={() => setActive(link)}
                                onMouseEnter={() => setHovered(link)}
                                className="group flex items-center gap-2.5 py-1.5 cursor-pointer select-none"
                            >
                                <PixelIcon dots={ICONS[link]} active={isOn} />
                                <span
                                    className={`text-[14px] sm:text-[15px] font-medium tracking-tight transition-colors duration-200 ${
                                        isOn
                                            ? 'text-[#6D5A8E] dark:text-[#D4CBE5]'
                                            : 'text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white'
                                    }`}
                                >
                                    {link}
                                </span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover or click tabs to activate pixel icons
            </p>
        </div>
    );
}
