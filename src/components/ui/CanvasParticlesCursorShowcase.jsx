import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const promptContent = `Canvas 2D particle sparks cursor, mouse movement emits physics-based glowing sparks that bounce, fade, and react to velocity, extremely stable high-performance animation without WebGL`;

export default function CanvasParticlesCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['#00f2fe', '#4facfe', '#c9918a', '#7ec8c8'];

    class Particle {
      constructor(x, y, vx, vy) {
        this.x = x;
        this.y = y;
        // Base velocity + inherit 20% of mouse velocity
        this.vx = (Math.random() - 0.5) * 4 + vx * 0.2;
        this.vy = (Math.random() - 0.5) * 4 + vy * 0.2;
        this.life = 1.0;
        this.decay = Math.random() * 0.02 + 0.015;
        this.size = Math.random() * 3 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // gravity
        this.vx *= 0.98; // friction
        this.life -= this.decay;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const vx = x - lastMouseRef.current.x;
      const vy = y - lastMouseRef.current.y;
      
      mouseRef.current = { x, y, vx, vy };
      lastMouseRef.current = { x, y };

      // Emit particles based on speed
      const speed = Math.sqrt(vx * vx + vy * vy);
      const count = Math.min(Math.floor(speed * 0.5), 10);
      
      for (let i = 0; i < count; i++) {
        particlesRef.current.push(new Particle(x, y, vx, vy));
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const render = () => {
      // Trail effect using semi-transparent fill
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.2;
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';
      
      particlesRef.current.forEach((p, index) => {
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particlesRef.current.splice(index, 1);
      });

      // Draw cursor dot
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] min-h-[500px] cursor-none bg-[#0a0a0f]">
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-white/30">Canvas 2D Physics</p>
          <h2 className="text-[40px] sm:text-[60px] font-black tracking-tight text-white/90">
            Velocity Sparks
          </h2>
          <p className="text-[13px] mt-4 text-white/40 max-w-sm mx-auto">
            Move fast to emit more particles. The sparks inherit your mouse velocity and are pulled by gravity.
          </p>
        </div>
      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0"><p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt</p><code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code></div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
