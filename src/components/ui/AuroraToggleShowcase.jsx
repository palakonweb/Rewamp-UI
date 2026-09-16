import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';

const promptContent = `premium dark toggle switch with glowing holographic thumb and sleek inset track`;

export default function AuroraToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e4e4e6] dark:bg-[#0a0a0a] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[320px] h-[100px] rounded-[100px] bg-[#111] dark:bg-[#050505] shadow-[inset_0_4px_16px_rgba(0,0,0,0.8),_0_2px_4px_rgba(255,255,255,0.1)] p-3 cursor-pointer flex items-center overflow-hidden"
                >
                    {/* Background glow when ON */}
                    <motion.div 
                        animate={{ opacity: isOn ? 1 : 0, filter: isOn ? 'blur(30px)' : 'blur(0px)' }}
                        className="absolute right-0 w-[50%] h-[150%] bg-gradient-to-l from-cyan-400/30 via-fuchsia-400/30 to-transparent rounded-full z-0 pointer-events-none"
                    />

                    {/* Text Label */}
                    <span className="absolute left-10 text-white font-medium text-xl z-10 transition-opacity duration-300 select-none">
                        Switch
                    </span>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? '160px' : '0px',
                            boxShadow: isOn 
                                ? '0 0 20px rgba(100,200,255,0.4), inset 0 2px 4px rgba(255,255,255,0.5)' 
                                : '0 2px 10px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className={`relative z-20 w-[136px] h-[76px] rounded-[100px] flex items-center justify-end px-5 ${
                            isOn 
                                ? 'bg-gradient-to-r from-[#d484ff] via-[#aad4ff] to-[#d4ffff]'
                                : 'bg-[#222] border border-white/5'
                        }`}
                    >
                        {isOn && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-black"
                            >
                                <ArrowRight strokeWidth={2.5} size={24} />
                            </motion.div>
                        )}
                        {!isOn && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="w-5 h-5 rounded-full border-2 border-white/40"
                            />
                        )}
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Aurora Switch</span>
            </div>
</div>
    );
}
