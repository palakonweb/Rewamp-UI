import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Chrome Border Button": fully rounded white pill button with a slow-rotating conic-gradient iridescent border (like a chrome/oil-slick reflection concentrated at the edges) behind a solid white inner fill, bold centered dark text, subtle drop shadow, no icon.`;

export default function ChromeBorderButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <div className="relative rounded-full p-[2px] shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                    <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{
                            background:
                                'conic-gradient(from 0deg, #ffffff, #ffe9a8, #ffffff, #a8d8ff, #ffffff, #ffb3d9, #ffffff, #b8ffcf, #ffffff)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    />
                    <button className="relative z-10 px-12 py-4 min-w-[220px] flex items-center justify-center rounded-full bg-white select-none">
                        <span className="relative z-10 text-[17px] font-semibold text-[#1B1717] tracking-tight">Purrform</span>
                    </button>
                </div>
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
