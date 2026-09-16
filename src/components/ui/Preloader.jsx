import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextHoverEffect } from '../TextHoverEffect';

export function Preloader() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined' && (window.location.pathname.startsWith('/components') || sessionStorage.getItem('rewamp_loaded'))) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    sessionStorage.setItem('rewamp_loaded', 'true');
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAFAFA] dark:bg-[#0d0c10] select-none"
          style={{ position: 'fixed' }}
        >
          <div className="w-full max-w-4xl px-8 flex flex-col items-center justify-center gap-8">
            <motion.img
              src="/logo.svg"
              alt="RewampUI Logo"
              className="h-20 w-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="w-full h-[180px] flex items-center justify-center">
              <TextHoverEffect text="REWAMP" />
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mt-4 flex flex-col items-center gap-3"
          >
            <div className="text-[10px] tracking-[0.25em] font-mono font-medium text-neutral-500 uppercase select-none">
              PROMPTS TO BETTER INTERFACES
            </div>
            <div className="relative w-48 h-0.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="absolute top-0 bottom-0 w-1/2 bg-[#C1B4D8] rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
