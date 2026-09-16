import React, { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `huge ambient glowing orbs slowly drifting and mixing colors, very soft SaaS aesthetic`;

export default function AmbientGlowOrbsShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0c0c0c] shadow-2xl flex items-center justify-center p-8 group">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            x: ["0%", "50%", "10%", "0%"],
                            y: ["0%", "20%", "50%", "0%"],
                            scale: [1, 1.2, 0.8, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-[var(--color-accent-red)] rounded-[100%] mix-blend-screen opacity-30"
                        style={{ filter: "blur(80px)" }}
                    />
                    <motion.div
                        animate={{
                            x: ["0%", "-40%", "20%", "0%"],
                            y: ["0%", "30%", "-20%", "0%"],
                            scale: [1, 0.9, 1.1, 1],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[20%] right-[0%] w-[50%] h-[70%] bg-purple-600 rounded-[100%] mix-blend-screen opacity-20"
                        style={{ filter: "blur(100px)" }}
                    />
                    <motion.div
                        animate={{
                            x: ["0%", "30%", "-30%", "0%"],
                            y: ["0%", "-40%", "10%", "0%"],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] bg-emerald-600 rounded-[100%] mix-blend-screen opacity-20"
                        style={{ filter: "blur(90px)" }}
                    />
                </div>

                <BackgroundHeroOverlay title="Ambient glowing orbs to enhance your UI" />
            </div>

            {/* 📋 PROMPT CARD */}
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
