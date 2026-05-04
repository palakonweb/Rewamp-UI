import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import GlowButtonShowcase from '../ui/GlowButtonShowcase';
import GlassProfileCardShowcase from '../ui/GlassProfileCardShowcase';
import AuroraBackgroundShowcase from '../ui/AuroraBackgroundShowcase';
import CosmicSparkleToggleShowcase from '../ui/CosmicSparkleToggleShowcase';
import FloatingDockNavbarShowcase from '../ui/FloatingDockNavbarShowcase';
import GradientRevealTextShowcase from '../ui/GradientRevealTextShowcase';
import AIProductBentoShowcase from '../ui/AIProductBentoShowcase';
import ConfettiButtonShowcase from '../ui/ConfettiButtonShowcase';
import MacOSSidebarShowcase from '../ui/MacOSSidebarShowcase';
import AuroraToggleShowcase from '../ui/AuroraToggleShowcase';
import MinimalDotNavbarShowcase from '../ui/MinimalDotNavbarShowcase';
import TypewriterTextShowcase from '../ui/TypewriterTextShowcase';

const COLUMNS = [
  {
    direction: 'up',
    speed: 30,
    items: [
      { name: 'Buttons', count: 19, Component: GlowButtonShowcase },
      { name: 'Cards', count: 12, Component: GlassProfileCardShowcase },
      { name: 'Backgrounds', count: 11, Component: AuroraBackgroundShowcase },
    ],
  },
  {
    direction: 'down',
    speed: 35,
    items: [
      { name: 'Toggles', count: 12, Component: CosmicSparkleToggleShowcase },
      { name: 'Navbars', count: 14, Component: FloatingDockNavbarShowcase },
      { name: 'Sidebars', count: 10, Component: MacOSSidebarShowcase },
    ],
  },
  {
    direction: 'up',
    speed: 28,
    items: [
      { name: 'Bento Grids', count: 10, Component: AIProductBentoShowcase },
      { name: 'Buttons', count: 19, Component: ConfettiButtonShowcase },
      { name: 'Text Effects', count: 6, Component: GradientRevealTextShowcase },
    ],
  },
  {
    direction: 'down',
    speed: 32,
    items: [
      { name: 'Toggles', count: 12, Component: AuroraToggleShowcase },
      { name: 'Navbars', count: 14, Component: MinimalDotNavbarShowcase },
      { name: 'Text Effects', count: 6, Component: TypewriterTextShowcase },
    ],
  },
];

function PreviewCard({ item }) {
  const { Component } = item;
  return (
    <div className="vcard">
      <div className="vcard-header">
        <h3 className="vcard-title">{item.name}</h3>
        <span className="vcard-badge">{item.count} Components</span>
      </div>
      <div className="vcard-divider" />
      <div className="vcard-preview">
        <div className="vcard-scaler">
          {Component ? <Component /> : null}
        </div>
      </div>
      <div className="vcard-footer">
        <span className="vcard-brand">CONJURE</span>
      </div>
    </div>
  );
}

function ScrollColumn({ column, index }) {
  return (
    <div className="vcol-container">
      <div
        className={`vcol-track vcol-${column.direction}`}
        style={{ animationDuration: `${column.speed}s` }}
      >
        {/* Set 1 */}
        <div className="vcol-set">
          {column.items.map((item, i) => (
            <PreviewCard key={`a-${i}`} item={item} />
          ))}
        </div>
        {/* Set 2 — duplicate for seamless loop */}
        <div className="vcol-set">
          {column.items.map((item, i) => (
            <PreviewCard key={`b-${i}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

const SWIPE_WORDS = ['Buttons', 'Bentos', 'Cards', 'Toggles', 'Navbars', 'Sidebars', 'Backgrounds', 'Text Effects', 'Cursors', 'Carousels'];

export function InfiniteSpiralGallery() {
  const [wordIndex, setWordIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % SWIPE_WORDS.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="vgallery-section">
      {/* ── Aceternity-style Lamp Effect ── */}
      <div className="vgallery-lamp">
        <div className="relative flex w-full items-center justify-center" style={{ transform: 'scaleY(1.25)' }}>
          {/* Left conic gradient */}
          <motion.div
            initial={{ opacity: 0.1, width: '40vw' }}
            whileInView={{ opacity: 0.3, width: '100vw' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible"
            style={{ backgroundImage: 'conic-gradient(from 70deg at center top, #810100, transparent, transparent)' }}
          >
            <div className="absolute w-full left-0 h-40 bottom-0 z-20" style={{ background: 'var(--bg)', maskImage: 'linear-gradient(to top, white, transparent)', WebkitMaskImage: 'linear-gradient(to top, white, transparent)' }} />
            <div className="absolute w-40 h-full left-0 bottom-0 z-20" style={{ background: 'var(--bg)', maskImage: 'linear-gradient(to right, white, transparent)', WebkitMaskImage: 'linear-gradient(to right, white, transparent)' }} />
          </motion.div>
          {/* Right conic gradient */}
          <motion.div
            initial={{ opacity: 0.1, width: '40vw' }}
            whileInView={{ opacity: 0.3, width: '100vw' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-auto left-1/2 h-56 overflow-visible"
            style={{ backgroundImage: 'conic-gradient(from 290deg at center top, transparent, transparent, #810100)' }}
          >
            <div className="absolute w-40 h-full right-0 bottom-0 z-20" style={{ background: 'var(--bg)', maskImage: 'linear-gradient(to left, white, transparent)', WebkitMaskImage: 'linear-gradient(to left, white, transparent)' }} />
            <div className="absolute w-full right-0 h-40 bottom-0 z-20" style={{ background: 'var(--bg)', maskImage: 'linear-gradient(to top, white, transparent)', WebkitMaskImage: 'linear-gradient(to top, white, transparent)' }} />
          </motion.div>
          {/* Background fill */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12" style={{ background: 'var(--bg)', filter: 'blur(24px)' }} />
          {/* Backdrop blur strip */}
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-5" style={{ backdropFilter: 'blur(12px)' }} />
          {/* Center glow orb */}
          <div className="absolute inset-auto z-50 h-36 w-[100vw] -translate-y-1/2 rounded-full opacity-15" style={{ background: '#810100', filter: 'blur(60px)' }} />
          {/* Tight inner glow */}
          <motion.div
            initial={{ width: '24vw' }}
            whileInView={{ width: '50vw' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full"
            style={{ background: '#a01010', filter: 'blur(40px)', opacity: 0.15 }}
          />
          {/* Center bright line */}
          <motion.div
            initial={{ width: '40vw' }}
            whileInView={{ width: '100vw' }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-auto z-50 h-0.5 w-[100vw] -translate-y-[7rem]"
            style={{ background: '#810100', opacity: 0.3 }}
          />
          {/* Top mask */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]" style={{ background: 'linear-gradient(to top, transparent 0%, var(--bg) 70%)' }} />
        </div>
      </div>

      {/* Columns behind everything */}
      <div className="vgallery-columns">
        {COLUMNS.map((col, i) => (
          <ScrollColumn key={i} column={col} index={i} />
        ))}
      </div>

      {/* White overlay */}
      <div className="vgallery-overlay" />

      {/* Centered text content ON TOP of overlay */}
      <div className="vgallery-center-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="vgallery-center-inner"
        >
          <p className="font-sans text-[13px] font-thin tracking-[0.35em] uppercase text-[var(--text-2)] mb-4 select-none">
            Components we offer
          </p>

          {/* Typewriter text animation */}
          <div className="vgallery-swipe-container select-none">
            <AnimatePresence mode="wait">
              <motion.span
                key={wordIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-sans font-thin uppercase tracking-widest text-[clamp(2.5rem,5.5vw,4.5rem)] text-[#810100] select-none inline-block min-h-[1.4em]"
              >
                {SWIPE_WORDS[wordIndex].split('').map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: charIdx * 0.04, duration: 0.05 }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="font-sans font-light uppercase tracking-wider text-[var(--text-3)] mt-5 text-sm md:text-base max-w-md mx-auto leading-relaxed select-none">
            A premium library of production-ready components, endlessly expanding.
          </p>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    </section>
  );
}

const CARD_H = 480;
const GAP = 30;
const SET_H = 3 * CARD_H + 3 * GAP; // 3 cards + 3 gaps for seamless loop

const STYLES = `
  .vgallery-section {
    position: relative;
    width: 100%;
    height: 600px;
    background: var(--bg);
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  @media (min-width: 768px) {
    .vgallery-section {
      height: 900px;
    }
  }

  /* White overlay on top of columns */
  .vgallery-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.3) 15%, rgba(255, 255, 255, 0.3) 100%);
    z-index: 15;
    pointer-events: none;
  }
  @media (min-width: 768px) {
    .vgallery-overlay {
      background: linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.15) 15%, rgba(255, 255, 255, 0.15) 100%);
    }
  }

  /* Centered text on top of overlay */
  .vgallery-center-content {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 25;
    pointer-events: none;
  }

  .vgallery-center-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }

  .vgallery-swipe-container {
    position: relative;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  @media (min-width: 768px) {
    .vgallery-swipe-container {
      height: 120px;
    }
  }

  .vgallery-swipe-word {
    font-family: var(--font-serif);
    font-size: clamp(2.5rem, 6vw, 8rem);
    font-weight: 500;
    font-style: italic;
    letter-spacing: -0.02em;
    text-transform: none;
    color: var(--accent);
    line-height: 1;
    white-space: nowrap;
  }

  .vgallery-columns {
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 0 10px;
    max-width: 1260px;
    margin: 0 auto;
    left: 0; right: 0;
  }
  @media (min-width: 768px) {
    .vgallery-columns {
      gap: 20px;
      padding: 0 40px;
    }
  }

  .vcol-container {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    position: relative;
  }
  @media (max-width: 767px) {
    .vcol-container:nth-child(1),
    .vcol-container:nth-child(4) {
      display: none;
    }
  }

  .vcol-track {
    display: flex;
    flex-direction: column;
    will-change: transform;
  }

  .vcol-set {
    display: flex;
    flex-direction: column;
    gap: ${GAP}px;
    padding-bottom: ${GAP}px;
  }

  .vcol-up {
    animation: vcol-scroll-up linear infinite;
  }

  .vcol-down {
    animation: vcol-scroll-down linear infinite;
  }

  @keyframes vcol-scroll-up {
    0% { transform: translateY(0); }
    100% { transform: translateY(-50%); }
  }

  @keyframes vcol-scroll-down {
    0% { transform: translateY(-50%); }
    100% { transform: translateY(0); }
  }

  /* ── Card Styles ── */
  .vcard {
    width: 100%;
    height: 220px;
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.06);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-shadow:
      0 8px 30px -10px rgba(0,0,0,0.06),
      0 2px 8px -2px rgba(0,0,0,0.03);
    transition: transform 0.5s cubic-bezier(0.16,1,0.3,1),
                box-shadow 0.5s cubic-bezier(0.16,1,0.3,1);
    flex-shrink: 0;
  }
  @media (min-width: 768px) {
    .vcard {
      height: ${CARD_H}px;
    }
  }

  .vcard:hover {
    transform: scale(1.03) translateY(-4px);
    box-shadow:
      0 20px 50px -10px rgba(0,0,0,0.1),
      0 4px 14px -4px rgba(0,0,0,0.05),
      0 0 0 1px rgba(129,1,0,0.06);
  }

  .vcard-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px 8px;
    position: relative;
    z-index: 10;
  }
  @media (min-width: 768px) {
    .vcard-header {
      padding: 14px 18px 10px;
    }
  }

  .vcard-title {
    font-family: var(--font-sans);
    font-size: 12px;
    font-weight: 600;
    color: var(--text);
    letter-spacing: -0.01em;
    text-transform: none;
    line-height: 1.3;
  }
  @media (min-width: 768px) {
    .vcard-title {
      font-size: 14px;
    }
  }

  .vcard-badge {
    font-family: var(--font-mono);
    font-size: 8px;
    color: var(--text-3);
    letter-spacing: 0.04em;
    background: rgba(0,0,0,0.03);
    padding: 2px 6px;
    border-radius: 20px;
    white-space: nowrap;
  }
  @media (min-width: 768px) {
    .vcard-badge {
      font-size: 9px;
      padding: 3px 8px;
    }
  }

  .vcard-divider {
    width: 100%;
    height: 1px;
    background: rgba(0,0,0,0.05);
    position: relative;
    z-index: 10;
  }

  .vcard-preview {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #ffffff;
  }

  .vcard-scaler {
    position: absolute;
    top: 0;
    left: 0;
    width: 300%;
    height: 300%;
    transform: scale(0.33);
    transform-origin: top left;
    pointer-events: none;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .vcard-scaler {
      width: 250%;
      height: 250%;
      transform: scale(0.4);
    }
  }

  /* Hide the prompt/copy sections inside showcases */
  .vcard-scaler > div > div:last-child {
    display: none !important;
  }

  .vcard-footer {
    padding: 6px 14px;
    border-top: 1px solid rgba(0,0,0,0.04);
    position: relative;
    z-index: 10;
  }
  @media (min-width: 768px) {
    .vcard-footer {
      padding: 8px 18px;
    }
  }

  .vcard-brand {
    font-family: var(--font-mono);
    font-size: 7px;
    color: rgba(0,0,0,0.12);
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  @media (min-width: 768px) {
    .vcard-brand {
      font-size: 8px;
    }
  }

  /* ── Lamp Effect ── */
  .vgallery-lamp {
    position: absolute;
    top: -120px;
    left: 0;
    right: 0;
    height: 300px;
    z-index: 22;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
  }
  @media (min-width: 768px) {
    .vgallery-lamp {
      height: 500px;
    }
  }

`;
