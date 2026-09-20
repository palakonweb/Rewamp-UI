import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `"Rainbow Button": near-white rounded-rectangle pill with a thin static iridescent pastel-spectrum border and medium-weight dark text. No hover animation - a clean, static, minimal button.`;

export default function RainbowButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center p-8">
                <div
                    className="relative p-[2.5px] rounded-xl shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    style={{
                        background: 'linear-gradient(135deg, #FF0055 0%, #FF5A00 15%, #FFB800 30%, #10B981 46%, #06B6D4 62%, #3B82F6 76%, #8B5CF6 88%, #EC4899 100%)',
                    }}
                >
                    <button className="relative z-10 px-10 py-4 min-w-[220px] flex items-center justify-center rounded-[10px] bg-[#fdfdfc] dark:bg-[#121118] text-[#1B1717] dark:text-[#F3F4F6] select-none cursor-pointer transition-colors shadow-xs font-semibold text-[16px]">
                        <span className="relative z-10 tracking-tight">Rainbow Button</span>
                    </button>
                </div>
            </div>
</div>
    );
}
