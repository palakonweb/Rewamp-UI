import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `premium toggle switch featuring spinning prismatic conic gradient border bounding box`;

export default function PrismaticTrackToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0a0a0c] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[280px] h-[90px] rounded-full p-[3px] shadow-2xl cursor-pointer flex items-center overflow-hidden"
                >
                    {/* Prismatic Conic Gradient Background Track */}
                    <motion.div 
                        animate={{ rotate: 360, scale: isOn ? 1.2 : 1 }}
                        transition={{ rotate: { duration: 2, repeat: Infinity, ease: "linear" }, scale: { duration: 0.4 } }}
                        className="absolute inset-[--100%] w-[300%] h-[300%] left-[-100%] top-[-100%] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)] opacity-80"
                    />

                    {/* Dark Inner Track Cutout */}
                    <div className="relative w-full h-full bg-[#111] rounded-full z-10 p-2 shadow-[inset_0_4px_16px_rgba(0,0,0,0.8)] overflow-hidden">
                        
                        {/* Glow trailing behind the thumb */}
                        <motion.div 
                            initial={false}
                            animate={{ opacity: isOn ? 0.3 : 0 }}
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                        />

                        {/* The Stark White Thumb */}
                        <motion.div 
                            initial={false}
                            animate={{ x: isOn ? '186px' : '0px' }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="relative z-20 w-[68px] h-[68px] rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)] flex items-center justify-center border border-white"
                        >
                            <div className="w-4 h-4 rounded-full bg-black/10 inset-shadow-sm"></div>
                        </motion.div>
                    </div>
                </div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Prismatic Track</span>
            </div>
</div>
    );
}
