import React, { useState } from 'react';
import { MousePointerClick } from 'lucide-react';
import { KineticLensSidebar } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle] = useState(true);
  const [align] = useState('center');

  return (
    <div className="w-full flex flex-col items-center gap-4">
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
