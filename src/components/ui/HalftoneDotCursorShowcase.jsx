import React from 'react';
import HalftoneDotCursor from './HalftoneDotCursor';

export const halftoneDotCursorPrompt = `Halftone Dot Matrix Cursor trail effect inspired by editorial digital agencies. An interactive grid of halftone dots that dynamically scales and blooms into an organic fluid wake following the cursor trajectory with smooth dissipation decay, brand lavender color palette (darker in dark mode, lighter in light mode).`;

export default function HalftoneDotCursorShowcase() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-6">
      <HalftoneDotCursor
        spacing={12}
        maxDotRadius={4.8}
        minDotRadius={0.7}
        influenceRadius={55}
        trailLifetime={1200}
        darkColor="#9C8EB8"
        lightColor="#B8A7D6"
        className="w-full h-full min-h-[420px] sm:min-h-[520px] rounded-[24px] sm:rounded-[32px] bg-[#121018] dark:bg-[#09080E] border border-black/10 dark:border-white/10 shadow-2xl cursor-default overflow-hidden"
      >
        <div className="w-full h-full" />
      </HalftoneDotCursor>
    </div>
  );
}

HalftoneDotCursorShowcase.customTitle = 'Halftone Dot Cursor';
HalftoneDotCursorShowcase.customSlug = 'halftone-dot-cursor';

