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
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: '#0f1117' }}>

        <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(240,237,232,0.3)' }}>Word by Word</p>

        <div key={key} className="text-center max-w-xl">
          <p className="text-[26px] sm:text-[34px] font-bold leading-tight tracking-tight flex flex-wrap justify-center gap-x-[0.35em]">
            {words.map((word, i) => (
              <motion.span key={i} custom={i} variants={wordVariants} initial="hidden" animate="visible"
                style={{ color: '#f0ede8', display: 'inline-block' }}>
                {word}
              </motion.span>
            ))}
          </p>
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setKey(k => k + 1)}
          className="mt-8 px-5 py-2 rounded-full text-[11px] font-medium"
          style={{ background: 'rgba(139,126,200,0.1)', color: '#b8a9d4', border: '1px solid rgba(139,126,200,0.2)' }}>
          Replay
        </motion.button>
      </div>
</div>
  );
}
