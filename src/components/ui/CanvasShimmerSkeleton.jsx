import React from 'react';

/**
 * CanvasShimmerSkeleton
 * A brief, quiet placeholder shown while a component streams in - a flat
 * theme-matched fill with a small static brand mark, no sweeping shimmer.
 */
export default function CanvasShimmerSkeleton({ theme = 'dark', className = '' }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10 ${
        isDark ? 'bg-[#141218]' : 'bg-[#EAEAEA]'
      } ${className}`}
    >
      {/* Minimal Elegant Floating Indicator (Zero clumsy white template boxes) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xs">
        <img src="/logos/logo.svg" alt="RewampUI" className="w-3.5 h-3.5 object-contain opacity-85" />
      </div>
    </div>
  );
}
