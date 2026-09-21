import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutTemplate, Zap, Github, Twitter } from 'lucide-react';
import { highlightCode } from './CodeHighlight';
import { CopyButton } from './InstallSection';
import { getSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

/** Tracks the site-wide light/dark theme so this content's cards can match it. */
function useSiteTheme() {
  const [theme, setTheme] = useState(getSiteTheme());
  useEffect(() => {
    const onChange = (e) => setTheme(e.detail?.theme || getSiteTheme());
    window.addEventListener(SITE_THEME_EVENT, onChange);
    return () => window.removeEventListener(SITE_THEME_EVENT, onChange);
  }, []);
  return theme;
}

// "Dip" card: a tray sits behind everything; the code pane is inset with an
// even margin on top/left/right but no margin at the bottom, so the tray
// peeks out only below as a thick rounded footer reveal carrying the
// filename + a highlighted Copy action. Adapts to the site's light/dark mode.
function CodeCard({ label, footerRight, copyText, className = '', children }) {
  const theme = useSiteTheme();
  const isLight = theme !== 'dark';
  return (
    <div className={`rounded-[26px] p-2 pb-0 shadow-sm ${isLight ? 'bg-neutral-200' : 'bg-[#0D0B12]'} ${className}`}>
      <div className={`rounded-2xl p-4 overflow-x-auto no-scrollbar ${isLight ? 'bg-white' : 'bg-[#1A1720]'}`}>
        {children}
      </div>
      <div className="flex items-center justify-between flex-wrap gap-y-2 gap-x-3 px-3 py-3">
        <span className={`text-[11px] font-mono ${isLight ? 'text-neutral-500' : 'text-neutral-400'}`}>{label}</span>
        <div className="flex items-center gap-2 flex-wrap">
          {footerRight}
          {copyText && <CopyButton text={copyText} highlighted />}
        </div>
      </div>
    </div>
  );
}

const CLI_RUNNERS = [
  { id: 'npm', label: 'npm', runner: 'npx' },
  { id: 'pnpm', label: 'pnpm', runner: 'pnpm dlx' },
  { id: 'bun', label: 'bun', runner: 'bunx' },
  { id: 'yarn', label: 'yarn', runner: 'yarn dlx' },
];

/**
 * The actual documentation prose (Introduction, Installation, CLI Workflow,
 * Framer Motion, Tailwind CSS, Glassmorphism, Credits) with no outer nav,
 * sidebar, or footer - so it can be dropped into any shell (the standalone
 * DocumentationPage, or RewampShowcase's canvas stage when "documentation"
 * is the active slug).
 */
export default function DocumentationContent() {
  const [cliPm, setCliPm] = useState('npm');
  const activeCliRunner = CLI_RUNNERS.find((p) => p.id === cliPm).runner;

  return (
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
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Overview</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Introduction</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          Rewamp UI is not just a component library; it's a design system built for the modern web. Inspired by the absolute best in the industry (Aceternity, Linear, Vercel), Rewamp UI provides a set of highly interactive, physically-accurate, and beautifully styled components that you can drop directly into your React codebase.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm">
            <LayoutTemplate size={20} className="text-[var(--text-2)] mb-4" />
            <h3 className="text-sm font-semibold mb-2 text-[var(--text)]">Any Package Manager</h3>
            <p className="text-[13px] text-[var(--text-2)] leading-relaxed">Install components with a single command via npm, pnpm, yarn, or bun. The CLI drops the source straight into your project.</p>
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
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Getting Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Installation</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          To use Rewamp UI components, you need a React environment with Tailwind CSS and Framer Motion installed.
        </p>

        <CodeCard
          label="Terminal"
          className="mb-8"
          copyText="npm install framer-motion lucide-react clsx tailwind-merge"
        >
          <pre className="text-[13px] font-mono whitespace-pre">{highlightCode('npm install framer-motion lucide-react clsx tailwind-merge', 'light')}</pre>
        </CodeCard>

        <h3 className="text-base font-semibold mb-3 text-[var(--text)]">Utility Setup</h3>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-4">
          Many of our advanced components use a `cn` utility to merge Tailwind classes cleanly. Create a `utils.js` file in your `lib` folder:
        </p>

        <CodeCard
          label="lib/utils.js"
          copyText={`import { clsx } from "clsx";\nimport { twMerge } from "tailwind-merge";\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs));\n}`}
        >
          <pre className="text-[13px] font-mono leading-[1.7] whitespace-pre">{highlightCode(
`import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}`, 'light')}</pre>
        </CodeCard>
      </section>

      <hr className="border-[var(--border)] mb-16" />

      <section id="cli" className="mb-16">
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Getting Started</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">CLI Workflow</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          Skip the manual copy-paste. The <code className="px-1 py-0.5 rounded text-[13px] font-mono bg-[var(--elevated)]">rewampui</code> CLI
          drops a component's source file and its dependencies straight into your project with one command.
        </p>

        <CodeCard
          label="Terminal"
          className="mb-6"
          copyText={`${activeCliRunner} rewampui add theme-toggle\n${activeCliRunner} rewampui add arch-card-carousel theme-toggle\n${activeCliRunner} rewampui add --all`}
          footerRight={
            <div className="flex items-center gap-1">
              {CLI_RUNNERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setCliPm(p.id)}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    cliPm === p.id ? 'text-white' : 'text-neutral-500 hover:text-neutral-700'
                  }`}
                  style={cliPm === p.id ? { background: '#9B7FC7' } : undefined}
                >
                  {p.label}
                </button>
              ))}
            </div>
          }
        >
          <pre className="text-[13px] font-mono leading-[1.9] whitespace-pre">{highlightCode(
`${activeCliRunner} rewampui add theme-toggle
${activeCliRunner} rewampui add arch-card-carousel theme-toggle
${activeCliRunner} rewampui add --all`, 'light')}</pre>
        </CodeCard>

        <p className="text-[13px] text-[var(--text-2)] leading-relaxed">
          <code className="px-1 py-0.5 rounded text-[12px] font-mono bg-[var(--elevated)]">add &lt;component...&gt;</code> accepts one or
          more slugs from the registry; <code className="px-1 py-0.5 rounded text-[12px] font-mono bg-[var(--elevated)]">--all</code> installs
          every component at once. Requires Node 18+.
        </p>
      </section>

      <hr className="border-[var(--border)] mb-16" />

      <section id="framer-motion" className="mb-16">
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Framer Motion</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          Every interactive component in Rewamp UI is driven by Framer Motion springs rather than CSS transitions.
          Spring physics (stiffness, damping, mass) react naturally to interruption: dragging, re-hovering, or
          toggling mid-animation never snaps or resets, it just retargets from the current velocity.
        </p>
        <CodeCard
          label="example.jsx"
          copyText={`import { motion } from "framer-motion";\n\n<motion.div\n  layout\n  transition={{ type: "spring", stiffness: 350, damping: 32 }}\n/>`}
        >
          <pre className="text-[13px] font-mono leading-[1.7] whitespace-pre">{highlightCode(
`import { motion } from "framer-motion";

<motion.div
  layout
  transition={{ type: "spring", stiffness: 350, damping: 32 }}
/>`, 'light')}</pre>
        </CodeCard>
      </section>

      <hr className="border-[var(--border)] mb-16" />

      <section id="tailwind" className="mb-16">
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Tailwind CSS</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          Styling is utility-first with Tailwind CSS 4, with no separate stylesheet per component. Every reusable
          token (background, surface, border, text, accent) is exposed as a CSS variable in <code className="px-1 py-0.5 rounded text-[13px] font-mono bg-[var(--elevated)]">index.css</code>,
          so components read <code className="px-1 py-0.5 rounded text-[13px] font-mono bg-[var(--elevated)]">bg-[var(--surface)]</code> instead
          of a hardcoded color, which is what lets the entire library switch between light and dark mode instantly.
        </p>
        <p className="text-[13px] text-[var(--text-2)] leading-relaxed">
          Class strings are merged with the <code className="px-1 py-0.5 rounded text-[12px] font-mono bg-[var(--elevated)]">cn()</code> utility
          (see Installation above) so conditional and override classes never collide.
        </p>
      </section>

      <hr className="border-[var(--border)] mb-16" />

      <section id="glassmorphism" className="mb-16">
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">Architecture</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Glassmorphism</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          The frosted-glass look used across docks, panels, and floating navbars comes from layering a translucent
          background, a backdrop blur, and a soft inner highlight border. It's never a flat semi-transparent fill on
          its own, which reads muddy against busy backgrounds.
        </p>
        <CodeCard
          label="glass.css"
          copyText={`.glass {\n  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));\n  backdrop-filter: blur(24px);\n  border: 1px solid rgba(255,255,255,0.6);\n}`}
        >
          <pre className="text-[13px] font-mono leading-[1.7] whitespace-pre">{highlightCode(
`.glass {
  background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4));
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255,255,255,0.6);
}`, 'light')}</pre>
        </CodeCard>
      </section>

      <hr className="border-[var(--border)] mb-16" />

      <section id="credits" className="mb-16">
        <div className="mb-6">
          <p className="text-[13px] text-[var(--text-2)] mb-1">About</p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--text)]">Credits & Attribution</h2>
        </div>
        <p className="text-[15px] text-[var(--text-2)] leading-[1.8] mb-6">
          Every component in this library is a study, remix, or homage - none of it is claimed as original work.
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
  );
}
