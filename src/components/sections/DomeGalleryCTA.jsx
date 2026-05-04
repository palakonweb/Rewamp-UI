import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CHERRY = "#D2042D";

/* ── Googly Eye ─────────────────────────────────────────────────── */
function Eye() {
  const eyeRef = useRef(null);
  const pupilX = useMotionValue(0);
  const pupilY = useMotionValue(0);
  const springX = useSpring(pupilX, { stiffness: 300, damping: 20 });
  const springY = useSpring(pupilY, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return;
      const rect = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const distance = Math.min(12, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10);
      pupilX.set(Math.cos(angle) * distance);
      pupilY.set(Math.sin(angle) * distance);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pupilX, pupilY]);

  return (
    <div ref={eyeRef} className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center relative shadow-inner overflow-hidden">
      <motion.div style={{ x: springX, y: springY }} className="w-[14px] h-[14px] bg-black rounded-full absolute" />
    </div>
  );
}

/* ── Flipping Card: Prompt ↔ Googly Eyes Button ─────────────────── */
function FlipCard() {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setFlipped(f => !f), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full max-w-[340px] mx-auto" style={{ perspective: 1200 }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full aspect-[4/5] will-change-transform"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* ── FRONT — Prompt ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-black/[0.06] bg-[#f5f5f7] p-6 flex flex-col overflow-hidden shadow-lg"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-black/[0.06]">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ background: `linear-gradient(135deg, ${CHERRY}, #ff1e46)` }}>C</div>
            <span className="text-[10px] text-gray-500 font-mono font-semibold">conjure-agent</span>
            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded bg-green-500/20 text-green-700 font-mono">ready</span>
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <div className="bg-white rounded-xl rounded-tr-sm px-4 py-3 mb-4 border border-black/[0.05] shadow-sm">
              <p className="text-[11px] text-gray-700 font-mono leading-relaxed">
                "Create a cursor-tracking googly eyes button with spring physics"
              </p>
            </div>
            <div className="flex items-center gap-2 text-[9px] text-gray-400 font-mono">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: CHERRY }} />
              Generating component...
            </div>
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Prompt</span>
            <span className="text-[9px] font-mono text-gray-400">1/2</span>
          </div>
        </div>

        {/* ── BACK — Googly Eyes Button ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-black/[0.06] bg-[#f5f5f7] p-6 flex flex-col overflow-hidden shadow-lg"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-black/[0.06]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#28c840" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            <span className="text-[10px] text-gray-500 font-mono font-semibold">Result</span>
            <span className="ml-auto text-[8px] px-1.5 py-0.5 rounded font-mono font-semibold text-white" style={{ backgroundColor: CHERRY }}>ready</span>
          </div>

          {/* Live Googly Eyes Button */}
          <div className="flex-1 flex items-center justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative flex items-center gap-4 bg-black pl-8 pr-3 py-3 rounded-full shadow-2xl cursor-pointer select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <span className="text-white text-lg font-semibold tracking-tight mr-3">Get in touch</span>
              <div className="flex items-center gap-2">
                <Eye />
                <Eye />
              </div>
            </motion.button>
          </div>

          <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between">
            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">Component</span>
            <span className="text-[9px] font-mono text-gray-400">2/2</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function DomeGalleryCTA() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden bg-white py-16" style={{ boxShadow: 'inset 0 20px 40px -10px rgba(139, 0, 0, 0.08)' }}>

      {/* ── Left: Text ── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-mono font-semibold tracking-[0.3em] uppercase text-gray-400 mb-6"
        >
          Start building
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2rem,4.5vw,4rem)] tracking-tight leading-[1.1] text-[var(--text)] mb-4"
        >
          Components that<br />
          build themselves.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-[var(--text-2)] text-base md:text-lg max-w-sm mb-10 leading-relaxed"
        >
          Describe what you need. Watch it generate, animate, and ship — all in one flow.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={() => navigate('/components')}
            className="liquid-metal inline-flex items-center justify-center px-8 py-3.5 text-[12px] font-display tracking-[0.1em] text-[var(--text)] bg-white cursor-pointer hover:shadow-[0_0_24px_var(--glow)] transition-shadow duration-500"
          >
            BROWSE COMPONENTS
          </button>
        </motion.div>
      </div>

      {/* ── Right: Flipping Card ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 1 }}
        className="hidden lg:flex flex-1 items-center justify-center relative"
      >
        <div className="absolute left-0 top-[15%] bottom-[15%] w-px bg-black/[0.06]" />
        <div className="w-full px-12">
          <FlipCard />
        </div>
      </motion.div>

      {/* Bottom gradient — soft merge with CONJURE section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-transparent to-white z-20 pointer-events-none" />
    </section>
  );
}
