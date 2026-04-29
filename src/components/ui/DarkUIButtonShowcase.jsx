import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, FolderUp } from 'lucide-react';

const promptContent = `deep navy slate minimal dark UI generic button`;

export default function DarkUIButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#000000] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: '#212037' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-3 bg-[#1d1b32] px-8 py-4 rounded-3xl border border-[#3e3b6e]/30 shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-colors"
                >
                    <FolderUp className="w-5 h-5 text-[#736af9]" />
                    <span className="text-[#968fff] text-[17px] font-medium tracking-wide">Upload files</span>
                </motion.button>
                
                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Dark UI</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <motion.button onClick={handleCopy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </motion.button>
            </div>
        </div>
    );
}
