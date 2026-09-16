import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="w-full relative pt-32 pb-8 flex flex-col items-center justify-center z-10 overflow-hidden">

            {/* Massive Watermark Text Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none overflow-hidden z-0 opacity-[0.03]">
                <h1 className="text-[15vw] font-bold text-[var(--color-accent-red)] tracking-tighter whitespace-nowrap leading-none mix-blend-plus-lighter dark:mix-blend-normal">
                    PURRFORM
                </h1>
            </div>

            <div className="w-full max-w-[1200px] border-t border-black/10 dark:border-white/10 pt-16 flex flex-col gap-16 relative z-10 px-4 md:px-8">

                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand Column */}
                    <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            {/* Actual Logo Image */}
                            <img src="/logo.svg" alt="RewampUI Logo" className="w-8 h-8 object-contain" />
                            <span className="text-black dark:text-white font-bold text-xl tracking-wide">RewampUI</span>
                        </div>
                        <p className="text-black/60 dark:text-white/60 text-sm leading-relaxed max-w-[280px]">
                            Instant UI generation for modern developers.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3 mt-2">
                            {[
                                { name: 'X', url: 'https://x.com/Palakonweb' },
                                { name: 'In', url: 'https://www.linkedin.com/in/palak-sharma-63716930b/' },
                                { name: 'Ig', url: 'https://instagram.com/palakonweb_' }
                            ].map((social, idx) => (
                                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded border border-black/10 dark:border-white/10 flex items-center justify-center text-[var(--color-accent-red)] text-xs font-bold hover:bg-[var(--color-accent-red)]/10 hover:border-[var(--color-accent-red)]/30 transition-colors">
                                    {social.name}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns Container */}
                    <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <a href="#features" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Features</a>
                            <a href="#components" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Components</a>
                            <a href="#buttons" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Buttons</a>
                            <a href="#heros" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Heros</a>
                            <a href="#bentos" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Bentos</a>
                            <a href="#backgrounds" className="text-black dark:text-white text-sm hover:text-[var(--color-accent-red)] dark:hover:text-[var(--color-accent-red)] transition-colors">Backgrounds</a>
                        </div>
                    </div>

                    {/* Newsletter Column */}
                    <div className="col-span-1 md:col-span-4 flex flex-col gap-4">
                        <p className="text-black dark:text-white text-sm leading-relaxed mb-2">
                            Get the latest insights, updates, and product news delivered to your inbox.
                        </p>
                        <div className="w-full relative flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your e-mail"
                                className="w-full bg-transparent border border-black/10 dark:border-white/10 rounded-lg py-3 px-4 text-sm text-black dark:text-white focus:outline-none focus:border-[var(--color-accent-red)]/50 placeholder:text-black/30 dark:placeholder:text-white/30"
                            />
                            <button className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded bg-[var(--color-accent-red)] flex items-center justify-center hover:brightness-110 transition-all">
                                {/* Grid Icon inside button */}
                                <div className="grid grid-cols-3 gap-[1px] p-1 w-5 h-5">
                                    {[...Array(9)].map((_, i) => (
                                        <div key={i} className={`bg-white rounded-[1px] ${i === 4 || i === 8 ? 'opacity-50' : ''}`}></div>
                                    ))}
                                </div>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom Legal Bar */}
                <div className="w-full pt-8 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-black/40 dark:text-white/40 text-xs text-center sm:text-left w-full sm:w-auto">
                        © 2026 Developed and designed by Palakonweb. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-black/40 dark:text-white/40 text-xs hover:text-black dark:hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-black/40 dark:text-white/40 text-xs hover:text-black dark:hover:text-white transition-colors">Terms of use</a>
                        <a href="#" className="text-black/40 dark:text-white/40 text-xs hover:text-black dark:hover:text-white transition-colors">Disclaimer</a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
