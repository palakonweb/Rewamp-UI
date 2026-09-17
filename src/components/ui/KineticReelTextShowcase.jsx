import React, { useState } from 'react';
import { KineticReelText, DEFAULT_REEL_ITEMS } from './KineticReelText';

export default function KineticReelTextShowcase() {
  const [theme] = useState('dark');
  const [prefix] = useState('we make');
  const [autoPlay] = useState(true);

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Main Stage: Centered Reel */}
      <div
        className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-[#1F1F1F]'
        }`}
      >
        {/* Kinetic Reel Text Component with centered layout */}
        <div className="relative z-10 w-full px-6 sm:px-12 py-4 flex items-center justify-center">
          <KineticReelText
            prefix={prefix}
            items={DEFAULT_REEL_ITEMS}
            theme={theme}
            autoPlay={autoPlay}
            interval={2000}
          />
        </div>

        {/* Bottom interaction hint */}
        <div
          className={`absolute bottom-5 z-20 flex items-center gap-2 text-xs font-mono transition-opacity ${
            isDark ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          <span>Centered Â· Scroll mouse wheel over reel Â· Click to roll Â· Drag vertically</span>
        </div>
      </div>
    </div>
  );
}

KineticReelTextShowcase.customTitle = 'Kinetic Reel Text';
KineticReelTextShowcase.customSlug = 'kinetic-reel-text';
