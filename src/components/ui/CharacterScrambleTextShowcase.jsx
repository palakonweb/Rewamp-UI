import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Character scramble decode text animation where characters cycle through random letters before settling to the final character, matrix-like decode effect, dark background, monospace font, mint green accent, premium hacker aesthetic`;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function ScrambleText({ text, className, style, trigger }) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(null);

  const scramble = useCallback(() => {
    let iteration = 0;
    const totalFrames = text.length * 3;

    const run = () => {
      setDisplay(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          if (i < iteration / 3) return text[i];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      iteration++;
      if (iteration <= totalFrames) {
        frameRef.current = requestAnimationFrame(run);
      }
    };
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(run);
  }, [text]);

  useEffect(() => { scramble(); return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current); }; }, [trigger, scramble]);

  return <span className={className} style={style}>{display}</span>;
}

export default function CharacterScrambleTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
        style={{ background: '#0a0e14' }}>

        {/* Dot grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)', backgroundSize: '16px 16px' }} />

        <p className="text-[10px] uppercase tracking-[0.3em] mb-6 relative z-10" style={{ color: 'rgba(126,200,164,0.5)' }}>Character Scramble</p>

        <div className="text-center relative z-10">
          <h2 className="text-[32px] sm:text-[44px] font-bold tracking-tight leading-none font-mono" style={{ color: '#f0ede8' }}>
            <ScrambleText text="PREMIUM DESIGN" trigger={key} />
          </h2>
          <p className="text-[14px] font-mono mt-4" style={{ color: 'rgba(126,200,164,0.4)' }}>
            <ScrambleText text="Decoded in real-time" trigger={key} />
          </p>
        </div>

        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setKey(k => k + 1)}
          className="mt-8 px-5 py-2 rounded-full text-[11px] font-medium font-mono relative z-10"
          style={{ background: 'rgba(126,200,164,0.1)', color: '#7ec8a4', border: '1px solid rgba(126,200,164,0.2)' }}>
          Descramble
        </motion.button>
      </div>
</div>
  );
}
