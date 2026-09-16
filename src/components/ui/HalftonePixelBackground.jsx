import React, { useEffect, useRef } from 'react';

/**
 * HalftonePixelBackground
 * Recreates the dynamic pixel/halftone metaball cloud background matching
 * E:\Conjure-UI\public\Recording 2026-09-16 211818.mp4
 * 
 * Works seamlessly in both Light and Dark modes:
 * - Light Mode: Canvas #EAEAEA, with lavender dots (#9C8EB8, #C1B4D8) morphing into luminous white clouds.
 * - Dark Mode: Canvas #141218, with deep purple-slate dots morphing into radiant brand lavender (#D4CBE5, #F0EBFA) clouds.
 */
export default function HalftonePixelBackground({ theme = 'dark', className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Dynamic drifting metaball fluid nodes
    const nodes = [
      { xRatio: 0.25, yRatio: 0.35, vx: 0.0007, vy: 0.0005, radius: 190, phase: 0 },
      { xRatio: 0.70, yRatio: 0.40, vx: -0.0006, vy: 0.0007, radius: 220, phase: 1.8 },
      { xRatio: 0.50, yRatio: 0.75, vx: 0.0005, vy: -0.0006, radius: 210, phase: 3.2 },
      { xRatio: 0.82, yRatio: 0.80, vx: -0.0004, vy: -0.0005, radius: 170, phase: 4.5 },
      { xRatio: 0.18, yRatio: 0.82, vx: 0.0008, vy: 0.0004, radius: 180, phase: 2.1 },
    ];

    let time = 0;

    const render = () => {
      time += 0.015;

      const isDark = theme === 'dark';
      // Base background color
      const baseBg = isDark ? '#141218' : '#EAEAEA';
      ctx.fillStyle = baseBg;
      ctx.fillRect(0, 0, width, height);

      // Spacing of the halftone dot matrix
      const dotSpacing = 16;
      const maxDotRadius = dotSpacing * 0.56; // Dots can touch/merge at peak

      // Update node positions with smooth sinusoidal wandering
      const activeNodes = nodes.map((node) => {
        const x = ((node.xRatio + Math.sin(time * 0.8 + node.phase) * 0.15) % 1) * width;
        const y = ((node.yRatio + Math.cos(time * 0.7 + node.phase) * 0.15) % 1) * height;
        const r = node.radius * (1 + Math.sin(time * 1.1 + node.phase) * 0.18);
        return { x, y, r };
      });

      const cols = Math.ceil(width / dotSpacing) + 1;
      const rows = Math.ceil(height / dotSpacing) + 1;

      for (let col = 0; col < cols; col++) {
        const x = col * dotSpacing;

        for (let row = 0; row < rows; row++) {
          const y = row * dotSpacing;

          // Compute field intensity from metaball nodes + harmonic wave ripples
          let field = 0;
          for (let i = 0; i < activeNodes.length; i++) {
            const node = activeNodes[i];
            const dx = x - node.x;
            const dy = y - node.y;
            const distSq = dx * dx + dy * dy;
            const rSq = node.r * node.r;
            field += rSq / (distSq + rSq * 0.45);
          }

          // Subtle organic background perturbation wave
          const wave =
            Math.sin(x * 0.008 + time * 0.5) * 0.15 +
            Math.cos(y * 0.009 - time * 0.6) * 0.15;
          field += wave;

          if (field < 0.22) {
            // Draw faint ambient base pinprick
            const tinyRadius = isDark ? 1.0 : 1.1;
            ctx.fillStyle = isDark ? 'rgba(212, 203, 229, 0.08)' : 'rgba(156, 142, 184, 0.12)';
            ctx.beginPath();
            ctx.arc(x, y, tinyRadius, 0, Math.PI * 2);
            ctx.fill();
            continue;
          }

          // Normalize field to 0..1 range
          const t = Math.min(Math.max((field - 0.22) / 1.1, 0), 1);

          // Dot size swells as intensity rises
          const radius = Math.min(t * maxDotRadius, maxDotRadius);

          // Halftone Color Ramp (Light vs Dark mode)
          if (isDark) {
            if (t < 0.45) {
              // Deep lavender mist
              ctx.fillStyle = `rgba(156, 142, 184, ${0.2 + t * 0.6})`;
            } else if (t < 0.8) {
              // Brand lavender #D4CBE5
              ctx.fillStyle = `rgba(212, 203, 229, ${0.5 + (t - 0.45) * 1.2})`;
            } else {
              // Radiant core highlight #F5F1FC
              ctx.fillStyle = `rgba(245, 241, 252, ${0.85 + (t - 0.8) * 0.75})`;
            }
          } else {
            if (t < 0.45) {
              // Lavender-slate dot
              ctx.fillStyle = `rgba(156, 142, 184, ${0.35 + t * 0.8})`;
            } else if (t < 0.78) {
              // Soft lavender dot
              ctx.fillStyle = `rgba(184, 168, 214, ${0.65 + (t - 0.45) * 0.9})`;
            } else {
              // Glowing crisp white cloud center (like the reference video!)
              ctx.fillStyle = `rgba(255, 255, 255, ${0.88 + (t - 0.78) * 0.55})`;
            }
          }

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-300 ${className}`}
      style={{ display: 'block' }}
    />
  );
}
