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
                
                {/* MOTION BACKGROUND */}
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

                <BackgroundHeroOverlay />
            </div>

            {/* PROMPT CARD */}
</div>
    );
}
