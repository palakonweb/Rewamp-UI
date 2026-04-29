import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `futuristic sharp refracted laser light beams intersecting dynamically over a dark canvas`;

class Beam {
    constructor(canvas) {
        this.canvas = canvas;
        this.reset();
        this.x = Math.random() * canvas.width; // randomize start position
    }
    reset() {
        this.x = (Math.random() - 0.5) * this.canvas.width * 2;
        this.y = -100;
        this.length = Math.random() * 400 + 200;
        this.speed = Math.random() * 8 + 4;
        this.width = Math.random() * 100 + 20;
        this.angle = Math.PI / 4 + (Math.random() * 0.1 - 0.05); // 45 deg mostly
        this.opacity = Math.random() * 0.15 + 0.05;
        this.color = Math.random() > 0.5 ? '255,255,255' : '154,0,2'; // white or cherry
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

        const gradient = ctx.createLinearGradient(0, -this.width/2, 0, this.width/2);
        gradient.addColorStop(0, `rgba(${this.color}, 0)`);
        gradient.addColorStop(0.5, `rgba(${this.color}, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(${this.color}, 0)`);

        ctx.fillStyle = gradient;
        ctx.fillRect(-this.length/2, -this.width/2, this.length, this.width);
        
        // Solid core
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity * 2})`;
        ctx.fillRect(-this.length/2, -1, this.length, 2);

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
                
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 text-white/50 text-[11px] font-medium tracking-widest uppercase">
                        Conjure UI
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm">
                        Refracted Beams
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                        Sharp geometric light rays powered by Canvas 2D composite blending operations.
                    </motion.p>
                </div>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <motion.button onClick={handleCopy} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </motion.button>
            </div>
        </div>
    );
}
