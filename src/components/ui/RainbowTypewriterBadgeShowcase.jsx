import React, { useState } from 'react';
import { RainbowTypewriterBadge } from './RainbowTypewriterBadge';

export default function RainbowTypewriterBadgeShowcase() {
  const [speed, setSpeed] = useState('normal');

  const speedConfigs = {
    slow: { typingSpeed: 160, pauseDelay: 2400 },
    normal: { typingSpeed: 110, pauseDelay: 1800 },
    fast: { typingSpeed: 70, pauseDelay: 1200 },
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
          <span>Typewriter · Rainbow Motion · Blinking Cursor</span>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div
        className="w-full h-[400px] md:h-[460px] rounded-2xl border border-neutral-800/80 flex items-center justify-center relative overflow-hidden bg-[#0D0F12]"
        style={{
          background: 'radial-gradient(circle at 50% 50%, #16181D 0%, #0D0F12 70%, #08090A 100%)',
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

RainbowTypewriterBadgeShowcase.customTitle = 'Rainbow Typewriter Badge';
RainbowTypewriterBadgeShowcase.customSlug = 'rainbow-typewriter-badge';
