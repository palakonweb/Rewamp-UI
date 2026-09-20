import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `hyper-speed 3D starfield warp effect, pushing particles dynamically towards the viewer`;

class WarpStar {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.z = Math.random() * canvas.width; // initial depth random
    }
    reset() {
        this.x = (Math.random() - 0.5) * this.canvas.width * 2;
        this.y = (Math.random() - 0.5) * this.canvas.height * 2;
        this.z = this.canvas.width;
        this.pz = this.z;
    }
    update(speed) {
        this.z -= speed;
        if (this.z < 1) {
            this.reset();
        }
    }
    draw(ctx, cx, cy) {
        const sx = (this.x / this.z) * cx + cx;
        const sy = (this.y / this.z) * cy + cy;

        const r = Math.max(0.1, (1 - this.z / this.canvas.width) * 3);
        
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();

        // draw streak
        const px = (this.x / this.pz) * cx + cx;
        const py = (this.y / this.pz) * cy + cy;
        
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - this.z/this.canvas.width})`;
        ctx.lineWidth = r;
        ctx.stroke();

        this.pz = this.z;
    }
}

export default function HyperspeedWarpShowcase() {
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

        const stars = Array.from({ length: 400 }, () => new WarpStar(canvas));

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'; // trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;
            const speed = 15; // Warp speed

            stars.forEach(star => {
                star.update(speed);
                star.draw(ctx, cx, cy);
            });

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
        <div ref={containerRef} className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full flex-1 min-h-0 rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-black shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full mix-blend-screen" />
                
                <BackgroundHeroOverlay />
            </div>

            {/* PROMPT CARD */}
</div>
    );
}
