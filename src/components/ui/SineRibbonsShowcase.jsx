import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `elegant overlapping translucent sine ribbons blending colors, native canvas rendering`;

export default function SineRibbonsShowcase() {
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

        const ribbons = [
            { color: 'rgba(56, 189, 248, 0.15)', speed: 0.015, offset: 0, amp: 80, freq: 0.003 },
            { color: 'rgba(168, 85, 247, 0.15)', speed: 0.02, offset: 1.5, amp: 120, freq: 0.002 },
            { color: 'rgba(236, 72, 153, 0.15)', speed: 0.01, offset: 3, amp: 90, freq: 0.004 },
            { color: 'rgba(255, 255, 255, 0.1)', speed: 0.025, offset: 4.5, amp: 60, freq: 0.0025 }
        ];

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            // Using clearRect instead of fillRect for pure alpha blending
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Black bg
            ctx.fillStyle = '#050505';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            time += 1;

            const centerY = canvas.height / 2 + 50;

            ribbons.forEach((ribbon, i) => {
                ctx.beginPath();
                ctx.moveTo(0, centerY);

                for (let x = 0; x < canvas.width; x += 5) {
                    // Combine a primary sine and a secondary sine for more organic curve
                    const y = centerY 
                        + Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.offset) * ribbon.amp
                        + Math.cos(x * ribbon.freq * 2 + time * ribbon.speed * 0.5) * (ribbon.amp * 0.5);
                    
                    ctx.lineTo(x, y);
                }

                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();

                // Advanced gradient fill
                const gradient = ctx.createLinearGradient(0, centerY - ribbon.amp*2, 0, canvas.height);
                gradient.addColorStop(0, ribbon.color);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                
                ctx.fillStyle = gradient;
                ctx.fill();

                // Draw edge line
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 5) {
                    const y = centerY 
                        + Math.sin(x * ribbon.freq + time * ribbon.speed + ribbon.offset) * ribbon.amp
                        + Math.cos(x * ribbon.freq * 2 + time * ribbon.speed * 0.5) * (ribbon.amp * 0.5);
                    
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = ribbon.color.replace('0.15', '0.6').replace('0.1)', '0.4)');
                ctx.lineWidth = 1.5;
                ctx.stroke();
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
            <div className="relative w-full flex-1 min-h-0 rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full mix-blend-screen" />
                
                <BackgroundHeroOverlay />
            </div>
</div>
    );
}
