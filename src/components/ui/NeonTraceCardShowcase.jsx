import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ScanLine } from 'lucide-react';

const promptContent = `sleek dark card with a continuous neon light beam that traces the entire border infinitely`;

export default function NeonTraceCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#030303] flex items-center justify-center p-8">
                
                {/* THE NEON TRACE CARD */}
                <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[32px] bg-[#0d0d0f] p-[2px] overflow-hidden group shadow-2xl">
                    
                    {/* The Spinning Conic Gradient for the Trace Effect */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-[-100%] w-[300%] h-[300%] pointer-events-none"
                        style={{
                            background: 'conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 60%, #38bdf8 80%, #a855f7 100%)',
                        }}
                    />

                    {/* Inner Card Body */}
                    <div className="relative w-full h-full rounded-[30px] bg-[#0d0d0f] flex flex-col p-8 overflow-hidden z-10">
                        {/* Subtle internal gradient */}
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                        
                        <div className="flex-1 flex flex-col items-center justify-center text-center">
                            <div className="w-16 h-16 rounded-full bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                <ScanLine className="text-fuchsia-400 w-7 h-7" />
                            </div>
                            
                            <h3 className="text-2xl font-semibold text-white tracking-tight mb-3">
                                Perimeter Scan
                            </h3>
                            <p className="text-white/50 text-[14px] leading-relaxed font-light">
                                Enhance security protocols with continuous edge-detection lighting and zero-latency border scanning.
                            </p>
                        </div>
                        
                        {/* Glowing button */}
                        <button className="w-full py-3.5 mt-4 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-white/90 text-sm font-medium transition-colors duration-300">
                            Initialize Protocol
                        </button>
                    </div>

                    {/* Ambient Glow from the trace leaking out */}
                    <div className="absolute inset-0 rounded-[32px] shadow-[0_0_40px_rgba(168,85,247,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">Neon Trace Border</span>
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
