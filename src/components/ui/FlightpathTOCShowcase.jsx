import React, { useState } from 'react';
import { FlightpathTOC } from './FlightpathTOC';

export default function FlightpathTOCShowcase() {
  const [activeSection, setActiveSection] = useState('configuration');
  const [autoTour, setAutoTour] = useState(true);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
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
