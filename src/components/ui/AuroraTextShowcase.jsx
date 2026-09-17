import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Aurora Borealis text reveal using complex overlapping CSS radial gradients and SVG turbulence filters masked inside typography, ultra premium high-effort aesthetic, dark theme`;

function AuroraText({ children, className = '' }) {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* The visible text that acts as a mask */}
      <div 
        className="relative z-10 font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-teal-700 dark:from-white/90 dark:to-white/40"
      >
        {children}
      </div>

      {/* The glowing aurora background masked to the text */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60 dark:opacity-100 dark:mix-blend-screen"
           style={{ WebkitMaskImage: 'linear-gradient(black, black)', WebkitMaskClip: 'text', color: 'transparent' }}>
        {/* We use duplicate text to act as the mask for the aurora */}
        <div 
          className="absolute inset-0 font-bold tracking-tighter"
          style={{ WebkitTextFillColor: 'transparent', WebkitBackgroundClip: 'text' }}
        >
          {/* Animated Blob 1 */}
          <motion.div 
            className="absolute top-0 left-[-20%] w-[70%] h-[150%] rounded-full opacity-60 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(212,203,229,1) 0%, rgba(212,203,229,0) 70%)', filter: 'blur(15px)' }}
            animate={{ x: ['0%', '50%', '0%'], y: ['0%', '20%', '0%'], scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Animated Blob 2 */}
          <motion.div 
            className="absolute top-[-30%] right-[-10%] w-[60%] h-[160%] rounded-full opacity-50 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(156,142,184,1) 0%, rgba(156,142,184,0) 70%)', filter: 'blur(20px)' }}
            animate={{ x: ['0%', '-40%', '0%'], y: ['0%', '30%', '0%'], scale: [1, 1.5, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Animated Blob 3 */}
          <motion.div 
            className="absolute bottom-[-40%] left-[20%] w-[80%] h-[140%] rounded-full opacity-60 mix-blend-screen"
            style={{ background: 'radial-gradient(circle, rgba(228,221,240,1) 0%, rgba(228,221,240,0) 70%)', filter: 'blur(25px)' }}
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
    <div className="w-full h-full flex flex-col items-center justify-center p-6 select-none">
      {/* Ambient background glow in brand lilac */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[50%] opacity-25 pointer-events-none blur-[90px]"
        style={{ background: 'linear-gradient(90deg, rgba(156,142,184,0.4), rgba(212,203,229,0.4), rgba(228,221,240,0.4))' }} 
      />

      <div className="text-center relative z-10 w-full">
        <AuroraText className="text-[52px] sm:text-[88px] leading-[1.05] tracking-tight">
          Limitless Design
        </AuroraText>
      </div>
    </div>
  );
}
