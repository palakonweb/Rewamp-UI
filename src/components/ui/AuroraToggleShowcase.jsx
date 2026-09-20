import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getSiteTheme, setSiteTheme, SITE_THEME_EVENT } from '../../lib/siteTheme';

const promptContent = `premium dark toggle switch with glowing holographic thumb and sleek inset track`;

export default function AuroraToggleShowcase() {
    const [isOn, setIsOn] = useState(() => getSiteTheme() === 'dark');

    useEffect(() => {
        const handleThemeChange = (e) => {
            const currentTheme = e.detail?.theme || getSiteTheme();
            setIsOn(currentTheme === 'dark');
        };
        window.addEventListener(SITE_THEME_EVENT, handleThemeChange);
        const observer = new MutationObserver(() => {
            setIsOn(getSiteTheme() === 'dark');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class'] });

        return () => {
            window.removeEventListener(SITE_THEME_EVENT, handleThemeChange);
            observer.disconnect();
        };
    }, []);

    const handleToggle = () => {
        const next = !isOn;
        setIsOn(next);
        setSiteTheme(next ? 'dark' : 'light');
    };

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center p-8 group">
                
                {/* THE TOGGLE WRAPPER */}
                <div 
                    onClick={handleToggle}
                    className="relative w-[320px] h-[100px] rounded-[100px] bg-[#111] dark:bg-[#050505] shadow-[inset_0_4px_16px_rgba(0,0,0,0.8),_0_2px_4px_rgba(255,255,255,0.1)] p-3 cursor-pointer flex items-center overflow-hidden select-none"
                >
                    {/* Background glow when ON */}
                    <motion.div 
                        animate={{ opacity: isOn ? 1 : 0, filter: isOn ? 'blur(30px)' : 'blur(0px)' }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="absolute right-0 w-[50%] h-[150%] bg-gradient-to-l from-cyan-400/30 via-fuchsia-400/30 to-transparent rounded-full z-0 pointer-events-none"
                    />

                    {/* Text Label */}
                    <span className="absolute left-10 text-white font-medium text-xl z-10 select-none pointer-events-none">
                        Switch
                    </span>

                    {/* The Thumb */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            x: isOn ? 160 : 0,
                            boxShadow: isOn 
                                ? '0 0 20px rgba(100,200,255,0.4), inset 0 2px 4px rgba(255,255,255,0.5)' 
                                : '0 2px 10px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)'
                        }}
                        transition={{ type: "spring", stiffness: 260, damping: 24 }}
                        className="relative z-20 w-[136px] h-[76px] rounded-[100px] overflow-hidden flex items-center justify-end px-5"
                    >
                        {/* Off State Background */}
                        <div className="absolute inset-0 bg-[#222] border border-white/5 rounded-[100px]" />

                        {/* On State Holographic Gradient (Smooth Crossfade) */}
                        <motion.div
                            animate={{ opacity: isOn ? 1 : 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="absolute inset-0 bg-gradient-to-r from-[#d484ff] via-[#aad4ff] to-[#d4ffff] rounded-[100px]"
                        />

                        {/* Icon: Arrow Right (On) */}
                        <motion.div
                            animate={{
                                opacity: isOn ? 1 : 0,
                                scale: isOn ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="absolute right-5 text-black pointer-events-none flex items-center justify-center"
                        >
                            <ArrowRight strokeWidth={2.5} size={24} />
                        </motion.div>

                        {/* Icon: Circle Ring (Off) */}
                        <motion.div
                            animate={{
                                opacity: !isOn ? 1 : 0,
                                scale: !isOn ? 1 : 0.5,
                            }}
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                            className="absolute right-5 w-5 h-5 rounded-full border-2 border-white/40 pointer-events-none"
                        />
                    </motion.div>
                </div>
                
                <span className="absolute bottom-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase">Aurora Switch</span>
            </div>
        </div>
    );
}
