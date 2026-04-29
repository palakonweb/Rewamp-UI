import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Matrix Trail Follower Cursor, cursor leaves a trail of rapidly decoding matrix characters streaming behind the mouse, highly optimized DOM nodes with lifecycle management, cyberpunk hacker aesthetic`;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';

export default function MatrixTrailCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const containerRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const idCounter = useRef(0);
  const lastEmitTime = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    
    const now = Date.now();
    if (now - lastEmitTime.current < 40) return; // limit emission rate
    lastEmitTime.current = now;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const char = chars[Math.floor(Math.random() * chars.length)];
    const id = idCounter.current++;

    setTrail(prev => [...prev.slice(-15), { id, x, y, char }]);
    
    // Auto remove after animation
    setTimeout(() => {
      setTrail(prev => prev.filter(t => t.id !== id));
    }, 1000);
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto cursor-none">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[500px]" 
        style={{ background: '#020617' }} // very dark slate
      >
        <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-emerald-500/50 font-bold z-10">
          Matrix Trail
        </p>

        <h2 className="text-[32px] sm:text-[48px] font-bold text-center z-10 text-slate-200">
          Leave your mark.
        </h2>

        {/* The Matrix Trail */}
        <AnimatePresence>
          {trail.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 1, scale: 1.5, y: 0 }}
              animate={{ opacity: 0, scale: 0.5, y: 20 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute pointer-events-none font-mono font-bold text-[18px]"
              style={{ 
                left: t.x, top: t.y, 
                color: '#10b981', // emerald
                textShadow: '0 0 10px rgba(16,185,129,0.8)',
                transform: 'translate(-50%, -50%)' 
              }}
            >
              {t.char}
            </motion.div>
          ))}
        </AnimatePresence>

      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0"><p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p><code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
