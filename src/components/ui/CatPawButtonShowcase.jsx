import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Playful micro-interaction for a pill-shaped CTA button: a cute cat paw pops up from behind the bottom edge on hover, briefly holds the edge with a tiny wiggle, then ducks back when the cursor leaves. Spring easing, slight overshoot, cotton/off-white paw with noir toe-pad details.`;

function Paw() {
    return (
        <div className="relative w-[54px] h-[54px]">
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[34px] h-[40px] rounded-t-[16px] rounded-b-[10px] bg-[#EDEBDD] shadow-[0_-2px_8px_rgba(0,0,0,0.15)]" />
            {[[-15, 6], [0, -2], [15, 6]].map(([x, y], i) => (
                <div
                    key={i}
                    className="absolute bottom-[30px] left-1/2 w-[14px] h-[16px] rounded-full bg-[#EDEBDD] shadow-[0_-1px_4px_rgba(0,0,0,0.1)]"
                    style={{ transform: `translate(calc(-50% + ${x}px), ${y}px)` }}
                />
            ))}
            {[[-15, 6], [0, -2], [15, 6]].map(([x, y], i) => (
                <div
                    key={`pad-${i}`}
                    className="absolute bottom-[34px] left-1/2 w-[5px] h-[5px] rounded-full bg-[#1B1717]/25"
                    style={{ transform: `translate(calc(-50% + ${x}px), ${y}px)` }}
                />
            ))}
        </div>
    );
}

export default function CatPawButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#1B1717] shadow-xl flex items-center justify-center p-8">
                <div
                    className="relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <AnimatePresence>
                        {hovered && (
                            <motion.div
                                className="absolute left-1/2 -translate-x-1/2 z-0"
                                style={{ bottom: -6 }}
                                initial={{ y: 40, opacity: 0, rotate: 0 }}
                                animate={{ y: 6, opacity: 1, rotate: [0, -4, 3, 0] }}
                                exit={{ y: 40, opacity: 0, transition: { duration: 0.18, ease: 'easeIn' } }}
                                transition={{
                                    y: { type: 'spring', stiffness: 420, damping: 14 },
                                    opacity: { duration: 0.15 },
                                    rotate: { duration: 0.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
                                }}
                            >
                                <Paw />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.button
                        whileTap={{ scale: 0.96 }}
                        className="relative z-10 px-9 py-4 rounded-full bg-cherry text-white text-[16px] font-semibold shadow-[0_10px_30px_-8px_rgba(129,1,0,0.6)] select-none"
                    >
                        Get Started
                    </motion.button>
                </div>

                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Peekaboo Paw</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <motion.button onClick={handleCopy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </motion.button>
            </div>
        </div>
    );
}
