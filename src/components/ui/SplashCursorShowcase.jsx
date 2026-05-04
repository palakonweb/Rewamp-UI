import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SplashCursor from './SplashCursor'; // Importing the existing complex WebGL component

const promptContent = `A full-screen WebGL fluid simulation cursor effect that responds to pointer movement with vibrant, dissipating colorful dye splats and realistic fluid dynamics.`;

export default function SplashCursorShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0a0a0c] flex items-center justify-center">
                
                {/* WebGL Fluid Cursor Component */}
                <div className="absolute inset-0 z-0">
                    <SplashCursor 
                        COLOR="#00ffcc" 
                        RAINBOW_MODE={true} 
                        SPLAT_RADIUS={0.3} 
                        DENSITY_DISSIPATION={3.5}
                    />
                </div>

                <div className="relative z-10 pointer-events-none text-center flex flex-col items-center justify-center p-8 bg-black/20 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-3 drop-shadow-lg">
                        Fluid Dynamics
                    </h3>
                    <p className="text-white/80 max-w-sm text-[15px] font-light leading-relaxed drop-shadow-md">
                        Move your cursor to interact with the high-performance WebGL fluid simulation. 
                    </p>
                </div>
                
                <span className="absolute bottom-6 right-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Splash Cursor</span>
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
