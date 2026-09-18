import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowUpRight, Code, Eye, Layers } from 'lucide-react';

// Actual UI Components
import FolderTabCard from '../ui/FolderTabCard';
import DayNightSkyToggleShowcase from '../ui/DayNightSkyToggleShowcase';
import GooglyEyesButtonShowcase from '../ui/GooglyEyesButtonShowcase';
import PixelDotNavbarShowcase from '../ui/PixelDotNavbarShowcase';
import OrbitingPlanetsNavbarShowcase from '../ui/OrbitingPlanetsNavbarShowcase';
import FluidMorphOrbShowcase from '../ui/FluidMorphOrbShowcase';
import WaterCaustics from '../ui/backgrounds/WaterCaustics';
import LayeredPaperWaves from '../ui/backgrounds/LayeredPaperWaves';
import PixelSnow from '../ui/backgrounds/PixelSnow';
import BackgroundHeroOverlay from '../ui/BackgroundHeroOverlay';
import WalletCardReveal from '../ui/WalletCardReveal';

function ShowcaseCard({ title, badge, children, className = '' }) {
  return (
    <div
      className={`group/card relative w-full rounded-[24px] bg-white dark:bg-[#161420] border border-[#E5E5E5] dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden transition-all duration-300 hover:border-[#C1B4D8] dark:hover:border-[#D4CBE5]/40 hover:shadow-[0_16px_40px_rgba(193,180,216,0.2)] ${className}`}
    >
      {/* Card Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0] dark:border-white/5 bg-[#FAFAFA]/90 dark:bg-[#12111A]/90 backdrop-blur-xs">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#C1B4D8]" />
          <span className="text-xs font-mono font-semibold text-[#171717] dark:text-white/90">
            {title}
          </span>
        </div>
        {badge && (
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#EEEAF7] dark:bg-[#221E30] text-[#6B5B87] dark:text-[#D4CBE5] border border-[#D4CBE5]/40 dark:border-white/10">
            {badge}
          </span>
        )}
      </div>

      {/* Card Content Area */}
      <div className="relative p-2 flex items-center justify-center min-h-[220px]">
        {children}
      </div>
    </div>
  );
}

export function VerticalMarqueeShowcase() {
  const [isPaused, setIsPaused] = useState(false);

  // Column 1 Cards
  const column1Cards = [
    {
      id: 'folder-tab-card',
      title: 'folder-tab-card',
      badge: 'Interactive',
      node: (
        <div className="w-full flex items-center justify-center p-2 scale-90 sm:scale-95 origin-center">
          <FolderTabCard
            title="Designs"
            subtitle="Web & App Designs"
            tagsCount="04"
            tagsLabel="Tags"
            shotsCount="1012 Shots"
          />
        </div>
      ),
    },
    {
      id: 'day-night-toggle',
      title: 'day-night-sky-toggle',
      badge: 'Spring Motion',
      node: (
        <div className="w-full flex items-center justify-center scale-90 sm:scale-95 origin-center">
          <DayNightSkyToggleShowcase />
        </div>
      ),
    },
    {
      id: 'water-caustics-bg',
      title: 'water-caustics-bg',
      badge: 'Three.js WebGL',
      node: (
        <div className="relative w-full h-[240px] rounded-[18px] overflow-hidden bg-[#104E63] border border-black/5 dark:border-white/10">
          <div className="absolute inset-0 z-0">
            <WaterCaustics speed={0.4} scale={1.0} bloomStrength={0.5} threshold={0.75} exposure={1.05} />
          </div>
          <BackgroundHeroOverlay />
        </div>
      ),
    },
    {
      id: 'planet-nav',
      title: 'orbiting-planets-navbar',
      badge: 'Solar Orbit',
      node: (
        <div className="w-full flex items-center justify-center scale-85 sm:scale-90 origin-center">
          <OrbitingPlanetsNavbarShowcase />
        </div>
      ),
    },
    {
      id: 'fluid-morph-orb',
      title: 'fluid-morph-orb',
      badge: 'AI Capsule',
      node: (
        <div className="w-full flex items-center justify-center p-3">
          <FluidMorphOrbShowcase />
        </div>
      ),
    },
  ];

  // Column 2 Cards
  const column2Cards = [
    {
      id: 'googly-eyes-button',
      title: 'googly-eyes-button',
      badge: 'Cursor Physics',
      node: (
        <div className="w-full flex items-center justify-center scale-90 sm:scale-95 origin-center">
          <GooglyEyesButtonShowcase />
        </div>
      ),
    },
    {
      id: 'snow-bg',
      title: 'real-pixel-snow-bg',
      badge: 'Physics Canvas',
      node: (
        <div className="relative w-full h-[240px] rounded-[18px] overflow-hidden bg-[#05060C] border border-black/5 dark:border-white/10">
          <div className="absolute inset-0 z-0">
            <PixelSnow color="#ffffff" density={0.5} speed={1.2} wind={0.35} interactive={true} />
          </div>
          <BackgroundHeroOverlay isLight={false} />
        </div>
      ),
    },
    {
      id: 'paper-layer-bg',
      title: 'layered-paper-waves-bg',
      badge: '3D Shader',
      node: (
        <div className="relative w-full h-[240px] rounded-[18px] overflow-hidden bg-[#D9EBF9] border border-black/5 dark:border-white/10">
          <div className="absolute inset-0 z-0">
            <LayeredPaperWaves speed={0.4} scale={1.0} amplitude={1.0} />
          </div>
          <BackgroundHeroOverlay isLight={true} />
        </div>
      ),
    },
    {
      id: 'pixel-nav',
      title: 'pixel-dot-navbar',
      badge: 'Dot Matrix',
      node: (
        <div className="w-full flex items-center justify-center scale-85 sm:scale-90 origin-center py-2">
          <PixelDotNavbarShowcase />
        </div>
      ),
    },
    {
      id: 'wallet-reveal',
      title: 'wallet-card-reveal',
      badge: 'Tactile Fintech',
      node: (
        <div className="w-full flex items-center justify-center scale-85 sm:scale-90 origin-center p-2">
          <WalletCardReveal />
        </div>
      ),
    },
  ];

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[620px] lg:h-[720px] overflow-hidden rounded-[32px] p-2 select-none"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full h-full">
        
        {/* ── Column 1 (Infinite Vertical Marquee Upward) ── */}
        <div className="relative overflow-hidden w-full h-full">
          <motion.div
            animate={{
              y: isPaused ? undefined : ['0%', '-50%'],
            }}
            transition={{
              duration: 34,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex flex-col gap-5 w-full"
          >
            {/* First Set */}
            {column1Cards.map((card) => (
              <ShowcaseCard key={`col1-a-${card.id}`} title={card.title} badge={card.badge}>
                {card.node}
              </ShowcaseCard>
            ))}

            {/* Duplicate Set for Seamless Continuous Loop */}
            {column1Cards.map((card) => (
              <ShowcaseCard key={`col1-b-${card.id}`} title={card.title} badge={card.badge}>
                {card.node}
              </ShowcaseCard>
            ))}
          </motion.div>
        </div>

        {/* ── Column 2 (Infinite Vertical Marquee Downward / Offset) ── */}
        <div className="hidden sm:block relative overflow-hidden w-full h-full">
          <motion.div
            animate={{
              y: isPaused ? undefined : ['-50%', '0%'],
            }}
            transition={{
              duration: 38,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex flex-col gap-5 w-full"
          >
            {/* First Set */}
            {column2Cards.map((card) => (
              <ShowcaseCard key={`col2-a-${card.id}`} title={card.title} badge={card.badge}>
                {card.node}
              </ShowcaseCard>
            ))}

            {/* Duplicate Set for Seamless Continuous Loop */}
            {column2Cards.map((card) => (
              <ShowcaseCard key={`col2-b-${card.id}`} title={card.title} badge={card.badge}>
                {card.node}
              </ShowcaseCard>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  );
}

export default VerticalMarqueeShowcase;
