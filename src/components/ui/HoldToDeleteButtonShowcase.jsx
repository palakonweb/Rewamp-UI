import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Trash2 } from 'lucide-react';

const promptContent = `Hold-to-delete pill button, ~280x64px, cotton base with an outline trash icon and "Hold to Delete" label. Holding for one second fills the pill with cherry red left to right, with a highlight on its leading edge; at 100% it turns completely solid red, the icon morphs into a white check, and the label becomes "Deleted" with a confirmation pulse. Releasing early reverses the fill smoothly back to 0% instead of snapping.`;

const HOLD_MS = 1000;

export default function HoldToDeleteButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);
    const [deleted, setDeleted] = useState(false);
    const rafRef = useRef(null);
    const startRef = useRef(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const stop = () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
    };

    const startHold = () => {
        if (deleted) return;
        stop();
        startRef.current = performance.now() - progress * HOLD_MS;
        const tick = (now) => {
            const elapsed = now - startRef.current;
            const t = Math.min(1, elapsed / HOLD_MS);
            setProgress(t);
            if (t >= 1) {
                setDeleted(true);
                stop();
                setTimeout(() => {
                    setDeleted(false);
                    setProgress(0);
                }, 1800);
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    const cancelHold = () => {
        if (deleted) return;
        stop();
        const startVal = progress;
        const start = performance.now();
        const duration = 350 * startVal;
        const tick = (now) => {
            const t = duration > 0 ? Math.min(1, (now - start) / duration) : 1;
            setProgress(startVal * (1 - t));
            if (t < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <motion.button
                    onPointerDown={startHold}
                    onPointerUp={cancelHold}
                    onPointerLeave={cancelHold}
                    whileTap={{ scale: 0.985 }}
                    className="relative select-none overflow-hidden"
                    style={{
                        width: 280,
                        height: 64,
                        borderRadius: 999,
                        background: 'var(--color-cotton)',
                        boxShadow: '0 6px 18px -10px rgba(27,23,23,0.25), inset 0 1px 0 rgba(255,255,255,0.6)',
                    }}
                >
                    <motion.div
                        className="absolute inset-y-0 left-0"
                        style={{ background: `rgba(129,1,0,${0.22 + progress * 0.78})`, borderRadius: 999 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0 }}
                    />
                    {progress > 0.02 && progress < 1 && (
                        <motion.div
                            className="absolute inset-y-0 w-3 pointer-events-none"
                            style={{
                                left: `calc(${progress * 100}% - 6px)`,
                                background: 'linear-gradient(90deg, transparent, rgba(129,1,0,0.4))',
                            }}
                        />
                    )}

                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-2.5">
                        <AnimatePresence mode="wait" initial={false}>
                            {!deleted ? (
                                <motion.span key="trash" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.22 }}>
                                    <Trash2 size={18} className={progress > 0.5 ? 'text-white' : 'text-cherry'} strokeWidth={1.75} />
                                </motion.span>
                            ) : (
                                <motion.span key="check" initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: [0.4, 1.3, 1], opacity: 1 }} transition={{ duration: 0.3 }}>
                                    <Check size={18} className="text-white" strokeWidth={2} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={deleted ? 'deleted' : 'hold'}
                                initial={{ opacity: 0, x: 6 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -6 }}
                                transition={{ duration: 0.25 }}
                                className={`text-[14.5px] font-semibold ${deleted || progress > 0.5 ? 'text-white' : 'text-noir'}`}
                            >
                                {deleted ? 'Deleted' : 'Hold to Delete'}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    <AnimatePresence>
                        {deleted && (
                            <motion.div
                                className="absolute inset-0 rounded-full pointer-events-none"
                                style={{ boxShadow: '0 0 0 0 rgba(129,1,0,0.35)' }}
                                initial={{ boxShadow: '0 0 0 0 rgba(129,1,0,0.35)' }}
                                animate={{ boxShadow: '0 0 0 14px rgba(129,1,0,0)' }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Press and Hold</span>
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
