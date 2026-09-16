import React, { useRef, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Copy, Check, Fingerprint } from 'lucide-react';

const promptContent = `dark mode button with dynamic radial gradient spotlight that perfectly tracks the cursor`;

export default function SpotlightButtonShowcase() {
    const [copied, setCopied] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#050505] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE BUTTON */}
                <div
                    className="group relative max-w-md rounded-full bg-white/5 p-[1px] overflow-hidden shadow-2xl"
                    onMouseMove={handleMouseMove}
                >
                    <motion.div
                        className="pointer-events-none absolute -inset-px rounded-full opacity-0 transition duration-300 group-hover:opacity-100"
                        style={{
                            background: useMotionTemplate`
                                radial-gradient(
                                    150px circle at ${mouseX}px ${mouseY}px,
                                    rgba(154, 0, 2, 0.5),
                                    transparent 80%
                                )
                            `,
                        }}
                    />
                    
                    <button className="relative flex items-center gap-3 rounded-full bg-[#0a0a0a] px-10 py-4 text-[17px] font-semibold text-white/90">
                        <Fingerprint className="w-5 h-5 text-[var(--color-accent-red)]" />
                        Authenticate
                    </button>
                </div>
                
                <span className="absolute bottom-6 text-white/40 text-[13px] font-semibold tracking-widest uppercase">Spotlight UI</span>
            </div>
</div>
    );
}
