import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const promptContent = `"Ice Button": glossy periwinkle-blue rounded-rectangle button with a bright top highlight (glass-like sheen), bold white label and a small up-right arrow, sitting on a thin lighter-blue border with a soft blue drop shadow. On hover it lifts slightly, brightens, and the glossy highlight intensifies.`;

export default function IceButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8 group">
                <motion.button
                    initial="rest"
                    whileHover="hover"
                    whileTap={{ scale: 0.97 }}
                    animate="rest"
                    className="relative px-10 py-4 min-w-[220px] flex items-center justify-center rounded-[18px] overflow-hidden select-none border"
                    variants={{
                        rest: {
                            y: 0,
                            boxShadow: [
                                '0 16px 32px -16px rgba(92,120,232,0.4)',
                                'inset 0 2px 1px rgba(255,255,255,0.5)',
                                'inset 0 -10px 18px rgba(30,45,120,0.25)',
                                'inset 0 10px 18px rgba(255,255,255,0.15)',
                            ].join(', '),
                        },
                        hover: {
                            y: -3,
                            boxShadow: [
                                '0 20px 36px -16px rgba(92,120,232,0.5)',
                                'inset 0 2px 1px rgba(255,255,255,0.65)',
                                'inset 0 -8px 16px rgba(30,45,120,0.2)',
                                'inset 0 10px 18px rgba(255,255,255,0.22)',
                            ].join(', '),
                        },
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    style={{ background: 'linear-gradient(180deg, #7a94f0, #5c78e8)', borderColor: 'rgba(255,255,255,0.35)' }}
                >
                    <div className="absolute inset-x-2 top-1.5 h-2/5 rounded-[14px] pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.32), transparent)' }} />
                    <span className="relative z-10 flex items-center gap-1.5 text-[16px] font-semibold text-white">
                        Ice Button <ArrowUpRight size={18} strokeWidth={3} />
                    </span>
                </motion.button>
            </div>
</div>
    );
}
