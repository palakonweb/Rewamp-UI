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
      <span style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s', color: '#7ec8a4' }}>|</span>
    </span>
  );
}

export default function TypewriterTextShowcase() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full h-full flex flex-col gap-6">
      <div className="relative w-full h-full p-8 sm:p-12 flex flex-col items-center justify-center">

        <div className="text-center max-w-lg">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-6" style={{ color: 'rgba(240,237,232,0.3)' }}>Typewriter</p>
          <div key={key} className="text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight" style={{ color: '#f0ede8' }}>
            <TypewriterEffect text="Building the future of design." speed={65} />
          </div>
          <motion.div key={`sub-${key}`}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="mt-4"
          >
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(240,237,232,0.35)' }}>
              <TypewriterEffect text="One character at a time, one pixel at a time." speed={40} />
            </p>
          </motion.div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          onClick={() => setKey(k => k + 1)}
          className="mt-8 px-5 py-2 rounded-full text-[11px] font-medium"
          style={{ background: 'rgba(126,200,164,0.1)', color: '#7ec8a4', border: '1px solid rgba(126,200,164,0.2)' }}
        >
          Replay
        </motion.button>
      </div>
</div>
  );
}
