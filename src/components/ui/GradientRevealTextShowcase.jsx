import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Gradient reveal text animation where large heading text uses an animated gradient as fill color, shifting through soft violet, cyan, and rose hues, smooth continuous loop, dark background, premium typography`;

function GradientText({ children, className }) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: 'linear-gradient(90deg, #b8a9d4, #7ec8c8, #c9918a, #8b7ec8, #b8a9d4)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}

export default function GradientRevealTextShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: '#0a0a0a' }}>

        <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(240,237,232,0.3)' }}>Gradient Reveal</p>

        <div className="text-center max-w-2xl">
          <h2 className="text-[36px] sm:text-[52px] font-bold leading-[1.05] tracking-tight">
            <GradientText>Design at the speed of thought.</GradientText>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[13px] mt-6 leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(240,237,232,0.35)' }}
          >
            A continuously shifting gradient fills your text, creating a living, breathing heading that captures attention.
          </motion.p>
        </div>
      </div>
</div>
  );
}
