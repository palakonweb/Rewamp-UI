import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * RainbowTypewriterBadge
 * Exact recreation of user's reference image and prompt:
 * Dark rounded badge container with typewriter animated text,
 * a rhythmic blinking cursor, and an animated flowing rainbow gradient aura
 * on the right edge with dynamic chromatic lighting.
 */
export function RainbowTypewriterBadge({
  words = ['Reality', 'Design', 'Purrform', 'Future', 'Creation'],
  typingSpeed = 110,
  deletingSpeed = 55,
  pauseDelay = 1800,
  className = '',
  fontSize = 'text-3xl md:text-4xl',
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullWord = words[wordIndex % words.length];

    let timer;
    if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullWord.length) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed + (Math.random() * 30 - 15)); // subtle natural human typing cadence
      } else {
        // Word finished, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDelay);
      }
    } else {
      // Deleting backwards
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        }, deletingSpeed);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <div className={`relative inline-flex items-center select-none ${className}`}>
      {/* Outer ambient chromatic glow reacting to the rainbow strip */}
      <div
        className="absolute -right-2 top-0 bottom-0 w-24 rounded-r-xl pointer-events-none opacity-40 blur-xl animate-pulse"
        style={{
          background: 'linear-gradient(180deg, #FF4500, #EC5E27, #E11D48, #9333EA, #2563EB)',
        }}
      />

      {/* Main Dark Rounded Badge Container */}
      <div
        className="relative flex items-center overflow-hidden rounded-xl border border-white/10 shadow-2xl"
        style={{
          background: 'linear-gradient(180deg, #26272B 0%, #1E1F23 100%)',
          boxShadow: '0 16px 36px -8px rgba(0, 0, 0, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Subtle interior glow from the right edge */}
        <div
          className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none opacity-30 z-0"
          style={{
            background: 'radial-gradient(ellipse at 100% 50%, rgba(236, 94, 39, 0.4) 0%, rgba(147, 51, 234, 0.25) 45%, transparent 80%)',
          }}
        />

        {/* Text Container */}
        <div className="relative z-10 flex items-center pl-6 pr-8 py-3.5 sm:py-4">
          <span
            className={`font-sans font-normal text-white tracking-tight ${fontSize}`}
            style={{
              fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
              letterSpacing: '-0.02em',
            }}
          >
            {currentText}
          </span>

          {/* Rhythmic Blinking Cursor */}
          <motion.span
            animate={{
              opacity: [1, 0, 1],
            }}
            transition={{
              duration: 0.85,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="inline-block w-[2px] bg-white ml-0.5"
            style={{
              height: '1.05em',
              verticalAlign: 'middle',
              boxShadow: '0 0 8px rgba(255, 255, 255, 0.8)',
            }}
          />
        </div>

        {/* Animated Moving Rainbow Gradient Edge on the right */}
        <div className="relative w-2.5 sm:w-3 self-stretch overflow-hidden z-10 flex-shrink-0">
          <div
            className="absolute inset-0 w-full h-[300%]"
            style={{
              background: `linear-gradient(
                180deg,
                #FF4500 0%,
                #EC5E27 15%,
                #F43F5E 30%,
                #A855F7 50%,
                #3B82F6 70%,
                #06B6D4 85%,
                #FF4500 100%
              )`,
              backgroundSize: '100% 50%',
              animation: 'rainbowCycle 3.5s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Global CSS Keyframes for Rainbow Motion */}
      <style>{`
        @keyframes rainbowCycle {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </div>
  );
}

export default RainbowTypewriterBadge;
