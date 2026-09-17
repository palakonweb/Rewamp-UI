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
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-14 select-none"
            >
                {/* ── The Arch Card Carousel ── */}
                <div className="w-full">
                    <ArchCardCarousel />
                </div>
            </div>
        </div>
    );
}
