import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * HalftoneDotCursor
 * Recreation of Recording 2026-09-17 213845.mp4:
 * An interactive halftone dot matrix cursor that expands and blooms into an organic,
 * fluid wake along the cursor's trajectory with smooth decay dissipation.
 * 
 * Supports both dark and light modes, container-bound or fullscreen scoping,
 * and high-performance bounding-box canvas rendering.
 */
export default function HalftoneDotCursor({
  children,
  spacing = 13,
  maxDotRadius = 4.6,
  minDotRadius = 0.6,
  influenceRadius = 58,
  trailLifetime = 1100, // ms
  color = null, // custom override
  darkColor = '#9C8EB8', // Brand lavender darker for dark mode
  lightColor = '#B8A7D6', // Brand lavender lighter for light mode
  backgroundColor = 'transparent',
  className = '',
  style = {},
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const trailRef = useRef([]);
  const lastMousePos = useRef({ x: -1000, y: -1000, time: 0 });
  const animFrameId = useRef(null);
  const isHovered = useRef(false);

  // Auto-detect theme if color is not provided
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    if (color) return;
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, [color]);

  const activeDotColor = color || (isDark ? darkColor : lightColor);

  // Interpolate trail points between mouse moves to prevent gaps on fast movement
  const addTrailPoint = useCallback((x, y) => {
    const now = performance.now();
    const prev = lastMousePos.current;
    
    if (prev.x !== -1000) {
      const dx = x - prev.x;
      const dy = y - prev.y;
      const dist = Math.hypot(dx, dy);
      const step = spacing * 0.45; // smooth sub-sampling
      
      if (dist > step) {
        const steps = Math.min(25, Math.floor(dist / step));
        for (let i = 1; i <= steps; i++) {
          const t = i / (steps + 1);
          trailRef.current.push({
            x: prev.x + dx * t,
            y: prev.y + dy * t,
            created: now,
            lifetime: trailLifetime,
            strength: 1.0,
          });
        }
      }
    }

    trailRef.current.push({
      x,
      y,
      created: now,
      lifetime: trailLifetime,
      strength: 1.0,
    });

    lastMousePos.current = { x, y, time: now };
  }, [spacing, trailLifetime]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    let width = 0;
    let height = 0;

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    const onMouseEnter = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      isHovered.current = true;
      lastMousePos.current = { x, y, time: performance.now() };
      addTrailPoint(x, y);
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      isHovered.current = true;
      addTrailPoint(x, y);
    };

    const onMouseLeave = () => {
      isHovered.current = false;
      lastMousePos.current = { x: -1000, y: -1000, time: 0 };
    };

    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    // Render loop
    const render = () => {
      const now = performance.now();

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Keep stationary hover spot alive
      if (isHovered.current && lastMousePos.current.x !== -1000) {
        if (now - lastMousePos.current.time > 90) {
          trailRef.current.push({
            x: lastMousePos.current.x,
            y: lastMousePos.current.y,
            created: now,
            lifetime: 600,
            strength: 0.85,
          });
          lastMousePos.current.time = now;
        }
      }

      // Clean expired trail points
      const trail = trailRef.current;
      let activeCount = 0;
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      for (let i = 0; i < trail.length; i++) {
        const pt = trail[i];
        const age = now - pt.created;
        if (age < pt.lifetime) {
          trail[activeCount++] = pt;
          if (pt.x < minX) minX = pt.x;
          if (pt.x > maxX) maxX = pt.x;
          if (pt.y < minY) minY = pt.y;
          if (pt.y > maxY) maxY = pt.y;
        }
      }
      trail.length = activeCount;

      // Only calculate and draw if we have active points in the bounding box
      if (activeCount > 0) {
        // Expand bounding box by influenceRadius + maxDotRadius
        const pad = influenceRadius + maxDotRadius;
        const startX = Math.max(0, Math.floor((minX - pad) / spacing) * spacing);
        const endX = Math.min(width, Math.ceil((maxX + pad) / spacing) * spacing);
        const startY = Math.max(0, Math.floor((minY - pad) / spacing) * spacing);
        const endY = Math.min(height, Math.ceil((maxY + pad) / spacing) * spacing);

        ctx.fillStyle = activeDotColor;

        // Iterate only over the local grid cells within the active bounding box
        for (let gx = startX; gx <= endX; gx += spacing) {
          for (let gy = startY; gy <= endY; gy += spacing) {
            let totalInfluence = 0;

            for (let i = 0; i < activeCount; i++) {
              const pt = trail[i];
              const dx = gx - pt.x;
              const dy = gy - pt.y;
              const distSq = dx * dx + dy * dy;
              const infSq = influenceRadius * influenceRadius;

              if (distSq < infSq) {
                const dist = Math.sqrt(distSq);
                const ageRatio = 1 - (now - pt.created) / pt.lifetime;
                // Cubic smooth-step falloff
                const spatialFalloff = 1 - dist / influenceRadius;
                const pointInfluence = spatialFalloff * spatialFalloff * (3 - 2 * spatialFalloff) * ageRatio;
                
                totalInfluence += pointInfluence;
                if (totalInfluence >= 1.2) {
                  totalInfluence = 1.2;
                  break;
                }
              }
            }

            if (totalInfluence > 0.02) {
              const clamped = Math.min(1, totalInfluence);
              // Halftone dot radius modulation matching video
              const radius = minDotRadius + (maxDotRadius - minDotRadius) * Math.pow(clamped, 0.7);
              const alpha = Math.min(1, 0.15 + clamped * 0.85);

              ctx.globalAlpha = alpha;
              ctx.beginPath();
              ctx.arc(gx, gy, radius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        ctx.globalAlpha = 1.0;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      ro.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [spacing, maxDotRadius, minDotRadius, influenceRadius, activeDotColor, addTrailPoint]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden select-none ${className}`}
      style={{ backgroundColor, ...style }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </div>
  );
}
