// perf: shared on-brand lilac shimmer primitive and zero-CLS per-component skeletons
import React from 'react';

/**
 * Shared Skeleton primitive
 * Pulsing block styled with brand tokens and subtle lilac shimmer sweep:
 * linear-gradient(90deg, transparent, rgba(212,203,229,0.15), transparent) ~1.5s ease-in-out infinite.
 */
export function Skeleton({ className = '', style = {}, children, ...props }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-[var(--elevated)] ${className}`}
      style={{
        ...style,
      }}
      {...props}
    >
      {/* Brand Lilac Shimmer Sweep */}
      <div
        className="pointer-events-none absolute inset-0 -translate-x-full animate-shimmer"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212, 203, 229, 0.18) 50%, transparent 100%)',
        }}
      />
      {children}
    </div>
  );
}

/**
 * GlowTextChipSkeleton
 * A plain rounded-rect block matching the chip's width/height:
 * No shimmer needed on the glow itself, just the base shape.
 */
export function GlowTextChipSkeleton({ className = '' }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <Skeleton className="w-44 h-11 rounded-full border border-white/10 shadow-sm" />
    </div>
  );
}

/**
 * FolderCardSkeleton
 * Matches the folder's exact footprint (w-[340px] sm:w-[390px] h-[260px] sm:h-[290px]):
 * Simple folder-shaped rounded block with top tab and body cut.
 */
export function FolderCardSkeleton({ className = '' }) {
  return (
    <div
      className={`relative w-[340px] sm:w-[390px] h-[260px] sm:h-[290px] flex items-end justify-center select-none ${className}`}
    >
      {/* Folder Back Tab & Shell */}
      <Skeleton className="absolute inset-0 rounded-[32px] border border-white/10">
        <div className="absolute top-0 left-0 w-[42%] h-8 rounded-t-[18px] bg-[var(--elevated)] -translate-y-2" />
      </Skeleton>

      {/* Internal preview paper hints */}
      <div className="absolute inset-x-6 top-6 bottom-16 flex items-center justify-center">
        <Skeleton className="w-[78%] h-[80%] rounded-[20px] opacity-40" />
      </div>

      {/* Folder Front Flap */}
      <Skeleton className="relative z-10 w-full h-[74%] rounded-[28px] border-t border-white/20" />
    </div>
  );
}

/**
 * Generic fallback CardSkeleton for anything else,
 * sized to the card's fixed aspect ratio / container footprint.
 */
export function CardSkeleton({ className = '', style = {} }) {
  return (
    <div
      className={`w-full max-w-3xl h-[380px] sm:h-[420px] rounded-[32px] p-6 flex flex-col justify-between border border-[var(--border)] bg-[var(--surface)] shadow-sm select-none ${className}`}
      style={style}
    >
      {/* Top Header Placeholder */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-2xl" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="w-32 h-4 rounded-md" />
            <Skeleton className="w-20 h-3 rounded-xs" />
          </div>
        </div>
        <Skeleton className="w-16 h-7 rounded-xl" />
      </div>

      {/* Center Graphic Placeholder */}
      <div className="w-full flex-1 my-6 flex items-center justify-center">
        <Skeleton className="w-48 h-32 rounded-2xl opacity-60" />
      </div>

      {/* Bottom Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
        <Skeleton className="w-24 h-4 rounded-md" />
        <Skeleton className="w-20 h-8 rounded-xl" />
      </div>
    </div>
  );
}

export default Skeleton;
