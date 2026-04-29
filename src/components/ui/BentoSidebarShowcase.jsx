import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, PieChart, Layers, Command, Bell, Settings } from 'lucide-react';

const promptContent = `bento grid style sidebar replacing continuous rail with discrete floating card blocks`;

export default function BentoSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeSection, setActiveSection] = useState('Overview');

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const topLinks = [
        { icon: PieChart, label: "Overview" },
        { icon: Layers, label: "Projects" },
        { icon: Command, label: "Commands" }
    ];
    
    const bottomLinks = [
        { icon: Bell, label: "Alerts" },
        { icon: Settings, label: "Settings" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f4f4f5] dark:bg-[#000] shadow-xl flex bg-[url('https://transparenttextures.com/patterns/cubes.png')] dark:bg-[url('https://transparenttextures.com/patterns/stardust.png')] p-6 gap-6">
                
                {/* 🎯 THE BENTO SIDEBAR */}
                <aside className="w-[220px] h-full flex flex-col gap-4 z-10">
                    
                    {/* Bento Block 1: Profile/Brand */}
                    <div className="w-full bg-white dark:bg-[#111] p-4 rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex items-center gap-3 cursor-pointer hover:scale-[1.02] transition-transform">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-orange-400 p-[2px]">
                            <div className="w-full h-full rounded-full border-2 border-white dark:border-[#111]"></div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[14px] font-bold text-black dark:text-white leading-tight">Workspace</span>
                            <span className="text-[12px] text-black/40 dark:text-white/40 leading-tight">Pro Tier</span>
                        </div>
                    </div>

                    {/* Bento Block 2: Main Navigation */}
                    <nav className="w-full bg-white dark:bg-[#111] p-2 rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-1">
                        {topLinks.map((link, index) => {
                            const isActive = activeSection === link.label;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(link.label)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                                        isActive 
                                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold' 
                                            : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[13px]">{link.label}</span>
                                </button>
                            );
                        })}
                    </nav>

                    {/* Bento Block 3: Secondary Links */}
                    <div className="w-full bg-white dark:bg-[#111] p-2 rounded-3xl border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col gap-1 mt-auto">
                        {bottomLinks.map((link, index) => {
                            const isActive = activeSection === link.label;
                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveSection(link.label)}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-colors ${
                                        isActive 
                                            ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-semibold' 
                                            : 'text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    <link.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                    <span className="text-[13px]">{link.label}</span>
                                </button>
                            );
                        })}
                    </div>

                </aside>

                {/* Dummy Content */}
                <div className="flex-1 h-full bg-white dark:bg-[#111] rounded-[32px] p-10 border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] opacity-80 flex flex-col">
                     <span className="text-2xl font-bold text-black dark:text-white mb-8">{activeSection}</span>
                     <div className="w-full flex-1 rounded-2xl border-2 border-dashed border-black/10 dark:border-white/10 flex items-center justify-center">
                         <span className="text-black/30 dark:text-white/30 font-medium">Bento Content Area</span>
                     </div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/50 dark:text-white/50 text-[13px] font-semibold tracking-widest uppercase bg-[#f4f4f5] dark:bg-black px-2 rounded-md">Bento Layout</span>
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
