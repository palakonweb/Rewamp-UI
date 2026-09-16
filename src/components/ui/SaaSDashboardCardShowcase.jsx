import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `3D tilt card with deep perspective distortion, inner glow that shifts with tilt direction, dark surface with floating frosted chip badges, neon underline CTA`;

export default function SaaSDashboardCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);

    const rotX = useSpring(useTransform(my, [0, 1], [18, -18]), { stiffness: 180, damping: 22 });
    const rotY = useSpring(useTransform(mx, [0, 1], [-18, 18]), { stiffness: 180, damping: 22 });
    const shineX = useTransform(mx, [0, 1], ['0%', '100%']);
    const shineY = useTransform(my, [0, 1], ['0%', '100%']);
    const glowBg = useTransform(
        [shineX, shineY],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(139,92,246,0.22) 0%, rgba(59,130,246,0.1) 40%, transparent 65%)`
    );
    const shadow = useTransform(
        [mx, my],
        ([x, y]) => `${(x - 0.5) * -40}px ${(y - 0.5) * -40}px 80px rgba(139,92,246,0.2)`
    );

    const handleMove = (e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const reset = () => { mx.set(0.5); my.set(0.5); };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden bg-[#070711] border border-white/[0.06] flex items-center justify-center"
                style={{ perspective: '1000px' }}>

                {/* BG grid */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* THE CARD */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMove}
                    onMouseLeave={reset}
                    style={{ rotateX: rotX, rotateY: rotY, boxShadow: shadow, transformStyle: 'preserve-3d' }}
                    className="relative w-[380px] rounded-[24px] overflow-hidden cursor-pointer select-none"
                >
                    {/* Base dark glass */}
                    <div className="absolute inset-0 rounded-[24px]"
                        style={{
                            background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            backdropFilter: 'blur(24px)',
                        }}
                    />
                    {/* Dynamic inner glow */}
                    <motion.div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: glowBg }} />
                    {/* Top specular */}
                    <div className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)' }}
                    />

                    <div className="relative z-10 p-7 flex flex-col gap-6" style={{ transform: 'translateZ(20px)' }}>
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.2))',
                                        border: '1px solid rgba(139,92,246,0.4)',
                                    }}>
                                    <div className="w-4 h-4 rounded-full"
                                        style={{ background: 'linear-gradient(135deg, #a78bfa, #60a5fa)' }} />
                                </div>
                                <div>
                                    <p className="text-white font-semibold text-[14px]">Orbit Platform</p>
                                    <p className="text-white/40 text-[11px]">Enterprise · Pro</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                                style={{ background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.25)' }}>
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                <span className="text-[10px] font-bold text-emerald-400">Active</span>
                            </div>
                        </div>

                        {/* Big number */}
                        <div>
                            <p className="text-white/30 text-[11px] uppercase tracking-widest font-semibold mb-2">Monthly Revenue</p>
                            <p className="text-white font-black text-[48px] leading-none tracking-tight">$248K</p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-emerald-400 text-[12px] font-bold">↑ 32%</span>
                                <span className="text-white/30 text-[12px]">vs last month</span>
                            </div>
                        </div>

                        {/* Chip badges */}
                        <div className="flex gap-2 flex-wrap">
                            {['Analytics', 'APIs', 'CDN', 'Auth'].map(tag => (
                                <span key={tag} className="px-3 py-1.5 rounded-full text-[11.5px] font-semibold"
                                    style={{
                                        background: 'rgba(255,255,255,0.06)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.55)',
                                    }}>
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between">
                                <span className="text-white/40 text-[11px]">Usage limit</span>
                                <span className="text-white/60 text-[11px] font-semibold">76%</span>
                            </div>
                            <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <motion.div
                                    className="h-full rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: '76%' }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                                    style={{ background: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
                                />
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-2xl font-bold text-[13px] text-white tracking-wide"
                            style={{
                                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                                boxShadow: '0 0 30px rgba(139,92,246,0.35)',
                            }}
                        >
                            View Dashboard
                        </motion.button>
                    </div>
                </motion.div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">3D Tilt Card</span>
            </div>
</div>
    );
}
