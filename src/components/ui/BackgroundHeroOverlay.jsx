import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundHeroOverlay({
    title = "Liquid cursor gradients to enhance your UI",
    subtitle = "Creative Components",
    badge = "NEW",
    brandName = "RewampUI",
    defaultShow = true
}) {
    const [showDemo, setShowDemo] = useState(defaultShow);

    // Format title if it's a single string into balanced lines if needed
    const renderTitle = () => {
        if (typeof title !== 'string') return title;
        // If title already has "to enhance your UI", split before "to" or "enhance"
        if (title.includes('to enhance your UI')) {
            const parts = title.split('to enhance your UI');
            return (
                <>
                    {parts[0]}<br className="hidden sm:inline" />
                    to enhance your UI
                </>
            );
        }
        return title;
    };

    return (
        <>
            <AnimatePresence>
                {showDemo && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="absolute inset-0 z-10 flex flex-col justify-between p-5 sm:p-7 pointer-events-none select-none"
                    >
                        {/* Top Floating Glass Navbar */}
                        <div className="w-full flex justify-center pointer-events-auto">
                            <div className="flex items-center justify-between gap-5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-xl max-w-lg w-full">
                                {/* Brand Logo + Name with official /logo.svg */}
                                <div className="flex items-center gap-2">
                                    <img src="/logo.svg" alt="RewampUI" className="w-5 h-5 object-contain shrink-0" />
                                    <span className="font-bold text-[13px] tracking-tight text-white">{brandName}</span>
                                </div>

                                {/* Nav Links */}
                                <div className="hidden sm:flex items-center gap-5 text-[12px] text-white/70 font-medium">
                                    <span className="hover:text-white transition-colors cursor-pointer">Features</span>
                                    <span className="hover:text-white transition-colors cursor-pointer">About</span>
                                </div>

                                {/* Sign up Action Button */}
                                <button className="px-3.5 py-1 rounded-full bg-white text-black font-semibold text-[11px] sm:text-[12px] hover:bg-white/90 transition shadow-sm cursor-pointer">
                                    Sign up
                                </button>
                            </div>
                        </div>

                        {/* Center Hero Content */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-4 shadow-sm">
                                <span className="px-1.5 py-0.5 rounded-full bg-white text-black font-bold text-[8.5px] tracking-wider uppercase">
                                    {badge}
                                </span>
                                <span className="text-[11px] text-white/80 font-medium tracking-wide">
                                    {subtitle}
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-sans normal-case text-xl sm:text-2xl md:text-[30px] font-bold text-white tracking-tight leading-[1.2] max-w-md drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                                {renderTitle()}
                            </h1>

                            {/* CTAs */}
                            <div className="flex items-center justify-center gap-2.5 mt-5 pointer-events-auto">
                                <button className="px-5 py-2 rounded-xl bg-white text-black font-semibold text-[12px] sm:text-[13px] hover:bg-white/90 transition shadow-lg cursor-pointer">
                                    Get started
                                </button>
                                <button className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-[12px] sm:text-[13px] backdrop-blur-sm border border-white/10 transition shadow-sm cursor-pointer">
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* Bottom Spacer */}
                        <div className="h-5" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom-Right "Demo Content" Toggle in RewampUI Lilac Palette */}
            <div
                role="switch"
                aria-checked={showDemo}
                tabIndex={0}
                onClick={() => setShowDemo(!showDemo)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setShowDemo(!showDemo);
                    }
                }}
                className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/80 hover:text-white text-[11px] font-medium shadow-lg select-none cursor-pointer transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4DDF0]"
                title="Toggle hero UI demo overlay"
            >
                <span>Demo Content</span>
                <div className={`w-9 h-5 rounded-full transition-colors relative p-0.5 flex items-center ${showDemo ? 'bg-[#D4CBE5]' : 'bg-white/20'}`}>
                    <motion.div
                        className={`w-4 h-4 rounded-full shadow-sm transition-colors ${showDemo ? 'bg-[#171717]' : 'bg-white'}`}
                        animate={{ x: showDemo ? 16 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </div>
            </div>
        </>
    );
}
