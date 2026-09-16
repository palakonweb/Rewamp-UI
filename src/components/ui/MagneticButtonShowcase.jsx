import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `magnetic button that subtly attracts towards the user's cursor utilizing framer motion physics`;

export default function MagneticButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = buttonRef.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 }); // dampening factor
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#0f0f0f] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    ref={buttonRef}
                    onMouseMove={handleMouse}
                    onMouseLeave={reset}
                    animate={{ x: position.x, y: position.y }}
                    transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                    className="flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-[17px] font-semibold tracking-wide shadow-2xl transition-colors"
                >
                    <MousePointer2 className="w-5 h-5" />
                    Hover me
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 dark:text-white/40 text-[13px] font-semibold tracking-widest uppercase">Magnetic UI</span>
            </div>
</div>
    );
}
