import React, { useState } from 'react';
import { Play, Pause, Layers, LayoutGrid } from 'lucide-react';
import { DiagonalCardStack } from './DiagonalCardStack';

export default function DiagonalCardStackShowcase() {
  const [isStacked, setIsStacked] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [speed, setSpeed] = useState(1.0);

  const cardsData = [
    { id: '1', title: 'Stack 01', brand: 'rico.', badge: '01' },
    { id: '2', title: 'Stack 01', brand: 'rico.', badge: '02' },
    { id: '3', title: 'Stack 01', brand: 'rico.', badge: '03' },
    { id: '4', title: 'Stack 01', brand: 'rico.', badge: '04' },
    { id: '5', title: 'Stack 01', brand: 'rico.', badge: '05' },
    { id: '6', title: 'Stack 01', brand: 'rico.', badge: '06' },
    { id: '7', title: 'Stack 01', brand: 'rico.', badge: '07' },
    { id: '8', title: 'Stack 01', brand: 'rico.', badge: '08' },
    { id: '9', title: 'Stack 01', brand: 'rico.', badge: '09' },
    { id: '10', title: 'Stack 01', brand: 'rico.', badge: '10' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Interactive Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Mode Toggle Button */}
          <button
            onClick={() => setIsStacked(!isStacked)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              isStacked
                ? 'bg-[#EC5E27] text-white shadow-md shadow-[#EC5E27]/25'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
            }`}
          >
            {isStacked ? (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span>Stacked Deck</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Diagonal Stream</span>
              </>
            )}
          </button>

          {/* Play / Pause Toggle */}
          {!isStacked && (
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
            >
              {autoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                  <span>Flow</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Speed & Interactive Hint */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
            <span>Click card to stack · Drag to scrub</span>
          </div>

          {!isStacked && (
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
          )}
        </div>
      </div>

      {/* Main Animation Stage */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <DiagonalCardStack
          cards={cardsData}
          isStacked={isStacked}
          autoPlay={autoPlay}
          speed={speed}
          onCardClick={() => setIsStacked(!isStacked)}
        />
      </div>
    </div>
  );
}
