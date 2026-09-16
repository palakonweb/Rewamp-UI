import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Rocket, Shield, Zap } from 'lucide-react';

const promptContent = `180 degree 3d flipping pricing card revealing hidden features on the backface`;

export default function FlippingPricingCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#000] shadow-xl flex items-center justify-center p-8">
                
                {/* Scene Wrapper to establish 3D space */}
                <div className="relative w-full max-w-[360px] aspect-[3/4]" style={{ perspective: 1500 }}>
                    
                    {/* 🎯 THE FLIPPING CARD COMPONENT */}
                    <motion.div
                        className="w-full h-full relative"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        style={{ transformStyle: "preserve-3d" }}
                    >
                        {/* --- FRONT FACE --- */}
                        <div 
                            className="absolute inset-0 w-full h-full bg-white dark:bg-[#111] rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10 flex flex-col cursor-pointer hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-shadow"
                            style={{ backfaceVisibility: "hidden" }}
                            onClick={() => setIsFlipped(true)}
                        >
                            <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6">
                                <Rocket size={24} />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Pro Tier</h3>
                            <div className="flex items-baseline gap-1 mb-6">
                                <span className="text-4xl font-bold text-black dark:text-white">$49</span>
                                <span className="text-black/50 dark:text-white/50 text-[14px]">/mo</span>
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><Check size={12} strokeWidth={3} /></div>
                                    <span className="text-black/70 dark:text-white/70 text-[14px]">Unlimited Projects</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-500"><Check size={12} strokeWidth={3} /></div>
                                    <span className="text-black/70 dark:text-white/70 text-[14px]">Advanced Analytics</span>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-xl bg-black dark:bg-white text-white dark:text-black font-bold mt-auto mb-3">Subscribe Now</button>
                            <p className="text-center text-[12px] text-orange-500 font-bold tracking-widest uppercase">Click to flip →</p>
                        </div>
                        {/* --- END FRONT FACE --- */}


                        {/* --- BACK FACE --- */}
                        <div 
                            className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#111] to-[#000] dark:from-[#222] dark:to-[#111] rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col cursor-pointer"
                            style={{ 
                                backfaceVisibility: "hidden", 
                                transform: "rotateY(180deg)" 
                            }}
                            onClick={() => setIsFlipped(false)}
                        >
                            <h3 className="text-xl font-bold text-white mb-6 pt-4 text-center">Under the Hood</h3>
                            
                            <div className="flex-1 flex flex-col justify-center gap-8 px-2">
                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                                        <Shield size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-[15px]">Dedicated Server</span>
                                        <span className="text-white/50 text-[13px] leading-relaxed">Your data resides on an isolated AWS instance.</span>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0 text-yellow-400">
                                        <Zap size={20} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-white font-bold text-[15px]">Zero Latency</span>
                                        <span className="text-white/50 text-[13px] leading-relaxed">Edge network distribution guarantees &lt;50ms response times.</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-center text-[12px] text-white/40 font-bold tracking-widest uppercase mt-auto">← Flip Back</p>
                        </div>
                        {/* --- END BACK FACE --- */}

                    </motion.div>

                </div>

                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">180° Preserved 3D</span>
            </div>
</div>
    );
}
