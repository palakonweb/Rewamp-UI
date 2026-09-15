import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `cursor-tracking googly eyes button`;

function Eye({ mouseX, mouseY }) {
    const eyeRef = useRef(null);
    const pupilX = useMotionValue(0);
    const pupilY = useMotionValue(0);
    
    // Smooth physics
    const springX = useSpring(pupilX, { stiffness: 300, damping: 20 });
    const springY = useSpring(pupilY, { stiffness: 300, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!eyeRef.current) return;
            const rect = eyeRef.current.getBoundingClientRect();
            // Center of the eye
            const eyeCenterX = rect.left + rect.width / 2;
            const eyeCenterY = rect.top + rect.height / 2;
            
            // Calculate angle
            const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
            
            // Distance from center, clamped to max radius so pupil stays in eye
            const distance = Math.min(
                12, // max radius pupil can move
                Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10
            );

            pupilX.set(Math.cos(angle) * distance);
            pupilY.set(Math.sin(angle) * distance);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [pupilX, pupilY]);

    return (
        <div ref={eyeRef} className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center relative shadow-inner overflow-hidden">
            <motion.div 
                style={{ x: springX, y: springY }}
                className="w-[14px] h-[14px] bg-black rounded-full absolute"
            />
        </div>
    );
}

export default function GooglyEyesButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-4 bg-black pl-8 pr-3 py-3 rounded-full shadow-2xl cursor-pointer select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <span className="text-white text-xl font-semibold tracking-tight mr-4 whitespace-nowrap">Get in touch</span>
                    <div className="flex items-center gap-2">
                        <Eye />
                        <Eye />
                    </div>
                </motion.button>
                
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
