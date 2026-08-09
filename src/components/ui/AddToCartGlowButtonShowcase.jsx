import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Plus } from 'lucide-react';

const promptContent = `"Add to Cart" button: a dark charcoal rounded-rectangle button reading "+ Add to cart", wrapped in a thin continuously rotating rainbow conic-gradient border — the same moving-border trick used on the Liquid Metal button. On click it swaps to a green-accented rotating border with "Added to cart" and a checkmark, then reverts after a moment.`;

export default function AddToCartGlowButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [added, setAdded] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleAdd = () => {
        if (added) return;
        setAdded(true);
        setTimeout(() => setAdded(false), 2200);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <motion.div whileHover={{ y: -2 }} className="relative p-[2px] rounded-2xl overflow-hidden" style={{ boxShadow: '0 14px 28px -14px rgba(0,0,0,0.35)' }}>
                    <motion.div
                        className="absolute inset-[-45%]"
                        animate={{
                            background: added
                                ? 'conic-gradient(from 0deg, #9effc0, #6be8a0, #9effc0, #d7ffc9, #6be8a0, #9effc0)'
                                : 'conic-gradient(from 0deg, #ff9ecb, #9ecbff, #b9ff9e, #fff29e, #d69eff, #ff9ecb)',
                            rotate: 360,
                        }}
                        transition={{
                            background: { duration: 0.4 },
                            rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        className="relative z-10 flex items-center gap-2 px-9 py-4 rounded-2xl select-none bg-[#2b2b2b]"
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            {!added ? (
                                <motion.span key="add" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Plus size={16} className="text-white" strokeWidth={3} />
                                    <span className="text-[16px] font-semibold text-white tracking-wide">Add to cart</span>
                                </motion.span>
                            ) : (
                                <motion.span key="added" className="flex items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                                    <Check size={16} className="text-emerald-400" strokeWidth={3} />
                                    <span className="text-[16px] font-semibold text-white tracking-wide">Added to cart</span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </button>
                </motion.div>
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
