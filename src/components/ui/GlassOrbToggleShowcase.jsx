import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import GlassOrbToggle from './GlassOrbToggle';
import { glassOrbTogglePrompt } from './glassOrbToggleSource';

export default function GlassOrbToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [mode, setMode] = useState('Dark');

    const handleCopy = () => {
        navigator.clipboard.writeText(glassOrbTogglePrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive Preview Card with Dark Cinematic Canvas ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/10 overflow-hidden shadow-xs flex flex-col items-center justify-center p-8 sm:p-24 transition-colors duration-700"
                style={{
                    backgroundColor: mode === 'Light' ? '#14141A' : '#0B0B0E',
                    backgroundImage: `
                        radial-gradient(circle at 50% 50%, ${mode === 'Light' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.03)'} 0%, transparent 70%),
                        radial-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '100% 100%, 28px 28px',
                    minHeight: '440px',
                }}
            >
                {/* Status indicator badge */}
                <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/70 text-[12px] font-medium font-sans">
                    <span className={`w-2 h-2 rounded-full ${mode === 'Light' ? 'bg-amber-400' : 'bg-indigo-400'} animate-pulse`} />
                    <span>Mode: {mode}</span>
                </div>

                {/* The 3D Glass Orb Toggle */}
                <div className="relative z-10 my-auto py-6">
                    <GlassOrbToggle
                        onChange={(isLight) => setMode(isLight ? 'Light' : 'Dark')}
                    />
                </div>

                {/* Subtext instruction */}
                <span className="relative z-10 text-[11.5px] font-medium text-white/40 tracking-wider uppercase mt-4 select-none">
                    Click track or glass sphere to toggle theme
                </span>
            </div>

            {/* ── Prompt block ── */}
            <div className="w-full rounded-2xl bg-white border border-black/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-black/40 uppercase tracking-widest font-semibold mb-2">
                        Prompt Setup
                    </p>
                    <code className="text-[13px] text-black/80 font-mono block overflow-hidden text-ellipsis w-full line-clamp-3">
                        {glassOrbTogglePrompt}
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
