import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Chrome Border Button": fully rounded white pill button with a thin true-chrome outline — a rotating conic-gradient ring in shades of black, white, and gray (mimicking a polished metal reflection) with one small hint of red, clipped so it only ever shows as a thin sliver at the border, never washing over the white face. The centered text itself is rendered with a moving black/white/gray metallic gradient that shimmers left to right on a loop. Soft drop shadow.`;

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
                <div
                    className="relative rounded-full p-[1.5px] overflow-hidden shadow-[0_10px_28px_rgba(0,0,0,0.1)]"
                    style={{ background: 'linear-gradient(135deg, #ffffff 0%, #d8d9dc 35%, #f4f4f5 55%, #c9cacd 80%, #ffffff 100%)' }}
                >
                    {/* traveling rainbow ring — only ever peeks through the thin border gap */}
                    <motion.span
                        className="absolute -inset-[45%] blur-[2px]"
                        style={{
                            background:
                                'conic-gradient(from 0deg, #0a0a0a, #ffffff, #8a8a8a, #ffffff, #1c1c1c, #dcdcdc, #e11d2e, #dcdcdc, #1c1c1c, #ffffff, #8a8a8a, #ffffff, #0a0a0a)',
                        }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />

                    <button className="relative z-10 px-12 py-4 min-w-[220px] flex items-center justify-center rounded-full bg-white select-none">
                        <motion.span
                            className="relative z-10 text-[17px] font-semibold tracking-tight bg-clip-text text-transparent"
                            style={{
                                backgroundImage: 'linear-gradient(100deg, #2a2a2a 0%, #4a4a4a 20%, #1c1c1c 40%, #5c5c5c 55%, #232323 70%, #4a4a4a 85%, #2a2a2a 100%)',
                                backgroundSize: '250% 100%',
                            }}
                            animate={{ backgroundPosition: ['0% 50%', '250% 50%'] }}
                            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                        >
                            Purrform
                        </motion.span>
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
