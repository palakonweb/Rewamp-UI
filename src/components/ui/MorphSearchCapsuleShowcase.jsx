import React, { useState } from 'react';
import { MorphSearchCapsule } from './MorphSearchCapsule';

export default function MorphSearchCapsuleShowcase() {
  const [selectedColor] = useState('#6D28D9');

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Main Stage */}
      <div
        className="w-full h-[460px] md:h-[500px] rounded-2xl border border-neutral-200/80 dark:border-neutral-800 flex items-center justify-center relative overflow-hidden bg-[#F8F9FA] dark:bg-[#0D0F12]"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #FFFFFF 0%, #F3F4F6 65%, #E5E7EB 100%)',
        }}
      >
        <MorphSearchCapsule color={selectedColor} />
      </div>
    </div>
  );
}

MorphSearchCapsuleShowcase.customTitle = 'Morph Search Capsule';
MorphSearchCapsuleShowcase.customSlug = 'morph-search-capsule';
