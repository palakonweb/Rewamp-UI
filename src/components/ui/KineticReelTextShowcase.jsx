import React, { useState, useEffect } from 'react';
import { KineticReelText, DEFAULT_REEL_ITEMS } from './KineticReelText';

export default function KineticReelTextShowcase() {
  const [theme, setTheme] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });
  const [prefix] = useState('we make');
  const [autoPlay] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Main Stage: Centered Reel */}
      <div
        className={`w-full h-full flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${
          isDark ? 'text-white' : 'text-[#1F1F1F]'
        }`}
      >
        {/* Kinetic Reel Text Component with centered layout */}
        <div className="relative z-10 w-full px-6 sm:px-12 py-4 flex items-center justify-center">
          <KineticReelText
            prefix={prefix}
            items={DEFAULT_REEL_ITEMS}
            theme={theme}
            autoPlay={autoPlay}
            interval={2000}
          />
        </div>

        {/* Bottom interaction description */}
        <p className="mt-8 text-center text-xs font-mono text-neutral-400 dark:text-neutral-500 select-none">
          Scroll or click reel to roll to the next word
        </p>
      </div>
    </div>
  );
}

KineticReelTextShowcase.customTitle = 'Kinetic Reel Text';
KineticReelTextShowcase.customSlug = 'kinetic-reel-text';
