import React, { useState } from 'react';
import KineticReelText from './KineticReelText';

export default function KineticReelTextShowcase() {
  const [theme, setTheme] = useState('dark');
  const [prefix, setPrefix] = useState('we do');

  const isDark = theme === 'dark';

  return (
    <div
      className={`w-full min-h-[480px] rounded-2xl p-6 sm:p-12 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-black text-white' : 'bg-[#FFFDF2] text-[#1F1F1F] border border-[#D9D9D6]'
      }`}
    >
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 50%, rgba(35, 35, 35, 0.6) 0%, #000000 75%)'
            : 'radial-gradient(circle at 50% 50%, rgba(236, 94, 39, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Main Kinetic Reel */}
      <div className="relative z-10 py-16 flex items-center justify-center">
        <KineticReelText
          prefix={prefix}
          theme={theme}
          items={[
            'Websites',
            'Brand identity',
            'SEO optimization',
            'Digital marketing',
            'Lead generation',
            'Influencer marketing',
          ]}
        />
      </div>

      {/* Interactive Controls Bar */}
      <div
        className={`relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3 rounded-full px-5 py-2.5 backdrop-blur-md text-xs transition-colors ${
          isDark
            ? 'bg-neutral-900/90 border border-white/10 text-neutral-400'
            : 'bg-[#FAF6ED] border border-[#D9D9D6] text-[#6B6B6B] shadow-sm'
        }`}
      >
        <button
          onClick={() => setTheme(isDark ? 'light' : 'dark')}
          className={`px-3 py-1 rounded-full font-medium transition-all ${
            isDark
              ? 'bg-white/10 hover:bg-white/20 text-white'
              : 'bg-[#F1E6D7] hover:bg-[#ebdccb] text-[#1F1F1F]'
          }`}
        >
          {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>

        <div className={`h-3 w-px ${isDark ? 'bg-white/10' : 'bg-neutral-300'}`} />

        <div className="flex items-center gap-1.5">
          <span>Prefix:</span>
          {['we do', 'we build', 'we craft', 'Purrform'].map((p) => (
            <button
              key={p}
              onClick={() => setPrefix(p)}
              className={`px-2.5 py-0.5 rounded transition-all ${
                prefix === p
                  ? 'bg-orange-500 text-white font-semibold'
                  : isDark
                  ? 'bg-white/5 hover:bg-white/10 text-neutral-300'
                  : 'bg-white hover:bg-neutral-100 text-[#1F1F1F] border border-[#D9D9D6]'
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className={`h-3 w-px ${isDark ? 'bg-white/10' : 'bg-neutral-300'}`} />

        <span className="text-[11px] opacity-70">Hover to pause · Click slot to roll</span>
      </div>
    </div>
  );
}

KineticReelTextShowcase.customSlug = 'kinetic-reel-text';
