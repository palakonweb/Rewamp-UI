import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

const promptContent = `cinematic widescreen hero card — staggered line-by-line text reveal, horizontal ambient light sweep, blurred atmospheric layers, minimal CTA with arrow, looping scene transitions`;

const SCENES = [
    {
        eyebrow: 'Generation 4 · 2026',
        title: ['Reasoning', 'that thinks', 'ahead.'],
        description: 'The first AI model to plan multi-step chains before generating a single token.',
        cta: 'Explore Model',
        from: '#0d0d1a',
        to: '#0a0818',
        accent: '#8b5cf6',
        beam: 'rgba(139,92,246,0.12)',
    },
    {
        eyebrow: 'Edge Runtime · Global',
        title: ['Zero latency.', 'Infinite', 'reach.'],
        description: 'Deploy to 220+ edge nodes instantly. Your users, everywhere, always fast.',
        cta: 'See Architecture',
        from: '#041014',
        to: '#060e1a',
        accent: '#06b6d4',
        beam: 'rgba(6,182,212,0.10)',
    },
    {
        eyebrow: 'Design System · v3',
        title: ['Craft your', 'interface.', 'Effortlessly.'],
        description: 'A complete design language engineered to reduce friction and amplify creativity.',
        cta: 'Browse Components',
        from: '#0e0a04',
        to: '#100808',
        accent: '#f59e0b',
        beam: 'rgba(245,158,11,0.10)',
    },
];

const LINE_VARIANTS = {
    hidden: { y: 32, opacity: 0, filter: 'blur(4px)' },
    visible: (i) => ({
        y: 0, opacity: 1, filter: 'blur(0px)',
        transition: { delay: i * 0.12, type: 'spring', stiffness: 260, damping: 22 },
    }),
    exit: { y: -24, opacity: 0, filter: 'blur(4px)', transition: { duration: 0.25 } },
};

export default function CinematicBannerCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [scene, setScene] = useState(0);
    const s = SCENES[scene];

    // Auto-rotate every 4 seconds
    useEffect(() => {
        const id = setInterval(() => setScene(prev => (prev + 1) % SCENES.length), 4000);
        return () => clearInterval(id);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[540px] rounded-[24px] overflow-hidden border border-white/[0.06] flex items-center justify-center"
                style={{ background: s.from, transition: 'background 0.8s ease' }}>

                {/* Animated horizontal beam sweep */}
                <motion.div
                    className="absolute inset-y-0 w-[600px] pointer-events-none"
                    animate={{ x: ['-120%', '220%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' }}
                    style={{ background: `linear-gradient(90deg, transparent, ${s.beam}, transparent)` }}
                />

                {/* Gradient bottom fog */}
                <div className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                    style={{ background: `linear-gradient(0deg, ${s.from} 0%, transparent 100%)` }}
                />

                {/* Ambient circle accent */}
                <motion.div
                    key={scene}
                    className="absolute right-[-80px] top-[-80px] w-[400px] h-[400px] rounded-full pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ background: `radial-gradient(circle, ${s.accent}1a 0%, transparent 70%)` }}
                />

                {/* Content */}
                <div className="relative z-10 w-full max-w-[640px] px-12 flex flex-col gap-7">
                    {/* Eyebrow */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`ey-${scene}`}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-3"
                        >
                            <div className="h-px w-8" style={{ background: s.accent }} />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em]"
                                style={{ color: s.accent }}>
                                {s.eyebrow}
                            </span>
                        </motion.div>
                    </AnimatePresence>

                    {/* Title — staggered per line */}
                    <AnimatePresence mode="wait">
                        <div key={`title-${scene}`} className="flex flex-col gap-0 overflow-hidden">
                            {s.title.map((line, i) => (
                                <div key={line} className="overflow-hidden">
                                    <motion.h2
                                        custom={i}
                                        variants={LINE_VARIANTS}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="font-black leading-[1.05] tracking-tight"
                                        style={{
                                            fontSize: 52,
                                            background: i === 0
                                                ? 'linear-gradient(90deg, #ffffff, rgba(255,255,255,0.7))'
                                                : i === 1
                                                    ? `linear-gradient(90deg, ${s.accent}, ${s.accent}bb)`
                                                    : 'rgba(255,255,255,0.35)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                        }}
                                    >
                                        {line}
                                    </motion.h2>
                                </div>
                            ))}
                        </div>
                    </AnimatePresence>

                    {/* Description */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${scene}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            className="text-white/40 text-[15px] leading-relaxed max-w-[460px]"
                        >
                            {s.description}
                        </motion.p>
                    </AnimatePresence>

                    {/* CTA */}
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.03, boxShadow: `0 0 28px ${s.accent}44` }}
                            whileTap={{ scale: 0.97 }}
                            className="flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[13px] text-white"
                            style={{ background: s.accent, transition: 'background 0.5s' }}
                        >
                            {s.cta} <ArrowUpRight size={14} />
                        </motion.button>

                        {/* Scene dots */}
                        <div className="flex gap-2">
                            {SCENES.map((_, i) => (
                                <button key={i} onClick={() => setScene(i)}
                                    className="w-2 h-2 rounded-full transition-all"
                                    style={{ background: i === scene ? s.accent : 'rgba(255,255,255,0.2)', transform: i === scene ? 'scale(1.3)' : 'scale(1)' }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Cinematic Banner</span>
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
