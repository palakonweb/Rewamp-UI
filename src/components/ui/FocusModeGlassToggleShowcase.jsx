import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronUp, ChevronDown, Moon } from 'lucide-react';

const promptContent = `Focus Mode glass toggle: a wide frosted-glass pill with a circular moon control on the left and "Focus" label, plus tiny up/down chevrons on the right. On click the moon control expands and rotates 15-20deg, a soft luminous ripple spreads through the glass, the label brightens, and the chevrons bounce. Reverses smoothly on a second click. Subtle blue-violet atmosphere, restrained bloom.`;

export default function FocusModeGlassToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#161327] shadow-xl flex items-center justify-center p-8">
                <motion.button
                    onClick={() => setActive((v) => !v)}
                    whileHover={{ y: -2 }}
                    className="relative w-[240px] h-[64px] rounded-full flex items-center justify-between pl-2 pr-5 select-none overflow-hidden"
                    animate={{
                        background: active ? 'rgba(140,120,255,0.16)' : 'rgba(255,255,255,0.06)',
                        borderColor: active ? 'rgba(180,160,255,0.5)' : 'rgba(255,255,255,0.18)',
                    }}
                    style={{ backdropFilter: 'blur(14px)', borderWidth: 1, borderStyle: 'solid' }}
                    transition={{ duration: 0.6 }}
                >
                    <AnimatePresence>
                        {active && (
                            <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(circle at 20% 50%, rgba(160,140,255,0.35), transparent 70%)' }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                            />
                        )}
                    </AnimatePresence>

                    <motion.div
                        className="relative z-10 flex items-center justify-center rounded-full"
                        animate={{
                            width: active ? 52 : 46,
                            height: active ? 52 : 46,
                            background: active ? 'rgba(180,160,255,0.9)' : 'rgba(255,255,255,0.85)',
                            boxShadow: active ? '0 0 20px 4px rgba(160,140,255,0.6)' : '0 0 0 rgba(0,0,0,0)',
                        }}
                        transition={{ type: 'spring', stiffness: 240, damping: 18 }}
                    >
                        <motion.div animate={{ rotate: active ? 18 : 0 }} transition={{ type: 'spring', stiffness: 220, damping: 16 }}>
                            <Moon size={20} className={active ? 'text-[#2a1b4a]' : 'text-[#443a5c]'} fill="currentColor" />
                        </motion.div>
                    </motion.div>

                    <motion.span
                        className="relative z-10 text-[15px] font-medium"
                        animate={{ color: active ? '#e7e0ff' : 'rgba(255,255,255,0.75)' }}
                        transition={{ duration: 0.4 }}
                    >
                        Focus
                    </motion.span>

                    <div className="relative z-10 flex flex-col gap-0.5">
                        <motion.span animate={{ y: active ? -2 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
                            <ChevronUp size={12} className="text-white/50" />
                        </motion.span>
                        <motion.span animate={{ y: active ? 2 : 0 }} transition={{ type: 'spring', stiffness: 300, damping: 12 }}>
                            <ChevronDown size={12} className="text-white/50" />
                        </motion.span>
                    </div>
                </motion.button>

                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Focus Glass</span>
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
