import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Black Button": glossy near-black rounded-full pill with a soft top-to-bottom sheen (lighter charcoal fading to deep black), medium-weight white text, a thin light border, and a soft ambient shadow beneath. On hover it lifts slightly and the sheen brightens.`;

export default function BlackButtonShowcase() {
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
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                    className="relative px-10 py-4 min-w-[220px] flex items-center justify-center rounded-full overflow-hidden select-none border"
                    style={{
                        background: 'linear-gradient(180deg, #4a4a4d, #0a0a0b 70%)',
                        borderColor: 'rgba(255,255,255,0.14)',
                        boxShadow: [
                            '0 20px 32px -14px rgba(0,0,0,0.5)',
                            '0 16px 40px -18px rgba(120,150,255,0.35)',
                            'inset 0 1px 1px rgba(255,255,255,0.3)',
                            'inset 0 -8px 14px rgba(0,0,0,0.6)',
                        ].join(', '),
                    }}
                >
                    <div className="absolute inset-x-3 top-1.5 h-2/5 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.35), transparent 75%)' }} />
                    <span className="relative z-10 text-[16px] font-semibold text-white/95">Black Button</span>
                </motion.button>
            </div>
</div>
    );
}
