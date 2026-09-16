import React, { useState, useRef } from 'react';
import { Play, Pause, ArrowDownUp, MousePointerClick, AlignCenter, AlignLeft } from 'lucide-react';
import { KineticLensSidebar, DEFAULT_LENS_ITEMS } from './KineticLensSidebar';

export default function KineticLensSidebarShowcase() {
  const [autoCycle, setAutoCycle] = useState(true);
  const [selectedItem, setSelectedItem] = useState(DEFAULT_LENS_ITEMS[0]);
  const [align, setAlign] = useState('center');
  const [viewMode, setViewMode] = useState('standalone');

  const feedRef = useRef(null);
  const [scrollFraction, setScrollFraction] = useState(0.1);

  const handleFeedScroll = (e) => {
    const el = e.currentTarget;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll > 0) {
      setScrollFraction(el.scrollTop / maxScroll);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Top Controls Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-neutral-950/85 border border-neutral-800 shadow-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setViewMode('standalone')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'standalone'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Automated Lens
            </button>
            <button
              onClick={() => setViewMode('scroll-feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                viewMode === 'scroll-feed'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ArrowDownUp className="w-3 h-3 text-[#EC5E27]" />
              <span>Scroll Feed</span>
            </button>
          </div>

          {/* Alignment Toggle */}
          <div className="flex items-center bg-neutral-900 p-1 rounded-xl border border-neutral-800">
            <button
              onClick={() => setAlign('center')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                align === 'center'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Centered text"
            >
              <AlignCenter className="w-3.5 h-3.5 text-[#EC5E27]" />
              <span>Center</span>
            </button>
            <button
              onClick={() => setAlign('left')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                align === 'left'
                  ? 'bg-neutral-800 text-white shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Left aligned text"
            >
              <AlignLeft className="w-3.5 h-3.5 text-neutral-400" />
              <span>Left</span>
            </button>
          </div>

          {/* Auto-Scroll Toggle */}
          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
              autoCycle
                ? 'bg-neutral-900 text-white border border-[#EC5E27]/40'
                : 'bg-neutral-900/60 text-neutral-400 border border-neutral-800 hover:bg-neutral-850'
            }`}
          >
            {autoCycle ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#EC5E27]" />
                <span>Auto-Scroll Active</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-neutral-400" />
                <span>Resume</span>
              </>
            )}
          </button>
        </div>

        {/* Status indicator */}
        <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#EC5E27] animate-pulse" />
            <span className="text-neutral-200 font-sans font-medium">
              {selectedItem?.label || 'Buttons'}
            </span>
          </div>
          <span className="hidden sm:inline text-neutral-600">|</span>
          <span className="hidden sm:inline text-[11px] text-neutral-500">
            Centered text · Auto-scrolling
          </span>
        </div>
      </div>

      {/* Main Showcase Stage */}
      <div className="w-full min-h-[520px] rounded-3xl border border-neutral-800/80 overflow-hidden bg-black flex items-center justify-center relative shadow-2xl">
        {viewMode === 'standalone' ? (
          <div className="w-full h-[520px] flex flex-col items-center justify-center relative bg-black">
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, #0d1020 0%, #000000 75%)',
              }}
            />

            <KineticLensSidebar
              autoCycle={autoCycle}
              cycleInterval={2000}
              initialIndex={0}
              align={align}
              onSelect={(item) => setSelectedItem(item)}
              className="z-10"
            />

            <div className="absolute bottom-4 flex items-center gap-2 text-xs text-neutral-500 font-mono pointer-events-none z-30">
              <MousePointerClick className="w-3.5 h-3.5 text-neutral-400" />
              <span>Auto-scrolling · Wheel or drag to scrub · Click item to focus</span>
            </div>
          </div>
        ) : (
          <div className="w-full h-[520px] grid grid-cols-1 md:grid-cols-12 bg-black divide-y md:divide-y-0 md:divide-x divide-neutral-900">
            <div className="md:col-span-5 h-[240px] md:h-full flex items-center justify-center relative bg-black">
              <KineticLensSidebar
                autoCycle={false}
                scrollProgress={scrollFraction}
                align={align}
                onSelect={(item) => {
                  setSelectedItem(item);
                  const targetEl = document.getElementById(`section-${item.id}`);
                  if (targetEl && feedRef.current) {
                    feedRef.current.scrollTo({
                      top: targetEl.offsetTop - 20,
                      behavior: 'smooth',
                    });
                  }
                }}
                className="w-full max-w-[300px]"
              />
            </div>

            <div
              ref={feedRef}
              onScroll={handleFeedScroll}
              className="md:col-span-7 h-[280px] md:h-full overflow-y-auto px-6 sm:px-8 py-6 space-y-8 scroll-smooth bg-[#050508]"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: '#282D52 #050508',
              }}
            >
              <div className="pb-3 border-b border-neutral-800">
                <span className="text-[11px] font-mono tracking-wider text-[#EC5E27] uppercase">
                  Purrform UI Library
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Component Architecture
                </h3>
              </div>

              {DEFAULT_LENS_ITEMS.map((cat, idx) => (
                <section
                  key={cat.id}
                  id={`section-${cat.id}`}
                  className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-neutral-500">
                      0{idx + 1} / {DEFAULT_LENS_ITEMS.length}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300">
                      Component
                    </span>
                  </div>
                  <h4 className="text-xl font-semibold text-white tracking-tight">
                    {cat.label}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    Interactive {cat.label.toLowerCase()} built with Framer Motion physics, rich micro-interactions, and accessible semantics.
                  </p>
                </section>
              ))}

              <div className="py-8 text-center text-xs font-mono text-neutral-600">
                End of catalog
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
