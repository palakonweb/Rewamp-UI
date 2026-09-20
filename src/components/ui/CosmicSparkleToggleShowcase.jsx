import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

const promptContent = `premium cosmic switch with starfield particles exploding on toggle activation`;

export default function CosmicSparkleToggleShowcase() {
    const [isOn, setIsOn] = useState(() => getSiteTheme() === 'dark');

    useEffect(() => {
        const handleThemeChange = (e) => {
            const currentTheme = e.detail?.theme || getSiteTheme();
            setIsOn(currentTheme === 'dark');
        };
        window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
        const observer = new MutationObserver(() => {
            setIsOn(getSiteTheme() === 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
            window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
            observer.disconnect();
        };
    }, []);

    const handleToggle = () => {
        const next = !isOn;
        setIsOn(next);
        setSiteTheme(next ? 'dark' : 'light');
    };

    // Pre-calculated deterministic trajectory seeds for smooth explosion without re-render jitter
    const particles = useMemo(() => {
        return Array.from({ length: 14 }).map((_, i) => {
            const angle = (i / 14) * Math.PI * 2 + (i % 2 === 0 ? 0.2 : -0.2);
            const dist = 40 + (i * 7) % 55;
            return {
                id: i,
                targetX: Math.cos(angle) * dist,
                targetY: Math.sin(angle) * dist,
                scale: 0.8 + (i % 3) * 0.3,
                duration: 0.55 + (i % 4) * 0.08,
            };
        });
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8 group overflow-hidden">
                
                {/* THE TOGGLE WRAPPER */}
                <div 
                    onClick={handleToggle}
                    className="relative w-[240px] h-[80px] rounded-full bg-[#11162b] shadow-[inset_0_4px_16px_rgba(0,0,0,0.8),_0_0_0_2px_rgba(255,255,255,0.05)] cursor-pointer flex items-center p-2 select-none"
                >
                    {/* Stars Explosion Layer */}
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                        <AnimatePresence>
                            {isOn && particles.map((p) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ x: 170, y: 40, opacity: 1, scale: 0 }}
                                    animate={{ 
                                        x: 170 + p.targetX, 
                                        y: 40 + p.targetY,
                                        opacity: 0,
                                        scale: p.scale,
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: p.duration, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_yellow]"
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="absolute right-8 text-white/20 font-bold tracking-widest pointer-events-none">OFF</div>
                    <motion.div 
                        animate={{ opacity: isOn ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="absolute left-8 text-[#fff] font-bold tracking-widest text-shadow-[0_0_10px_white] pointer-events-none"
                    >
                        ON
                    </motion.div>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? 160 : 0,
                            background: isOn ? 'radial-gradient(circle, #ffffff 0%, #d4e7ff 100%)' : 'radial-gradient(circle, #444444 0%, #222222 100%)',
                            boxShadow: isOn ? '0 0 20px rgba(200,230,255,0.6)' : '0 2px 8px rgba(0,0,0,0.5)',
                        }}
                        transition={{ type: "spring", stiffness: 280, damping: 24 }}
                        className="relative z-20 w-[64px] h-[64px] rounded-full flex items-center justify-center p-2"
                    >
                        <AnimatePresence>
                            {isOn && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{
                                        opacity: { duration: 0.2 },
                                        scale: { duration: 0.2 },
                                        rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                                    }}
                                >
                                    {/* SVG Star */}
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2b59ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                    </svg>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Cosmic Sparkle</span>
            </div>
        </div>
    );
}
