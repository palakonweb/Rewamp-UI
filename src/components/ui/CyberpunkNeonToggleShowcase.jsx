import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `cyberpunk glitch toggle switch with high impact neon borders and chromatic aberration`;

export default function CyberpunkNeonToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#060608] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[280px] h-[80px] cursor-pointer flex items-center"
                >
                    {/* Track Container */}
                    <div className="absolute inset-0 border-[3px] border-[#333] shadow-[0_0_10px_rgba(0,0,0,0.8)] overflow-hidden skew-x-[-15deg]">
                        {/* Neon Fill */}
                        <motion.div 
                            initial={false}
                            animate={{ x: isOn ? '0%' : '-100%' }}
                            transition={{ duration: 0.3, ease: 'backOut' }}
                            className="absolute inset-0 bg-[#00ffcc] pointer-events-none mix-blend-screen"
                        />
                    </div>

                    {/* Glitch Borders (Cyan/Magenta flashes on toggle) */}
                    <motion.div 
                        initial={false}
                        animate={{ opacity: isOn ? [1, 0, 1, 0] : [1, 0, 1, 0], x: isOn ? [-5, 5, -2, 0] : [5, -5, 2, 0] }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 border-2 border-fuchsia-500 opacity-0 mix-blend-screen pointer-events-none skew-x-[-15deg] translate-y-1"
                    />

                    {/* Text Label */}
                    <div className="absolute inset-0 flex items-center justify-between px-10 pointer-events-none mix-blend-difference z-20 skew-x-[-15deg]">
                        <span className={`text-[#00ffcc] font-bold text-xl tracking-[0.2em] font-mono transition-opacity duration-300 ${isOn ? 'opacity-100' : 'opacity-0'}`}>ACTIVE</span>
                        <span className={`text-[#ff0055] font-bold text-xl tracking-[0.2em] font-mono transition-opacity duration-300 ${isOn ? 'opacity-0' : 'opacity-100'}`}>SYS.OFF</span>
                    </div>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isOn ? '204px' : '0px' }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="relative z-20 w-[70px] h-[90px] bg-white shadow-[0_0_15px_white] skew-x-[-15deg] border-2 border-[#00ffcc] ml-1"
                    >
                        {/* Inner scanline */}
                        <div className="absolute inset-x-0 top-1/2 h-1 bg-black/20 -translate-y-1/2"></div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Cyber Neon</span>
            </div>
</div>
    );
}
