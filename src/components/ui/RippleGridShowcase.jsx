import React, { useRef, useState, useEffect } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `Ripple Grid Background, interactive canvas background. A dense matrix of tiny dots physically scales up and reacts in a wave pattern as the cursor moves through them, high performance canvas rendering.`;

export default function RippleGridShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const spacing = 30; // Distance between dots
    let cols, rows;
    let dots = [];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      cols = Math.floor(canvas.width / spacing) + 2;
      rows = Math.floor(canvas.height / spacing) + 2;
      
      dots = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * spacing,
            y: j * spacing,
            baseRadius: 1.5,
            targetRadius: 1.5,
            currentRadius: 1.5,
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationId;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';

      const mouseX = mouseRef.current.x;
      const mouseY = mouseRef.current.y;

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        
        // Calculate distance to mouse
        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction radius
        const maxDist = 120;
        
        if (dist < maxDist) {
            // Scale up based on proximity
            const scale = 1 - (dist / maxDist);
            dot.targetRadius = dot.baseRadius + (scale * 4);
        } else {
            dot.targetRadius = dot.baseRadius;
        }

        // Smooth easing (spring-like)
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * 0.15;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

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
      <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 flex-1 min-h-0 bg-[#050507]">
        
        {/* The interactive canvas */}
        <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full cursor-crosshair"
            style={{ zIndex: 0 }}
        />

        <BackgroundHeroOverlay />
      </div>
</div>
  );
}
