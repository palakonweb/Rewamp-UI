import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark card with radial spotlight that follows cursor to reveal glowing text and subtext beneath a translucent dark veil — content only visible in the light cone`;

export default function SpotlightRevealCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);
    const mx = useMotionValue(-400);
    const my = useMotionValue(-400);

    const handleMove = (e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
    };
    const handleLeave = () => { mx.set(-400); my.set(-400); };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[560px] rounded-[24px] overflow-hidden bg-[#080808] border border-white/[0.06] flex items-center justify-center">

                {/* Subtle dot grid bg */}
                <div className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)',
                        backgroundSize: '28px 28px',
                    }}
                />

                {/* THE CARD */}
                <div
                    ref={cardRef}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    className="relative w-[380px] h-[240px] rounded-[20px] overflow-hidden cursor-crosshair"
                    style={{ border: '1px solid rgba(255,255,255,0.08)' }}
                >
                    {/* Card dark base */}
                    <div className="absolute inset-0 bg-[#0f0f0f]" />

                    {/* Revealed content layer (always present, under the veil) */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 gap-3">
                        <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#a78bfa]">Premium Component</div>
                        <h2 className="text-[28px] font-bold text-white leading-tight tracking-tight">
                            Built for the<br />future of UI.
                        </h2>
                        <p className="text-[13px] text-white/50 leading-relaxed max-w-[260px]">
                            Move your cursor across the surface to reveal the content beneath.
                        </p>
                    </div>

                    {/* Dark veil with spotlight hole */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: useTransform(
                                [mx, my],
                                ([x, y]) =>
                                    `radial-gradient(circle 120px at ${x}px ${y}px, transparent 0%, rgba(15,15,15,0.97) 100%)`
                            ),
                        }}
                    />

                    {/* Spotlight tint color ring */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: useTransform(
                                [mx, my],
                                ([x, y]) =>
                                    `radial-gradient(circle 150px at ${x}px ${y}px, rgba(167,139,250,0.08) 0%, transparent 70%)`
                            ),
                            mixBlendMode: 'screen',
                        }}
                    />

                    {/* Border glow pulse */}
                    <div className="absolute inset-0 rounded-[20px] pointer-events-none"
                        style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
                    />
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Spotlight Reveal</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono">{promptContent}</code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
