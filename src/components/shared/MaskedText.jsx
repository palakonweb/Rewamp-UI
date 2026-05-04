import React from 'react';
import { motion } from 'framer-motion';

export function MaskedText({ text, className = "", delay = 0 }) {
  // Format words wrapped in *asterisks* to be italic with accent color
  const words = text.split(" ");

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isItalic = word.startsWith("*") && word.endsWith("*");
        const cleanWord = isItalic ? word.slice(1, -1) : word;

        return (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className={`inline-block ${isItalic ? 'italic text-[var(--accent)]' : ''}`}
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1], // Expo-out
                delay: delay + i * 0.06 // 60ms stagger
              }}
            >
              {cleanWord}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
