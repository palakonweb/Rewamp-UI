import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `premium cosmic switch with starfield particles exploding on toggle activation`;

export default function CosmicSparkleToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Very simple confetti / star array
    const stars = Array.from({ length: 12 });

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8 group overflow-hidden">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsOn(!isOn)}
                    className="relative w-[240px] h-[80px] rounded-full bg-[#11162b] shadow-[inset_0_4px_16px_rgba(0,0,0,0.8),_0_0_0_2px_rgba(255,255,255,0.05)] cursor-pointer flex items-center p-2"
                >
                    {/* Stars Explosion Layer */}
                    <div className="absolute inset-0 pointer-events-none overflow-visible">
                        <AnimatePresence>
                            {isOn && stars.map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: 120, y: 40, opacity: 1, scale: 0 }}
                                    animate={{ 
                                        x: 120 + (Math.random() - 0.5) * 150, 
                                        y: 40 + (Math.random() - 0.5) * 150,
                                        opacity: 0,
                                        scale: Math.random() * 1.5 + 0.5
                                    }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_8px_yellow]"
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="absolute right-8 text-white/20 font-bold tracking-widest pointer-events-none">OFF</div>
                    <motion.div 
                        animate={{ opacity: isOn ? 1 : 0 }}
                        className="absolute left-8 text-[#fff] font-bold tracking-widest text-shadow-[0_0_10px_white] pointer-events-none"
                    >
                        ON
                    </motion.div>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? '160px' : '0px',
                            background: isOn ? 'radial-gradient(circle, #fff 0%, #d4e7ff 100%)' : 'radial-gradient(circle, #444 0%, #222 100%)',
                            boxShadow: isOn ? '0 0 20px rgba(200,230,255,0.6)' : '0 2px 8px rgba(0,0,0,0.5)'
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative z-20 w-[64px] h-[64px] rounded-full flex items-center justify-center p-2"
                    >
                        {isOn && (
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            >
                                {/* SVG Star */}
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2b59ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Cosmic Sparkle</span>
            </div>
</div>
    );
}
