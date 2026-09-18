import React from 'react';
import { TextHoverEffect } from '../TextHoverEffect';

export function PurrformReveal() {
  return (
    <section
      className="relative w-full py-4 md:py-6 overflow-hidden flex items-center justify-center bg-[var(--bg)]"
      style={{ boxShadow: 'inset 0 20px 40px -10px rgba(139, 0, 0, 0.08)' }}
    >
      <div className="w-full max-w-7xl mx-auto px-4 h-[clamp(100px,15vw,240px)]">
        <TextHoverEffect text="REWAMP UI" />
      </div>
    </section>
  );
}
