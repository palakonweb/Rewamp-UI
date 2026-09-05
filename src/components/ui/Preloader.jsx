import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextHoverEffect } from '../TextHoverEffect';

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-b from-white via-white to-[#F7E6E6] select-none"
          style={{ position: 'fixed' }}
        >
          <div className="w-full max-w-4xl px-8 flex flex-col items-center justify-center gap-12">
            <motion.img 
              src="/purrform-logo.png" 
              alt="Purrform Logo" 
              className="h-24 md:h-32 w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="w-full h-[240px] flex items-center justify-center">
              <TextHoverEffect text="PURRFORM" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <div className="text-[10px] tracking-[0.25em] font-mono font-medium text-[#4a0000] uppercase select-none">
              INITIALIZING EXPERIENCE
            </div>
            <div className="relative w-48 h-0.5 bg-[#4a0000]/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/2 bg-[#810100] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
