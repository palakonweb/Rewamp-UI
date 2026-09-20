import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

const promptContent = `Circular light/dark toggle styled as a landscape orb: a ~90px circle with a white ring border, a flat sky fill on top and a two-layer wavy dune/cloud silhouette across the lower 40%. Dark mode shows an indigo sky with a white crescent moon; light mode shows a warm gold sky with a glowing white sun. Clicking cross-fades every color (sky, dune layers, ambient glow, page background) over ~400ms ease-in-out, and the moon/sun swaps with a scale+fade transition.`;

const THEMES = {
    dark: {
        sky: '#1A0B2E',
        skyBottom: '#2B1347',
        wave: '#4C1D95',
        fg: '#7C3AED',
        glow: 'rgba(139, 92, 246, 0.5)',
        wavePulse: 'rgba(167, 139, 250, 0.6)',
        label: 'Night',
    },
    light: {
        sky: '#38BDF8',
        skyBottom: '#7DD3FC',
        wave: '#93C5FD',
        fg: '#E0F2FE',
        glow: 'rgba(56, 189, 248, 0.5)',
        wavePulse: 'rgba(56, 189, 248, 0.6)',
        label: 'Day',
    },
};

function Crescent() {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
                d="M12 2.5A7 7 0 1 0 12 15.5 8.5 8.5 0 0 1 12 2.5Z"
                fill="#FFFFFF"
            />
        </svg>
    );
}

function Sun() {
    return (
        <div className="relative w-[16px] h-[16px]">
            <div
                className="absolute inset-0 rounded-full bg-white shadow-xs"
            />
        </div>
    );
}

function LandscapeOrb({ theme, onToggle }) {
    const t = THEMES[theme];
    const isDark = theme === 'dark';

    return (
        <div className="relative flex items-center justify-center">
            {/* ── Outer Interactive Orb ── */}
            <motion.button
                onClick={onToggle}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className="relative w-[92px] h-[92px] rounded-full border-[3px] border-white/90 overflow-hidden cursor-pointer select-none z-10"
                style={{
                    boxShadow: '0 8px 24px -4px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.6), inset 0 -4px 8px rgba(0,0,0,0.2)',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
            >
                {/* 1. Base Sky Background: Bluish Day */}
                <div 
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(180deg, ${THEMES.light.sky} 0%, ${THEMES.light.skyBottom} 100%)`
                    }}
                />

                {/* 2. Night Sky Layer (Smooth Crossfade) */}
                <motion.div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(180deg, ${THEMES.dark.sky} 0%, ${THEMES.dark.skyBottom} 100%)`
                    }}
                    animate={{
                        opacity: isDark ? 1 : 0,
                    }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                />

                {/* 3. Celestial Icon (Moon or Sun - Smooth orbit & crossfade) */}
                <div className="absolute top-[15px] right-[15px] w-5 h-5 z-20 flex items-center justify-center pointer-events-none">
                    {/* Moon */}
                    <motion.div
                        animate={{
                            opacity: isDark ? 1 : 0,
                            scale: isDark ? 1 : 0.3,
                            rotate: isDark ? 0 : -45,
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Crescent />
                    </motion.div>

                    {/* Sun */}
                    <motion.div
                        animate={{
                            opacity: !isDark ? 1 : 0,
                            scale: !isDark ? 1 : 0.3,
                            rotate: !isDark ? 0 : 45,
                        }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <Sun />
                    </motion.div>
                </div>

                {/* 4. Mid-layer Liquid Wave */}
                <motion.svg
                    className="absolute bottom-0 left-0 w-full pointer-events-none z-10"
                    viewBox="0 0 90 40"
                    preserveAspectRatio="none"
                    style={{ height: '48%' }}
                >
                    <motion.path
                        animate={{
                            fill: t.wave,
                            d: isDark
                                ? "M0,16 C 20,6 40,24 60,10 C 75,0 85,18 90,12 L90,40 L0,40 Z"
                                : "M0,18 C 15,4 30,4 45,16 C 60,28 75,28 90,14 L90,40 L0,40 Z",
                        }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                    />
                </motion.svg>

                {/* 5. Foreground Liquid Wave */}
                <motion.svg
                    className="absolute bottom-0 left-0 w-full pointer-events-none z-20"
                    viewBox="0 0 90 30"
                    preserveAspectRatio="none"
                    style={{ height: '34%' }}
                >
                    <motion.path
                        animate={{
                            fill: t.fg,
                            d: isDark
                                ? "M0,14 C 24,24 45,4 65,18 C 78,26 85,12 90,16 L90,30 L0,30 Z"
                                : "M0,16 C 18,26 32,6 50,14 C 66,21 78,10 90,18 L90,30 L0,30 Z",
                        }}
                        transition={{ duration: 0.45, ease: 'easeInOut' }}
                    />
                </motion.svg>

                {/* 6. Glass Sphere Convex Highlight Overlay */}
                <div
                    className="absolute inset-0 rounded-full pointer-events-none z-30"
                    style={{
                        background: 'radial-gradient(circle at 35% 25%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.08) 40%, transparent 70%)',
                    }}
                />
            </motion.button>
        </div>
    );
}

export default function LandscapeOrbToggleShowcase() {
    const [theme, setTheme] = useState(getSiteTheme);
    const t = THEMES[theme] || THEMES.dark;

    useEffect(() => {
        const handleThemeChange = (e) => {
            setTheme(e.detail?.theme || getSiteTheme());
        };
        window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
        const observer = new MutationObserver(() => {
            setTheme(getSiteTheme());
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
            window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
            observer.disconnect();
        };
    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
            <motion.div
                className="relative flex flex-col items-center justify-center gap-5"
            >
                <LandscapeOrb
                    theme={theme}
                    onToggle={() => {
                        const next = theme === 'dark' ? 'light' : 'dark';
                        setTheme(next);
                        setSiteTheme(next);
                    }}
                />
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase select-none text-[var(--text-subtle)] transition-colors duration-300">
                    {t.label} Mode
                </span>
            </motion.div>

            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click orb to toggle day / night mode
            </p>
        </div>
    );
}
