import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, ChevronLeft, ChevronRight } from 'lucide-react';

const promptContent = `dark testimonial carousel card — neon-bordered glass pane, animated quote reveal, avatar with ring glow, star rating dots, smooth slide transition`;

const TESTIMONIALS = [
    {
        quote: "The design system is unlike anything I've used. Every interaction feels intentional, alive.",
        name: 'Maya Chen',
        role: 'Head of Design · Vercel',
        initials: 'MC',
        color: '#a78bfa',
        stars: 5,
    },
    {
        quote: "Shipped our entire product UI in 2 weeks. The components are drop-in perfect, zero tweaking.",
        name: 'James Okafor',
        role: 'CTO · Linear',
        initials: 'JO',
        color: '#38bdf8',
        stars: 5,
    },
    {
        quote: "I've never seen animations this smooth in a component library. They're genuinely addictive.",
        name: 'Priya Nair',
        role: 'Product Lead · Notion',
        initials: 'PN',
        color: '#34d399',
        stars: 5,
    },
];

export default function NeonTestimonialCardShowcase() {
    const [copied, setCopied] = useState(false);
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(1);

    const t = TESTIMONIALS[index];

    const go = (d) => {
        setDir(d);
        setIndex(i => (i + d + TESTIMONIALS.length) % TESTIMONIALS.length);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const variants = {
        enter: (d) => ({ x: d > 0 ? 60 : -60, opacity: 0, filter: 'blur(6px)' }),
        center: { x: 0, opacity: 1, filter: 'blur(0px)' },
        exit: (d) => ({ x: d > 0 ? -60 : 60, opacity: 0, filter: 'blur(6px)' }),
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[520px] rounded-[24px] overflow-hidden bg-[#080808] border border-white/[0.06] flex items-center justify-center">

                {/* BG */}
                <div className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 50%, ${t.color}0d 0%, transparent 65%)`, transition: 'background 0.6s' }}
                />
                <div className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />

                {/* Card */}
                <div className="relative w-[400px]">
                    {/* neon border glow ring */}
                    <motion.div
                        className="absolute -inset-[1px] rounded-[22px] pointer-events-none"
                        animate={{ boxShadow: `0 0 30px ${t.color}33, inset 0 0 30px ${t.color}11` }}
                        transition={{ duration: 0.5 }}
                        style={{ border: `1px solid ${t.color}44` }}
                    />

                    <div className="relative rounded-[22px] overflow-hidden p-8 flex flex-col gap-7"
                        style={{ background: 'linear-gradient(160deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)', backdropFilter: 'blur(24px)' }}>
                        {/* Top edge */}
                        <div className="absolute top-0 left-8 right-8 h-px"
                            style={{ background: `linear-gradient(90deg, transparent, ${t.color}55, transparent)` }}
                        />

                        {/* Quote mark */}
                        <div className="text-[64px] leading-none font-black" style={{ color: t.color, opacity: 0.25, lineHeight: 0.8 }}>"</div>

                        {/* Animated quote */}
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.p
                                key={index}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                                className="text-white/80 text-[16px] leading-relaxed font-medium"
                            >
                                {t.quote}
                            </motion.p>
                        </AnimatePresence>

                        {/* Stars */}
                        <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: i * 0.06, type: 'spring', stiffness: 400 }}
                                    className="w-4 h-4 rounded-full"
                                    style={{ background: i < t.stars ? t.color : 'rgba(255,255,255,0.1)' }}
                                />
                            ))}
                        </div>

                        {/* Avatar + name row */}
                        <AnimatePresence mode="wait" custom={dir}>
                            <motion.div
                                key={`meta-${index}`}
                                custom={dir}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.05 }}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-[13px]"
                                        style={{
                                            background: `${t.color}22`,
                                            border: `2px solid ${t.color}55`,
                                            color: t.color,
                                            boxShadow: `0 0 16px ${t.color}33`,
                                        }}>
                                        {t.initials}
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold text-[13px]">{t.name}</p>
                                        <p className="text-white/35 text-[11px]">{t.role}</p>
                                    </div>
                                </div>

                                {/* Nav arrows */}
                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        onClick={() => go(-1)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                    >
                                        <ChevronLeft size={14} className="text-white/50" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                        onClick={() => go(1)}
                                        className="w-8 h-8 rounded-full flex items-center justify-center"
                                        style={{ background: `${t.color}22`, border: `1px solid ${t.color}44` }}
                                    >
                                        <ChevronRight size={14} style={{ color: t.color }} />
                                    </motion.button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <span className="absolute bottom-6 right-6 text-white/15 text-[12px] font-semibold tracking-widest uppercase">Neon Testimonial</span>
            </div>
</div>
    );
}
