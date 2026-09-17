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
        <div className="w-full h-full flex flex-col items-center justify-center p-6">
            <div 
                onClick={() => setIndex((prev) => (prev + 1) % WORDS.length)}
                className="relative flex items-center justify-center perspective-[1000px] cursor-pointer select-none group"
            >
                <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest text-neutral-900 dark:text-[#E4DDF0] flex gap-1.5 sm:gap-2.5 transition-transform duration-200 group-hover:scale-[1.02]">
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
                                className="inline-block bg-white dark:bg-[#1A1723] border border-black/10 dark:border-white/10 rounded-xl sm:rounded-2xl px-2.5 sm:px-4 py-3 sm:py-5 shadow-lg dark:shadow-2xl"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </AnimatePresence>
                </h2>
            </div>

            <p className="mt-8 text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Click to flip to next word
            </p>
        </div>
    );
}
