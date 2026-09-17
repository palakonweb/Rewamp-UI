import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `brand-lilac meteor streaks — bright falling heads trailing a tapered luminous tail across a dark canvas`;

// Brand lilac palette (from index.css --lilac-*) used for the meteor heads/tails.
const METEOR_COLORS = ['212,203,229', '193,180,216', '228,221,240'];

class Beam {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.y = Math.random() * canvas.height; // randomize initial position along the flight path
    }
    reset() {
        this.x = (Math.random() - 0.5) * this.canvas.width * 2;
        this.y = -120;
        this.length = Math.random() * 260 + 140;
        this.speed = Math.random() * 7 + 5;
        this.headSize = Math.random() * 2 + 1.6;
        this.angle = Math.PI / 4 + (Math.random() * 0.08 - 0.04); // ~45deg falling
        this.opacity = Math.random() * 0.5 + 0.4;
        this.color = METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)];
    }
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.y - this.length > this.canvas.height || this.x - this.length > this.canvas.width) {
            this.reset();
        }
    }
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        // Tapered glowing tail: bright at the head (0), fading to nothing at the tail end.
        const tail = ctx.createLinearGradient(-this.length, 0, 0, 0);
        tail.addColorStop(0, `rgba(${this.color}, 0)`);
        tail.addColorStop(0.75, `rgba(${this.color}, ${this.opacity * 0.35})`);
        tail.addColorStop(1, `rgba(${this.color}, ${this.opacity})`);

        ctx.fillStyle = tail;
        ctx.beginPath();
        ctx.moveTo(-this.length, -0.5);
        ctx.lineTo(0, -this.headSize);
        ctx.lineTo(0, this.headSize);
        ctx.lineTo(-this.length, 0.5);
        ctx.closePath();
        ctx.fill();

        // Bright meteor head with soft glow
        ctx.shadowColor = `rgba(${this.color}, 0.9)`;
        ctx.shadowBlur = this.headSize * 6;
        ctx.fillStyle = `rgba(${this.color}, ${Math.min(1, this.opacity * 1.4)})`;
        ctx.beginPath();
        ctx.arc(0, 0, this.headSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }
}

export default function RefractedBeamsShowcase() {
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

        const beams = Array.from({ length: 15 }, () => new Beam(canvas));

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.fillStyle = '#050508';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            // Add global composite operation for bloom
            ctx.globalCompositeOperation = 'screen';

            beams.forEach(beam => {
                beam.update();
                beam.draw(ctx);
            });

            ctx.globalCompositeOperation = 'source-over';

            animationFrameId = requestAnimationFrame(render);
        };

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        });
        if (containerRef.current) observer.observe(containerRef.current);

        render();

        return () => {
            window.removeEventListener('resize', resize);
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
        <div ref={containerRef} className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050508] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
                
                <BackgroundHeroOverlay />
            </div>
</div>
    );
}
