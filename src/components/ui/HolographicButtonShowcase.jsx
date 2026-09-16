import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check, Sparkle } from 'lucide-react';

const promptContent = `premium holographic foil shimmer effect mapped mathematically to mouse position`;

export default function HolographicButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const buttonRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (e) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    const mx = useTransform(x, [0, 200], [0, 100]);
    const my = useTransform(y, [0, 60], [0, 100]);

    // Creating string interpolation for gradient position
    const bgPosition = useTransform([mx, my], ([mappedX, mappedY]) => {
        if (mappedX === 0 && mappedY === 0) return '50% 50%'; // default when not hovering
        return `${mappedX}% ${mappedY}%`;
    });

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#050505] shadow-xl flex items-center justify-center p-8 group">

                {/* 🎯 THE BUTTON */}
                <motion.button
                    ref={buttonRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    whileTap={{ scale: 0.96 }}
                    className="relative px-8 py-4 rounded-xl text-white font-semibold tracking-wide overflow-hidden shadow-2xl"
                    style={{ width: 220, height: 60 }}
                >
                    {/* Dark Base */}
                    <div className="absolute inset-0 bg-[#111]" />

                    {/* Holographic foil mapped to mouse */}
                    <motion.div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 40%), linear-gradient(110deg, #ff0000 0%, #ffff00 20%, #00ff00 40%, #00ffff 60%, #0000ff 80%, #ff00ff 100%)`,
                            backgroundSize: '300% 300%',
                            backgroundPosition: bgPosition,
                            mixBlendMode: 'color-dodge'
                        }}
                    />

                    <span className="relative z-10 flex items-center justify-center gap-2 drop-shadow-md">
                        <Sparkle className="w-4 h-4 text-yellow-300" />
                        Mint NFT
                    </span>

                    {/* Glass border */}
                    <div className="absolute inset-0 border border-white/20 rounded-xl" />
                </motion.button>

                <span className="absolute bottom-6 text-black/40 dark:text-white/40 text-[13px] font-semibold tracking-widest uppercase">Holographic UI</span>
            </div>
</div>
    );
}
