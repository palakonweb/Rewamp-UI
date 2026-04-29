import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import ComponentCategories from './components/ComponentCategories';
import PromptToUISection from './components/PromptToUISection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ComponentShowcaseLayout from './components/ComponentShowcaseLayout';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState('landing');

  // Initialize theme on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center overflow-x-hidden selection:bg-[var(--color-accent-red)] selection:text-white">
      {/* Background is handled cleanly by index.css body rules now */}

      {/* Stationary 16:9 Cherry Red Gradient Parallax Background */}
      <div className="fixed inset-0 z-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden mix-blend-multiply dark:mix-blend-screen">
        <div className="w-[100vw] aspect-video max-h-[100vh] bg-[radial-gradient(ellipse_at_center,var(--color-accent-red)_0%,transparent_70%)] opacity-20 dark:opacity-20 blur-[100px]"></div>
      </div>

      <div className="w-full max-w-[1440px] relative z-10 flex flex-col px-6 md:px-12 lg:px-16 pb-20 overflow-visible">
        {currentView === 'landing' ? (
          <>
            <div className="flex flex-col min-h-screen">
              <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} onBrowse={() => setCurrentView('gallery')} />
          <div className="flex-1 flex flex-col justify-center pb-20">
            <Hero />
          </div>
        </div>

        <div className="flex flex-col gap-16 md:gap-32 relative z-20">
          <PromptToUISection />
          <BentoGrid />
          <ComponentCategories />
          <div className="-mt-12 md:-mt-24">
            <CTA />
          </div>
          <Footer />
        </div>
        </>
        ) : (
          <ComponentShowcaseLayout onBack={() => setCurrentView('landing')} />
        )}
      </div >
    </div >
  );
}

export default App;
