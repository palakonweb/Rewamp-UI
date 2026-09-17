import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sun, Home, User, FolderKanban, Mail } from 'lucide-react';

export default function OrbitingPlanetsNavbarShowcase() {
    const [isHovered, setIsHovered] = useState(false);
    const orbitControls = useAnimation();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'about', label: 'About', icon: User },
        { id: 'projects', label: 'Projects', icon: FolderKanban },
        { id: 'contacts', label: 'Contacts', icon: Mail },
    ];
    const radius = 95; // Orbit radius

    // Handle continuous rotation vs snapped translation
    useEffect(() => {
        if (isHovered) {
            orbitControls.stop();
            orbitControls.set({ rotate: 0 });
        } else {
            orbitControls.start({
                rotate: 360,
                transition: { duration: 22, repeat: Infinity, ease: "linear" }
            });
        }
    }, [isHovered, orbitControls]);

    return (
        <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12 select-none">
            {/* 🎯 THE ORBITAL NAVBAR */}
            <div className="relative flex items-center justify-center w-[460px] h-[250px]">
                <div
                    className="relative flex items-center justify-center w-full h-full"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* The Center "Sun" Logo */}
                    <motion.div 
                        animate={{ scale: isHovered ? 0.82 : 1, x: isHovered ? -150 : 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-[#9C8EB8] to-[#D4CBE5] shadow-[0_0_20px_rgba(193,180,216,0.4)] flex items-center justify-center z-30 cursor-pointer"
                    >
                        <Sun size={28} className="text-white" />
                    </motion.div>

                    {/* Orbit Ring */}
                    <motion.div
                        animate={{ opacity: isHovered ? 0 : 0.25, scale: isHovered ? 0.5 : 1 }}
                        className="absolute w-[190px] h-[190px] rounded-full border border-[#C1B4D8]/50 border-dashed pointer-events-none"
                    />

                    {/* The Planets (Nav Items) Wrapper */}
                    <motion.div 
                        initial={{ rotate: 0 }}
                        animate={orbitControls}
                        className="absolute flex items-center justify-center pointer-events-none"
                    >
                        {navItems.map((item, i) => {
                            const Icon = item.icon;
                            const angle = (i * (360 / navItems.length));
                            const rad = (angle * Math.PI) / 180;
                            
                            const orbX = radius * Math.cos(rad);
                            const orbY = radius * Math.sin(rad);

                            // Horizontal Snapped coordinates
                            const snapX = -85 + (i * 75);
                            const snapY = 0;

                            return (
                                <motion.button
                                    key={item.id}
                                    title={item.label}
                                    animate={{
                                        x: isHovered ? snapX : orbX,
                                        y: isHovered ? snapY : orbY,
                                        rotate: isHovered ? 0 : -angle
                                    }}
                                    transition={{ type: "spring", stiffness: 420, damping: 30, mass: 0.5 }}
                                    whileHover={{ scale: 1.15 }}
                                    className="absolute w-13 h-13 rounded-full bg-white dark:bg-[#1E1B28] shadow-[0_4px_16px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.6)] border border-black/[0.08] dark:border-white/12 flex items-center justify-center pointer-events-auto z-20 cursor-pointer"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <Icon size={20} strokeWidth={2.2} className="text-[#5B4B7A] dark:text-[#D4CBE5]" />
                                </motion.button>
                            );
                        })}
                    </motion.div>
                </div>
            </div>

            {/* Centered Single-line Description */}
            <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
                Hover solar center to align orbital navigation
            </p>
        </div>
    );
}
