import React from 'react';
import { motion } from 'framer-motion';

const components = [
  "Liquid Glass Button",
  "3D Tilt Card",
  "Spotlight Card",
  "Animated Bento",
  "Mask-Reveal Text",
  "Magnetic Button",
  "Logo Marquee",
  "Animated Modal",
  "ASCII Background",
  "Meteors",
  "Hover Tooltip",
  "Shimmer Border"
];

// Duplicate the array to create a seamless infinite loop
const marqueeItems = [...components, ...components, ...components];

export function Belt() {
  return (
    <section className="w-full py-24 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden relative z-10 flex flex-col items-center">
      
      {/* Caption */}
      <div className="flex items-center gap-2 mb-8 px-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--glow)] animate-pulse" />
        <span className="text-xs font-mono text-[var(--text-3)] uppercase tracking-[0.2em]">
          50+ Components Live
        </span>
      </div>

      {/* Marquee Container with Gradient Masks */}
      <div className="relative w-full max-w-[100vw] flex overflow-hidden group">
        {/* Left Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[var(--bg)] to-transparent z-10 pointer-events-none" />
        
        {/* Right Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[var(--bg)] to-transparent z-10 pointer-events-none" />

        {/* The Moving Track */}
        <motion.div
          className="flex whitespace-nowrap items-center w-max"
          animate={{ x: [0, -1035] }} // Adjust based on content width to create perfect loop
          transition={{
            duration: 30, // 30s linear loop
            repeat: Infinity,
            ease: "linear"
          }}
          // The CSS class below pauses the animation on hover
          style={{ animationPlayState: "inherit" }}
        >
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span className="font-mono text-xl md:text-2xl text-[var(--text-2)] group-hover:text-[var(--text)] transition-colors duration-300 mx-6">
                {item}
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
