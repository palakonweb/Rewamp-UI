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
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      {/* Dot grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 0.5px, transparent 0)', backgroundSize: '16px 16px' }} 
      />

      <div 
        onClick={() => setKey(k => k + 1)}
        className="text-center relative z-10 cursor-pointer select-none group"
      >
        <h2 className="text-[34px] sm:text-[50px] font-bold tracking-tight leading-none font-mono text-neutral-900 dark:text-[#E4DDF0] transition-transform duration-200 group-hover:scale-[1.01]">
          <ScrambleText text="PURRFORM DESIGN" trigger={key} />
        </h2>
      </div>

      <p className="mt-8 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click to descramble
      </p>
    </div>
  );
}
