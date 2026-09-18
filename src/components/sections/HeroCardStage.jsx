import React, { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { animate, cubicBezier, motion, useReducedMotion } from 'framer-motion';
import { FileCode2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Real component previews — each card renders the actual
   RewampUI showcase component (lazy-loaded, code-split) instead
   of a mock, wrapped in .prompt-embed to hide its own copy-code
   footer and keep its native demo background.
   ═══════════════════════════════════════════════════════════ */

const PREVIEW_COMPONENTS = {
  'water-caustics-background': lazy(() => import('../ui/WaterCausticsBackgroundShowcase')),
  'aurora-background': lazy(() => import('../ui/AuroraBackgroundShowcase')),
  'gradient-wave-background': lazy(() => import('../ui/GradientWaveBackgroundShowcase')),
  'silk-waves-background': lazy(() => import('../ui/SilkWavesBackgroundShowcase')),
  'pixel-cloud-background': lazy(() => import('../ui/PixelCloudBackgroundShowcase')),
  'pixel-snow-background': lazy(() => import('../ui/PixelSnowBackgroundShowcase')),
  'layered-paper-waves-background': lazy(() => import('../ui/LayeredPaperWavesBackgroundShowcase')),
  'googly-eyes-button': lazy(() => import('../ui/GooglyEyesButtonShowcase')),
  'kinetic-reel-text': lazy(() => import('../ui/KineticReelTextShowcase')),
  'kinetic-lens-sidebar': lazy(() => import('../ui/KineticLensSidebarShowcase')),
  'flower-sidebar': lazy(() => import('../ui/FlowerSidebarShowcase')),
  'morph-search-capsule': lazy(() => import('../ui/MorphSearchCapsuleShowcase')),
  'animated-search-demo': lazy(() => import('../ui/AnimatedSearchDemo')),
  'day-night-sky-toggle': lazy(() => import('../ui/DayNightSkyToggleShowcase')),
  'cosmic-sparkle-toggle': lazy(() => import('../ui/CosmicSparkleToggleShowcase')),
  'glass-orb-toggle': lazy(() => import('../ui/GlassOrbToggleShowcase')),
  'landscape-orb-toggle': lazy(() => import('../ui/LandscapeOrbToggleShowcase')),
  'gradient-reveal-text': lazy(() => import('../ui/GradientRevealTextShowcase')),
};

// Every card renders at this exact 16:9 size — no exceptions — so the camera
// never has to reframe between differently-shaped slots.
const CARD_W = 480;
const CARD_H = 270;

// Real showcase components each assume their own intrinsic size (a background
// demo's fixed 500px-tall block, a small toggle's tiny footprint, etc). Rather
// than crop the tall ones or stretch the small ones, every component renders
// into this fixed 16:9 "design canvas" (generous enough to hold all of them
// uncropped) and the whole canvas is scaled down uniformly to fit the card —
// so every frame is identically sized and nothing is ever cut off.
const PREVIEW_REF_W = 1040;
const PREVIEW_REF_H = 585;
const PREVIEW_SCALE = CARD_W / PREVIEW_REF_W;

function PreviewFallback() {
  return (
    <div className="w-full h-full animate-pulse bg-[var(--elevated)]" />
  );
}

function CardPreview({ id }) {
  const Comp = PREVIEW_COMPONENTS[id];
  if (!Comp) return null;
  return (
    <div className="prompt-embed preserve-bg relative w-full h-full overflow-hidden">
      <div
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{
          width: PREVIEW_REF_W,
          height: PREVIEW_REF_H,
          transform: `scale(${PREVIEW_SCALE})`,
          transformOrigin: 'top left',
        }}
      >
        <Suspense fallback={<PreviewFallback />}>
          <Comp />
        </Suspense>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Canvas layout — fixed slots, camera pans/zooms between them.
   ═══════════════════════════════════════════════════════════ */

const COL_W = 520;
const ROW_H = 310;
const CANVAS_W = 60 + 5 * COL_W;
const CANVAS_H = 40 + 4 * ROW_H;

const RAW_CARDS = [
  { id: 'water-caustics-background', col: 0, row: 0 },
  { id: 'aurora-background', col: 0, row: 1 },
  { id: 'gradient-wave-background', col: 0, row: 2 },
  { id: 'silk-waves-background', col: 0, row: 3 },

  { id: 'pixel-cloud-background', col: 1, row: 0 },
  { id: 'pixel-snow-background', col: 1, row: 1 },
  { id: 'layered-paper-waves-background', col: 1, row: 2 },
  { id: 'googly-eyes-button', col: 1, row: 3 },

  { id: 'kinetic-reel-text', col: 2, row: 0 },
  { id: 'kinetic-lens-sidebar', col: 2, row: 1 },
  { id: 'flower-sidebar', col: 2, row: 2 },

  { id: 'morph-search-capsule', col: 3, row: 0 },
  { id: 'animated-search-demo', col: 3, row: 1 },
  { id: 'day-night-sky-toggle', col: 3, row: 2 },

  { id: 'cosmic-sparkle-toggle', col: 4, row: 0 },
  { id: 'glass-orb-toggle', col: 4, row: 1 },
  { id: 'landscape-orb-toggle', col: 4, row: 2 },
  { id: 'gradient-reveal-text', col: 4, row: 3 },
];

const CARDS = RAW_CARDS.map((c) => ({
  ...c,
  x: 60 + c.col * COL_W,
  y: 40 + c.row * ROW_H,
  w: CARD_W,
  h: CARD_H,
}));

const START_INDEX = CARDS.findIndex((c) => c.id === 'gradient-reveal-text');
const FOCUS_INTERVAL_MS = 4200;
// Never hop to a card bordering the current one — a focus change should read
// as a real flight, not a shuffle to a neighbor.
const MIN_HOP_DISTANCE = 700;

const hopDistance = (a, b) => {
  const ca = CARDS[a];
  const cb = CARDS[b];
  return Math.hypot(ca.x + ca.w / 2 - (cb.x + cb.w / 2), ca.y + ca.h / 2 - (cb.y + cb.h / 2));
};

const clamp = (min, value, max) => Math.min(max, Math.max(min, value));

// ── Camera model ─────────────────────────────────────────────────────────
// The camera is (lookAt, zoom): the canvas point under the viewport center
// and the scale it renders at. Every frame derives the transform from those
// two so the look-at point travels a straight line while the zoom breathes —
// GTA-character-switch profile: the look-at glides on one S-curve (slow, fast
// middle, slow) while the zoom follows a sin² bell, deepest mid-flight.
const flightPanEase = cubicBezier(0.65, 0, 0.35, 1);
const flightDurationFor = (distance) => clamp(1.1, 0.8 + distance / 950, 2.3);
const flightZoomOutFor = (distance) => clamp(0.7, 0.88 - distance * 0.00008, 0.88);

function shuffled(length) {
  const order = Array.from({ length }, (_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return order;
}

function CardShell({ title, children }) {
  return (
    <div className="flex h-full w-full flex-col rounded-[10px] bg-[var(--elevated)] p-1">
      <div className="flex h-7 shrink-0 items-center px-2">
        <span className="flex items-center gap-1.5 text-[var(--text-subtle)] font-mono text-[10px]">
          <FileCode2 size={12} />
          <span className="line-clamp-1">{title}</span>
        </span>
      </div>
      <div className="min-h-0 flex-1 overflow-hidden rounded-[7px] border border-[var(--border)]">
        {children}
      </div>
    </div>
  );
}

export function HeroCardStage({ className = '' }) {
  const viewportRef = useRef(null);
  const canvasRef = useRef(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [active, setActive] = useState(START_INDEX);
  const [prevActive, setPrevActive] = useState(START_INDEX);
  const [hovered, setHovered] = useState(null);
  const [paused, setPaused] = useState(false);
  // False until the first focus change: the camera must render already
  // settled on load — any mount-time tween reads as the camera lurching in.
  const [engaged, setEngaged] = useState(false);
  const queueRef = useRef([]);
  const lastPickRef = useRef(START_INDEX);
  const shownRef = useRef(START_INDEX);
  const flightRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setViewport({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion || paused) return;
    const timer = setInterval(() => {
      if (queueRef.current.length === 0) queueRef.current = shuffled(CARDS.length);
      const current = lastPickRef.current;
      let pickAt = queueRef.current.findIndex((i) => hopDistance(i, current) >= MIN_HOP_DISTANCE);
      if (pickAt === -1) {
        pickAt = queueRef.current.reduce(
          (best, i, k, queue) =>
            hopDistance(i, current) > hopDistance(queue[best], current) ? k : best,
          0,
        );
      }
      const next = queueRef.current.splice(pickAt, 1)[0];
      setPrevActive(current);
      lastPickRef.current = next;
      setEngaged(true);
      setActive(next);
    }, FOCUS_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [reducedMotion, paused]);

  const measured = viewport.w > 0 && viewport.h > 0;
  const scale = measured ? clamp(0.75, Math.min(viewport.w / 640, viewport.h / 400), 1.15) : 0.9;
  const focus = CARDS[active];
  const prevFocus = CARDS[prevActive];
  // Estimated flight length (used only for the card highlight delay below —
  // the flight itself measures its true start from the live transform).
  const estimatedDistance = Math.hypot(
    (focus.x + focus.w / 2 - prevFocus.x - prevFocus.w / 2) * scale,
    (focus.y + focus.h / 2 - prevFocus.y - prevFocus.h / 2) * scale,
  );
  // The incoming card lights up only as the camera descends onto it.
  const focusDelay = !reducedMotion && engaged ? flightDurationFor(estimatedDistance) * 0.65 : 0;

  useLayoutEffect(() => {
    const el = canvasRef.current;
    if (!el || !measured) return;
    const setCamera = (lookX, lookY, s) => {
      el.style.transform = `translate(${viewport.w / 2 - lookX * s}px, ${viewport.h / 2 - lookY * s}px) scale(${s})`;
    };
    const targetX = focus.x + focus.w / 2;
    const targetY = focus.y + focus.h / 2;

    flightRef.current?.stop();
    if (!engaged || reducedMotion || shownRef.current === active) {
      // First paint, reduced motion, or a viewport resize: settle instantly.
      setCamera(targetX, targetY, scale);
    } else {
      // Recover the current camera from the live transform (matrix is
      // [s 0 0 s tx ty] because translate is applied before scale).
      const computed = getComputedStyle(el).transform;
      const matrix = computed !== 'none' ? new DOMMatrix(computed) : null;
      const fromScale = matrix ? matrix.a : scale;
      const fromX = matrix ? (viewport.w / 2 - matrix.e) / fromScale : targetX;
      const fromY = matrix ? (viewport.h / 2 - matrix.f) / fromScale : targetY;

      const distance = Math.hypot((targetX - fromX) * scale, (targetY - fromY) * scale);
      const duration = flightDurationFor(distance);
      const zoomDepth = scale * (1 - flightZoomOutFor(distance));

      flightRef.current = animate(0, 1, {
        duration,
        ease: 'linear',
        onUpdate: (t) => {
          const pan = flightPanEase(t);
          const dip = Math.sin(Math.PI * t) ** 2;
          setCamera(
            fromX + (targetX - fromX) * pan,
            fromY + (targetY - fromY) * pan,
            fromScale + (scale - fromScale) * pan - zoomDepth * dip,
          );
        },
      });
    }
    shownRef.current = active;
  }, [active, focus, measured, scale, viewport.w, viewport.h, engaged, reducedMotion]);

  return (
    <div
      ref={viewportRef}
      className={`overflow-hidden ${className || 'relative'}`}
    >
      {measured && (
        <div
          ref={canvasRef}
          className="absolute top-0 left-0 will-change-transform"
          style={{ width: CANVAS_W, height: CANVAS_H, transformOrigin: '0 0' }}
        >
          <div
            aria-hidden
            className="absolute -inset-[800px] bg-[radial-gradient(circle,var(--border)_1px,transparent_1px)] bg-[size:26px_26px] opacity-60"
          />
          {CARDS.map((card, index) => {
            const isFocused = index === active;
            const isLifted = isFocused || (!reducedMotion && hovered === index);
            return (
              <motion.div
                key={card.id}
                className="absolute rounded-[10px]"
                style={{
                  left: card.x,
                  top: card.y,
                  width: card.w,
                  height: card.h,
                  zIndex: isFocused ? 10 : hovered === index ? 5 : 1,
                  boxShadow: isFocused
                    ? '0 30px 60px -15px rgba(0,0,0,0.25)'
                    : '0 4px 14px rgba(0,0,0,0.08)',
                }}
                initial={false}
                animate={{
                  opacity: reducedMotion || isLifted ? 1 : 0.3,
                  scale: !reducedMotion && isFocused ? 1.06 : 1,
                }}
                transition={{
                  opacity: { duration: 0.9, ease: 'easeInOut', delay: isFocused ? focusDelay : 0 },
                  scale: {
                    type: 'spring',
                    stiffness: 170,
                    damping: 26,
                    delay: isFocused ? focusDelay : 0,
                  },
                }}
                onPointerEnter={() => {
                  setHovered(index);
                  setPaused(true);
                }}
                onPointerLeave={() => {
                  setHovered((p) => (p === index ? null : p));
                  setPaused(false);
                }}
              >
                <CardShell title={`${card.id}.tsx`}>
                  <CardPreview id={card.id} />
                </CardShell>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HeroCardStage;
