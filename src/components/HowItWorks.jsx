import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Copy, Check } from 'lucide-react';

const HowItWorks = () => {
    const cards = [
        {
            step: "01",
            title: "Click Component",
            desc: "Browse our premium library and select the fully-coded component you need.",
            animation: (
                <div className="h-40 mt-6 md:mt-2 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center relative overflow-hidden">
                    {/* Fake Component (Button) */}
                    <motion.div
                        animate={{
                            scale: [1, 0.95, 1],
                            boxShadow: [
                                "0 0 0px rgba(154,0,2,0)",
                                "0 0 20px rgba(154,0,2,0.4)",
                                "0 0 0px rgba(154,0,2,0)"
                            ],
                            borderColor: [
                                "rgba(255,255,255,0.1)",
                                "rgba(154,0,2,0.5)",
                                "rgba(255,255,255,0.1)"
                            ]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="px-8 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black text-[15px] font-medium border border-transparent shadow-lg relative z-10"
                    >
                        Login Button
                    </motion.div>

                    {/* Animated Mouse Pointer */}
                    <motion.div
                        animate={{
                            x: [40, 0, 40],
                            y: [40, 0, 40]
                        }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        className="absolute z-20"
                        style={{ marginLeft: '16px', marginTop: '16px' }}
                    >
                        <MousePointer2 size={24} className="text-black dark:text-white drop-shadow-md fill-white dark:fill-black" />
                    </motion.div>
                </div>
            )
        },
        {
            step: "02",
            title: "Copy Prompt",
            desc: "Instantly copy the prompt string or code right to your clipboard.",
            animation: (
                <div className="h-40 mt-6 md:mt-2 rounded-2xl bg-[#1e1e1e] dark:bg-[#0a0a0a] border border-black/10 dark:border-white/5 flex flex-col p-6 relative overflow-hidden group/code z-10 shadow-inner">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        </div>

                        <motion.div
                            animate={{ opacity: [0, 1, 0, 0] }}
                            transition={{ duration: 4, repeat: Infinity, times: [0, 0.2, 0.8, 1] }}
                            className="flex items-center gap-1.5 text-[var(--color-accent-red)] mix-blend-screen"
                        >
                            <Check size={14} strokeWidth={3} />
                            <span className="text-[11px] font-bold uppercase tracking-wider">Copied</span>
                        </motion.div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <motion.div
                            animate={{ backgroundColor: ["rgba(255,255,255,0.1)", "rgba(154,0,2,0.4)", "rgba(255,255,255,0.1)"] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="w-full h-3 rounded-sm"
                        />
                        <div className="w-[75%] h-3 bg-white/10 rounded-sm" />
                        <div className="w-[45%] h-3 bg-white/10 rounded-sm" />
                    </div>

                    {/* Copy Button Flash */}
                    <motion.div
                        animate={{ scale: [1, 0.9, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="absolute right-4 bottom-4 p-2 rounded-md bg-white/10 text-white/50"
                    >
                        <Copy size={14} />
                    </motion.div>
                </div>
            )
        }
    ];

    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep((prev) => (prev + 1) % cards.length);
        }, 5000); // 5 seconds per step
        return () => clearInterval(interval);
    }, [cards.length]);

    return (
        <section className="w-full flex flex-col items-center justify-center pt-10 pb-24 relative min-h-[500px] overflow-hidden">
            <div className="relative z-10 w-full flex items-center justify-center max-w-4xl mx-auto px-4 md:px-0 h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        className="absolute flex flex-col items-center justify-center w-full max-w-lg p-4 z-20"
                    >
                        <div className="flex flex-col relative z-10 w-full items-center text-center">
                            {/* Animation block moved to the top */}
                            <div className="w-full mb-12 scale-110">
                                {cards[currentStep].animation}
                            </div>
                            <span className="text-[var(--color-accent-red)] font-bold tracking-[0.2em] text-[11px] mb-5 block uppercase opacity-80">{cards[currentStep].step}</span>
                            <h3 className="text-black dark:text-white text-3xl sm:text-[40px] font-medium mb-5 tracking-tight drop-shadow-sm">{cards[currentStep].title}</h3>
                            <p className="text-black/50 dark:text-white/50 font-light leading-relaxed max-w-[340px] mx-auto text-[17px]">{cards[currentStep].desc}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default HowItWorks;
