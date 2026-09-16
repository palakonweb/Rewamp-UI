import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { Copy, Check, Search, Plus, Cloud, Heart } from 'lucide-react';

const promptContent = `Glassmorphism travel widget floating over an ocean background. Features a heavily frosted glass container, a top search bar with inset shadow, nested image of Ravello Village with an internal 'Directions' glass button, and a bottom weather/time widget. Extremely premium, soft light scattering effects.`;

export default function RavelloTravelGlassCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 100, damping: 25 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 100, damping: 25 });
  const glareX = useSpring(useTransform(mx, [0, 1], ['-100%', '200%']), { stiffness: 100, damping: 25 });
  const glareY = useSpring(useTransform(my, [0, 1], ['-100%', '200%']), { stiffness: 100, damping: 25 });

  const onMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  const glareBg = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, transparent 40%)`;

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 flex items-center justify-center min-h-[700px] perspective-[1500px]">
        {/* Deep Ocean Background Image simulation */}
        <div className="absolute inset-0 bg-blue-900 overflow-hidden">
           <motion.div animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }} className="absolute inset-[-10%]" style={{ background: 'linear-gradient(180deg, #60a5fa 0%, #1e3a8a 40%, #0f172a 100%)' }} />
           {/* Horizon line & clouds */}
           <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-white/10 blur-[1px]" />
           <motion.div animate={{ x: ['-20%', '120%'] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }} className="absolute top-[20%] w-[200px] h-[50px] bg-white/10 blur-3xl" />
        </div>

        {/* The Glass Card */}
        <motion.div 
          ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}
          style={{
             rotateX: rotX, rotateY: rotY,
             background: 'rgba(255, 255, 255, 0.15)',
             border: '1px solid rgba(255, 255, 255, 0.3)',
             boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4), 0 32px 64px rgba(0,0,0,0.3)'
          }}
          whileHover={{ scale: 1.02, zIndex: 10 }}
          className="relative w-[340px] p-4 rounded-[32px] overflow-hidden backdrop-blur-2xl"
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: 'spring', stiffness: 100, damping: 25 }}
        >
           {/* Dynamic Glare passing over glass */}
           <motion.div className="absolute inset-0 pointer-events-none mix-blend-overlay z-20"
               style={{ background: glareBg }} />

           {/* Top Search Bar */}
           <div className="flex gap-2 mb-4 relative z-10 w-full">
              <motion.div whileTap={{ scale: 0.98 }} className="flex-1 h-12 rounded-full flex items-center px-4 gap-3 bg-white/10 border border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] cursor-text">
                 <Search size={18} className="text-white/80" />
                 <span className="text-white/50 text-[13px]">Search place...</span>
              </motion.div>
              <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} className="w-12 h-12 shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shadow-sm">
                 <Plus size={20} className="text-white/80" />
              </motion.button>
           </div>

           {/* Inner Image Card */}
           <motion.div className="relative w-full h-[240px] rounded-[24px] overflow-hidden mb-4 shadow-xl group">
               {/* Synthetic Village Image */}
               <motion.div className="absolute inset-0 bg-emerald-900"
                   style={{ scale: 1.1, x: useTransform(mx, [0,1], [10, -10]), y: useTransform(my, [0,1], [10, -10]) }}
               >
                  <div className="absolute inset-0 opacity-90" style={{ background: 'linear-gradient(180deg, #3b82f6 0%, #064e3b 80%)' }} />
                  <div className="absolute right-0 bottom-0 w-[80%] h-[60%] bg-green-800 rounded-tl-[100px]" style={{ clipPath: 'polygon(10% 100%, 40% 40%, 100% 20%, 100% 100%)' }} />
                  <div className="absolute right-[20%] bottom-[20%] flex gap-1 flex-wrap w-[40px]">
                     {Array.from({length:6}).map((_,i)=><motion.div key={i} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2+Math.random()*2, repeat: Infinity }} className="w-2 h-2 bg-orange-200/80 rounded-[1px]"/>)}
                  </div>
               </motion.div>
               
               {/* Info Overlay */}
               <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                  <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                     <p className="text-white/80 text-[10px] font-bold mb-0.5">365m</p>
                     <h3 className="text-white font-bold text-[18px] leading-tight drop-shadow-md">Ravello Village</h3>
                     <p className="text-white/60 text-[11px] drop-shadow-sm">Amalfi Coast</p>
                  </motion.div>
                  {/* Inner Glass Button */}
                  <motion.button whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.95 }}
                     className="px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[12px] font-medium shadow-xl">
                     Directions
                  </motion.button>
               </div>
           </motion.div>

           {/* Bottom Weather Widget */}
           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-full px-2 pb-2 relative z-10 flex items-start justify-between">
              <div className="flex gap-4">
                 <motion.div animate={{ y: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
                    <Cloud size={24} className="text-white mt-1 drop-shadow-md" />
                 </motion.div>
                 <div>
                    <p className="text-white font-medium text-[14px] leading-tight mb-1 drop-shadow-sm">24°C</p>
                    <p className="text-white/80 text-[12px] leading-snug drop-shadow-sm">Sea breeze · <span className="font-bold">12 km/h</span></p>
                    <p className="text-white/80 text-[12px] leading-snug drop-shadow-sm">Golden Hour in <span className="font-bold">42 min</span></p>
                 </div>
              </div>
              <motion.button whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.2)' }} whileTap={{ scale: 0.9 }} className="w-10 h-10 shrink-0 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mt-1 shadow-sm group">
                 <Heart size={16} className="text-white/50 group-hover:text-rose-400 group-hover:fill-rose-400 transition-colors" />
              </motion.button>
           </motion.div>
        </motion.div>
      </div>
</div>
  );
}
