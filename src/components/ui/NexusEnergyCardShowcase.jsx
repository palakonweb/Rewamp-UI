import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Zap, ArrowUpRight } from 'lucide-react';

const promptContent = `dark card with glowing energy beams that trace the inner borders on hover`;

export default function NexusEnergyCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-neutral-100 dark:bg-[#050505] flex items-center justify-center p-8">
                
                {/* NEXUS ENERGY CARD */}
                <motion.div 
                    whileHover="hover"
                    initial="rest"
                    className="relative w-full max-w-[360px] aspect-[4/5] rounded-[2rem] bg-black dark:bg-[#0a0a0a] border border-white/10 overflow-hidden group cursor-pointer shadow-2xl"
                >
                    {/* Background Subtle Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-violet-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Animated SVG Border Traces */}
                    <div className="absolute inset-2 z-10 pointer-events-none overflow-hidden rounded-[1.5rem]">
                        <svg className="absolute inset-0 w-full h-full" width="100%" height="100%">
                            <motion.rect
                                x="1" y="1" rx="23" ry="23"
                                width="calc(100% - 2px)" height="calc(100% - 2px)"
                                fill="none"
                                stroke="url(#energyGradient)"
                                strokeWidth="2"
                                strokeDasharray="100 400"
                                strokeDashoffset="0"
                                variants={{
                                    rest: { strokeDashoffset: 500, opacity: 0 },
                                    hover: { 
                                        strokeDashoffset: 0, 
                                        opacity: [0, 1, 1, 0],
                                        transition: { 
                                            duration: 2, 
                                            repeat: Infinity, 
                                            ease: "linear" 
                                        } 
                                    }
                                }}
                            />
                            <defs>
                                <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#8b5cf6" />
                                    <stop offset="50%" stopColor="#c084fc" />
                                    <stop offset="100%" stopColor="#3b82f6" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-20 h-full p-8 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                            <motion.div 
                                variants={{
                                    rest: { scale: 1, boxShadow: "0px 0px 0px rgba(139, 92, 246, 0)" },
                                    hover: { scale: 1.1, boxShadow: "0px 0px 30px rgba(139, 92, 246, 0.4)" }
                                }}
                                transition={{ duration: 0.4 }}
                                className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md"
                            >
                                <Zap className="text-violet-400 w-6 h-6" />
                            </motion.div>
                            
                            <motion.div 
                                variants={{
                                    rest: { opacity: 0, x: -10 },
                                    hover: { opacity: 1, x: 0 }
                                }}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"
                            >
                                <ArrowUpRight className="text-white w-4 h-4" />
                            </motion.div>
                        </div>

                        <div>
                            <motion.h3 
                                variants={{
                                    rest: { y: 0 },
                                    hover: { y: -5 }
                                }}
                                className="text-2xl font-bold text-white tracking-tight mb-2"
                            >
                                Nexus Engine
                            </motion.h3>
                            <motion.p 
                                variants={{
                                    rest: { opacity: 0.6, y: 0 },
                                    hover: { opacity: 1, y: -5 }
                                }}
                                className="text-white/60 text-sm leading-relaxed"
                            >
                                Ignite your workflow with high-performance routing and dynamic scaling directly integrated into your stack.
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Nexus Energy</span>
            </div>
</div>
    );
}
