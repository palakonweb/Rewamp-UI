import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `neumorphic soft recessed track toggle button with dual drop shadow extrusions`;

export default function NeumorphicSoftToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e0e5ec] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[240px] h-[90px] rounded-[100px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#b8beca,_inset_-6px_-6px_12px_#ffffff] cursor-pointer flex items-center p-2"
                >
                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isOn ? '150px' : '0px' }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative z-20 w-[74px] h-[74px] rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#b8beca,_-6px_-6px_12px_#ffffff] flex items-center justify-center"
                    >
                        {/* Inner dent to denote grip */}
                        <div className={`w-8 h-8 rounded-full shadow-[inset_3px_3px_6px_#b8beca,_inset_-3px_-3px_6px_#ffffff] transition-colors duration-300 ${isOn ? 'bg-[#5eead4]' : 'bg-transparent'}`}></div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 text-[13px] font-semibold tracking-widest uppercase">Neumorphic Soft</span>
            </div>
</div>
    );
}
