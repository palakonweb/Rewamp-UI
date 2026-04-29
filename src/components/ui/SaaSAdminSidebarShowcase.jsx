import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Search, BarChart3, Users, Zap, Layout, ArrowRightLeft } from 'lucide-react';

const promptContent = `comprehensive saas admin dashboard sidebar with search integration grouped labels and nested user profile block`;

export default function SaaSAdminSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeId, setActiveId] = useState('analytics');

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navSections = [
        {
            title: "MAIN MENU",
            items: [
                { id: "analytics", label: "Analytics", icon: BarChart3 },
                { id: "customers", label: "Customers", icon: Users },
                { id: "campaigns", label: "Campaigns", icon: Zap }
            ]
        },
        {
            title: "SYSTEM",
            items: [
                { id: "layout", label: "Layouts", icon: Layout },
                { id: "integrations", label: "Integrations", icon: ArrowRightLeft }
            ]
        }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#f4f4f5] dark:bg-[#0c0d10] shadow-xl flex">
                
                {/* 🎯 THE SAAS ADMIN SIDEBAR */}
                <aside className="w-[280px] h-full bg-white dark:bg-[#121418] border-r border-black/5 dark:border-white/5 flex flex-col z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)] pt-6 pb-4">
                    
                    {/* Header Workspace Selector shape */}
                    <div className="px-5 mb-6">
                        <button className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500 text-white flex items-center justify-center font-bold text-lg">A</div>
                                <div className="flex flex-col items-start">
                                    <span className="text-[13px] font-bold text-black dark:text-white leading-tight">Acme Corp</span>
                                    <span className="text-[11px] text-black/50 dark:text-white/50 leading-tight border border-black/10 dark:border-white/10 rounded px-1 mt-1 font-medium bg-black/5 dark:bg-white/5">Free Plan</span>
                                </div>
                            </div>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/40 dark:text-white/40"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                        </button>
                    </div>

                    {/* Integrated Search */}
                    <div className="px-5 mb-8">
                        <div className="relative w-full flex items-center">
                            <Search size={14} className="absolute left-3 text-black/40 dark:text-white/40" />
                            <input 
                                type="text"
                                placeholder="Search..."
                                className="w-full bg-[#f4f4f5] dark:bg-[#0c0d10] border border-black/5 dark:border-white/5 rounded-lg py-2 pl-9 pr-3 text-[13px] text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                            />
                            <div className="absolute right-3 flex gap-1 pointer-events-none">
                                <kbd className="text-[10px] font-mono font-medium text-black/40 dark:text-white/40 bg-white dark:bg-[#1f2127] border border-black/10 dark:border-white/10 px-1 rounded shadow-sm">⌘</kbd>
                                <kbd className="text-[10px] font-mono font-medium text-black/40 dark:text-white/40 bg-white dark:bg-[#1f2127] border border-black/10 dark:border-white/10 px-1 rounded shadow-sm">K</kbd>
                            </div>
                        </div>
                    </div>

                    {/* Nav Sections */}
                    <div className="flex-1 overflow-y-auto px-4 flex flex-col gap-6 scrollbar-hide">
                        {navSections.map((section, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <span className="px-3 text-[11px] font-bold tracking-widest text-black/40 dark:text-white/40 mb-1">{section.title}</span>
                                {section.items.map((item) => {
                                    const isActive = activeId === item.id;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveId(item.id)}
                                            className={`relative w-full flex items-center justify-between px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
                                                isActive 
                                                    ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10' 
                                                    : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                                                {item.label}
                                            </div>
                                            {/* Dummy notification badge logic */}
                                            {item.id === 'messages' && <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">4</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {/* Footer Profile */}
                    <div className="mt-auto px-4 pt-4 border-t border-black/5 dark:border-white/5">
                        <button className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white text-[12px] font-bold shadow-inner">
                                JD
                            </div>
                            <div className="flex flex-col items-start flex-1 overflow-hidden">
                                <span className="text-[13px] font-bold text-black dark:text-white leading-tight truncate w-full text-left">John Doe</span>
                                <span className="text-[11px] text-black/50 dark:text-white/50 leading-tight truncate w-full text-left">john@acme.com</span>
                            </div>
                        </button>
                    </div>
                </aside>

                {/* Dummy Content */}
                <div className="flex-1 p-8 opacity-40 overflow-hidden">
                     <div className="w-1/4 h-8 bg-black/10 dark:bg-white/10 rounded-lg mb-8"></div>
                     <div className="w-full h-40 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5 mb-6"></div>
                     <div className="w-full h-40 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-black/30 dark:text-white/30 text-[13px] font-semibold tracking-widest uppercase z-20">SaaS Admin Dense</span>
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
