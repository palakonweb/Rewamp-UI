import React from 'react';
import { motion } from 'framer-motion';

export default function FrostedGelButtonShowcase() {
    return (
        <div className="w-full h-full flex items-center justify-center p-10" style={{ backgroundColor: 'var(--bg)' }}>
            <div className="relative flex items-center justify-center">
                {/* Outer ambient glow: large and soft, concentrated just above
                    and behind the button rather than a uniform ring, bleeding
                    outward into the page before fully fading. Uses the site's
                    actual CTA purple (#9578BA, see Hero.jsx) instead of a
                    one-off hex pulled from the reference. */}
                <motion.div
                    className="absolute w-[160%] h-[190%] rounded-full pointer-events-none"
                    style={{
                        background:
                            'radial-gradient(40% 38% at 50% 36%, rgba(149,120,186,0.5), rgba(149,120,186,0.18) 55%, transparent 75%)',
                        filter: 'blur(28px)',
                    }}
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Grounding shadow: a cool blue-gray cast shadow beneath the
                    button, separate from (and further out than) the glow
                    above - the two-tone shadow observed in the reference. */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 bottom-[8%] w-[80%] h-[26%] rounded-full pointer-events-none"
                    style={{
                        background: 'radial-gradient(50% 50% at 50% 50%, rgba(95,105,145,0.26), transparent 72%)',
                        filter: 'blur(14px)',
                    }}
                />

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 22 }}
                    className="relative w-[150px] h-[64px] sm:w-[180px] sm:h-[72px] rounded-2xl overflow-hidden"
                    style={{
                        // Site purple ramp (#9578BA core -> --lilac-600 -> --lilac-300
                        // -> --lilac-400), no white stop so the fill never bleaches
                        // out at the corners.
                        background: 'radial-gradient(72% 95% at 45% 55%, #9578BA 0%, #C1B4D8 36%, #EEEAF7 66%, #E4DDF0 100%)',
                        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.4), inset 0 -6px 14px rgba(149,120,186,0.3)',
                    }}
                >
                    {/* Soft inner glow sitting within the shape, breathing
                        gently so the material never reads as a flat fill. */}
                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: 'radial-gradient(60% 70% at 50% 42%, rgba(149,120,186,0.45), transparent 70%)',
                            filter: 'blur(8px)',
                        }}
                        animate={{ opacity: [0.6, 0.95, 0.6] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <span
                        className="relative flex items-center justify-center w-full h-full text-[18px] sm:text-[20px] font-bold text-white"
                        style={{
                            textShadow: '0 0 14px rgba(255,255,255,0.7), 0 2px 4px rgba(90,70,120,0.4)',
                        }}
                    >
                        Button
                    </span>
                </motion.button>
            </div>
        </div>
    );
}
