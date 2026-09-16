import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `premium liquid metal chrome toggle switch where thumb squashes dynamically using framer motion springs`;

export default function LiquidMagnetToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#dfdfdf] dark:bg-[#151515] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className={`relative w-[200px] h-[76px] rounded-[100px] transition-colors duration-500 ${isOn ? 'bg-[#222] dark:bg-white' : 'bg-[#e9e9e9] dark:bg-[#2a2a2a]'} shadow-[inset_0_4px_10px_rgba(0,0,0,0.1),_0_2px_4px_rgba(255,255,255,0.5)] dark:shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)] p-[6px] cursor-pointer flex items-center`}
                >
                    {/* The Metallic Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? '124px' : '0px',
                            scaleX: isDragging ? 1.4 : 1,
                            scaleY: isDragging ? 0.8 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        className={`relative z-20 w-[64px] h-[64px] rounded-full flex items-center justify-center shadow-[0_8px_16px_rgba(0,0,0,0.2),_inset_0_-2px_4px_rgba(0,0,0,0.1),_inset_0_2px_8px_rgba(255,255,255,0.8)] origin-[center_${isOn ? 'right' : 'left'}] ${isOn ? 'bg-gradient-to-b from-[#f8f8f8] to-[#c8c8c8] dark:from-[#3a3a3a] dark:to-[#111]' : 'bg-gradient-to-b from-[#f8f8f8] to-[#c8c8c8] dark:from-[#3a3a3a] dark:to-[#111]'}`}
                    >
                         {/* Liquid Chrome Sheen */}
                         <motion.div 
                            initial={false}
                            animate={{ opacity: isDragging ? 1 : 0.6 }}
                            className="absolute inset-[4px] rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/90 via-transparent to-transparent pointer-events-none"
                        />
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Liquid Magnet</span>
            </div>
</div>
    );
}
