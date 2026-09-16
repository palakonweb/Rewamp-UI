import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
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
                
                <BackgroundHeroOverlay />
            </div>
</div>
    );
}
