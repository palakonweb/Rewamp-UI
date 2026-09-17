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
        <div className="w-full h-full flex items-center justify-center">
            <div
                className="relative w-full h-full flex flex-col items-center justify-center p-8 sm:p-20"
            >
                {/* Active Tab Indicator Badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white/80 text-[12px] font-medium font-sans">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Active: {activeTabName}</span>
                </div>

                {/* The Floating White Navbar with Dark Grey Wave Indicator */}
                <div className="relative z-10 my-auto pt-6 pb-10">
                    <FluidWaveNavbar
                        onChange={(idx) => setActiveTabName(tabNames[idx])}
                    />
                </div>

                {/* Subtext guide */}
                <span className="relative z-10 text-[11.5px] font-medium text-neutral-500 dark:text-white/40 tracking-wider uppercase mt-4 select-none">
                    Hover over tabs to glide wave indicator · Dark grey accent
                </span>
            </div>
        </div>
    );
}
