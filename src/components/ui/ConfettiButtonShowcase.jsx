import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, PartyPopper } from 'lucide-react';

const promptContent = `canvas confetti bursting button animation on click`;

class ConfettiParticle {
    constructor(canvas, x, y) {
        this.canvas = canvas;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 15;
        this.vy = (Math.random() - 1) * 15 - 5;
        this.size = Math.random() * 8 + 4;
        this.color = ['#ff3b3b', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'][Math.floor(Math.random() * 5)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 20;
        this.gravity = 0.5;
        this.opacity = 1;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += this.gravity;
        this.rotation += this.rotationSpeed;
        this.opacity -= 0.015;
    }
    draw(ctx) {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

export default function ConfettiButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const canvasRef = useRef(null);
    const buttonRef = useRef(null);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw(ctx);
                if (particles[i].opacity <= 0) {
                    particles.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [particles]);

    const fireConfetti = (e) => {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newParticles = Array.from({ length: 40 }, () => new ConfettiParticle(canvasRef.current, x, y));
        setParticles(prev => [...prev, ...newParticles]);
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">
                
                {/* 💥 EXPLOSION CANVAS OVERLAY */}
                <canvas ref={canvasRef} className="absolute inset-0 z-20 pointer-events-none w-full h-full" />

                {/* 🎯 THE BUTTON */}
                <motion.button 
                    ref={buttonRef}
                    onClick={fireConfetti}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 flex items-center gap-3 bg-[var(--color-accent-red)] text-white px-8 py-4 rounded-full text-[17px] font-bold tracking-wide shadow-[0_10px_20px_rgba(154,0,2,0.3)] transition-all"
                >
                    <PartyPopper className="w-5 h-5" />
                    Celebrate
                </motion.button>
                
                <span className="absolute bottom-6 text-black/40 dark:text-white/40 text-[13px] font-semibold tracking-widest uppercase">Canvas Confetti UI</span>
            </div>
</div>
    );
}
