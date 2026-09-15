import React, { useState } from 'react';
import GlowTextChip from './GlowTextChip';

export default function GlowTextChipShowcase() {
  const [typewriter, setTypewriter] = useState(true);
  const [customWord, setCustomWord] = useState('Reality');

  return (
    <div className="w-full min-h-[480px] bg-black rounded-2xl p-6 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background subtle radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(30, 30, 30, 0.5) 0%, #000000 80%)',
        }}
      />

      {/* Main text chip showcase */}
      <div className="relative z-10 py-12 flex items-center justify-center">
        <GlowTextChip
          text={customWord}
          words={['Reality', 'Design', 'Purrform', 'Future', 'Creation']}
          typewriter={typewriter}
        />
      </div>

      {/* Interactive controls */}
      <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 bg-neutral-900/90 border border-white/10 rounded-full px-5 py-2.5 backdrop-blur-md text-xs text-neutral-400">
        <button
          onClick={() => setTypewriter(!typewriter)}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            typewriter ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' : 'bg-white/5 text-neutral-400 hover:text-white'
          }`}
        >
          {typewriter ? '● Typewriter Active' : '○ Static Text'}
        </button>

        <div className="h-3 w-px bg-white/10" />

        <div className="flex items-center gap-2">
          <span>Words:</span>
          {['Reality', 'Purrform', 'Synthesize', 'Aura'].map((w) => (
            <button
              key={w}
              onClick={() => {
                setCustomWord(w);
                setTypewriter(false);
              }}
              className="px-2.5 py-0.5 rounded bg-white/5 hover:bg-white/10 text-neutral-300 transition-colors"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

GlowTextChipShowcase.customSlug = 'glow-text-chip';
