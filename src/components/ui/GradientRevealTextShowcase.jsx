import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Gradient reveal text animation where large heading text uses an animated gradient as fill color, shifting through soft violet, cyan, and rose hues, smooth continuous loop, dark background, premium typography`;

function GradientText({ children, className }) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage: 'linear-gradient(90deg, #7A6B94, #9C8EB8, #D4CBE5, #FAF8FD, #C1B4D8, #7A6B94)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.span>
  );
}

export default function GradientRevealTextShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none">
      <div className="text-center max-w-3xl">
        <h2 className="text-[38px] sm:text-[58px] font-extrabold leading-[1.05] tracking-tight">
          <GradientText>Design at the speed of thought.</GradientText>
        </h2>
      </div>
    </div>
  );
}
