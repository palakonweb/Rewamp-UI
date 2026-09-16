// perf: memoized export with React.memo, hardware-accelerated transform/opacity animations
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export interface GlowTextChipProps {
  label?: string;
  icon?: boolean;
  className?: string;
  onClick?: () => void;
}

export const GlowTextChip = memo(function GlowTextChip({
  label = 'AI Assistant',
  icon = true,
  className = '',
  onClick,
}: GlowTextChipProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none ${className}`}
    >
      {/* Background Ambient Glow Underlay */}
      <div
        className="absolute -inset-1 rounded-full opacity-60 blur-md pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, rgba(212, 203, 229, 0.6) 0%, rgba(193, 180, 216, 0.3) 100%)',
        }}
      />

      {/* Pill Body matching GlowTextChipSkeleton (w-44 h-11) */}
      <div className="relative w-44 h-11 px-4 rounded-full flex items-center justify-center gap-2 bg-[var(--surface)] dark:bg-[#1C1A22] border border-[var(--border)] dark:border-white/15 shadow-sm text-xs font-semibold text-[var(--text-primary)] transition-colors">
        {icon && (
          <Sparkles className="w-3.5 h-3.5 text-[#9C8EB8] dark:text-[#D4CBE5]" />
        )}
        <span className="tracking-wide">{label}</span>
      </div>
    </motion.div>
  );
});

export default GlowTextChip;
