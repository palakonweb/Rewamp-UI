import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Word by word text reveal animation where each word fades and slides up sequentially, staggered timing, clean dark background, warm white text, smooth easing, premium editorial feel`;

const sentence = "Every pixel matters. Every interaction tells a story. Every detail is intentional.";

const wordVariants = {
  hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
  visible: (i) => ({
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }
  })
};

export default function WordByWordTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const words = sentence.split(' ');

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div 
        onClick={() => setKey(k => k + 1)}
        className="text-center max-w-2xl cursor-pointer select-none group"
      >
        <div key={key}>
          <p className="text-[28px] sm:text-[38px] font-bold leading-tight tracking-tight flex flex-wrap justify-center gap-x-[0.35em] transition-transform duration-200 group-hover:scale-[1.01]">
            {words.map((word, i) => {
              const isAccent = i >= words.length - 2;
              return (
                <motion.span 
                  key={i} 
                  custom={i} 
                  variants={wordVariants} 
                  initial="hidden" 
                  animate="visible"
                  className={`inline-block ${
                    isAccent 
                      ? 'text-[#7A6B94] dark:text-[#D4CBE5]' 
                      : 'text-neutral-900 dark:text-[#f0ede8]'
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </p>
        </div>
      </div>

      <p className="mt-8 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click to replay animation
      </p>
    </div>
  );
}
