import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Gloss Button": rounded-full pill with a marbled, iridescent oil-slick surface (soft blush, lilac and gold swirls) that drifts slowly, plus a fixed glossy highlight arc.`;

export default function GlossButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <button className="relative px-10 py-4 min-w-[220px] flex items-center justify-center rounded-full select-none overflow-hidden" style={{ boxShadow: '0 10px 24px -12px rgba(0,0,0,0.25)' }}>
                    <motion.div
                        className="absolute inset-0"
                        style={{
                            background: 'linear-gradient(115deg, #d9c6c2 0%, #b7a8c4 22%, #e8d2b8 40%, #c9a8ae 58%, #a99bbd 76%, #dcc4c0 100%)',
                            backgroundSize: '220% 220%',
                        }}
                        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="pointer-events-none absolute inset-x-3 top-1 h-1/2 rounded-full bg-white/25 blur-[3px]" />
                    <span className="relative z-10 text-[16px] font-semibold text-[#2a2320]">Gloss Button</span>
                </button>
            </div>
</div>
    );
}
