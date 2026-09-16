import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Minimal dark power-switch toggle: deep charcoal pill with a large rounded thumb fixed on the left and a recessed track on the right holding a tiny indicator dot. Turning on spreads a warm orange LED-like glow from the indicator through the track over ~550ms with a small spring settle; turning off contracts the glow back to the dot and fades it to grey. Matte plastic, no glass or chrome.`;

export default function MinimalGlowToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [on, setOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#1f1f1f] shadow-xl flex items-center justify-center p-8">
                <button
                    onClick={() => setOn((v) => !v)}
                    className="relative w-[200px] h-[74px] rounded-full p-2 select-none"
                    style={{
                        background: 'linear-gradient(180deg, #2b2b2b, #161616)',
                        boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.06), inset 0 -3px 8px rgba(0,0,0,0.6), 0 10px 24px -10px rgba(0,0,0,0.6)',
                    }}
                >
                    {/* recessed track, right side */}
                    <div className="absolute top-2 bottom-2 right-2 w-[46%] rounded-full overflow-hidden" style={{ background: '#0a0a0a', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)' }}>
                        <motion.div
                            className="absolute inset-0"
                            animate={{
                                background: on
                                    ? 'radial-gradient(circle at 30% 50%, rgba(255,140,40,0.55), rgba(255,140,40,0.05) 70%)'
                                    : 'radial-gradient(circle at 30% 50%, rgba(255,140,40,0), transparent 70%)',
                            }}
                            transition={{ duration: 0.55, ease: 'easeInOut' }}
                        />
                        <motion.div
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full"
                            animate={{
                                background: on ? '#ff8c28' : '#5a5a5a',
                                boxShadow: on ? '0 0 10px 4px rgba(255,140,40,0.75)' : '0 0 0 rgba(0,0,0,0)',
                            }}
                            transition={{ type: 'spring', stiffness: 260, damping: 14 }}
                        />
                    </div>

                    {/* large thumb, fixed left */}
                    <motion.div
                        className="absolute top-1.5 bottom-1.5 left-1.5 rounded-full"
                        style={{
                            width: '52%',
                            background: 'linear-gradient(160deg, #3c3c3c, #232323)',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15)',
                        }}
                        animate={{ scale: on ? 1 : 1 }}
                    />
                </button>

                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Power Switch</span>
            </div>
</div>
    );
}
