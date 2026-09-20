export const pillTrailPrompt = `Create a custom animated cursor trail made from small rounded pill-shaped tags identical to the helix.tech reference.
The canvas is pure white with a minimalist 5-column editorial layout: top navigation links ("Home", "Research", "Development", "News", "Institute") separated by thin vertical grid divider lines, and a bold black "helix.tech" brand title at the bottom left.
As the user's cursor moves across the canvas:
- Generate an overlapping ribbon trail of ~16 compact, colorful biotech pills (words: "biotech", "health", "science", "innovation", "research", "dna", "cells", "genetics", "biology", "future").
- The trail follows the cursor with an elastic inverse-kinematics spring chain with distance constraints.
- Pills remain strictly 0° horizontal at all times - they never rotate or tilt along curve vectors.
- Newer pills render on top of older pills (descending z-index down the chain).
- Spacing is velocity-responsive: expanding smoothly on fast movement and clustering tightly with overlap on deceleration or idle.
- Vibrant organic biotech color palette (royal blue, deep magenta, neon lime, soft lavender, indigo, warm gold, magenta-pink, cyan, deep violet) with high-contrast readable text.
- Fluid 60fps performance using requestAnimationFrame with zero React re-renders during animation.`;

export const pillTrailCode = `import React, { useEffect, useRef, useState, useCallback } from 'react';

export interface PillTrailCursorProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  words?: string[];
  colors?: string[];
  trailLength?: number;
  spacing?: number;
  followEase?: number;
  pillHeight?: number;
  fontSize?: number;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const DEFAULT_WORDS = [
  'biotech', 'health', 'science', 'innovation', 'research',
  'dna', 'cells', 'genetics', 'biology', 'future',
];

const DEFAULT_COLORS = [
  '#2563EB', '#A824A4', '#D6F52A', '#C8B6FF', '#3B52E2',
  '#F5D230', '#B80075', '#06B6D4', '#4C1D95',
];

const LIGHT_COLORS = new Set(['#D6F52A', '#C8B6FF', '#F5D230', '#CCFF00', '#FACC15', '#DDD6FE']);

interface NodePos {
  x: number;
  y: number;
}

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

  const mouse = useRef({ x: -500, y: -500 });
  const isInside = useRef(false);
  const fadeOpacity = useRef(0);

  const nodes = useRef<NodePos[]>(
    Array.from({ length: trailLength }, () => ({ x: -500, y: -500 }))
  );

  const [isTouchOnly, setIsTouchOnly] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    setIsTouchOnly(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouchOnly(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    nodes.current = Array.from({ length: trailLength }, () => ({
      x: mouse.current.x,
      y: mouse.current.y,
    }));
  }, [trailLength]);

  const tick = useCallback(() => {
    const currentNodes = nodes.current;
    if (currentNodes.length === 0) return;

    // Head smoothly tracks mouse
    const head = currentNodes[0];
    head.x += (mouse.current.x - head.x) * 0.45;
    head.y += (mouse.current.y - head.y) * 0.45;

    // Follow chain with distance constraints
    for (let i = 1; i < trailLength; i++) {
      const prev = currentNodes[i - 1];
      const curr = currentNodes[i];
      const dx = prev.x - curr.x;
      const dy = prev.y - curr.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 0.1) {
        const angle = Math.atan2(dy, dx);
        const targetX = prev.x - Math.cos(angle) * dynamicSpacing;
        const targetY = prev.y - Math.sin(angle) * dynamicSpacing;

        curr.x += (targetX - curr.x) * followEase;
        curr.y += (targetY - curr.y) * followEase;
      }
    }

    // 5. Update DOM transforms directly
    for (let i = 0; i < trailLength; i++) {
      const el = pillEls.current[i];
      const node = currentNodes[i];
      if (!el || !node) continue;

      const tailFade = Math.max(0.65, 1 - (i / trailLength) * 0.35);
      const pillOpacity = Math.max(0, fadeOpacity.current * tailFade);

      if (pillOpacity <= 0.001) {
        el.style.opacity = '0';
        continue;
      }

      el.style.opacity = pillOpacity.toFixed(3);
      // Strictly 0° horizontal orientation
      el.style.transform = \`translate3d(\${node.x.toFixed(1)}px, \${node.y.toFixed(1)}px, 0) translate(-50%, -50%)\`;
    }

    rafId.current = requestAnimationFrame(tick);
  }, [trailLength, spacing, followEase]);

  useEffect(() => {
    if (isTouchOnly) return;
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [tick, isTouchOnly]);

  useEffect(() => {
    if (isTouchOnly) return;
    const el = containerRef.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top - 10;
      mouse.current = { x, y };

      const isInBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInBounds) {
        if (!isInside.current && fadeOpacity.current < 0.05) {
          const currentNodes = nodes.current;
          for (let i = 0; i < trailLength; i++) {
            currentNodes[i] = {
              x: x - Math.sin(i * 0.3) * 6,
              y: y + i * spacing,
            };
          }
        }
        isInside.current = true;
      } else {
        isInside.current = false;
      }
    };

    const onMouseLeave = () => {
      isInside.current = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [containerRef, isTouchOnly, trailLength, spacing]);

  if (isTouchOnly) {
    return <div ref={internalRef} className={className} style={style}>{children}</div>;
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', cursor: 'default', overflow: 'hidden', ...style }}
    >
      {children}
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

          return (
            <div
              key={\`pill-\${i}\`}
              ref={(el) => { pillEls.current[i] = el; }}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 100 - i, // Newest on top
                opacity: 0,
                transform: 'translate3d(-500px, -500px, 0) translate(-50%, -50%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: \`\${pillHeight}px\`,
                padding: '0 12px',
                borderRadius: '9999px',
                backgroundColor: color,
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                fontSize: \`\${fontSize}px\`,
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
`;
