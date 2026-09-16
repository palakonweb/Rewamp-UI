import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SplashCursor from './SplashCursor'; // Importing the existing complex WebGL component

const promptContent = `A high-performance WebGL fluid simulation cursor effect rendered in radiant shades of lavender with an interactive centered cursor and responsive dissipation dynamics.`;

export default function SplashCursorShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0c0915] flex items-center justify-center shadow-2xl">
                
                {/* WebGL Fluid Cursor Component in Lavender */}
                <div className="absolute inset-0 z-0">
                    <SplashCursor 
                        COLOR="#C4B5FD" 
                        RAINBOW_MODE={false} 
                        SPLAT_RADIUS={0.28} 
                        DENSITY_DISSIPATION={2.8}
                        isContained={true}
                    />
                </div>

                {/* Centered Cursor Indicator */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center">
                    {/* Radiant lavender halo */}
                    <div className="absolute w-32 h-32 rounded-full bg-violet-500/20 blur-2xl animate-pulse" />
                    
                    {/* Sleek SVG Mouse Cursor in Lavender */}
                    <div className="relative flex flex-col items-center">
                        <svg 
                            className="w-8 h-8 drop-shadow-[0_4px_14px_rgba(196,181,253,0.7)]" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                d="M5.5 3.5L11.5 20.5L14.5 13.5L21.5 10.5L5.5 3.5Z" 
                                fill="#8B5CF6" 
                                stroke="#DDD6FE" 
                                strokeWidth="1.5" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="mt-2 px-2.5 py-0.5 rounded-full bg-violet-950/80 border border-violet-400/30 text-[10px] font-mono font-medium text-violet-200 tracking-wider backdrop-blur-sm shadow-sm whitespace-nowrap">
                            (center)
                        </span>
                    </div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-violet-300/40 text-[12px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Lavender Splash Cursor</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0 cursor-pointer">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
