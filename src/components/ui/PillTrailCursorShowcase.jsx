import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import PillTrailCursor from './PillTrailCursor';
import { pillTrailPrompt } from './pillTrailSource';

const navItems = ['Home', 'Research', 'Development', 'News', 'Institute'];

export default function PillTrailCursorShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(pillTrailPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive White Canvas Preview (matching reference video Recording 2026-09-13 170458.mp4) ── */}
            <PillTrailCursor
                trailLength={16}
                baseSpacing={24}
                maxSpacing={38}
                pillHeight={26}
                fontSize={11.5}
                className="w-full rounded-[20px] border border-black/10 shadow-xs overflow-hidden"
                style={{ background: '#ffffff' }}
            >
                {/* 5-Column Editorial Helix Canvas */}
                <div
                    className="relative w-full select-none"
                    style={{
                        minHeight: '520px',
                        background: '#ffffff',
                    }}
                >
                    {/* Top 5-Column Navigation Bar with Vertical Divider Grid Lines */}
                    <div className="w-full grid grid-cols-5 border-b border-black/[0.07]">
                        {navItems.map((item, idx) => (
                            <div
                                key={item}
                                className={`px-4 sm:px-6 py-4 flex items-center justify-start ${
                                    idx < navItems.length - 1 ? 'border-r border-black/[0.07]' : ''
                                }`}
                            >
                                <span className="text-[13.5px] sm:text-[15px] font-bold text-black/90 tracking-tight font-sans">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Extended Vertical Grid Divider Lines running down the canvas */}
                    <div aria-hidden="true" className="absolute inset-0 top-[53px] grid grid-cols-5 pointer-events-none">
                        {navItems.map((item, idx) => (
                            <div
                                key={`col-${item}`}
                                className={`h-full ${
                                    idx < navItems.length - 1 ? 'border-r border-black/[0.07]' : ''
                                }`}
                            />
                        ))}
                    </div>

                    {/* Bottom Left: Bold "helix.tech" Lowercase Typography matching reference video */}
                    <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-10 z-10 pointer-events-none">
                        <div
                            className="font-sans font-black text-black tracking-[-0.045em] leading-[0.86] select-none lowercase"
                            style={{
                                fontSize: 'clamp(52px, 9vw, 92px)',
                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                                textTransform: 'lowercase',
                            }}
                        >
                            helix.
                            <br />
                            tech
                        </div>
                    </div>

                    {/* Subtle interaction tip */}
                    <div className="absolute bottom-4 right-6 z-10 pointer-events-none">
                        <span className="text-[10.5px] font-semibold tracking-wider uppercase text-black/25">
                            Move cursor to trail
                        </span>
                    </div>
                </div>
            </PillTrailCursor>

            {/* ── Prompt block ── */}
            <div className="w-full rounded-2xl bg-white border border-black/5 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-black/40 uppercase tracking-widest font-semibold mb-2">
                        Prompt Setup
                    </p>
                    <code className="text-[13px] text-black/80 font-mono block overflow-hidden text-ellipsis w-full line-clamp-3">
                        {pillTrailPrompt}
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
