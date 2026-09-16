import React, { useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `animated 3D grid with perspective distortion and glowing fade-out edges, futuristic minimalist UI`;

export default function AnimatedGridBackgroundShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#020202] shadow-2xl flex items-center justify-center p-8">
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden perspective-[1000px]">
                    {/* Dark gradient fade for the top to make the grid taper off */}
                    <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#020202] via-[#020202]/80 to-transparent h-1/2 w-full" />
                    
                    <motion.div
                        animate={{
                            backgroundPosition: ['0px 0px', '0px 40px'],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute inset-[-100%] w-[300%] h-[300%] top-1/2 left-1/2 flex items-center justify-center"
                        style={{
                            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            transform: 'translate(-50%, -10%) rotateX(60deg) scale(2)',
                            transformOrigin: 'top center'
                        }}
                    />
                    
                    {/* Glowing highlight in the center */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-[var(--color-accent-red)]/10 blur-[80px] pointer-events-none rounded-t-full mask-image:linear-gradient(to top, white, transparent)" />
                </div>

                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
