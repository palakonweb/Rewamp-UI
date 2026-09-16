import React, { useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Copy, Check, MousePointer2 } from 'lucide-react';

const promptContent = `Cat paw swipe button: a coral pill button reading "Get Started". On hover, a flat white cartoon cat-paw silhouette (rounded palm + 4-5 toe-bean bumps, no outline/shading) swipes in from the bottom-right, growing to fully cover the button and its label. While covered, the label swaps instantly to "Login Now", then the paw swipes back out toward the bottom-right revealing the new label. ~0.5s in, ~0.3s hold, ~0.5s out, eased in-out, replays on hover/click.`;

function Paw() {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex gap-1.5 mb-[-16px] z-10">
                {[24, 29, 28, 23].map((s, i) => (
                    <div key={i} className="rounded-full bg-white" style={{ width: s, height: s + 6 }} />
                ))}
            </div>
            <div className="w-[96px] h-[76px] rounded-[40px] bg-white" />
        </div>
    );
}

export default function CatPawSwipeButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const [label, setLabel] = useState('Get Started');
    const [swiping, setSwiping] = useState(false);
    const controls = useAnimation();
    const busyRef = useRef(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const runSwipe = async () => {
        if (busyRef.current) return;
        busyRef.current = true;
        setSwiping(true);
        controls.set({ x: 170, y: 120, scale: 0.45, rotate: 28, opacity: 1 });
        await controls.start({
            x: [170, 0, 0, 170],
            y: [120, 0, 0, 120],
            scale: [0.45, 1.9, 1.9, 0.45],
            rotate: [28, 0, 0, 28],
            transition: { duration: 1.3, times: [0, 0.385, 0.615, 1], ease: 'easeInOut' },
        });
        setSwiping(false);
        busyRef.current = false;
    };

    const handleEnter = () => {
        setTimeout(() => setLabel((l) => (l === 'Get Started' ? 'Login Now' : 'Get Started')), 500);
        runSwipe();
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#0f0f0f] shadow-xl flex items-center justify-center p-8">
                <div className="relative" onMouseEnter={handleEnter} onClick={handleEnter}>
                    <button
                        className="relative w-[280px] h-[70px] rounded-[35px] select-none overflow-hidden cursor-pointer"
                        style={{ background: '#F26D6D', boxShadow: '0 14px 30px -12px rgba(242,109,109,0.6)' }}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={label}
                                className="absolute inset-0 flex items-center justify-center text-white text-[19px] font-bold"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                {label}
                            </motion.span>
                        </AnimatePresence>
                    </button>

                    <div
                        className="absolute left-1/2 top-1/2 pointer-events-none z-10"
                        style={{ transform: 'translate(-50%, -50%)' }}
                    >
                        <motion.div
                            animate={controls}
                            initial={{ x: 170, y: 120, scale: 0.45, rotate: 28, opacity: 1 }}
                        >
                            <Paw />
                        </motion.div>
                    </div>

                    {!swiping && (
                        <MousePointer2 size={16} className="absolute -right-5 -bottom-4 text-white/70 fill-white/70" />
                    )}
                </div>

                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Hover to Swipe</span>
            </div>
</div>
    );
}
