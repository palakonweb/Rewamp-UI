import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Liquid Metal Button": white rounded-full pill with a continuously rotating liquid-chrome conic-gradient border and dark medium-weight text — the same moving border treatment used site-wide for liquid-metal surfaces.`;

export default function LiquidMetalButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <div className="relative p-[2px] rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-[-45%]"
                        style={{ background: 'conic-gradient(from 0deg, #c0c0c0, #810100, #d4d4d4, rgba(129,1,0,0.6), #e8e8e8, #810100, #c0c0c0)' }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    />
                    <button
                        className="relative z-10 px-9 py-3.5 rounded-full select-none bg-white"
                        style={{ boxShadow: '0 8px 20px -12px rgba(0,0,0,0.15)' }}
                    >
                        <span className="relative z-10 text-[16px] font-medium text-[#1B1717]/80">Liquid Metal Button</span>
                    </button>
                </div>
            </div>
</div>
    );
}
