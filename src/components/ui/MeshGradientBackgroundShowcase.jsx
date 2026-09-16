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

                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
