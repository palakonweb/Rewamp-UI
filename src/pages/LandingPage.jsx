import React, { useEffect } from 'react';
import { Hero } from '../components/sections/Hero'

// The landing page is designed for light mode only — it should never pick up
// a dark theme left set by the dashboard's own theme toggle.
export function LandingPage() {
  useEffect(() => {
    const root = document.documentElement;
    const previousAttr = root.getAttribute('data-theme');
    const hadDarkClass = root.classList.contains('dark');

    root.setAttribute('data-theme', 'light');
    root.classList.remove('dark');

    return () => {
      if (previousAttr) {
        root.setAttribute('data-theme', previousAttr);
      } else {
        root.removeAttribute('data-theme');
      }
      root.classList.toggle('dark', hadDarkClass);
    };
  }, []);

  return <Hero />;
}
