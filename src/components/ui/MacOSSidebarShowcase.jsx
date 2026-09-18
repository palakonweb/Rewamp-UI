import React, { useState } from 'react';
import { Copy, Check, MousePointer2, Image as ImageIcon, Map, MessageCircle, Settings, DownloadCloud } from 'lucide-react';

const promptContent = `macos native sidebar with traffic light window controls and translucent acrylic background materials`;

export default function MacOSSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(1);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const navItems = [
        { icon: MousePointer2, label: "Cursor" },
        { icon: ImageIcon, label: "Photos" },
        { icon: MessageCircle, label: "Messages" },
        { icon: Map, label: "Maps" },
        { icon: DownloadCloud, label: "Downloads" },
        { icon: Settings, label: "Settings" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="relative w-full h-[550px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 shadow-xl flex bg-[url('https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                
                {/* Simulated Desktop Window Wrapper */}
                <div className="absolute inset-8 rounded-xl overflow-hidden border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex">
                    
                    {/* THE MACOS SIDEBAR */}
                    <aside className="w-[220px] h-full bg-[#f6f6f6]/80 dark:bg-[#282828]/80 backdrop-blur-3xl border-r border-black/10 dark:border-white/10 flex flex-col pt-4">
                        
                        {/* Traffic Lights */}
                        <div className="flex items-center gap-2 px-5 mb-6">
                            <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-black/10 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-black/10 shadow-sm"></div>
                            <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-black/10 shadow-sm"></div>
                        </div>

                        {/* Navigation List */}
                        <div className="px-3">
                            <span className="px-2 text-[11px] font-bold text-black/40 dark:text-white/40 mb-1 block">Favorites</span>
                            <nav className="flex flex-col gap-0.5">
                                {navItems.map((item, index) => {
                                    const isActive = activeIndex === index;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => setActiveIndex(index)}
                                            className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-md transition-colors ${
                                                isActive 
                                                    ? 'bg-black/10 dark:bg-white/20 text-black dark:text-white font-medium' 
                                                    : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10'
                                            }`}
                                        >
                                            <div className={`${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-blue-500'}`}>
                                                <item.icon size={16} strokeWidth={2} className="fill-blue-500/20" />
                                            </div>
                                            <span className="text-[13px]">{item.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                    </aside>

                    {/* Window Content */}
                    <div className="flex-1 bg-white dark:bg-[#1e1e1e] p-8 opacity-90">
                        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-black/5 dark:border-white/5">
                             <div className="w-32 h-6 bg-black/5 dark:bg-white/5 rounded-md"></div>
                             <div className="w-8 h-6 bg-black/5 dark:bg-white/5 rounded-md"></div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-6">
                             {[1,2,3,4,5,6].map(i => (
                                 <div key={i} className="aspect-square bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5 flex items-center justify-center">
                                     <ImageIcon size={32} className="text-black/10 dark:text-white/10" />
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>

                <span className="absolute bottom-2 right-4 text-white/50 text-[12px] font-semibold tracking-widest uppercase drop-shadow-md">MacOS Native</span>
            </div>
</div>
    );
}
