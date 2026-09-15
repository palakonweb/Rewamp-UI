import React, { useState } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { FlightpathTOC } from './FlightpathTOC';

export default function FlightpathTOCShowcase() {
  const [activeSection, setActiveSection] = useState('configuration');
  const [autoTour, setAutoTour] = useState(true);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Minimal Controls */}
      <div className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAutoTour(!autoTour)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
          >
            {autoTour ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-500" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-500" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={() => setActiveSection('installation')}
            className="p-1.5 rounded-lg text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
            title="Reset to top"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

        <span className="text-[11px] font-mono text-neutral-400">
          Click any item to fly
        </span>
      </div>

      {/* Main Stage - Pure Light Mode Canvas with Flightpath TOC centered */}
      <div
        className="w-full h-[480px] md:h-[520px] rounded-2xl border border-[#E8E2D5] shadow-sm flex items-center justify-center relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #FAF6ED 65%, #F0EAE0 100%)',
        }}
      >
        <FlightpathTOC
          activeId={activeSection}
          onSelect={(id) => {
            setActiveSection(id);
            setAutoTour(false);
          }}
          autoTour={autoTour}
          tourInterval={2200}
        />
      </div>
    </div>
  );
}

FlightpathTOCShowcase.customTitle = 'Flightpath TOC';
FlightpathTOCShowcase.customSlug = 'flightpath-toc';
