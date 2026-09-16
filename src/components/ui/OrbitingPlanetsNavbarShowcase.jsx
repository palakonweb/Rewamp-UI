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
    const radius = 90; // Orbit radius

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
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[400px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#fdecd8] dark:bg-[#0c0d14] shadow-xl flex items-center justify-center p-8 group">
                
                {/* 🎯 THE ORBITAL NAVBAR */}
                <div 
                    className="relative flex items-center justify-center w-[400px] h-[250px] z-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* The Center "Sun" Logo */}
                    <motion.div 
                        animate={{ scale: isHovered ? 0.8 : 1, x: isHovered ? -160 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-400 shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center justify-center z-30"
                    >
                        <Sun size={28} className="text-white" />
                    </motion.div>

                    {/* Orbit Ring (Visual only) */}
                    <motion.div 
                        animate={{ opacity: isHovered ? 0 : 0.2, scale: isHovered ? 0.5 : 1 }}
                        className="absolute w-[180px] h-[180px] rounded-full border border-orange-500/50 border-dashed pointer-events-none"
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
                            const snapX = -80 + (i * 60); // Offset to right side when sun moves left
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
                                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                    className="absolute w-12 h-12 rounded-full bg-white dark:bg-[#1a1b26] shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 flex items-center justify-center pointer-events-auto hover:scale-110 hover:bg-orange-50 transition-colors z-20"
                                >
                                    <Icon size={20} className="text-orange-900/60 dark:text-orange-200/60" />
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
