import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Info } from 'lucide-react';

const promptContent = `advanced 3D flip button revealing secondary content on hover utilizing preserve-3d`;

export default function Flip3DButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eef2f6] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER for 3D Context */}
                <div className="relative w-48 h-14 [perspective:1000px]">
                    <motion.div 
                        className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                        whileHover={{ rotateX: 180 }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    >
                        {/* Front Face */}
                        <div className="absolute inset-0 w-full h-full bg-[#111] text-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 [backface-visibility:hidden]">
                            <Info className="w-4 h-4" />
                            <span className="font-semibold tracking-wide">Hover for details</span>
                        </div>
                        
                        {/* Back Face */}
                        <div className="absolute inset-0 w-full h-full bg-[var(--color-accent-red)] text-white rounded-xl shadow-[0_4px_15px_rgba(154,0,2,0.3)] flex items-center justify-center [backface-visibility:hidden] [transform:rotateX(180deg)] border border-white/20">
                            <span className="font-bold tracking-widest text-sm uppercase">Pro Feature</span>
                        </div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">3D Flip UI</span>
            </div>
</div>
    );
}
