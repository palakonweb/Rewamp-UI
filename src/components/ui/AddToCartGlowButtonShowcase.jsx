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
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8">
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
</div>
    );
}
