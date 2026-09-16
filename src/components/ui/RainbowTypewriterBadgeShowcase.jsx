import React, { useState } from 'react';
import { RainbowTypewriterBadge } from './RainbowTypewriterBadge';

export default function RainbowTypewriterBadgeShowcase() {
  const [speed, setSpeed] = useState('normal');

  const speedConfigs = {
    slow: { typingSpeed: 150, pauseDelay: 2200 },
    normal: { typingSpeed: 100, pauseDelay: 1700 },
    fast: { typingSpeed: 60, pauseDelay: 1100 },
  };

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Controls Bar */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-medium">Speed:</span>
          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs font-mono">
            {['slow', 'normal', 'fast'].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2.5 py-1 rounded capitalize cursor-pointer transition-colors ${
                  speed === s
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
          <span>Text Only · Rainbow Cursor · Spotlight Flare</span>
        </div>
      </div>

      {/* Main Showcase Stage (Clean dark canvas, no rectangle box around the text) */}
      <div
        className="w-full h-[400px] md:h-[460px] rounded-2xl border border-neutral-800/80 flex items-center justify-center relative overflow-hidden bg-black shadow-2xl"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #0d0f14 0%, #000000 80%)',
        }}
      >
        <RainbowTypewriterBadge
          words={['Reality', 'Design', 'Purrform', 'Future', 'Creation']}
          typingSpeed={speedConfigs[speed].typingSpeed}
          pauseDelay={speedConfigs[speed].pauseDelay}
        />
      </div>
    </div>
  );
}

RainbowTypewriterBadgeShowcase.customTitle = 'Rainbow Typewriter Text';
RainbowTypewriterBadgeShowcase.customSlug = 'rainbow-typewriter-badge';
