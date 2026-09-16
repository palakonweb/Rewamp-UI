import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Zap } from 'lucide-react';

const promptContent = `sci-fi card bordered by an infinitely looping electric plasma neon gradient`;

export default function ElectricPlasmaCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050510] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] flex items-center justify-center p-8">
                
                {/* 🎯 THE ELECTRIC PLASMA CARD wrapper */}
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[32px] p-1 flex items-center justify-center overflow-hidden group">
                    
                    {/* The Spinning Plasma Border (Background) */}
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: 'conic-gradient(transparent 70%, #00ffff 80%, #ff00ff 90%, transparent 100%)'
                        }}
                    />

                    {/* Static Plasma Border (Always visible but dim) */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-fuchsia-500/20 rounded-[32px] z-0" />

                    {/* The Inner Card Surface */}
                    <div className="relative z-10 w-full h-full bg-[#0a0a1a] rounded-[28px] border border-white/5 p-8 flex flex-col items-center justify-center text-center overflow-hidden shadow-[inset_0_0_40px_rgba(0,255,255,0.05)] group-hover:shadow-[inset_0_0_80px_rgba(255,0,255,0.1)] transition-shadow duration-700">
                        
                        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_30px_rgba(0,255,255,0.2)] group-hover:shadow-[0_0_40px_rgba(0,255,255,0.4)] transition-shadow">
                            <Zap size={28} />
                        </div>

                        <h3 className="text-2xl font-bold tracking-tight text-white mb-3">Plasma Engine</h3>
                        <p className="text-[13px] text-white/50 leading-relaxed max-w-[200px]">
                            Conic gradients infinitely rotating beneath a masked surface border create a surging electrical effect.
                        </p>
                        
                        <button className="mt-8 px-6 py-2.5 rounded-full bg-transparent border border-cyan-500/50 text-cyan-400 text-[12px] font-bold tracking-widest uppercase hover:bg-cyan-500/10 transition-colors">
                            Initialize
                        </button>

                        {/* Internal Scanlines */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] opacity-20" />
                    </div>

                </div>
                
                <span className="absolute bottom-6 left-6 text-cyan-500/30 text-[13px] font-semibold tracking-widest uppercase z-10">Neon Conic Border</span>
            </div>
</div>
    );
}
