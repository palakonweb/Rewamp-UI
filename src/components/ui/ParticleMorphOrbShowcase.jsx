import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
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

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2400);

        return () => clearInterval(interval);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(particleMorphOrbPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const currentPhrase = PHRASES[currentIndex];

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {/* ── Studio Canvas ── */}
            <div
                className="relative w-full h-full flex flex-col items-center justify-center p-8 sm:p-14 select-none"
            >
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
</div>
    );
}
