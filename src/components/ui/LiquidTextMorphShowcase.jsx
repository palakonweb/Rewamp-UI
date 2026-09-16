import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Liquid Text Morph. Words melt and fuse into one another using an SVG feColorMatrix gooey filter and Framer Motion layout animations.`;

const WORDS = ["IMAGINE", "DESIGN", "BUILD", "PURRFORM"];

export default function LiquidTextMorphShowcase() {
    const [copied, setCopied] = useState(false);
    const [index, setIndex] = useState(0);

    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10 bg-[#000] shadow-xl flex items-center justify-center">
                
                {/* SVG Filter Definition */}
                <svg className="absolute w-0 h-0">
                    <defs>
                        <filter id="goo-text">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
                            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                        </filter>
                    </defs>
                </svg>

                {/* Container applying the gooey filter */}
                <div 
                    className="relative w-full h-full flex items-center justify-center pointer-events-none"
                    style={{ filter: 'url(#goo-text)' }}
                >
                    <AnimatePresence mode="wait">
                        <motion.h2
                            key={index}
                            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                            exit={{ opacity: 0, filter: 'blur(10px)', y: -20 }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white"
                        >
                            {WORDS[index]}
                        </motion.h2>
                    </AnimatePresence>
                </div>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase">Gooey Text Morph</span>
            </div>
</div>
    );
}
