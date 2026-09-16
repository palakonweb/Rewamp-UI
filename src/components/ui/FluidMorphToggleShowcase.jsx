import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `fluid morphing switch track that expands when you drag the thumb in framer motion`;

export default function FluidMorphToggleShowcase() {
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
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#111] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                {/* Track Morphs slightly when dragging (scales up vertically, gets squishy) */}
                <motion.div 
                    onClick={() => setIsOn(!isOn)}
                    animate={{ 
                        scaleY: isDragging ? 1.15 : 1, 
                        scaleX: isDragging ? 0.95 : 1,
                        backgroundColor: isOn ? '#10b981' : '#d1d5db' // emerald-500 or gray-300
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative w-[180px] h-[80px] rounded-[100px] shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] cursor-pointer flex items-center p-2"
                >
                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? '100px' : '0px',
                            width: isDragging ? '75px' : '64px',
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 25, mass: 1 }}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                        className={`relative z-20 h-[64px] rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center origin-[center_${isOn ? 'right' : 'left'}]`}
                    />
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Fluid Morph</span>
            </div>
</div>
    );
}
