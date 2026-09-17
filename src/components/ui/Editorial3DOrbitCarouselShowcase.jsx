import React, { useState } from 'react';
import { Editorial3DOrbitCarousel } from './Editorial3DOrbitCarousel';

export default function Editorial3DOrbitCarouselShowcase() {
  const [autoRotate] = useState(true);
  const [speed] = useState(1.0);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <Editorial3DOrbitCarousel autoRotate={autoRotate} speed={speed} />
      </div>
    </div>
  );
}

Editorial3DOrbitCarouselShowcase.customTitle = 'Editorial 3D Orbit Carousel';
Editorial3DOrbitCarouselShowcase.customSlug = 'editorial-3d-orbit-carousel';
