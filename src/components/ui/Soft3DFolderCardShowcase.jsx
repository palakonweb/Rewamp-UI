import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, MoreVertical } from 'lucide-react';

const promptContent = `Soft 3D purple folder illustration constructed with CSS and Framer Motion. Features a layered back folder tab, stacked floating white pages inside, and a glossy, semi-transparent purple front flap. Includes simple text 'Designs 318 images' and an opaque glassy reflection. Floating on a clean minimal grid background.`;

export default function Soft3DFolderCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 p-8 flex items-center justify-center min-h-[600px] bg-[#f8f9fc] dark:bg-[#0a0a0c]">
         
         {/* Subtle background grid pattern */}
         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }} />

         {/* 3D Folder Container */}
         <motion.div 
            initial="initial" whileHover="hover" animate="idle"
            variants={{ idle: { y: [-5, 5, -5] } }}
            transition={{ idle: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
            className="relative w-[280px] h-[240px] cursor-pointer group"
            style={{ perspective: '1200px' }}
         >
            {/* Back Folder Part (The taller back tab) */}
            <div className="absolute top-0 left-0 w-[45%] h-[40px] rounded-t-[16px] bg-[#7c3aed] shadow-inner border border-[#6d28d9] border-b-0" />
            <div className="absolute top-[20px] left-0 w-[100%] h-[200px] rounded-[24px] rounded-tl-none bg-[#7c3aed] shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]" />
            <div className="absolute top-0 right-0 w-[60%] h-[40px] bg-[#7c3aed] rounded-tr-[24px] bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] shadow-inner" style={{ clipPath: 'polygon(15% 100%, 0% 50%, 10% 0%, 100% 0%, 100% 100%)', left: '40%' }} />

            {/* Stacked Pages inside */}
            <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[85%] h-[160px] preserve-3d">
               {/* Lowest page */}
               <motion.div variants={{ initial: { y: 0, rotate: -5 }, hover: { y: -20, rotate: -10 } }} transition={{ type: 'spring', stiffness: 100, damping: 25 }} className="absolute bottom-0 left-2 w-[90%] h-full bg-white/80 rounded-t-[16px] border border-white/50 shadow-sm origin-bottom" />
               {/* Middle page */}
               <motion.div variants={{ initial: { y: 0, rotate: 3 }, hover: { y: -30, rotate: 8 } }} transition={{ type: 'spring', stiffness: 100, damping: 25, delay: 0.05 }} className="absolute bottom-0 left-4 w-[90%] h-full bg-white/90 rounded-t-[16px] border border-white shadow-sm origin-bottom" />
               {/* Top page */}
               <motion.div variants={{ initial: { y: 0, rotate: 0 }, hover: { y: -40, rotate: 0 } }} transition={{ type: 'spring', stiffness: 100, damping: 25, delay: 0.1 }} className="absolute bottom-0 left-3 w-[90%] h-full bg-white rounded-t-[16px] border border-slate-200 shadow-md flex p-4 origin-bottom">
                  {/* Faux content on the page */}
                  <div className="w-full flex flex-col gap-2 opacity-20">
                     <div className="w-full h-3 bg-slate-300 rounded-sm" />
                     <div className="w-3/4 h-3 bg-slate-300 rounded-sm" />
                     <div className="w-5/6 h-3 bg-slate-300 rounded-sm mt-4" />
                     <div className="w-1/2 h-3 bg-slate-300 rounded-sm" />
                  </div>
               </motion.div>
            </div>

            {/* Front Glossy Folder Flap */}
            <motion.div variants={{ initial: { rotateX: 0 }, hover: { rotateX: -15 } }} transition={{ type: 'spring', stiffness: 100, damping: 25 }} className="absolute bottom-0 left-0 w-full h-[180px] rounded-[24px] overflow-hidden shadow-[0_-4px_20px_rgba(124,58,237,0.3),_0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-md origin-bottom"
               style={{ 
                 background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.95) 0%, rgba(109, 40, 217, 0.95) 100%)',
                 borderTop: '1px solid rgba(255,255,255,0.4)',
                 borderLeft: '1px solid rgba(255,255,255,0.3)',
                 borderRight: '1px solid rgba(255,255,255,0.1)'
               }}
            >
               {/* Glossy reflection on the front flap */}
               <div className="absolute top-0 left-0 w-[150%] h-[100%] bg-gradient-to-b from-white/30 to-transparent transform -skew-x-[30deg] -translate-x-[50px] pointer-events-none" />
               <div className="absolute bottom-[-20px] right-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

               {/* Content on the front flap */}
               <div className="p-5 flex flex-col h-full justify-between relative z-10">
                  <div className="flex justify-between items-start">
                     <div>
                        <h2 className="text-white font-bold text-[20px] tracking-tight leading-none mb-1 shadow-sm">Designs</h2>
                        <p className="text-white/80 text-[12px] font-medium">318 images</p>
                     </div>
                     <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors">
                        <MoreVertical size={14} className="text-white" />
                     </div>
                  </div>
                  <div className="text-white/60 text-[10px] font-medium mt-auto border-t border-white/10 pt-3">
                     Last added time Oct 13, 2025
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </div>
</div>
  );
}
