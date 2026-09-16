import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Day/Night sky toggle: a wide glass pill containing a miniature illustrated sky. Night shows a starfield, crescent moon, drifting clouds and a glowing orb on the right. Toggling smoothly morphs the whole scene to day — navy fades to sky blue, the orb glides right-to-left, the moon rotates into a sun, stars fade out as tiny birds fade in. One continuous 900-1200ms transition, spring easing, no hard cuts.`;

const STARS = [
    { x: 18, y: 18 }, { x: 34, y: 12 }, { x: 52, y: 22 }, { x: 70, y: 14 },
    { x: 26, y: 34 }, { x: 60, y: 30 }, { x: 44, y: 44 },
];

export default function DayNightSkyToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isDay, setIsDay] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050b1a] shadow-xl flex flex-col items-center justify-center gap-6 p-8">
                <span className="text-[12px] font-semibold tracking-[0.25em] text-white/70 uppercase select-none">
                    {isDay ? 'Day Mode' : 'Night Mode'}
                </span>

                <motion.button
                    onClick={() => setIsDay((v) => !v)}
                    className="relative w-[280px] h-[92px] rounded-full overflow-hidden border border-white/25 select-none"
                    animate={{
                        background: isDay
                            ? 'linear-gradient(180deg, #6fa3d8, #a9c9e8)'
                            : 'linear-gradient(180deg, #0a1330, #131c42)',
                    }}
                    transition={{ duration: 1, ease: 'easeInOut' }}
                    style={{ boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.15), inset 0 -6px 16px rgba(0,0,0,0.35), 0 10px 30px -10px rgba(0,0,0,0.6)' }}
                >
                    {/* stars */}
                    <AnimatePresence>
                        {!isDay && STARS.map((s, i) => (
                            <motion.span
                                key={i}
                                className="absolute w-[3px] h-[3px] rounded-full bg-white"
                                style={{ left: `${s.x}%`, top: `${s.y}%` }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0.2, 1, 0.2] }}
                                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                                transition={{ duration: 1.6 + i * 0.2, repeat: Infinity }}
                            />
                        ))}
                    </AnimatePresence>

                    {/* birds */}
                    <AnimatePresence>
                        {isDay && [0, 1].map((i) => (
                            <motion.span
                                key={i}
                                className="absolute text-white/70 text-[10px]"
                                style={{ left: `${45 + i * 12}%`, top: `${20 + i * 8}%` }}
                                initial={{ opacity: 0, x: -6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.5 + i * 0.15, duration: 0.4 }}
                            >
                                ⌃⌃
                            </motion.span>
                        ))}
                    </AnimatePresence>

                    {/* moon / sun icon, left side */}
                    <motion.div
                        className="absolute left-[26px] top-1/2 -translate-y-1/2 w-6 h-6 rounded-full"
                        animate={{
                            rotate: isDay ? 180 : 0,
                            background: isDay ? '#ffd35c' : '#f4f1e6',
                            boxShadow: isDay ? '0 0 14px 4px rgba(255,211,92,0.55)' : '0 0 10px 2px rgba(244,241,230,0.35)',
                        }}
                        transition={{ duration: 0.9, ease: 'easeInOut' }}
                        style={!isDay ? { clipPath: 'inset(0 0 0 40%)', WebkitClipPath: 'inset(0 0 0 40%)' } : {}}
                    />

                    {/* clouds */}
                    <div className="absolute inset-x-0 bottom-3 h-6 flex items-end justify-center gap-2 px-8">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="rounded-full"
                                animate={{
                                    x: [0, 10, 0],
                                    background: isDay ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.55)',
                                    width: 30 + i * 10,
                                    height: 12 + i * 2,
                                }}
                                transition={{ x: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut' }, background: { duration: 0.9 } }}
                            />
                        ))}
                    </div>

                    {/* big orb thumb */}
                    <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-[62px] h-[62px] rounded-full"
                        animate={{
                            left: isDay ? 14 : 204,
                            background: 'radial-gradient(circle at 35% 30%, #ffffff, #eef3fb 60%, #d8e4f4)',
                            boxShadow: isDay
                                ? '0 0 24px 8px rgba(255,255,255,0.55)'
                                : '0 0 30px 10px rgba(180,205,255,0.5)',
                        }}
                        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
                    />

                    {/* small sun, right side, day only */}
                    <AnimatePresence>
                        {isDay && (
                            <motion.div
                                className="absolute right-[26px] top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#ffd35c]"
                                style={{ boxShadow: '0 0 12px 3px rgba(255,211,92,0.6)' }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
</div>
    );
}
