import React from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import PixelSnow from './backgrounds/PixelSnow';

export default function PixelSnowBackgroundShowcase() {
  return (
    <div className="w-full flex flex-col items-center justify-center max-w-4xl mx-auto">
      {/* PREVIEW SECTION - Real organic snowfall */}
      <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-white/10 bg-[#05060C] shadow-2xl flex items-center justify-center p-8">
        <div className="absolute inset-0 z-0">
          <PixelSnow
            color="#ffffff"
            density={0.5}
            speed={1.2}
            wind={0.35}
            interactive={true}
          />
        </div>

        <BackgroundHeroOverlay isLight={false} />
      </div>

      {/* Single-line interaction description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Move mouse to stir snowfall with realistic air drafts
      </p>
    </div>
  );
}

PixelSnowBackgroundShowcase.customTitle = 'Real Snow Background';
PixelSnowBackgroundShowcase.customSlug = 'pixel-snow-background';
