import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Aurora Borealis text reveal using complex overlapping CSS radial gradients and SVG turbulence filters masked inside typography, ultra premium high-effort aesthetic, dark theme`;

function AuroraText({ children, className }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* The visible text that acts as a mask */}
      <div 
        className="relative z-10 font-bold tracking-tighter"
        style={{
          background: 'transparent',
          WebkitTextFillColor: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.4))'
        }}
      >
        {children}
      </div>

      {/* The glowing aurora background masked to the text */}
      <div className="absolute inset-0 z-0 pointer-events-none mix-blend-screen overflow-hidden"
           style={{ WebkitMaskImage: 'linear-gradient(black, black)', WebkitMaskClip: 'text', color: 'transparent' }}>
        {/* We use duplicate text to act as the mask for the aurora */}
        <div 
          className="absolute inset-0 font-bold tracking-tighter"
          style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}
        >
          {/* Animated Blob 1 */}
          <motion.div 
            className="absolute top-0 left-[-20%] w-[70%] h-[150%] rounded-full opacity-60 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(147,197,253,1) 0%, rgba(147,197,253,0) 70%)', filter: 'blur(15px)' }}
            animate={{ x: ['0%', '50%', '0%'], y: ['0%', '20%', '0%'], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Animated Blob 2 */}
          <motion.div 
            className="absolute top-[-30%] right-[-10%] w-[60%] h-[160%] rounded-full opacity-50 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(196,181,253,1) 0%, rgba(196,181,253,0) 70%)', filter: 'blur(20px)' }}
            animate={{ x: ['0%', '-40%', '0%'], y: ['0%', '30%', '0%'], scale: [1, 1.5, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Animated Blob 3 */}
          <motion.div 
            className="absolute bottom-[-40%] left-[20%] w-[80%] h-[140%] rounded-full opacity-60 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(167,243,208,1) 0%, rgba(167,243,208,0) 70%)', filter: 'blur(25px)' }}
            animate={{ x: ['0%', '30%', '0%'], y: ['0%', '-30%', '0%'], scale: [1, 1.3, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          {/* SVG Noise overlay for texture */}
          <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
          
          {children}
        </div>
      </div>
    </div>
  );
}

export default function AuroraTextShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] p-8 sm:p-12 flex flex-col items-center justify-center min-h-[450px]"
        style={{ background: '#050505' }}>
        
        {/* Ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] opacity-20 pointer-events-none blur-[100px]"
             style={{ background: 'linear-gradient(90deg, rgba(147,197,253,1), rgba(196,181,253,1), rgba(167,243,208,1))' }} />

        <p className="text-[10px] uppercase tracking-[0.3em] mb-8 relative z-10" style={{ color: 'rgba(255,255,255,0.3)' }}>Aurora Text</p>

        <div className="text-center relative z-10 w-full">
          <AuroraText className="text-[48px] sm:text-[80px] leading-[1.1]">
            Limitless Design
          </AuroraText>
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[14px] mt-6 leading-relaxed max-w-md mx-auto"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            A high-fidelity rendering combining CSS radial gradients, screen blend modes, and SVG fractal noise masked entirely within typography.
          </motion.p>
        </div>
      </div>
</div>
  );
}
