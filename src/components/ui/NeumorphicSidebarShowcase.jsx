import React, { useState } from 'react';
import { Copy, Check, Mouse, Box, Circle, Triangle } from 'lucide-react';

const promptContent = `neumorphic 3d inset sidebar rail extruded cleanly from the root background surface`;

export default function NeumorphicSidebarShowcase() {
    const [copied, setCopied] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptContent);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const links = [
        { icon: Mouse, label: "Cursor" },
        { icon: Box, label: "Elements" },
        { icon: Circle, label: "Radii" },
        { icon: Triangle, label: "Vectors" }
    ];

    return (
        <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
            {/* Must use a specific color surface for Neumorphism (#e0e5ec) */}
            <div className="relative w-full h-[450px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#e0e5ec] shadow-xl flex p-6 gap-6">
                
                {/* 🎯 THE NEUMORPHIC SIDEBAR */}
                <aside className="w-20 h-full rounded-2xl flex flex-col items-center py-6 shadow-[9px_9px_16px_#b8beca,_-9px_-9px_16px_#ffffff] bg-[#e0e5ec]">
                    
                    {/* Brand */}
                    <div className="w-10 h-10 rounded-full bg-[#e0e5ec] shadow-[inset_5px_5px_10px_#b8beca,_inset_-5px_-5px_10px_#ffffff] flex items-center justify-center mb-8 border-[2px] border-white/50 text-indigo-500 font-bold">
                        N
                    </div>

                    {/* Links */}
                    <nav className="flex flex-col gap-6">
                        {links.map((link, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                                        isActive
                                            ? 'shadow-[inset_4px_4px_8px_#b8beca,_inset_-4px_-4px_8px_#ffffff] text-indigo-500' // Pressed inward
                                            : 'shadow-[4px_4px_8px_#b8beca,_-4px_-4px_8px_#ffffff] text-[#9ba4b5] hover:text-indigo-400' // Pop out
                                    }`}
                                >
                                    <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                                </button>
                            );
                        })}
                    </nav>

                </aside>

                {/* Dummy Content Container (Also neumorphic) */}
                <div className="flex-1 h-full rounded-3xl p-8 shadow-[inset_9px_9px_16px_#b8beca,_inset_-9px_-9px_16px_#ffffff] flex flex-col gap-8 opacity-70">
                     <div className="w-1/3 h-8 rounded-lg shadow-[4px_4px_8px_#b8beca,_-4px_-4px_8px_#ffffff]"></div>
                     <div className="w-full h-40 rounded-2xl shadow-[4px_4px_8px_#b8beca,_-4px_-4px_8px_#ffffff]"></div>
                </div>
                
                <span className="absolute bottom-6 right-6 text-[#9ba4b5] text-[13px] font-semibold tracking-widest uppercase">Neumorphic Soft 3D</span>
            </div>
</div>
    );
}
