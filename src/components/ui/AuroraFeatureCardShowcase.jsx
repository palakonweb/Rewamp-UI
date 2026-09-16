import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `premium glassmorphic profile card — frosted white glass, soft teal-to-white gradient, circular avatar, pill skill tags, 3x stat row, dual action buttons, 3D tilt on hover`;

export default function AuroraFeatureCardShowcase() {
    const [copied, setCopied] = useState(false);
    const cardRef = useRef(null);
    const rotX = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });
    const rotY = useSpring(useMotionValue(0), { stiffness: 200, damping: 28 });

    const handleMove = (e) => {
        const r = cardRef.current?.getBoundingClientRect();
        if (!r) return;
        const cx = r.width / 2, cy = r.height / 2;
        rotX.set(((e.clientY - r.top - cy) / cy) * -8);
        rotY.set(((e.clientX - r.left - cx) / cx) * 8);
    };
    const handleLeave = () => { rotX.set(0); rotY.set(0); };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[600px] rounded-[24px] overflow-hidden flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e0e8f0 0%, #cfe3ec 50%, #dde8f5 100%)' }}>

                {/* Soft ambient blobs */}
                <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(200,230,255,0.7) 0%, transparent 70%)', top: '-100px', left: '-100px' }}
                />
                <div className="absolute w-[400px] h-[400px] rounded-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(180,220,240,0.5) 0%, transparent 70%)', bottom: '-80px', right: '-80px' }}
                />

                {/* THE CARD */}
                <motion.div
                    ref={cardRef}
                    onMouseMove={handleMove}
                    onMouseLeave={handleLeave}
                    style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1000 }}
                    className="relative w-[300px] rounded-[28px] overflow-hidden shadow-[0_32px_80px_rgba(0,0,0,0.18)] cursor-pointer select-none"
                >
                    {/* Glass base */}
                    <div className="absolute inset-0 rounded-[28px]"
                        style={{
                            background: 'linear-gradient(160deg, rgba(255,255,255,0.85) 0%, rgba(220,240,255,0.7) 100%)',
                            border: '1px solid rgba(255,255,255,0.9)',
                            backdropFilter: 'blur(20px)',
                        }}
                    />
                    {/* Top specular sheen */}
                    <div className="absolute top-0 left-0 right-0 h-[120px] rounded-t-[28px] pointer-events-none"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.5) 0%, transparent 100%)' }}
                    />

                    <div className="relative z-10 p-6 flex flex-col gap-4">
                        {/* Top row */}
                        <div className="flex items-start justify-between">
                            {/* Avatar */}
                            <div className="w-[68px] h-[68px] rounded-full overflow-hidden shadow-lg"
                                style={{ border: '3px solid rgba(255,255,255,0.9)' }}>
                                <div className="w-full h-full flex items-center justify-center text-2xl font-black"
                                    style={{ background: 'linear-gradient(135deg, #b8d8f0, #9bc8e8)' }}>
                                    <span style={{ color: '#4a90b8' }}>CH</span>
                                </div>
                            </div>
                            {/* Share icon */}
                            <button className="w-9 h-9 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.8)' }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13"/>
                                </svg>
                            </button>
                        </div>

                        {/* Name & role */}
                        <div>
                            <h3 className="font-bold text-[20px] tracking-tight" style={{ color: '#111' }}>Chloe Harrison</h3>
                            <p className="text-[13px] mt-0.5" style={{ color: 'rgba(0,0,0,0.45)' }}>Product designer</p>
                            <div className="flex gap-2 mt-2.5">
                                {['Figma', 'UX Design'].map(tag => (
                                    <span key={tag} className="px-3 py-1 rounded-full text-[11.5px] font-medium"
                                        style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(0,0,0,0.08)', color: 'rgba(0,0,0,0.6)' }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-px" style={{ background: 'rgba(0,0,0,0.07)' }} />

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: 'Rating', value: '4.5', pre: '⭐' },
                                { label: 'Earned', value: '$15K+' },
                                { label: 'Rate', value: '$80/hr' },
                            ].map(s => (
                                <div key={s.label} className="flex flex-col items-center gap-1">
                                    <span className="font-bold text-[15px]" style={{ color: '#111' }}>{s.pre}{s.value}</span>
                                    <span className="text-[10.5px]" style={{ color: 'rgba(0,0,0,0.4)' }}>{s.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* CTA row */}
                        <div className="flex gap-3 mt-1">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="flex-1 py-3 rounded-2xl font-semibold text-[13.5px]"
                                style={{
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(220,240,255,0.6))',
                                    border: '1px solid rgba(255,255,255,0.85)',
                                    color: '#111',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
                                }}
                            >
                                Get in touch
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                style={{
                                    background: 'rgba(255,255,255,0.85)',
                                    border: '1px solid rgba(255,255,255,0.9)',
                                    boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                                    color: 'rgba(0,0,0,0.5)',
                                }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/>
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                <span className="absolute bottom-6 right-6 text-black/15 text-[12px] font-semibold tracking-widest uppercase">Glass Profile Card</span>
            </div>
</div>
    );
}
