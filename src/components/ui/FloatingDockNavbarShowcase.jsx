import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Copy, Check, Home, FolderKanban, Mail } from 'lucide-react';

const promptContent = `macOS physics floating dock with About, Projects, and Contact items. True magnification calculations based on cursor distance using Framer Motion springs and useMotionValue.`;

// Individual Icon Component with its own distance calculations
function DockIcon({ icon: Icon, label, mouseX }) {
  const ref = useRef(null);

  // Distance from this icon to the mouse
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Calculate dynamic scale and width based on distance
  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
        <AnimatePresence>
            {hovered && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -10, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute -top-12 px-3 py-1.5 rounded-lg bg-black text-white text-[12px] font-medium tracking-wide whitespace-nowrap shadow-xl z-20"
                >
                    {label}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-[4px] border-transparent border-t-black"></div>
                </motion.div>
            )}
        </AnimatePresence>

        <motion.div
            ref={ref}
            style={{ width, height: width }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="flex items-center justify-center rounded-2xl bg-[#1e1e24] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_8px_20px_rgba(0,0,0,0.4)] border border-white/5 cursor-pointer origin-bottom"
        >
            <Icon className="text-white/80 w-1/2 h-1/2" />
        </motion.div>
    </div>
  );
}

export default function FloatingDockNavbarShowcase() {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

    const mouseX = useMotionValue(Infinity);

    const icons = [
        { icon: Home, label: "About" },
        { icon: FolderKanban, label: "Projects" },
        { icon: Mail, label: "Contact" }
    ];

    return (
        <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-full h-full flex items-end justify-center pb-12 group">

                {/* 🎯 THE NAVBAR DOCK */}
                <motion.div 
                    onMouseMove={(e) => mouseX.set(e.pageX)}
                    onMouseLeave={() => mouseX.set(Infinity)}
                    className="relative flex items-end gap-3 p-3 rounded-3xl bg-[#0a0a0c]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.5)] h-[74px]"
                >
                    {icons.map((item, index) => (
                        <DockIcon key={index} icon={item.icon} label={item.label} mouseX={mouseX} />
                    ))}
                </motion.div>
                
                <span className="absolute bottom-6 text-white/20 text-[11px] font-semibold tracking-widest uppercase pointer-events-none">True Physics Dock</span>
            </div>
</div>
    );
}
