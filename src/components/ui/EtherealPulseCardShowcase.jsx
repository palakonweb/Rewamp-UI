import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Copy, Check, Waves } from 'lucide-react';

const promptContent = `glassmorphic card with ethereal bioluminescent ripples radiating from the cursor on hover`;

export default function EtherealPulseCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }) {
        let { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e5e5e5] dark:bg-[#0a0a0c] flex items-center justify-center p-8">
                
                {/* Background ambient lighting for the showcase */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 blur-[100px] pointer-events-none">
                    <div className="w-64 h-64 bg-fuchsia-500 rounded-full mix-blend-screen" />
                    <div className="w-64 h-64 bg-indigo-500 rounded-full mix-blend-screen -ml-32" />
                </div>

                {/* THE ETHEREAL PULSE CARD */}
                <div
                    onMouseMove={onMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="group relative w-full max-w-[360px] aspect-[4/5] rounded-[2rem] bg-white/10 dark:bg-black/20 backdrop-blur-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-2xl cursor-pointer"
                >
                    {/* The Ethereal Ripple Effect */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none mix-blend-color-dodge transition-opacity duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            background: useMotionTemplate`
                                radial-gradient(
                                    300px circle at ${mouseX}px ${mouseY}px, 
                                    rgba(232, 121, 249, 0.4) 0%, 
                                    rgba(129, 140, 248, 0.2) 40%, 
                                    transparent 80%
                                )
                            `,
                        }}
                    />

                    {/* Subtle concentric rings from cursor */}
                    <motion.div
                        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
                        style={{
                            opacity: isHovered ? 1 : 0,
                            backgroundImage: useMotionTemplate`
                                repeating-radial-gradient(
                                    circle at ${mouseX}px ${mouseY}px,
                                    transparent 0,
                                    rgba(255,255,255,0.05) 10px,
                                    transparent 20px
                                )
                            `,
                        }}
                    />

                    <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                        <div className="w-14 h-14 rounded-2xl bg-white/10 dark:bg-black/30 border border-white/20 dark:border-white/10 flex items-center justify-center backdrop-blur-md group-hover:scale-110 transition-transform duration-500 ease-out">
                            <Waves className="text-fuchsia-600 dark:text-fuchsia-300 w-7 h-7" />
                        </div>
                        
                        <div className="mt-auto relative">
                            {/* Masked highlight on text */}
                            <motion.h3 
                                className="text-3xl font-medium tracking-tight mb-3 text-black dark:text-white"
                            >
                                Bioluminescence
                            </motion.h3>
                            
                            <p className="text-black/60 dark:text-white/60 text-[15px] leading-relaxed font-light">
                                Smooth, organic light waves that respond fluidly to human interaction, creating a sensory digital experience.
                            </p>
                        </div>
                    </div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Ethereal Pulse</span>
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
