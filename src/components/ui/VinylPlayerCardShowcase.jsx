import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark feature card with animated neon border beam that continuously travels around the card perimeter, glass inner panel, minimal icon, clean typography`;

// Border beam that travels around the card
function BorderBeam({ color = '#a78bfa', duration = 4, delay = 0 }) {
    return (
        <motion.div
            className="absolute inset-0 rounded-[20px] pointer-events-none"
            style={{ overflow: 'hidden' }}
        >
            {/* Gradient beam element that travels */}
            <motion.div
                className="absolute"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
                style={{
                    width: '100%',
                    height: '100%',
                    transformOrigin: 'center center',
                }}
            >
                <div
                    className="absolute"
                    style={{
                        top: '-50%',
                        left: '50%',
                        width: '100px',
                        height: '200%',
                        background: `conic-gradient(from 0deg, transparent 0deg, ${color} 60deg, transparent 120deg)`,
                        transformOrigin: 'bottom center',
                        transform: 'translateX(-50%)',
                        opacity: 0.8,
                    }}
                />
            </motion.div>

            {/* Mask: cutout so only border ring shows */}
            <div
                className="absolute rounded-[19px]"
                style={{
                    inset: '1px',
                    background: '#0d0d0d',
                }}
            />
        </motion.div>
    );
}

const cards = [
    {
        icon: '⬡',
        title: 'Edge Runtime',
        desc: 'Deploy globally with zero cold starts. Sub-millisecond responses at any scale.',
        color: '#a78bfa',
        bg: '#0d0d0d',
    },
    {
        icon: '◈',
        title: 'Neural Core',
        desc: 'Real-time inference with adaptive model routing and semantic caching.',
        color: '#38bdf8',
        bg: '#080d10',
    },
    {
        icon: '⬙',
        title: 'Vault Security',
        desc: 'Post-quantum encryption, zero-knowledge proofs, and hardware attestation.',
        color: '#34d399',
        bg: '#080e0b',
    },
];

export default function VinylPlayerCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[520px] rounded-[24px] overflow-hidden bg-[#080808] border border-white/[0.06] flex items-center justify-center gap-5 px-10">

                {/* BG glow */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(80,40,160,0.1) 0%, transparent 70%)' }}
                />

                {cards.map((card, i) => (
                    <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.12, type: 'spring', stiffness: 280, damping: 24 }}
                        whileHover={{ y: -6, scale: 1.02 }}
                        className="relative flex-1 min-w-[180px] h-[230px] rounded-[20px] overflow-hidden cursor-pointer"
                        style={{ background: card.bg }}
                    >
                        {/* Animated border beam */}
                        <BorderBeam color={card.color} duration={3 + i * 0.8} delay={i * 0.6} />

                        {/* Card content */}
                        <div className="absolute inset-[1px] rounded-[19px] flex flex-col justify-between p-5"
                            style={{ background: card.bg }}>

                            {/* Icon */}
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-[20px]"
                                style={{
                                    background: `${card.color}15`,
                                    border: `1px solid ${card.color}30`,
                                    color: card.color,
                                    fontFamily: 'monospace',
                                }}>
                                {card.icon}
                            </div>

                            {/* Text */}
                            <div className="flex flex-col gap-2">
                                <h3 className="text-white font-bold text-[15px] tracking-tight">{card.title}</h3>
                                <p className="text-white/40 text-[12px] leading-relaxed">{card.desc}</p>
                            </div>

                            {/* Bottom line accent */}
                            <div className="h-[2px] rounded-full w-8"
                                style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                            />
                        </div>
                    </motion.div>
                ))}

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Border Beam Cards</span>
            </div>
</div>
    );
}
