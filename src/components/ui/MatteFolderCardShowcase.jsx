import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import MatteFolderCard from './MatteFolderCard';
import { matteFolderCardPrompt } from './matteFolderCardSource';

export default function MatteFolderCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(matteFolderCardPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive Preview Card with Diagonal Grid Canvas matching reference photo ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/10 overflow-hidden shadow-xs flex flex-col items-center justify-center p-6 sm:p-14"
                style={{
                    backgroundColor: '#F5F5F3',
                    backgroundImage: `
                        linear-gradient(45deg, rgba(0, 0, 0, 0.055) 1px, transparent 1px),
                        linear-gradient(-45deg, rgba(0, 0, 0, 0.055) 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                    minHeight: '560px',
                }}
            >
                {/* Radial ambient vignette to center focus */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(245, 245, 243, 0.6) 100%)',
                    }}
                />

                {/* The Interactive Matte Folder Card */}
                <div className="relative z-10 my-auto">
                    <MatteFolderCard />
                </div>

                {/* Subtext instruction */}
                <span className="relative z-10 text-[11.5px] font-medium text-black/40 tracking-wider uppercase mt-6 select-none">
                    Hover card for micro-interactions & tilt · Fluid animated mesh gradient
                </span>
            </div>

            {/* ── Prompt block ── */}
            <div className="w-full rounded-2xl bg-white border border-black/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-black/40 uppercase tracking-widest font-semibold mb-2">
                        Prompt Setup
                    </p>
                    <code className="text-[13px] text-black/80 font-mono block overflow-hidden text-ellipsis w-full line-clamp-3">
                        {matteFolderCardPrompt}
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
