import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Copy, Check, FileText, Image as ImageIcon, BarChart2 } from 'lucide-react';

const promptContent = `A realistic 3D folder card. Hovering opens the front flap and slides out paper files. Vibrant dynamic neon backgrounds transition smoothly.`;

export default function MeshFolderCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [15, -15]), { stiffness: 100, damping: 25 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-15, 15]), { stiffness: 100, damping: 25 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 flex items-center justify-center min-h-[600px] bg-[#f5f5f5] dark:bg-[#09090b] perspective-[1200px]">
        
         <motion.div 
            ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
            style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
            whileHover="hover"
            initial="rest"
            className="relative w-[300px] h-[260px] cursor-pointer group mt-16"
         >
            {/* 📁 Folder Back Cover */}
            <div 
                className="absolute inset-0 bg-[#161618] border border-white/10 shadow-2xl overflow-hidden" 
                style={{ 
                    transform: "translateZ(-20px)",
                    clipPath: "polygon(0% 10%, 55% 10%, 65% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    borderRadius: "0 16px 16px 16px"
                }}
            >
               {/* Color Transitioning Neon Background */}
               <motion.div 
                   animate={{ 
                       background: [
                           "radial-gradient(circle at 0% 0%, #ff0080 0%, transparent 70%), radial-gradient(circle at 100% 100%, #ff8c00 0%, transparent 70%)",
                           "radial-gradient(circle at 100% 0%, #7928ca 0%, transparent 70%), radial-gradient(circle at 0% 100%, #ff0080 0%, transparent 70%)",
                           "radial-gradient(circle at 100% 100%, #00dfd8 0%, transparent 70%), radial-gradient(circle at 0% 0%, #007cf0 0%, transparent 70%)",
                           "radial-gradient(circle at 0% 100%, #ff8c00 0%, transparent 70%), radial-gradient(circle at 100% 0%, #ff0080 0%, transparent 70%)",
                           "radial-gradient(circle at 0% 0%, #ff0080 0%, transparent 70%), radial-gradient(circle at 100% 100%, #ff8c00 0%, transparent 70%)"
                       ] 
                   }}
                   transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-0 opacity-80"
               />
               {/* Dark glass overlay to make it look like a sleek folder */}
               <div className="absolute inset-0 bg-black/50 backdrop-blur-[10px]" />
            </div>

            {/* 📄 Files inside the folder */}
            <motion.div 
                variants={{
                    rest: { y: 10, rotateZ: 0 },
                    hover: { y: -80, rotateZ: -2, transition: { type: "spring", stiffness: 200, damping: 20, delay: 0.05 } }
                }}
                className="absolute top-4 left-4 right-4 h-[220px] bg-white dark:bg-[#e2e2e2] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col p-4 border border-black/10 origin-bottom"
                style={{ transform: "translateZ(-10px)" }}
            >
                <div className="w-full h-10 bg-black/5 rounded-lg mb-3 flex items-center px-3 gap-2 text-black/40">
                    <FileText size={16} /> <div className="h-2 w-24 bg-black/10 rounded-full" />
                </div>
                <div className="w-full h-10 bg-black/5 rounded-lg mb-3 flex items-center px-3 gap-2 text-black/40">
                    <ImageIcon size={16} /> <div className="h-2 w-32 bg-black/10 rounded-full" />
                </div>
                <div className="flex gap-3">
                     <div className="h-20 flex-1 bg-indigo-50 dark:bg-indigo-900/10 rounded-lg border border-indigo-100 dark:border-indigo-900/20 flex items-center justify-center">
                          <BarChart2 className="text-indigo-400 opacity-50" />
                     </div>
                     <div className="h-20 flex-1 bg-rose-50 dark:bg-rose-900/10 rounded-lg border border-rose-100 dark:border-rose-900/20" />
                </div>
            </motion.div>

            {/* 📁 Folder Front Flap */}
            <motion.div 
                variants={{
                    rest: { rotateX: 0 },
                    hover: { rotateX: -30, transition: { type: "spring", stiffness: 200, damping: 20 } }
                }}
                style={{ transformOrigin: "bottom", transformStyle: "preserve-3d", transform: "translateZ(0px)" }}
                className="absolute bottom-0 left-0 w-full h-[75%] bg-[#1a1a1c] shadow-[0_-5px_30px_rgba(0,0,0,0.4)] border-t border-white/10"
            >
               <div className="absolute inset-0 bg-[#1a1a1c] overflow-hidden"
                  style={{
                     clipPath: 'polygon(0% 12%, 35% 12%, 45% 0%, 100% 0%, 100% 100%, 0% 100%)',
                     borderRadius: '0 16px 16px 16px'
                  }}
               >
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                  
                  {/* Flap Content */}
                  <div className="w-full h-full p-6 flex flex-col justify-between" style={{ transform: "translateZ(1px)" }}>
                     <div className="mt-4">
                        <h3 className="text-white font-bold text-[18px] tracking-tight mb-1">Brand Assets</h3>
                        <p className="text-white/40 text-[13px] font-medium tracking-wide">Q3 Campaign</p>
                     </div>

                     <div className="flex items-end justify-between font-bold">
                        <div className="text-white flex items-end gap-1">
                           <span className="text-[36px] leading-none tracking-tighter">12</span>
                           <span className="text-[13px] pb-1 text-white/50">Files</span>
                        </div>
                        <div className="text-emerald-400 text-[11px] pb-1.5 px-3 py-1.5 bg-emerald-400/10 rounded-full border border-emerald-400/20 uppercase tracking-widest font-semibold">
                           Shared
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>
            
         </motion.div>
         
         <span className="absolute bottom-6 right-6 text-black/20 dark:text-white/20 text-[13px] font-semibold tracking-widest uppercase z-10 pointer-events-none">3D Hover Folder</span>
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
