import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ShieldCheck } from 'lucide-react';

const promptContent = `elegant dark mode saas feature card grid background pulsing glowing brand icon spotlight effect`;

export default function ElegantSaaSFeatureCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#000] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE SAAS FEATURE CARD */}
                <motion.div 
                    whileHover="hover"
                    className="relative w-full max-w-[340px] aspect-square bg-white dark:bg-[#0a0a0a] rounded-[32px] p-8 shadow-xl border border-black/5 dark:border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer"
                >
                    {/* Grid Background Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

                    {/* Spotlight Glow on Hover */}
                    <motion.div 
                        variants={{
                            hover: { opacity: 1, scale: 1.2 }
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                        className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-emerald-500/20 blur-[100px] pointer-events-none rounded-full"
                    />

                    {/* Top Icon Block */}
                    <div className="relative z-10 w-14 h-14 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-emerald-500">
                        {/* Static Icon */}
                        <ShieldCheck size={28} />
                        
                        {/* Animated Glow behind Icon */}
                        <motion.div 
                            variants={{
                                hover: { opacity: 0.5, scale: 1.5 }
                            }}
                            initial={{ opacity: 0, scale: 1 }}
                            className="absolute inset-0 bg-emerald-500 blur-xl -z-10 rounded-full"
                        />
                    </div>

                    {/* Bottom Info Block */}
                    <div className="relative z-10 flex flex-col gap-2">
                        <h3 className="text-xl font-bold text-black dark:text-white tracking-tight">Enterprise Security</h3>
                        <p className="text-[14px] text-black/60 dark:text-white/60 leading-relaxed">
                            Bank-grade encryption protecting your data at rest and while strictly in-transit.
                        </p>
                        
                        <motion.span 
                            variants={{
                                hover: { x: 5, opacity: 1 }
                            }}
                            initial={{ x: 0, opacity: 0.7 }}
                            className="text-emerald-500 text-[13px] font-semibold flex items-center gap-1 mt-2"
                        >
                            Learn Architecture <span>→</span>
                        </motion.span>
                    </div>
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">SaaS Feature Block</span>
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
