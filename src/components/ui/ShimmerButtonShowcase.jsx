import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Shimmer button: clean white pill with a subtle grey border. A narrow soft light streak periodically sweeps diagonally across the surface like light reflecting off a polished surface, repeating every few seconds and accelerating once on click. Lifts 1-2px on hover.`;

export default function ShimmerButtonShowcase() {
  const [copied, setCopied] = useState(false);
  const [burst, setBurst] = useState(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(promptContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="relative w-full h-full flex items-center justify-center p-8">
        <motion.button
          onClick={() => setBurst((b) => b + 1)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="relative px-10 py-4 min-w-[220px] flex items-center justify-center rounded-full overflow-hidden select-none bg-white border border-black/10"
          style={{ boxShadow: '0 6px 18px -12px rgba(0,0,0,0.12)' }}
        >
          <motion.div
            key={burst}
            className="absolute inset-y-0 w-10 pointer-events-none"
            style={{ background: 'linear-gradient(115deg, transparent, rgba(0,0,0,0.06), rgba(255,255,255,0.9), rgba(0,0,0,0.06), transparent)' }}
            initial={{ left: '-20%' }}
            animate={{ left: '120%' }}
            transition={{ duration: burst % 2 === 1 ? 0.35 : 0.85, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.8 }}
          />
          <span className="relative z-10 text-[16px] font-semibold text-noir">Shimmer Button</span>
        </motion.button>
      </div>
</div>
  );
}
