import React, { useState } from 'react';
import { KineticLensSidebar } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle] = useState(true);
  const [align] = useState('center');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full h-full overflow-hidden flex items-center justify-center relative">
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <KineticLensSidebar
            autoCycle={autoCycle}
            cycleInterval={2000}
            initialIndex={0}
            align={align}
            className="z-10"
          />
        </div>
      </div>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
