import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, Hexagon } from 'lucide-react';

const promptContent = `collectible trading card wrapped in a holographic chromatic foil sheen mapped to cursor tilt`;

export default function HolographicReflectiveCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);

    const x = useSpring(0.5, { stiffness: 100, damping: 20 });
    const y = useSpring(0.5, { stiffness: 100, damping: 20 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        const xPct = (e.clientX - rect.left) / rect.width;
        const yPct = (e.clientY - rect.top) / rect.height;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0.5);
        y.set(0.5);
    };

    // Calculate the background position for the foil gradient (moves wildly relative to mouse)
    const backgroundPosition = useTransform(
        [x, y],
        ([latestX, latestY]) => `${latestX * 100}% ${latestY * 100}%`
    );

    // Minor 3D Tilt
    const rotateX = useTransform(y, [0, 1], [15, -15]);
    const rotateY = useTransform(x, [0, 1], [-15, 15]);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#111] shadow-xl flex items-center justify-center p-8" style={{ perspective: 1000 }}>
                
                {/* 🎯 THE HOLOGRAPHIC CARD */}
                <motion.div 
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative w-full max-w-[320px] aspect-[2.5/3.5] rounded-[20px] cursor-pointer group"
                >
                    {/* The Base Card Design */}
                    <div className="absolute inset-0 bg-[#0a0a0a] rounded-[20px] border-[8px] border-black overflow-hidden flex flex-col">
                        <div className="h-[40%] w-full bg-neutral-900 border-b-2 border-neutral-800 flex items-center justify-center p-4">
                            <motion.div style={{ translateZ: 30 }} className="w-full h-full border border-neutral-700/50 rounded-lg flex items-center justify-center shadow-lg bg-gradient-to-br from-neutral-800 to-neutral-900">
                                <Hexagon size={64} className="text-white/20" strokeWidth={1} />
                            </motion.div>
                        </div>
                        <div className="flex-1 p-4 flex flex-col">
                            <motion.span style={{ translateZ: 20 }} className="text-white font-black text-xl mb-1 tracking-tight">HOLO-RARE</motion.span>
                            <motion.span style={{ translateZ: 15 }} className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4">Edition 1/1</motion.span>
                            <motion.p style={{ translateZ: 10 }} className="text-white/60 text-[12px] leading-relaxed">
                                A highly sought-after component demonstrating complex multi-stop CSS radial gradients masked securely to the boundary box.
                            </motion.p>
                        </div>
                    </div>

                    {/* The Holographic Foil Overlay */}
                    <motion.div 
                        className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-100 mix-blend-color-dodge dark:mix-blend-screen pointer-events-none transition-opacity duration-300"
                        style={{
                            backgroundImage: `
                                radial-gradient(farthest-corner circle at var(--x, 50%) var(--y, 50%), 
                                rgba(255, 255, 255, 0.8) 10%, 
                                rgba(255, 255, 255, 0.6) 20%,
                                rgba(255, 100, 200, 0.5) 30%, 
                                rgba(100, 255, 255, 0.4) 40%, 
                                rgba(200, 255, 100, 0.3) 50%, 
                                rgba(100, 100, 255, 0.2) 60%, 
                                transparent 80%)`,
                            backgroundPosition: backgroundPosition, // Reacts to Framer Motion values mapped in JS
                            // We use a CSS var trick combined with Framer Motion hook above for smoother multi-stop gradients
                            '--x': useTransform(x, v => `${v * 100}%`),
                            '--y': useTransform(y, v => `${v * 100}%`)
                        }}
                    />
                    
                    {/* Secondary Sheen for metallic reflection */}
                    <motion.div 
                        className="absolute inset-0 rounded-[12px] opacity-0 group-hover:opacity-40 mix-blend-overlay pointer-events-none transition-opacity duration-300"
                        style={{
                            background: 'linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.8) 25%, transparent 30%)',
                            backgroundPosition: backgroundPosition,
                            backgroundSize: '200% 200%'
                        }}
                    />
                </motion.div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Chromatic Foil Sheen</span>
            </div>
</div>
    );
}
