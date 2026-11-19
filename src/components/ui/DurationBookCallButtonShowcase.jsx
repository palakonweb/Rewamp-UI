import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';

const MIN_DURATION = 15;
const MAX_DURATION = 120;
const STEP = 15;

export default function DurationBookCallButtonShowcase() {
    const [duration, setDuration] = useState(30);

    const adjust = (delta) => {
        setDuration((d) => Math.min(MAX_DURATION, Math.max(MIN_DURATION, d + delta)));
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div
                className="flex items-center gap-1 rounded-full p-1.5"
                style={{
                    backgroundColor: 'var(--surface)',
                    boxShadow: '0 20px 44px -18px rgba(0,0,0,0.18)',
                }}
            >
                {/* Duration stepper */}
                <div className="flex items-center gap-2.5 pl-5 pr-4">
                    <span className="flex items-baseline gap-1.5 whitespace-nowrap">
                        <span className="text-[26px] font-bold" style={{ color: 'var(--text-primary)' }}>
                            {duration}
                        </span>
                        <span className="text-[17px] font-medium" style={{ color: 'var(--text-subtle)' }}>
                            mins
                        </span>
                    </span>
                    <div className="flex flex-col -space-y-1">
                        <button
                            type="button"
                            onClick={() => adjust(STEP)}
                            disabled={duration >= MAX_DURATION}
                            aria-label="Increase duration"
                            className="h-4 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ color: 'var(--text-subtle)' }}
                        >
                            <ChevronUp size={14} strokeWidth={2.5} />
                        </button>
                        <button
                            type="button"
                            onClick={() => adjust(-STEP)}
                            disabled={duration <= MIN_DURATION}
                            aria-label="Decrease duration"
                            className="h-4 flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                            style={{ color: 'var(--text-subtle)' }}
                        >
                            <ChevronDown size={14} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>

                {/* Gradient CTA, inset within the pill */}
                <motion.button
                    type="button"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    className="relative h-14 px-8 rounded-[20px] overflow-hidden cursor-pointer"
                    style={{ boxShadow: '0 10px 24px -8px rgba(90,70,200,0.35)' }}
                >
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(135deg, #FDBA74 0%, #FB7185 35%, #8B5CF6 70%, #4338CA 100%)',
                            backgroundSize: '220% 220%',
                        }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* Soft grain texture for the blurred, slightly noisy
                        gradient quality seen in the reference. */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'overlay', opacity: 0.35 }} aria-hidden="true">
                        <filter id="book-call-grain">
                            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.45 0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#book-call-grain)" />
                    </svg>
                    <span className="relative text-[16px] font-bold text-white whitespace-nowrap">Book a Call</span>
                </motion.button>
            </div>
        </div>
    );
}
