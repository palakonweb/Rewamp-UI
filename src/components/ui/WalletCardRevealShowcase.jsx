import React, { useState } from 'react';
import { Copy, Check, ArrowLeft } from 'lucide-react';
import WalletCardReveal from './WalletCardReveal';
import { walletCardRevealPrompt } from './walletCardRevealSource';

export default function WalletCardRevealShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(walletCardRevealPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* ── Interactive Preview Card (matching reference video Recording 2026-09-13 200641.mp4) ── */}
            <div
                className="relative w-full rounded-[28px] border border-black/10 overflow-hidden shadow-xs flex flex-col items-center justify-center p-6 sm:p-12"
                style={{
                    backgroundColor: '#EEF3EC',
                    backgroundImage: 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.75) 0%, rgba(238,243,236,0.5) 100%)',
                    minHeight: '620px',
                }}
            >
                {/* Top Left Navigation Back Button matching video */}
                <div className="absolute top-6 left-6 z-20">
                    <button
                        type="button"
                        aria-label="Back"
                        className="w-10 h-10 rounded-full bg-white/90 shadow-sm border border-black/5 flex items-center justify-center text-black/75 hover:text-black hover:bg-white transition-all cursor-pointer"
                    >
                        <ArrowLeft size={18} />
                    </button>
                </div>

                {/* The Interactive Wallet Component */}
                <WalletCardReveal />

                {/* Subtext tip */}
                <span className="text-[11px] font-medium text-black/35 tracking-wider uppercase mt-4 select-none">
                    Click the eye icon to reveal cards & balance
                </span>
            </div>

            {/* ── Prompt block ── */}
</div>
    );
}
