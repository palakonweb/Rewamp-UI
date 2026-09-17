import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * RainbowTypewriterBadge
 * Text-only typewriter effect where the cursor and rainbow spotlight are 100% stationary,
 * and ONLY the text moves/types into the fixed cursor position:
 * - No rectangle / card / box
 * - Stationary rainbow blinking cursor
 * - Stationary chromatic spotlight emitting from the cursor over the incoming text
 * - Only the text moves as letters type and delete
 */
export function RainbowTypewriterBadge({
  words = ['Reality', 'Design', 'Purrform', 'Future', 'Creation'],
  typingSpeed = 110,
  deletingSpeed = 55,
  pauseDelay = 1800,
  className = '',
  fontSize = 'text-xl sm:text-2xl md:text-3xl',
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
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
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
    <div className={`relative flex items-center justify-center select-none w-full max-w-md px-6 ${className}`}>
      {/* Anchor Container: Center-positioned so cursor stays completely fixed */}
      <div className="relative flex items-center">
        {/* Stationary Rainbow Spotlight emitting backward from the fixed cursor */}
        <motion.div
          animate={{
            opacity: [0.75, 0.95, 0.75],
            scaleX: [0.96, 1.04, 0.96],
            scaleY: [0.94, 1.06, 0.94],
          }}
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-0"
          style={{
            width: '160px',
            maxWidth: '80vw',
            height: '70px',
            transformOrigin: 'right center',
            background:
              'radial-gradient(ellipse 120px 40px at 100% 50%, rgba(255, 0, 128, 0.55) 0%, rgba(255, 102, 0, 0.4) 28%, rgba(0, 229, 255, 0.3) 60%, rgba(147, 51, 234, 0.18) 80%, transparent 100%)',
            filter: 'blur(12px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* Moving Text: Right-aligned against the stationary cursor.
            As new letters type in, the text shifts leftward through the stationary cursor! */}
        <div className="relative flex items-center justify-end">
          <span
            className={`relative z-10 font-sans font-bold text-white tracking-tight ${fontSize} whitespace-nowrap text-right`}
            style={{
              letterSpacing: '-0.03em',
              textShadow: '0 2px 24px rgba(0, 0, 0, 0.85)',
            }}
          >
            {currentText}
          </span>
        </div>

        {/* Stationary Rainbow Blinking Cursor: Fixed position, slightly bigger than text */}
        <div className="relative z-10 flex items-center ml-1.5 flex-shrink-0">
          <motion.span
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="inline-block rounded-full"
            style={{
              width: '3px',
              height: '1.15em',
              background:
                'linear-gradient(180deg, #FF007A 0%, #FF6600 25%, #FFD000 45%, #00FF88 65%, #00E5FF 85%, #9933FF 100%)',
              boxShadow:
                '0 0 8px rgba(255, 0, 128, 0.9), 0 0 16px rgba(0, 229, 255, 0.7)',
            }}
          />

          {/* Stationary focal tip flare */}
          <motion.div
            animate={{
              scale: [0.95, 1.3, 0.95],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-1 top-1/2 -translate-y-1/2 w-3.5 h-7 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(255, 255, 255, 0.9) 0%, rgba(255, 0, 128, 0.5) 45%, transparent 70%)',
              filter: 'blur(2px)',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default RainbowTypewriterBadge;
