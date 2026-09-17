import React, { useState } from 'react';
import { Editorial3DOrbitCarousel } from './Editorial3DOrbitCarousel';

export default function Editorial3DOrbitCarouselShowcase() {
  const [autoRotate] = useState(true);
  const [speed] = useState(1.0);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="w-full relative overflow-hidden">
        <Editorial3DOrbitCarousel autoRotate={autoRotate} speed={speed} />
      </div>
    </div>
  );
}

Editorial3DOrbitCarouselShowcase.customTitle = 'Editorial 3D Orbit Carousel';
Editorial3DOrbitCarouselShowcase.customSlug = 'editorial-3d-orbit-carousel';
