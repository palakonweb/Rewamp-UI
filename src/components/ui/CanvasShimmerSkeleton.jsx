import React from 'react';
import { motion } from 'framer-motion';

/**
 * CanvasShimmerSkeleton
 * Matches Recording 2026-09-16 213029.mp4:
 * A rich, chromatic diagonal shimmer sheen sweeping across the main canvas.
 * Perfectly calibrated for both Light and Dark modes using RewampUI brand lavender/peach tokens.
 */
export default function CanvasShimmerSkeleton({ theme = 'dark', className = '' }) {
  const isDark = theme === 'dark';

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-10 ${
        isDark ? 'bg-[#141218]' : 'bg-[#EAEAEA]'
      } ${className}`}
    >
      {/* Sweeping Diagonal Chromatic Shimmer Band */}
      <motion.div
        initial={{ x: '-120%', y: '-40%' }}
        animate={{ x: '120%', y: '40%' }}
        transition={{
          repeat: Infinity,
          duration: 1.65,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] pointer-events-none"
        style={{
          background: isDark
            ? 'linear-gradient(118deg, transparent 22%, rgba(42, 36, 52, 0.05) 32%, rgba(156, 142, 184, 0.16) 42%, rgba(212, 203, 229, 0.38) 48%, rgba(255, 255, 255, 0.6) 51%, rgba(212, 203, 229, 0.32) 55%, rgba(193, 180, 216, 0.14) 62%, transparent 74%)'
            : 'linear-gradient(118deg, transparent 20%, rgba(241, 230, 215, 0.25) 30%, rgba(251, 162, 122, 0.32) 39%, rgba(212, 203, 229, 0.55) 47%, rgba(255, 255, 255, 0.95) 51%, rgba(212, 203, 229, 0.45) 56%, rgba(251, 162, 122, 0.25) 64%, transparent 76%)',
          transform: 'rotate(-8deg)',
        }}
      />

      {/* Secondary Ambient Soft Pulse */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(212, 203, 229, 0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(212, 203, 229, 0.22) 0%, transparent 70%)',
        }}
      />

      {/* Minimal Elegant Floating Indicator (Zero clumsy white template boxes) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xs">
        <img src="/logos/logo.svg" alt="RewampUI" className="w-3.5 h-3.5 object-contain animate-pulse opacity-85" />
      </div>
    </div>
  );
}
