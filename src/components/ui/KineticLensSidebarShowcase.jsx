import React, { useState } from 'react';
import { Play, Pause, MousePointerClick, AlignCenter, AlignLeft } from 'lucide-react';
import { KineticLensSidebar, DEFAULT_LENS_ITEMS } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle, setAutoCycle] = useState(true);
  const [selectedItem, setSelectedItem] = useState(DEFAULT_LENS_ITEMS[0]);
  const [align, setAlign] = useState('center');

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-950/85 border border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Alignment Toggle */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setAlign('center')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                align === 'center'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Centered text"
            >
              <AlignCenter className="w-3.5 h-3.5 text-[#C1B4D8]" />
              <span>Center</span>
            </button>
            <button
              onClick={() => setAlign('left')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                align === 'left'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Left aligned text"
            >
              <AlignLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span>Left</span>
            </button>
          </div>

          {/* Auto-Scroll Toggle */}
          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              autoCycle
                ? 'bg-neutral-900 text-white border border-[#C1B4D8]/40'
                : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:bg-neutral-850'
            }`}
          >
            {autoCycle ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#C1B4D8]" />
                <span>Auto-Scroll Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-400" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#C1B4D8] animate-pulse" />
            <span className="text-neutral-200 font-sans font-medium">
              {selectedItem?.label || 'Buttons'}
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-[11px] text-neutral-500">
            Centered text Â· Auto-scrolling
          </span>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="w-full min-h-[520px] rounded-3xl border border-neutral-800/80 overflow-hidden bg-black flex items-center justify-center relative shadow-2xl">
        <div className="w-full h-[520px] flex flex-col items-center justify-center relative bg-black">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, #0d1020 0%, #000000 75%)',
            }}
          />

          <KineticLensSidebar
            autoCycle={autoCycle}
            cycleInterval={2000}
            initialIndex={0}
            align={align}
            onSelect={(item) => setSelectedItem(item)}
            className="z-10"
          />

          <div className="absolute bottom-4 flex items-center gap-2 text-xs text-neutral-500 font-mono pointer-events-none z-30">
            <MousePointerClick className="w-3.5 h-3.5 text-neutral-400" />
            <span>Auto-scrolling Â· Wheel or drag to scrub Â· Click item to focus</span>
          </div>
        </div>
      </div>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
