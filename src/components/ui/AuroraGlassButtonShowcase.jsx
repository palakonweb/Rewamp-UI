import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Sparkles } from 'lucide-react';

const promptContent = `premium dark glass pill button with animated colorful aurora underglow shadow`;

export default function AuroraGlassButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#111111] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-[180px] h-[60px] flex items-center justify-center cursor-pointer"
                >
                    {/* Glowing underlay (Aurora) */}
                    <motion.div 
                        variants={{
                            hover: { 
                                opacity: 1, 
                                scale: 1.2, 
                                rotate: 5,
                                filter: 'blur(25px)' 
                            },
                            tap: { scale: 0.95, opacity: 0.8 }
                        }}
                        initial={{ opacity: 0.7, scale: 1, rotate: 0, filter: 'blur(20px)' }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="absolute w-[110%] h-[130%] bg-gradient-to-r from-[#d4a04d] via-[#4d8f63] to-[#245842] rounded-full z-0"
                    />
                    
                    {/* The Button */}
                    <motion.button 
                        className="relative z-10 w-full h-full flex items-center justify-center bg-[#0a0a0b]/80 border border-t-white/30 border-b-black/50 border-x-white/10 rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.15),_0_8px_16px_rgba(0,0,0,0.4)] backdrop-blur-md overflow-hidden"
                    >
                        <span className="text-white text-[16px] font-normal tracking-wide z-10">Button</span>
                        
                        {/* Shimmer effect inside the glass on hover */}
                        <motion.div 
                            variants={{
                                hover: { x: ['-100%', '200%'] },
                            }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                            className="absolute top-0 bottom-0 w-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] pointer-events-none"
                            initial={{ x: '-100%' }}
                        />
                    </motion.button>

                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/40 text-[13px] font-semibold tracking-widest uppercase">Aurora Glass</span>
            </div>
</div>
    );
}
