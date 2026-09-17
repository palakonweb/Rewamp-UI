import React, { useState } from 'react';
import { OrbitalCardArch } from './OrbitalCardArch';

export default function OrbitalCardArchShowcase() {
  const [isStacked, setIsStacked] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden">
        <OrbitalCardArch
          isStacked={isStacked}
          onCardClick={() => setIsStacked(!isStacked)}
        />
      </div>
    </div>
  );
}
