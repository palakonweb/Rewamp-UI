import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import { setSiteTheme } from '../../lib/siteTheme';

const promptContent = `Circular light/dark toggle styled as a landscape orb: a ~90px circle with a white ring border, a flat sky fill on top and a two-layer wavy dune/cloud silhouette across the lower 40%. Dark mode shows an indigo sky with a white crescent moon; light mode shows a warm gold sky with a glowing white sun. Clicking cross-fades every color (sky, dune layers, ambient glow, page background) over ~400ms ease-in-out, and the moon/sun swaps with a scale+fade transition.`;

const THEMES = {
    dark: {
        sky: '#6655E6',
        wave: '#DBD7F9',
        fg: '#F8F6FE',
        glow: 'rgba(102,85,230,0.4)',
        page: '#EFECFD',
        label: 'Night',
    },
    light: {
        sky: '#E3B642',
        wave: '#F3E2C8',
        fg: '#FCFBF4',
        glow: 'rgba(227,182,66,0.4)',
        page: '#F5F5F5',
        label: 'Day',
    },
};

function Crescent() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
                d="M10.5 2.2A6.3 6.3 0 1 0 10.5 13.8 7.6 7.6 0 0 1 10.5 2.2Z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

function Sun() {
    return (
        <div className="relative w-[14px] h-[14px]">
            <div className="absolute inset-0 rounded-full bg-white" style={{ boxShadow: '0 0 10px 4px rgba(255,255,255,0.85)' }} />
        </div>
    );
}

function LandscapeOrb({ theme, onToggle }) {
    const t = THEMES[theme];
    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={onToggle}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className="relative w-[90px] h-[90px] rounded-full border-[3px] border-white overflow-hidden cursor-pointer"
            animate={{ boxShadow: `0 0 40px 10px ${t.glow}` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
        >
            {/* sky */}
            <motion.div
                className="absolute inset-0"
                animate={{ backgroundColor: t.sky }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
            />

            {/* celestial icon */}
            <div className="absolute top-[16px] right-[16px]">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={theme}
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.4 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        {isDark ? <Crescent /> : <Sun />}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* wave layer (mid tone) */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 90 40"
                preserveAspectRatio="none"
                style={{ height: '46%' }}
            >
                <motion.path
                    d="M0,18 C 15,4 30,4 45,16 C 60,28 75,28 90,14 L90,40 L0,40 Z"
                    animate={{ fill: t.wave }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
            </motion.svg>

            {/* foreground layer (near-white) */}
            <motion.svg
                className="absolute bottom-0 left-0 w-full"
                viewBox="0 0 90 30"
                preserveAspectRatio="none"
                style={{ height: '32%' }}
            >
                <motion.path
                    d="M0,16 C 18,26 32,6 50,14 C 66,21 78,10 90,18 L90,30 L0,30 Z"
                    animate={{ fill: t.fg }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                />
            </motion.svg>
        </motion.button>
    );
}

export default function LandscapeOrbToggleShowcase() {
    const [theme, setTheme] = useState('dark');
    const [copied, setCopied] = useState(false);
    const t = THEMES[theme];

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
            <motion.div
                className="relative flex flex-col items-center justify-center gap-5"
            >
                <LandscapeOrb theme={theme} onToggle={() => setTheme((v) => {
                    const next = v === 'dark' ? 'light' : 'dark';
                    setSiteTheme(next);
                    return next;
                })} />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase select-none text-black/40">
                    {t.label} Mode
                </span>
            </motion.div>

            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click orb to toggle day and night
            </p>
        </div>
    );
}
