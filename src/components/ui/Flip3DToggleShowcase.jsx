import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Physical 3D flip ON/OFF toggle: a molded-plastic capsule with a thick vertical slider at its center. On click the slider rotates ~180deg around its vertical axis (not a flat slide) while the raised/recessed surfaces swap sides and the ON/OFF label crossfades to the opposite side. Realistic bevels, dynamic shadows, spring landing with a tiny overshoot. Cherry Red off-state, Maroon on-state.`;

export default function Flip3DToggleShowcase() {
    const [copied, setCopied] = useState(false);
    const [on, setOn] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#efece4] shadow-xl flex items-center justify-center p-8">
                <div
                    className="relative w-[220px] h-[86px] rounded-full p-2 select-none cursor-pointer"
                    style={{
                        background: on ? '#4a0000' : '#5c0000',
                        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.06)',
                        perspective: 600,
                    }}
                    onClick={() => setOn((v) => !v)}
                >
                    {/* recessed / raised side panels */}
                    <motion.div
                        className="absolute inset-2 rounded-full flex items-center"
                        animate={{ justifyContent: on ? 'flex-start' : 'flex-end' }}
                    >
                        <motion.span
                            className="px-5 text-white font-extrabold text-[15px] tracking-wide"
                            animate={{ opacity: 1 }}
                        >
                            {on ? 'ON' : 'OFF'}
                        </motion.span>
                    </motion.div>

                    {/* raised background half (lighter) */}
                    <motion.div
                        className="absolute top-2 bottom-2 rounded-full"
                        style={{ width: 'calc(50% - 8px)', background: 'linear-gradient(160deg, #c8000a, #a3000a)' }}
                        animate={{ left: on ? '50%' : 8, marginLeft: on ? 0 : 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                    />

                    {/* the flipping slider */}
                    <motion.div
                        className="absolute top-1.5 bottom-1.5 w-[26px] rounded-[10px]"
                        style={{
                            background: 'linear-gradient(160deg, #e2444d, #810100 55%, #4a0000)',
                            boxShadow: '0 3px 6px rgba(0,0,0,0.45), inset 0 1px 1px rgba(255,255,255,0.35)',
                            transformStyle: 'preserve-3d',
                        }}
                        animate={{
                            left: on ? 'calc(100% - 34px)' : '50%',
                            x: on ? 0 : '-50%',
                            rotateY: on ? 180 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 170, damping: 15, mass: 0.9 }}
                    />
                </div>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Flip UI</span>
            </div>
</div>
    );
}
