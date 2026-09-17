import GradientWaveBackground from './backgrounds/GradientWaveBackground';
import BackgroundHeroOverlay from './BackgroundHeroOverlay';

export default function GradientWaveBackgroundShowcase() {

  return (
    <div className="w-full flex flex-col gap-6 max-w-4xl mx-auto">
      {/* PREVIEW SECTION */}
      <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden border border-black/5 dark:border-white/10 bg-[#070818] shadow-2xl">
        <div className="absolute inset-0 z-0">
          <GradientWaveBackground
            deepColor="#070818"
            midColor="#15143A"
            lineColor="#E11D74"
            edgeColor="#7C3AED"
            speed={0.40}
            scale={1.0}
            refract={0.045}
            ripple={0.015}
            bloomStrength={0.9}
            threshold={0.65}
            exposure={1.2}
          />
        </div>
        <BackgroundHeroOverlay />
      </div>
    </div>
  );
}
