import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Liquid Gooey Toggle in dark mode. The bright neon knob physically melts and tears away from its anchors using an SVG feColorMatrix filter, extremely tactile fluid motion.`;

export default function GooeyLiquidToggleShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const [isOn, setIsOn] = useState(false);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[400px] bg-[#0c0c0e]">
        
        <p className="text-[10px] uppercase tracking-[0.3em] mb-12 text-white/30 font-bold">Liquid Neon Toggle</p>

        {/* SVG Filter for the Gooey melting effect */}
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="goo-toggle">
              <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
          </defs>
        </svg>

        {/* Toggle Container */}
        <div 
          className="relative w-[120px] h-[60px] rounded-full cursor-pointer flex items-center px-2 border border-white/[0.05]"
          style={{ 
            background: isOn ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            transition: 'background 0.4s ease',
            boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5)' 
          }}
          onClick={() => setIsOn(!isOn)}
        >
          {/* The Gooey Track (Applies filter to children) */}
          <div className="absolute inset-0 rounded-full w-full h-full overflow-hidden" style={{ filter: 'url(#goo-toggle)' }}>
            
            {/* The actual moving neon knob */}
            <motion.div 
              className="absolute top-1.5 w-[48px] h-[48px] rounded-full shadow-[0_0_20px_rgba(52,211,153,0.5)]"
              style={{ background: isOn ? '#34d399' : '#52525b' }}
              initial={false}
              animate={{ 
                left: isOn ? "calc(100% - 48px - 6px)" : "6px",
                // Stretch horizontally while moving to create the liquid tearing effect
                scaleX: [1, 1.6, 1],
                backgroundColor: isOn ? '#34d399' : '#52525b'
              }}
              transition={{ 
                duration: 0.6,
                times: [0, 0.5, 1],
                type: "spring", stiffness: 250, damping: 20 
              }}
            />

            {/* Hidden anchor blobs on either side that the moving knob "pulls" away from and "merges" into */}
            <div className="absolute top-2 left-2 w-[24px] h-[44px] rounded-full opacity-40 transition-colors duration-500" style={{ background: isOn ? '#34d399' : '#52525b' }} />
            <div className="absolute top-2 right-2 w-[24px] h-[44px] rounded-full opacity-40 transition-colors duration-500" style={{ background: isOn ? '#34d399' : '#52525b' }} />
          </div>
        </div>

      </div>
</div>
  );
}
