import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const CHERRY = "#D2042D";
const CHERRY_LIGHT = "#ff1e46";
const CHERRY_BG = "rgba(210, 4, 45, 0.06)";

/* ── Code syntax helpers ─────────────────────────────────────────── */
const L = ({ n, children }) => (
  <div className="flex leading-[1.7]">
    <span className="w-8 text-right select-none text-white/15 text-[11px] shrink-0 pr-3">{n}</span>
    <span className="flex-1 whitespace-pre">{children}</span>
  </div>
);
const Kw = ({ c }) => <span className="text-[#c678dd]">{c}</span>;
const Fn = ({ c }) => <span className="text-[#61afef]">{c}</span>;
const St = ({ c }) => <span className="text-[#98c379]">{c}</span>;
const Tg = ({ c }) => <span className="text-[#e06c75]">{c}</span>;
const Tx = ({ c }) => <span className="text-[#abb2bf]">{c}</span>;
const Cm = ({ c }) => <span className="text-white/20 italic">{c}</span>;

/* ── Editor Chrome ───────────────────────────────────────────────── */
const EditorShell = React.memo(({ title, children }) => (
  <div className="w-full bg-[#1e1e1e] rounded-2xl border border-white/[0.06] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.45)] overflow-hidden will-change-transform">
    <div className="h-10 flex items-center px-4 bg-[#252526] border-b border-white/[0.06]">
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <span className="flex-1 text-center text-[11px] text-gray-500 font-mono tracking-wide">{title}</span>
      <div className="w-12" />
    </div>
    {children}
  </div>
));

const Sidebar = React.memo(({ activeIdx = 0 }) => (
  <div className="hidden md:flex w-12 bg-[#252526] border-r border-white/[0.06] flex-col items-center py-4 gap-5 shrink-0">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeIdx === 0 ? CHERRY : '#555'} strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={activeIdx === 1 ? CHERRY : '#555'} strokeWidth="1.5"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><polyline points="13 2 13 9 20 9" /></svg>
  </div>
));

const fullPrompt = "Build me a clean SaaS landing page hero with a headline, subtitle, CTA, and a floating dashboard.";

export function LiveProductDemo() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* ── Scroll-driven text (prompt characters revealed by scroll) ── */
  const charCount = useTransform(scrollYProgress, [0.02, 0.22], [0, fullPrompt.length]);

  /* ── Frame visibility ──────────────────────────────────────────
     Frame 1 (Prompt):     0.00 → 0.35
     Frame 2 (Generating): 0.30 → 0.60
     Frame 3 (Result):     0.55 → 1.00
  ────────────────────────────────────────────────────────────── */
  const f1O = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.38], [0, 1, 1, 0]);
  const f1Y = useTransform(scrollYProgress, [0, 0.05, 0.30, 0.38], [40, 0, 0, -40]);

  const f2O = useTransform(scrollYProgress, [0.30, 0.38, 0.55, 0.60], [0, 1, 1, 0]);
  const f2Y = useTransform(scrollYProgress, [0.30, 0.38, 0.55, 0.60], [50, 0, 0, -40]);
  const progressBar = useTransform(scrollYProgress, [0.35, 0.55], [0, 100]);

  const f3O = useTransform(scrollYProgress, [0.55, 0.65, 1], [0, 1, 1]);
  const f3Y = useTransform(scrollYProgress, [0.55, 0.65], [80, 0]);
  const f3S = useTransform(scrollYProgress, [0.55, 0.68], [0.92, 1]);

  // Floating panels (staggered after result appears)
  const pLY = useTransform(scrollYProgress, [0.65, 0.78], [100, 0]);
  const pLO = useTransform(scrollYProgress, [0.65, 0.76], [0, 1]);
  const pRY = useTransform(scrollYProgress, [0.70, 0.83], [120, 0]);
  const pRO = useTransform(scrollYProgress, [0.70, 0.81], [0, 1]);
  const pBY = useTransform(scrollYProgress, [0.75, 0.88], [80, 0]);
  const pBO = useTransform(scrollYProgress, [0.75, 0.86], [0, 1]);
  const curO = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]);

  return (
    <section
      id="live-demo"
      ref={containerRef}
      className="relative w-full border-t border-[var(--border)]"
      style={{ height: "450vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 w-full h-screen flex flex-col items-center bg-[var(--bg)] pt-6 pb-0">

        {/* Title */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.04], [0, 1]), y: useTransform(scrollYProgress, [0, 0.04], [20, 0]) }}
          className="text-center mb-4 px-6 z-20 shrink-0"
        >
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.8rem)] text-[var(--text)] tracking-tight leading-[1.1]">
            From prompt to <span className="italic font-serif" style={{ color: CHERRY }}>production.</span>
          </h2>
          <p className="font-sans text-gray-400 mt-3 text-base max-w-lg mx-auto">
            Paste a description. Watch a full component materialise — live.
          </p>
        </motion.div>

        {/* Frames container */}
        <div className="relative w-full max-w-[1200px] mx-auto px-4 md:px-8 flex-1 min-h-0" style={{ perspective: 1200 }}>

          {/* ═══ FRAME 1 — Prompt Being Typed (scroll-driven) ═══ */}
          <motion.div style={{ opacity: f1O, y: f1Y }} className="absolute inset-x-4 md:inset-x-8 top-0 will-change-transform">
            <EditorShell title="conjure-agent — Chat">
              <div className="flex min-h-[420px] md:min-h-[480px]">
                <Sidebar activeIdx={0} />
                <div className="flex-1 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-8">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold" style={{ background: `linear-gradient(135deg, ${CHERRY}, ${CHERRY_LIGHT})` }}>C</div>
                    <span className="text-[12px] text-gray-400 font-mono font-semibold">Conjure Agent</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-400 font-mono ml-1">ready</span>
                  </div>
                  {/* Prompt revealed by scroll */}
                  <div className="flex justify-end mb-6">
                    <div className="max-w-[85%] bg-white/[0.07] rounded-2xl rounded-tr-sm px-5 py-3.5 text-[13px] text-gray-200 font-mono leading-relaxed border border-white/[0.05] min-h-[56px]">
                      <PromptText charCount={charCount} fullPrompt={fullPrompt} />
                      <span className="inline-block w-1.5 h-4 ml-0.5 animate-pulse rounded-sm align-middle" style={{ backgroundColor: CHERRY }} />
                    </div>
                  </div>
                  {/* Generate button lights up when prompt is complete */}
                  <div className="flex justify-end">
                    <GenerateButton charCount={charCount} fullLength={fullPrompt.length} />
                  </div>
                </div>
              </div>
            </EditorShell>
          </motion.div>

          {/* ═══ FRAME 2 — Generating (scroll-driven progress) ═══ */}
          <motion.div style={{ opacity: f2O, y: f2Y }} className="absolute inset-x-4 md:inset-x-8 top-0 will-change-transform">
            <EditorShell title="conjure-agent — Generating…">
              <div className="flex min-h-[420px] md:min-h-[480px]">
                <Sidebar activeIdx={1} />
                <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-10">
                  <div className="w-full max-w-[520px] font-mono text-[12px] md:text-[13px] select-none mb-8">
                    <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/[0.06]">
                      <span className="text-[12px] text-gray-400 font-mono font-semibold">HeroSection.jsx</span>
                      <span className="ml-auto text-[10px] px-2.5 py-0.5 rounded-full font-mono font-semibold text-white" style={{ backgroundColor: CHERRY }}>writing…</span>
                    </div>
                    <L n={1}><Kw c="import" /> <Tx c="React" /> <Kw c="from" /> <St c="'react'" /></L>
                    <L n={2}><Kw c="import" /> <Tx c="{ motion }" /> <Kw c="from" /> <St c="'framer-motion'" /></L>
                    <L n={3}>{" "}</L>
                    <L n={4}><Kw c="export function" /> <Fn c="HeroSection" /><Tx c="() {" /></L>
                    <L n={5}>{"  "}<Kw c="return" /> <Tx c="(" /></L>
                    <L n={6}>{"    "}<Tg c={'<section className="hero">'} /></L>
                    <L n={7}>{"      "}<Tg c="<h1>" /><St c="Build faster." /><Tg c="</h1>" /></L>
                    <L n={8}>{"      "}<Tg c="<p>" /><St c="Ship premium UI…" /><Tg c="</p>" /></L>
                    <L n={9}>{"      "}<Tg c="<" /><Fn c="GradientButton" /> <Tg c="/>" /></L>
                    <L n={10}>{"      "}<Tg c="<" /><Fn c="DashboardCard" /> <Tg c="/>" /></L>
                    <L n={11}>{"    "}<Tg c="</section>" /></L>
                    <L n={12}>{"  "}<Tx c=")" /></L>
                    <L n={13}><Tx c="}" /></L>
                    <L n={14}>{" "}</L>
                    <L n={15}><Cm c="// ✨ Generated by Conjure AI" /></L>
                  </div>
                  {/* Scroll-driven progress bar */}
                  <div className="w-full max-w-[520px]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] text-gray-500 font-mono">Building component…</span>
                      <ProgressLabel progress={progressBar} />
                    </div>
                    <div className="w-full h-2 bg-white/[0.06] rounded-full overflow-hidden">
                      <ProgressFill progress={progressBar} />
                    </div>
                  </div>
                </div>
              </div>
            </EditorShell>
          </motion.div>

          {/* ═══ FRAME 3 — Result with Floating Panels ═══ */}
          <motion.div style={{ opacity: f3O, y: f3Y, scale: f3S }} className="absolute inset-x-4 md:inset-x-8 top-0 will-change-transform">
            {/* Browser frame */}
            <div className="relative rounded-2xl border border-gray-200 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.18)] will-change-transform" style={{ maxHeight: 'calc(100vh - 130px)' }}>
              <div className="h-10 bg-white border-b border-gray-100 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-200" />
                </div>
                <div className="flex-1 mx-10 h-6 rounded-md bg-gray-50 border border-gray-100 flex items-center justify-center text-[10px] text-gray-400 font-mono">https://your-saas.com</div>
              </div>
              <img src="/landing page.png" alt="Generated landing page" className="w-full h-auto block" loading="eager" />
              {/* Figma selection border */}
              <div className="absolute inset-0 border-2 pointer-events-none z-10" style={{ borderColor: CHERRY }}>
                <div className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border-2" style={{ borderColor: CHERRY }} />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-2" style={{ borderColor: CHERRY }} />
                <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border-2" style={{ borderColor: CHERRY }} />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border-2" style={{ borderColor: CHERRY }} />
                <div className="absolute -top-7 left-0 text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-t-md" style={{ backgroundColor: CHERRY }}>LandingPageHero</div>
              </div>
              {/* Bottom white fade overlay for smooth blend */}
              <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20" style={{ background: 'linear-gradient(to top, var(--bg) 0%, rgba(255,255,255,0.85) 40%, rgba(255,255,255,0.4) 70%, transparent 100%)' }} />
            </div>

            {/* Floating: Component Tree (LEFT) */}
            <motion.div style={{ y: pLY, opacity: pLO }} className="hidden lg:block absolute -left-10 top-[18%] w-52 z-30 will-change-transform">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] p-4">
                <div className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">Component Tree</div>
                <div className="space-y-1 text-[11px] font-mono text-gray-500">
                  {[{ name: 'HeroSection', d: 0, a: false }, { name: 'Heading', d: 1, a: true }, { name: 'Subtitle', d: 1, a: false }, { name: 'CTAButton', d: 1, a: false }, { name: 'DashboardCard', d: 1, a: false }].map((item, i) => (
                    <div key={i} className="flex items-center gap-1.5 py-1 px-2 rounded-md" style={{ marginLeft: item.d * 12, backgroundColor: item.a ? CHERRY_BG : undefined, color: item.a ? CHERRY : undefined }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={item.a ? CHERRY : '#9ca3af'} strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
                      &lt;{item.name}&gt;
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Floating: Styles (RIGHT) */}
            <motion.div style={{ y: pRY, opacity: pRO }} className="hidden lg:block absolute -right-8 top-[14%] w-48 z-30 will-change-transform">
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-gray-200 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.2)] p-4">
                <div className="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">Styles</div>
                <div className="space-y-3">
                  <div><div className="text-[9px] text-gray-400 font-semibold uppercase mb-1.5">Font</div><div className="h-7 rounded-md bg-gray-50 border border-gray-100 flex items-center px-2.5 text-[10px] text-gray-600 font-mono">Playfair Display</div></div>
                  <div><div className="text-[9px] text-gray-400 font-semibold uppercase mb-1.5">Brand</div><div className="flex gap-1.5"><div className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-gray-200" style={{ backgroundColor: CHERRY }} /><div className="w-6 h-6 rounded-full bg-gray-900 border-2 border-white shadow-sm ring-1 ring-gray-200" /><div className="w-6 h-6 rounded-full bg-white border-2 border-white shadow-sm ring-1 ring-gray-200" /></div></div>
                </div>
              </div>
            </motion.div>

            {/* Floating: Build Log (BOTTOM LEFT) */}
            <motion.div style={{ y: pBY, opacity: pBO }} className="hidden lg:block absolute -left-6 bottom-[8%] w-52 z-30 will-change-transform">
              <div className="bg-[#1e1e1e] rounded-xl border border-white/[0.08] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.4)] p-3 font-mono text-[10px]">
                <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-white/[0.06]"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: CHERRY }} /><span className="text-gray-500 text-[9px]">build.log</span></div>
                <div className="text-green-400/80">✓ HeroSection compiled</div>
                <div className="text-green-400/80">✓ 5 components rendered</div>
                <div className="text-green-400/80">✓ 0 errors, 0 warnings</div>
                <div className="text-white/30 mt-1">Build time: 1.2s</div>
              </div>
            </motion.div>

            {/* AI Cursor */}
            <motion.div style={{ opacity: curO }} className="hidden lg:block absolute top-[22%] right-[12%] z-40 pointer-events-none will-change-transform">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill={CHERRY} className="drop-shadow-lg"><path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.42c.45 0 .67-.54.35-.85L5.5 3.21z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                <div className="absolute top-5 left-3.5 text-white text-[9px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap shadow-md" style={{ backgroundColor: CHERRY }}>Conjure AI</div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

/* ── Scroll-driven sub-components (avoid re-renders on parent) ─── */

function PromptText({ charCount, fullPrompt }) {
  const text = useTransform(charCount, (v) => fullPrompt.slice(0, Math.round(v)));
  const [displayed, setDisplayed] = React.useState("");
  React.useEffect(() => text.on("change", setDisplayed), [text]);
  return <>{displayed}</>;
}

function GenerateButton({ charCount, fullLength }) {
  const [active, setActive] = React.useState(false);
  React.useEffect(() => charCount.on("change", (v) => setActive(Math.round(v) >= fullLength)), [charCount, fullLength]);
  return (
    <div className={`px-5 py-2 rounded-lg font-mono text-[12px] font-semibold transition-all duration-500 ${active ? 'bg-white text-black shadow-lg scale-105' : 'bg-white/10 text-gray-500'}`}>
      Generate ↵
    </div>
  );
}

function ProgressLabel({ progress }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => progress.on("change", (v) => setVal(Math.round(v))), [progress]);
  return <span className="text-[11px] font-bold font-mono" style={{ color: CHERRY }}>{val}%</span>;
}

function ProgressFill({ progress }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => progress.on("change", (v) => setVal(Math.round(v))), [progress]);
  return (
    <div
      className="h-full rounded-full"
      style={{ width: `${val}%`, background: `linear-gradient(90deg, ${CHERRY}, ${CHERRY_LIGHT})`, transition: 'width 0.1s linear' }}
    />
  );
}
