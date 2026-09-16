import React, { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `animated mesh gradient with slow organic motion, liquid-like color blending, premium dark UI aesthetic`;

export default function MeshGradientBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0a0a0a] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#0a0a0a]">
                    <motion.div
                        animate={{
                            x: ['-20%', '20%', '-10%', '-20%'],
                            y: ['-20%', '10%', '20%', '-20%'],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] bg-rose-500/40 rounded-full blur-[100px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            x: ['20%', '-10%', '10%', '20%'],
                            y: ['10%', '-20%', '20%', '10%'],
                            scale: [1, 0.8, 1.3, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[60%] bg-fuchsia-600/30 rounded-full blur-[100px] mix-blend-screen"
                    />
                    <motion.div
                        animate={{
                            x: ['10%', '-30%', '20%', '10%'],
                            y: ['-10%', '20%', '-20%', '-10%'],
                            scale: [0.9, 1.1, 1, 0.9],
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-violet-600/30 rounded-full blur-[90px] mix-blend-screen"
                    />
                </div>

                <BackgroundHeroOverlay title="Fluid mesh gradient to enhance your UI" />
            </div>

            {/* 📋 PROMPT CARD */}
            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                
                {/* 🔘 COPY BUTTON */}
                <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-transparent dark:border-white/5 transition-all w-full sm:w-auto justify-center shrink-0"
                    aria-label="Copy prompt text"
                >
                    {copied ? (
                        <>
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                <Check size={16} className="text-emerald-500" />
                            </motion.div>
                            <span className="text-[13px] font-medium text-emerald-500">Copied</span>
                        </>
                    ) : (
                        <>
                            <Copy size={16} className="text-black/60 dark:text-white/60" />
                            <span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span>
                        </>
                    )}
                </motion.button>
            </div>
        </div>
    );
}
