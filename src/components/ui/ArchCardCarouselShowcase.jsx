import React, { useState } from 'react';
import { Copy, Check, Sparkles } from 'lucide-react';
import ArchCardCarousel from './ArchCardCarousel';
import { archCardCarouselPrompt } from './archCardCarouselSource';

export default function ArchCardCarouselShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(archCardCarouselPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-5xl mx-auto">
            {/* ── Studio Canvas (pure white background per user request) ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/8 overflow-hidden shadow-xs flex flex-col items-center justify-center p-6 sm:p-14 select-none bg-white"
                style={{
                    minHeight: '580px',
                }}
            >
                {/* Subtle top indicator */}
                <div className="absolute top-6 left-7 flex items-center gap-2 z-10">
                    <div className="w-2 h-2 rounded-full bg-[#EC5E27]" />
                    <span className="text-[11px] font-mono tracking-widest text-black/45 uppercase font-medium">
                        Wheel Deck · Arch Trajectory
                    </span>
                </div>

                <div className="absolute top-6 right-7 hidden sm:flex items-center gap-2 z-10 text-[11px] font-medium text-black/40">
                    <span>Drag or click cards to spin</span>
                </div>

                {/* ── The Arch Card Carousel with added top margin ── */}
                <div className="w-full mt-12 sm:mt-16">
                    <ArchCardCarousel />
                </div>
            </div>
        </div>
    );
}
