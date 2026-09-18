import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'

import { PackageManagerProvider } from './components/ui/InstallSection'

// perf: route-level code splitting. These three pages used to be imported
// eagerly at the top of App.jsx, which meant visiting any one route (e.g.
// /components) still forced the browser to download and parse every other
// route's bundle too — including the landing page's ~8 heavy marketing
// sections (Hero, InfiniteBelt, FeaturesBento, LiveProductDemo,
// InfiniteSpiralGallery, DomeGalleryCTA, RewampUIReveal, SplashCursor) and
// the whole documentation page, before the requested route could render.
// Each page now loads only when its route is actually visited.
const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })))
const ComponentsPage = lazy(() => import('./pages/ComponentsPage').then((m) => ({ default: m.ComponentsPage })))
const DocumentationPage = lazy(() => import('./pages/DocumentationPage').then((m) => ({ default: m.DocumentationPage })))

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
    <PackageManagerProvider>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/components/:slug" element={<ComponentsPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
        </Routes>
      </Suspense>
      <Analytics />
    </PackageManagerProvider>
  )
}

export default App
