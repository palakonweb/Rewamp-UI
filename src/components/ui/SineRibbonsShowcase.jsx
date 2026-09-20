import React, { useEffect, useRef, useState } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';

const promptContent = `elegant overlapping translucent sine ribbons blending colors with interactive wave dynamics and multi-harmonic chromatic gradients`;

export default function SineRibbonsShowcase() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0, targetX: -1000, targetY: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let isVisible = false;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            const w = parent.clientWidth;
            const h = parent.clientHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = `${w}px`;
            canvas.style.height = `${h}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        window.addEventListener('resize', resize);
        resize();

        let time = 0;

        // RewampUI Lilac Brand Palette Harmonic Ribbons
        const ribbons = [
            {
                baseY: 0.58,
                thickness: 60,
                speed: 0.012,
                amp: 55,
                freq: 0.0032,
                phase: 0,
                harmonics: [
                    { freq: 0.006, amp: 24, speed: 0.018 },
                    { freq: 0.012, amp: 10, speed: -0.01 },
                ],
                colorStart: 'rgba(212, 203, 229, 0.55)', // lilac-500 (#D4CBE5)
                colorMid: 'rgba(193, 180, 216, 0.40)',   // lilac-600 (#C1B4D8)
                colorEnd: 'rgba(156, 142, 184, 0.12)',  // deep lilac (#9C8EB8)
                edgeColor: 'rgba(238, 234, 247, 0.92)',  // lilac-300 (#EEEAF7)
                lineWidth: 1.8,
            },
            {
                baseY: 0.52,
                thickness: 75,
                speed: 0.016,
                amp: 70,
                freq: 0.0026,
                phase: 1.8,
                harmonics: [
                    { freq: 0.005, amp: 30, speed: -0.014 },
                    { freq: 0.009, amp: 14, speed: 0.022 },
                ],
                colorStart: 'rgba(228, 221, 240, 0.50)', // lilac-400 (#E4DDF0)
                colorMid: 'rgba(107, 79, 148, 0.35)',   // deep plum (#6B4F94)
                colorEnd: 'rgba(212, 203, 229, 0.10)',  // lilac-500 (#D4CBE5)
                edgeColor: 'rgba(255, 255, 255, 0.95)',  // pure specular white
                lineWidth: 1.6,
            },
            {
                baseY: 0.64,
                thickness: 85,
                speed: 0.01,
                amp: 65,
                freq: 0.0022,
                phase: 3.4,
                harmonics: [
                    { freq: 0.0045, amp: 28, speed: 0.015 },
                    { freq: 0.008, amp: 16, speed: -0.012 },
                ],
                colorStart: 'rgba(156, 142, 184, 0.50)', // deep lilac (#9C8EB8)
                colorMid: 'rgba(193, 180, 216, 0.35)',   // lilac-600 (#C1B4D8)
                colorEnd: 'rgba(238, 234, 247, 0.08)',  // lilac-300 (#EEEAF7)
                edgeColor: 'rgba(228, 221, 240, 0.88)',  // lilac-400 (#E4DDF0)
                lineWidth: 1.5,
            },
            {
                baseY: 0.46,
                thickness: 50,
                speed: 0.02,
                amp: 45,
                freq: 0.0038,
                phase: 4.8,
                harmonics: [
                    { freq: 0.0075, amp: 20, speed: 0.024 },
                    { freq: 0.014, amp: 8, speed: -0.018 },
                ],
                colorStart: 'rgba(193, 180, 216, 0.45)', // lilac-600 (#C1B4D8)
                colorMid: 'rgba(212, 203, 229, 0.30)',   // lilac-500 (#D4CBE5)
                colorEnd: 'rgba(107, 79, 148, 0.08)',   // deep plum (#6B4F94)
                edgeColor: 'rgba(246, 244, 251, 0.92)',  // lilac-200 (#F6F4FB)
                lineWidth: 1.7,
            },
            {
                baseY: 0.55,
                thickness: 42,
                speed: 0.024,
                amp: 36,
                freq: 0.0045,
                phase: 2.3,
                harmonics: [
                    { freq: 0.009, amp: 16, speed: -0.02 },
                    { freq: 0.016, amp: 6, speed: 0.028 },
                ],
                colorStart: 'rgba(246, 244, 251, 0.40)', // lilac-200 (#F6F4FB)
                colorMid: 'rgba(228, 221, 240, 0.28)',   // lilac-400 (#E4DDF0)
                colorEnd: 'rgba(193, 180, 216, 0.08)',  // lilac-600 (#C1B4D8)
                edgeColor: 'rgba(255, 255, 255, 0.90)',  // pure specular white
                lineWidth: 1.4,
            },
        ];

        // Track smooth mouse position
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.targetX = e.clientX - rect.left;
            mouseRef.current.targetY = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouseRef.current.targetX = -1000;
            mouseRef.current.targetY = -1000;
        };

        canvas.addEventListener('mousemove', handleMouseMove, { passive: true });
        canvas.addEventListener('mouseleave', handleMouseLeave);

        const computeWaveY = (x, r, t, w, h) => {
            const baseY = h * r.baseY;
            let wave = Math.sin(x * r.freq + t * r.speed + r.phase) * r.amp;

            for (const hrm of r.harmonics) {
                wave += Math.sin(x * hrm.freq + t * hrm.speed) * hrm.amp;
            }

            // Interactive mouse repulsion/ripple
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            if (mx > -500) {
                const dx = x - mx;
                const dy = baseY - my;
                const dist = Math.hypot(dx, dy);
                const maxDist = 200;
                if (dist < maxDist) {
                    const influence = Math.pow(1 - dist / maxDist, 2);
                    wave += Math.sin(dist * 0.08 - t * 0.1) * (influence * 32);
                }
            }

            return baseY + wave;
        };

        const render = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(render);
                return;
            }

            const w = canvas.parentElement.clientWidth;
            const h = canvas.parentElement.clientHeight;

            // Smooth mouse easing
            const m = mouseRef.current;
            m.x += (m.targetX - m.x) * 0.08;
            m.y += (m.targetY - m.y) * 0.08;

            time += 1;

            ctx.clearRect(0, 0, w, h);

            // Deep brand obsidian background with subtle lilac ambient glow
            const bgGrad = ctx.createRadialGradient(w * 0.5, h * 0.45, 10, w * 0.5, h * 0.5, Math.max(w, h));
            bgGrad.addColorStop(0, '#0E0C16');
            bgGrad.addColorStop(0.5, '#08070E');
            bgGrad.addColorStop(1, '#040307');
            ctx.fillStyle = bgGrad;
            ctx.fillRect(0, 0, w, h);

            // Soft atmospheric brand lilac glow behind ribbons
            const glowGrad = ctx.createRadialGradient(w * 0.5, h * 0.55, 20, w * 0.5, h * 0.55, w * 0.6);
            glowGrad.addColorStop(0, 'rgba(193, 180, 216, 0.16)'); // lilac-600
            glowGrad.addColorStop(0.4, 'rgba(107, 79, 148, 0.08)'); // brand plum
            glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = glowGrad;
            ctx.fillRect(0, 0, w, h);

            ctx.save();
            ctx.globalCompositeOperation = 'screen';

            const step = 4; // High-precision subpixel curve sampling

            ribbons.forEach((ribbon) => {
                // Pre-compute upper and lower bounds for the ribbon strip
                const upperPoints = [];
                const lowerPoints = [];

                for (let x = 0; x <= w + step; x += step) {
                    const y = computeWaveY(x, ribbon, time, w, h);
                    const halfThick = (ribbon.thickness / 2) * (0.7 + Math.sin(x * 0.004 + time * 0.01) * 0.3);
                    upperPoints.push({ x, y: y - halfThick });
                    lowerPoints.push({ x, y: y + halfThick });
                }

                // 1. Draw Ribbon Translucent Fill Strip
                ctx.beginPath();
                ctx.moveTo(upperPoints[0].x, upperPoints[0].y);
                for (let i = 1; i < upperPoints.length; i++) {
                    ctx.lineTo(upperPoints[i].x, upperPoints[i].y);
                }
                for (let i = lowerPoints.length - 1; i >= 0; i--) {
                    ctx.lineTo(lowerPoints[i].x, lowerPoints[i].y);
                }
                ctx.closePath();

                const ribbonGrad = ctx.createLinearGradient(0, 0, w, h);
                ribbonGrad.addColorStop(0, ribbon.colorStart);
                ribbonGrad.addColorStop(0.5, ribbon.colorMid);
                ribbonGrad.addColorStop(1, ribbon.colorEnd);

                ctx.fillStyle = ribbonGrad;
                ctx.fill();

                // 2. Glowing Upper Crest Edge Line
                ctx.beginPath();
                ctx.moveTo(upperPoints[0].x, upperPoints[0].y);
                for (let i = 1; i < upperPoints.length; i++) {
                    ctx.lineTo(upperPoints[i].x, upperPoints[i].y);
                }
                ctx.strokeStyle = ribbon.edgeColor;
                ctx.lineWidth = ribbon.lineWidth;
                ctx.shadowColor = ribbon.edgeColor;
                ctx.shadowBlur = 8;
                ctx.stroke();
                ctx.shadowBlur = 0;

                // 3. Subtle Lower Edge Accent Line
                ctx.beginPath();
                ctx.moveTo(lowerPoints[0].x, lowerPoints[0].y);
                for (let i = 1; i < lowerPoints.length; i++) {
                    ctx.lineTo(lowerPoints[i].x, lowerPoints[i].y);
                }
                ctx.strokeStyle = ribbon.colorStart.replace(/0\.\d+\)/, '0.35)');
                ctx.lineWidth = 1.0;
                ctx.stroke();
            });

            ctx.restore();

            animationFrameId = requestAnimationFrame(render);
        };

        const observer = new IntersectionObserver((entries) => {
            isVisible = entries[0].isIntersecting;
        });
        if (containerRef.current) observer.observe(containerRef.current);

        render();

        return () => {
            window.removeEventListener('resize', resize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto select-none">
            <div className="relative w-full flex-1 min-h-0 rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#090810] shadow-2xl flex items-center justify-center p-8 group">
                <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full cursor-crosshair" />
                
                <BackgroundHeroOverlay />
            </div>
        </div>
    );
}
