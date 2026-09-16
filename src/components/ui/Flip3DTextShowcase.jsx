import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `3D Mechanical Flip Text. Words split into characters and perform staggered 3D rotateX flips to reveal the next word, simulating a mechanical ticker board.`;

const WORDS = ["STUNNING", "SEAMLESS", "POWERFUL", "BEAUTIFUL"];

export default function Flip3DTextShowcase() {
    const [copied, setCopied] = useState(false);
    const [index, setIndex] = useState(0);

    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % WORDS.length);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    const currentWord = WORDS[index];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-white/10 bg-[#050505] shadow-xl flex items-center justify-center perspective-[1000px]">
                
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-white flex gap-1">
                    <AnimatePresence mode="popLayout">
                        {currentWord.split('').map((char, i) => (
                            <motion.span
                                key={`${index}-${i}`}
                                initial={{ opacity: 0, rotateX: -90, y: 20 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                exit={{ opacity: 0, rotateX: 90, y: -20 }}
                                transition={{ 
                                    duration: 0.6, 
                                    ease: "backOut",
                                    delay: i * 0.05 
                                }}
                                style={{ transformOrigin: "50% 50%" }}
                                className="inline-block bg-white/5 border border-white/10 rounded-xl px-2 py-4 shadow-2xl"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </h2>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase">3D Mechanical Flip</span>
            </div>
</div>
    );
}
