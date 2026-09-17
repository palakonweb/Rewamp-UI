import React from 'react';
import { KineticLensSidebar } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-2 sm:p-6">
      <div className="w-full max-w-[420px] rounded-[32px] overflow-hidden border border-black/8 dark:border-white/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.5)] bg-black">
        <KineticLensSidebar
          autoCycle={true}
          cycleInterval={2200}
          initialIndex={1}
          align="left"
          className="w-full"
        />
      </div>

      {/* Single-line interaction description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Scroll or hover list to navigate
      </p>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
