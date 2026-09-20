import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundHeroOverlay({
    title = "Liquid cursor gradients to enhance your UI",
    subtitle = "Creative Components",
    badge = "NEW",
    brandName = "RewampUI",
    defaultShow = true,
    isLight = false,
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
                            <div className={`flex items-center justify-between gap-5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full backdrop-blur-md shadow-xl max-w-lg w-full ${
                                isLight 
                                    ? 'bg-white/80 border border-black/10 text-neutral-900' 
                                    : 'bg-black/40 border border-white/10 text-white'
                            }`}>
                                {/* Brand Logo + Name with official /logo.svg */}
                                <div className="flex items-center gap-2">
                                    <img src="/logos/logo.svg" alt="RewampUI" className="w-5 h-5 object-contain shrink-0" />
                                    <span className={`font-bold text-[13px] tracking-tight ${isLight ? 'text-neutral-900' : 'text-white'}`}>{brandName}</span>
                                </div>

                                {/* Nav Links */}
                                <div className={`hidden sm:flex items-center gap-5 text-[12px] font-medium ${
                                    isLight ? 'text-neutral-600' : 'text-white/70'
                                }`}>
                                    <span className={`transition-colors cursor-pointer ${isLight ? 'hover:text-neutral-900' : 'hover:text-white'}`}>Features</span>
                                    <span className={`transition-colors cursor-pointer ${isLight ? 'hover:text-neutral-900' : 'hover:text-white'}`}>About</span>
                                </div>

                                {/* Sign up Action Button */}
                                <button className={`px-3.5 py-1 rounded-full font-semibold text-[11px] sm:text-[12px] transition shadow-sm cursor-pointer ${
                                    isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-white/90'
                                }`}>
                                    Sign up
                                </button>
                            </div>
                        </div>

                        {/* Center Hero Content */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
                            {/* Pill Badge */}
                            <div className={`inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full backdrop-blur-md mb-4 shadow-sm ${
                                isLight ? 'bg-black/5 border border-black/10' : 'bg-white/10 border border-white/10'
                            }`}>
                                <span className={`px-1.5 py-0.5 rounded-full font-bold text-[8.5px] tracking-wider uppercase ${
                                    isLight ? 'bg-neutral-900 text-white' : 'bg-white text-black'
                                }`}>
                                    {badge}
                                </span>
                                <span className={`text-[11px] font-medium tracking-wide ${
                                    isLight ? 'text-neutral-800 font-semibold' : 'text-white/80'
                                }`}>
                                    {subtitle}
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className={`font-sans normal-case text-xl sm:text-2xl md:text-[30px] font-bold tracking-tight leading-[1.2] max-w-md ${
                                isLight 
                                    ? 'text-neutral-950 drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]' 
                                    : 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]'
                            }`}>
                                {renderTitle()}
                            </h1>

                            {/* CTAs */}
                            <div className="flex items-center justify-center gap-2.5 mt-5 pointer-events-auto">
                                <button className={`px-5 py-2 rounded-xl font-semibold text-[12px] sm:text-[13px] transition shadow-lg cursor-pointer ${
                                    isLight ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-white text-black hover:bg-white/90'
                                }`}>
                                    Get started
                                </button>
                                <button className={`px-5 py-2 rounded-xl font-medium text-[12px] sm:text-[13px] backdrop-blur-sm transition shadow-sm cursor-pointer ${
                                    isLight 
                                        ? 'bg-white/80 hover:bg-white text-neutral-900 border border-black/10' 
                                        : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                                }`}>
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
