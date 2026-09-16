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

                {/* Centered Hint Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col items-center justify-center text-center select-none">
                    {/* Ambient lavender glow */}
                    <div className="absolute w-72 h-28 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />
                    
                    <p className="font-sans text-xl sm:text-2xl font-light tracking-wide text-white/85 drop-shadow-[0_2px_16px_rgba(196,181,253,0.45)]">
                        Hover to see the magic
                    </p>
                </div>
                
                <span className="absolute bottom-6 right-6 text-violet-300/40 text-[12px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Lavender Splash Cursor</span>
            </div>
</div>
    );
}
