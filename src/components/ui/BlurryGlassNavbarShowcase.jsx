import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Hexagon } from 'lucide-react';

const promptContent = `heavy blurry backdrop glass navbar with continuously shifting ambient gradient bottom border`;

export default function BlurryGlassNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [scrolled, setScrolled] = useState(false); // We'll just fake scroll state on click for showcase

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fafafa] dark:bg-[#050505] shadow-xl flex flex-col">
                
                {/* 🎯 THE GLASS NAVBAR */}
                <motion.header 
                    onClick={() => setScrolled(!scrolled)}
                    className="relative top-0 w-full z-50 transition-colors duration-500 cursor-pointer"
                >
                    <div className={`w-full px-6 py-4 flex items-center justify-between bg-white/70 dark:bg-black/50 backdrop-blur-2xl transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
                         {/* Logo */}
                         <div className="flex items-center gap-2">
                             <Hexagon size={24} className="text-indigo-500" fill="currentColor" strokeWidth={1} />
                             <span className="font-bold text-[16px] tracking-tight text-black dark:text-white">Aura</span>
                         </div>

                         {/* Links */}
                         <nav className="hidden md:flex gap-8">
                             <a href="#" className="text-[14px] font-medium text-black dark:text-white">Features</a>
                             <a href="#" className="text-[14px] font-medium text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">Pricing</a>
                             <a href="#" className="text-[14px] font-medium text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">Docs</a>
                         </nav>

                         {/* CTA */}
                         <button className="px-4 py-2 rounded-full bg-black dark:bg-white text-white dark:text-black text-[13px] font-semibold">
                             Get Started
                         </button>
                    </div>

                    {/* The Ambient Gradient Bottom Border */}
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden opacity-50">
                        <motion.div 
                            animate={{ x: ['-200%', '0%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                            className="w-[300%] h-full bg-gradient-to-r from-transparent via-indigo-500 to-transparent dark:via-cyan-400"
                        />
                    </div>
                </motion.header>

                {/* Dummy Page Content to show off blur */}
                <div className="flex-1 overflow-hidden p-8 flex flex-col gap-6 opacity-40">
                    <div className="w-full h-48 bg-gradient-to-br from-indigo-500/20 to-purple-500/10 rounded-2xl"></div>
                    <div className="w-2/3 h-8 bg-black/10 dark:bg-white/10 rounded-lg"></div>
                    <div className="w-full h-8 bg-black/10 dark:bg-white/10 rounded-lg"></div>
                    <p className="text-xs text-black/50 dark:text-white/50">(Click navbar to toggle shadow state)</p>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase drop-shadow-md">Blurry Glass</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
