import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Typewriter text animation with blinking cursor, characters appear one by one with smooth timing, dark background, warm white text, monospace feel, premium SaaS aesthetic`;

function TypewriterEffect({ text, speed = 50, className, style }) {
  const [displayed, setDisplayed] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  useEffect(() => {
    const blink = setInterval(() => setShowCursor(c => !c), 530);
    return () => clearInterval(blink);
  }, []);

  return (
    <span className={className} style={style}>
      {displayed}
      <span className="text-[#9C8EB8] dark:text-[#D4CBE5]" style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}>|</span>
    </span>
  );
}

export default function TypewriterTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6">
      <div 
        onClick={() => setKey(k => k + 1)}
        className="text-center max-w-xl cursor-pointer select-none group"
      >
        <div key={key} className="text-[32px] sm:text-[44px] font-bold leading-tight tracking-tight text-neutral-900 dark:text-[#f0ede8] transition-transform duration-200 group-hover:scale-[1.01]">
          <TypewriterEffect text="Building the future of design." speed={65} />
        </div>
      </div>

      <p className="mt-8 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click to replay animation
      </p>
    </div>
  );
}
