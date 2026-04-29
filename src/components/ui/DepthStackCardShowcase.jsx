import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Aceternity-style dark card grid with cursor-proximity radial glow that illuminates each card's surface from behind as cursor approaches — hover-reveal pattern`;

const CARDS = [
    { title: 'Type-safe APIs', desc: 'End-to-end type inference, zero runtime errors.', icon: '⌘' },
    { title: 'Edge Caching', desc: '200+ nodes. Sub-5ms cache hits globally.', icon: '◎' },
    { title: 'AI Workflows', desc: 'Streaming, tool calls, RAG — all built-in.', icon: '✦' },
    { title: 'Realtime Sync', desc: 'Conflict-free CRDTs for collaborative data.', icon: '⟳' },
    { title: 'Zero Config', desc: 'Ships with sane defaults. Override anything.', icon: '◈' },
    { title: 'Observability', desc: 'Traces, metrics, logs — one unified surface.', icon: '⬡' },
];

function GlowCard({ card, mouseX, mouseY }) {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const localX = useMotionValue(0);
    const localY = useMotionValue(0);

    const handleMove = (e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        localX.set(e.clientX - r.left);
        localY.set(e.clientY - r.top);
    };

    const bg = useTransform(
        [localX, localY],
        ([x, y]) => isHovered
            ? `radial-gradient(circle 120px at ${x}px ${y}px, rgba(139,92,246,0.15) 0%, rgba(59,130,246,0.06) 50%, transparent 80%)`
            : 'transparent'
    );

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.015 }}
            className="relative p-5 rounded-[18px] overflow-hidden cursor-pointer flex flex-col gap-3"
            style={{ border: `1px solid ${isHovered ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.07)'}`, transition: 'border-color 0.3s' }}
        >
            {/* Dark base */}
            <div className="absolute inset-0 rounded-[18px]" style={{ background: '#0e0e14' }} />

            {/* Mouse-proximity radial glow */}
            <motion.div className="absolute inset-0 rounded-[18px] pointer-events-none" style={{ background: bg }} />

            {/* Top edge specular on hover */}
            <motion.div
                className="absolute top-0 left-4 right-4 h-px pointer-events-none rounded-t-[18px]"
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)' }}
            />

            {/* Content */}
            <div className="relative z-10 text-[22px]" style={{ fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
                {card.icon}
            </div>
            <div className="relative z-10">
                <h3 className="text-white font-semibold text-[14px] mb-1">{card.title}</h3>
                <p className="text-white/35 text-[12px] leading-relaxed">{card.desc}</p>
            </div>
        </motion.div>
    );
}

export default function DepthStackCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full min-h-[540px] rounded-[24px] overflow-hidden bg-[#09090f] border border-white/[0.06] flex flex-col items-center justify-center gap-8 p-10">

                {/* Ambient center glow */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(80,40,160,0.08) 0%, transparent 70%)' }}
                />

                {/* Label */}
                <div className="z-10 text-center">
                    <p className="text-[11px] uppercase tracking-[0.25em] text-white/30 font-semibold">Platform capabilities</p>
                    <h2 className="text-white text-[28px] font-bold tracking-tight mt-1">Everything you need</h2>
                </div>

                {/* 2x3 Grid */}
                <div className="z-10 w-full grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CARDS.map((card) => (
                        <GlowCard key={card.title} card={card} />
                    ))}
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Glow Grid Cards</span>
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
