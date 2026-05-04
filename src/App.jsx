import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Preloader } from './components/ui/Preloader'
import { LandingPage } from './pages/LandingPage'
import { ComponentsPage } from './pages/ComponentsPage'
import { DocumentationPage } from './pages/DocumentationPage'

// SVG noise filter for grain overlay
function GrainOverlay() {
  return (
    <svg className="noise-overlay" xmlns="http://www.w3.org/2000/svg">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  )
}

function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Preloader />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/components/:slug" element={<ComponentsPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </>
  )
}

export default App
