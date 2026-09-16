import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import ShimmerButton from './ShimmerButton';

export default function ShimmerButtonShowcase() {
  const [variant, setVariant] = useState('dark');
  const [clickNotice, setClickNotice] = useState(0);

  const handleButtonClick = () => {
    setClickNotice((n) => n + 1);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 px-4">
      {/* Interactive Stage Canvas */}
      <div className="w-full max-w-lg flex flex-col items-center justify-center min-h-[300px] p-10 rounded-2xl bg-[#FFFDF2] border border-[#D9D9D6]/80 shadow-[inset_0_2px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
        
        {/* Soft atmospheric background gradient reflecting ambient warm daylight */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF6ED]/60 via-transparent to-[#F1E6D7]/30 pointer-events-none" />

        {/* The Star of the Show: Shimmer Button */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <ShimmerButton
            variant={variant}
            text="View Designs"
            onClick={handleButtonClick}
          />

          {/* Feedback notice upon click */}
          <div className="h-6 flex items-center justify-center">
            {clickNotice > 0 && (
              <motion.span
                key={clickNotice}
                initial={{ opacity: 0, y: 4, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-[#EC5E27] flex items-center gap-1.5"
              >
                <Sparkles size={12} /> Clicked {clickNotice} time{clickNotice === 1 ? '' : 's'} — sheen accelerated!
              </motion.span>
            )}
          </div>
        </div>

        {/* Variant Switcher Toolbar */}
        <div className="relative z-10 mt-6 flex items-center gap-1.5 p-1.5 rounded-full bg-[#FAF6ED] border border-[#D9D9D6] shadow-xs">
          {[
            { id: 'dark', label: 'Obsidian (Video)', icon: '🌑' },
            { id: 'purrform', label: 'Purrform Warm', icon: '🔥' },
            { id: 'light', label: 'Minimal Sand', icon: '🥛' },
          ].map((v) => (
            <button
              key={v.id}
              onClick={() => setVariant(v.id)}
              className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                variant === v.id
                  ? 'bg-[#1F1F1F] text-[#FFFDF2] shadow-xs'
                  : 'text-[#6B6B6B] hover:text-[#1F1F1F] hover:bg-black/5'
              }`}
            >
              <span>{v.icon}</span>
              <span>{v.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
