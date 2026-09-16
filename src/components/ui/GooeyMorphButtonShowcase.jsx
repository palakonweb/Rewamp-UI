import React, { useEffect, useId, useRef, useState } from 'react';
import { Copy, Check } from 'lucide-react';

const promptContent = `gooey morphing CTA button — merges an avatar-stack invite into a "Book a call" pill using an SVG metaball filter`;

const CYCLE = {
    stepMs: 20,     // ms per animation step
    mergeMs: 500,   // invite -> cta
    holdMs: 950,    // hold on "book a call"
    splitMs: 500,   // cta -> invite
    restMs: 1300,   // hold on invite
};

const INVITE_WIDTH = 210;
const CTA_WIDTH = 154;

function easeInOut(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/**
 * t: 0 = fully merged ("Book a call"), 1 = fully split (avatar invite)
 */
function useMorph() {
    const [t, setT] = useState(1);
    const [phase, setPhase] = useState('invite'); // invite | merging | cta | splitting
    const tokenRef = useRef(0);

    useEffect(() => {
        let cancelled = false;
        const token = ++tokenRef.current;
        const wait = (ms) => new Promise((r) => setTimeout(r, ms));

        async function tween(from, to, duration, onDone) {
            const steps = Math.max(1, Math.round(duration / CYCLE.stepMs));
            for (let i = 0; i <= steps; i++) {
                if (cancelled || tokenRef.current !== token) return;
                const raw = i / steps;
                const v = from + (to - from) * easeInOut(raw);
                setT(v);
                if (i < steps) await wait(duration / steps);
            }
            onDone && onDone();
        }

        async function loop() {
            while (!cancelled && tokenRef.current === token) {
                setPhase('invite');
                await wait(CYCLE.restMs);
                if (cancelled || tokenRef.current !== token) return;

                setPhase('merging');
                await tween(1, 0, CYCLE.mergeMs);
                if (cancelled || tokenRef.current !== token) return;

                setPhase('cta');
                await wait(CYCLE.holdMs);
                if (cancelled || tokenRef.current !== token) return;

                setPhase('splitting');
                await tween(0, 1, CYCLE.splitMs);
            }
        }
        loop();

        return () => {
            cancelled = true;
        };
    }, []);

    return { t, phase };
}

function GooeyMorphButton() {
    const gooId = useId().replace(/[:]/g, '');
    const { t, phase } = useMorph();

    const width = CTA_WIDTH + (INVITE_WIDTH - CTA_WIDTH) * t;
    const avatarX = -18 - 14 * t;
    const youX = 8 + 14 * t;
    const avatarOpacity = Math.min(1, t * 2.2);
    const talkOpacity = Math.max(0, (t - 0.6) / 0.4);
    const bookOpacity = Math.max(0, 1 - t / 0.5);
    const plusVisible = phase === 'cta';

    return (
        <div className="relative select-none" style={{ height: 60, width: INVITE_WIDTH }}>
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <filter id={`goo-${gooId}`}>
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feColorMatrix
                            in="blur"
                            mode="matrix"
                            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                            result="goo"
                        />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>

            {/* goo-filtered shape layer */}
            <div className="absolute inset-0" style={{ filter: `url(#goo-${gooId})` }}>
                <div
                    className="absolute top-0 rounded-full bg-black shadow-2xl"
                    style={{ height: 60, width, left: '50%', transform: 'translateX(-50%)' }}
                />
                <div
                    className="absolute top-1/2 w-[42px] h-[42px] rounded-full"
                    style={{
                        left: `calc(50% + ${avatarX}px)`,
                        transform: 'translate(-50%, -50%)',
                        opacity: avatarOpacity,
                        background: 'radial-gradient(circle at 35% 30%, #cfcfc7 0%, #9a9a92 55%, #6b6a62 100%)',
                    }}
                />
                <div
                    className="absolute top-1/2 w-[42px] h-[42px] rounded-full bg-white"
                    style={{ left: `calc(50% + ${youX}px)`, transform: 'translate(-50%, -50%)' }}
                />
                <div
                    className="absolute top-1/2 left-1/2"
                    style={{
                        width: 16,
                        height: 16,
                        transform: `translate(-50%, -50%) scale(${plusVisible ? 1 : 0})`,
                        opacity: plusVisible ? 1 : 0,
                        transition: 'opacity 160ms linear, transform 160ms linear',
                    }}
                >
                    <div className="absolute bg-black rounded-[1px]" style={{ top: 0, left: 6, width: 4, height: 16 }} />
                    <div className="absolute bg-black rounded-[1px]" style={{ top: 6, left: 0, width: 16, height: 4 }} />
                </div>
            </div>

            {/* crisp text layer, never goo-filtered */}
            <div className="absolute inset-0 pointer-events-none">
                <span
                    className="absolute top-1/2 -translate-y-1/2 font-mono text-[9px] font-medium text-black tracking-wide"
                    style={{ left: `calc(50% + ${youX}px)`, transform: 'translate(-50%, -50%)' }}
                >
                    YOU
                </span>
                <span
                    className="absolute top-1/2 -translate-y-1/2 text-white text-sm font-semibold tracking-tight whitespace-nowrap"
                    style={{ left: `calc(50% + ${8 * t}px)`, opacity: talkOpacity }}
                >
                    Let's talk!
                </span>
                <span
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-sm font-semibold tracking-tight whitespace-nowrap"
                    style={{ opacity: bookOpacity }}
                >
                    BOOK A CALL
                </span>
            </div>
        </div>
    );
}

export default function GooeyMorphButtonShowcase() {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8 group">
                <GooeyMorphButton />
            </div>
</div>
    );
}
