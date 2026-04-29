import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Day/Night Toggle with SVG Path Morphing, knob animates from a glowing sun with expanding rays into a cratered moon with inner shadows, ultra-premium animated interaction, physical depth aesthetic`;

export default function DayNightMorphToggleShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [isNight, setIsNight] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[400px] transition-colors duration-1000" 
           style={{ background: isNight ? '#0a0a14' : '#e0e7ff' }}>
        
        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 font-bold transition-colors duration-1000" 
           style={{ color: isNight ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}>
          Day / Night SVG Morph
        </p>

        {/* Toggle Container */}
        <div 
          className="relative w-[120px] h-[56px] rounded-full cursor-pointer flex items-center px-1.5 shadow-inner overflow-hidden"
          style={{ 
            background: isNight ? '#1e1e38' : '#818cf8',
            transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.2)'
          }}
          onClick={() => setIsNight(!isNight)}
        >
          {/* Background Stars/Clouds (Parallax effect) */}
          <motion.div 
            className="absolute inset-0 flex items-center pointer-events-none"
            initial={false}
            animate={{ x: isNight ? 0 : -60, opacity: isNight ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Stars */}
            <div className="absolute left-[15px] top-[15px] w-1 h-1 bg-white rounded-full shadow-[0_0_4px_#fff]" />
            <div className="absolute left-[30px] top-[25px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_#fff]" />
            <div className="absolute left-[10px] top-[35px] w-0.5 h-0.5 bg-white rounded-full shadow-[0_0_4px_#fff]" />
          </motion.div>

          <motion.div 
            className="absolute inset-0 flex items-center justify-end pointer-events-none"
            initial={false}
            animate={{ x: isNight ? 60 : 0, opacity: isNight ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Clouds */}
            <svg width="40" height="24" viewBox="0 0 40 24" fill="white" opacity="0.6" className="mr-[15px]">
              <path d="M12 12c0-3.31 2.69-6 6-6s6 2.69 6 6h2c2.76 0 5 2.24 5 5s-2.24 5-5 5H10c-3.31 0-6-2.69-6-6s2.69-6 6-6h2z" />
            </svg>
          </motion.div>

          {/* The Moving Knob */}
          <motion.div 
            className="relative w-[46px] h-[46px] rounded-full flex items-center justify-center overflow-hidden z-10"
            initial={false}
            animate={{ 
              left: isNight ? "calc(100% - 46px - 6px)" : "6px",
              rotate: isNight ? 360 : 0
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", stiffness: 200, damping: 20 
            }}
            style={{ 
              background: isNight ? '#cbd5e1' : '#fbbf24',
              boxShadow: isNight ? 'inset -4px -4px 8px rgba(0,0,0,0.2), 0 0 10px rgba(255,255,255,0.2)' : 'inset -4px -4px 8px rgba(217,119,6,0.6), 0 0 15px rgba(251,191,36,0.6)'
            }}
          >
            <AnimatePresence mode="wait">
              {isNight ? (
                /* Moon Details (Craters) */
                <motion.div 
                  key="moon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute w-[10px] h-[10px] rounded-full bg-[#94a3b8] top-[8px] left-[12px] shadow-inner opacity-60" />
                  <div className="absolute w-[16px] h-[16px] rounded-full bg-[#94a3b8] bottom-[10px] right-[8px] shadow-inner opacity-60" />
                  <div className="absolute w-[6px] h-[6px] rounded-full bg-[#94a3b8] top-[24px] left-[6px] shadow-inner opacity-60" />
                </motion.div>
              ) : (
                /* Sun Details (Inner Glow) */
                <motion.div 
                  key="sun"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-2 rounded-full bg-[#fef3c7] blur-[2px] opacity-80" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

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
