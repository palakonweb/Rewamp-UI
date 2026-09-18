import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Terminal, LayoutTemplate, Zap, Package, Compass, Heart, Github, Twitter } from 'lucide-react';
import { SiteFooter } from '../components/sections/SiteFooter';

export function DocumentationPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg)] flex flex-col font-sans">

      {/* Navbar (Static Top for Docs) */}
      <nav className="sticky top-0 z-50 bg-[var(--surface)]/80 backdrop-blur-xl border-b border-[var(--border)] h-16 flex items-center justify-between px-6 md:px-12 w-full">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-8 h-8 rounded-full hover:bg-[var(--elevated)] flex items-center justify-center transition-colors"
          >
            <ChevronLeft size={18} className="text-[var(--text-2)]" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
            <span className="font-display tracking-[0.12em] text-[var(--text)] text-[11px] uppercase">Rewamp UI</span>
          </div>
          <span className="text-[12px] text-[var(--text-2)] font-mono hidden sm:block">/ docs</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/components')}
            className="liquid-metal px-4 py-1.5 text-[10px] font-display tracking-[0.08em] text-[var(--text)] transition-all hover:shadow-[0_0_20px_var(--glow)] rounded"
          >
            BROWSE UI
          </button>
        </div>
      </nav>

      <div className="flex-1 flex w-full max-w-[1400px] mx-auto">

        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[280px] shrink-0 border-r border-[var(--border)] sticky top-16" style={{ height: 'calc(100vh - 64px)' }}>
          <div className="p-8 overflow-y-auto">
            <h4 className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-2)] uppercase mb-4">Getting Started</h4>
            <div className="flex flex-col gap-1 mb-8">
              <a href="#introduction" className="px-3 py-2 text-[13px] text-[var(--text)] bg-[var(--elevated)] font-medium rounded-lg">Introduction</a>
              <a href="#installation" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">Installation</a>
              <a href="#cli" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">CLI Workflow</a>
            </div>

            <h4 className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-2)] uppercase mb-4">Architecture</h4>
            <div className="flex flex-col gap-1 mb-8">
              <a href="#framer-motion" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">Framer Motion</a>
              <a href="#tailwind" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">Tailwind CSS</a>
              <a href="#glassmorphism" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">Glassmorphism</a>
            </div>

            <h4 className="text-[10px] font-bold tracking-[0.15em] text-[var(--text-2)] uppercase mb-4">About</h4>
            <div className="flex flex-col gap-1">
              <a href="#credits" className="px-3 py-2 text-[13px] text-[var(--text-2)] hover:text-[var(--text)] hover:bg-[var(--elevated)] rounded-lg transition-colors">Credits & Attribution</a>
            </div>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 max-w-[800px] p-4 sm:p-8 md:p-12 lg:p-16">
          {/* Mobile section quick jump */}
          <div className="lg:hidden flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4 border-b border-[var(--border)]">
            <a href="#introduction" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Intro</a>
            <a href="#installation" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Install</a>
            <a href="#cli" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">CLI</a>
            <a href="#framer-motion" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Motion</a>
            <a href="#tailwind" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Tailwind</a>
            <a href="#glassmorphism" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Glass</a>
            <a href="#credits" className="shrink-0 px-3 py-1.5 text-xs bg-[var(--elevated)] hover:bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--text)] font-medium">Credits</a>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-[1.1] tracking-tight text-[var(--text)] mb-6">
              Documentation
            </h1>
            <p className="text-lg text-[var(--text-2)] font-serif italic mb-12 leading-relaxed">
              Everything you need to build stunning, agency-grade React applications using Rewamp UI.
            </p>

            <section id="introduction" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-[var(--accent)]/10 flex items-center justify-center">
                  <Compass size={18} className="text-[var(--accent)]" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Introduction</h2>
              </div>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
                Rewamp UI is not just a component library; it's a design system built for the modern web. Inspired by the absolute best in the industry (Aceternity, Linear, Vercel), Rewamp UI provides a set of highly interactive, physically-accurate, and beautifully styled components that you can drop directly into your React codebase.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                  <LayoutTemplate size={20} className="text-[var(--text-2)] mb-4" />
                  <h3 className="text-sm font-semibold mb-2 text-[var(--text)]">Copy & Paste</h3>
                  <p className="text-[13px] text-[var(--text-2)] leading-relaxed">We don't wrap our components in an NPM package. You own the code. Copy, paste, and modify.</p>
                </div>
                <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
                  <Zap size={20} className="text-[var(--text-2)] mb-4" />
                  <h3 className="text-sm font-semibold mb-2 text-[var(--text)]">Framer Motion Physics</h3>
                  <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Every interaction is built using mathematically accurate spring physics for a premium feel.</p>
                </div>
              </div>
            </section>

            <hr className="border-[var(--border)] mb-16" />

            <section id="installation" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center">
                  <Package size={18} className="text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Installation</h2>
              </div>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
                To use Rewamp UI components, you need a React environment with Tailwind CSS and Framer Motion installed.
              </p>

              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800 mb-8">
                <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-gray-800">
                  <Terminal size={14} className="text-gray-500 mr-2" />
                  <span className="text-[11px] font-mono text-gray-400">Terminal</span>
                </div>
                <div className="p-4 text-[13px] font-mono text-gray-300">
                  <span className="text-pink-400">npm</span> install framer-motion lucide-react clsx tailwind-merge
                </div>
              </div>

              <h3 className="text-base font-semibold mb-3 text-[var(--text)]">Utility Setup</h3>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-4">
                Many of our advanced components use a `cn` utility to merge Tailwind classes cleanly. Create a `utils.js` file in your `lib` folder:
              </p>

              <div className="bg-[#1e1e1e] rounded-xl overflow-hidden shadow-lg border border-gray-800">
                <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-gray-800">
                  <span className="text-[11px] font-mono text-gray-400">lib/utils.js</span>
                </div>
                <div className="p-4 text-[13px] font-mono text-gray-300 whitespace-pre">
<span className="text-purple-400">import</span> {'{ clsx }'} <span className="text-purple-400">from</span> <span className="text-green-400">"clsx"</span>;{'\n'}
<span className="text-purple-400">import</span> {'{ twMerge }'} <span className="text-purple-400">from</span> <span className="text-green-400">"tailwind-merge"</span>;{'\n\n'}
<span className="text-purple-400">export function</span> <span className="text-blue-400">cn</span>(...inputs) {'{'}{'\n'}
{'  '}<span className="text-purple-400">return</span> <span className="text-blue-400">twMerge</span>(<span className="text-blue-400">clsx</span>(inputs));{'\n'}
{'}'}
                </div>
              </div>
            </section>

            <hr className="border-[var(--border)] mb-16" />

            <section id="credits" className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded bg-pink-500/10 flex items-center justify-center">
                  <Heart size={18} className="text-pink-500" />
                </div>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)]">Credits & Attribution</h2>
              </div>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
                Every component in this library is a study, remix, or homage — none of it is claimed as original work.
                Rewamp UI exists because of the incredible open-source design work already out there from the goats of the
                internet. This project simply collects, adapts, and re-implements those ideas in one place for convenience.
              </p>
              <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
                Made with love by <span className="font-semibold text-[var(--text)]">Palak</span>, aka{' '}
                <span className="font-semibold text-[var(--text)]">palakonweb</span>.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/palakonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] hover:bg-[var(--elevated)] transition-colors"
                >
                  <Github size={15} />
                  github.com/palakonweb
                </a>
                <a
                  href="https://x.com/palakonweb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border)] bg-[var(--surface)] text-[13px] font-medium text-[var(--text)] hover:bg-[var(--elevated)] transition-colors"
                >
                  <Twitter size={15} />
                  x.com/palakonweb
                </a>
              </div>
            </section>

          </motion.div>
        </main>
      </div>

      {/* Use the common Site Footer */}
      <SiteFooter />
    </div>
  );
}
