import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// Site's own CTA purple (#9578BA, see Hero.jsx) in place of the reference's
// amber/orange glow, so this card reads as Rewamp UI's own material rather
// than a literal copy of the screenshot's palette.
const GLOW = '149, 120, 186';

function Eye({ pupilX, pupilY, blink, radius, rotate }) {
    return (
        <motion.div
            animate={{ scaleY: blink ? 0.08 : 1 }}
            transition={{ duration: blink ? 0.09 : 0.16, ease: 'easeInOut' }}
            className="relative w-[32px] h-[44px] sm:w-[38px] sm:h-[50px] bg-white shadow-[0_8px_16px_rgba(0,0,0,0.25)] overflow-hidden flex items-center justify-center shrink-0"
            style={{ borderRadius: radius, rotate }}
        >
            <motion.span
                style={{ x: pupilX, y: pupilY, rotate: -rotate, backgroundColor: '#453659' }}
                className="w-[8px] h-[8px] sm:w-[9px] sm:h-[9px] rounded-full"
            />
        </motion.div>
    );
}

export default function GlowPeekCardShowcase() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof document !== 'undefined') {
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
        return false;
    });

    useEffect(() => {
        const check = () => setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
        check();
        const observer = new MutationObserver(check);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
        return () => observer.disconnect();
    }, []);

    const charRef = useRef(null);
    const pupilX = useMotionValue(0);
    const pupilY = useMotionValue(0);
    const springX = useSpring(pupilX, { stiffness: 300, damping: 20 });
    const springY = useSpring(pupilY, { stiffness: 300, damping: 20 });

    const [blink, setBlink] = useState(false);

    // Eye tracking: both eyes share one gaze computed from the cursor's
    // angle relative to the character's center, same atan2 + clamped-radius
    // technique as GooglyEyesButtonShowcase.
    useEffect(() => {
        function handleMouseMove(e) {
            if (!charRef.current) return;
            const rect = charRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const distance = Math.min(4.5, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 32);
            pupilX.set(Math.cos(angle) * distance);
            pupilY.set(Math.sin(angle) * distance);
        }
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [pupilX, pupilY]);

    // Blink on a randomized interval rather than a click trigger, since this
    // character is ambient/idle rather than a button.
    useEffect(() => {
        let timeoutId;
        function scheduleBlink() {
            const delay = 2600 + Math.random() * 2400;
            timeoutId = setTimeout(() => {
                setBlink(true);
                setTimeout(() => setBlink(false), 110);
                scheduleBlink();
            }, delay);
        }
        scheduleBlink();
        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div className="w-full h-full flex items-center justify-center p-6 sm:p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div
                className="relative w-full max-w-[320px] rounded-[28px] overflow-hidden"
                style={{
                    backgroundColor: 'var(--surface)',
                    boxShadow: isDark
                        ? '0 24px 48px -16px rgba(0,0,0,0.6)'
                        : '0 24px 48px -16px rgba(0,0,0,0.16)',
                }}
            >
                {/* Top info panel. The gap between the meta line and the
                    heading is deliberately large - roughly a fifth of the
                    whole card's height in the reference - not a small
                    margin. */}
                <div className="relative z-10 px-7 pt-8 pb-7">
                    <p className="text-[13px] font-medium" style={{ color: 'var(--text-subtle)' }}>
                        light &bull; cabinet &bull; scenario
                    </p>
                    <h3
                        className="mt-14 sm:mt-16 text-[28px] sm:text-[30px] font-bold leading-tight"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        alex&rsquo;s workspace
                    </h3>
                    <div className="mt-5 flex items-center justify-between">
                        <p className="flex items-center gap-2 text-[14px] font-medium" style={{ color: 'var(--text-secondary)' }}>
                            color
                            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: `rgb(${GLOW})` }} />
                            intensity: 64%
                        </p>
                        <button type="button" className="text-[14px] font-medium cursor-pointer" style={{ color: 'var(--text-subtle)' }}>
                            edit
                        </button>
                    </div>
                </div>

                {/* Glow stage: a uniform pale purple base tint, with a more
                    saturated organic blob (blurred, slightly off-center,
                    breathing gently) layered on top, plus a grain overlay so
                    it reads as a soft painted cloud rather than a flat CSS
                    gradient. */}
                <div
                    ref={charRef}
                    className="relative h-[250px] sm:h-[280px] overflow-hidden flex items-end justify-center pb-8 sm:pb-9"
                    style={{ backgroundColor: `rgba(${GLOW}, 0.1)` }}
                >
                    <motion.div
                        className="absolute"
                        style={{
                            width: '95%',
                            height: '90%',
                            left: '2%',
                            top: '18%',
                            background: `radial-gradient(60% 60% at 48% 60%, rgba(${GLOW},0.95) 0%, rgba(${GLOW},0.6) 35%, rgba(${GLOW},0.2) 62%, transparent 80%)`,
                            filter: 'blur(14px)',
                        }}
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    {/* Grain overlay for the organic, slightly noisy texture
                        visible in the reference's glow. */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ mixBlendMode: 'overlay', opacity: 0.4 }} aria-hidden="true">
                        <filter id="glow-peek-grain">
                            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                            <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0" />
                        </filter>
                        <rect width="100%" height="100%" filter="url(#glow-peek-grain)" />
                    </svg>

                    <div className="relative z-10 flex items-center gap-2.5 sm:gap-3">
                        <Eye pupilX={springX} pupilY={springY} blink={blink} radius="62% 38% 55% 45% / 58% 50% 50% 42%" rotate={-7} />
                        <Eye pupilX={springX} pupilY={springY} blink={blink} radius="40% 60% 42% 58% / 48% 58% 42% 52%" rotate={5} />
                    </div>
                </div>
            </div>
        </div>
    );
}
