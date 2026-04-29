import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `neumorphic soft recessed track toggle button with dual drop shadow extrusions`;

export default function NeumorphicSoftToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e0e5ec] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[240px] h-[90px] rounded-[100px] bg-[#e0e5ec] shadow-[inset_6px_6px_12px_#b8beca,_inset_-6px_-6px_12px_#ffffff] cursor-pointer flex items-center p-2"
                >
                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isOn ? '150px' : '0px' }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative z-20 w-[74px] h-[74px] rounded-full bg-[#e0e5ec] shadow-[6px_6px_12px_#b8beca,_-6px_-6px_12px_#ffffff] flex items-center justify-center"
                    >
                        {/* Inner dent to denote grip */}
                        <div className={`w-8 h-8 rounded-full shadow-[inset_3px_3px_6px_#b8beca,_inset_-3px_-3px_6px_#ffffff] transition-colors duration-300 ${isOn ? 'bg-[#5eead4]' : 'bg-transparent'}`}></div>
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 text-[13px] font-semibold tracking-widest uppercase">Neumorphic Soft</span>
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
