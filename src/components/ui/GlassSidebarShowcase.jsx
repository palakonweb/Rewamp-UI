import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, LayoutDashboard, Database, CreditCard, Settings, Compass } from 'lucide-react';

const promptContent = `heavy blur frosted glass sidebar with slowly floating ambient gradient backgrounds behind it`;

export default function GlassSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: LayoutDashboard, label: "Dashboard" },
        { icon: Compass, label: "Explore" },
        { icon: Database, label: "Data Sources" },
        { icon: CreditCard, label: "Billing" },
        { icon: Settings, label: "Settings" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#ebebeb] dark:bg-[#07070a] shadow-xl flex group">
                
                {/* Visualizer Background (to show off the glass) */}
                <div className="absolute inset-0 overflow-hidden z-0">
                    <motion.div 
                        animate={{ 
                            x: [0, 100, 0], 
                            y: [0, -50, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -left-10 w-96 h-96 bg-purple-500/30 dark:bg-fuchsia-900/40 rounded-full blur-[80px]"
                    />
                    <motion.div 
                        animate={{ 
                            x: [0, -100, 0], 
                            y: [0, 50, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-10 left-32 w-80 h-80 bg-cyan-500/20 dark:bg-blue-900/30 rounded-full blur-[80px]"
                    />
                </div>

                {/* 🎯 THE GLASS SIDEBAR */}
                <aside className="relative z-10 w-64 h-full bg-white/40 dark:bg-[#111111]/50 backdrop-blur-3xl border-r border-white/40 dark:border-white/10 shadow-[20px_0_40px_rgba(0,0,0,0.05)] flex flex-col py-8 px-4">
                    {/* Brand */}
                    <div className="flex items-center gap-2 px-4 mb-10">
                        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 shadow-sm" />
                        <span className="font-bold text-lg tracking-tight text-black dark:text-white">Aura</span>
                    </div>

                    {/* Navigation Items */}
                    <nav className="flex flex-col gap-2">
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 ${
                                        isActive 
                                            ? 'text-black dark:text-white bg-white/60 dark:bg-white/10 shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]' 
                                            : 'text-black/60 dark:text-white/60 hover:bg-white/30 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[14px] font-medium">{link.label}</span>
                                    
                                    {isActive && (
                                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full shadow-[0_0_10px_indigo]"></div>
                                    )}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Bottom Area */}
                    <div className="mt-auto px-4">
                        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20">
                            <p className="text-[12px] font-semibold text-indigo-900 dark:text-indigo-200 mb-1">Pro Plan Active</p>
                            <p className="text-[11px] text-indigo-900/60 dark:text-indigo-200/60">Renews in 14 days</p>
                        </div>
                    </div>
                </aside>

                {/* Dummy Content */}
                <div className="relative z-10 flex-1 p-10 opacity-60">
                    <div className="w-1/3 h-8 bg-black/10 dark:bg-white/10 rounded-lg mb-8"></div>
                    <div className="w-full h-40 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/20 dark:border-white/5 backdrop-blur-md mb-6"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 z-20 text-black/50 dark:text-white/50 text-[13px] font-semibold tracking-widest uppercase">Frosted Glass</span>
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
