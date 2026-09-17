import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `cursor-tracking googly eyes button that goes smirky-eyed and swaps its label to "Will touch you" on click`;

function Eye({ smirk = false, side = 'left' }) {
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
        <motion.div
            ref={eyeRef}
            animate={
                smirk
                    ? { scaleY: 0.42, rotate: side === 'left' ? -4 : 4 }
                    : { scaleY: 1, rotate: 0 }
            }
            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            className="w-[38px] h-[38px] bg-white rounded-full flex items-center justify-center relative shadow-inner overflow-hidden"
        >
            {/* Pupil: glowing red + evil vertical slit when smirking */}
            <motion.div
                style={{ x: springX, y: springY }}
                animate={{
                    y: smirk ? 2 : 0,
                    scaleX: smirk ? 0.5 : 1,
                    scaleY: smirk ? 1.6 : 1,
                    backgroundColor: smirk ? '#7A0000' : '#000000',
                    boxShadow: smirk ? '0 0 6px 1px rgba(255,0,0,0.65)' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-[14px] h-[14px] rounded-full absolute"
            />
            {/* Angled evil brow/eyelid — slants inward toward the center like a furrowed glare */}
            <motion.div
                initial={false}
                animate={{
                    height: smirk ? 22 : 0,
                    rotate: smirk ? (side === 'left' ? 14 : -14) : 0,
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="absolute -top-1.5 -left-2 -right-2 bg-[#0a0a0a] pointer-events-none"
                style={{ transformOrigin: side === 'left' ? 'top right' : 'top left' }}
            />
        </motion.div>
    );
}

export default function GooglyEyesButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [clicked, setClicked] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">

                {/* 🎯 THE BUTTON */}
                <motion.button
                    onClick={() => setClicked((prev) => !prev)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative flex items-center gap-3 bg-black pl-6 pr-3 py-2.5 rounded-full shadow-2xl cursor-pointer select-none"
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    <div className="relative h-[20px] w-[100px] mr-2 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={clicked ? 'clicked' : 'default'}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute inset-0 flex items-center text-white text-sm font-semibold tracking-tight whitespace-nowrap"
                            >
                                {clicked ? 'Will touch you' : 'Get in touch'}
                            </motion.span>
                        </AnimatePresence>
                    </div>
                    <div className="flex items-center gap-2">
                        <Eye smirk={clicked} side="left" />
                        <Eye smirk={clicked} side="right" />
                    </div>
                </motion.button>

            </div>
</div>
    );
}
