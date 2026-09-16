import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  text?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  variant?: 'dark' | 'purrform' | 'light';
  shimmerDuration?: number;
  shimmerInterval?: number;
  className?: string;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  text = 'View Designs',
  icon = <ArrowRight className="w-[17px] h-[17px] stroke-[2.2]" />,
  showIcon = true,
  variant = 'dark',
  shimmerDuration = 1.2,
  shimmerInterval = 3,
  className = '',
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Variant styling configurations
  const variantStyles = {
    dark: {
      button: 'bg-[#222225] text-white border-white/10 shadow-[0_4px_18px_-2px_rgba(0,0,0,0.35),0_1px_4px_rgba(0,0,0,0.2)]',
      innerGlow: 'inset 0 1px 1px 0 rgba(255,255,255,0.18), inset 0 -1px 1px 0 rgba(0,0,0,0.3)',
      sheen: 'linear-gradient(112deg, transparent 0%, rgba(255,255,255,0.01) 18%, rgba(255,255,255,0.2) 36%, rgba(255,255,255,0.85) 49%, rgba(255,255,255,0.85) 51%, rgba(255,255,255,0.2) 64%, rgba(255,255,255,0.01) 82%, transparent 100%)',
      textColor: 'text-white',
      hoverBorder: 'rgba(255,255,255,0.22)',
    },
    purrform: {
      button: 'bg-[#1F1F1F] text-[#FFFDF2] border-[#EC5E27]/30 shadow-[0_4px_20px_-2px_rgba(236,94,39,0.2),0_1px_4px_rgba(0,0,0,0.25)]',
      innerGlow: 'inset 0 1px 1px 0 rgba(251,162,122,0.35), inset 0 -1px 1px 0 rgba(0,0,0,0.4)',
      sheen: 'linear-gradient(112deg, transparent 0%, rgba(251,162,122,0.02) 18%, rgba(236,94,39,0.25) 36%, rgba(255,253,242,0.9) 49%, rgba(255,253,242,0.9) 51%, rgba(236,94,39,0.25) 64%, rgba(251,162,122,0.02) 82%, transparent 100%)',
      textColor: 'text-[#FFFDF2]',
      hoverBorder: 'rgba(236,94,39,0.5)',
    },
    light: {
      button: 'bg-[#FFFDF2] text-[#1F1F1F] border-[#D9D9D6] shadow-[0_4px_16px_-2px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.04)]',
      innerGlow: 'inset 0 1px 1px 0 rgba(255,255,255,0.9), inset 0 -1px 1px 0 rgba(0,0,0,0.06)',
      sheen: 'linear-gradient(112deg, transparent 0%, rgba(0,0,0,0.01) 18%, rgba(255,255,255,0.5) 36%, rgba(255,255,255,0.95) 49%, rgba(255,255,255,0.95) 51%, rgba(255,255,255,0.5) 64%, rgba(0,0,0,0.01) 82%, transparent 100%)',
      textColor: 'text-[#1F1F1F]',
      hoverBorder: 'rgba(236,94,39,0.35)',
    },
  };

  const currentVariant = variantStyles[variant] || variantStyles.dark;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setClickCount((c) => c + 1);
    onClick?.(e);
  };

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 450, damping: 26 }}
      className={`group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full border text-[15px] font-medium select-none overflow-hidden cursor-pointer transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-[#EC5E27] focus-visible:ring-offset-2 ${currentVariant.button} ${className}`}
      style={{
        boxShadow: `${currentVariant.button.includes('shadow') ? '' : ''}`,
      }}
      {...props}
    >
      {/* Subtle Inner Highlight Rim for Tactile Pebble/Glass Feel */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: currentVariant.innerGlow }}
      />

      {/* Primary Periodic / Looping Shimmer Sweep */}
      <motion.div
        key={`loop-${clickCount}`}
        className="absolute top-0 bottom-0 w-[110px] pointer-events-none -skew-x-[22deg]"
        style={{
          background: currentVariant.sheen,
          filter: 'blur(0.5px)',
        }}
        initial={{ left: '-120%' }}
        animate={{ left: '160%' }}
        transition={{
          repeat: Infinity,
          repeatDelay: shimmerInterval,
          duration: shimmerDuration,
          ease: [0.4, 0, 0.2, 1],
        }}
      />

      {/* Accelerated Interactive Hover Sweep */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            key={`hover-${clickCount}`}
            className="absolute top-0 bottom-0 w-[130px] pointer-events-none -skew-x-[22deg]"
            style={{
              background: currentVariant.sheen,
              filter: 'blur(0.5px)',
            }}
            initial={{ left: '-120%' }}
            animate={{ left: '160%' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </AnimatePresence>

      {/* Button Content */}
      <span className={`relative z-10 tracking-tight transition-colors duration-150 ${currentVariant.textColor}`}>
        {children || text}
      </span>

      {showIcon && icon && (
        <motion.span
          className="relative z-10 flex items-center justify-center"
          animate={{ x: isHovered ? 3 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
          {icon}
        </motion.span>
      )}
    </motion.button>
  );
};

export default ShimmerButton;
