import React from 'react';
import { Hero } from '../components/sections/Hero'
import { InfiniteBelt } from '../components/sections/InfiniteBelt'
import { FeaturesBento } from '../components/sections/FeaturesBento'
import { LiveProductDemo } from '../components/sections/LiveProductDemo'
import { InfiniteSpiralGallery } from '../components/sections/InfiniteSpiralGallery'
import { DomeGalleryCTA } from '../components/sections/DomeGalleryCTA'
import { ConjureReveal } from '../components/sections/ConjureReveal'
import { SiteFooter } from '../components/sections/SiteFooter'
import { Navbar } from '../components/sections/Navbar'
import SplashCursor from '../components/ui/SplashCursor'

export function LandingPage() {
  return (
    <>
      <Navbar />
      <SplashCursor />
      <main className="w-full min-h-screen relative">
        {/* Sticky Hero for Parallax Curtain Effect */}
        <div className="sticky top-0 w-full h-[100svh] overflow-hidden -z-10">
          <Hero />
        </div>

        {/* Scrollable Content overlapping the Hero */}
        <div className="relative z-10 w-full shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-[var(--border)]">
          {/* Dark Sections */}
          <div className="relative w-full bg-[#2E2E2E]">
            <InfiniteBelt />
            <FeaturesBento />
          </div>

          {/* Light Sections */}
          <div className="relative w-full bg-[var(--bg)] flex flex-col border-t border-[var(--border)]">
            <LiveProductDemo />
            <InfiniteSpiralGallery />
            <DomeGalleryCTA />
            <ConjureReveal />
            <SiteFooter />
          </div>
        </div>
      </main>
    </>
  );
}
