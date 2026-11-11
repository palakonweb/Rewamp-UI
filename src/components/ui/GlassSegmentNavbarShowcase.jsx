import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Colors observed directly from the reference screenshot: a soft
// orchid/lavender glow behind "Dates", a warm coral-red glow behind
// "Months", and a sage-green glow behind "Flexible".
const segments = [
    { id: 'dates', label: 'Dates', glow: 'rgba(214, 150, 214, 0.6)' },
    { id: 'months', label: 'Months', glow: 'rgba(230, 110, 85, 0.55)' },
    { id: 'flexible', label: 'Flexible', glow: 'rgba(130, 195, 140, 0.5)' },
    { id: 'anytime', label: 'Anytime', glow: 'rgba(110, 160, 230, 0.55)' },
];

// Same spring used across the kit's sliding active-pills (Account Menu,
// Glass Action Dock, Skeleton Nav Reveal), kept identical so this segmented
// control's glide feels consistent with the rest.
const PILL_SPRING = { type: 'spring', stiffness: 420, damping: 38, mass: 0.7 };

export default function GlassSegmentNavbarShowcase() {
    const [active, setActive] = useState('dates');

    // Follows the real dashboard's theme mechanism (data-theme attribute on
    // <html>), same as AccountMenuShowcase, so the shelf/glass colors below
    // actually swap with the site instead of staying hardcoded light-mode
    // grays.
    const [isDark, setIsDark] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            {/* No track background - the segments sit directly on the page. */}
            <div className="relative flex items-center justify-center gap-1.5 sm:gap-2">
                {segments.map((segment) => {
                    const isActive = segment.id === active;

                    return (
                        <button
                            key={segment.id}
                            type="button"
                            onClick={() => setActive(segment.id)}
                            className="relative cursor-pointer px-3 py-2"
                        >
                            {isActive && (
                                <>
                                    {/* Color glow: observed to sit concentrated just
                                        above the capsule's top rim, bleeding into the
                                        page area rather than forming a full halo
                                        around the whole shape. */}
                                    <motion.span
                                        layoutId="glass-segment-glow"
                                        transition={PILL_SPRING}
                                        className="absolute -top-3 inset-x-1 h-5 rounded-full blur-lg -z-10"
                                        style={{ backgroundColor: segment.glow }}
                                    />
                                    {/* Outer bezel ring: a thin bright rim sitting
                                        just behind the capsule body. */}
                                    <motion.span
                                        layoutId="glass-segment-bezel"
                                        transition={PILL_SPRING}
                                        className="absolute inset-0 rounded-full"
                                        style={{
                                            background: isDark
                                                ? 'linear-gradient(160deg, rgba(255,255,255,0.18), rgba(255,255,255,0.04))'
                                                : 'linear-gradient(160deg, var(--neutral-100), var(--neutral-200))',
                                            boxShadow: isDark
                                                ? '0 8px 14px -8px rgba(0,0,0,0.6)'
                                                : '0 8px 14px -8px rgba(0,0,0,0.28)',
                                        }}
                                    />
                                    {/* Inner glass capsule body: glossy gradient,
                                        inset highlight top, inset shade bottom - the
                                        "glass pebble" look from the reference, with
                                        only a hairline rim left showing around it. */}
                                    <motion.span
                                        layoutId="glass-segment-pill"
                                        transition={PILL_SPRING}
                                        className="absolute inset-[1px] rounded-full"
                                        style={{
                                            background: isDark
                                                ? 'linear-gradient(160deg, rgba(255,255,255,0.16), rgba(255,255,255,0.045))'
                                                : 'linear-gradient(160deg, var(--neutral-200), var(--neutral-300))',
                                            boxShadow: isDark
                                                ? 'inset 0 1px 2px rgba(255,255,255,0.18), inset 0 -4px 6px -1px rgba(0,0,0,0.4)'
                                                : 'inset 0 1px 2px rgba(255,255,255,0.95), inset 0 -4px 6px -1px rgba(0,0,0,0.1)',
                                        }}
                                    />
                                </>
                            )}
                            <span
                                className="relative text-[13px] sm:text-[14px] font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {segment.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
