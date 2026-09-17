import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { MorphSearchCapsule } from './MorphSearchCapsule';

export default function MorphSearchCapsuleShowcase() {
  const [detectedMode, setDetectedMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const [overrideMode, setOverrideMode] = useState(null);

  useEffect(() => {
    const checkTheme = () => {
      const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      setDetectedMode(current);
      setOverrideMode(null);
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const activeMode = overrideMode || detectedMode;
  const isDark = activeMode === 'dark';

  return (
    <div className="w-full flex flex-col items-center justify-center p-6 sm:p-12">
      {/* Interactive Light / Dark Mode Switcher */}
      <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md mb-8 transition-colors">
        <button
          onClick={() => setOverrideMode('light')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            !isDark
              ? 'bg-white text-neutral-900 shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Sun size={13} />
          <span>Light</span>
        </button>
        <button
          onClick={() => setOverrideMode('dark')}
          className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
            isDark
              ? 'bg-[#221F2B] text-white shadow-xs'
              : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
          }`}
        >
          <Moon size={13} />
          <span>Dark</span>
        </button>
      </div>

      {/* Main Search Bar Capsule */}
      <div className="flex items-center justify-center relative">
        <MorphSearchCapsule key={activeMode} mode={activeMode} />
      </div>

      {/* Centered Single-line Description */}
      <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
        Click capsule to expand search
      </p>
    </div>
  );
}

MorphSearchCapsuleShowcase.customTitle = 'Morph Search Capsule';
MorphSearchCapsuleShowcase.customSlug = 'morph-search-capsule';
