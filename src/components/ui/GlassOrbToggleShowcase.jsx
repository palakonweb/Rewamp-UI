import React, { useState, useEffect } from 'react';
import GlassOrbToggle from './GlassOrbToggle';
import { glassOrbTogglePrompt } from './glassOrbToggleSource';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

export default function GlassOrbToggleShowcase() {
    const [mode, setMode] = useState(() => (getSiteTheme() === 'dark' ? 'Dark' : 'Light'));

    useEffect(() => {
        const handleThemeChange = (e) => {
            const currentTheme = e.detail?.theme || getSiteTheme();
            setMode(currentTheme === 'dark' ? 'Dark' : 'Light');
        };
        window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
        const observer = new MutationObserver(() => {
            setMode(getSiteTheme() === 'dark' ? 'Dark' : 'Light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
            window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
            observer.disconnect();
        };
    }, []);

    const isLight = mode === 'Light';

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="relative w-full h-full flex flex-col items-center justify-center p-8 sm:p-24 transition-colors duration-700"
            >
                {/* Status indicator badge with high-contrast light/dark support */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-200 text-[12px] font-semibold font-sans shadow-xs">
                    <span className={`w-2 h-2 rounded-full ${isLight ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' : 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.6)]'} animate-pulse`} />
                    <span>Mode: {mode}</span>
                </div>

                {/* The 3D Glass Orb Toggle */}
                <div className="relative z-10 my-auto py-6">
                    <GlassOrbToggle
                        isLight={isLight}
                        onChange={(nextIsLight) => {
                            setMode(nextIsLight ? 'Light' : 'Dark');
                            setSiteTheme(nextIsLight ? 'light' : 'dark');
                        }}
                    />
                </div>

                {/* Subtext instruction */}
                <p className="mt-8 text-center text-xs font-mono text-neutral-500 dark:text-neutral-400 select-none">
                    Click track or glass sphere to toggle theme
                </p>
            </div>
        </div>
    );
}
