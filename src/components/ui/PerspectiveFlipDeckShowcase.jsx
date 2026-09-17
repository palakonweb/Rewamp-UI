import React, { useState } from 'react';
import { PerspectiveFlipDeck } from './PerspectiveFlipDeck';

export default function PerspectiveFlipDeckShowcase() {
  const [autoPlay] = useState(true);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Main Canvas */}
      <div className="w-full relative rounded-2xl overflow-hidden border border-neutral-300/60 dark:border-neutral-800 shadow-xl">
        <PerspectiveFlipDeck autoPlay={autoPlay} />
      </div>
    </div>
  );
}
