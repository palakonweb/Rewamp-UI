import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `sleek modern digital rain, minimalist matrix effect with pure typography and cherry red leading edge`;

export default function DigitalRainShowcase() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isVisible = false;

        let columns = 0;
        let drops = [];
        const fontSize = 14;

        const resize = () => {
            canvas.width = canvas.parentElement.clientWidth;
            canvas.height = canvas.parentElement.clientHeight;
            
            columns = Math.floor(canvas.width / fontSize);
            drops = [];
            for(let i = 0; i < columns; i++) {
                drops[i] = Math.random() * -100; // start randomly above
            }
        };
        
        window.addEventListener('resize', resize);
        resize();

        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_$#@'.split('');

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Translucent black creates trail effect
            ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'; 
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for(let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                
                // Leading character is Cherry Red, trails are subdued
                ctx.fillStyle = Math.random() > 0.95 ? '#ffffff' : 'rgba(154, 0, 2, 0.8)';
                
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            // We use setTimeout wrapping rAF to throttle speed slightly for matrix rain
            setTimeout(() => {
                animationFrameId = requestAnimationFrame(render);
            }, 30);
        };

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        });
        if (containerRef.current) observer.observe(containerRef.current);

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(animationFrameId);
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
            <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full mix-blend-screen" />
                
                <div className="relative z-20 flex flex-col items-center text-center max-w-lg pointer-events-none">
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="px-3 py-1 mb-6 rounded-full border border-white/10 bg-[#050505] text-white/80 text-[11px] font-medium tracking-widest uppercase">
                        Conjure UI
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="text-4xl md:text-6xl font-semibold text-white tracking-tight mb-4 drop-shadow-sm">
                        Digital Rain
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="text-white/60 text-base md:text-lg font-light leading-relaxed mb-8 max-w-md">
                        A clean, minimalist matrix simulation perfectly optimized for modern dark mode aesthetics.
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
