import React, { useState } from 'react';
import { Play, Pause, Sun, Moon } from 'lucide-react';
import { KineticReelText, DEFAULT_REEL_ITEMS } from './KineticReelText';

export default function KineticReelTextShowcase() {
  const [theme, setTheme] = useState('dark');
  const [prefix, setPrefix] = useState('we make');
  const [autoPlay, setAutoPlay] = useState(true);
  const [activeItem, setActiveItem] = useState(DEFAULT_REEL_ITEMS[0]);

  const isDark = theme === 'dark';

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Top Toolbar */}
      <div
        className={`w-full flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-2xl border backdrop-blur-md transition-colors duration-300 ${
          isDark
            ? 'bg-neutral-950/85 border-neutral-800 text-neutral-300'
            : 'bg-[#FAF6ED]/95 border-[#D9D9D6] text-[#1F1F1F] shadow-sm'
        }`}
      >
        {/* Left Controls */}
        <div className="flex items-center gap-2">
          {/* Play/Pause */}
          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200'
                : 'bg-white hover:bg-[#F1E6D7] border border-[#D9D9D6] text-[#1F1F1F]'
            }`}
          >
            {autoPlay ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#EC5E27]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#EC5E27]" />
                <span>Auto-Roll</span>
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
              isDark
                ? 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200'
                : 'bg-white hover:bg-[#F1E6D7] border border-[#D9D9D6] text-[#1F1F1F]'
            }`}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-stone-600" />
                <span>Dark</span>
              </>
            )}
          </button>
        </div>

        {/* Center: Prefix Selector */}
        <div className="flex items-center gap-1 text-xs">
          <span className="text-[11px] font-mono opacity-60 mr-1 hidden sm:inline">Prefix:</span>
          {['we make', 'we craft', 'we build', 'Purrform'].map((p) => (
            <button
              key={p}
              onClick={() => setPrefix(p)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                prefix === p
                  ? 'bg-[#EC5E27] text-white shadow-xs'
                  : isDark
                  ? 'bg-neutral-900/60 hover:bg-neutral-800 text-neutral-400'
                  : 'bg-white/80 hover:bg-white text-neutral-600 border border-neutral-200'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Right: Active Indicator */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#EC5E27] animate-pulse" />
          <span className="font-sans font-medium">{activeItem}</span>
        </div>
      </div>

      {/* Main Stage: Centered Reel */}
      <div
        className={`w-full min-h-[500px] md:min-h-[540px] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 shadow-2xl ${
          isDark
            ? 'bg-black text-white border border-neutral-800/80'
            : 'bg-[#FFFDF2] text-[#1F1F1F] border border-[#D9D9D6]'
        }`}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: isDark
              ? 'radial-gradient(ellipse at 50% 50%, rgba(25, 28, 45, 0.45) 0%, #000000 75%)'
              : 'radial-gradient(ellipse at 50% 50%, rgba(236, 94, 39, 0.06) 0%, transparent 70%)',
          }}
        />

        {/* Kinetic Reel Text Component with centered layout */}
        <div className="relative z-10 w-full px-6 sm:px-12 py-16 flex items-center justify-center">
          <KineticReelText
            prefix={prefix}
            items={DEFAULT_REEL_ITEMS}
            theme={theme}
            autoPlay={autoPlay}
            interval={2000}
            onSelect={(item) => setActiveItem(item)}
          />
        </div>

        {/* Bottom interaction hint */}
        <div
          className={`absolute bottom-5 z-20 flex items-center gap-2 text-xs font-mono transition-opacity ${
            isDark ? 'text-neutral-500' : 'text-neutral-400'
          }`}
        >
          <span>Centered · Scroll mouse wheel over reel · Click to roll · Drag vertically</span>
        </div>
      </div>
    </div>
  );
}

KineticReelTextShowcase.customTitle = 'Kinetic Reel Text';
KineticReelTextShowcase.customSlug = 'kinetic-reel-text';
