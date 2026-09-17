import React, { useState } from 'react';
import { OrbitalCardArch } from './OrbitalCardArch';

export default function OrbitalCardArchShowcase() {
  const [isStacked, setIsStacked] = useState(false);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <OrbitalCardArch
          isStacked={isStacked}
          onCardClick={() => setIsStacked(!isStacked)}
        />
      </div>
    </div>
  );
}
