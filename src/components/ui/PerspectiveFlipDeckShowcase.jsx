import React, { useState } from 'react';
import { Play, Pause, ChevronRight, RotateCw } from 'lucide-react';
import { PerspectiveFlipDeck } from './PerspectiveFlipDeck';

export default function PerspectiveFlipDeckShowcase() {
  const [autoPlay, setAutoPlay] = useState(true);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          >
            {autoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pause Auto-Flip</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-500" />
                <span>Auto-Flip</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
          <span>Click deck to flip next card</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <PerspectiveFlipDeck autoPlay={autoPlay} />
      </div>
    </div>
  );
}
