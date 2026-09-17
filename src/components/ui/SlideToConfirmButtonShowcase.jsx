import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Package } from 'lucide-react';

const promptContent = `"Slide to Confirm" order button: a dark navy pill reading "Complete Order". On click, the label fades and a tan package icon appears near the left edge; a white cargo-trailer + blue cab truck slides left to right across the track. A dashed white "road" line trails behind it, headlight beams fade in near the end, and the truck exits past the right edge and fades. The track settles back to solid dark and the label crossfades to "Order Placed" with a green check. ~1s slide, ease-in-out with a slight speed-up near the end.`;

const DURATION = 1000;

export default function SlideToConfirmButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [phase, setPhase] = useState('idle'); // idle | sliding | trailing | done
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const run = () => {
        if (phase !== 'idle') return;
        setPhase('sliding');
        setProgress(0);
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / DURATION);
            const eased = t < 0.7 ? t * 1.05 : 0.735 + (t - 0.7) * 0.88;
            setProgress(Math.min(1, eased));
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setPhase('trailing');
                setTimeout(() => {
                    setPhase('done');
                    setTimeout(() => {
                        setPhase('idle');
                        setProgress(0);
                    }, 2200);
                }, 260);
            }
        };
        rafRef.current = requestAnimationFrame(tick);
    };

    const truckX = 20 + progress * 360;
    const packageOpacity = progress < 0.28 ? Math.min(1, progress / 0.15) * (progress > 0.2 ? (0.28 - progress) / 0.08 : 1) : 0;
    const dashStart = 48;
    const dashEnd = Math.max(dashStart, Math.min(300, truckX));
    const dashAheadOpacity = progress > 0.7 ? Math.min(1, (progress - 0.7) / 0.2) : 0;
    const headlightOpacity = progress > 0.6 ? Math.min(1, (progress - 0.6) / 0.2) : 0;
    const truckOpacity = progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.15) : 1;
    const roadOpacity = phase === 'sliding' ? 1 : phase === 'trailing' ? 0 : 0;

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center p-8">
                <button
                    onClick={run}
                    className="relative w-[340px] h-[70px] rounded-full overflow-hidden select-none"
                    style={{ background: '#151a26', boxShadow: '0 14px 30px -12px rgba(0,0,0,0.4)' }}
                >
                    {/* package icon */}
                    {phase === 'sliding' && (
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-md flex items-center justify-center"
                            style={{ left: 30, background: '#d4a95c', opacity: packageOpacity }}
                        >
                            <Package size={13} className="text-[#151a26]" />
                        </div>
                    )}

                    {/* dashed road */}
                    <div
                        className="absolute top-1/2 -translate-y-[1px] h-[2px] pointer-events-none"
                        style={{
                            left: dashStart,
                            width: Math.max(0, dashEnd - dashStart) + (dashAheadOpacity > 0 ? (340 - dashEnd) * dashAheadOpacity : 0),
                            backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.6) 0 8px, transparent 8px 16px)',
                            opacity: roadOpacity,
                        }}
                    />

                    {/* truck */}
                    {(phase === 'sliding' || phase === 'trailing') && (
                        <div
                            className="absolute top-1/2 -translate-y-1/2"
                            style={{ left: truckX, opacity: phase === 'trailing' ? 0 : truckOpacity, transition: phase === 'trailing' ? 'opacity 0.25s ease-out' : 'none' }}
                        >
                            <div className="relative flex items-center">
                                <div className="w-9 h-6 bg-white rounded-[4px]" />
                                <div className="relative w-6 h-5 rounded-r-[4px]" style={{ background: '#2f5bd7' }}>
                                    <div className="absolute left-1 top-0.5 w-2.5 h-2 bg-white/70" style={{ clipPath: 'polygon(0 0, 100% 30%, 100% 100%, 0% 100%)' }} />
                                </div>
                                {headlightOpacity > 0 && (
                                    <div
                                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-4 h-3"
                                        style={{
                                            opacity: headlightOpacity,
                                            background: 'linear-gradient(90deg, rgba(255,241,190,0.8), transparent)',
                                            clipPath: 'polygon(0 20%, 100% 0, 100% 100%, 0 80%)',
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}

                    {/* label */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            {phase === 'idle' && (
                                <motion.span key="start" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="text-white text-[16px] font-bold">
                                    Complete Order
                                </motion.span>
                            )}
                            {phase === 'done' && (
                                <motion.span key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.05 }} className="flex items-center gap-2 text-white text-[16px] font-bold">
                                    <Check size={17} className="text-emerald-400" />
                                    Order Placed
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </button>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Click to Slide</span>
            </div>
</div>
    );
}
