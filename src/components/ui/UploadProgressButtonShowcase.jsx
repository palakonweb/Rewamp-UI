import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, UploadCloud, Loader2 } from 'lucide-react';

const promptContent = `Premium upload button with three states — Upload, Uploading, Uploaded — that transform in place without changing the button's outer dimensions. The pill's own color shifts per state: bright blue when idle, light blue while a shimmering progress fill grows 0-100%, and green once complete. Icon morphs cloud → spinner → check, label crossfades, restrained spring transitions.`;

const STATE_BG = {
    idle: 'linear-gradient(180deg, #3f6bff, #2b52f5)',
    uploading: 'linear-gradient(180deg, #7fa8ff, #5b8bff)',
    done: 'linear-gradient(180deg, #34c778, #22a862)',
};
const STATE_SHADOW = {
    idle: '0 10px 24px -8px rgba(43,82,245,0.55)',
    uploading: '0 10px 24px -8px rgba(91,139,255,0.5)',
    done: '0 10px 24px -8px rgba(34,168,98,0.5)',
};

export default function UploadProgressButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [state, setState] = useState('idle'); // idle | uploading | done
    const [progress, setProgress] = useState(0);
    const timerRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const startUpload = () => {
        if (state !== 'idle') return;
        setState('uploading');
        setProgress(0);
        const start = Date.now();
        const duration = 2000;
        timerRef.current = setInterval(() => {
            const elapsed = Date.now() - start;
            const t = Math.min(1, elapsed / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(eased * 100);
            if (t >= 1) {
                clearInterval(timerRef.current);
                setState('done');
                setTimeout(() => {
                    setState('idle');
                    setProgress(0);
                }, 2200);
            }
        }, 16);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <motion.button
                    onClick={startUpload}
                    disabled={state !== 'idle'}
                    className="relative w-[190px] h-[52px] rounded-full overflow-hidden select-none disabled:cursor-default"
                    animate={{ background: STATE_BG[state], boxShadow: STATE_SHADOW[state] }}
                    transition={{ duration: 0.4 }}
                >
                    {state === 'uploading' && (
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-white/20"
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: 'linear', duration: 0.05 }}
                        />
                    )}
                    {state === 'uploading' && (
                        <motion.div
                            className="absolute inset-y-0 w-16 opacity-40"
                            style={{ background: 'linear-gradient(115deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                            animate={{ left: ['-20%', '120%'] }}
                            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                        />
                    )}

                    <div className="relative z-10 w-full h-full flex items-center justify-center gap-2 text-white text-[14px] font-semibold">
                        <AnimatePresence mode="wait" initial={false}>
                            {state === 'idle' && (
                                <motion.span key="idle" className="flex items-center gap-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
                                    <UploadCloud size={15} /> Upload
                                </motion.span>
                            )}
                            {state === 'uploading' && (
                                <motion.span key="uploading" className="flex items-center gap-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
                                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}>
                                        <Loader2 size={15} />
                                    </motion.span>
                                    Uploading…
                                </motion.span>
                            )}
                            {state === 'done' && (
                                <motion.span key="done" className="flex items-center gap-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}>
                                    <motion.span initial={{ scale: 0.4 }} animate={{ scale: [0.4, 1.25, 1] }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                                        <Check size={15} />
                                    </motion.span>
                                    Uploaded
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.button>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Click to Upload</span>
            </div>
</div>
    );
}
