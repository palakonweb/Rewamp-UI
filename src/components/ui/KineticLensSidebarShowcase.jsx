import React, { useState } from 'react';
import { Play, Pause, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { KineticLensSidebar } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle, setAutoCycle] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Minimal Top Controls */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors cursor-pointer"
          >
            {autoCycle ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pause Auto-Wheel</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-500" />
                <span>Auto-Wheel</span>
              </>
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
          <span>Scroll mouse wheel · Drag vertically · Click to focus</span>
        </div>
      </div>

      {/* Main Stage */}
      <div
        className="w-full h-[580px] md:h-[620px] rounded-2xl border border-neutral-800/80 flex items-center justify-center relative overflow-hidden bg-[#060709]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #101216 0%, #060709 70%, #030405 100%)',
        }}
      >
        <KineticLensSidebar
          autoCycle={autoCycle}
          cycleInterval={2600}
          onSelect={(item) => setSelectedItem(item)}
        />
      </div>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
