import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';

const promptContent = `Aceternity-style moving border button. A continuous conic gradient spins behind a dark pill, creating a mesmerizing glowing border trace effect.`;

export default function SVGBorderBeamButtonShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 p-16 flex flex-col items-center justify-center min-h-[400px] bg-[#050505]">
        
        <p className="absolute top-10 text-[10px] uppercase tracking-[0.3em] mb-12 text-white/30">
          Moving Border Button
        </p>

        {/* Ambient background grid */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* The Button Container */}
        <div className="relative group">
           
           {/* Outer spinning gradient mask */}
           <div className="absolute -inset-[2px] rounded-full overflow-hidden blur-[2px] opacity-70 group-hover:opacity-100 transition-opacity duration-500">
               <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-100%] w-[300%] h-[300%]"
                   style={{
                       background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 70%, #38bdf8 85%, #818cf8 100%)'
                   }}
               />
           </div>

           {/* Sharp inner spinning gradient for the crisp border line */}
           <div className="absolute -inset-[1px] rounded-full overflow-hidden">
               <motion.div 
                   animate={{ rotate: 360 }}
                   transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-[-100%] w-[300%] h-[300%]"
                   style={{
                       background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 75%, #38bdf8 90%, #818cf8 100%)'
                   }}
               />
           </div>

           {/* Main Dark Button Body */}
           <button className="relative flex items-center gap-3 px-8 py-4 bg-[#0a0a0c] rounded-full z-10 group-hover:bg-[#111116] transition-colors duration-300 border border-white/[0.02]">
             <Sparkles size={16} className="text-sky-400 group-hover:text-white transition-colors duration-300" />
             <span className="text-white/90 font-medium tracking-wide text-sm">Deploy Application</span>
           </button>

           {/* Huge ambient glow on hover */}
           <div className="absolute inset-0 bg-sky-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full" />
        </div>

      </div>
</div>
  );
}
