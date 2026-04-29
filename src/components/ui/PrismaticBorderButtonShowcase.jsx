import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark matte button with a high fidelity spinning prismatic rgb conic gradient border`;

export default function PrismaticBorderButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#000] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON WRAPPER */}
                <motion.div
                    whileHover="hover"
                    whileTap="tap"
                    className="relative w-[220px] h-[64px] rounded-full p-[2px] shadow-2xl flex items-center justify-center cursor-pointer group/button"
                >
                    {/* Prismatic Conic Gradient Border */}
                    <div className="absolute inset-0 rounded-full overflow-hidden">
                        <motion.div 
                            variants={{
                                hover: { rotate: 360 }
                            }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-[--100%] w-[300%] h-[300%] left-[-100%] top-[-100%] bg-[conic-gradient(from_0deg,red,orange,yellow,green,blue,indigo,violet,red)]"
                        />
                    </div>
                    
                    {/* Background glow matching the border loosely */}
                    <motion.div 
                        variants={{
                            hover: { opacity: 0.5, scale: 1.1, filter: 'blur(30px)' }
                        }}
                        initial={{ opacity: 0.2, scale: 1, filter: 'blur(20px)' }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-white/20 rounded-full z-0"
                    />
                    
                    {/* The Dark Inner Button */}
                    <motion.button 
                        className="relative z-10 w-full h-full flex items-center justify-center rounded-full bg-[#0a0a0b] shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)]"
                    >
                        <span className="text-white text-[15px] font-semibold tracking-wider font-mono">INITIALIZE</span>
                    </motion.button>
                </motion.div>
                
                <span className="absolute bottom-6 text-white/30 text-[13px] font-semibold tracking-widest uppercase">Prismatic Border</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <motion.button onClick={handleCopy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </motion.button>
            </div>
        </div>
    );
}
