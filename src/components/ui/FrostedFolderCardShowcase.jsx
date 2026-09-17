import React, { useState } from 'react';
import FrostedFolderCard from './FrostedFolderCard';

export default function FrostedFolderCardShowcase() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="relative w-full h-full flex flex-col items-center justify-center p-6 sm:p-14 select-none"
      >
        {/* Subtle top indicator */}
        <div className="absolute top-6 left-7 flex items-center gap-2 z-10">
          <div className="w-2 h-2 rounded-full bg-[#C1B4D8]" />
          <span className="text-[11px] font-mono tracking-widest text-black/55 uppercase font-semibold">
            Tactile 3D · Obsidian & Smoked Acrylic
          </span>
        </div>

        <div className="absolute top-6 right-7 hidden sm:flex items-center gap-2 z-10 text-[11px] font-medium text-black/50">
          <span>Hover or click folder to burst the photos into a collage</span>
        </div>

        {/* ── Frosted Folder Component ── */}
        <div className="relative z-10 my-auto py-6">
          <FrostedFolderCard hovered={isOpen || undefined} />
        </div>

        {/* Bottom Interactive Toggle Bar */}
        <div className="relative z-10 flex items-center gap-3 mt-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all bg-black/15 hover:bg-black/25 text-black/80 border border-black/10 shadow-xs cursor-pointer active:scale-95"
          >
            {isOpen ? 'Close Folder' : 'Open Collage'}
          </button>
          <span className="text-[11px] text-black/45 tracking-wide">
            Spring physics · Staggered burst · macOS-style folder reveal
          </span>
        </div>
      </div>
    </div>
  );
}
