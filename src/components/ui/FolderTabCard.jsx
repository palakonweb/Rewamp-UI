import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * FolderTabCard
 * Recreation of Recording 2026-09-17 221637.mp4:
 * A modern tactile UI card featuring an ethereal animated mesh aurora gradient header,
 * circular diagonal glass arrow action button, and an asymmetrical folder-tab cutout sheet
 * housing category metadata and dynamic metrics.
 * 
 * Supports both dark and light modes with the brand lilac/lavender palette.
 */
export default function FolderTabCard({
  title = "Designs",
  subtitle = "Web & App Designs",
  tagsCount = "04",
  tagsLabel = "Tags",
  shotsCount = "1012 Shots",
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
    <div className="flex items-center justify-center p-2">
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-[340px] sm:w-[380px] h-[410px] sm:h-[450px] rounded-[38px] p-2.5 overflow-hidden select-none transition-colors duration-300 ${
          isDark 
            ? "bg-[#0c0b10] border border-white/10 shadow-[0_28px_60px_-15px_rgba(0,0,0,0.65)]" 
            : "bg-[#FFFFFF] border border-black/8 shadow-[0_24px_50px_-12px_rgba(156,142,184,0.22)]"
        } ${className}`}
      >
        {/* Inner Card Canvas with Rounded Corners */}
        <div className="relative w-full h-full rounded-[30px] overflow-hidden">

          {/* ── 1. Background Animated Mesh Gradient (Rewamp Brand Lilac Palette) ── */}
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
              {/* Blob 1: Rewamp Strong Brand Lilac (#9C8EB8 / #C1B4D8) */}
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

              {/* Blob 3: Soft Ethereal Sky/Cyan Accent from video */}
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

              {/* Blob 4: Warm Peach-Dawn Accent Surge from video */}
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

            {/* Subtle Vignette & Depth Mask */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                isDark 
                  ? "bg-gradient-to-t from-black/50 via-transparent to-transparent" 
                  : "bg-gradient-to-t from-white/20 via-transparent to-transparent"
              }`}
            />

            {/* Subtle Fine Noise Texture for Editorial Quality */}
            <div 
              className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
              style={{
                backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")',
              }}
            />
          </div>

          {/* ── 2. Top Glass Action Button (Diagonal Arrow ↗) ── */}
          <div className="absolute top-5 right-5 z-20">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 6 }}
              whileTap={{ scale: 0.94 }}
              onClick={onAction}
              className={`w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-xl transition-colors duration-200 cursor-pointer shadow-sm ${
                isDark
                  ? "bg-white/25 hover:bg-white/35 text-white border border-white/30 shadow-black/20"
                  : "bg-white/75 hover:bg-white/95 text-neutral-800 border border-black/8 shadow-black/5"
              }`}
              title="Explore Design"
            >
              <ArrowUpRight className="w-5 h-5 transition-transform duration-200" />
            </motion.button>
          </div>

          {/* ── 3. Asymmetrical Folder-Tab Cutout Sheet ── */}
          <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-end">
            <div className="relative w-full h-[240px]">
              {/* SVG Cutout Silhouette Path matching Video Geometry exactly */}
              <svg
                viewBox="0 0 380 240"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full filter drop-shadow-[0_-12px_24px_rgba(0,0,0,0.18)]"
              >
                <path
                  d="M 0 28
                     A 28 28 0 0 1 28 0
                     L 155 0
                     A 24 24 0 0 1 179 24
                     A 24 24 0 0 0 203 44
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
              <div className="relative z-20 w-full h-full flex flex-col justify-between p-7 sm:p-8 pointer-events-auto">
                {/* Upper Left Tab Content */}
                <div className="pt-1">
                  <h3 className={`text-2xl sm:text-[28px] font-bold tracking-tight leading-none ${
                    isDark ? "text-white" : "text-neutral-900"
                  }`}>
                    {title}
                  </h3>
                  <p className={`text-xs sm:text-[13px] font-medium mt-2 tracking-normal ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}>
                    {subtitle}
                  </p>
                </div>

                {/* Lower Footer Metrics Row */}
                <div className="flex items-end justify-between pb-1">
                  {/* Left: 04 Tags */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-3xl sm:text-[38px] font-black tracking-tight leading-none ${
                      isDark ? "text-white" : "text-neutral-900"
                    }`}>
                      {tagsCount}
                    </span>
                    <span className={`text-xs sm:text-[13px] font-semibold ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}>
                      {tagsLabel}
                    </span>
                  </div>

                  {/* Right: 1012 Shots */}
                  <div className={`text-xs sm:text-[13px] font-medium tracking-normal ${
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
