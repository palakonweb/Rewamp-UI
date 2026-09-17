import React, { useState } from 'react';
import { MorphSearchCapsule } from './MorphSearchCapsule';

export default function MorphSearchCapsuleShowcase() {
  const [selectedColor] = useState('#6D28D9');

  return (
    <div className="w-full h-full flex flex-col items-center gap-6">
      {/* Main Stage */}
      <div
        className="w-full h-full flex items-center justify-center relative"
      >
        <MorphSearchCapsule color={selectedColor} />
      </div>
    </div>
  );
}

MorphSearchCapsuleShowcase.customTitle = 'Morph Search Capsule';
MorphSearchCapsuleShowcase.customSlug = 'morph-search-capsule';
