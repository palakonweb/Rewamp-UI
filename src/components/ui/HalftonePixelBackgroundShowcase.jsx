import React, { useState } from 'react';
import HalftonePixelBackground from './HalftonePixelBackground';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';

export const halftonePixelPrompt = `A dynamic pixel halftone background in React matching modern creative agency aesthetics:
- High-density orthogonal dot matrix grid with dynamic radius modulation.
- Smooth undulating harmonic metaball fluid nodes drifting organically across the canvas.
- Dots swell and merge into glowing luminous cloud islands where fluid nodes intersect.
- Supports both Dark Mode (deep purple-slate canvas with radiant lavender #D4CBE5 cores) and Light Mode (#EAEAEA canvas with lavender dots merging into pure white cloud peaks).
- Fully responsive HTML5 canvas with requestAnimationFrame 60fps loop and debounced resize handling.
- Centered Hero Overlay with RewampUI badge, high-contrast typography, and live demo content toggle switch.`;

export default function HalftonePixelBackgroundShowcase() {
  const [theme, setTheme] = useState('dark');

  return (
    <div className="relative w-full h-[520px] rounded-[28px] overflow-hidden border border-black/10 dark:border-white/10 shadow-2xl flex items-center justify-center">
      {/* Halftone Pixel Canvas */}
      <HalftonePixelBackground theme={theme} />

      {/* Standardized Hero Overlay */}
      <BackgroundHeroOverlay />
    </div>
  );
}

HalftonePixelBackgroundShowcase.customTitle = 'Halftone Pixel Background';
HalftonePixelBackgroundShowcase.customSlug = 'halftone-pixel-background';
