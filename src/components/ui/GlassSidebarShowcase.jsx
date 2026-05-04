import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, LayoutDashboard, Database, CreditCard, Settings, Compass, HelpCircle } from 'lucide-react';

const promptContent = `Ultra-premium heavy blur frosted glass sidebar. Features slowly floating ambient gradient orbs behind it and smooth Framer Motion active-state sliding indicators.`;

export default function GlassSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const links = [
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Compass, label: "Explore" },
        { icon: Database, label: "Data Sources" },
        { icon: CreditCard, label: "Billing" },
        { icon: Settings, label: "Settings" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-white/10 bg-[#000] shadow-xl flex group">
                
                {/* Visualizer Background (to show off the glass) */}
                <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                    <motion.div 
                        animate={{ 
                            x: [0, 150, 0, -100, 0], 
                            y: [0, -100, 50, -50, 0],
                            scale: [1, 1.5, 0.8, 1.2, 1]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-0 w-[400px] h-[400px] bg-violet-600/40 rounded-full blur-[100px] mix-blend-screen"
                    />
                    <motion.div 
                        animate={{ 
                            x: [0, -150, 50, 100, 0], 
                            y: [0, 100, -50, 50, 0],
                            scale: [1, 0.8, 1.5, 0.9, 1]
                        }}
                        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-cyan-600/30 rounded-full blur-[100px] mix-blend-screen"
                    />
                    {/* Noise Texture */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
                </div>

                {/* 🎯 THE GLASS SIDEBAR */}
                <aside className="relative z-10 w-[260px] h-full bg-white/[0.02] backdrop-blur-[40px] border-r border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.3)] flex flex-col py-8 px-4">
                    
                    {/* Inner glowing edge */}
                    <div className="absolute inset-0 pointer-events-none border-r border-white/5 mask-image:linear-gradient(to_bottom,black,transparent)" />

                    {/* Brand */}
                    <div className="flex items-center gap-3 px-4 mb-10">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-400 to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full mix-blend-overlay" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-white drop-shadow-md">Aura</span>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-1 relative" onMouseLeave={() => setHoveredIndex(null)}>
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            const isHovered = hoveredIndex === index;
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 z-10 ${
                                        isActive 
                                            ? 'text-white' 
                                            : 'text-white/50 hover:text-white/90'
                                    }`}
                                >
                                    {/* Hover Background Bubble (Framer Motion) */}
                                    {isHovered && !isActive && (
                                        <motion.div
                                            layoutId="glassHoverBubble"
                                            className="absolute inset-0 bg-white/5 rounded-xl z-0"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        />
                                    )}

                                    {/* Active Background Bubble */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="glassActiveBubble"
                                            className="absolute inset-0 bg-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-xl z-0 border border-white/10"
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                        >
                                            {/* Glowing Active Indicator Line */}
                                            <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] bg-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                                        </motion.div>
                                    )}

                                    <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} className="relative z-10" />
                                    <span className="text-[13px] font-medium tracking-wide relative z-10">{link.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Bottom Help Area */}
                    <div className="mt-auto">
                        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                            <HelpCircle size={18} />
                            <span className="text-[13px] font-medium tracking-wide">Support</span>
                        </button>
                    </div>
                </aside>

                {/* Dummy Content */}
                <div className="relative z-10 flex-1 p-10 opacity-60">
                    <div className="w-1/3 h-8 bg-white/10 rounded-lg mb-8 backdrop-blur-md border border-white/5"></div>
                    <div className="w-full h-40 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-md mb-6 shadow-2xl"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 z-20 text-white/30 text-[11px] font-semibold tracking-widest uppercase">Premium Glass Sidebar</span>
            </div>

            <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                <div className="flex-1 overflow-hidden">
                    <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Setup</p>
                    <code className="text-[13px] text-black/80 dark:text-white/80 font-mono block overflow-hidden text-ellipsis w-full">
                        {promptContent}
                    </code>
                </div>
                <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
                    {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
                </button>
            </div>
        </div>
    );
}
