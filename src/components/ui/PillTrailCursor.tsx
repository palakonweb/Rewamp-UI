import React, { useEffect, useRef, useState, useCallback } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PillTrailCursorProps {
  /** Container element to scope the cursor trail inside. Defaults to the rendered wrapper div. */
  containerRef?: React.RefObject<HTMLElement | null>;
  /** Words to cycle through as pill labels */
  words?: string[];
  /** Background colors for each pill */
  colors?: string[];
  /** Number of pill nodes in the trail */
  trailLength?: number;
  /** Rest distance between pill centers in px */
  spacing?: number;
  /** Follow speed / responsiveness (0.1 - 0.5) */
  followEase?: number;
  /** Height of each pill in px */
  pillHeight?: number;
  /** Font size of pill text in px */
  fontSize?: number;
  /** Optional additional className for the root wrapper */
  className?: string;
  /** Optional inline styles for the root wrapper */
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// ─── Defaults (Strictly matching reference video Recording 2026-09-13 170458.mp4) ─

const DEFAULT_WORDS = [
  'rewamp',
  'ui',
  'components',
  'design',
  'motion',
  'tactile',
  'spring',
  'fluid',
  'craft',
  'future',
];

// RewampUI Lilac & Neutral brand palette
const DEFAULT_COLORS = [
  '#D4CBE5', // brand lilac primary → dark text
  '#171717', // neutral-900         → white text
  '#E4DDF0', // lilac-400           → dark text
  '#404040', // neutral-700         → white text
  '#C1B4D8', // lilac-600           → dark text
  '#262626', // neutral-800         → white text
  '#EEEAF7', // lilac-300           → dark text
  '#9C8EB8', // deep lilac          → white text
  '#525252', // neutral-600         → white text
];

// Light pills requiring dark typography
const LIGHT_COLORS = new Set(['#D4CBE5', '#E4DDF0', '#EEEAF7', '#C1B4D8', '#F6F4FB', '#FFFFFF']);

interface NodePos {
  x: number;
  y: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PillTrailCursor({
  containerRef: externalRef,
  words = DEFAULT_WORDS,
  colors = DEFAULT_COLORS,
  trailLength = 16,
  spacing = 26,
  followEase = 0.32,
  pillHeight = 26,
  fontSize = 11.5,
  className = '',
  style,
  children,
}: PillTrailCursorProps) {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = (externalRef ?? internalRef) as React.RefObject<HTMLDivElement>;

  const pillEls = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const rafId = useRef<number | null>(null);

  // Mouse target coordinates
  const mouse = useRef({ x: -500, y: -500 });
  const isInside = useRef(false);
  const fadeOpacity = useRef(0);

  // Physical nodes representing each pill in the chain
  const nodes = useRef<NodePos[]>(
    Array.from({ length: trailLength }, () => ({ x: -500, y: -500 }))
  );

  const [isTouchOnly, setIsTouchOnly] = useState(false);

  // ─── Touch detection ────────────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchOnly(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchOnly(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Initialize node positions when trailLength changes
  useEffect(() => {
    nodes.current = Array.from({ length: trailLength }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
    }));
  }, [trailLength]);

  // ─── rAF Physics Chain Loop ────────────────────────────────────────────────
  const tick = useCallback(() => {
    const currentNodes = nodes.current;
    if (currentNodes.length === 0) return;

    // 1. Head node (index 0) smoothly tracks the mouse
    const head = currentNodes[0];
    head.x += (mouse.current.x - head.x) * 0.45;
    head.y += (mouse.current.y - head.y) * 0.45;

    // 2. Each subsequent node follows the previous node with distance constraint
    for (let i = 1; i < trailLength; i++) {
      const prev = currentNodes[i - 1];
      const curr = currentNodes[i];

      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.1) {
        const angle = Math.atan2(dy, dx);
        // Desired position at `spacing` distance behind previous node along current angle
        const targetX = prev.x - Math.cos(angle) * spacing;
        const targetY = prev.y - Math.sin(angle) * spacing;

        // Smoothly ease toward target position
        curr.x += (targetX - curr.x) * followEase;
        curr.y += (targetY - curr.y) * followEase;
      }
    }

    // 3. Smooth fade in / out of container
    const targetFade = isInside.current ? 1 : 0;
    fadeOpacity.current += (targetFade - fadeOpacity.current) * 0.15;
    if (overlayRef.current) {
      overlayRef.current.style.opacity = fadeOpacity.current.toFixed(3);
    }

    // 4. Update DOM transforms directly (zero React re-renders)
    for (let i = 0; i < trailLength; i++) {
      const el = pillEls.current[i];
      const node = currentNodes[i];
      if (!el || !node) continue;

      // Subtle tail fade for depth (from 1.0 down to ~0.7 at the tail)
      const tailFade = Math.max(0.7, 1 - (i / trailLength) * 0.3);
      const pillOpacity = isInside.current ? tailFade.toFixed(3) : '0';

      // Strictly horizontal (0° rotation) - centered exactly on (node.x, node.y)
      el.style.transform = `translate3d(${node.x.toFixed(1)}px, ${node.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
      el.style.opacity = pillOpacity;
    }

    rafId.current = requestAnimationFrame(tick);
  }, [trailLength, spacing, followEase]);

  // Start / stop loop
  useEffect(() => {
    if (isTouchOnly) return;
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [tick, isTouchOnly]);

  // Mouse event listeners
  useEffect(() => {
    if (isTouchOnly) return;
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top - 10;
      mouse.current = { x, y };
      isInside.current = true;
    };

    const onEnter = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top - 10;
      mouse.current = { x, y };

      // Initialize all nodes in a relaxed vertical-ish chain behind cursor
      const currentNodes = nodes.current;
      for (let i = 0; i < trailLength; i++) {
        currentNodes[i] = {
          x: x - Math.sin(i * 0.3) * 6,
          y: y + i * spacing,
        };
      }
      isInside.current = true;
    };

    const onLeave = () => {
      isInside.current = false;
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [containerRef, isTouchOnly, trailLength, spacing]);

  if (isTouchOnly) {
    return (
      <div ref={internalRef} className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        cursor: 'default',
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}

      {/* Trail overlay layer - pointer-events: none */}
      <div
        ref={overlayRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          overflow: 'hidden',
          transition: 'opacity 0.2s ease',
        }}
      >
        {Array.from({ length: trailLength }, (_, i) => {
          const word = words[i % words.length];
          const color = colors[i % colors.length];
          const textColor = LIGHT_COLORS.has(color) ? '#111111' : '#ffffff';

          // Stacking order: newest pill (i=0) has highest z-index
          const zIndex = 100 - i;

          return (
            <div
              key={`pill-${i}`}
              ref={(el) => {
                pillEls.current[i] = el;
              }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex,
                opacity: 0,
                transform: 'translate3d(-500px, -500px, 0) translate(-50%, -50%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: `${pillHeight}px`,
                padding: '0 12px',
                borderRadius: '9999px',
                backgroundColor: color,
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: `${fontSize}px`,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1,
                color: textColor,
                whiteSpace: 'nowrap',
                userSelect: 'none',
                willChange: 'transform, opacity',
              }}
            >
              {word}
            </div>
          );
        })}
      </div>
    </div>
  );
}
