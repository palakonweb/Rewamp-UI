import React, { useState } from 'react';
import { PerspectiveFlipDeck } from './PerspectiveFlipDeck';

export default function PerspectiveFlipDeckShowcase() {
  const [autoPlay] = useState(true);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden">
        <PerspectiveFlipDeck autoPlay={autoPlay} />
      </div>
    </div>
  );
}
