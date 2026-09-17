import React, { useState } from 'react';
import { KineticReelText, DEFAULT_REEL_ITEMS } from './KineticReelText';

export default function KineticReelTextShowcase() {
  const [theme] = useState('dark');
  const [prefix] = useState('we make');
  const [autoPlay] = useState(true);

  const isDark = theme === 'dark';

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Stage: Centered Reel */}
      <div
        className={`w-full min-h-[280px] md:min-h-[300px] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 shadow-2xl ${
          isDark
            ? 'bg-black text-white border border-neutral-800/80'
            : 'bg-[#FFFDF2] text-[#1F1F1F] border border-[#D9D9D6]'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(25, 28, 45, 0.45) 0%, #000000 75%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(236, 94, 39, 0.06) 0%, transparent 70%)',
          }}
        />

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
