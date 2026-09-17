import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
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
                    
                    ctx.fillStyle = `rgba(212, 203, 229, ${opacity})`; // Brand lilac #D4CBE5
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
                
                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
