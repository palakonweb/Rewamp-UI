import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `parallax day and night toggle switch with layered illustrated masks and sliding thumb`;

export default function DayNightParallaxToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [isNight, setIsNight] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#7fb5ff] dark:bg-[#1a2035] shadow-xl flex items-center justify-center p-8 group transition-colors duration-1000">
                
                {/* 🎯 THE TOGGLE WRAPPER */}
                <div 
                    onClick={() => setIsNight(!isNight)}
                    className="relative w-[340px] h-[140px] rounded-[100px] bg-gradient-to-br from-[#5390e3] to-[#7fb5ff] shadow-[inset_0_8px_16px_rgba(0,0,0,0.2)] p-2 cursor-pointer flex items-center overflow-hidden border-4 border-[#4176c4]/50"
                    style={{
                        background: isNight ? 'linear-gradient(to bottom right, #1a2035, #2d3753)' : 'linear-gradient(to bottom right, #5390e3, #7fb5ff)'
                    }}
                >
                    {/* Background sceneries */}
                    <div className="absolute inset-0 z-0 overflow-hidden rounded-[100px] opacity-70 pointer-events-none">
                        {/* Day Scenery */}
                        <motion.div 
                            initial={false}
                            animate={{ opacity: isNight ? 0 : 1, y: isNight ? 20 : 0 }}
                            className="absolute inset-0 flex items-end justify-center pb-4"
                        >
                             <div className="w-16 h-16 bg-white/40 rounded shadow-md absolute bottom-2 left-10"></div>
                             <div className="w-12 h-20 bg-white/50 rounded shadow-md absolute bottom-2 left-28"></div>
                             <div className="w-20 h-10 bg-white/30 rounded shadow-md absolute bottom-2 left-44"></div>
                             {/* Clouds */}
                             <div className="absolute top-6 left-12 w-14 h-6 bg-white/70 rounded-full blur-[2px]"></div>
                             <div className="absolute top-10 left-32 w-20 h-8 bg-white/70 rounded-full blur-[2px]"></div>
                        </motion.div>
                        
                        {/* Night Scenery */}
                        <motion.div 
                            initial={false}
                            animate={{ opacity: isNight ? 1 : 0, y: isNight ? 0 : -20 }}
                            className="absolute inset-0 flex items-end justify-center pb-4"
                        >
                            {/* Stars */}
                            <div className="absolute top-6 left-14 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                            <div className="absolute top-12 left-32 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]"></div>
                            <div className="absolute top-8 left-48 w-2 h-2 bg-white rounded-full shadow-[0_0_6px_white]"></div>
                            {/* Dark cityscape */}
                            <div className="w-16 h-16 bg-[#111]/40 rounded shadow-md absolute bottom-2 left-14"></div>
                            <div className="w-10 h-24 bg-[#111]/60 rounded shadow-md absolute bottom-2 left-36"></div>
                        </motion.div>
                    </div>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ x: isNight ? '200px' : '0px' }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                        className="relative z-20 w-[120px] h-[120px] rounded-full shadow-[0_8px_16px_rgba(0,0,0,0.4)] flex items-center justify-center overflow-hidden border-8 border-transparent mix-blend-normal"
                        style={{
                            background: isNight ? '#f0f0f0' : '#ffdf70',
                            boxShadow: isNight ? 'inset -15px -15px 30px rgba(0,0,0,0.1), 0 4px 20px rgba(0,0,0,0.5)' : 'inset -10px -10px 20px rgba(255,150,0,0.3), 0 4px 20px rgba(0,0,0,0.3)',
                            borderColor: isNight ? '#2d3753' : '#4176c4'
                        }}
                    >
                        {/* Moon craters */}
                        {isNight && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 pointer-events-none">
                                <div className="absolute top-4 left-6 w-4 h-4 rounded-full bg-black/10"></div>
                                <div className="absolute top-10 left-12 w-8 h-8 rounded-full bg-black/10"></div>
                                <div className="absolute top-16 left-4 w-6 h-6 rounded-full bg-black/10"></div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/50 dark:text-white/50 text-[13px] font-semibold tracking-widest uppercase">Day/Night Parallax</span>
            </div>
</div>
    );
}
