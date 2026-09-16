import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Send } from 'lucide-react';

const promptContent = `"Balloon Contact" button: a glossy orange balloon-foil pill (dot-grain texture, faint rib seams, thick dark rim, inner glow) inside a dark socket. On press it dents inward — a fast squish (scaleY ~0.88, scaleX ~1.05, y +3) in ~130ms, flattening the top highlight and tightening/dimming the glow, with a diagonal shimmer sweep. On release it rebounds past its normal size and wobbles elastically (overshoot → undershoot → small overshoot → settle) over ~550ms, the glow and highlight flashing brighter mid-rebound before easing back to rest.`;

const REST = { scaleY: 1, scaleX: 1, y: 0, boxShadow: '0 10px 26px -6px rgba(210,80,20,0.65), inset 0 3px 2px rgba(255,220,180,0.55), inset 0 -10px 14px rgba(90,20,0,0.55)' };
const PRESS = { scaleY: 0.88, scaleX: 1.05, y: 3, boxShadow: '0 3px 8px -3px rgba(210,80,20,0.3), inset 0 1px 1px rgba(255,220,180,0.2), inset 0 -14px 16px rgba(60,10,0,0.65)' };

export default function BalloonContactButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [phase, setPhase] = useState('rest'); // rest | press | release
    const [sweepKey, setSweepKey] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const press = () => {
        setPhase('press');
        setSweepKey((k) => k + 1);
    };
    const release = () => {
        setPhase('release');
        setTimeout(() => setPhase('rest'), 600);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] overflow-hidden border border-black/5 dark:border-white/10 inner-card-bg shadow-xl flex items-center justify-center p-8">
                {/* dark socket / bezel */}
                <div
                    className="relative p-[7px] rounded-full"
                    style={{ background: 'linear-gradient(180deg, #241610, #100906)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.15)' }}
                >
                    <motion.button
                        onPointerDown={press}
                        onPointerUp={release}
                        onPointerLeave={() => phase === 'press' && release()}
                        animate={
                            phase === 'press'
                                ? PRESS
                                : phase === 'release'
                                    ? {
                                        scaleY: [0.88, 1.1, 0.95, 1.03, 0.98, 1],
                                        scaleX: [1.05, 0.93, 1.03, 0.98, 1.01, 1],
                                        y: [3, -2, 1, -0.5, 0.2, 0],
                                        boxShadow: [
                                            PRESS.boxShadow,
                                            '0 18px 36px -4px rgba(255,140,60,0.85), inset 0 4px 3px rgba(255,235,210,0.75), inset 0 -6px 10px rgba(120,30,0,0.4)',
                                            REST.boxShadow,
                                            REST.boxShadow,
                                            REST.boxShadow,
                                            REST.boxShadow,
                                        ],
                                    }
                                    : REST
                        }
                        transition={
                            phase === 'press'
                                ? { duration: 0.13, ease: 'easeOut' }
                                : phase === 'release'
                                    ? { duration: 0.55, times: [0, 0.25, 0.45, 0.65, 0.85, 1], ease: 'easeOut' }
                                    : { duration: 0.2, ease: 'easeOut' }
                        }
                        className="relative w-[230px] h-[64px] rounded-full select-none overflow-hidden"
                        style={{
                            background: 'radial-gradient(circle at 6px 6px, rgba(255,255,255,0.35) 1px, transparent 1.4px) 0 0/14px 14px, linear-gradient(180deg, #ff7a3d, #d4400f 70%, #b53000)',
                        }}
                    >
                        {phase === 'press' && (
                            <motion.div
                                key={sweepKey}
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                    background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.55) 50%, transparent 60%)',
                                }}
                                initial={{ x: '-120%' }}
                                animate={{ x: '120%' }}
                                transition={{ duration: 0.7, ease: 'easeInOut' }}
                            />
                        )}
                        <div className="relative z-10 w-full h-full flex items-center justify-center gap-2">
                            <span className="text-[19px] font-bold tracking-wide" style={{ color: '#fff2df', textShadow: '0 1px 2px rgba(120,30,0,0.6)' }}>
                                Contact
                            </span>
                            <Send size={17} className="rotate-45" style={{ color: '#fff2df' }} strokeWidth={2.4} />
                        </div>
                    </motion.button>
                </div>

                <span className="absolute bottom-6 text-black/40 text-[13px] font-semibold tracking-widest uppercase">Press and Release</span>
            </div>
</div>
    );
}
