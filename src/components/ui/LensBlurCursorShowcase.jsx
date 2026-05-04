import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `Glassmorphic lens cursor that perfectly tracks the mouse, magnifying and blurring the background elements behind it with a soft frosty aesthetic.`;

export default function LensBlurCursorShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    
    // Smooth physics for the lens
    const springX = useSpring(cursorX, { stiffness: 400, damping: 28 });
    const springY = useSpring(cursorY, { stiffness: 400, damping: 28 });
    
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        cursorX.set(e.clientX - rect.left);
        cursorY.set(e.clientY - rect.top);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#050505] flex items-center justify-center p-8 cursor-none"
            >
                {/* Background Content to Blur/Magnify */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-12 overflow-hidden pointer-events-none z-0">
                    {/* Decorative abstract background elements */}
                    <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pink-500/20 dark:bg-pink-500/30 blur-[80px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 dark:bg-blue-500/30 blur-[80px] rounded-full" />
                    
                    {/* Floating typographic elements */}
                    <motion.div 
                        animate={{ y: [0, -20, 0] }} 
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="text-center"
                    >
                        <h2 className="text-[60px] sm:text-[100px] font-black tracking-tighter leading-none text-black/10 dark:text-white/10">
                            FOCUS
                        </h2>
                        <h2 className="text-[60px] sm:text-[100px] font-black tracking-tighter leading-none text-black/10 dark:text-white/10 -mt-6">
                            LENS
                        </h2>
                    </motion.div>
                </div>

                {/* Main Readability Text */}
                <div className="relative z-10 text-center pointer-events-none">
                    <p className="text-black/40 dark:text-white/40 text-lg font-medium max-w-md mx-auto">
                        Move your mouse around to explore the environment using the dynamic glassmorphic lens.
                    </p>
                </div>

                {/* THE LENS CURSOR */}
                <motion.div
                    className="absolute top-0 left-0 w-32 h-32 rounded-full pointer-events-none z-20 flex items-center justify-center"
                    style={{
                        x: springX,
                        y: springY,
                        translateX: "-50%",
                        translateY: "-50%",
                        opacity: isHovered ? 1 : 0,
                    }}
                >
                    {/* The actual glass element */}
                    <div className="w-full h-full rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/30 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.1)] flex items-center justify-center overflow-hidden">
                        {/* Subtle inner reflection */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent rounded-full pointer-events-none" />
                        <MousePointer2 className="text-black/50 dark:text-white/50 w-5 h-5 absolute" />
                    </div>
                </motion.div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Lens Blur Cursor</span>
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
