import React, { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check, Fingerprint } from 'lucide-react';

const promptContent = `spatial holographic card with deep parallax layers that shift independently on hover`;

export default function HoloDepthCardShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    // Parallax layers
    const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
    const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);
    
    const midX = useTransform(mouseXSpring, [-0.5, 0.5], ["-10%", "10%"]);
    const midY = useTransform(mouseYSpring, [-0.5, 0.5], ["-10%", "10%"]);

    const fgX = useTransform(mouseXSpring, [-0.5, 0.5], ["-20%", "20%"]);
    const fgY = useTransform(mouseYSpring, [-0.5, 0.5], ["-20%", "20%"]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        
        const width = rect.width;
        const height = rect.height;
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f9f9f9] dark:bg-[#050505] flex items-center justify-center p-8 [perspective:1200px]">
                
                {/* THE HOLO DEPTH CARD */}
                <motion.div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                        rotateX,
                        rotateY,
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl cursor-pointer group"
                >
                    {/* LAYER 1: Deep Background Grid */}
                    <motion.div 
                        style={{ x: bgX, y: bgY, translateZ: "-50px" }}
                        className="absolute inset-0 w-full h-full rounded-3xl opacity-30"
                    >
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
                    </motion.div>

                    {/* LAYER 2: Midground Content */}
                    <motion.div 
                        style={{ x: midX, y: midY, translateZ: "30px" }}
                        className="absolute inset-0 w-full h-full p-8 flex flex-col items-center justify-center text-center pointer-events-none"
                    >
                        <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                            <Fingerprint className="text-cyan-400 w-10 h-10" />
                        </div>
                        
                        <h3 className="text-2xl font-bold text-white tracking-tight mb-3">
                            Biometric Sync
                        </h3>
                        
                        <p className="text-sm text-cyan-100/60 font-light leading-relaxed">
                            Authenticate instantly with multi-layer deep security verification protocols.
                        </p>
                    </motion.div>

                    {/* LAYER 3: Foreground Shimmer/Particles */}
                    <motion.div 
                        style={{ x: fgX, y: fgY, translateZ: "80px" }}
                        className="absolute inset-0 w-full h-full pointer-events-none"
                    >
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-300 blur-[1px]" />
                        <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 rounded-full bg-white blur-[1px]" />
                        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 rounded-full bg-cyan-400 blur-[2px]" />
                    </motion.div>

                    {/* Top Glass Reflection */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

                </motion.div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Holo Parallax Depth</span>
            </div>
</div>
    );
}
