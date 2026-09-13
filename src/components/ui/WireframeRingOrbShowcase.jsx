import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Play, Pause, RotateCcw } from 'lucide-react';
import WireframeRingOrb from './WireframeRingOrb';
import { wireframeRingOrbPrompt } from './wireframeRingOrbSource';

const PHRASES = [
    'thinking...',
    'manifesting....',
    'cooking....',
    'hold.upp...',
    'let me cookkk............',
    'donebestiee...',
];

export default function WireframeRingOrbShowcase() {
    const [copied, setCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [ringCount, setRingCount] = useState(9);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2400);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleCopy = () => {
        navigator.clipboard.writeText(wireframeRingOrbPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCurrentIndex(0);
    };

    const currentPhrase = PHRASES[currentIndex];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Studio Canvas ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/8 overflow-hidden shadow-sm flex flex-col items-center justify-center p-8 sm:p-14 select-none min-h-[380px]"
                style={{
                    backgroundColor: '#F7F6F2',
                    backgroundImage: `
                        radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F5F3ED 60%, #EBE8DE 100%)
                    `,
                }}
            >
                {/* Top Controls */}
                <div className="absolute top-5 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
                    <div className="flex items-center gap-1.5 p-1 rounded-full bg-white/80 backdrop-blur-md border border-black/8 pointer-events-auto shadow-xs">
                        <span className="text-[11px] text-black/40 pl-2 pr-1 font-medium">Rings:</span>
                        {[7, 9, 12].map((count) => (
                            <button
                                key={count}
                                onClick={() => setRingCount(count)}
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                                    ringCount === count
                                        ? 'bg-black/10 text-black font-semibold shadow-xs'
                                        : 'text-black/50 hover:text-black/80'
                                }`}
                            >
                                {count}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-1.5 pointer-events-auto">
                        <button
                            onClick={() => setIsPlaying(!isPlaying)}
                            title={isPlaying ? 'Pause cycling' : 'Play cycling'}
                            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-black/60 hover:text-black transition-all border border-black/8 shadow-xs cursor-pointer"
                        >
                            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                        </button>
                        <button
                            onClick={handleReset}
                            title="Restart phrase sequence"
                            className="p-1.5 rounded-lg bg-white/80 hover:bg-white text-black/60 hover:text-black transition-all border border-black/8 shadow-xs cursor-pointer"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>

                {/* ── WHITE AI THINKING PILL: Wireframe Ring Orb on LEFT, Shimmery Text on RIGHT ── */}
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="relative flex items-center gap-3.5 pl-3.5 pr-6 py-2.5 rounded-full border border-black/10 shadow-lg shadow-black/5 backdrop-blur-md bg-white cursor-default my-auto"
                >
                    {/* LEFT: 3D Wireframe Ring Orb */}
                    <div className="relative w-11 h-11 shrink-0 flex items-center justify-center rounded-full overflow-hidden">
                        <WireframeRingOrb
                            key={ringCount}
                            ringCount={ringCount}
                            size={44}
                            speed={1.0}
                            color="#18181B"
                        />
                    </div>

                    {/* RIGHT: Shimmery Text */}
                    <div className="flex items-center min-w-[140px] sm:min-w-[165px]">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPhrase}
                                initial={{ opacity: 0, y: 5, filter: 'blur(3px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -5, filter: 'blur(3px)' }}
                                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                                className="text-[15px] sm:text-[15.5px] font-sans font-medium tracking-normal select-none"
                                style={{
                                    backgroundImage: 'linear-gradient(90deg, #18181B 0%, #71717A 40%, #18181B 80%)',
                                    backgroundSize: '200% 100%',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    animation: 'text-shimmer 2.8s linear infinite',
                                }}
                            >
                                {currentPhrase}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>

            {/* ── Prompt block ── */}
            <div className="w-full rounded-2xl bg-white border border-black/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-black/40 uppercase tracking-widest font-semibold mb-2">
                        Prompt Setup
                    </p>
                    <code className="text-[13px] text-black/80 font-mono block overflow-hidden text-ellipsis w-full line-clamp-3">
                        {wireframeRingOrbPrompt}
                    </code>
                </div>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 hover:bg-black/10 transition-all shrink-0 cursor-pointer"
                >
                    {copied ? (
                        <>
                            <Check size={16} className="text-emerald-600" />
                            <span className="text-[13px] font-medium text-emerald-600">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} className="text-black/60" />
                            <span className="text-[13px] font-medium text-black/70">Copy prompt</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
