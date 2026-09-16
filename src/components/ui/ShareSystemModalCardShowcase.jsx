import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Search, X, CornerRightUp } from 'lucide-react';

const promptContent = `Clean, functional utility modal showcasing both light and dark mode overlapping. Features stacked avatar faces with subtle colored rings, copy link buttons with soft borders, and a dark/light 'Create Link' action button. High emphasis on typography and spacing.`;

function ShareModal({ theme = 'light', style, initial, animate, variants, transition }) {
  const isDark = theme === 'dark';
  const bg = isDark ? '#1a1a1c' : '#ffffff';
  const text = isDark ? 'text-white' : 'text-slate-900';
  const textMuted = isDark ? 'text-white/50' : 'text-slate-500';
  const border = isDark ? 'border-white/10' : 'border-black/5';
  const buttonBg = isDark ? 'bg-white text-black' : 'bg-slate-900 text-white';
  const copyBtnBg = isDark ? 'border-white/10 text-white hover:bg-white/5' : 'border-slate-200 text-slate-700 hover:bg-slate-50';
  const searchBg = isDark ? 'bg-white/5 border-white/5 text-white cursor-text' : 'bg-slate-50 border-slate-100 text-slate-800 cursor-text';
  
  return (
     <motion.div initial={initial} animate={animate} variants={variants} transition={transition}
        className={`w-[320px] rounded-3xl p-5 shadow-2xl relative border ${border}`}
        style={{ background: bg, ...style }}
     >
        <div className="flex items-center justify-between mb-5">
           <h3 className={`font-bold text-[14px] ${text}`}>Share With Users</h3>
           <X size={16} className={`${textMuted} cursor-pointer hover:opacity-70`} />
        </div>

        {/* Avatars & Search */}
        <div className="flex items-center gap-3 mb-6">
           <div className="flex -space-x-2">
              {['bg-orange-200 ring-orange-100', 'bg-blue-200 ring-blue-100', 'bg-red-200 ring-red-100', 'bg-cyan-200 ring-cyan-100'].map((c, i) => (
                 <div key={i} className={`w-8 h-8 rounded-full border-2 ${isDark ? 'border-[#1a1a1c]' : 'border-white'} flex items-center justify-center overflow-hidden ring-1 ${c.split(' ')[1]} ${c.split(' ')[0]}`}>
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover mix-blend-multiply" />
                 </div>
              ))}
           </div>
           <button className={`w-8 h-8 rounded-full flex items-center justify-center border ${searchBg}`}>
              <Search size={14} className={textMuted} />
           </button>
        </div>

        <h4 className={`text-[12px] font-bold mb-4 ${text}`}>Share Links</h4>

        {/* Links List */}
        <div className="flex flex-col gap-4 mb-6">
           {[{ t: 'New York, United States', d: 'site.com/f/gh44hfhfhhfh..' }, { t: 'Link to Share Post', d: 'site.com/f/gh44hfhfhhfh..' }].map((l, i) => (
              <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                         <CornerRightUp size={14} className={textMuted} />
                      </div>
                      <div className="min-w-0">
                         <p className={`text-[12px] font-bold truncate ${text}`}>{l.t}</p>
                         <p className={`text-[10px] truncate ${textMuted}`}>{l.d}</p>
                      </div>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                     className={`px-3 py-1.5 rounded-full text-[10px] font-bold border shrink-0 transition-colors ${copyBtnBg}`}>
                     Copy
                  </motion.button>
              </div>
           ))}
        </div>

        {/* Footer actions */}
        <div className={`pt-4 border-t border-dashed flex items-center justify-between ${isDark ? 'border-white/10' : 'border-black/10'}`}>
           <span className={`text-[11px] font-medium ${isDark ? 'text-white/60' : 'text-slate-500'}`}>Link to Share Post</span>
           <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-[11px] font-bold ${buttonBg} hover:opacity-90 transition-opacity`}>
              Create Link
           </motion.button>
        </div>
     </motion.div>
  );
}

export default function ShareSystemModalCardShowcase() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 p-8 flex items-center justify-center bg-[#f4f4f5] dark:bg-black/50 min-h-[700px]">
         
         {/* Top Label */}
         <div className="absolute top-12 text-center w-full mt-4">
             <h2 className="font-bold text-slate-800 dark:text-white text-[20px]">One Design System</h2>
         </div>

         {/* Stacked Modals Container */}
         <motion.div initial="initial" whileHover="hover" className="relative w-full max-w-[400px] h-[500px] flex items-center justify-center perspective-[1000px] mt-10 cursor-pointer group">
            {/* Dark Modal (Bottom/Back) */}
            <ShareModal 
               theme="dark" 
               style={{ position: 'absolute', zIndex: 1 }}
               variants={{
                  initial: { y: 20, scale: 0.9, opacity: 1, rotate: -2, x: -10 },
                  hover: { y: -20, scale: 0.95, x: -60, rotate: -6 }
               }}
               transition={{ type: "spring", stiffness: 100, damping: 25 }}
            />
            {/* Light Modal (Top/Front) */}
            <ShareModal 
               theme="light" 
               style={{ position: 'absolute', zIndex: 2 }}
               variants={{
                  initial: { y: -20, scale: 1, opacity: 1, rotate: 2, x: 10 },
                  hover: { y: -60, scale: 1.05, x: 60, rotate: 6 }
               }}
               transition={{ type: "spring", stiffness: 100, damping: 25 }}
            />
         </motion.div>

         {/* Bottom branding */}
         <div className="absolute bottom-12 text-center w-full">
            <span className="font-bold text-blue-600 text-[16px] flex items-center justify-center gap-2">
               www.spline.one
            </span>
         </div>
      </div>
</div>
  );
}
