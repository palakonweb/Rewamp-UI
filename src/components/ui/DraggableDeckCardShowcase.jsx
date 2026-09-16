import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `draggable stacked card deck — cards fan out as you drag, each has spring-physics snap-back, dark glass surfaces, distinct gradient identities, premium depth shadow stack`;

const DECK = [
    {
        id: 0,
        label: 'Design',
        sub: 'Visual Systems',
        color1: '#8b5cf6',
        color2: '#ec4899',
        icon: '✦',
        rotate: -8,
        offsetX: -16,
        offsetY: -8,
        zIndex: 1,
    },
    {
        id: 1,
        label: 'Engineer',
        sub: 'Full-Stack',
        color1: '#06b6d4',
        color2: '#3b82f6',
        icon: '◈',
        rotate: -2,
        offsetX: -6,
        offsetY: -4,
        zIndex: 2,
    },
    {
        id: 2,
        label: 'Deploy',
        sub: 'Edge & Cloud',
        color1: '#10b981',
        color2: '#06b6d4',
        icon: '⬡',
        rotate: 4,
        offsetX: 6,
        offsetY: 0,
        zIndex: 3,
    },
    {
        id: 3,
        label: 'Analyse',
        sub: 'Data & Insights',
        color1: '#f59e0b',
        color2: '#ef4444',
        icon: '◎',
        rotate: 10,
        offsetX: 18,
        offsetY: 8,
        zIndex: 4,
    },
];

function DeckCard({ card, index, total }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateZ = useSpring(useTransform(x, [-150, 0, 150], [card.rotate - 12, card.rotate, card.rotate + 12]), { stiffness: 200, damping: 20 });
    const [dragging, setDragging] = useState(false);

    return (
        <motion.div
            drag
            dragElastic={0.18}
            dragSnapToOrigin
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            style={{
                x,
                y,
                rotateZ,
                zIndex: dragging ? 50 : card.zIndex,
                position: 'absolute',
                left: `calc(50% + ${card.offsetX}px - 130px)`,
                top: `calc(50% + ${card.offsetY}px - 90px)`,
                cursor: dragging ? 'grabbing' : 'grab',
            }}
            whileHover={{ scale: 1.04 }}
            className="w-[260px] h-[180px] rounded-[20px] overflow-hidden select-none"
            animate={{ scale: dragging ? 1.06 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        >
            {/* Card glass */}
            <div className="absolute inset-0 rounded-[20px]"
                style={{
                    background: `linear-gradient(135deg, ${card.color1}22 0%, ${card.color2}11 100%)`,
                    border: `1px solid ${card.color1}33`,
                    backdropFilter: 'blur(16px)',
                    boxShadow: dragging
                        ? `0 32px 80px rgba(0,0,0,0.6), 0 0 40px ${card.color1}33`
                        : `0 ${8 + index * 4}px ${24 + index * 8}px rgba(0,0,0,0.4)`,
                }}
            />
            {/* Gradient sweep */}
            <div className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${card.color1}18 0%, transparent 60%)` }}
            />
            {/* Top edge sheen */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${card.color1}66, transparent)` }}
            />

            {/* Content */}
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
                <div className="flex items-start justify-between">
                    <span className="text-[26px]" style={{ fontFamily: 'monospace', color: card.color1 }}>{card.icon}</span>
                    <div className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                        style={{ background: `${card.color1}18`, border: `1px solid ${card.color1}30`, color: card.color1 }}>
                        {String(index + 1).padStart(2, '0')}
                    </div>
                </div>
                <div>
                    <p className="text-white/35 text-[11px] uppercase tracking-widest font-semibold mb-1">{card.sub}</p>
                    <h3 className="text-white font-black text-[22px] tracking-tight leading-none">{card.label}</h3>
                </div>
            </div>
        </motion.div>
    );
}

export default function DraggableDeckCardShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[560px] rounded-[24px] overflow-hidden bg-[#080808] border border-white/[0.06] flex items-center justify-center">

                {/* BG radial glow */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(139,92,246,0.08) 0%, transparent 65%)' }}
                />
                {/* Dot grid */}
                <div className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                    }}
                />

                {/* Hint label */}
                <p className="absolute bottom-20 left-0 right-0 text-center text-white/20 text-[12px] font-medium tracking-wider select-none pointer-events-none">
                    drag any card
                </p>

                {/* Stacked deck */}
                <div className="relative" style={{ width: 260, height: 180 }}>
                    {DECK.map((card, i) => (
                        <DeckCard key={card.id} card={card} index={i} total={DECK.length} />
                    ))}
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Draggable Deck</span>
            </div>
</div>
    );
}
