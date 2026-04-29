import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper realistic 3d skeuomorphic toggle switch with deep inset shadow tracks and physical physical red thumb`;

export default function Skeuomorphic3DToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] border border-black/5 dark:border-white/10 bg-[#eaeaeb] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[300px] h-[140px] rounded-[100px] shadow-[inset_0_12px_24px_rgba(0,0,0,0.15),_inset_0_-8px_16px_rgba(255,255,255,0.8),_0_2px_4px_rgba(0,0,0,0.05)] bg-[#f4f4f4] cursor-pointer flex items-center p-3 border-[3px] border-white/50"
                >
                    {/* Track Background Red Fill */}
                    <motion.div 
                        initial={false}
                        animate={{ width: isOn ? '100%' : '50%' }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute left-0 top-0 bottom-0 bg-[#e83e3e] shadow-[inset_0_4px_10px_rgba(0,0,0,0.3)] rounded-[100px] z-0 overflow-hidden"
                    />

                    {/* OFF Track Area */}
                    <div className="absolute right-12 text-[#999] font-bold text-3xl z-0 pointer-events-none drop-shadow-sm font-sans tracking-tight">
                        OFF
                    </div>
                    {/* ON Track Area */}
                    <div className="absolute left-[54px] text-[#fff] font-bold text-3xl z-0 pointer-events-none drop-shadow-md font-sans tracking-tight opacity-90">
                        ON
                    </div>

                    {/* The Physical Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isOn ? '160px' : '0px' }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                        className="relative z-20 w-[112px] h-[116px] rounded-[100px] flex items-center justify-center bg-[#e83e3e] border border-[#ff6b6b]/40 shadow-[8px_0_20px_rgba(0,0,0,0.3),_-4px_0_10px_rgba(0,0,0,0.1),_inset_0_4px_10px_rgba(255,255,255,0.4),_inset_0_-4px_10px_rgba(0,0,0,0.2)]"
                    >
                        {/* Physical Ridge / Grip */}
                        <div className="w-[12px] h-[80%] rounded-full bg-[#d02c2c] shadow-[inset_2px_0_4px_rgba(0,0,0,0.2),_inset_-2px_0_4px_rgba(255,255,255,0.3)]"></div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase drop-shadow-sm">Skeuomorphic 3D</span>
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
