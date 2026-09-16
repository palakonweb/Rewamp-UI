import React, { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `floating blurred blobs with layered depth and parallax effect, deep high-contrast UI background`;

export default function FloatingBlobsBackgroundShowcase() {
    const [copied, setCopied] = useState(false);
    const { scrollYProgress } = useScroll();
    
    // Parallax values based on mock scroll (since it's inside a div, we'll just use animation to simulate parallax drift)
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#080808] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                    {/* Far background blob */}
                    <motion.div
                        style={{ y: y1 }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, 20, 0],
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-600/20 rounded-[40%] blur-[80px]"
                    />
                    
                    {/* Mid blob */}
                    <motion.div
                        style={{ y: y2 }}
                        animate={{
                            y: [0, 40, 0],
                            x: [0, -30, 0],
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-[10%] right-[10%] w-[50%] h-[50%] bg-indigo-500/20 rounded-[50%] blur-[90px]"
                    />
                    
                    {/* Foreground sharp blob */}
                    <motion.div
                        animate={{
                            y: [0, -20, 20, 0],
                            x: [0, -20, 10, 0],
                            scale: [1, 1.1, 0.9, 1]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute top-[40%] left-[60%] w-[30%] h-[30%] bg-purple-500/30 rounded-full blur-[60px]"
                    />
                </div>

                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
