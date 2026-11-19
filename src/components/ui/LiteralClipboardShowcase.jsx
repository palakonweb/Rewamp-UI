import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlighter, Scissors, ChevronRight, Clipboard } from 'lucide-react';

const SWEEP = { duration: 0.55, ease: [0.4, 0, 0.2, 1] };

export default function LiteralClipboardShowcase() {
    // idle -> copying -> copied -> idle (yellow fades, text stays)
    // idle -> cutting -> cut (text gone, gap left) -> paste restores it
    const [mode, setMode] = useState('idle');
    const [clipboard, setClipboard] = useState(null);
    const [textGone, setTextGone] = useState(false);

    const busy = mode === 'copying' || mode === 'cutting';

    const handleCopy = () => {
        if (busy) return;
        setMode('copying');
        setTimeout(() => {
            setClipboard('rivera');
            setMode('copied');
            setTimeout(() => setMode('idle'), 700);
        }, 550);
    };

    const handleCut = () => {
        if (busy || textGone) return;
        setMode('cutting');
        setTimeout(() => {
            setTextGone(true);
            setClipboard('rivera');
            setMode('idle');
        }, 550);
    };

    const handlePaste = () => {
        if (busy || !textGone || !clipboard) return;
        setTextGone(false);
    };

    const showHighlight = mode === 'copying' || mode === 'copied';

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-6 sm:p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="relative">
                {/* iOS-style edit menu */}
                <div
                    className="absolute -top-16 left-1/2 -translate-x-1/2 flex items-stretch rounded-xl overflow-hidden z-20"
                    style={{ backgroundColor: 'var(--surface)', boxShadow: '0 16px 32px -12px rgba(0,0,0,0.3)' }}
                >
                    {[
                        { label: 'Cut', onClick: handleCut },
                        { label: 'Copy', onClick: handleCopy },
                        { label: 'Paste', onClick: handlePaste },
                        { label: 'Select All', onClick: undefined },
                    ].map((item, i) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={item.onClick}
                            disabled={!item.onClick}
                            className="px-4 py-3 text-[15px] font-medium cursor-pointer disabled:cursor-default whitespace-nowrap"
                            style={{
                                color: 'var(--text-primary)',
                                borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                    <div className="px-3 flex items-center" style={{ borderLeft: '1px solid var(--border)' }}>
                        <ChevronRight size={16} strokeWidth={2} style={{ color: 'var(--text-subtle)' }} />
                    </div>
                </div>

                {/* Word with the selectable/cuttable target */}
                <div className="flex items-baseline gap-3 pt-2">
                    <span className="relative inline-block">
                        {/* Selection/highlight box behind the word */}
                        {!textGone && (
                            <motion.span
                                className="absolute -inset-x-1.5 -inset-y-0.5 rounded-[4px] -z-10"
                                animate={{
                                    backgroundColor: showHighlight ? 'rgba(250, 204, 21, 0.55)' : 'rgba(10,132,255,0.18)',
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        )}

                        <AnimatePresence mode="popLayout">
                            {!textGone && (
                                <motion.span
                                    key="word"
                                    initial={false}
                                    animate={
                                        mode === 'cutting'
                                            ? { opacity: [1, 1, 0], y: [0, 2, 14], rotate: [0, 2, 8] }
                                            : { opacity: 1, y: 0, rotate: 0 }
                                    }
                                    transition={mode === 'cutting' ? { duration: 0.55, times: [0, 0.6, 1] } : { duration: 0.2 }}
                                    className="relative text-[44px] sm:text-[56px] font-bold lowercase"
                                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
                                >
                                    rivera
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* The empty gap left behind after a cut */}
                        {textGone && (
                            <span
                                className="inline-block text-[44px] sm:text-[56px] font-bold lowercase border-b-2 border-dashed"
                                style={{ borderColor: 'var(--border)', color: 'transparent' }}
                            >
                                rivera
                            </span>
                        )}

                        {/* Literal highlighter pen sweeping across on copy */}
                        <AnimatePresence>
                            {mode === 'copying' && (
                                <motion.span
                                    initial={{ x: '-10%', opacity: 0 }}
                                    animate={{ x: '100%', opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={SWEEP}
                                    className="absolute -top-3 left-0 z-10"
                                >
                                    <Highlighter size={26} strokeWidth={2} className="text-amber-500 -rotate-12" />
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {/* Literal scissors snipping across on cut */}
                        <AnimatePresence>
                            {mode === 'cutting' && (
                                <motion.span
                                    initial={{ x: '-10%', opacity: 0, rotate: -8 }}
                                    animate={{ x: '100%', opacity: 1, rotate: [-8, 8, -8] }}
                                    exit={{ opacity: 0 }}
                                    transition={{ ...SWEEP, rotate: { duration: 0.18, repeat: 2 } }}
                                    className="absolute -top-4 left-0 z-10"
                                >
                                    <Scissors size={24} strokeWidth={2} className="text-neutral-500" />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </span>

                    <span className="text-[44px] sm:text-[56px] font-bold lowercase" style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                        sisterz
                        <sup className="text-[16px] align-super">&reg;</sup>
                    </span>
                </div>
            </div>

            {/* Clipboard preview - shows whatever was last copied/cut */}
            <div
                className="flex items-center gap-3 px-5 py-3 rounded-2xl border-2 border-dashed"
                style={{ borderColor: 'var(--border)' }}
            >
                <Clipboard size={16} strokeWidth={2} style={{ color: 'var(--text-subtle)' }} />
                <AnimatePresence mode="wait">
                    <motion.span
                        key={clipboard ?? 'empty'}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                        className="text-[14px] font-medium"
                        style={{ color: clipboard ? 'var(--text-primary)' : 'var(--text-subtle)' }}
                    >
                        {clipboard ? `“${clipboard}” copied` : 'Clipboard is empty'}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
}
