import React from 'react';
import SingularityFlareBackground from './backgrounds/SingularityFlareBackground';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';

export default function SingularityFlareBackgroundShowcase() {
  return (
    <div className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* ── Main Preview Stage ── */}
      <div className="relative w-full flex-1 min-h-[460px] sm:min-h-[520px] rounded-[24px] overflow-hidden border border-black/10 dark:border-white/10 bg-[#020205] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <SingularityFlareBackground
            speed={1.0}
            pinchX={0.50}
            flareHeight={1.0}
            sparkleIntensity={1.0}
            colorBg="#020205"
            colorCore="#ffffff"
            colorCyan="#00d2ff"
            colorBlue="#0d2b6b"
            colorViolet="#a855f7"
            colorMagenta="#d946ef"
            colorBeam="#c084fc"
          />
        </div>

        {/* Hero UI Overlay with interactive toggle */}
        <BackgroundHeroOverlay
          title="Singularity flare gradients for cosmic interfaces"
          subtitle="Dynamic Motion Background"
          badge="NEW"
        />
      </div>
    </div>
  );
}
