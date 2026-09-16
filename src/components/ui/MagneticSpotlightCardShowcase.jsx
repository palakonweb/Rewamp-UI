import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, Crosshair } from 'lucide-react';

const promptContent = `dark mode stealth card with a magnetic spotlight glare illuminating borders and inner surfaces strictly upon proximity`;

export default function MagneticSpotlightCardShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    // Track mouse globally within the showcase wrapper, not just the card!
    const mouseX = useSpring(0, { stiffness: 100, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 100, damping: 20 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#111] dark:bg-[#050505] shadow-xl flex items-center justify-center p-8 group cursor-crosshair"
            >
                
                {/* 🎯 THE SPOTLIGHT CARD */}
                <div className="relative w-full max-w-[380px] aspect-[16/9] rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between overflow-hidden">
                    
                    {/* The Internal Spotlight */}
                    <motion.div 
                        className="absolute w-[600px] h-[600px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
                        style={{
                            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)',
                            left: useTransform(mouseX, x => x - 300), // offset by half width
                            top: useTransform(mouseY, y => y - 300), // offset by half height
                        }}
                    />

                    {/* The Spotlight Border Overlay 
                        We use a pseudo-element masking technique, but here implemented cleanly via absolute positioning.
                    */}
                    <div className="absolute inset-0 p-[1px] rounded-2xl overflow-hidden pointer-events-none">
                         <motion.div 
                            className="absolute w-[300px] h-[300px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
                            style={{
                                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 50%)',
                                left: useTransform(mouseX, x => x - 150),
                                top: useTransform(mouseY, y => y - 150),
                            }}
                        />
                        {/* Cutout center so only the 1px border glows */}
                        <div className="absolute inset-[1px] bg-[#111] dark:bg-[#0a0a0a] rounded-2xl" />
                    </div>

                    {/* Card Content (Elevated above the dark cutout) */}
                    <div className="relative z-10 w-full h-full flex flex-col justify-between">
                         <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50">
                             <Crosshair size={20} />
                         </div>

                         <div>
                             <h3 className="text-xl font-bold text-white mb-1 tracking-tight">Stealth Spotlight</h3>
                             <p className="text-[13px] text-white/40">
                                 The radial gradient tracking is mapped to the parent container, allowing the border to illuminate *before* your cursor actually enters the card.
                             </p>
                         </div>
                    </div>

                </div>
                
                <span className="absolute bottom-6 right-6 text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10">Magnetic Border Glow</span>
            </div>
</div>
    );
}
