import React, { useEffect, useRef, useState } from 'react';
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
        <div ref={containerRef} className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-black shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full mix-blend-screen" />
                
                {/* 📝 DUMMY CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 mb-6 rounded-full border border-white/10 bg-white/5 text-white/50 text-[11px] font-medium tracking-widest uppercase">
                        Purrform
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm">
                        Hyperspace
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                        Cinematic 3D forward projection rendering infinite trailing star rays.
                    </motion.p>
                </div>
            </div>

            {/* 📋 PROMPT CARD */}
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
