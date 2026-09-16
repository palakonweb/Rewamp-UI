import React, { useState, useRef } from 'react';
import { Play, Pause, Compass, MousePointerClick, ArrowDownUp } from 'lucide-react';
import { KineticLensSidebar, DEFAULT_LENS_ITEMS } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle, setAutoCycle] = useState(false);
  const [selectedItem, setSelectedItem] = useState(DEFAULT_LENS_ITEMS[4]); // Landing Page
  const [viewMode, setViewMode] = useState('standalone'); // 'standalone' | 'scroll-feed'

  // Ref and state for scroll-reactive feed demo
  const feedRef = useRef(null);
  const [scrollFraction, setScrollFraction] = useState(0.33);

  const handleFeedScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 0) {
      const progress = el.scrollTop / maxScroll;
      setScrollFraction(progress);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-950/80 border border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setViewMode('standalone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'standalone'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Interactive Lens
            </button>
            <button
              onClick={() => setViewMode('scroll-feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'scroll-feed'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ArrowDownUp className="w-3 h-3 text-[#EC5E27]" />
              <span>Scroll-Reactive Feed</span>
            </button>
          </div>

          {/* Auto-Wheel Toggle */}
          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 transition-colors cursor-pointer"
          >
            {autoCycle ? (
              <>
                <Pause className="w-3.5 h-3.5 text-neutral-400" />
                <span>Pause Auto</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-400" />
                <span>Auto-Cycle</span>
              </>
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EC5E27] animate-pulse" />
            <span className="text-neutral-300 font-sans font-medium">
              {selectedItem?.label || 'Landing Page'}
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-[11px] text-neutral-500">
            {viewMode === 'standalone'
              ? 'Scroll wheel · Drag · Click'
              : 'Scroll feed on right to scrub'}
          </span>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="w-full min-h-[580px] rounded-3xl border border-neutral-800/80 overflow-hidden bg-black flex items-center justify-center relative shadow-2xl">
        {viewMode === 'standalone' ? (
          // Mode 1: Exact Standalone Video Match
          <div className="w-full h-[580px] flex flex-col items-center justify-center relative bg-black">
            {/* Background Atmosphere */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, #0d1020 0%, #000000 75%)',
              }}
            />

            {/* Kinetic Lens Component */}
            <KineticLensSidebar
              autoCycle={autoCycle}
              cycleInterval={2800}
              initialIndex={4}
              onSelect={(item) => setSelectedItem(item)}
              className="z-10"
            />

            {/* Bottom floating hint */}
            <div className="absolute bottom-5 flex items-center gap-2 text-xs text-neutral-500 font-mono pointer-events-none z-30">
              <MousePointerClick className="w-3.5 h-3.5 text-neutral-400" />
              <span>Use mouse wheel over text or drag to scrub</span>
            </div>
          </div>
        ) : (
          // Mode 2: Scroll-Reactive Feed Connected Demo
          <div className="w-full h-[580px] grid grid-cols-1 md:grid-cols-12 bg-black divide-y md:divide-y-0 md:divide-x divide-neutral-900">
            {/* Sticky/Fixed Kinetic Lens Sidebar on the Left */}
            <div className="md:col-span-5 h-[260px] md:h-full flex items-center justify-center relative bg-black">
              <KineticLensSidebar
                autoCycle={false}
                scrollProgress={scrollFraction}
                onSelect={(item) => {
                  setSelectedItem(item);
                  // Find section and scroll into view smoothly
                  const targetEl = document.getElementById(`section-${item.id}`);
                  if (targetEl && feedRef.current) {
                    feedRef.current.scrollTo({
                      top: targetEl.offsetTop - 24,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="w-full max-w-[320px]"
              />
            </div>

            {/* Scrollable Content Feed on the Right */}
            <div
              ref={feedRef}
              onScroll={handleFeedScroll}
              className="md:col-span-7 h-[320px] md:h-full overflow-y-auto px-6 sm:px-10 py-8 space-y-12 scroll-smooth bg-[#050508]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#282D52 #050508',
              }}
            >
              <div className="pb-4 border-b border-neutral-800">
                <span className="text-[11px] font-mono tracking-wider text-[#EC5E27] uppercase">
                  Scroll-Reactive Agency Portfolio
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Services Catalog
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  Scroll through this feed to watch the kinetic lens sidebar scrub in real time.
                </p>
              </div>

              {DEFAULT_LENS_ITEMS.map((service, idx) => (
                <section
                  key={service.id}
                  id={`section-${service.id}`}
                  className="p-6 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-500">
                      0{idx + 1} / {DEFAULT_LENS_ITEMS.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300">
                      Service
                    </span>
                  </div>
                  <h4 className="text-2xl font-semibold text-white tracking-tight">
                    {service.label}
                  </h4>
                  <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                    Elevating brand narratives through tailored creative direction, strategic positioning, and precision design execution.
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#EC5E27]">
                    <span>Explore project case studies</span>
                    <span>→</span>
                  </div>
                </section>
              ))}

              <div className="py-12 text-center text-xs font-mono text-neutral-600">
                End of services catalog
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

KineticLensSidebarShowcase.customTitle = 'Kinetic Lens Sidebar';
KineticLensSidebarShowcase.customSlug = 'kinetic-lens-sidebar';
