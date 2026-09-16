import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `pure liquid metal card simulating chrome reflections reacting dynamically to mouse orientation`;

export default function LiquidMetalCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);

    const mouseX = useSpring(0.5, { stiffness: 100, damping: 20 });
    const mouseY = useSpring(0.5, { stiffness: 100, damping: 20 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Convert to 0 -> 1 scale
        const xPct = (e.clientX - rect.left) / rect.width;
        const yPct = (e.clientY - rect.top) / rect.height;

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    // Calculate background gradient positions based on mouse
    const bgX1 = useTransform(mouseX, [0, 1], [-100, 200]);
    const bgY1 = useTransform(mouseY, [0, 1], [-50, 150]);
    
    // Reverse reflection
    const bgX2 = useTransform(mouseX, [0, 1], [200, -100]);
    const bgY2 = useTransform(mouseY, [0, 1], [150, -50]);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#1a1a1a] dark:bg-[#000] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE LIQUID METAL CARD */}
                <div 
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    className="relative w-full max-w-[340px] aspect-square rounded-[32px] overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.8)] border border-white/20 select-none cursor-pointer"
                >
                    {/* Metal Base Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700 via-gray-300 to-gray-800" />
                    
                    {/* Primary Dynamic Reflection */}
                    <motion.div 
                        style={{
                            left: bgX1,
                            top: bgY1
                        }}
                        className="absolute w-[400px] h-[300px] bg-white opacity-80 blur-[60px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
                    />

                    {/* Secondary Dark/Sharp Reflection mimicking curved chrome */}
                    <motion.div 
                        style={{
                            left: bgX2,
                            top: bgY2
                        }}
                        className="absolute w-[200px] h-[400px] bg-black opacity-60 blur-[30px] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
                    />

                    {/* Texture overlay (brushed metal look) */}
                    <div className="absolute inset-0 bg-[url('https://transparenttextures.com/patterns/brushed-alum.png')] opacity-40 mix-blend-overlay pointer-events-none" />

                    {/* Embossed Text */}
                    <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none drop-shadow-[0_2px_1px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_2px_1px_rgba(0,0,0,0.8)]">
                        <h2 className="text-4xl font-black text-gray-800 dark:text-gray-300 tracking-tighter mix-blend-color-burn dark:mix-blend-color-dodge">LIQUID</h2>
                        <h2 className="text-4xl font-black text-gray-800 dark:text-gray-300 tracking-tighter mix-blend-color-burn dark:mix-blend-color-dodge -mt-2">CHROME</h2>
                    </div>
                </div>

                <span className="absolute bottom-6 right-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">Reflective Metal</span>
            </div>
</div>
    );
}
