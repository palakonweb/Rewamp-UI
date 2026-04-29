import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Power } from 'lucide-react';

const promptContent = `SVG Border Beam Button, glowing beam of light continuously traces the perimeter of the button using SVG stroke-dashoffset, dynamic gradients, ultra-premium technical aesthetic`;

export default function SVGBorderBeamButtonShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[400px]" style={{ background: '#0a0a0f' }}>
        
        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 text-white/30">SVG Border Beam</p>

        {/* The Button Container */}
        <motion.div 
          className="relative group cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Main Button Body */}
          <div className="relative px-8 py-4 rounded-xl flex items-center gap-3 bg-[#111116] z-10">
            <Power size={18} className="text-cyan-400 group-hover:text-white transition-colors duration-300" />
            <span className="text-white font-medium tracking-wide">Initialize System</span>
          </div>

          {/* SVG Border Tracer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none rounded-xl" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f2fe" />
                <stop offset="50%" stopColor="#4facfe" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>
            {/* Base dim border */}
            <rect 
              x="0" y="0" width="100%" height="100%" rx="12" 
              fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" 
            />
            {/* Animated glowing beam */}
            <motion.rect 
              x="0" y="0" width="100%" height="100%" rx="12" 
              fill="none" stroke="url(#beamGradient)" strokeWidth="2"
              strokeDasharray="100 300" // Length of beam vs gap
              initial={{ strokeDashoffset: 400 }}
              animate={{ 
                strokeDashoffset: [400, 0], // Move the beam around
                opacity: isHovered ? [0.6, 1, 0.6] : 0.6
              }}
              transition={{ 
                strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
              }}
              style={{ filter: 'drop-shadow(0 0 8px rgba(79,172,254,0.6))' }}
            />
          </svg>

          {/* Background Glow */}
          <div className="absolute inset-0 bg-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </motion.div>

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
