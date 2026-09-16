import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BackgroundHeroOverlay({
    title = "Retro dithered waves to enhance your UI",
    subtitle = "Creative Components",
    badge = "NEW",
    brandName = "Purrform",
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
                            <div className="flex items-center justify-between gap-6 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-2xl max-w-xl w-full">
                                {/* Brand Logo + Name */}
                                <div className="flex items-center gap-2.5">
                                    <svg className="w-5 h-5 text-[#EC5E27] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        {/* Purrform flat cat face mark */}
                                        <path d="M12 4.5C7.8 4.5 4.5 7.8 4.5 12c0 4.2 3.3 7.5 7.5 7.5s7.5-3.3 7.5-7.5c0-4.2-3.3-7.5-7.5-7.5zm-5 1l3 3.8c-.8.7-1.5 1.7-1.8 2.8L5.5 8.5 7 5.5zm10 0l1.5 3-2.7 3.6c-.3-1.1-1-2.1-1.8-2.8l3-3.8z" />
                                    </svg>
                                    <span className="font-bold text-[14px] sm:text-[15px] tracking-tight text-white">{brandName}</span>
                                </div>

                                {/* Nav Links */}
                                <div className="hidden sm:flex items-center gap-6 text-[13px] text-white/70 font-medium">
                                    <span className="hover:text-white transition-colors cursor-pointer">Features</span>
                                    <span className="hover:text-white transition-colors cursor-pointer">About</span>
                                </div>

                                {/* Sign up Action Button */}
                                <button className="px-4 py-1.5 rounded-full bg-white text-black font-semibold text-[12px] sm:text-[13px] hover:bg-white/90 transition shadow-sm cursor-pointer">
                                    Sign up
                                </button>
                            </div>
                        </div>

                        {/* Center Hero Content */}
                        <div className="flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
                            {/* Pill Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 mb-5 shadow-sm">
                                <span className="px-2 py-0.5 rounded-full bg-white text-black font-bold text-[9px] tracking-wider uppercase">
                                    {badge}
                                </span>
                                <span className="text-[12px] text-white/80 font-medium tracking-wide">
                                    {subtitle}
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.15] max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)]">
                                {renderTitle()}
                            </h1>

                            {/* CTAs */}
                            <div className="flex items-center justify-center gap-3 mt-7 pointer-events-auto">
                                <button className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-[13px] sm:text-[14px] hover:bg-white/90 transition shadow-lg cursor-pointer">
                                    Get started
                                </button>
                                <button className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-[13px] sm:text-[14px] backdrop-blur-sm border border-white/10 transition shadow-sm cursor-pointer">
                                    Learn more
                                </button>
                            </div>
                        </div>

                        {/* Bottom Spacer */}
                        <div className="h-6" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom-Right "Demo Content" Toggle */}
            <div
                onClick={() => setShowDemo(!showDemo)}
                className="absolute bottom-4 right-4 z-30 flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 text-white/75 hover:text-white text-[11px] font-medium shadow-lg select-none cursor-pointer transition"
                title="Toggle hero UI demo overlay"
            >
                <span>Demo Content</span>
                <div className={`w-8 h-4 rounded-full transition-colors relative p-0.5 ${showDemo ? 'bg-[#EC5E27]' : 'bg-white/20'}`}>
                    <motion.div
                        className="w-3 h-3 rounded-full bg-white shadow-sm"
                        animate={{ x: showDemo ? 16 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </div>
            </div>
        </>
    );
}
