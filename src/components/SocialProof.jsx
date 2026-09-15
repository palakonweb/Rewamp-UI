import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// ─── Animated Counter ───────────────────────────────────────────────────────
const AnimatedCounter = ({ target, prefix = '', suffix = '', decimals = 0, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    useEffect(() => {
        if (!inView) return;
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
            setCount(parseFloat((eased * target).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [inView, target, decimals, duration]);

    return (
        <span ref={ref}>
            {prefix}{decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}{suffix}
        </span>
    );
};

// ─── Stat Cards ──────────────────────────────────────────────────────────────
const stats = [
    {
        label: 'Components Shipped',
        target: 60,
        suffix: '+',
        sublabel: 'Ready for production',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
                <rect x={3} y={3} width={7} height={7} rx={1.5} />
                <rect x={14} y={3} width={7} height={7} rx={1.5} />
                <rect x={3} y={14} width={7} height={7} rx={1.5} />
                <rect x={14} y={14} width={7} height={7} rx={1.5} />
            </svg>
        ),
    },
    {
        label: 'Developer Hours Saved',
        target: 12000,
        suffix: '+',
        sublabel: 'Across early users',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
                <circle cx={12} cy={12} r={9} />
                <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: 'Customer Satisfaction',
        target: 99,
        suffix: '%',
        sublabel: 'From beta feedback',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
                    strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        label: 'Frameworks Supported',
        target: 4,
        suffix: '',
        sublabel: 'React, Next, Vite & more',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
                <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
    {
        name: 'Mia Torres',
        role: 'Frontend Lead @ Vercel',
        avatar: 'MT',
        avatarBg: 'from-violet-600 to-indigo-600',
        quote: 'Purrform cut our design-to-dev handoff time in half. The quality is unreal.',
        rating: 5,
    },
    {
        name: 'James K.',
        role: 'Indie Maker',
        avatar: 'JK',
        avatarBg: 'from-emerald-500 to-teal-600',
        quote: 'I shipped my landing page in 2 hours. Every component is pixel-perfect.',
        rating: 5,
    },
    {
        name: 'Priya N.',
        role: 'Design Engineer @ Linear',
        avatar: 'PN',
        avatarBg: 'from-rose-500 to-pink-600',
        quote: 'This is the Aceternity killer. The animations are so smooth I had to check the code twice.',
        rating: 5,
    },
    {
        name: 'Alex Carter',
        role: 'CTO @ Raycast',
        avatar: 'AC',
        avatarBg: 'from-amber-500 to-orange-600',
        quote: "Exactly the component library I've been wishing existed. Will be using for every project.",
        rating: 5,
    },
    {
        name: 'Sofia Chen',
        role: 'Product Designer',
        avatar: 'SC',
        avatarBg: 'from-sky-500 to-blue-600',
        quote: 'The dark mode variants alone are worth it. Everything is so intentional and refined.',
        rating: 5,
    },
];

// ─── Star Rating ──────────────────────────────────────────────────────────────
const Stars = ({ count = 5 }) => (
    <div className="flex items-center gap-0.5">
        {Array.from({ length: count }).map((_, i) => (
            <svg key={i} viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-[var(--color-accent-red)]">
                <path d="M6 1l1.15 2.4 2.62.37-1.9 1.84.45 2.62L6 7.02l-2.32 1.21.45-2.62L2.23 3.77l2.62-.37z" />
            </svg>
        ))}
    </div>
);

// ─── Testimonial Card ─────────────────────────────────────────────────────────
const TestimonialCard = ({ testimonial, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
            whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
            className="relative flex-shrink-0 w-72 bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/[0.07] rounded-2xl p-5 shadow-sm hover:shadow-[0_12px_40px_rgba(154,0,2,0.08)] transition-shadow group cursor-default"
        >
            {/* Red accent corner line */}
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-red)]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-start gap-3 mb-4">
                {/* Avatar */}
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-sm`}>
                    {testimonial.avatar}
                </div>
                <div className="flex flex-col">
                    <span className="text-black dark:text-white text-[13px] font-semibold leading-tight">{testimonial.name}</span>
                    <span className="text-black/40 dark:text-white/40 text-[11px]">{testimonial.role}</span>
                </div>
                <div className="ml-auto">
                    <Stars count={testimonial.rating} />
                </div>
            </div>

            <p className="text-black/70 dark:text-white/60 text-[13px] leading-relaxed font-light">
                "{testimonial.quote}"
            </p>
        </motion.div>
    );
};

// ─── Trust Belt ───────────────────────────────────────────────────────────────
const TrustBelt = () => {
    const logos = [
        { name: 'React', icon: '⚛' },
        { name: 'Next.js', icon: '▲' },
        { name: 'Framer Motion', icon: '◈' },
        { name: 'Tailwind CSS', icon: '✦' },
        { name: 'TypeScript', icon: '⬡' },
        { name: 'Vite', icon: '⚡' },
    ];

    return (
        <div className="flex items-center gap-2 flex-wrap justify-center mt-8">
            <span className="text-black/30 dark:text-white/25 text-[11px] font-medium tracking-widest uppercase mr-2">
                Works with
            </span>
            {logos.map((logo, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                    whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/8 dark:border-white/8 bg-black/[0.03] dark:bg-white/[0.03] hover:border-[var(--color-accent-red)]/30 hover:bg-[var(--color-accent-red)]/5 transition-all cursor-default"
                >
                    <span className="text-[13px]">{logo.icon}</span>
                    <span className="text-black/50 dark:text-white/50 text-[11px] font-medium">{logo.name}</span>
                </motion.div>
            ))}
        </div>
    );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
const SocialProof = () => {
    return (
        <section
            id="social-proof"
            className="w-full py-24 relative overflow-hidden"
        >
            {/* Ambient background glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(154,0,2,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-5xl mx-auto px-4 md:px-0 relative z-10">

                {/* ── Section Header ─────────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="text-center mb-16"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-accent-red)]/20 bg-[var(--color-accent-red)]/5 mb-6">
                        <motion.div
                            animate={{ scale: [1, 1.4, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)]"
                        />
                        <span className="text-[var(--color-accent-red)] text-[11px] font-semibold tracking-widest uppercase">
                            Trusted by Builders
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-medium text-black dark:text-white tracking-tight mb-4">
                        Numbers that{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-accent-red)] to-rose-400">
                            speak
                        </span>
                    </h2>
                    <p className="text-black/50 dark:text-white/50 text-[16px] md:text-[18px] font-light leading-relaxed max-w-lg mx-auto">
                        Purrform is the fastest way to go from idea to production-grade interface.
                    </p>
                </motion.div>

                {/* ── Stats Grid ─────────────────────────── */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
                >
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 20, scale: 0.97 },
                                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
                            }}
                            whileHover={{ y: -5, transition: { duration: 0.2, ease: 'easeOut' } }}
                            className="relative bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/[0.07] rounded-2xl p-5 flex flex-col gap-3 overflow-hidden group hover:shadow-[0_10px_40px_rgba(154,0,2,0.08)] transition-shadow cursor-default"
                        >
                            {/* Hover gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-red)]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            {/* Top accent line */}
                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-red)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className="w-8 h-8 rounded-xl bg-[var(--color-accent-red)]/10 text-[var(--color-accent-red)] flex items-center justify-center group-hover:bg-[var(--color-accent-red)]/15 transition-colors">
                                {stat.icon}
                            </div>

                            {/* Count */}
                            <div className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight leading-none tabular-nums">
                                <AnimatedCounter target={stat.target} suffix={stat.suffix} duration={1.8} />
                            </div>

                            {/* Label */}
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[13px] font-semibold text-black/80 dark:text-white/80 leading-snug">
                                    {stat.label}
                                </span>
                                <span className="text-[11px] text-black/35 dark:text-white/35">
                                    {stat.sublabel}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── Section Divider ────────────────────── */}
                <div className="flex items-center gap-4 mb-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/8 dark:via-white/8 to-transparent" />
                    <span className="text-black/30 dark:text-white/25 text-[11px] font-medium tracking-widest uppercase whitespace-nowrap">
                        What builders are saying
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/8 dark:via-white/8 to-transparent" />
                </div>

                {/* ── Testimonials Row ───────────────────── */}
                <div className="relative">
                    {/* Edge fades */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

                    <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 px-2 snap-x snap-mandatory">
                        {testimonials.map((t, i) => (
                            <div key={i} className="snap-start">
                                <TestimonialCard testimonial={t} index={i} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Aggregate Rating ─────────────────── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col items-center gap-3 mt-10"
                >
                    {/* Stacked Avatars */}
                    <div className="flex items-center">
                        {testimonials.map((t, i) => (
                            <div
                                key={i}
                                style={{ marginLeft: i === 0 ? 0 : -10, zIndex: testimonials.length - i }}
                                className={`w-7 h-7 rounded-full bg-gradient-to-br ${t.avatarBg} border-2 border-white dark:border-[#0a0a0a] flex items-center justify-center text-white text-[8px] font-bold shadow-sm relative`}
                            >
                                {t.avatar}
                            </div>
                        ))}
                        <span className="ml-3 text-black/60 dark:text-white/50 text-[13px] font-medium">
                            Loved by <strong className="text-black dark:text-white">200+</strong> early adopters
                        </span>
                    </div>

                    {/* Stars Row */}
                    <div className="flex items-center gap-2">
                        <Stars count={5} />
                        <span className="text-[13px] font-semibold text-black dark:text-white">4.9</span>
                        <span className="text-black/30 dark:text-white/30 text-[12px]">/ 5.0</span>
                    </div>
                </motion.div>

                {/* ── Trust Belt ────────────────────────── */}
                <TrustBelt />

            </div>
        </section>
    );
};

export default SocialProof;
