export const appleNavbarPrompt = `MacBook-notch-inspired Apple-style dynamic navbar for Purrform: A thin flat black line (3px) spans the full width of the viewport at the very top. In the center, that line flares outward via a small hand-drawn concave curve (10px, SVG path, not a sharp corner) on each side into a wider, taller navbar "notch" (bg-black/95, backdrop blur), like the MacBook camera-housing/Dynamic-Island shape. The notch has squared top corners connected by the small concave flare and a large sweeping convex rounded-bottom corner (36px radius) that curves smoothly into the page background. Left side of the notch features a small glossy red-gradient rounded-square app icon with a paw-print glyph and bold white brand title "Purrform". Center features tightly-spaced navigation links ("Components", "Features", "Templates", "Pricing") that never wrap or overlap, using smooth Framer Motion magnetic hover pill indicators and text color transitions from neutral-400 to white. Hovering a link reveals a larger floating mini browser-frame preview panel (380px wide) below the navbar — with mock traffic-light dots, a fake URL, and a gradient page-mockup card (title + skeleton lines + placeholder tiles) themed to that section, animated in with a spring scale/fade. Right side features a small solid white rounded pill button with a sparkle icon and "Browse" text, with spring press physics. Fully responsive: collapses below 768px into a full-width black capsule with a large rounded-bottom corner, with an animated hamburger toggle that expands into a black frosted dropdown sheet with spring entrance animations. Built with TypeScript and Framer Motion.`;

export const appleNavbarCode = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, Sparkles } from 'lucide-react';

export interface NavItem {
    label: string;
    href: string;
    badge?: string;
}

const PREVIEW_ACCENTS = [
    'from-[#FF6B6B] to-[#B91C1C]',
    'from-[#3B82F6] to-[#1E40AF]',
    'from-[#A855F7] to-[#6D28D9]',
    'from-[#22C55E] to-[#0F766E]',
    'from-[#F59E0B] to-[#B45309]',
    'from-[#EC4899] to-[#9D174D]',
];

export interface AppleNavbarProps {
    brandName?: string;
    logoUrl?: string;
    items?: NavItem[];
    downloadText?: string;
    onDownload?: () => void;
    activeHref?: string;
    className?: string;
}

const DEFAULT_ITEMS: NavItem[] = [
    { label: 'Components', href: '#components' },
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'Pricing', href: '#pricing' },
];

export const AppleNavbar: React.FC<AppleNavbarProps> = ({
    brandName = 'Purrform',
    items = DEFAULT_ITEMS,
    downloadText = 'Browse',
    onDownload,
    activeHref = '#components',
    className = '',
}) => {
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [currentHref, setCurrentHref] = useState<string>(activeHref);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    return (
        <header className={\`relative w-full select-none z-50 \${className}\`}>
            {/* Thin full-bleed line across the very top — the "MacBook bezel" the notch flares out of */}
            <div className="hidden md:block absolute top-0 left-0 right-0 h-[3px] bg-black/95" />

            {/* Desktop / Tablet Navbar — a narrower "notch" centered under the line, flaring out via small concave corners, large convex rounded-bottom */}
            <div className="hidden md:flex justify-center w-full">
            <motion.nav
                initial={{ y: -24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                className="relative flex items-center justify-between gap-3 lg:gap-6 w-[calc(100%-4rem)] max-w-4xl px-5 lg:px-8 py-3 lg:py-3.5 rounded-b-[36px] bg-black/95 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.35)] transition-colors duration-300"
            >
                {/* Left concave flare — hand-drawn path curving inward from the thin line into the notch's left edge */}
                <svg
                    className="absolute top-0 left-0 -translate-x-full w-2.5 h-2.5"
                    viewBox="0 0 10 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path d="M0,0 L10,0 L10,10 Q0,10 0,3 L0,0 Z" fill="rgba(0,0,0,0.95)" />
                </svg>
                {/* Right concave flare — mirrored */}
                <svg
                    className="absolute top-0 right-0 w-2.5 h-2.5 [transform:translateX(100%)_scaleX(-1)]"
                    viewBox="0 0 10 10"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path d="M0,0 L10,0 L10,10 Q0,10 0,3 L0,0 Z" fill="rgba(0,0,0,0.95)" />
                </svg>
                {/* Brand / Logo */}
                <a
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentHref('#');
                    }}
                    className="flex items-center gap-2.5 text-white group shrink-0"
                >
                    {/* Rounded-square app icon with Purrform paw glyph */}
                    <div className="relative w-6 h-6 rounded-[6px] bg-gradient-to-b from-[#FF6B6B] via-[#EF4444] to-[#B91C1C] flex items-center justify-center overflow-hidden shadow-[0_2px_6px_rgba(239,68,68,0.45),inset_0_1px_1px_rgba(255,255,255,0.5)] transition-transform duration-200 group-hover:scale-105">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                        <PawPrint size={13} className="text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]" strokeWidth={2.2} />
                    </div>

                    <span className="font-semibold text-[13px] text-white tracking-tight">
                        {brandName}
                    </span>
                </a>

                {/* Nav Links with Magnetic Framer Motion Pill */}
                <div
                    className="relative flex items-center gap-0 min-w-0 overflow-hidden"
                    onMouseLeave={() => setHoveredIdx(null)}
                >
                    {items.map((item, index) => {
                        const isActive = currentHref === item.href;
                        return (
                            <a
                                key={item.label}
                                href={item.href}
                                onMouseEnter={() => setHoveredIdx(index)}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setCurrentHref(item.href);
                                }}
                                className={\`relative shrink-0 px-2 lg:px-3 py-1.5 text-[11.5px] lg:text-[12.5px] font-medium whitespace-nowrap transition-colors duration-200 z-10 \${
                                    isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                                }\`}
                            >
                                {hoveredIdx === index && (
                                    <motion.span
                                        layoutId="navbar-hover-pill"
                                        className="absolute inset-0 rounded-full bg-white/10 -z-10"
                                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                                    />
                                )}
                                {isActive && hoveredIdx === null && (
                                    <span className="absolute inset-0 rounded-full bg-white/[0.06] -z-10" />
                                )}
                                <span className="relative flex items-center gap-1.5">
                                    {item.label}
                                    {item.badge && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-white/10 text-white/80">
                                            {item.badge}
                                        </span>
                                    )}
                                </span>
                            </a>
                        );
                    })}
                </div>

                {/* CTA Browse Button */}
                <div className="shrink-0">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onDownload}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-semibold text-[12px] tracking-tight whitespace-nowrap hover:bg-neutral-100 transition-colors shadow-[0_2px_10px_rgba(255,255,255,0.15)]"
                    >
                        <Sparkles size={12} className="fill-current" />
                        <span>{downloadText}</span>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Hover Preview Frame — mini page mockup for the hovered nav item */}
            <AnimatePresence>
                {hoveredIdx !== null && (
                    <motion.div
                        key={hoveredIdx}
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-[380px] rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d0d] shadow-[0_24px_48px_rgba(0,0,0,0.45)] z-30 pointer-events-none"
                    >
                        {/* Mock browser chrome */}
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
                            <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                            <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                            <span className="ml-2 text-[11.5px] text-neutral-500 truncate">
                                purrform.dev{items[hoveredIdx].href}
                            </span>
                        </div>
                        {/* Mock page preview */}
                        <div className={\`relative h-[220px] bg-gradient-to-br \${PREVIEW_ACCENTS[hoveredIdx % PREVIEW_ACCENTS.length]} p-5 flex flex-col gap-2 overflow-hidden\`}>
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
                            <span className="relative text-[15px] font-semibold text-white/95 tracking-tight">
                                {items[hoveredIdx].label}
                            </span>
                            <div className="relative flex flex-col gap-1.5 mt-1">
                                <span className="h-2 w-3/4 rounded-full bg-white/40" />
                                <span className="h-2 w-1/2 rounded-full bg-white/25" />
                            </div>
                            <div className="relative grid grid-cols-3 gap-2 mt-auto">
                                <span className="h-10 rounded-md bg-white/15" />
                                <span className="h-10 rounded-md bg-white/15" />
                                <span className="h-10 rounded-md bg-white/15" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>

            {/* Mobile Capsule & Animated Dropdown */}
            <div className="relative w-full max-w-[420px] md:hidden">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-b-[24px] bg-black/95 backdrop-blur-md shadow-[0_12px_32px_rgba(0,0,0,0.35)]"
                >
                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-[7px] bg-gradient-to-b from-[#FF6B6B] via-[#EF4444] to-[#B91C1C] flex items-center justify-center shadow-md">
                            <PawPrint size={15} className="text-white" strokeWidth={2.2} />
                        </div>
                        <span className="font-semibold text-[14px] text-white tracking-tight">{brandName}</span>
                    </div>

                    {/* Right: Download + Hamburger */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onDownload}
                            className="px-2.5 py-1 rounded-full bg-white text-black font-semibold text-[11px] tracking-tight hover:bg-neutral-100 transition-colors"
                        >
                            {downloadText}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen((o) => !o)}
                            aria-label="Toggle navigation"
                            className="p-1.5 text-neutral-400 hover:text-white transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </motion.div>

                {/* Mobile Frosted Dropdown Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.96 }}
                            animate={{ opacity: 1, y: 8, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute left-0 right-0 top-full p-3 rounded-b-[18px] bg-black/95 backdrop-blur-md shadow-2xl flex flex-col gap-1 z-50"
                        >
                            {items.map((item, idx) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.04 }}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentHref(item.href);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={\`px-3 py-2 rounded-xl text-[14px] font-medium transition-colors flex items-center justify-between \${
                                        currentHref === item.href
                                            ? 'bg-white/10 text-white'
                                            : 'text-neutral-400 hover:text-white hover:bg-white/5'
                                    }\`}
                                >
                                    <span>{item.label}</span>
                                    {item.badge && (
                                        <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-white/10 text-white/80">
                                            {item.badge}
                                        </span>
                                    )}
                                </motion.a>
                            ))}

                            <div className="pt-2 mt-1 border-t border-white/10">
                                <button
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        onDownload?.();
                                    }}
                                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-black font-semibold text-[13px] shadow-sm hover:bg-neutral-100 transition-colors"
                                >
                                    <Sparkles size={15} className="fill-current" />
                                    <span>{downloadText} components</span>
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default AppleNavbar;
`;
