import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Check, ShoppingBag, Heart, Star } from 'lucide-react';

const promptContent = `ecommerce product card — frosted glass overlay reveals on hover, floating price badge, animated add-to-cart button with spring feedback, tilt depth with product image parallax`;

const PRODUCTS = [
    { name: 'Orbit Headphones', price: '$349', sub: 'Pro Wireless · Slate Black', rating: 4.9, reviews: 847, hue: '#8b5cf6' },
    { name: 'Lens Camera', price: '$2,199', sub: 'Full-Frame · Titanium', rating: 4.8, reviews: 312, hue: '#06b6d4' },
    { name: 'Arc Watch', price: '$499', sub: 'Sapphire Glass · Midnight', rating: 4.9, reviews: 1204, hue: '#f59e0b' },
];

function ProductCard({ product, active, onClick }) {
    const ref = useRef(null);
    const [added, setAdded] = useState(false);
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 25 });
    const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 25 });
    const imgX = useTransform(mx, [0, 1], [-6, 6]);
    const imgY = useTransform(my, [0, 1], [-6, 6]);

    const handleAdd = (e) => {
        e.stopPropagation();
        setAdded(true);
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <motion.div
            ref={ref}
            onClick={onClick}
            onMouseMove={(e) => {
                const r = ref.current?.getBoundingClientRect();
                if (!r) return;
                mx.set((e.clientX - r.left) / r.width);
                my.set((e.clientY - r.top) / r.height);
            }}
            onMouseLeave={() => { mx.set(0.5); my.set(0.5); }}
            style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 800 }}
            animate={{ scale: active ? 1.04 : 1, zIndex: active ? 10 : 1 }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative flex-1 min-w-[200px] h-[280px] rounded-[22px] overflow-hidden cursor-pointer select-none"
        >
            {/* Card base */}
            <div className="absolute inset-0 rounded-[22px]"
                style={{
                    background: `linear-gradient(145deg, ${product.hue}18 0%, rgba(0,0,0,0.6) 100%)`,
                    border: `1px solid ${product.hue}30`,
                    backdropFilter: 'blur(12px)',
                }}
            />
            {/* Top sheen */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${product.hue}55, transparent)` }}
            />

            {/* Big icon / product visual with parallax */}
            <motion.div
                className="absolute top-6 left-0 right-0 flex justify-center pointer-events-none"
                style={{ x: imgX, y: imgY }}
            >
                <div className="w-[110px] h-[110px] rounded-3xl flex items-center justify-center text-[52px]"
                    style={{ background: `${product.hue}14`, border: `1px solid ${product.hue}22` }}>
                    {product.hue === '#8b5cf6' ? '🎧' : product.hue === '#06b6d4' ? '📷' : '⌚'}
                </div>
            </motion.div>

            {/* Price badge — floats top right */}
            <div className="absolute top-4 right-4 px-2.5 py-1 rounded-xl"
                style={{ background: `${product.hue}22`, border: `1px solid ${product.hue}44` }}>
                <span className="text-white font-black text-[13px]">{product.price}</span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col gap-2.5"
                style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
                <div>
                    <h3 className="text-white font-bold text-[14px] leading-tight">{product.name}</h3>
                    <p className="text-white/40 text-[11px]">{product.sub}</p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <Star size={11} fill={product.hue} stroke="none" />
                        <span className="text-white/70 text-[11px] font-semibold">{product.rating}</span>
                        <span className="text-white/30 text-[11px]">({product.reviews})</span>
                    </div>
                    <motion.button
                        onClick={handleAdd}
                        whileTap={{ scale: 0.9 }}
                        animate={added ? { scale: [1, 1.2, 1] } : {}}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold"
                        style={{
                            background: added ? '#22c55e' : `${product.hue}`,
                            color: 'white',
                            boxShadow: `0 4px 16px ${product.hue}44`,
                            transition: 'background 0.3s',
                        }}
                    >
                        <ShoppingBag size={11} />
                        {added ? 'Added!' : 'Add'}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default function GradientProductCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [active, setActive] = useState(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden bg-[#080808] border border-white/[0.06] flex items-center justify-center px-8 gap-5">

                <div className="absolute inset-0 pointer-events-none opacity-30"
                    style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(80,40,160,0.12) 0%, transparent 70%)' }}
                />

                <div className="flex gap-4 w-full" style={{ transformStyle: 'preserve-3d' }}>
                    {PRODUCTS.map((p, i) => (
                        <ProductCard
                            key={p.name}
                            product={p}
                            active={active === i}
                            onClick={() => setActive(active === i ? null : i)}
                        />
                    ))}
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Product Cards</span>
            </div>
</div>
    );
}
