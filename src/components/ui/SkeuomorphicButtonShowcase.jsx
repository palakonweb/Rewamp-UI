import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper-realistic skeuomorphic plastic glossy button with soft inset shadows`;

export default function SkeuomorphicButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e8e9eb] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97, boxShadow: 'inset 0px 10px 20px rgba(0,0,0,0.1), 0px 2px 5px rgba(0,0,0,0.05)' }}
                    className="relative bg-[#f0f2f5] px-12 py-4 rounded-full text-[#4a4f56] text-[18px] font-medium tracking-wide border border-white/60 flex items-center justify-center overflow-hidden transition-shadow"
                    style={{
                        boxShadow: `
                            -6px -6px 14px rgba(255, 255, 255, 0.9), 
                            6px 6px 14px rgba(0, 0, 0, 0.08), 
                            inset 0px -4px 6px rgba(0,0,0,0.02),
                            inset 0px 4px 6px rgba(255,255,255,0.7)
                        `
                    }}
                >
                    {/* Glossy top highlight */}
                    <div className="absolute top-0 left-[10%] w-[80%] h-[40%] bg-gradient-to-b from-white to-transparent opacity-60 rounded-t-full pointer-events-none filter blur-[1px]"></div>
                    
                    <span className="relative z-10 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">Unlock It</span>
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Skeuomorphic UI</span>
            </div>
</div>
    );
}
