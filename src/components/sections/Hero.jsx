import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { VerticalMarqueeShowcase } from './VerticalMarqueeShowcase';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[100svh] flex flex-col justify-center bg-[#FAFAFA] dark:bg-[#0D0C10] text-[#171717] dark:text-white overflow-hidden transition-colors pt-24 pb-14 lg:py-0">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 right-1/4 w-[480px] h-[480px] bg-radial from-[#D4CBE5]/25 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-10 w-[360px] h-[360px] bg-radial from-[#C1B4D8]/20 via-transparent to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      {/* ── Main Two-Column Hero Container ── */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto px-6 sm:px-10 lg:px-14 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 my-auto">
        
        {/* ─── LEFT COLUMN (Brand, Copy, CTAs, Social Proof) ─── */}
        <div className="w-full lg:max-w-[44%] flex flex-col justify-center relative z-20">
          
          {/* Official Rewamp Handwritten Logo + SF Pro Semibold Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5 mb-8"
          >
            <img
              src="/logo.svg"
              alt="RewampUI Logo"
              className="h-12 sm:h-14 lg:h-15 w-auto object-contain shrink-0 drop-shadow-xs"
            />
            <span className="text-3xl sm:text-4xl lg:text-[42px] font-semibold tracking-tight text-[#171717] dark:text-white font-sans">
              RewampUI
            </span>
          </motion.div>

          {/* Main Headline (Inspired by Reference Video) */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#171717] dark:text-white leading-[1.08] mb-6 font-sans"
          >
            Tactile Motion <br />
            <span className="bg-gradient-to-r from-[#171717] via-[#6B5B87] to-[#9C8EB8] dark:from-white dark:via-[#D4CBE5] dark:to-[#C1B4D8] bg-clip-text text-transparent">
              For Modern UIs
            </span>
          </motion.h1>

          {/* Subtitle / Value Proposition */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-base sm:text-lg text-[#525252] dark:text-[#A8A8A8] leading-relaxed max-w-lg mb-9 font-normal"
          >
            Animated, interactive UI components for React. Built on Framer Motion, Three.js shaders, and Tailwind CSS — copy, paste, and ship exceptional interfaces.
          </motion.p>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5 flex-wrap mb-10"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => navigate('/components')}
              className="px-7 py-3.5 rounded-full bg-[#171717] hover:bg-black dark:bg-white dark:hover:bg-[#F5F5F5] text-white dark:text-[#171717] font-semibold text-sm flex items-center gap-2.5 shadow-[0_8px_20px_rgba(23,23,23,0.16)] transition-all cursor-pointer group active:scale-95"
            >
              <span>Browse Components</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>

            {/* GitHub Star Button */}
            <a
              href="https://github.com/palakonweb/rewampui"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-full bg-white dark:bg-[#1A1824] hover:bg-[#F5F5F5] dark:hover:bg-[#262234] border border-[#E5E5E5] dark:border-white/10 text-[#171717] dark:text-white font-medium text-sm flex items-center gap-2 shadow-xs transition-colors cursor-pointer active:scale-95"
            >
              <Star size={15} className="text-[#9C8EB8] fill-[#9C8EB8]" />
              <span>Star on GitHub</span>
              <span className="ml-1 text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-[#FAFAFA] dark:bg-white/10 border border-[#E5E5E5] dark:border-white/10">
                2.1k
              </span>
            </a>
          </motion.div>

          {/* ── Social Proof Cluster (as in Reference Video) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5] dark:border-white/10"
          >
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-2.5">
              <div className="w-9 h-9 rounded-full bg-[#D4CBE5] border-2 border-white dark:border-[#0D0C10] flex items-center justify-center text-[11px] font-bold text-[#4A3E60] overflow-hidden shadow-xs">
                <span>JD</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#C1B4D8] border-2 border-white dark:border-[#0D0C10] flex items-center justify-center text-[11px] font-bold text-[#3B2E50] overflow-hidden shadow-xs">
                <span>MK</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-[#9C8EB8] border-2 border-white dark:border-[#0D0C10] flex items-center justify-center text-[11px] font-bold text-white overflow-hidden shadow-xs">
                <span>AL</span>
              </div>
            </div>

            {/* Stars & Trust Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#FBBF24]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#FBBF24]" />
                ))}
              </div>
              <div className="text-xs text-[#525252] dark:text-[#A8A8A8] mt-0.5">
                <strong className="text-[#171717] dark:text-white font-semibold">Trusted by 99+</strong> developers
              </div>
            </div>
          </motion.div>

        </div>

        {/* ─── RIGHT COLUMN (Dual-Column Vertical Scrolling Component Marquee) ─── */}
        <div className="w-full lg:max-w-[56%] relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative"
          >
            <VerticalMarqueeShowcase />
          </motion.div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
