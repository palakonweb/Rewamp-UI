import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `thousands of glowing data points mathematically bound to a 3D oscillating sine wave generating an ocean-like data surface`;

export default function ParticleWaveShowcase() {
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

        let time = 0;
        const columns = 80;
        const rows = 40;
        const spacing = 18;

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            ctx.fillStyle = 'rgba(5, 5, 8, 1)'; // Solid dark fill acting as clear
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            time += 0.05;

            // Compute center offsets
            const cx = canvas.width / 2;
            const cy = canvas.height / 2 + 50; // shift down slightly
            
            for (let i = 0; i < columns; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = (i - columns / 2) * spacing;
                    const z = (j - rows / 2) * spacing;
                    
                    // Wave math
                    const y = Math.sin(i * 0.2 + time) * 30 + Math.cos(j * 0.2 + time) * 30;
                    
                    // Simple 3D projection
                    const fov = 300;
                    const perspective = fov / (fov + z + 200); // push back a bit
                    
                    if (perspective < 0) continue; // behind camera
                    
                    const screenX = cx + x * perspective;
                    const screenY = cy + y * perspective - (z * 0.5); // tilts the plane

                    const size = Math.max(0.1, perspective * 2);
                    const opacity = Math.max(0, perspective - 0.2); // fade out distant
                    
                    ctx.fillStyle = `rgba(154, 0, 2, ${opacity})`; // Cherry red
                    ctx.beginPath();
                    ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
                    ctx.fill();
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
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050508] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />
                
                {/* 📝 DUMMY CONTENT */}
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 mb-6 rounded-full border border-[var(--color-accent-red)]/20 bg-[var(--color-accent-red)]/5 text-[var(--color-accent-red)] text-[11px] font-medium tracking-widest uppercase">
                        Conjure UI
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm">
                        Particle Wave
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                        A hypnotic 3D mathematical sine wave projection rendered immaculately on HTML5 Canvas.
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
