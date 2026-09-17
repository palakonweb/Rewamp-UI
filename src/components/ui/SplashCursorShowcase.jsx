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

            </div>
        </div>
    );
}
