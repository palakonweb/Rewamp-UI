import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

const promptContent = `Day/Night sky toggle: a wide glass pill containing a miniature illustrated sky. Night shows a starfield, crescent moon, drifting clouds and a glowing orb on the right. Toggling smoothly morphs the whole scene to day - navy fades to sky blue, the orb glides right-to-left, the moon rotates into a sun, stars fade out as tiny birds fade in. One continuous 900-1200ms transition, spring easing, no hard cuts.`;

const STARS = [
    { x: 18, y: 18, delay: 0 },
    { x: 34, y: 14, delay: 0.3 },
    { x: 52, y: 22, delay: 0.6 },
    { x: 70, y: 16, delay: 0.2 },
    { x: 26, y: 34, delay: 0.5 },
    { x: 60, y: 30, delay: 0.4 },
    { x: 44, y: 44, delay: 0.7 },
];

export default function DayNightSkyToggleShowcase() {
    const [isDay, setIsDay] = useState(() => getSiteTheme() !== 'dark');

    useEffect(() => {
        const handleThemeChange = (e) => {
            const currentTheme = e.detail?.theme || getSiteTheme();
            setIsDay(currentTheme !== 'dark');
        };
        window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
        const observer = new MutationObserver(() => {
            setIsDay(getSiteTheme() !== 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
            window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
            observer.disconnect();
        };
    }, []);

    const handleToggle = () => {
        const next = !isDay;
        setIsDay(next);
        setSiteTheme(next ? 'light' : 'dark');
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-12">
            <div className="relative w-full h-full flex flex-col items-center justify-center gap-6 p-8">
                <span className="text-[12px] font-semibold tracking-[0.25em] text-[var(--text-subtle)] uppercase select-none transition-colors duration-300">
                    {isDay ? 'Day Mode' : 'Night Mode'}
                </span>

                <motion.button
                    onClick={handleToggle}
                    className="relative w-[280px] h-[92px] rounded-full overflow-hidden border border-white/25 select-none cursor-pointer shadow-[inset_0_2px_6px_rgba(255,255,255,0.15),_inset_0_-6px_16px_rgba(0,0,0,0.35),_0_10px_30px_-10px_rgba(0,0,0,0.6)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    {/* Sky Background: Night Layer */}
                    <div 
                        className="absolute inset-0 bg-gradient-to-b from-[#0a1330] to-[#131c42]"
                    />

                    {/* Sky Background: Day Layer (Crossfades smoothly over night layer) */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-[#6fa3d8] to-[#a9c9e8]"
                        animate={{ opacity: isDay ? 1 : 0 }}
                        transition={{ duration: 0.7, ease: 'easeInOut' }}
                    />

                    {/* Starfield Layer */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: isDay ? 0 : 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        {STARS.map((s, i) => (
                            <motion.span
                                key={i}
                                className="absolute w-[3px] h-[3px] rounded-full bg-white shadow-[0_0_4px_white]"
                                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
                            />
                        ))}
                    </motion.div>

                    {/* Birds Layer (Day only) */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        animate={{ opacity: isDay ? 1 : 0, y: isDay ? 0 : 6 }}
                        transition={{ duration: 0.5, delay: isDay ? 0.2 : 0 }}
                    >
                        {[0, 1].map((i) => (
                            <span
                                key={i}
                                className="absolute text-white/80 text-[11px] font-bold"
                                style={{ left: `${46 + i * 14}%`, top: `${22 + i * 8}%` }}
                            >
                                ⌃⌃
                            </span>
                        ))}
                    </motion.div>

                    {/* Left Icon: Golden Sun (Day Mode on Left - matching default website ThemeToggle) */}
                    <motion.div
                        className="absolute left-[24px] top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center pointer-events-none"
                        animate={{
                            rotate: isDay ? 0 : 180,
                            scale: isDay ? 1 : 0.6,
                            opacity: isDay ? 1 : 0.25,
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <div className="w-5 h-5 rounded-full bg-[#ffd35c] shadow-[0_0_14px_4px_rgba(255,211,92,0.7)]" />
                    </motion.div>

                    {/* Right Icon: Crescent Moon (Night Mode on Right - matching default website ThemeToggle) */}
                    <motion.div
                        className="absolute right-[24px] top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center pointer-events-none"
                        animate={{
                            rotate: isDay ? -180 : 0,
                            scale: isDay ? 0.6 : 1,
                            opacity: isDay ? 0.25 : 0.95,
                        }}
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-[#f4f1e6] drop-shadow-[0_0_8px_rgba(244,241,230,0.6)]">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="currentColor" />
                        </svg>
                    </motion.div>

                    {/* Drifting Clouds */}
                    <div className="absolute inset-x-0 bottom-3 h-6 flex items-end justify-center gap-2 px-8 pointer-events-none">
                        {[
                            { w: 36, h: 14, xRange: [0, 8, 0], dur: 6 },
                            { w: 48, h: 16, xRange: [0, -10, 0], dur: 7 },
                            { w: 32, h: 12, xRange: [0, 6, 0], dur: 5 },
                        ].map((c, i) => (
                            <motion.div
                                key={i}
                                className="rounded-full"
                                style={{ width: c.w, height: c.h }}
                                animate={{
                                    x: c.xRange,
                                    backgroundColor: isDay ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.45)',
                                }}
                                transition={{
                                    x: { duration: c.dur, repeat: Infinity, ease: 'easeInOut' },
                                    backgroundColor: { duration: 0.7, ease: 'easeInOut' },
                                }}
                            />
                        ))}
                    </div>

                    {/* Big Glowing Orb Thumb (Slides Left for Day, Right for Night) */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-[62px] h-[62px] rounded-full pointer-events-none"
                        animate={{
                            x: isDay ? 14 : 204,
                            boxShadow: isDay
                                ? '0 0 24px 8px rgba(255,255,255,0.65), inset 0 2px 4px rgba(255,255,255,0.8)'
                                : '0 0 28px 10px rgba(180,205,255,0.5), inset 0 2px 4px rgba(255,255,255,0.6)',
                        }}
                        transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.8 }}
                        style={{
                            left: 0,
                            background: 'radial-gradient(circle at 35% 30%, #ffffff, #eef3fb 60%, #d8e4f4)',
                        }}
                    />
                </motion.button>
            </div>

            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click toggle to switch day and night
            </p>
        </div>
    );
}
