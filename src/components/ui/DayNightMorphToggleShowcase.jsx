import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Ultra-premium skeuomorphic Day/Night toggle. Features extreme 3D depth, inner shadows, and a knob that physically morphs from a glowing sun flare into a deeply cratered moon.`;

export default function DayNightMorphToggleShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [isNight, setIsNight] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[400px] transition-colors duration-1000" 
           style={{ background: isNight ? '#09090b' : '#f8fafc' }}>
        
        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 font-bold transition-colors duration-1000" 
           style={{ color: isNight ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}>
          Skeuomorphic Morph Toggle
        </p>

        {/* Massive Skeuomorphic Toggle Container */}
        <div 
          className="relative w-[180px] h-[80px] rounded-full cursor-pointer flex items-center px-2 overflow-hidden shadow-2xl"
          style={{ 
            background: isNight ? '#1e1e24' : '#60a5fa',
            transition: 'background 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: isNight 
              ? 'inset 0 10px 20px rgba(0,0,0,0.5), inset 0 2px 4px rgba(0,0,0,0.3), 0 2px 10px rgba(0,0,0,0.5)'
              : 'inset 0 10px 20px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3), 0 10px 30px rgba(96,165,250,0.4)'
          }}
          onClick={() => setIsNight(!isNight)}
        >
          {/* Background Stars/Clouds (Parallax effect) */}
          <motion.div 
            className="absolute inset-0 flex items-center pointer-events-none"
            initial={false}
            animate={{ x: isNight ? 0 : -80, opacity: isNight ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Detailed Stars */}
            <div className="absolute left-[20px] top-[20px] w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_#fff]" />
            <div className="absolute left-[45px] top-[30px] w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]" />
            <div className="absolute left-[15px] top-[50px] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff]" />
            <div className="absolute left-[65px] top-[15px] w-1 h-1 bg-white rounded-full shadow-[0_0_6px_#fff]" />
          </motion.div>

          <motion.div 
            className="absolute inset-0 flex items-center justify-end pointer-events-none"
            initial={false}
            animate={{ x: isNight ? 80 : 0, opacity: isNight ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Fluffy SVG Clouds */}
            <svg width="60" height="36" viewBox="0 0 40 24" fill="white" opacity="0.8" className="mr-[20px] drop-shadow-md">
              <path d="M12 12c0-3.31 2.69-6 6-6s6 2.69 6 6h2c2.76 0 5 2.24 5 5s-2.24 5-5 5H10c-3.31 0-6-2.69-6-6s2.69-6 6-6h2z" />
            </svg>
          </motion.div>

          {/* The Massive Moving Knob */}
          <motion.div 
            className="relative w-[64px] h-[64px] rounded-full flex items-center justify-center z-10"
            initial={false}
            animate={{ 
              left: isNight ? "calc(100% - 64px - 16px)" : "8px",
              rotate: isNight ? 360 : 0
            }}
            transition={{ 
              duration: 0.8, 
              type: "spring", stiffness: 200, damping: 20 
            }}
            style={{ 
              background: isNight ? '#e2e8f0' : '#fbbf24',
              boxShadow: isNight 
                ? 'inset -8px -8px 16px rgba(0,0,0,0.3), inset 4px 4px 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.1)' 
                : 'inset -8px -8px 16px rgba(217,119,6,0.8), inset 4px 4px 10px rgba(255,255,255,0.9), 0 0 30px rgba(251,191,36,0.8)'
            }}
          >
            <AnimatePresence mode="wait">
              {isNight ? (
                /* 3D Moon Details (Deep Craters) */
                <motion.div 
                  key="moon"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 overflow-hidden rounded-full"
                >
                  <div className="absolute w-[14px] h-[14px] rounded-full bg-[#94a3b8] top-[12px] left-[16px] shadow-[inset_2px_2px_4px_rgba(0,0,0,0.4),_1px_1px_2px_rgba(255,255,255,0.8)] opacity-80" />
                  <div className="absolute w-[22px] h-[22px] rounded-full bg-[#94a3b8] bottom-[14px] right-[10px] shadow-[inset_3px_3px_6px_rgba(0,0,0,0.4),_1px_1px_2px_rgba(255,255,255,0.8)] opacity-80" />
                  <div className="absolute w-[8px] h-[8px] rounded-full bg-[#94a3b8] top-[34px] left-[8px] shadow-[inset_1px_1px_2px_rgba(0,0,0,0.4),_1px_1px_2px_rgba(255,255,255,0.8)] opacity-80" />
                </motion.div>
              ) : (
                /* 3D Sun Details (Intense Glow) */
                <motion.div 
                  key="sun"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-2 rounded-full bg-[#fef3c7] blur-[4px] opacity-90" />
                  {/* Subtle solar flares */}
                  <div className="absolute inset-0 rounded-full border-2 border-[#fef3c7] opacity-40 scale-110" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
</div>
  );
}
