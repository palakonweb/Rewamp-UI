import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudDownload, Check } from 'lucide-react';

const DISC = 44;
const STROKE = 4;
const RING_R = DISC / 2 + 5;
const RING_BOX = (RING_R + STROKE / 2) * 2;
const CIRC = 2 * Math.PI * RING_R;
const DURATION = 2200;

function lerpColor(a, b, t) {
  const ah = parseInt(a.slice(1), 16), bh = parseInt(b.slice(1), 16);
  const ar = (ah >> 16) & 255, ag = (ah >> 8) & 255, ab = ah & 255;
  const br = (bh >> 16) & 255, bg = (bh >> 8) & 255, bb = bh & 255;
  const r = Math.round(ar + (br - ar) * t);
  const g = Math.round(ag + (bg - ag) * t);
  const b2 = Math.round(ab + (bb - ab) * t);
  return `rgb(${r}, ${g}, ${b2})`;
}

export default function NeumorphicDownloadButtonShowcase() {
  const [phase, setPhase] = useState('idle'); // idle | downloading | done
  const [progress, setProgress] = useState(0);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });
  const rafRef = useRef(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const startDownload = () => {
    if (phase !== 'idle') return;
    setPhase('downloading');
    setProgress(0);
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / DURATION);
      setProgress(t);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase('done');
        setTimeout(() => {
          setPhase('idle');
          setProgress(0);
        }, 1800);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const iconColor = phase === 'idle' 
    ? (isDark ? '#8A8494' : '#9aa0a6') 
    : lerpColor(isDark ? '#8A8494' : '#9aa0a6', '#D4CBE5', Math.min(1, progress * 1.3));
  const offset = CIRC * (1 - progress);

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12">
      <div className="flex items-center justify-center">
        <button
          onClick={startDownload}
          className="relative flex items-center gap-3 pl-1.5 pr-7 py-1.5 rounded-full select-none transition-all cursor-pointer"
          style={{
            background: isDark ? '#181520' : '#F1F1F1',
            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)',
            boxShadow: isDark
              ? '8px 8px 20px rgba(0,0,0,0.65), -6px -6px 18px rgba(255,255,255,0.04), inset 0 1px 1px rgba(255,255,255,0.08)'
              : '6px 6px 16px rgba(0,0,0,0.09), -6px -6px 16px rgba(255,255,255,0.95), inset 0 1px 1px rgba(255,255,255,0.8)',
          }}
        >
          {/* Circular Disc with Progress Ring */}
          <div className="relative shrink-0 flex items-center justify-center" style={{ width: RING_BOX, height: RING_BOX }}>
            {phase === 'downloading' && (
              <svg width={RING_BOX} height={RING_BOX} className="absolute inset-0 -rotate-90">
                <circle 
                  cx={RING_BOX / 2} 
                  cy={RING_BOX / 2} 
                  r={RING_R} 
                  stroke={isDark ? 'rgba(255,255,255,0.1)' : '#d8dadd'} 
                  strokeWidth={STROKE} 
                  fill="none" 
                  strokeLinecap="round" 
                />
                <circle
                  cx={RING_BOX / 2}
                  cy={RING_BOX / 2}
                  r={RING_R}
                  stroke={isDark ? '#D4CBE5' : '#D4CBE5'}
                  strokeWidth={STROKE}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={offset}
                  strokeLinejoin="round"
                />
              </svg>
            )}
            <div
              className="relative rounded-full flex items-center justify-center transition-colors"
              style={{
                width: DISC,
                height: DISC,
                background: isDark ? '#181520' : '#F1F1F1',
                boxShadow: isDark
                  ? 'inset 2px 2px 5px rgba(0,0,0,0.65), inset -2px -2px 5px rgba(255,255,255,0.05)'
                  : 'inset 2px 2px 4px rgba(0,0,0,0.06), inset -2px -2px 4px rgba(255,255,255,0.8)',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {phase !== 'done' ? (
                  <motion.span key="cloud" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.7 }} transition={{ duration: 0.2 }}>
                    <CloudDownload size={18} strokeWidth={1.8} style={{ color: iconColor }} />
                  </motion.span>
                ) : (
                  <motion.span key="done" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: [0.6, 1.2, 1] }} transition={{ duration: 0.35 }}>
                    <Check size={18} strokeWidth={2.2} className="text-[#D4CBE5]" />
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Label with stable width to prevent jitter */}
          <div className="w-[100px] flex items-center justify-start">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={phase}
                initial={{ opacity: 0, x: 6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.2 }}
                className={`text-[14px] font-semibold select-none ${
                  isDark ? 'text-white' : 'text-neutral-800'
                }`}
              >
                {phase === 'idle' ? 'Download' : phase === 'downloading' ? 'Downloading…' : 'Downloaded'}
              </motion.span>
            </AnimatePresence>
          </div>
        </button>
      </div>

      {/* Centered single-line description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click button to simulate neumorphic download
      </p>
    </div>
  );
}

NeumorphicDownloadButtonShowcase.customTitle = 'Neumorphic Download Button';
NeumorphicDownloadButtonShowcase.customSlug = 'neumorphic-download-button';
