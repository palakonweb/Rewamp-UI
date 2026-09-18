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
                    className="relative p-[2px] rounded-xl"
                    style={{ background: 'linear-gradient(100deg, #f7c6d9, #cfe3fb, #d8f5da, #fdf1c7, #e6d3f8)' }}
                >
                    <button className="relative z-10 px-10 py-4 min-w-[220px] flex items-center justify-center rounded-[10px] bg-[#f4f2ee] select-none">
                        <span className="relative z-10 text-[16px] font-semibold text-[#1B1717]">Rainbow Button</span>
                    </button>
                </div>
            </div>
</div>
    );
}
