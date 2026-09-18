import React, { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `animated aurora waves with slow organic motion and mesh gradient blending, premium dark UI aesthetic`;

export default function AuroraBackgroundShowcase() {
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
                
                {/* MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden bg-[#050505]">
                    {/* Dark radial overlay for depth */}
                    <div className="absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_100%)] opacity-80 mix-blend-multiply" />
                    
                    {/* Noise texture overlay */}
                    <div 
                        className="absolute inset-0 z-10 opacity-30 mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />

                    {/* Animated Aurora Layers */}
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.1, 1.05, 1],
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-[var(--color-accent-red)] rounded-[100%] blur-[120px] opacity-30 mix-blend-screen"
                    />
                    
                    <motion.div
                        animate={{
                            rotate: [0, -10, 5, 0],
                            scale: [1, 1.2, 0.9, 1],
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-indigo-500 rounded-[100%] blur-[120px] opacity-20 mix-blend-screen"
                    />

                    <motion.div
                        animate={{
                            rotate: [0, 15, -10, 0],
                            scale: [1, 0.9, 1.1, 1],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-emerald-500/30 rounded-[100%] blur-[100px] opacity-20 mix-blend-screen"
                    />
                </div>

                <BackgroundHeroOverlay />
            </div>

            {/* PROMPT CARD */}
</div>
    );
}
