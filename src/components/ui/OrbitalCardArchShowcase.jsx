import React, { useState } from 'react';
import { Layers, LayoutGrid, RotateCw } from 'lucide-react';
import { OrbitalCardArch } from './OrbitalCardArch';

export default function OrbitalCardArchShowcase() {
  const [isStacked, setIsStacked] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-white/80 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsStacked(!isStacked)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
              isStacked
                ? 'bg-[#EC5E27] text-white shadow-md shadow-[#EC5E27]/25'
                : 'bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200'
            }`}
          >
            {isStacked ? (
              <>
                <Layers className="w-3.5 h-3.5" />
                <span>Stacked Center</span>
              </>
            ) : (
              <>
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Orbital Arch</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
          <span>Click cards or toggle button to collapse</span>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <OrbitalCardArch
          isStacked={isStacked}
          onCardClick={() => setIsStacked(!isStacked)}
        />
      </div>
    </div>
  );
}
