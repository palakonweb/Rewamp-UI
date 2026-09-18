// perf: code-split all showcase components via React.lazy, tree-shaken named imports, on-demand chunking
import { lazy } from 'react';
import {
    Image as ImageIcon,
    MousePointerClick,
    ToggleLeft,
    MousePointer2,
    PanelTop,
    PanelLeft,
    Type as TypeIcon,
    Search as SearchIcon,
    CreditCard,
    Bot,
} from 'lucide-react';

// perf: the full prompt/code text for every component (readyDetails, ~500KB of
// template-literal strings) used to be imported here at the top level, which
// meant every page that imports `categories` from this file — including the
// main dashboard — paid for downloading and parsing all of it upfront, even
// though only the docs detail page ever renders that text. It now lives in
// ./docsRegistryDetails.js, which DocsShell.jsx loads with a dynamic import()
// only when a detail page actually renders. See that file for the data.

/**
 * Helper to register a code-split component with explicit title, slug, and lazy import
 */
function makeLazy(title, slug, importFn, fileName) {
    const Component = lazy(importFn);
    Component.displayName = title;
    return { Component, title, slug, importFn, fileName };
}

export function titleFromComponent(Comp) {
    const name = (Comp.displayName || Comp.name || 'Component').replace(/Showcase$/, '');
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .trim();
}

export function slugify(title) {
    return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

// ---------------------------------------------------------------------------
// Component registry — data-driven, code-split with React.lazy
// ---------------------------------------------------------------------------
export const categories = [
    {
        id: 'bgs',
        name: 'Animated Backgrounds',
        icon: ImageIcon,
        size: 'lg',
        description: 'Full-bleed animated backdrops — particles, gradients, grids, and warp effects.',
        components: [
            makeLazy('Liquid Cursor Gradient', 'liquid-cursor-gradient', () => import('./ui/LiquidCursorGradientShowcase'), 'LiquidCursorGradientShowcase'),
            makeLazy('Ascii Matrix Hover', 'ascii-matrix-hover', () => import('./ui/AsciiMatrixHoverShowcase'), 'AsciiMatrixHoverShowcase'),
            makeLazy('Elastic Line Grid', 'elastic-line-grid', () => import('./ui/ElasticLineGridShowcase'), 'ElasticLineGridShowcase'),
            makeLazy('Spotlight Grid', 'spotlight-grid', () => import('./ui/SpotlightGridShowcase'), 'SpotlightGridShowcase'),
            makeLazy('Ripple Grid', 'ripple-grid', () => import('./ui/RippleGridShowcase'), 'RippleGridShowcase'),
            makeLazy('Shooting Stars', 'shooting-stars', () => import('./ui/ShootingStarsShowcase'), 'ShootingStarsShowcase'),
            makeLazy('Soft Aurora', 'soft-aurora', () => import('./ui/SoftAuroraShowcase'), 'SoftAuroraShowcase'),
            makeLazy('Plexus Engine', 'plexus-engine', () => import('./ui/PlexusEngineShowcase'), 'PlexusEngineShowcase'),
            makeLazy('Particle Wave', 'particle-wave', () => import('./ui/ParticleWaveShowcase'), 'ParticleWaveShowcase'),
            makeLazy('Hyperspeed Warp', 'hyperspeed-warp', () => import('./ui/HyperspeedWarpShowcase'), 'HyperspeedWarpShowcase'),
            makeLazy('Sine Ribbons', 'sine-ribbons', () => import('./ui/SineRibbonsShowcase'), 'SineRibbonsShowcase'),
            makeLazy('Ambient Glow Orbs', 'ambient-glow-orbs', () => import('./ui/AmbientGlowOrbsShowcase'), 'AmbientGlowOrbsShowcase'),
            makeLazy('Refracted Beams', 'refracted-beams', () => import('./ui/RefractedBeamsShowcase'), 'RefractedBeamsShowcase'),
            makeLazy('Cosmic Dust', 'cosmic-dust', () => import('./ui/CosmicDustShowcase'), 'CosmicDustShowcase'),
            makeLazy('Digital Rain', 'digital-rain', () => import('./ui/DigitalRainShowcase'), 'DigitalRainShowcase'),
            makeLazy('Real Snow Background', 'pixel-snow-background', () => import('./ui/PixelSnowBackgroundShowcase'), 'PixelSnowBackgroundShowcase'),
            makeLazy('Water Caustics Background', 'water-caustics-background', () => import('./ui/WaterCausticsBackgroundShowcase'), 'WaterCausticsBackgroundShowcase'),
            makeLazy('Gradient Wave Background', 'gradient-wave-background', () => import('./ui/GradientWaveBackgroundShowcase'), 'GradientWaveBackgroundShowcase'),
            makeLazy('Pixel Cloud Background', 'pixel-cloud-background', () => import('./ui/PixelCloudBackgroundShowcase'), 'PixelCloudBackgroundShowcase'),
            makeLazy('Silk Waves Background', 'silk-waves-background', () => import('./ui/SilkWavesBackgroundShowcase'), 'SilkWavesBackgroundShowcase'),
            makeLazy('Layered Paper Waves Background', 'layered-paper-waves-background', () => import('./ui/LayeredPaperWavesBackgroundShowcase'), 'LayeredPaperWavesBackgroundShowcase'),
        ],
    },
    {
        id: 'buttons',
        name: 'Buttons',
        icon: MousePointerClick,
        size: 'sm',
        description: 'Tactile, physically-animated buttons — press states, glows, and material effects.',
        components: [
            makeLazy('Googly Eyes Button', 'googly-eyes-button', () => import('./ui/GooglyEyesButtonShowcase'), 'GooglyEyesButtonShowcase'),
            makeLazy('Gloss Button', 'gloss-button', () => import('./ui/GlossButtonShowcase'), 'GlossButtonShowcase'),
            makeLazy('Neumorphic Download Button', 'neumorphic-download-button', () => import('./ui/NeumorphicDownloadButtonShowcase'), 'NeumorphicDownloadButtonShowcase'),
            makeLazy('Add To Cart Glow Button', 'add-to-cart-glow-button', () => import('./ui/AddToCartGlowButtonShowcase'), 'AddToCartGlowButtonShowcase'),
            makeLazy('Rainbow Button', 'rainbow-button', () => import('./ui/RainbowButtonShowcase'), 'RainbowButtonShowcase'),
            makeLazy('Slide To Confirm Button', 'slide-to-confirm-button', () => import('./ui/SlideToConfirmButtonShowcase'), 'SlideToConfirmButtonShowcase'),
            makeLazy('Chrome Border Button', 'chrome-border-button', () => import('./ui/ChromeBorderButtonShowcase'), 'ChromeBorderButtonShowcase'),
            makeLazy('Book A Call Button', 'book-a-call-button', () => import('./ui/BookACallButton'), 'BookACallButton'),
            makeLazy('Shimmer Button', 'shimmer-button', () => import('./ui/ShimmerButtonShowcase'), 'ShimmerButtonShowcase'),
        ],
    },
    {
        id: 'text',
        name: 'Text Animations',
        icon: TypeIcon,
        size: 'sm',
        description: 'Kinetic typography — reveals, scrambles, morphs, and counters.',
        components: [
            makeLazy('Kinetic Reel Text', 'kinetic-reel-text', () => import('./ui/KineticReelTextShowcase'), 'KineticReelTextShowcase'),
            makeLazy('Split Text Reveal', 'split-text-reveal', () => import('./ui/SplitTextRevealShowcase'), 'SplitTextRevealShowcase'),
            makeLazy('Word By Word Text', 'word-by-word-text', () => import('./ui/WordByWordTextShowcase'), 'WordByWordTextShowcase'),
            makeLazy('Character Scramble Text', 'character-scramble-text', () => import('./ui/CharacterScrambleTextShowcase'), 'CharacterScrambleTextShowcase'),
            makeLazy('Gradient Reveal Text', 'gradient-reveal-text', () => import('./ui/GradientRevealTextShowcase'), 'GradientRevealTextShowcase'),
            makeLazy('Aurora Text', 'aurora-text', () => import('./ui/AuroraTextShowcase'), 'AuroraTextShowcase'),
            makeLazy('Spotlight Text', 'spotlight-text', () => import('./ui/SpotlightTextShowcase'), 'SpotlightTextShowcase'),
            makeLazy('Flip 3D Text', 'flip-3-d-text', () => import('./ui/Flip3DTextShowcase'), 'Flip3DTextShowcase'),
            makeLazy('Typewriter Text', 'typewriter-text', () => import('./ui/TypewriterTextShowcase'), 'TypewriterTextShowcase'),
            makeLazy('Velocity Marquee Text', 'velocity-marquee-text', () => import('./ui/VelocityMarqueeTextShowcase'), 'VelocityMarqueeTextShowcase'),
        ],
    },
    {
        id: 'toggles',
        name: 'Toggles',
        icon: ToggleLeft,
        size: 'sm',
        description: 'Switches and toggles with elastic, skeuomorphic, and ambient motion.',
        components: [
            makeLazy('Day Night Sky Toggle', 'day-night-sky-toggle', () => import('./ui/DayNightSkyToggleShowcase'), 'DayNightSkyToggleShowcase'),
            makeLazy('Landscape Orb Toggle', 'landscape-orb-toggle', () => import('./ui/LandscapeOrbToggleShowcase'), 'LandscapeOrbToggleShowcase'),
            makeLazy('Glass Orb Toggle', 'glass-orb-toggle', () => import('./ui/GlassOrbToggleShowcase'), 'GlassOrbToggleShowcase'),
        ],
    },
    {
        id: 'cursors',
        name: 'Cursors',
        icon: MousePointer2,
        size: 'sm',
        description: 'Custom cursor replacements — trails, lenses, and magnetic effects.',
        components: [
            makeLazy('Splash Cursor', 'splash-cursor', () => import('./ui/SplashCursorShowcase'), 'SplashCursorShowcase'),
            makeLazy('Pill Trail Cursor', 'pill-trail-cursor', () => import('./ui/PillTrailCursorShowcase'), 'PillTrailCursorShowcase'),
            makeLazy('Halftone Dot Cursor', 'halftone-dot-cursor', () => import('./ui/HalftoneDotCursorShowcase'), 'HalftoneDotCursorShowcase'),
        ],
    },
    {
        id: 'navbars',
        name: 'Navbars',
        icon: PanelTop,
        size: 'lg',
        description: 'Floating, sticky, and responsive navigation bars with spring physics.',
        components: [
            makeLazy('Hero Morph Navbar', 'hero-morph-navbar', () => import('./ui/HeroMorphNavbarShowcase'), 'HeroMorphNavbarShowcase'),
            makeLazy('Pill Expand Navbar', 'pill-expand-navbar', () => import('./ui/PillExpandNavbarShowcase'), 'PillExpandNavbarShowcase'),
            makeLazy('Pixel Dot Navbar', 'pixel-dot-navbar', () => import('./ui/PixelDotNavbarShowcase'), 'PixelDotNavbarShowcase'),
            makeLazy('Dark Mode Mobile Navbar', 'dark-mode-mobile-navbar', () => import('./ui/DarkModeMobileNavbarShowcase'), 'DarkModeMobileNavbarShowcase'),
            makeLazy('Fluid Wave Navbar', 'fluid-wave-navbar', () => import('./ui/FluidWaveNavbarShowcase'), 'FluidWaveNavbarShowcase'),
            makeLazy('Magnetic Pill Navbar', 'magnetic-pill-navbar', () => import('./ui/MagneticPillNavbarShowcase'), 'MagneticPillNavbarShowcase'),
            makeLazy('Circular Radial Navbar', 'circular-radial-navbar', () => import('./ui/CircularRadialNavbarShowcase'), 'CircularRadialNavbarShowcase'),
            makeLazy('Curtain Reveal Navbar', 'curtain-reveal-navbar', () => import('./ui/CurtainRevealNavbarShowcase'), 'CurtainRevealNavbarShowcase'),
            makeLazy('Jelly Scoop Navbar', 'jelly-scoop-navbar', () => import('./ui/JellyScoopNavbarShowcase'), 'JellyScoopNavbarShowcase'),
            makeLazy('Liquid Underline Navbar', 'liquid-underline-navbar', () => import('./ui/LiquidUnderlineNavbarShowcase'), 'LiquidUnderlineNavbarShowcase'),
            makeLazy('Morphing Tab Navbar', 'morphing-tab-navbar', () => import('./ui/MorphingTabNavbarShowcase'), 'MorphingTabNavbarShowcase'),
            makeLazy('Orbiting Planets Navbar', 'orbiting-planets-navbar', () => import('./ui/OrbitingPlanetsNavbarShowcase'), 'OrbitingPlanetsNavbarShowcase'),
        ],
    },
    {
        id: 'search-bars',
        name: 'Search Bars',
        icon: SearchIcon,
        size: 'sm',
        description: 'Search inputs with self-animating states, morphing icons, and expanding capsules.',
        components: [
            makeLazy('Morph Search Capsule', 'morph-search-capsule', () => import('./ui/MorphSearchCapsuleShowcase'), 'MorphSearchCapsuleShowcase'),
            makeLazy('Animated Search Demo', 'animated-search-demo', () => import('./ui/AnimatedSearchDemo'), 'AnimatedSearchDemo'),
        ],
    },
    {
        id: 'sidebars',
        name: 'Sidebars',
        icon: PanelLeft,
        size: 'sm',
        description: 'Floating and docked sidebars with sliding active-state highlights and hover micro-animations.',
        components: [
            makeLazy('Kinetic Lens Sidebar', 'kinetic-lens-sidebar', () => import('./ui/KineticLensSidebarShowcase'), 'KineticLensSidebarShowcase'),
            makeLazy('Flightpath TOC', 'flightpath-toc', () => import('./ui/FlightpathTOCShowcase'), 'FlightpathTOCShowcase'),
            makeLazy('Sidebar', 'sidebar', () => import('./ui/Sidebar'), 'Sidebar'),
            makeLazy('Flower Sidebar', 'flower-sidebar', () => import('./ui/FlowerSidebarShowcase'), 'FlowerSidebarShowcase'),
        ],
    },
    {
        id: 'cards',
        name: 'Cards',
        icon: CreditCard,
        size: 'md',
        description: 'Layered, interactive, and tactile card components with physical animations.',
        components: [
            makeLazy('Diagonal Card Stack', 'diagonal-card-stack', () => import('./ui/DiagonalCardStackShowcase'), 'DiagonalCardStackShowcase'),
            makeLazy('Perspective Flip Deck', 'perspective-flip-deck', () => import('./ui/PerspectiveFlipDeckShowcase'), 'PerspectiveFlipDeckShowcase'),
            makeLazy('Orbital Card Arch', 'orbital-card-arch', () => import('./ui/OrbitalCardArchShowcase'), 'OrbitalCardArchShowcase'),
            makeLazy('Editorial 3D Orbit Carousel', 'editorial-3-d-orbit-carousel', () => import('./ui/Editorial3DOrbitCarouselShowcase'), 'Editorial3DOrbitCarouselShowcase'),
            makeLazy('Wallet Card Reveal', 'wallet-card-reveal', () => import('./ui/WalletCardRevealShowcase'), 'WalletCardRevealShowcase'),
            makeLazy('Arch Card Carousel', 'arch-card-carousel', () => import('./ui/ArchCardCarouselShowcase'), 'ArchCardCarouselShowcase'),
            makeLazy('Folder Tab Card', 'folder-tab-card', () => import('./ui/FolderTabCardShowcase'), 'FolderTabCardShowcase'),
        ],
    },
    {
        id: 'ai-ui',
        name: 'UI for AI',
        icon: Bot,
        size: 'md',
        description: 'Interactive AI interfaces, Claude-style reasoning streams, thinking indicators, and 3D assistant companions.',
        components: [
            makeLazy('Marbled Fluid Orb', 'marbled-fluid-orb', () => import('./ui/MarbledFluidOrbShowcase'), 'MarbledFluidOrbShowcase'),
            makeLazy('Particle Dot Orb', 'particle-dot-orb', () => import('./ui/ParticleDotOrbShowcase'), 'ParticleDotOrbShowcase'),
            makeLazy('Fluid Morph Orb', 'fluid-morph-orb', () => import('./ui/FluidMorphOrbShowcase'), 'FluidMorphOrbShowcase'),
            makeLazy('Wireframe Ring Orb', 'wireframe-ring-orb', () => import('./ui/WireframeRingOrbShowcase'), 'WireframeRingOrbShowcase'),
            makeLazy('Particle Morph Orb', 'particle-morph-orb', () => import('./ui/ParticleMorphOrbShowcase'), 'ParticleMorphOrbShowcase'),
        ],
    },
];


export function findComponentBySlug(slug) {
    for (const category of categories) {
        const entry = category.components.find((c) => c.slug === slug || (slug === 'claude-thinking-orb' && c.slug === 'fluid-morph-orb'));
        if (entry) return { category, entry };
    }
    return null;
}
