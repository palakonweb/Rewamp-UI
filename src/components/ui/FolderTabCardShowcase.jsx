import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft } from 'lucide-react';
import FolderTabCard from './FolderTabCard';

export const folderTabCardPrompt = `A tactile modern UI card with an asymmetrical folder-tab cutout sheet:
- Top portion features an ethereal animated mesh aurora gradient in brand lavender palette.
- Translucent frosted glass circular action button with diagonal arrow in the top right.
- Distinctive folder tab cutout silhouette with rounded convex and concave fillets.
- Category heading "Designs" and subtitle "Web & App Designs" placed inside the raised left tab.
- Bottom metrics row displaying prominent "04 Tags" counter and "1012 Shots" badge.
- Interactive 3D mouse tilt physics and fluid multi-blob gradient mesh animation.
- Seamless Dark Mode (obsidian card with luminous lavender aurora) and Light Mode (crisp ceramic surface with pastel lavender-peach glow).
- Clicking the diagonal arrow button opens a full gallery grid of the design's shots with a scale+fade transition - header, close button, and a staggered-in tile grid - then can be closed to return to the card.`;

const SHOTS = [
  { label: 'Hero Section', gradient: 'linear-gradient(135deg, #C1B4D8 0%, #9C8EB8 100%)' },
  { label: 'Onboarding', gradient: 'linear-gradient(135deg, #7DD3FC 0%, #818CF8 100%)' },
  { label: 'Dashboard', gradient: 'linear-gradient(135deg, #FBA27A 0%, #E4DDF0 100%)' },
  { label: 'Pricing', gradient: 'linear-gradient(135deg, #D4CBE5 0%, #A895C2 100%)' },
  { label: 'Settings', gradient: 'linear-gradient(135deg, #BAE6FD 0%, #C7D2FE 100%)' },
  { label: 'Profile', gradient: 'linear-gradient(135deg, #FCD5C2 0%, #EEEAF7 100%)' },
  { label: 'Checkout', gradient: 'linear-gradient(135deg, #9C8EB8 0%, #6A5688 100%)' },
  { label: 'Empty State', gradient: 'linear-gradient(135deg, #E4DDF0 0%, #D4CBE5 100%)' },
];

export default function FolderTabCardShowcase() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <motion.div
        className="w-full flex items-center justify-center"
        animate={{ opacity: galleryOpen ? 0 : 1, scale: galleryOpen ? 0.94 : 1 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{ pointerEvents: galleryOpen ? 'none' : 'auto' }}
      >
        <FolderTabCard
          title="Designs"
          subtitle="Web & App Designs"
          tagsCount="04"
          tagsLabel="Tags"
          shotsCount="1012 Shots"
          onAction={() => setGalleryOpen(true)}
        />
      </motion.div>

      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className={`absolute inset-2 sm:inset-4 z-30 rounded-[28px] sm:rounded-[32px] overflow-hidden border flex flex-col ${
              isDark
                ? 'bg-[#0c0b10] border-white/10 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.65)]'
                : 'bg-white border-black/8 shadow-[0_24px_50px_-12px_rgba(156,142,184,0.22)]'
            }`}
          >
            {/* Header */}
            <div className={`flex items-center justify-between px-5 sm:px-7 py-4 sm:py-5 border-b shrink-0 ${
              isDark ? 'border-white/10' : 'border-black/8'
            }`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setGalleryOpen(false)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-neutral-800'
                  }`}
                  aria-label="Back to card"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <h3 className={`text-base sm:text-lg font-bold tracking-tight leading-none ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    Designs
                  </h3>
                  <p className={`text-[11px] sm:text-xs font-medium mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    Web & App Designs - 1012 Shots
                  </p>
                </div>
              </div>
              <button
                onClick={() => setGalleryOpen(false)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-black/5 hover:bg-black/10 text-neutral-800'
                }`}
                aria-label="Close gallery"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto no-scrollbar p-4 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {SHOTS.map((shot, i) => (
                  <motion.div
                    key={shot.label}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.35, ease: 'easeOut' }}
                    className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                    style={{ background: shot.gradient }}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                    <span className="absolute bottom-2 left-2.5 text-[11px] font-semibold text-white/90 drop-shadow">
                      {shot.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!galleryOpen && (
        <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
          Click arrow to explore design
        </p>
      )}
    </div>
  );
}

FolderTabCardShowcase.customTitle = 'Folder Tab Card';
FolderTabCardShowcase.customSlug = 'folder-tab-card';
