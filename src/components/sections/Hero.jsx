import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroCardStage } from './HeroCardStage';
import { GradientText } from '../ui/GradientRevealTextShowcase';

function GithubIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.1 11.1 0 0 1 2.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.24 2.76.12 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12 0 1.54-.01 2.77-.01 3.15 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function Hero() {
  const navigate = useNavigate();

  return (
    <main className="bg-[var(--bg)] text-[var(--text-primary)] relative flex min-h-dvh flex-col overflow-hidden lg:h-dvh transition-colors">
      {/* ─── Left: wordmark → headline → subtext → CTAs ─── */}
      <section className="relative z-10 flex flex-col justify-center px-6 pt-20 pb-10 sm:px-12 lg:h-full lg:w-[44%] lg:min-w-105 lg:items-center lg:px-12 lg:pt-0 lg:pb-0">
        {/* Shared coordinate frame: logo and copy share this box's left edge  - 
            logo pins to its top, copy centers vertically within it. */}
        <div className="relative w-full max-w-md lg:h-full">
          <motion.img
            src="/logo-text.png"
            alt="RewampUI"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-16 sm:h-20 w-auto object-contain -ml-2 lg:absolute lg:left-0 lg:top-10 mb-6 lg:mb-0"
          />

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-full flex-col gap-8 lg:h-full lg:justify-center"
          >
            {/* Headline */}
            <h1 className="text-[44px] sm:text-[52px] font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] font-sans normal-case">
              Components that <br />
              <GradientText>feel alive.</GradientText>
            </h1>

            {/* Pill CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/components')}
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--brand-strong)] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-white transition-transform active:scale-95 cursor-pointer"
              >
                Browse Components
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[var(--brand-strong)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={15} />
                </span>
              </button>

              <a
                href="https://github.com/palakonweb/rewampui"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full bg-[var(--text-primary)] py-1.5 pl-6 pr-1.5 text-sm font-semibold text-[var(--bg)] transition-transform active:scale-95 cursor-pointer"
              >
                Star on GitHub
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-strong)] text-white transition-transform group-hover:translate-x-0.5">
                  <GithubIcon />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Right: full-bleed animated component-card stage ─── */}
      <div className="relative h-[56dvh] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[60%]">
        <HeroCardStage className="absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[var(--bg)] to-transparent lg:hidden"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/5 bg-gradient-to-r from-[var(--bg)] to-transparent lg:block"
        />
      </div>
    </main>
  );
}

export default Hero;
