import React from 'react';
import { KineticLensSidebar } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  return (
    <div className="w-full h-full flex items-center justify-center p-2 sm:p-6">
      <div className="w-full max-w-[420px] flex items-center justify-center">
        <KineticLensSidebar
          autoCycle={true}
          cycleInterval={2200}
          initialIndex={1}
          align="left"
          className="w-full"
        />
      </div>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
