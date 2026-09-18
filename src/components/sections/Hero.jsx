import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { HeroCardStage } from './HeroCardStage';

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
      {/* ─── Left: wordmark + copy + CTAs ─── */}
      <section className="relative z-10 flex flex-col justify-center px-6 pt-20 pb-10 sm:px-12 lg:h-full lg:w-[44%] lg:min-w-105 lg:items-center lg:px-12 lg:pt-0 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full max-w-md flex-col gap-7"
        >
          <h1 className="flex items-center gap-3">
            <img src="/logo.svg" alt="" className="h-9 w-auto object-contain" />
            <span className="text-[26px] font-semibold tracking-tight text-[var(--text-primary)] font-sans normal-case">
              RewampUI
            </span>
          </h1>

          <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed">
            Animated, interactive UI components for React. Built on Framer Motion, Three.js
            shaders, and Tailwind CSS, styled for shadcn/ui — copy, paste, and ship exceptional
            interfaces.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate('/components')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--text-primary)] text-[var(--bg)] text-sm font-semibold transition-transform active:scale-95 cursor-pointer group"
            >
              Browse Components
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href="https://github.com/palakonweb/rewampui"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[var(--border)] text-[var(--text-primary)] text-sm font-medium transition-colors hover:bg-[var(--elevated)] cursor-pointer"
            >
              <GithubIcon />
              Star on GitHub
              <span className="text-[var(--text-subtle)] border-l border-[var(--border)] pl-1.5 font-mono text-xs tabular-nums">
                2.1k
              </span>
            </a>
          </div>
        </motion.div>
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
