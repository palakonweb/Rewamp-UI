import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

const CODE = 'B3E45S7T';

export default function CopyCodeButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard?.writeText(CODE).catch(() => {});
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex items-center justify-center p-10">
            <div
                className="relative w-full max-w-sm h-16 rounded-full overflow-hidden"
                style={{ backgroundColor: 'var(--elevated)' }}
            >
                <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                        <motion.div
                            key="copied"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex items-center justify-center gap-2"
                        >
                            <span
                                className="flex h-6 w-6 items-center justify-center rounded-full"
                                style={{ backgroundColor: 'var(--text-primary)' }}
                            >
                                <Check size={14} strokeWidth={3} style={{ color: 'var(--surface)' }} />
                            </span>
                            <span className="text-[17px] font-bold" style={{ color: 'var(--text-primary)' }}>
                                Code Copied!
                            </span>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="default"
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.96 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex items-center justify-between pl-6 pr-2"
                        >
                            <span
                                className="text-[18px] font-bold tracking-wide font-mono"
                                style={{ color: 'var(--text-subtle)' }}
                            >
                                {CODE}
                            </span>
                            <motion.button
                                type="button"
                                onClick={handleCopy}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                                className="h-12 px-6 rounded-full text-[15px] font-bold cursor-pointer"
                                style={{
                                    backgroundColor: 'var(--surface)',
                                    color: 'var(--text-primary)',
                                    boxShadow: '0 6px 14px -6px rgba(0,0,0,0.18)',
                                }}
                            >
                                Copy
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
