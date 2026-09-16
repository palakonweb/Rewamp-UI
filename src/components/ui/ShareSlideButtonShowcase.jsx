import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, X as XIcon } from 'lucide-react';

const promptContent = `"Share" slide button: a glossy white pill reading "Share" in navy text. On hover/click the label slides out to the left while fading, and four social icons (WhatsApp, Instagram, X, Facebook) slide in from the right with a light stagger, filling the same pill. Leaving/clicking again reverses back to the "Share" label. Same glossy white surface throughout, no width change.`;

function WhatsApp(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" />
            <path d="M8.3 8.4c0 4.2 3.1 7.3 7.3 7.3.5 0 1.1-.5 1.1-1.3 0-.4-.2-.7-.6-.9l-1.6-.9a.7.7 0 0 0-.8.1l-.5.5a5.6 5.6 0 0 1-2.7-2.7l.5-.5a.7.7 0 0 0 .1-.8l-.9-1.6c-.2-.4-.5-.6-.9-.6-.8 0-1.3.6-1.3 1.1z" />
        </svg>
    );
}

function Instagram(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    );
}

function Facebook(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...props}>
            <path d="M16 3h-2.5A3.5 3.5 0 0 0 10 6.5V9H8v3h2v9h3v-9h2.5l.5-3H13V6.8c0-.4.3-.8.8-.8H16z" />
        </svg>
    );
}

const ICONS = [WhatsApp, Instagram, XIcon, Facebook];

export default function ShareSlideButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [open, setOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                <button
                    onMouseEnter={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                    onClick={() => setOpen((v) => !v)}
                    className="relative w-[240px] h-[64px] rounded-full select-none overflow-hidden border border-black/10"
                    style={{
                        background: 'linear-gradient(160deg, #ffffff, #e8ebf0)',
                        boxShadow: '0 16px 30px -14px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.9), inset 0 -8px 12px rgba(150,160,180,0.25)',
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {!open ? (
                            <motion.span
                                key="label"
                                className="absolute inset-0 flex items-center justify-center text-[18px] font-bold tracking-wide text-[#2c3e56]"
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -30 }}
                                transition={{ duration: 0.25 }}
                            >
                                Share
                            </motion.span>
                        ) : (
                            <motion.div key="icons" className="absolute inset-0 flex items-center justify-center gap-5">
                                {ICONS.map((Icon, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.25, delay: i * 0.06 }}
                                        className="text-[#2c3e56]"
                                    >
                                        <Icon width={20} height={20} />
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Hover to Share</span>
            </div>
</div>
    );
}
