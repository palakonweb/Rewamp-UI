import React, { useState } from 'react';
import FluidWaveNavbar from './FluidWaveNavbar';

export default function FluidWaveNavbarShowcase() {
    const [activeTabName, setActiveTabName] = useState('Home');
    const tabNames = ['Home', 'About', 'Projects', 'Contacts'];

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* Active Tab Indicator Badge */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-800 dark:text-white/80 text-[12px] font-medium font-sans mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active: {activeTabName}</span>
            </div>

            {/* The Floating Navbar with Fluid Wave Notch */}
            <div className="relative flex items-center justify-center">
                <FluidWaveNavbar
                    onChange={(idx) => setActiveTabName(tabNames[idx])}
                />
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover or click tabs to glide fluid wave
            </p>
        </div>
    );
}
