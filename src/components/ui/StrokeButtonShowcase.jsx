import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowRight } from 'lucide-react';

const promptContent = `minimalist stroke ui pill button with internal arrow circle translated on hover`;

export default function StrokeButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#837bf3] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover="hover"
                    whileTap="tap"
                    className="relative bg-white px-2 py-2 rounded-full flex items-center shadow-[0_10px_25px_rgba(0,0,0,0.15)] border-2 border-[#1a1a1a]"
                >
                    <span className="text-[#1a1a1a] text-[18px] font-semibold tracking-wide pl-6 pr-4">Sign Up</span>
                    
                    <motion.div 
                        variants={{
                            hover: { x: 4, scale: 1.05 },
                            tap: { scale: 0.95 }
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="w-[42px] h-[42px] bg-[#1a1a1a] rounded-full flex items-center justify-center"
                    >
                        <ArrowRight className="text-white w-5 h-5" strokeWidth={2.5} />
                    </motion.div>
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Stroke UI</span>
            </div>
</div>
    );
}
