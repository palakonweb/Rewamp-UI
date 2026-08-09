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
