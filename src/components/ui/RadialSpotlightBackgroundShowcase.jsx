import React, { useState, useEffect, useRef } from 'react';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `dark radial spotlight interacting with mouse movement, subtle grainy noise overlay`;

export default function RadialSpotlightBackgroundShowcase() {
    const [copied, setCopied] = useState(false);
    const containerRef = useRef(null);
    
    // Mouse tracking for spotlight
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 100 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };
        const container = containerRef.current;
        if (container) {
            container.addEventListener("mousemove", handleMouseMove);
            // Center initially
            const rect = container.getBoundingClientRect();
            mouseX.set(rect.width / 2);
            mouseY.set(rect.height / 2);
        }
        return () => {
            if (container) container.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mouseX, mouseY]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* PREVIEW SECTION */}
            <div 
                ref={containerRef}
                className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-2xl flex items-center justify-center p-8 group cursor-crosshair"
            >
                
                {/* 🌌 MOTION BACKGROUND */}
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute inset-0 z-10 opacity-40 mix-blend-overlay"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                    />
                    
                    <motion.div
                        className="absolute w-[600px] h-[600px] bg-white rounded-full blur-[120px] opacity-10 mix-blend-screen -ml-[300px] -mt-[300px]"
                        style={{ x: smoothX, y: smoothY }}
                    />
                    
                    <div className="absolute inset-0 bg-[#050505] mix-blend-multiply opacity-50"></div>
                </div>

                <BackgroundHeroOverlay />
            </div>

            {/* 📋 PROMPT CARD */}
</div>
    );
}
