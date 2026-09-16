import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Glass Button": real translucent glass pill — heavy backdrop blur actually refracts the scene behind it, with a bright top specular highlight, a crisp light-catching rim border, and a soft drop shadow.`;

export default function GlassButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <button
                    className="relative px-10 py-4 min-w-[220px] flex items-center justify-center rounded-full select-none overflow-hidden"
                    style={{
                        background: 'rgba(255,255,255,0.35)',
                        backdropFilter: 'blur(16px) saturate(160%)',
                        WebkitBackdropFilter: 'blur(16px) saturate(160%)',
                        border: '1px solid rgba(255,255,255,0.7)',
                        boxShadow: '0 12px 28px -16px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.8)',
                    }}
                >
                    <div className="absolute inset-x-2 top-1 h-2/5 rounded-full pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6), transparent)' }} />
                    <span className="relative z-10 text-[16px] font-semibold text-[#3a1414]">Glass Button</span>
                </button>
            </div>
</div>
    );
}
