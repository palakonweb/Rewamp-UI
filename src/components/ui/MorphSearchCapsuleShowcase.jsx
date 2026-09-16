import React, { useState } from 'react';
import { MorphSearchCapsule } from './MorphSearchCapsule';

export default function MorphSearchCapsuleShowcase() {
  const [selectedColor, setSelectedColor] = useState('#6D28D9');

  const colorOptions = [
    { name: 'Royal Purple', value: '#6D28D9' },
    { name: 'Purrform Orange', value: '#EC5E27' },
    { name: 'Ocean Indigo', value: '#2563EB' },
    { name: 'Emerald', value: '#059669' },
  ];

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Top Controls Bar */}
      <div className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/90 dark:bg-neutral-900/90 border border-neutral-200/80 dark:border-neutral-800 shadow-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-medium">Color:</span>
          <div className="flex items-center gap-1.5">
            {colorOptions.map((c) => (
              <button
                key={c.value}
                onClick={() => setSelectedColor(c.value)}
                className={`w-5 h-5 rounded-full cursor-pointer transition-transform ${selectedColor === c.value ? 'scale-125 ring-2 ring-neutral-400 ring-offset-2' : 'hover:scale-110'
                  }`}
                style={{ background: c.value }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-500 dark:text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-[#EC5E27] animate-pulse" />
          <span>Click pill to trigger icon turn & typing cursor</span>
        </div>
      </div>

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
