import React from 'react';
import { motion } from 'framer-motion';
import { Copy } from 'lucide-react';

const promptItems = [
    { text: '"Generate a clean glass button"', image: '/comp-1.png' },
    { text: '"Create a hero section with {{ heading }} {{ subheading }} and a soft gradient background"', image: '/comp-2.png' },
    { text: '"Generate a minimal asymmetric bento grid with 6 cards {{ blue }} {{ grey }}"', image: '/comp-3.png' },
    { text: '"Create a pricing section with three elegant cards {{ cherry red }} {{ white }}"', image: '/comp-4.png' }
];

// Duplicate items to ensure smooth infinite scroll filling the screen
const duplicatedItems = [...promptItems, ...promptItems, ...promptItems, ...promptItems, ...promptItems, ...promptItems];

const PromptCard = ({ text }) => (
    <div className="w-[320px] h-[180px] shrink-0 bg-[#0a0a0a] border border-white/10 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative group">
        <div className="flex justify-between items-center w-full mb-3">
            <div className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/50 text-[9px] font-mono tracking-wider uppercase">
                Prompt
            </div>
            <button className="text-white/30 hover:text-white/80 transition-colors bg-white/5 p-1 rounded border border-white/5 hover:border-white/20 relative">
                <Copy size={12} />
            </button>
        </div>
        <div className="flex-1 flex items-center">
            <div className="text-white/90 text-[14px] leading-[1.6] font-medium tracking-tight font-sans text-left">
                "{text}"
            </div>
        </div>

        {/* Decorative subtle glowing dot */}
        <div className="absolute bottom-5 right-5 w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[0_0_10px_var(--color-accent-red)] opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
);

const ResultCard = ({ image }) => (
    <div className="w-[320px] h-[180px] shrink-0 bg-[#050505] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center relative shadow-lg group">
        <img src={image} alt="Generated UI" className="w-full h-full object-cover opacity-95 transition-transform duration-700 hover:scale-105" />
    </div>
);

export default function PromptToUISection() {
    return (
        <section id="about" className="w-full relative overflow-hidden bg-transparent">
            <div className="text-center mb-8 md:mb-12 relative z-10 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-[var(--color-accent-red)]/30 bg-black/5 dark:bg-[var(--color-accent-red)]/10 mb-6 drop-shadow-lg"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-red)] shadow-[0_0_8px_var(--color-accent-red)]"></div>
                    <span className="text-black/80 dark:text-[var(--color-accent-red)] text-[11px] font-semibold tracking-wide uppercase">Real-time Generation</span>
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-medium text-black dark:text-white tracking-tight mb-5 drop-shadow-sm">
                    From Prompt to Pixels
                </h2>
                <p className="text-black/50 dark:text-white/50 text-[16px] md:text-[18px] font-light max-w-xl mx-auto leading-relaxed">
                    Watch plain text prompts transform into polished UI components in real time.<br />

                </p>
            </div>

            {/* The main animation container */}
            <div className="w-full h-[300px] relative flex overflow-hidden bg-transparent border-y border-white/5">

                {/* Background Glow for the container itself */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(154,0,2,0.18),transparent_60%)] pointer-events-none" />

                {/* Vertical Divider (The Engine/Boundary) */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--color-accent-red)] to-transparent z-30 shadow-[0_0_20px_var(--color-accent-red)]">
                    {/* Glowing node at center */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-24 bg-[var(--color-accent-red)] rounded-full blur-[3px] opacity-100" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-12 bg-white rounded-full opacity-100 shadow-[0_0_10px_white]" />
                </div>

                {/* Left Side (Prompts Only) */}
                <div
                    className="absolute inset-0 z-10 border-r border-white/5"
                    style={{ clipPath: 'inset(0 50% 0 0)' }}
                >
                    <motion.div
                        initial={{ x: "-50%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="flex gap-8 absolute top-1/2 -translate-y-1/2 w-max px-4"
                    >
                        {duplicatedItems.map((item, idx) => (
                            <div key={`prompt - ${idx} `} className="w-[320px]">
                                <PromptCard text={item.prompt} />
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right Side (Results Only) */}
                <div
                    className="absolute inset-0 z-20"
                    style={{ clipPath: 'inset(0 0 0 50%)' }}
                >
                    <motion.div
                        initial={{ x: "-50%" }}
                        animate={{ x: "0%" }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="flex gap-8 absolute top-1/2 -translate-y-1/2 w-max px-4"
                    >
                        {duplicatedItems.map((item, idx) => (
                            <div key={`result - ${idx} `} className="w-[320px]">
                                <ResultCard image={item.image} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
