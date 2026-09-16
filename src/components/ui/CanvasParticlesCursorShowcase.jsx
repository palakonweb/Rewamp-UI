import React, { useEffect, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const promptContent = `Canvas 2D particle sparks cursor, mouse movement emits physics-based glowing sparks that bounce, fade, and react to velocity, extremely stable high-performance animation without WebGL`;

export default function CanvasParticlesCursorShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -100, y: -100, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: -100, y: -100 });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 800, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 800, damping: 40 });

  const [isHovering, setIsHovering] = useState(false);

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
        this.size = Math.random() * 3 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.15; // gravity
        this.vx *= 0.98; // friction
        this.life -= this.decay;
      }
      draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * Math.max(this.life, 0), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(this.life, 0);
        ctx.fill();
        
        // Glow
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      cursorX.set(x);
      cursorY.set(y);

      const vx = x - lastMouseRef.current.x;
      const vy = y - lastMouseRef.current.y;
      
      mouseRef.current = { x, y, vx, vy };
      lastMouseRef.current = { x, y };

      // Only emit if moving, preventing initial jump
      if (Math.abs(vx) > 0.1 || Math.abs(vy) > 0.1) {
        const speed = Math.sqrt(vx * vx + vy * vy);
        const count = Math.min(Math.floor(speed * 0.5), 12);
        
        for (let i = 0; i < count; i++) {
          particlesRef.current.push(new Particle(x, y, vx, vy));
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const render = () => {
      // Trail effect using semi-transparent fill
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = 'lighter';
      
      // Iterate backwards to safely remove items while looping
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.update();
        if (p.life > 0) {
            p.draw(ctx);
        } else {
            particlesRef.current.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div 
        className="relative w-full rounded-[24px] overflow-hidden border border-white/[0.04] min-h-[500px] cursor-none bg-[#0a0a0f]"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => { setIsHovering(false); cursorX.set(-100); cursorY.set(-100); }}
      >
        
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-20 pointer-events-auto" />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] mb-4 text-white/30">Canvas 2D Physics</p>
          <h2 className="text-[40px] sm:text-[60px] font-black tracking-tight text-white/90">
            Velocity Sparks
          </h2>
          <p className="text-[13px] mt-4 text-white/40 max-w-sm mx-auto">
            Move fast to emit more particles. The sparks inherit your mouse velocity and are pulled by gravity.
          </p>
        </div>

        {/* Crisp DOM-based cursor dot */}
        <motion.div 
            className="absolute top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-30 shadow-[0_0_10px_white]"
            style={{
                x: springX,
                y: springY,
                translateX: '-50%',
                translateY: '-50%',
                opacity: isHovering ? 1 : 0
            }}
        />

      </div>
</div>
  );
}
