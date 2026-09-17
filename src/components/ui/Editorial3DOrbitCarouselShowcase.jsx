import React, { useState } from 'react';
import { Play, Pause, Sparkles, Orbit } from 'lucide-react';
import { Editorial3DOrbitCarousel } from './Editorial3DOrbitCarousel';

export default function Editorial3DOrbitCarouselShowcase() {
  const [autoRotate, setAutoRotate] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          >
            {autoRotate ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pause Ticking</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-500" />
                <span>Auto-Tick</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-[11px]">
            {[0.5, 1.0, 1.8].map((s) => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono cursor-pointer transition-colors ${
                  speed === s
                    ? 'bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white font-medium shadow-xs'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
                }`}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C1B4D8] animate-pulse" />
          <span>Clock-arm motion · Click card or drag to tick</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <Editorial3DOrbitCarousel autoRotate={autoRotate} speed={speed} />
      </div>
    </div>
  );
}

Editorial3DOrbitCarouselShowcase.customTitle = 'Editorial 3D Orbit Carousel';
Editorial3DOrbitCarouselShowcase.customSlug = 'editorial-3d-orbit-carousel';
