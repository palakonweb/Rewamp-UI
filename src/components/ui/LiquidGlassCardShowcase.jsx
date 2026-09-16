import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Copy, Check, MousePointer2, Camera } from 'lucide-react';

const promptContent = `frosted liquid glass card where an internal background blobl strictly stalks the mouse cursor`;

export default function LiquidGlassCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);

    // Track mouse specifically within the card's local boundaries
    const blobX = useSpring(100, { stiffness: 100, damping: 20 });
    const blobY = useSpring(150, { stiffness: 100, damping: 20 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        
        // Offset to keep the blob's center on the cursor
        blobX.set(e.clientX - rect.left - 100); // 100 = half the blob width
        blobY.set(e.clientY - rect.top - 100); 
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#111111] shadow-xl flex items-center justify-center p-8 group">
                
                <div className="absolute top-10 flex items-center gap-2 text-black/40 dark:text-white/40 text-[13px] font-bold tracking-widest uppercase pointer-events-none animate-pulse">
                    <MousePointer2 size={16} /> Hover Internal Card
                </div>

                {/* 🎯 THE LIQUID GLASS CARD */}
                <div 
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    className="relative w-full max-w-[360px] aspect-square rounded-[32px] border border-black/10 dark:border-white/10 overflow-hidden shadow-2xl bg-white/20 dark:bg-white/5 cursor-crosshair"
                >
                    {/* The Stalking Blob (Behind the glass) */}
                    <motion.div 
                        style={{ x: blobX, y: blobY }}
                        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 blur-[40px] opacity-70 -z-10"
                    />

                    {/* The Frosted Glass Layer */}
                    <div className="absolute inset-0 backdrop-blur-[60px] bg-white/10 dark:bg-black/10 z-0" />

                    {/* Content (Above the glass) */}
                    <div className="relative z-10 w-full h-full p-8 flex flex-col">
                        <div className="w-12 h-12 rounded-xl bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/40 flex items-center justify-center text-black/80 dark:text-white/80 mb-auto shadow-sm">
                            <Camera size={24} />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-black/90 dark:text-white/90 tracking-tight mb-2">Liquid Morph</h3>
                            <p className="text-[14px] text-black/60 dark:text-white/60 leading-relaxed font-medium">
                                Heavy 60px blurring layers sandwich internal color blobs that spring-track the user's cursor dynamically.
                            </p>
                        </div>
                    </div>
                </div>

                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Frosted Blob</span>
            </div>
</div>
    );
}
