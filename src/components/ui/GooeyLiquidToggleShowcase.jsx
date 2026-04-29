import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Liquid Gooey Toggle, switch knob physically melts and stretches as it crosses from off to on using SVG feColorMatrix masking, incredibly tactile and fluid motion, ultra-premium component`;

export default function GooeyLiquidToggleShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [isOn, setIsOn] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-16 flex flex-col items-center justify-center min-h-[400px]" style={{ background: '#f5f5f7' }}>
        
        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 text-black/30 font-bold">Liquid Gooey Toggle</p>

        {/* SVG Filter for the Gooey melting effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="goo-toggle">
              <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Toggle Container */}
        <div 
          className="relative w-[100px] h-[50px] rounded-full cursor-pointer flex items-center px-1"
          style={{ 
            background: isOn ? '#10b981' : '#e5e7eb',
            transition: 'background 0.4s ease',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' 
          }}
          onClick={() => setIsOn(!isOn)}
        >
          {/* The Gooey Track (Applies filter to children) */}
          <div className="absolute inset-0 rounded-full w-full h-full overflow-hidden" style={{ filter: 'url(#goo-toggle)' }}>
            
            {/* The actual moving knob */}
            <motion.div 
              className="absolute top-1 w-[42px] h-[42px] rounded-full bg-white shadow-sm"
              initial={false}
              animate={{ 
                left: isOn ? "calc(100% - 42px - 4px)" : "4px",
                // Stretch horizontally while moving to create the liquid tearing effect
                scaleX: [1, 1.4, 1],
              }}
              transition={{ 
                duration: 0.5,
                times: [0, 0.5, 1],
                type: "spring", stiffness: 300, damping: 20 
              }}
            />

            {/* Hidden anchor blobs on either side that the moving knob "pulls" away from and "merges" into */}
            <div className="absolute top-1 left-1 w-[20px] h-[42px] rounded-full bg-white opacity-20" />
            <div className="absolute top-1 right-1 w-[20px] h-[42px] rounded-full bg-white opacity-20" />
          </div>
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
