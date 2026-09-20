import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * FolderTabCard
 * A modern tactile UI card featuring an ethereal animated mesh aurora gradient header,
 * circular diagonal glass arrow action button, and an asymmetrical folder-tab cutout sheet
 * housing category metadata and dynamic metrics.
 * 
 * Supports both dark and light modes with responsive text sizing and layout.
 */
export default function FolderTabCard({
  title = "Components",
  subtitle = "Modern UI Library",
  tagsCount = "48",
  tagsLabel = "Items",
  shotsCount = "100% Free",
  onAction = null,
  className = "",
}) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return true;
  });

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const applyWidth = (w) => setIsCompact(w < 220);
    applyWidth(el.getBoundingClientRect().width);
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) applyWidth(entry.contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 45;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 45;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div className="flex items-center justify-center w-full max-w-full h-full max-h-full p-1 select-none">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[310px] sm:max-w-[330px] aspect-[4/5] max-h-[min(410px,100%)] rounded-[28px] sm:rounded-[32px] p-2 sm:p-2.5 overflow-hidden transition-colors duration-300 ${
          isDark
            ? "bg-[#0c0b10] border border-white/10 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)]"
            : "bg-[#FFFFFF] border border-black/8 shadow-[0_20px_45px_-12px_rgba(156,142,184,0.22)]"
        } ${className}`}
      >
        {/* Inner Card Canvas with Rounded Corners */}
        <div className="relative w-full h-full rounded-[24px] sm:rounded-[26px] overflow-hidden">

          {/* ── 1. Background Animated Mesh Gradient (Brand Lilac Palette) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Base Background Tint */}
            <div 
              className={`absolute inset-0 transition-colors duration-500 ${
                isDark ? "bg-[#090710]" : "bg-[#F3EEFA]"
              }`} 
            />

            {/* Continuous Swirling Mesh Container with Organic Drift & Hover Reactivity */}
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{ 
                rotate: { duration: 22, repeat: Infinity, ease: "linear" },
                x: { type: "spring", stiffness: 120, damping: 18 },
                y: { type: "spring", stiffness: 120, damping: 18 },
              }}
              className="absolute -top-[35%] -left-[35%] w-[170%] h-[170%] pointer-events-none"
            >
              {/* Blob 1: Strong Brand Lilac (#9C8EB8 / #C1B4D8) */}
              <motion.div
                animate={{
                  x: [-55, 50, -35, -55],
                  y: [-35, 45, -50, -35],
                  scale: [1, 1.35, 0.88, 1],
                  borderRadius: [
                    "42% 58% 70% 30% / 45% 45% 55% 55%",
                    "58% 42% 35% 65% / 60% 35% 65% 40%",
                    "42% 58% 70% 30% / 45% 45% 55% 55%",
                  ],
                }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[20%] left-[15%] w-[68%] h-[68%] blur-[22px]"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #C1B4D8 0%, #9C8EB8 45%, #6A5688 80%, rgba(106,86,136,0) 100%)"
                    : "radial-gradient(circle, #C1B4D8 0%, #D4CBE5 50%, #A895C2 85%, rgba(168,149,194,0) 100%)",
                }}
              />

              {/* Blob 2: Radiant Luminous Core White-Lilac Highlight */}
              <motion.div
                animate={{
                  x: [45, -50, 35, 45],
                  y: [35, -40, 50, 35],
                  scale: [0.9, 1.45, 0.92, 0.9],
                  borderRadius: [
                    "50% 50% 42% 58% / 42% 58% 50% 50%",
                    "42% 58% 58% 42% / 52% 42% 58% 48%",
                    "50% 50% 42% 58% / 42% 58% 50% 50%",
                  ],
                }}
                transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[24%] left-[22%] w-[58%] h-[58%] blur-[16px]"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #FFFFFF 0%, #E4DDF0 35%, #D4CBE5 68%, rgba(212,203,229,0) 90%)"
                    : "radial-gradient(circle, #FFFFFF 0%, #FBFAFE 40%, #D4CBE5 75%, rgba(212,203,229,0) 95%)",
                }}
              />

              {/* Blob 3: Soft Ethereal Sky/Cyan Accent */}
              <motion.div
                animate={{
                  x: [40, -35, 45, 40],
                  y: [-45, 40, -25, -45],
                  scale: [0.85, 1.3, 0.9, 0.85],
                }}
                transition={{ duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[16%] right-[12%] w-[55%] h-[55%] blur-[22px] opacity-85"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #7DD3FC 0%, #818CF8 35%, #9C8EB8 65%, rgba(156,142,184,0) 90%)"
                    : "radial-gradient(circle, #BAE6FD 0%, #C7D2FE 40%, #D4CBE5 75%, rgba(212,203,229,0) 95%)",
                }}
              />

              {/* Blob 4: Warm Peach-Dawn Accent */}
              <motion.div
                animate={{
                  x: [-45, 40, -25, -45],
                  y: [35, -40, 30, 35],
                  scale: [0.88, 1.32, 0.85, 0.88],
                }}
                transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[8%] left-[8%] w-[52%] h-[52%] blur-[20px] opacity-80"
                style={{
                  background: isDark
                    ? "radial-gradient(circle, #FBA27A 0%, #E4DDF0 45%, rgba(228,221,240,0) 80%)"
                    : "radial-gradient(circle, #FCD5C2 0%, #EEEAF7 50%, rgba(238,234,247,0) 80%)",
                }}
              />
            </motion.div>

            {/* Vignette */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isDark 
                  ? "bg-gradient-to-t from-black/50 via-transparent to-transparent" 
                  : "bg-gradient-to-t from-white/20 via-transparent to-transparent"
              }`}
            />
          </div>

          {/* ── 2. Top Glass Action Button (Diagonal Arrow ↗) ── */}
          <div className="absolute z-20 top-3 right-3 sm:top-3.5 sm:right-3.5">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAction}
              className={`rounded-full flex items-center justify-center backdrop-blur-xl transition-colors duration-200 cursor-pointer shadow-sm ${
                isCompact ? 'w-8 h-8' : 'w-9 h-9 sm:w-10 sm:h-10'
              } ${
                isDark
                  ? "bg-white/25 hover:bg-white/35 text-white border border-white/30 shadow-black/20"
                  : "bg-white/75 hover:bg-white/95 text-neutral-800 border border-black/8 shadow-black/5"
              }`}
              title="Explore Design"
            >
              <ArrowUpRight className={`transition-transform duration-200 ${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4 sm:w-4.5 sm:h-4.5'}`} />
            </motion.button>
          </div>

          {/* ── 3. Asymmetrical Folder-Tab Cutout Sheet ── */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
            <div className="relative w-full h-[60%]">
              {/* SVG Cutout Silhouette Path matching Video Geometry with generous tab width */}
              <svg
                viewBox="0 0 380 240"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full filter drop-shadow-[0_-10px_20px_rgba(0,0,0,0.16)]"
              >
                <path
                  d="M 0 28
                     A 28 28 0 0 1 28 0
                     L 180 0
                     A 22 22 0 0 1 202 22
                     A 22 22 0 0 0 224 44
                     L 352 44
                     A 28 28 0 0 1 380 72
                     L 380 212
                     A 28 28 0 0 1 352 240
                     L 28 240
                     A 28 28 0 0 1 0 212
                     Z"
                  fill={isDark ? "#14131A" : "#FFFFFF"}
                  stroke={isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.06)"}
                  strokeWidth="1"
                />
              </svg>

              {/* Foreground Typography & Metrics inside the Folder Flap */}
              <div className={`relative z-20 w-full h-full flex flex-col justify-between pointer-events-auto ${
                isCompact ? 'p-3' : 'p-4 sm:p-5'
              }`}>
                {/* Upper Left Tab Content: strictly bounded within the 48% tab width */}
                <div className="pt-0.5 max-w-[48%]">
                  <h3 className={`font-bold tracking-tight leading-tight normal-case ${
                    isCompact ? 'text-[13px]' : 'text-[15px] sm:text-[17px]'
                  } ${
                    isDark ? "text-white" : "text-neutral-900"
                  }`}>
                    {title}
                  </h3>
                  <p className={`font-medium mt-0.5 tracking-normal leading-tight ${
                    isCompact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
                  } ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}>
                    {subtitle}
                  </p>
                </div>

                {/* Lower Footer Metrics Row */}
                <div className="flex items-end justify-between pb-0.5">
                  {/* Left: 48 Items */}
                  <div className="flex items-baseline gap-1.5">
                    <span className={`font-black tracking-tight leading-none ${
                      isCompact ? 'text-lg' : 'text-xl sm:text-2xl'
                    } ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}>
                      {tagsCount}
                    </span>
                    <span className={`font-semibold ${
                      isCompact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
                    } ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}>
                      {tagsLabel}
                    </span>
                  </div>

                  {/* Right: 100% Free */}
                  <div className={`font-medium tracking-normal ${
                    isCompact ? 'text-[9px]' : 'text-[10px] sm:text-[11px]'
                  } ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}>
                    {shotsCount}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
