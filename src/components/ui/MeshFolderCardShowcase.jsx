import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check } from 'lucide-react';

const promptContent = `A square dark folder card where the top half is a vibrant animated mesh gradient background, and the bottom half is a dark folder flap overlaying it. Displays '04 Tags' and '1012 Shots' in typography. High contrast, clean SaaS UI.`;

export default function MeshFolderCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 100, damping: 25 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 100, damping: 25 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 flex items-center justify-center min-h-[600px] bg-[#fdfdfd] dark:bg-[#050505] perspective-[1000px]">
        
         <motion.div 
            ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="relative w-[300px] h-[300px] rounded-[32px] overflow-hidden shadow-2xl cursor-pointer bg-black p-[2px]"
         >
            {/* The animated mesh gradient background (back folder wall) */}
            <div className="w-full h-full rounded-[30px] overflow-hidden relative">
               <div className="absolute inset-0 bg-[#ff7a00]" />
               <motion.div 
                  animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], y: [0, 30, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_center,_#ff0080_0%,_transparent_60%)] mix-blend-screen opacity-80"
               />
               <motion.div 
                  animate={{ scale: [1, 1.5, 1], x: [0, -40, 0], y: [0, -50, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[120%] bg-[radial-gradient(ellipse_at_center,_#ffd700_0%,_transparent_60%)] mix-blend-screen opacity-60"
               />

               {/* Black Folder Flap */}
               {/* Using SVG clip path to create the actual folder tab cut out on the left side */}
               <div className="absolute bottom-0 left-0 w-full h-[65%] bg-[#1c1c1f] shadow-[0_-5px_20px_rgba(0,0,0,0.5)] border-t border-white/5"
                  style={{
                     clipPath: 'polygon(0% 15%, 35% 15%, 45% 0%, 100% 0%, 100% 100%, 0% 100%)'
                  }}
               >
                  {/* Flap Content */}
                  <div className="w-full h-full p-6 flex flex-col justify-between">
                     <div className="mt-4">
                        <h3 className="text-white font-bold text-[16px] leading-tight mb-1">Designs</h3>
                        <p className="text-white/40 text-[12px]">Web & App Designs</p>
                     </div>

                     <div className="flex items-end justify-between font-bold">
                        <div className="text-white flex items-end gap-1">
                           <span className="text-[32px] leading-none tracking-tighter">04</span>
                           <span className="text-[12px] pb-1">Tags</span>
                        </div>
                        <div className="text-white/60 text-[11px] pb-1">
                           1012 Shots
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </motion.div>
      </div>

      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Inspiration</p>
          <code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></> : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>}
        </button>
      </div>
    </div>
  );
}
