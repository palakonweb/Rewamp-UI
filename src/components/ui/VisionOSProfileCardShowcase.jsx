import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark invitation-style event card with floating date chip, parallax depth layers that shift on tilt, shimmer headline with gradient text, ticket perforated tear edge, minimal layout`;

export default function VisionOSProfileCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);

    const rotX = useSpring(useTransform(my, [0, 1], [12, -12]), { stiffness: 160, damping: 22 });
    const rotY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 160, damping: 22 });

    // Parallax layers shift at different rates
    const layer1X = useTransform(mx, [0, 1], [-8, 8]);
    const layer1Y = useTransform(my, [0, 1], [-8, 8]);
    const layer2X = useTransform(mx, [0, 1], [-16, 16]);
    const layer2Y = useTransform(my, [0, 1], [-16, 16]);

    const glowBg = useTransform(
        [useTransform(mx, [0, 1], ['0%', '100%']), useTransform(my, [0, 1], ['0%', '100%'])],
        ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(249,115,22,0.18) 0%, rgba(234,179,8,0.06) 50%, transparent 70%)`
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
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden bg-[#0a0804] border border-white/[0.06] flex items-center justify-center"
                style={{ perspective: '1100px' }}>

                {/* BG texture */}
                <div className="absolute inset-0 pointer-events-none opacity-25"
                    style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(249,115,22,0.15) 0%, transparent 55%), radial-gradient(ellipse at 70% 30%, rgba(234,179,8,0.1) 0%, transparent 55%)' }}
                />
                <div className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* THE CARD */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMove}
                    onMouseLeave={reset}
                    style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
                    className="relative w-[340px] rounded-[24px] overflow-hidden cursor-pointer select-none shadow-2xl"
                >
                    {/* Glass base — warm dark */}
                    <div className="absolute inset-0 rounded-[24px]"
                        style={{
                            background: 'linear-gradient(160deg, rgba(255,240,220,0.08) 0%, rgba(255,200,100,0.03) 100%)',
                            border: '1px solid rgba(255,200,100,0.15)',
                            backdropFilter: 'blur(20px)',
                        }}
                    />
                    <motion.div className="absolute inset-0 rounded-[24px] pointer-events-none" style={{ background: glowBg }} />
                    {/* Top sheen */}
                    <div className="absolute top-0 left-0 right-0 h-px"
                        style={{ background: 'linear-gradient(90deg, transparent, rgba(249,115,22,0.5), transparent)' }}
                    />

                    <div className="relative z-10 overflow-hidden" style={{ transform: 'translateZ(0)' }}>
                        {/* Top image area with parallax blobs */}
                        <div className="relative h-[180px] overflow-hidden"
                            style={{ background: 'linear-gradient(160deg, #1a0f05, #120c04)' }}>

                            {/* Parallax layer 1 — slow orb */}
                            <motion.div
                                className="absolute w-[260px] h-[260px] rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
                                    top: '-60px', right: '-40px',
                                    x: layer1X, y: layer1Y,
                                }}
                            />
                            {/* Parallax layer 2 — fast orb */}
                            <motion.div
                                className="absolute w-[160px] h-[160px] rounded-full pointer-events-none"
                                style={{
                                    background: 'radial-gradient(circle, rgba(234,179,8,0.2) 0%, transparent 70%)',
                                    bottom: '-20px', left: '20px',
                                    x: layer2X, y: layer2Y,
                                }}
                            />

                            {/* Floating date chip */}
                            <motion.div
                                className="absolute top-5 right-5 px-3 py-1.5 rounded-full"
                                style={{ background: 'rgba(249,115,22,0.15)', border: '1px solid rgba(249,115,22,0.35)', transform: 'translateZ(30px)' }}
                            >
                                <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400">May · 2026</span>
                            </motion.div>

                            {/* Logo / brand mark */}
                            <div className="absolute bottom-5 left-6 flex items-center gap-2">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                                    style={{ background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)' }}>
                                    <span style={{ color: '#fb923c', fontFamily: 'monospace', fontSize: 16 }}>✦</span>
                                </div>
                                <span className="text-white/50 text-[11px] font-semibold uppercase tracking-widest">Orbit Conf</span>
                            </div>
                        </div>

                        {/* Perforated tear edge */}
                        <div className="relative h-4 overflow-visible flex items-center"
                            style={{ background: 'transparent' }}>
                            <div className="absolute inset-x-0 top-2 border-b border-dashed" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />
                            {/* Left half-circle */}
                            <div className="absolute -left-4 w-8 h-8 rounded-full"
                                style={{ background: '#0a0804', border: '1px solid rgba(255,200,100,0.15)' }}
                            />
                            {/* Right half-circle */}
                            <div className="absolute -right-4 w-8 h-8 rounded-full"
                                style={{ background: '#0a0804', border: '1px solid rgba(255,200,100,0.15)' }}
                            />
                        </div>

                        {/* Bottom content */}
                        <div className="px-6 pb-6 pt-2 flex flex-col gap-4"
                            style={{ background: 'linear-gradient(160deg, rgba(20,12,4,0.95) 0%, rgba(15,10,3,0.98) 100%)' }}>

                            {/* Title */}
                            <div>
                                <h2 className="font-black text-[26px] leading-tight tracking-tight"
                                    style={{ background: 'linear-gradient(135deg, #fde68a, #fb923c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Design Beyond<br />the Interface
                                </h2>
                                <p className="text-white/35 text-[12px] mt-1.5 leading-relaxed">
                                    A one-day summit on the future of product design, AI interfaces, and systematic creativity.
                                </p>
                            </div>

                            {/* 3 detail rows */}
                            <div className="flex flex-col gap-2">
                                {[
                                    { icon: '📍', label: 'Location', value: 'Palace of Fine Arts, SF' },
                                    { icon: '🕙', label: 'Time', value: '10:00 AM – 8:00 PM PST' },
                                    { icon: '🎟', label: 'Tickets', value: '147 remaining' },
                                ].map(row => (
                                    <div key={row.label} className="flex items-center justify-between">
                                        <span className="text-white/30 text-[11px] flex items-center gap-1.5"><span>{row.icon}</span>{row.label}</span>
                                        <span className="text-white/65 text-[11.5px] font-medium">{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Register button */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(249,115,22,0.35)' }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-3.5 rounded-2xl font-bold text-[13px] text-white tracking-wide mt-1"
                                style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}
                            >
                                Reserve a Seat
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Event Ticket Card</span>
            </div>
</div>
    );
}
