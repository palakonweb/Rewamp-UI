import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check, Command } from 'lucide-react';

const promptContent = `Elastic physics cursor that drags a floating glass tag attached via an animated spring string. Extremely smooth, ReactBits inspired interaction.`;

export default function ElasticStringCursorShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    // Mouse position
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Tag position (follows mouse with loose physics)
    const tagX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 1 });
    const tagY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 1 });

    const [isHovered, setIsHovered] = useState(false);
    
    // We need state to drive the SVG string so it updates every frame
    const [mPos, setMPos] = useState({ x: 0, y: 0 });
    const [tPos, setTPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Update state to render the SVG line correctly connecting mouse and tag
        const unsubscribeX = mouseX.on("change", v => setMPos(prev => ({ ...prev, x: v })));
        const unsubscribeY = mouseY.on("change", v => setMPos(prev => ({ ...prev, y: v })));
        const unsubscribeTX = tagX.on("change", v => setTPos(prev => ({ ...prev, x: v })));
        const unsubscribeTY = tagY.on("change", v => setTPos(prev => ({ ...prev, y: v })));

        return () => {
            unsubscribeX();
            unsubscribeY();
            unsubscribeTX();
            unsubscribeTY();
        };
    }, [mouseX, mouseY, tagX, tagY]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Calculate rotation of the tag based on the angle of the string
    const angle = Math.atan2(tPos.y - mPos.y, tPos.x - mPos.x) * (180 / Math.PI);
    // Add a slight tilt based on velocity/angle
    const tagRotation = isHovered ? angle + 90 : 0;

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div 
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fdfdfd] dark:bg-[#070707] flex items-center justify-center p-8 cursor-none"
            >
                <div className="text-center pointer-events-none">
                    <h2 className="text-3xl font-medium tracking-tight text-black dark:text-white mb-2">
                        Elastic Physics
                    </h2>
                    <p className="text-black/50 dark:text-white/50 text-[14px]">
                        Drag your mouse around to see the physical spring interaction.
                    </p>
                </div>

                {/* SVG String */}
                <svg className="absolute inset-0 pointer-events-none z-10" width="100%" height="100%">
                    {isHovered && (
                        <line 
                            x1={mPos.x} 
                            y1={mPos.y} 
                            x2={tPos.x} 
                            y2={tPos.y} 
                            stroke="currentColor" 
                            strokeWidth="1.5"
                            className="text-black/20 dark:text-white/20"
                        />
                    )}
                </svg>

                {/* THE MOUSE DOT */}
                <motion.div
                    className="absolute top-0 left-0 w-3 h-3 rounded-full bg-black dark:bg-white pointer-events-none z-30"
                    style={{
                        x: mouseX,
                        y: mouseY,
                        translateX: "-50%",
                        translateY: "-50%",
                        opacity: isHovered ? 1 : 0
                    }}
                />

                {/* THE DRAGGED TAG */}
                <motion.div
                    className="absolute top-0 left-0 pointer-events-none z-20"
                    style={{
                        x: tagX,
                        y: tagY,
                        translateX: "-50%",
                        translateY: "-10%",
                        rotate: tagRotation,
                        opacity: isHovered ? 1 : 0
                    }}
                >
                    <div className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 shadow-lg flex items-center gap-2">
                        <Command className="w-3.5 h-3.5 text-black/60 dark:text-white/60" />
                        <span className="text-[11px] font-bold text-black/80 dark:text-white/80 tracking-widest uppercase">
                            Conjure
                        </span>
                    </div>
                </motion.div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Elastic String</span>
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
