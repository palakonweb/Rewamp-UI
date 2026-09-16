import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, LayoutGrid, Sparkles, BookOpen, Layers } from 'lucide-react';

const promptContent = `premium nav menu where dropping down reveals a beautiful bento grid sub navigation layout`;

export default function BentoDropMenuNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f5f5f5] dark:bg-[#0a0a0a] shadow-xl flex flex-col items-center p-8 group overflow-visible z-10">
                
                {/* 🎯 THE NAVBAR */}
                <header className="relative w-full flex items-center justify-between p-4 bg-white/70 dark:bg-black/70 border border-white dark:border-white/10 backdrop-blur-lg rounded-2xl z-50">
                    <span className="font-bold text-xl tracking-tight text-black dark:text-white">Purrform</span>
                    <nav className="flex gap-2">
                        <div 
                            onMouseEnter={() => setIsMenuOpen(true)}
                            onMouseLeave={() => setIsMenuOpen(false)}
                            className="relative"
                        >
                            <button className="px-4 py-2 rounded-xl text-[14px] font-medium text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                                Products
                            </button>

                            {/* Dropdown Menu (Bento Grid) */}
                            <AnimatePresence>
                                {isMenuOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.1 } }}
                                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-[360px]"
                                    >
                                        <div className="p-4 bg-white dark:bg-[#111] rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/10 grid grid-cols-2 gap-3">
                                            
                                            {/* Bento Item 1 */}
                                            <div className="col-span-2 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/30 dark:to-blue-900/30 cursor-pointer hover:scale-[1.02] transition-transform">
                                                <Sparkles size={20} className="text-indigo-500 mb-2" />
                                                <h4 className="text-[14px] font-semibold text-black dark:text-white mb-1">Purrform Core</h4>
                                                <p className="text-[12px] text-black/60 dark:text-white/60 leading-tight">The ultimate UI animation engine for modern teams.</p>
                                            </div>

                                            {/* Bento Item 2 */}
                                            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                                <LayoutGrid size={18} className="text-black/60 dark:text-white/60 mb-2" />
                                                <h4 className="text-[13px] font-medium text-black dark:text-white">Templates</h4>
                                            </div>
                                            
                                            {/* Bento Item 3 */}
                                            <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 cursor-pointer hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                                <BookOpen size={18} className="text-black/60 dark:text-white/60 mb-2" />
                                                <h4 className="text-[13px] font-medium text-black dark:text-white">Docs</h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <button className="px-4 py-2 rounded-xl text-[14px] font-medium text-black/80 dark:text-white/80 hover:bg-black/5 dark:hover:bg-white/10 transition-colors">Pricing</button>
                    </nav>
                    <div className="w-10"></div> {/* Spacer for centering grid against logo */}
                </header>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Bento Mega Menu</span>
            </div>
</div>
    );
}
