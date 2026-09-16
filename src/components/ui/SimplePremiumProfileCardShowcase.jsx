import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Twitter, Github, Linkedin, Briefcase, MapPin } from 'lucide-react';

const promptContent = `simple elegant minimalist profile card with staggered entrance animations`;

export default function SimplePremiumProfileCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f8f9fa] dark:bg-[#0a0a0a] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE PROFILE CARD */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative w-full max-w-[340px] bg-white dark:bg-[#111] rounded-[32px] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] border border-black/5 dark:border-white/10 overflow-hidden"
                >
                    {/* Subtle Top Gradient Bar */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    
                    {/* Avatar */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 blur-md opacity-40 animate-pulse" />
                        <div className="relative w-full h-full rounded-full border-4 border-white dark:border-[#111] overflow-hidden bg-black/5 dark:bg-white/5 flex items-center justify-center shadow-inner">
                            {/* Abstract Avatar Graphic */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-black/20 dark:text-white/20 fill-current">
                                <circle cx="50" cy="35" r="20" />
                                <path d="M20 90 Q50 60 80 90 Z" />
                            </svg>
                        </div>
                    </div>

                    {/* Info Staggered */}
                    <motion.div 
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                        className="flex flex-col items-center text-center"
                    >
                        <motion.h3 
                            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="text-2xl font-bold text-black dark:text-white tracking-tight mb-1"
                        >
                            Elena Richards
                        </motion.h3>
                        
                        <motion.p 
                            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="text-blue-500 dark:text-blue-400 font-medium text-[14px] flex items-center gap-1.5 mb-4"
                        >
                            <Briefcase size={14} /> Product Designer
                        </motion.p>
                        
                        <motion.p 
                            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="text-black/50 dark:text-white/50 text-[13px] flex items-center gap-1.5 mb-8"
                        >
                            <MapPin size={14} /> San Francisco, CA
                        </motion.p>

                        <motion.div 
                            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="flex gap-4 w-full justify-center mb-8"
                        >
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 flex items-center justify-center text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
                                    <Icon size={18} />
                                </button>
                            ))}
                        </motion.div>

                        <motion.button 
                            variants={{ hidden: { y: 10, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
                            className="w-full py-3.5 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-semibold text-[14px] hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg shadow-black/10 dark:shadow-white/10"
                        >
                            View Portfolio
                        </motion.button>
                    </motion.div>
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-10">Minimal Profile</span>
            </div>
</div>
    );
}
