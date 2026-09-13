import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Play, Pause, RotateCcw } from 'lucide-react';
import ParticleMorphOrb from './ParticleMorphOrb';
import { particleMorphOrbPrompt } from './particleMorphOrbSource';

const PHRASES = [
    'deep thinking...',
    'manifesting...',
    'cooking in the dark...',
    'hold up wait...',
    'let him cook...',
    'done bestie 🔥',
];

export default function ParticleMorphOrbShowcase() {
    const [copied, setCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2400);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handleCopy = () => {
        navigator.clipboard.writeText(particleMorphOrbPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setCurrentIndex(0);
    };

    const currentPhrase = PHRASES[currentIndex];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Dark Matte Studio Canvas ── */}
            <div
                className="relative w-full rounded-[28px] border border-white/10 overflow-hidden shadow-2xl flex flex-col items-center justify-center p-8 sm:p-14 select-none min-h-[380px]"
                style={{
                    backgroundColor: '#09090C',
                    backgroundImage: `
                        radial-gradient(circle at 50% 45%, #15151B 0%, #09090C 70%, #050507 100%)
                    `,
                }}
            >
                {/* Top Controls */}
                <div className="absolute top-5 right-6 flex items-center gap-1.5 z-10">
                    <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        title={isPlaying ? 'Pause cycling' : 'Play cycling'}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all border border-white/10 shadow-xs cursor-pointer"
                    >
                        {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    </button>
                    <button
                        onClick={handleReset}
                        title="Restart phrase sequence"
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white/60 hover:text-white transition-all border border-white/10 shadow-xs cursor-pointer"
                    >
                        <RotateCcw size={14} />
                    </button>
                </div>

                {/* ── DARK AI THINKING PILL: 3D Particle Morph Orb on LEFT, Shimmery Text on RIGHT ── */}
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    className="relative flex items-center gap-3.5 pl-3.5 pr-6 py-2.5 rounded-full border border-white/12 shadow-2xl backdrop-blur-xl bg-[#16161B] cursor-default my-auto"
                    style={{
                        boxShadow: '0 20px 45px -15px rgba(0, 0, 0, 0.85), inset 0 1px 1px 0 rgba(255, 255, 255, 0.12)',
                    }}
                >
                    {/* LEFT: 3D Undulating Particle Morph Orb */}
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center rounded-full">
                        <ParticleMorphOrb size={48} speed={1.0} />
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
                                    backgroundImage: 'linear-gradient(90deg, #E4E4E7 0%, #A1A1AA 40%, #E4E4E7 80%)',
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
                        {particleMorphOrbPrompt}
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
