import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Copy, Check, Sun, Cloud, Compass, Map, Wind, Droplets } from 'lucide-react';

const promptContent = `avant-garde orbiting planets navbar that snaps to a horizontal array on hover`;

export default function OrbitingPlanetsNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const orbitControls = useAnimation();

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const icons = [Cloud, Compass, Map, Wind, Droplets];
    const radius = 100; // Orbit radius

    // Handle continuous rotation vs snapped translation
    useEffect(() => {
        if (isHovered) {
            orbitControls.stop();
            orbitControls.set({ rotate: 0 }); // reset rotation wrapper so they snap cleanly
        } else {
            orbitControls.start({
                rotate: 360,
                transition: { duration: 25, repeat: Infinity, ease: "linear" }
            });
        }
    }, [isHovered, orbitControls]);

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">
                
                {/* 🎯 THE ORBITAL NAVBAR */}
                <div
                    className="relative flex items-center justify-center w-[460px] h-[250px] z-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* The Center "Sun" Logo */}
                    <motion.div 
                        animate={{ scale: isHovered ? 0.8 : 1, x: isHovered ? -160 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#9C8EB8] to-[#D4CBE5] shadow-[0_0_40px_rgba(193,180,216,0.5)] flex items-center justify-center z-30"
                    >
                        <Sun size={28} className="text-white" />
                    </motion.div>

                    {/* Orbit Ring (Visual only) */}
                    <motion.div
                        animate={{ opacity: isHovered ? 0 : 0.2, scale: isHovered ? 0.5 : 1 }}
                        className="absolute w-[180px] h-[180px] rounded-full border border-[#C1B4D8]/50 border-dashed pointer-events-none"
                    />

                    {/* The Planets (Nav Items) Wrapper */}
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={orbitControls}
                        className="absolute flex items-center justify-center pointer-events-none"
                    >
                        {icons.map((Icon, i) => {
                            // Calculate orbital starting angle
                            const angle = (i * (360 / icons.length));
                            const rad = (angle * Math.PI) / 180;
                            
                            // Orbital coordinates
                            const orbX = radius * Math.cos(rad);
                            const orbY = radius * Math.sin(rad);

                            // Horizontal Snapped coordinates (spread out to the right of the sun)
                            const snapX = -100 + (i * 80); // Offset to right side when sun moves left, extra breathing room
                            const snapY = 0;

                            return (
                                <motion.button
                                    key={i}
                                    animate={{
                                        x: isHovered ? snapX : orbX,
                                        y: isHovered ? snapY : orbY,
                                        // Counter-rotate the icons so they stay upright while the wrapper spins
                                        rotate: isHovered ? 0 : -angle
                                    }}
                                    transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.5 }}
                                    whileHover={{ scale: 1.14 }}
                                    className="absolute w-13 h-13 rounded-full bg-white dark:bg-[#241F2E] shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 flex items-center justify-center pointer-events-auto z-20"
                                    style={{ width: 52, height: 52 }}
                                >
                                    <Icon size={22} strokeWidth={2.25} className="text-[#5B4B7A] dark:text-[#E4DDF0]" />
                                </motion.button>
                            );
                        })}
                    </motion.div>
                    
                    {/* Tooltip hint */}
                    <motion.div 
                        animate={{ opacity: isHovered ? 0 : 1, y: isHovered ? 10 : 0 }}
                        className="absolute -bottom-10 text-[11px] font-medium tracking-widest text-black/40 dark:text-white/40 uppercase"
                    >
                        Hover System
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Orbiting Planets</span>
            </div>
</div>
    );
}
