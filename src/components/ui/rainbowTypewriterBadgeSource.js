export const rainbowTypewriterBadgePrompt = `Create a clean, minimalist text-only typewriter effect with a rainbow blinking cursor and an animated chromatic spotlight emitting from the cursor over the text.

Requirements:
- No rectangle, container card, or badge background: strictly the text floating directly on the canvas.
- Rhythmic typewriter animation typing words, pausing, and deleting in a seamless loop.
- Rainbow blinking cursor with a vibrant vertical chromatic gradient and glowing bloom.
- Chromatic spotlight emitting directly from the cursor position backward over the typed letters with subtle organic breathing motion.
- Modern sans-serif bold typography with tight tracking.`;

export const rainbowTypewriterBadgeCode = `import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function RainbowTypewriterBadge({
  words = ['Reality', 'Design', 'Purrform', 'Future', 'Creation'],
  typingSpeed = 110,
  deletingSpeed = 55,
  pauseDelay = 1800,
  className = '',
  fontSize = 'text-4xl sm:text-6xl md:text-7xl',
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[wordIndex % words.length];
    let timer;

    if (!isDeleting) {
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed + (Math.random() * 20 - 10));
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDelay);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <div className={\`relative inline-flex items-center justify-center select-none \${className}\`}>
      <div className="relative flex items-center">
        {/* Rainbow spotlight emitting from cursor over the text */}
        <motion.div
          animate={{
            opacity: [0.7, 0.95, 0.7],
            scaleX: [0.95, 1.05, 0.95],
            scaleY: [0.92, 1.08, 0.92],
          }}
          transition={{
            duration: 2.6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            width: '280px',
            maxWidth: '120%',
            height: '140px',
            transformOrigin: 'right center',
            background:
              'radial-gradient(ellipse 240px 75px at 100% 50%, rgba(255, 0, 128, 0.55) 0%, rgba(255, 102, 0, 0.42) 28%, rgba(0, 229, 255, 0.3) 60%, rgba(147, 51, 234, 0.18) 80%, transparent 100%)',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />

        <span
          className={\`relative z-10 font-sans font-bold text-white tracking-tight \${fontSize}\`}
          style={{
            letterSpacing: '-0.03em',
            textShadow: '0 2px 20px rgba(0, 0, 0, 0.8)',
          }}
        >
          {currentText}
        </span>

        {/* Rainbow Blinking Cursor */}
        <div className="relative z-10 flex items-center ml-2.5 flex-shrink-0">
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.75, repeat: Infinity, ease: 'linear' }}
            className="inline-block rounded-full"
            style={{
              width: '6px',
              height: '1.38em',
              background:
                'linear-gradient(180deg, #FF007A 0%, #FF6600 25%, #FFD000 45%, #00FF88 65%, #00E5FF 85%, #9933FF 100%)',
              boxShadow:
                '0 0 14px rgba(255, 0, 128, 0.95), 0 0 28px rgba(0, 229, 255, 0.8)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RainbowTypewriterBadge;`;
