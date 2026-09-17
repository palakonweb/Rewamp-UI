import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';
import WireframeRingOrb from './WireframeRingOrb';
import { wireframeRingOrbPrompt } from './wireframeRingOrbSource';

const PHRASES = [
    'analyzing...',
    'mapping contours...',
    'simulating...',
    'hold on tight...',
    'piecing it together...',
    'nailed it 🎯',
];

export default function WireframeRingOrbShowcase() {
    const [copied, setCopied] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [ringCount] = useState(9);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % PHRASES.length);
        }, 2400);

        return () => clearInterval(interval);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(wireframeRingOrbPrompt);
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
</div>
    );
}
