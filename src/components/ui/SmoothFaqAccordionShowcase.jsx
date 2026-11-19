import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointerClick, Layers, Hand, Send, Gauge, ChevronDown } from 'lucide-react';

// Only "Usability & Accessibility"'s description is visible in the
// reference ("Making designs easy to use and accessible for everyone,
// including those with disabilities."). The other four rows' descriptions
// are reasonable inferred copy following the same one-line pattern, not
// something observed in the screenshots.
const faqs = [
    {
        id: 'what-is',
        icon: MousePointerClick,
        title: 'What is Interaction Design?',
        description:
            'The practice of designing interactive digital products, environments, and services around how people actually engage with them.',
    },
    {
        id: 'principles',
        icon: Layers,
        title: 'Principles & Patterns',
        description: 'Core concepts and reusable solutions that keep an interface’s behavior consistent and predictable.',
    },
    {
        id: 'usability',
        icon: Hand,
        title: 'Usability & Accessibility',
        description: 'Making designs easy to use and accessible for everyone, including those with disabilities.',
    },
    {
        id: 'prototyping',
        icon: Send,
        title: 'Prototyping & Testing',
        description: 'Building quick interactive mockups and validating them with real users before anything ships.',
    },
    {
        id: 'optimisation',
        icon: Gauge,
        title: 'UX Optimisation',
        description: 'Improving the overall user experience by enhancing usability and satisfaction.',
    },
];

// Small spatial touches (chevron rotation, background fade) get a spring so
// they have a little life; the height/opacity reveal gets a plain ease-out
// tween, since spring physics on an "auto" height tends to read as janky
// rather than smooth.
const SPRING = { type: 'spring', stiffness: 460, damping: 36 };
const REVEAL_TWEEN = { duration: 0.32, ease: [0.16, 1, 0.3, 1] };

export default function SmoothFaqAccordionShowcase() {
    const [openId, setOpenId] = useState(null);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md rounded-[28px] bg-white p-2 shadow-[0_20px_44px_-18px_rgba(0,0,0,0.22)]">
                {faqs.map((faq, i) => {
                    const Icon = faq.icon;
                    const isOpen = openId === faq.id;

                    return (
                        <motion.div
                            key={faq.id}
                            layout="position"
                            transition={SPRING}
                            animate={{ backgroundColor: isOpen ? '#FAFAFA' : 'rgba(0,0,0,0)' }}
                            className="relative rounded-2xl"
                            style={{ borderTop: i === 0 ? 'none' : '1px solid #F0F0F0' }}
                            onMouseEnter={() => setOpenId(faq.id)}
                            onMouseLeave={() => setOpenId((prev) => (prev === faq.id ? null : prev))}
                        >
                            <button
                                type="button"
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                className="relative z-10 w-full flex items-center justify-between gap-3 px-4 py-4 cursor-pointer text-left"
                            >
                                <span className="flex items-center gap-3 text-[16px] sm:text-[17px] font-semibold text-neutral-900">
                                    <Icon size={19} strokeWidth={1.75} className="shrink-0 text-neutral-500" />
                                    {faq.title}
                                </span>
                                <motion.span
                                    animate={{ rotate: isOpen ? 180 : 0 }}
                                    transition={SPRING}
                                    className="shrink-0"
                                >
                                    <ChevronDown size={18} strokeWidth={2} className="text-neutral-400" />
                                </motion.span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={REVEAL_TWEEN}
                                        className="relative z-10 overflow-hidden px-4"
                                    >
                                        <p className="pb-4 text-[14px] leading-relaxed text-neutral-500">
                                            {faq.description}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
