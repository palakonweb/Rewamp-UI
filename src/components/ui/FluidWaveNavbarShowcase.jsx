import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import FluidWaveNavbar from './FluidWaveNavbar';
import { fluidWaveNavbarPrompt } from './fluidWaveNavbarSource';

export default function FluidWaveNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeTabName, setActiveTabName] = useState('About');

    const handleCopy = () => {
        navigator.clipboard.writeText(fluidWaveNavbarPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const tabNames = ['About', 'Projects', 'Contact'];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive Preview Card with Dark Grey Canvas ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/10 overflow-hidden shadow-xs flex flex-col items-center justify-center p-8 sm:p-20"
                style={{
                    backgroundColor: '#222227',
                    backgroundImage: `
                        radial-gradient(circle at 50% 45%, rgba(255, 255, 255, 0.05) 0%, transparent 65%),
                        radial-gradient(rgba(255, 255, 255, 0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '100% 100%, 24px 24px',
                    minHeight: '480px',
                }}
            >
                {/* Active Tab Indicator Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 text-[12px] font-medium font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Active: {activeTabName}</span>
                </div>

                {/* The Floating White Navbar with Dark Grey Wave Indicator */}
                <div className="relative z-10 my-auto pt-6 pb-10">
                    <FluidWaveNavbar
                        onChange={(idx) => setActiveTabName(tabNames[idx])}
                    />
                </div>

                {/* Subtext guide */}
                <span className="relative z-10 text-[11.5px] font-medium text-white/40 tracking-wider uppercase mt-4 select-none">
                    Hover over tabs to glide wave indicator · Dark grey accent
                </span>
            </div>

            {/* ── Prompt block ── */}
</div>
    );
}
