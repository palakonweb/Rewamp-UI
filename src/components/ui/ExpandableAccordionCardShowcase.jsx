import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronDown, Key } from 'lucide-react';

const promptContent = `expandable accordion utility card unfolding complex config data forms via framer motion height layout shifts`;

export default function ExpandableAccordionCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e4e4e7] dark:bg-[#18181b] shadow-xl flex items-center justify-center p-8">
                
                {/* 🎯 THE ACCORDION CARD */}
                <motion.div 
                    layout
                    className="w-full max-w-[400px] bg-white dark:bg-[#09090b] rounded-[24px] border border-black/5 dark:border-white/10 shadow-xl overflow-hidden self-start mt-20"
                >
                    {/* Header Block (Always visible) */}
                    <div 
                        className="p-6 flex items-center justify-between cursor-pointer group"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                                <Key size={20} />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-black dark:text-white text-[15px]">API Keys</span>
                                <span className="text-[13px] text-black/50 dark:text-white/50">Manage authentication tokens</span>
                            </div>
                        </div>

                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-black/10 dark:group-hover:bg-white/10 transition-colors"
                        >
                            <ChevronDown size={16} className="text-black/60 dark:text-white/60" />
                        </motion.div>
                    </div>

                    {/* Expandable Content Block */}
                    <AnimatePresence initial={false}>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className="border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02]"
                            >
                                <div className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">Production Key</label>
                                            <div className="w-full flex items-center justify-between bg-white dark:bg-[#18181b] border border-black/10 dark:border-white/10 rounded-xl p-3 shadow-inner">
                                                <code className="text-[13px] font-mono text-black dark:text-white">sk_prod_8f92j1...</code>
                                                <button className="text-[12px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">Copy</button>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col gap-1.5 mt-2">
                                            <label className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-wider">Test Key</label>
                                            <div className="w-full flex items-center justify-between bg-white dark:bg-[#18181b] border border-black/10 dark:border-white/10 rounded-xl p-3 shadow-inner">
                                                <code className="text-[13px] font-mono text-black dark:text-white">sk_test_4m20xb...</code>
                                                <button className="text-[12px] font-semibold text-orange-500 hover:text-orange-600 transition-colors">Copy</button>
                                            </div>
                                        </div>

                                        <button className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-[13px] shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors">
                                            Generate New Token
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Expandable Accordion</span>
            </div>
</div>
    );
}
