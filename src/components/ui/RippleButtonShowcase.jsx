import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Fingerprint } from 'lucide-react';

const promptContent = `true fluid material ripple interaction expanding exactly from user click coordinate`;

export default function RippleButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [ripples, setRipples] = useState([]);
    const buttonRef = useRef(null);

    const handleClick = (e) => {
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Size of the ripple should cover the whole button
        const size = Math.max(rect.width, rect.height) * 2.5;

        const newRipple = {
            id: Date.now(),
            x,
            y,
            size
        };

        setRipples((prev) => [...prev, newRipple]);
    };

    const onRippleComplete = (id) => {
        setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e8eaed] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <button 
                    ref={buttonRef}
                    onClick={handleClick}
                    className="relative overflow-hidden bg-white text-[#1f2937] border border-black/10 px-12 py-5 rounded-md text-[16px] font-medium tracking-wide shadow-sm hover:shadow-md transition-shadow select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Fingerprint className="w-5 h-5 text-blue-500" />
                        Verify Identity
                    </span>

                    {/* Ripples Host */}
                    <AnimatePresence>
                        {ripples.map((ripple) => (
                            <motion.span
                                key={ripple.id}
                                initial={{ scale: 0, opacity: 0.35 }}
                                animate={{ scale: 1, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                onAnimationComplete={() => onRippleComplete(ripple.id)}
                                className="absolute bg-blue-500 rounded-full pointer-events-none"
                                style={{
                                    left: ripple.x - ripple.size / 2,
                                    top: ripple.y - ripple.size / 2,
                                    width: ripple.size,
                                    height: ripple.size
                                }}
                            />
                        ))}
                    </AnimatePresence>
                </button>
                
                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Fluid Ripple UI</span>
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
