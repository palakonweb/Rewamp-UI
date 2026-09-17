import React from 'react';
import HalftoneDotCursor from './HalftoneDotCursor';

export default function HalftoneDotCursorShowcase() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6 select-none max-w-4xl mx-auto">
      {/* Framed Interactive Halftone Matrix */}
      <HalftoneDotCursor
        spacing={12}
        maxDotRadius={4.8}
        minDotRadius={0.7}
        influenceRadius={55}
        trailLifetime={1200}
        darkColor="#9C8EB8"
        lightColor="#B8A7D6"
        className="w-full min-h-[420px] sm:min-h-[520px] rounded-[24px] sm:rounded-[32px] bg-[#121018] dark:bg-[#09080E] border border-black/10 dark:border-white/12 shadow-2xl cursor-default overflow-hidden flex items-center justify-center relative"
      >
        {/* Centered Guide in the Middle of the Cursor Frame */}
        <div className="pointer-events-none select-none flex flex-col items-center justify-center gap-2 z-10 px-4 text-center">
          <span className="text-sm sm:text-base font-semibold text-neutral-300 dark:text-neutral-200 tracking-tight">
            Move your cursor here to bloom halftone dots
          </span>
          <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500">
            Dynamic matrix bloom · trail decay · lavender palette
          </span>
        </div>
      </HalftoneDotCursor>

      {/* Centered Single-line Description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Move cursor across frame to generate halftone dot trail
      </p>
    </div>
  );
}

HalftoneDotCursorShowcase.customTitle = 'Halftone Dot Cursor';
HalftoneDotCursorShowcase.customSlug = 'halftone-dot-cursor';
