import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Fingerprint } from 'lucide-react';

const promptContent = `pure CSS animated glowing border tracing button utilizing spinning conic gradients`;

export default function BorderTraceButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <div className="relative inline-flex overflow-hidden rounded-full p-[2px] cursor-pointer group/btn" style={{ WebkitTapHighlightColor: 'transparent' }}>
                    
                    {/* Spinning Gradient Mask */}
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050505_0%,#3b82f6_50%,#050505_100%)] opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#050505_0%,#4b5563_50%,#050505_100%)] opacity-100 transition-opacity duration-500 group-hover/btn:opacity-0" />
                    
                    {/* Inner Button Canvas */}
                    <motion.button 
                        whileTap={{ scale: 0.98 }}
                        className="relative z-10 flex h-full w-full items-center justify-center gap-2 rounded-full bg-[#111111] px-8 py-3 text-sm font-semibold tracking-wide text-white/90 backdrop-blur-3xl"
                    >
                        <Fingerprint className="w-4 h-4 text-blue-500 transition-colors duration-500 group-hover/btn:text-white" />
                        Acknowledge
                    </motion.button>
                </div>
                
                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Border Trace UI</span>
            </div>
</div>
    );
}
