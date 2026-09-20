import React, { useRef, useState, useEffect } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { Copy, Check } from 'lucide-react';

const promptContent = `Elastic Line Grid Background. A highly interactive canvas background where a geometric grid of lines physically stretches, bends, and snaps back with elastic spring physics as the cursor drags through them.`;

export default function ElasticLineGridShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const lastMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const spacing = 40; // Spacing between grid lines
    let points = [];
    let cols, rows;

    class Point {
      constructor(x, y) {
        this.baseX = x;
        this.baseY = y;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
      }
      update(mouseX, mouseY, mouseVx, mouseVy) {
        // Calculate distance to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Magnetic repulsion/pull from mouse velocity
        if (dist < 100) {
           const force = (100 - dist) / 100;
           // If mouse is moving fast, pull points along with it
           this.vx += mouseVx * force * 0.05;
           this.vy += mouseVy * force * 0.05;
           
           // Also push away slightly from center
           this.vx -= (dx / dist) * force * 2;
           this.vy -= (dy / dist) * force * 2;
        }

        // Spring force back to base position
        const spring = 0.05; // Stiffness
        const friction = 0.8; // Damping

        this.vx += (this.baseX - this.x) * spring;
        this.vy += (this.baseY - this.y) * spring;

        this.vx *= friction;
        this.vy *= friction;

        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      cols = Math.floor(canvas.width / spacing) + 1;
      rows = Math.floor(canvas.height / spacing) + 1;
      
      points = [];
      for (let i = 0; i <= cols; i++) {
        const col = [];
        for (let j = 0; j <= rows; j++) {
          col.push(new Point(i * spacing, j * spacing));
        }
        points.push(col);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const vx = x - lastMouseRef.current.x;
      const vy = y - lastMouseRef.current.y;

      mouseRef.current = { x, y, vx, vy };
      lastMouseRef.current = { x, y };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000, vx: 0, vy: 0 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      const { x, y, vx, vy } = mouseRef.current;

      // Update all points
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          points[i][j].update(x, y, vx, vy);
        }
      }

      // Draw horizontal lines
      for (let j = 0; j <= rows; j++) {
        ctx.beginPath();
        for (let i = 0; i <= cols; i++) {
          const p = points[i][j];
          if (i === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let i = 0; i <= cols; i++) {
        ctx.beginPath();
        for (let j = 0; j <= rows; j++) {
          const p = points[i][j];
          if (j === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
      }
      
      // Decay mouse velocity
      mouseRef.current.vx *= 0.9;
      mouseRef.current.vy *= 0.9;

      animationId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 flex-1 min-h-0 bg-[#000002] cursor-crosshair">
        
        {/* The interactive canvas */}
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 0 }}
        />

        <BackgroundHeroOverlay />
      </div>
</div>
  );
}
