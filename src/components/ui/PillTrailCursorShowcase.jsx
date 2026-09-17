import React from 'react';
import PillTrailCursor from './PillTrailCursor';

export default function PillTrailCursorShowcase() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none">
            {/* ── Prominently Framed Interactive Cursor Preview ── */}
            <div className="w-full max-w-4xl flex items-center justify-center">
                <PillTrailCursor
                    trailLength={16}
                    baseSpacing={24}
                    maxSpacing={38}
                    pillHeight={28}
                    fontSize={12}
                    className="w-full min-h-[420px] sm:min-h-[520px] rounded-[24px] sm:rounded-[32px] bg-white dark:bg-[#0D0B12] border border-black/10 dark:border-white/12 shadow-2xl relative overflow-hidden flex items-center justify-center transition-colors duration-200"
                >
                    {/* Centered Guide in the Middle of the Cursor Frame */}
                    <div className="pointer-events-none select-none flex flex-col items-center justify-center gap-2 z-10 px-4 text-center">
                        <span className="text-sm sm:text-base font-semibold text-neutral-700 dark:text-neutral-200 tracking-tight">
                            Move your cursor here to generate pill trail
                        </span>
                        <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
                            Tactile physics · dynamic spacing · brand palette
                        </span>
                    </div>
                </PillTrailCursor>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Move cursor across frame to generate kinetic pill trail
            </p>
        </div>
    );
}

PillTrailCursorShowcase.customTitle = 'Pill Trail Cursor';
PillTrailCursorShowcase.customSlug = 'pill-trail-cursor';
