import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `advanced plexus engine, interactive floating nodes drawing geometric connection lines based on proximity`;

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 1;
        this.vy = (Math.random() - 0.5) * 1;
        this.radius = Math.random() * 2 + 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
    }
}

export default function PlexusEngineShowcase() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isVisible = false;

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const particles = Array.from({ length: 80 }, () => new Particle(canvas));
        let mouse = { x: null, y: null };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };
        
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw(ctx);
                
                // Check proximity with other particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist/120})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }

                // Check proximity with mouse
                if (mouse.x != null) {
                    const dx = particles[i].x - mouse.x;
                    const dy = particles[i].y - mouse.y;
                    const dist = Math.sqrt(dx*dx + dy*dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(212, 203, 229, ${1 - dist/150})`;
                        ctx.lineWidth = 1.2;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(render);
        };

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        });
        if (containerRef.current) observer.observe(containerRef.current);

        render();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full flex-1 min-h-0 rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#080808] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full bg-gradient-to-br from-[#0c0c0c] to-[#040404]" />
                
                <BackgroundHeroOverlay />
            </div>

            {/* PROMPT CARD */}
</div>
    );
}
