import React, { useState } from 'react';
import { Editorial3DOrbitCarousel } from './Editorial3DOrbitCarousel';

export default function Editorial3DOrbitCarouselShowcase() {
  const [autoRotate] = useState(true);
  const [speed] = useState(1.0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-2 sm:p-6 select-none">
      <div className="w-full max-w-5xl relative overflow-visible flex items-center justify-center">
        <Editorial3DOrbitCarousel
          autoRotate={autoRotate}
          autoTick={true}
          speed={speed}
          tickInterval={1800}
          pauseOnHover={false}
        />
      </div>
    </div>
  );
}

Editorial3DOrbitCarouselShowcase.customTitle = 'Editorial 3D Orbit Carousel';
Editorial3DOrbitCarouselShowcase.customSlug = 'editorial-3-d-orbit-carousel';
