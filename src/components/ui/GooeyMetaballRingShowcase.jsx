import React from 'react';
import { GooeyMetaballRing } from './GooeyMetaballRing';

export default function GooeyMetaballRingShowcase() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 select-none">
      <div className="text-black dark:text-white flex items-center justify-center">
        <GooeyMetaballRing
          size={380}
          speed={1.0}
          color="currentColor"
        />
      </div>
    </div>
  );
}

GooeyMetaballRingShowcase.customTitle = 'Gooey Metaball Ring';
GooeyMetaballRingShowcase.customSlug = 'gooey-metaball-ring';
