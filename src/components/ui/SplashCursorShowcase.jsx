import React from 'react';
import SplashCursor from './SplashCursor';

export default function SplashCursorShowcase() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none max-w-4xl mx-auto">
            {/* Framed Interactive Fluid Canvas */}
            <div className="relative w-full h-[460px] sm:h-[560px] rounded-[24px] sm:rounded-[32px] overflow-hidden border border-black/10 dark:border-white/12 bg-[#0C0915] flex items-center justify-center shadow-2xl">
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

                {/* Centered Guide in the Middle of the Cursor Frame */}
                <div className="pointer-events-none select-none flex flex-col items-center justify-center gap-2 z-10 px-4 text-center">
                    <span className="text-sm sm:text-base font-semibold text-white/80 tracking-tight">
                        Move your cursor here to trigger fluid splashes
                    </span>
                    <span className="text-xs font-mono text-white/40">
                        WebGL Navier-Stokes fluid simulation · lavender dissipation
                    </span>
                </div>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Move cursor across frame to generate fluid lavender splash
            </p>
        </div>
    );
}

SplashCursorShowcase.customTitle = 'Splash Cursor';
SplashCursorShowcase.customSlug = 'splash-cursor';
