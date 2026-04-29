import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `perspective 3d navbar that tilts and tracks the users mouse cursor using framer motion physics`;

export default function Perspective3DNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    // Spring physics for smooth trailing cursor reaction
    const mouseX = useSpring(0, { stiffness: 300, damping: 30 });
    const mouseY = useSpring(0, { stiffness: 300, damping: 30 });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        // Calculate mouse position relative to the center of the container (-1 to 1)
        const xPct = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const yPct = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

        mouseX.set(xPct);
        mouseY.set(yPct);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    // Transform mouse coordinate (-1 to 1) into rotation degrees
    const rotateX = useTransform(mouseY, [-1, 1], [15, -15]); // Up/Down tilts X axis
    const rotateY = useTransform(mouseX, [-1, 1], [-15, 15]); // Left/Right tilts Y axis

    const navItems = ["Overview", "Specs", "Gallery", "Buy Now"];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Perspective container */}
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#eaeaeb] dark:bg-[#15151a] shadow-xl flex items-center justify-center p-8 group"
                style={{ perspective: 1000 }} // Key for 3D
            >
                {/* Visualizer cursor hint */}
                <div className="absolute top-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-black/30 dark:text-white/30 text-sm font-medium animate-pulse pointer-events-none">
                    <MousePointer2 size={16} /> Track Mouse Inside Box
                </div>

                {/* 🎯 THE 3D NAVBAR */}
                <motion.nav 
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d"
                    }}
                    className="relative flex items-center gap-4 p-3 rounded-2xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-[0_30px_60px_rgba(0,0,0,0.15)] border border-white/50 dark:border-white/10"
                >
                    {navItems.map((item, index) => (
                        <motion.button
                            key={index}
                            className={`px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-colors ${
                                index === navItems.length - 1 
                                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg shadow-black/20 dark:shadow-white/20' 
                                    : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white'
                            }`}
                            // Lift items vertically towards camera in 3D space
                            style={{ transform: `translateZ(${index === navItems.length - 1 ? 40 : 20}px)` }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </motion.nav>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Perspective 3D</span>
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
