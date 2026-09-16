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
 * ContributionActivitySkeleton
 * Matches the exact footprint and inner structure of the 7x53 contribution heatmap:
 * - Glass frame container with exact padding and dimensions (max-w-5xl)
 * - Header title & streak placeholders
 * - Pill-shaped placeholder top-right for activity widget
 * - 7 rows x 53 cols grid of rounded squares
 * - Month labels row & weekday labels column
 * - Bottom tooltip status bar
 * Zero Layout Shift (CLS = 0).
 */
export function ContributionActivitySkeleton({ className = '' }) {
  // 53 columns x 7 rows placeholder grid
  const cols = Array.from({ length: 53 });
  const rows = Array.from({ length: 7 });

  return (
    <div
      className={`relative w-full max-w-5xl mx-auto p-4 sm:p-8 rounded-[36px] bg-gradient-to-br from-violet-100/40 via-fuchsia-50/30 to-white/60 dark:from-neutral-900/40 dark:via-neutral-900/20 dark:to-neutral-950/60 select-none overflow-hidden ${className}`}
      style={{
        boxShadow: '0 20px 60px -15px rgba(109, 40, 199, 0.08)',
      }}
    >
      <div className="relative bg-white/40 dark:bg-neutral-900/50 backdrop-blur-xl border border-white/60 dark:border-white/10 rounded-3xl p-6 sm:p-8">
        {/* Header Row: Title & Streak status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pr-36 sm:pr-48">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <Skeleton className="w-44 h-6 rounded-lg" />
              <Skeleton className="w-20 h-5 rounded-full" />
            </div>
            <Skeleton className="w-64 h-3.5 rounded-md mt-1" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="w-28 h-8 rounded-xl" />
          </div>
        </div>

        {/* Top-Right Activity Widget Pill Placeholder */}
        <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-10">
          <Skeleton className="w-32 h-10 rounded-full" />
        </div>

        {/* Contribution Graph Heatmap Area */}
        <div className="overflow-x-auto pb-3 pt-2 scrollbar-none">
          <div className="min-w-[760px]">
            {/* Month labels row */}
            <div className="flex gap-4 mb-2 pl-9">
              {Array.from({ length: 12 }).map((_, i) => (
                <Skeleton key={i} className="w-8 h-3 rounded-xs" />
              ))}
            </div>

            {/* Day grid container with weekday labels */}
            <div className="flex items-start gap-2">
              {/* Weekday labels */}
              <div className="flex flex-col justify-between py-1 h-[95px]">
                <Skeleton className="w-5 h-2.5 rounded-xs" />
                <Skeleton className="w-5 h-2.5 rounded-xs" />
                <Skeleton className="w-5 h-2.5 rounded-xs" />
              </div>

              {/* Heatmap 7x53 grid of muted rounded squares */}
              <div className="flex gap-[3px]">
                {cols.map((_, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-[3px]">
                    {rows.map((_, rowIdx) => (
                      <Skeleton
                        key={rowIdx}
                        className="w-[11px] h-[11px] rounded-[2.5px] bg-neutral-200/70 dark:bg-neutral-800/80"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer info row */}
        <div className="mt-5 pt-4 border-t border-white/60 dark:border-white/10 flex items-center justify-between">
          <Skeleton className="w-48 h-4 rounded-md" />
          <Skeleton className="w-28 h-4 rounded-md" />
        </div>
      </div>
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
