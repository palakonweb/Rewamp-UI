import React, { useState } from 'react';
import { FlightpathTOC } from './FlightpathTOC';

export default function FlightpathTOCShowcase() {
  const [activeSection, setActiveSection] = useState('configuration');
  const [autoTour, setAutoTour] = useState(true);

  return (
    <div className="w-full flex flex-col items-center gap-4">
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
