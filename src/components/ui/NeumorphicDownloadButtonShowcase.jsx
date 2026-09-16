import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, CloudDownload } from 'lucide-react';

const promptContent = `Neumorphic "Download" pill button, soft raised light-gray surface. State 1 (idle): a circular disc with a cloud-download icon sits on the left, label reads "Download". State 2 (downloading, on click): a ring around the disc sweeps clockwise amber over ~2s while the icon fades from gray to amber and the label reads "Downloading…". State 3 (done): the ring completes, the disc shows an amber checkmark, and the label reads "Downloaded" — then it resets after a short hold.`;

const DISC = 44;
const STROKE = 4;
const RING_R = DISC / 2 + 5;
const RING_BOX = (RING_R + STROKE / 2) * 2;
const CIRC = 2 * Math.PI * RING_R;
const DURATION = 2200;

function lerpColor(a, b, t) {
    const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16);
    const ar = (ah >> 16) & 255, ag = (ah >> 8) & 255, ab = ah & 255;
    const br = (bh >> 16) & 255, bg = (bh >> 8) & 255, bb = bh & 255;
    const r = Math.round(ar + (br - ar) * t);
    const g = Math.round(ag + (bg - ag) * t);
    const b2 = Math.round(ab + (bb - ab) * t);
    return `rgb(${r}, ${g}, ${b2})`;
}

export default function NeumorphicDownloadButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [phase, setPhase] = useState('idle'); // idle | downloading | done
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const startDownload = () => {
        if (phase !== 'idle') return;
        setPhase('downloading');
        setProgress(0);
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / DURATION);
            setProgress(t);
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setPhase('done');
                setTimeout(() => {
                    setPhase('idle');
                    setProgress(0);
                }, 1800);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    const iconColor = phase === 'idle' ? '#9aa0a6' : lerpColor('#9aa0a6', '#e8a33d', Math.min(1, progress * 1.3));
    const offset = CIRC * (1 - progress);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <button
                    onClick={startDownload}
                    className="relative flex items-center gap-3 pl-1.5 pr-7 py-1.5 rounded-full select-none"
                    style={{
                        background: '#F1F1F1',
                        boxShadow: '8px 8px 16px rgba(163,168,176,0.55), -8px -8px 16px rgba(255,255,255,0.85)',
                    }}
                >
                    <div className="relative shrink-0 flex items-center justify-center" style={{ width: RING_BOX, height: RING_BOX }}>
                        {phase === 'downloading' && (
                            <svg width={RING_BOX} height={RING_BOX} className="absolute inset-0 -rotate-90">
                                <circle cx={RING_BOX / 2} cy={RING_BOX / 2} r={RING_R} stroke="#d8dadd" strokeWidth={STROKE} fill="none" strokeLinecap="round" />
                                <circle
                                    cx={RING_BOX / 2}
                                    cy={RING_BOX / 2}
                                    r={RING_R}
                                    stroke="#e8a33d"
                                    strokeWidth={STROKE}
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeDasharray={CIRC}
                                    strokeDashoffset={offset}
                                />
                            </svg>
                        )}
                        <div
                            className="relative rounded-full flex items-center justify-center"
                            style={{
                                width: DISC,
                                height: DISC,
                                background: '#F1F1F1',
                                boxShadow: '4px 4px 10px rgba(163,168,176,0.6), -4px -4px 10px rgba(255,255,255,0.9)',
                            }}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                {phase !== 'done' ? (
                                    <motion.span key="cloud" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}>
                                        <CloudDownload size={18} strokeWidth={1.7} style={{ color: iconColor }} />
                                    </motion.span>
                                ) : (
                                    <motion.span key="done" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: [0.6, 1.2, 1] }} transition={{ duration: 0.35 }}>
                                        <Check size={18} strokeWidth={2} className="text-[#e8a33d]" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={phase}
                            initial={{ opacity: 0, x: 6 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -6 }}
                            transition={{ duration: 0.2 }}
                            className="text-[14px] font-medium text-[#5a5f66]"
                        >
                            {phase === 'idle' ? 'Download' : phase === 'downloading' ? 'Downloading…' : 'Downloaded'}
                        </motion.span>
                    </AnimatePresence>
                </button>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Neumorphic Download</span>
            </div>
</div>
    );
}
