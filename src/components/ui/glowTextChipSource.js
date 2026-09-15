export const glowTextChipPrompt = `# Prompt: Dark Glass Text Chip with Blinking Cursor + Animated Rainbow Spotlight

Build a single React component (functional, hooks, Tailwind + framer-motion, no external images) called GlowTextChip.

## 1. Structure
- A pill-ish rounded rectangle chip (rounded-xl / ~16px radius), dark glass background:
  - base: bg-neutral-900/80 backdrop-blur-md
  - subtle top-left-to-bottom-right dark gradient (bg-gradient-to-br from-neutral-800 via-neutral-900 to-black)
  - very thin border border border-white/10
  - drop shadow for depth shadow-[0_10px_40px_rgba(0,0,0,0.5)]
- Large text inside, e.g. "Reality" (prop text="Reality"), white, clean sans/serif (text-7xl font-light tracking-tight text-white), vertically/horizontally padded.

## 2. Blinking cursor
- A thin vertical bar (w-[3px], height matching text cap-height, bg-white) placed right after text.
- Animate opacity with framer-motion: animate={{ opacity: [1, 1, 0, 0] }} on transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: "linear" }} — classic hard blink.

## 3. Rainbow spotlight edge (animated)
- A vertical strip on right edge (~40-60px wide, full height), containing soft radial/conic rainbow gradient:
  - Absolute div right edge, blurred with blur-2xl, mix-blend-screen.
  - Crisp 2-3px solid rainbow gradient bar at very edge (from-orange-400 via-fuchsia-500 to-blue-500).
  - Animate background-position on gradient (300% 300%) with framer-motion.
  - Drifting hot spot (y: [-12, 12, -12]).

## 4. Composition & Motion
- Overflow-hidden chip with overflow-visible parent stage on dark background.
- Support prefers-reduced-motion and optional typewriter cycling.`;

export const glowTextChipCode = `import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function GlowTextChip({
  text = 'Reality',
  words = ['Reality', 'Design', 'Purrform', 'Future', 'Creation'],
  typewriter = true,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseDelay = 2000,
  className = '',
}) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(typewriter ? '' : text);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!typewriter) {
      setDisplayedText(text);
      return;
    }
    const activeList = words && words.length > 0 ? words : [text];
    const targetWord = activeList[wordIndex % activeList.length];

    let timer;
    if (!isDeleting) {
      if (displayedText.length < targetWord.length) {
        timer = setTimeout(() => {
          setDisplayedText(targetWord.slice(0, displayedText.length + 1));
        }, typingSpeed + (Math.random() * 20 - 10));
      } else {
        timer = setTimeout(() => setIsDeleting(true), pauseDelay);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(targetWord.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % activeList.length);
      }
    }
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, wordIndex, words, typewriter, text, typingSpeed, deletingSpeed, pauseDelay]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={\`relative inline-flex items-center select-none \${className}\`}
    >
      {/* Outer ambient chromatic glow */}
      <div
        className="absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-32 rounded-full pointer-events-none opacity-40 blur-2xl"
        style={{
          background: 'radial-gradient(circle, #ff7a18 0%, #ff2d95 40%, #7c3aed 70%, transparent 90%)',
        }}
      />

      {/* Pill-ish rounded rectangle chip */}
      <div
        className="relative overflow-hidden rounded-xl bg-neutral-900/80 backdrop-blur-md bg-gradient-to-br from-neutral-800 via-neutral-900 to-black border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex items-center pl-6 sm:pl-8 pr-12 sm:pr-16 py-4 sm:py-6"
      >
        {/* Large Text + Blinking Cursor */}
        <div className="relative z-10 flex items-center">
          <span
            className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white"
            style={{ letterSpacing: '-0.03em' }}
          >
            {displayedText}
          </span>

          {/* Hard Blinking Cursor */}
          <motion.span
            className="inline-block w-[3px] sm:w-1 bg-white ml-1.5 self-center"
            style={{ height: '0.85em', boxShadow: '0 0 8px rgba(255, 255, 255, 0.6)' }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: [1, 1, 0, 0] }}
            transition={
              prefersReducedMotion
                ? {}
                : { duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1], ease: 'linear' }
            }
          />
        </div>

        {/* Animated rainbow spotlight */}
        <motion.div
          className="absolute inset-y-0 right-0 w-16 sm:w-20 blur-2xl mix-blend-screen pointer-events-none"
          style={{
            background: 'linear-gradient(120deg, #ff7a18, #ff2d95, #7c3aed, #2563eb, #ff7a18)',
            backgroundSize: '300% 300%',
          }}
          animate={prefersReducedMotion ? {} : { backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Drifting living-light hotspot */}
        <motion.div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-14 sm:w-16 h-28 blur-xl mix-blend-screen pointer-events-none opacity-85"
          style={{
            background:
              'radial-gradient(ellipse at 100% 50%, rgba(255,122,24,0.95) 0%, rgba(255,45,149,0.75) 45%, rgba(124,58,237,0.5) 75%, transparent 100%)',
          }}
          animate={prefersReducedMotion ? {} : { y: [-12, 12, -12], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Crisp solid rainbow gradient bar at edge */}
        <div
          className="absolute inset-y-0 right-0 w-[2.5px] sm:w-[3px] bg-gradient-to-b from-orange-400 via-fuchsia-500 to-blue-500 pointer-events-none"
          style={{ boxShadow: '0 0 10px rgba(255, 122, 24, 0.8)' }}
        />
      </div>
    </motion.div>
  );
}`;
