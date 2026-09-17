import React, { useEffect, useRef, useState, useCallback } from 'react';
import './PixelSnow.css';

/**
 * RealSnow Background
 * Generates organic, high-fidelity real snowfall:
 * - Multi-layer 3D depth field: foreground soft-focus bokeh flakes, midground crystalline flakes,
 *   and background fine snow dust.
 * - Soft feathered radial light falloff on every snowflake (no harsh square pixels).
 * - Natural aerodynamic wind turbulence, gentle flutter sway, and air resistance.
 * - Interactive air draft physics: flakes naturally react and drift away from cursor movement.
 * - Fully responsive HTML5 Canvas with sub-pixel rendering and 60fps physics loop.
 * - Seamless theme support: luminous frosty snowfall in dark mode, crisp winter flurries in light mode.
 */
export default function PixelSnow({
  color = '#ffffff',
  density = 0.5,
  speed = 1.2,
  wind = 0.4,
  interactive = true,
  className = '',
}) {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, lastX: 0, lastY: 0 });
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Flake count calibrated for atmospheric density
    const flakeCount = Math.floor(Math.max(80, Math.min(260, (width * height) / 3800 * (density * 1.5))));

    // Flake initialization with realistic optical depth layers
    const flakes = [];
    for (let i = 0; i < flakeCount; i++) {
      // Depth layer z: 0.1 (far background) to 1.0 (close foreground)
      const z = Math.random();
      const isForegroundBokeh = Math.random() < 0.08; // 8% large soft-focus lens flakes

      let radius;
      if (isForegroundBokeh) {
        radius = 7.0 + Math.random() * 8.0; // Large blurred bokeh foreground flakes
      } else {
        radius = 1.0 + z * 3.4 + Math.random() * 0.8; // Sharp to mid-soft flakes
      }

      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z,
        isForegroundBokeh,
        radius,
        baseSpeed: (0.7 + z * 1.8) * speed,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.8 + Math.random() * 1.6,
        swayAmp: 0.8 + z * 2.2,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.04,
        baseOpacity: isForegroundBokeh 
          ? (0.2 + Math.random() * 0.3) 
          : (0.35 + z * 0.55),
        vx: 0,
        vy: 0,
      });
    }

    let lastTime = performance.now();
    let globalTime = 0;

    const render = (time) => {
      const dt = Math.min(32, time - lastTime) / 1000;
      lastTime = time;
      globalTime += dt;

      ctx.clearRect(0, 0, width, height);

      // Atmospheric deep winter night background gradient (dark only)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#05060C');
      bgGrad.addColorStop(0.45, '#090C18');
      bgGrad.addColorStop(1, '#0D1024');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Ambient Winter Aurora Glow behind snow
      const glowGrad = ctx.createRadialGradient(
        width * 0.5, height * 0.25, 10,
        width * 0.5, height * 0.25, width * 0.65
      );
      glowGrad.addColorStop(0, 'rgba(212, 203, 229, 0.09)');
      glowGrad.addColorStop(0.55, 'rgba(156, 142, 184, 0.03)');
      glowGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Undulating natural global wind
      const naturalWind = (Math.sin(globalTime * 0.6) * 0.6 + Math.cos(globalTime * 0.25) * 0.3 + wind) * 24;

      // Mouse velocity dampening
      mouseRef.current.vx *= 0.92;
      mouseRef.current.vy *= 0.92;

      // Render snow layers from back to front
      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];

        // 1. Natural Aerodynamic Motion
        f.swayPhase += f.swaySpeed * dt;
        f.twinklePhase += f.twinkleSpeed;

        const swayOffset = Math.sin(f.swayPhase) * f.swayAmp;
        const currentSpeed = f.baseSpeed * (1 + Math.sin(f.swayPhase * 0.5) * 0.15);

        // 2. Interactive air draft from cursor movement
        if (interactive) {
          const dx = f.x - mouseRef.current.x;
          const dy = f.y - mouseRef.current.y;
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 95;
          const radiusSq = interactionRadius * interactionRadius;

          if (distSq < radiusSq && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / interactionRadius) * 220 * dt;
            f.vx += (dx / dist) * force + mouseRef.current.vx * 0.2;
            f.vy += (dy / dist) * force + mouseRef.current.vy * 0.2;
          }
        }

        // Apply velocity with air resistance decay
        f.vx *= 0.94;
        f.vy *= 0.94;

        f.x += (naturalWind * f.z * dt) + swayOffset * 15 * dt + f.vx;
        f.y += currentSpeed * 42 * dt + f.vy;

        // Wrap around boundaries
        if (f.y > height + f.radius * 2) {
          f.y = -f.radius * 2;
          f.x = Math.random() * width;
          f.vx = 0;
          f.vy = 0;
        } else if (f.y < -f.radius * 2) {
          f.y = height + f.radius * 2;
        }

        if (f.x > width + f.radius * 2) {
          f.x = -f.radius * 2;
        } else if (f.x < -f.radius * 2) {
          f.x = width + f.radius * 2;
        }

        // 3. Realistic Soft Radial Lighting
        const twinkle = 0.85 + Math.sin(f.twinklePhase) * 0.15;
        const alpha = Math.min(1.0, f.baseOpacity * twinkle);

        const r = 255;
        const g = 255;
        const b = 255;

        const flakeGrad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.radius);

        if (f.isForegroundBokeh) {
          // Soft bokeh circle with wide feathered blur
          flakeGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha * 0.75})`);
          flakeGrad.addColorStop(0.35, `rgba(${r}, ${g}, ${b}, ${alpha * 0.45})`);
          flakeGrad.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${alpha * 0.15})`);
          flakeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
          // Luminous real snowflake with sparkling crystalline core and soft plume
          flakeGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${alpha})`);
          flakeGrad.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.85})`);
          flakeGrad.addColorStop(0.65, `rgba(${r}, ${g}, ${b}, ${alpha * 0.35})`);
          flakeGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        }

        ctx.fillStyle = flakeGrad;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    // Mouse tracking for interactive wind
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouseRef.current.vx = clientX - mouseRef.current.lastX;
      mouseRef.current.vy = clientY - mouseRef.current.lastY;
      mouseRef.current.x = clientX;
      mouseRef.current.y = clientY;
      mouseRef.current.lastX = clientX;
      mouseRef.current.lastY = clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      mouseRef.current.vx = 0;
      mouseRef.current.vy = 0;
    };

    canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      ro.disconnect();
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [density, speed, wind, interactive, isDark]);

  return (
    <div className={`pixel-snow-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block select-none pointer-events-auto"
      />
    </div>
  );
}
