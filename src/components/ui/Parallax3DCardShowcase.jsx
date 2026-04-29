import React, { useState, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, MousePointer2, Layers } from 'lucide-react';

const promptContent = `parallax 3d card tilting on hover while deeply extruding internal layers using framer motion`;

export default function Parallax3DCardShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    // Spring physics
    const x = useSpring(0, { stiffness: 300, damping: 30 });
    const y = useSpring(0, { stiffness: 300, damping: 30 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate percentages
        const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Base card rotation
    const rotateX = useTransform(y, [-1, 1], [15, -15]);
    const rotateY = useTransform(x, [-1, 1], [-15, 15]);
    
    // Deeper parallax transforms for internal elements
    const elementX1 = useTransform(x, [-1, 1], [-20, 20]);
    const elementY1 = useTransform(y, [-1, 1], [-20, 20]);
    
    const elementX2 = useTransform(x, [-1, 1], [-40, 40]);
    const elementY2 = useTransform(y, [-1, 1], [-40, 40]);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e4e4e7] dark:bg-[#111] shadow-xl flex items-center justify-center group perspective-1000"
                style={{ perspective: 1200 }}
            >
                <div className="absolute top-10 flex items-center gap-2 text-black/40 dark:text-white/40 text-[13px] font-bold tracking-widest uppercase pointer-events-none animate-pulse">
                    <MousePointer2 size={16} /> Hover Area
                </div>

                {/* 🎯 THE 3D PARALLAX CARD */}
                <motion.div 
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative w-full max-w-[340px] aspect-[4/5] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[32px] p-8 shadow-[0_30px_60px_rgba(79,70,229,0.3)] border border-white/20"
                >
                    {/* Deep Background Layer (Pushed back) */}
                    <motion.div 
                        style={{ x: elementX1, y: elementY1, translateZ: -50 }}
                        className="absolute inset-4 rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-md"
                    />

                    {/* Middle Content Layer (Standard Z) */}
                    <div className="relative h-full flex flex-col pt-4 z-10" style={{ transform: "translateZ(30px)" }}>
                        <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-white mb-6">
                            <Layers size={28} />
                        </div>
                        
                        <h3 className="text-3xl font-bold text-white tracking-tight mb-2">Deep Parallax</h3>
                        <p className="text-white/70 text-[14px] leading-relaxed">
                            Layers are mathematically separated across the Z-axis, causing extreme depth perception when tilted.
                        </p>
                    </div>

                    {/* Top Foreground Layer (Pulled completely forward) */}
                    <motion.div 
                        style={{ x: elementX2, y: elementY2, translateZ: 80 }}
                        className="absolute bottom-8 right-8 w-16 h-16 rounded-full bg-white hidden sm:flex items-center justify-center shadow-xl cursor-pointer hover:scale-110 transition-transform"
                    >
                        <span className="text-indigo-600 font-bold text-[14px]">View</span>
                    </motion.div>
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">Z-Axis Depth</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
