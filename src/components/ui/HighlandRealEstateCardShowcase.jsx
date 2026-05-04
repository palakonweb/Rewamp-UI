import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Copy, Check, Bed, Bath, Expand, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const promptContent = `Real estate card with full-bleed background image of a highland house, top left dark transparent pill 'Newly Listed', bottom dark blurred gradient overlay. Carousel pagination dots in center. Crisp text for pricing '$200k', location '254 Highland Ave', and utility icons (Bed/Bath/Sqft) separated by subtle vertical dividers in the footer. Premium, high-contrast, moody aesthetic.`;

const images = [
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=800&auto=format&fit=crop"
];

export default function HighlandRealEstateCardShowcase() {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCopy = () => { navigator.clipboard.writeText(promptContent); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const rotX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 110, damping: 25 });
  const rotY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 110, damping: 25 });
  const parX = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 110, damping: 25 });
  const parY = useSpring(useTransform(my, [0, 1], [-8, 8]), { stiffness: 110, damping: 25 });
  const glareOpacity = useTransform(my, [0, 1], [0.5, 0]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      <div className="relative w-full rounded-[24px] overflow-hidden border border-black/5 dark:border-white/5 p-8 flex items-center justify-center bg-[#f0ede8] dark:bg-[#0c0c0e] min-h-[640px]">

        {/* Subtle dot-grid bg */}
        <div className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #00000018 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

        {/* The Card */}
        <motion.div
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 1200 }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 110, damping: 25 }}
          className="relative w-[340px] h-[500px] rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.35)] cursor-pointer"
        >
          {/* ── Parallax Image Layer ── */}
          <motion.div style={{ x: parX, y: parY, scale: 1.12 }} className="absolute inset-0">
            {/* Base gradient scenery */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-700 via-emerald-900/80 to-[#060e0a]" />
            {/* Auto slideshow images */}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${images[currentImage]}')` }}
              />
            </AnimatePresence>
          </motion.div>

          {/* ── Gradient Overlay (bottom 55% of card) ── */}
          <div className="absolute bottom-0 left-0 right-0 h-[65%] pointer-events-none"
            style={{ background: 'linear-gradient(to top, #060e0a 30%, rgba(6,14,10,0.85) 60%, transparent 100%)' }} />

          {/* ── Glare ── */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none mix-blend-soft-light"
            style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 55%)', opacity: glareOpacity }}
          />

          {/* ── Top Pills ── */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
            <motion.div
              initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.5, ease: [0.22,1,0.36,1] }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10"
            >
              {/* Pulsing green dot */}
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
              </span>
              <span className="text-white text-[11px] font-semibold tracking-wide">Newly Listed</span>
            </motion.div>

            <motion.button
              initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25, duration: 0.5, ease: [0.22,1,0.36,1] }}
              onClick={() => setLiked(l => !l)}
              whileTap={{ scale: 0.85 }}
              className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
            >
              <Heart
                size={14}
                className={liked ? 'text-rose-400 fill-rose-400' : 'text-white/70'}
                style={{ transition: 'color 0.2s, fill 0.2s' }}
              />
            </motion.button>
          </div>

          {/* ── Parallax Leaf SVG (opposite direction) ── */}
          <motion.svg
            style={{ x: useTransform(parX, x => -x * 0.4), y: useTransform(parY, y => -y * 0.4) }}
            className="absolute top-0 left-0 w-36 h-36 pointer-events-none z-10 opacity-90"
            viewBox="0 0 100 100"
          >
            <path d="M0,0 Q30,12 38,42 Q18,28 0,18 Z" fill="#040d07" />
            <path d="M0,0 Q42,6 52,32 Q22,22 0,8 Z" fill="#051009" />
            <path d="M8,0 Q52,-4 62,22 Q32,14 8,0 Z" fill="#051009" />
          </motion.svg>

          {/* ── Content Footer ── */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 flex flex-col gap-0">

            {/* Pagination dots */}
            <div className="flex justify-center gap-1.5 mb-5">
              {images.map((_, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.6 }}
                  className="rounded-full cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage(i);
                  }}
                  style={{
                    width: currentImage === i ? 16 : 6,
                    height: 6,
                    background: currentImage === i ? '#fff' : 'rgba(255,255,255,0.3)',
                    transition: 'width 0.3s, background 0.3s',
                  }}
                />
              ))}
            </div>

            {/* Title + Price */}
            <div className="flex items-baseline justify-between mb-1">
              <motion.h2
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}
                className="text-white font-bold text-[21px] tracking-tight leading-tight"
              >
                Highland Huts
              </motion.h2>
              <motion.span
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.35, duration: 0.5 }}
                className="text-white font-bold text-[18px] leading-tight"
              >
                $200k
              </motion.span>
            </div>

            {/* Location */}
            <motion.div
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-1 mb-4"
            >
              <MapPin size={11} className="text-white/50 shrink-0" />
              <p className="text-white/55 text-[12px] truncate">254 Highland Ave, Los Angeles</p>
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.45, duration: 0.5, ease: [0.22,1,0.36,1] }}
              className="w-full h-px bg-white/15 mb-4 origin-left"
            />

            {/* Feature row */}
            <motion.div
              initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-1.5">
                <Bed size={13} className="text-white/50" />
                <span className="text-white/60 text-[11px]">Beds <span className="font-bold text-white">2</span></span>
              </div>
              <div className="w-px h-3.5 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Bath size={13} className="text-white/50" />
                <span className="text-white/60 text-[11px]">Baths <span className="font-bold text-white">1</span></span>
              </div>
              <div className="w-px h-3.5 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Expand size={13} className="text-white/50" />
                <span className="text-white/60 text-[11px]">Sqft <span className="font-bold text-white">1,150</span></span>
              </div>

              {/* View button */}
              <motion.button
                whileHover={{ scale: 1.08, background: 'rgba(255,255,255,0.2)' }}
                whileTap={{ scale: 0.94 }}
                className="ml-2 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/10 border border-white/15 text-white text-[10px] font-semibold shrink-0"
              >
                View <ArrowUpRight size={10} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Prompt card */}
      <div className="w-full rounded-2xl bg-white dark:bg-[#111] border border-black/5 dark:border-white/10 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-black/40 dark:text-white/40 uppercase tracking-widest font-semibold mb-2">Prompt Inspiration</p>
          <code className="text-[12px] text-black/70 dark:text-white/70 font-mono leading-relaxed">{promptContent}</code>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-all shrink-0">
          {copied
            ? <><Check size={16} className="text-emerald-500" /><span className="text-[13px] font-medium text-emerald-500">Copied</span></>
            : <><Copy size={16} className="text-black/60 dark:text-white/60" /><span className="text-[13px] font-medium text-black/70 dark:text-white/70">Copy</span></>
          }
        </button>
      </div>
    </div>
  );
}
