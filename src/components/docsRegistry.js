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

// Source Prompts & Codes for Documentation Reference
import { gradientWavePrompt, gradientWaveCode } from './ui/gradientWaveSource';
import { silkWavesPrompt, silkWavesCode } from './ui/silkWavesSource';
import { layeredPaperWavesPrompt, layeredPaperWavesCode } from './ui/layeredPaperWavesSource';
import { diagonalCardStackPrompt, diagonalCardStackCode } from './ui/diagonalCardStackSource';
import { perspectiveFlipDeckPrompt, perspectiveFlipDeckCode } from './ui/perspectiveFlipDeckSource';
import { orbitalCardArchPrompt, orbitalCardArchCode } from './ui/orbitalCardArchSource';
import { editorial3DOrbitCarouselPrompt, editorial3DOrbitCarouselCode } from './ui/editorial3DOrbitCarouselSource';
import { flightpathTOCPrompt, flightpathTOCCode } from './ui/flightpathTOCSource';
import { kineticLensSidebarPrompt, kineticLensSidebarCode } from './ui/kineticLensSidebarSource';
import { morphSearchCapsulePrompt, morphSearchCapsuleCode } from './ui/morphSearchCapsuleSource';
import { rainbowTypewriterBadgePrompt, rainbowTypewriterBadgeCode } from './ui/rainbowTypewriterBadgeSource';
import { kineticReelTextPrompt, kineticReelTextCode } from './ui/kineticReelTextSource';
import { contributionActivityPrompt, contributionActivityCode } from './ui/contributionActivitySource';

// Raw source files for Code drawer
import slideToConfirmSource from './ui/SlideToConfirmButtonShowcase.jsx?raw';
import pixelSnowSource from './ui/backgrounds/PixelSnow.jsx?raw';
import { pixelSnowPrompt } from './ui/pixelSnowSource';
import waterCausticsSource from './ui/backgrounds/WaterCaustics.jsx?raw';
import { waterCausticsPrompt } from './ui/waterCausticsSource';
import pixelCloudSource from './ui/backgrounds/PixelCloud.jsx?raw';
import { pixelCloudPrompt } from './ui/pixelCloudSource';
import pillExpandNavbarSource from './ui/PillExpandNavbarShowcase.jsx?raw';
import { pillExpandNavbarPrompt } from './ui/pillExpandNavbarSource';
import pixelDotNavbarSource from './ui/PixelDotNavbarShowcase.jsx?raw';
import { pixelDotNavbarPrompt } from './ui/pixelDotNavbarSource';
import darkModeMobileNavbarSource from './ui/DarkModeMobileNavbarShowcase.jsx?raw';
import { darkModeMobileNavbarPrompt } from './ui/darkModeMobileNavbarSource';
import { pillTrailPrompt, pillTrailCode } from './ui/pillTrailSource';
import { walletCardRevealPrompt, walletCardRevealCode } from './ui/walletCardRevealSource';
import { matteFolderCardPrompt, matteFolderCardCode } from './ui/matteFolderCardSource';
import { archCardCarouselPrompt, archCardCarouselCode } from './ui/archCardCarouselSource';
import { frostedFolderCardPrompt, frostedFolderCardCode } from './ui/frostedFolderCardSource';
import { animatedSearchPrompt, animatedSearchCode } from './ui/animatedSearchSource';
import { fluidWaveNavbarPrompt, fluidWaveNavbarCode } from './ui/fluidWaveNavbarSource';
import { glassOrbTogglePrompt, glassOrbToggleCode } from './ui/glassOrbToggleSource';
import { fluidMorphOrbPrompt, fluidMorphOrbCode } from './ui/fluidMorphOrbSource';
import { wireframeRingOrbPrompt, wireframeRingOrbCode } from './ui/wireframeRingOrbSource';
import { particleDotOrbPrompt, particleDotOrbCode } from './ui/particleDotOrbSource';
import { particleMorphOrbPrompt, particleMorphOrbCode } from './ui/particleMorphOrbSource';
import { marbledFluidOrbPrompt, marbledFluidOrbCode } from './ui/marbledFluidOrbSource';

/**
 * Helper to register a code-split component with explicit title, slug, and lazy import
 */
function makeLazy(title, slug, importFn) {
    const Component = lazy(importFn);
    Component.displayName = title;
    return { Component, title, slug };
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
            makeLazy('Ascii Matrix Hover', 'ascii-matrix-hover', () => import('./ui/AsciiMatrixHoverShowcase')),
            makeLazy('Elastic Line Grid', 'elastic-line-grid', () => import('./ui/ElasticLineGridShowcase')),
            makeLazy('Hexagon Mesh Hover', 'hexagon-mesh-hover', () => import('./ui/HexagonMeshHoverShowcase')),
            makeLazy('Spotlight Grid', 'spotlight-grid', () => import('./ui/SpotlightGridShowcase')),
            makeLazy('Liquid Cursor Gradient', 'liquid-cursor-gradient', () => import('./ui/LiquidCursorGradientShowcase')),
            makeLazy('Ripple Grid', 'ripple-grid', () => import('./ui/RippleGridShowcase')),
            makeLazy('Shooting Stars', 'shooting-stars', () => import('./ui/ShootingStarsShowcase')),
            makeLazy('Soft Aurora', 'soft-aurora', () => import('./ui/SoftAuroraShowcase')),
            makeLazy('Plexus Engine', 'plexus-engine', () => import('./ui/PlexusEngineShowcase')),
            makeLazy('Particle Wave', 'particle-wave', () => import('./ui/ParticleWaveShowcase')),
            makeLazy('Hyperspeed Warp', 'hyperspeed-warp', () => import('./ui/HyperspeedWarpShowcase')),
            makeLazy('Sine Ribbons', 'sine-ribbons', () => import('./ui/SineRibbonsShowcase')),
            makeLazy('Ambient Glow Orbs', 'ambient-glow-orbs', () => import('./ui/AmbientGlowOrbsShowcase')),
            makeLazy('Refracted Beams', 'refracted-beams', () => import('./ui/RefractedBeamsShowcase')),
            makeLazy('Cosmic Dust', 'cosmic-dust', () => import('./ui/CosmicDustShowcase')),
            makeLazy('Digital Rain', 'digital-rain', () => import('./ui/DigitalRainShowcase')),
            makeLazy('Pixel Snow Background', 'pixel-snow-background', () => import('./ui/PixelSnowBackgroundShowcase')),
            makeLazy('Water Caustics Background', 'water-caustics-background', () => import('./ui/WaterCausticsBackgroundShowcase')),
            makeLazy('Gradient Wave Background', 'gradient-wave-background', () => import('./ui/GradientWaveBackgroundShowcase')),
            makeLazy('Pixel Cloud Background', 'pixel-cloud-background', () => import('./ui/PixelCloudBackgroundShowcase')),
            makeLazy('Silk Waves Background', 'silk-waves-background', () => import('./ui/SilkWavesBackgroundShowcase')),
            makeLazy('Layered Paper Waves Background', 'layered-paper-waves-background', () => import('./ui/LayeredPaperWavesBackgroundShowcase')),
            makeLazy('Halftone Pixel Background', 'halftone-pixel-background', () => import('./ui/HalftonePixelBackgroundShowcase')),
        ],
    },
    {
        id: 'buttons',
        name: 'Buttons',
        icon: MousePointerClick,
        size: 'sm',
        description: 'Tactile, physically-animated buttons — press states, glows, and material effects.',
        components: [
            makeLazy('Googly Eyes Button', 'googly-eyes-button', () => import('./ui/GooglyEyesButtonShowcase')),
            makeLazy('Gloss Button', 'gloss-button', () => import('./ui/GlossButtonShowcase')),
            makeLazy('Neumorphic Download Button', 'neumorphic-download-button', () => import('./ui/NeumorphicDownloadButtonShowcase')),
            makeLazy('Add To Cart Glow Button', 'add-to-cart-glow-button', () => import('./ui/AddToCartGlowButtonShowcase')),
            makeLazy('Rainbow Button', 'rainbow-button', () => import('./ui/RainbowButtonShowcase')),
            makeLazy('Slide To Confirm Button', 'slide-to-confirm-button', () => import('./ui/SlideToConfirmButtonShowcase')),
            makeLazy('Chrome Border Button', 'chrome-border-button', () => import('./ui/ChromeBorderButtonShowcase')),
            makeLazy('Book A Call Button', 'book-a-call-button', () => import('./ui/BookACallButton')),
            makeLazy('Shimmer Button', 'shimmer-button', () => import('./ui/ShimmerButtonShowcase')),
        ],
    },
    {
        id: 'text',
        name: 'Text Animations',
        icon: TypeIcon,
        size: 'sm',
        description: 'Kinetic typography — reveals, scrambles, morphs, and counters.',
        components: [
            makeLazy('Kinetic Reel Text', 'kinetic-reel-text', () => import('./ui/KineticReelTextShowcase')),
            makeLazy('Rainbow Typewriter Badge', 'rainbow-typewriter-badge', () => import('./ui/RainbowTypewriterBadgeShowcase')),
            makeLazy('Split Text Reveal', 'split-text-reveal', () => import('./ui/SplitTextRevealShowcase')),
            makeLazy('Word By Word Text', 'word-by-word-text', () => import('./ui/WordByWordTextShowcase')),
            makeLazy('Character Scramble Text', 'character-scramble-text', () => import('./ui/CharacterScrambleTextShowcase')),
            makeLazy('Gradient Reveal Text', 'gradient-reveal-text', () => import('./ui/GradientRevealTextShowcase')),
            makeLazy('Aurora Text', 'aurora-text', () => import('./ui/AuroraTextShowcase')),
            makeLazy('Spotlight Text', 'spotlight-text', () => import('./ui/SpotlightTextShowcase')),
            makeLazy('Flip 3D Text', 'flip-3-d-text', () => import('./ui/Flip3DTextShowcase')),
            makeLazy('Typewriter Text', 'typewriter-text', () => import('./ui/TypewriterTextShowcase')),
            makeLazy('Odometer Text', 'odometer-text', () => import('./ui/OdometerTextShowcase')),
            makeLazy('Velocity Marquee Text', 'velocity-marquee-text', () => import('./ui/VelocityMarqueeTextShowcase')),
        ],
    },
    {
        id: 'toggles',
        name: 'Toggles',
        icon: ToggleLeft,
        size: 'sm',
        description: 'Switches and toggles with elastic, skeuomorphic, and ambient motion.',
        components: [
            makeLazy('Day Night Sky Toggle', 'day-night-sky-toggle', () => import('./ui/DayNightSkyToggleShowcase')),
            makeLazy('Landscape Orb Toggle', 'landscape-orb-toggle', () => import('./ui/LandscapeOrbToggleShowcase')),
            makeLazy('Glass Orb Toggle', 'glass-orb-toggle', () => import('./ui/GlassOrbToggleShowcase')),
        ],
    },
    {
        id: 'cursors',
        name: 'Cursors',
        icon: MousePointer2,
        size: 'sm',
        description: 'Custom cursor replacements — trails, lenses, and magnetic effects.',
        components: [
            makeLazy('Splash Cursor', 'splash-cursor', () => import('./ui/SplashCursorShowcase')),
            makeLazy('Pill Trail Cursor', 'pill-trail-cursor', () => import('./ui/PillTrailCursorShowcase')),
        ],
    },
    {
        id: 'navbars',
        name: 'Navbars',
        icon: PanelTop,
        size: 'lg',
        description: 'Floating, sticky, and responsive navigation bars with spring physics.',
        components: [
            makeLazy('Pill Expand Navbar', 'pill-expand-navbar', () => import('./ui/PillExpandNavbarShowcase')),
            makeLazy('Pixel Dot Navbar', 'pixel-dot-navbar', () => import('./ui/PixelDotNavbarShowcase')),
            makeLazy('Dark Mode Mobile Navbar', 'dark-mode-mobile-navbar', () => import('./ui/DarkModeMobileNavbarShowcase')),
            makeLazy('Fluid Wave Navbar', 'fluid-wave-navbar', () => import('./ui/FluidWaveNavbarShowcase')),
        ],
    },
    {
        id: 'search-bars',
        name: 'Search Bars',
        icon: SearchIcon,
        size: 'sm',
        description: 'Search inputs with self-animating states, morphing icons, and expanding capsules.',
        components: [
            makeLazy('Morph Search Capsule', 'morph-search-capsule', () => import('./ui/MorphSearchCapsuleShowcase')),
            makeLazy('Animated Search Demo', 'animated-search-demo', () => import('./ui/AnimatedSearchDemo')),
        ],
    },
    {
        id: 'sidebars',
        name: 'Sidebars',
        icon: PanelLeft,
        size: 'sm',
        description: 'Floating and docked sidebars with sliding active-state highlights and hover micro-animations.',
        components: [
            makeLazy('Kinetic Lens Sidebar', 'kinetic-lens-sidebar', () => import('./ui/KineticLensSidebarShowcase')),
            makeLazy('Flightpath TOC', 'flightpath-toc', () => import('./ui/FlightpathTOCShowcase')),
            makeLazy('Sidebar', 'sidebar', () => import('./ui/Sidebar')),
            makeLazy('Flower Sidebar', 'flower-sidebar', () => import('./ui/FlowerSidebarShowcase')),
        ],
    },
    {
        id: 'cards',
        name: 'Cards',
        icon: CreditCard,
        size: 'md',
        description: 'Layered, interactive, and tactile card components with physical animations.',
        components: [
            makeLazy('Contribution Activity', 'contribution-activity', () => import('./ui/ContributionActivityShowcase')),
            makeLazy('Diagonal Card Stack', 'diagonal-card-stack', () => import('./ui/DiagonalCardStackShowcase')),
            makeLazy('Perspective Flip Deck', 'perspective-flip-deck', () => import('./ui/PerspectiveFlipDeckShowcase')),
            makeLazy('Orbital Card Arch', 'orbital-card-arch', () => import('./ui/OrbitalCardArchShowcase')),
            makeLazy('Editorial 3D Orbit Carousel', 'editorial-3-d-orbit-carousel', () => import('./ui/Editorial3DOrbitCarouselShowcase')),
            makeLazy('Wallet Card Reveal', 'wallet-card-reveal', () => import('./ui/WalletCardRevealShowcase')),
            makeLazy('Matte Folder Card', 'matte-folder-card', () => import('./ui/MatteFolderCardShowcase')),
            makeLazy('Arch Card Carousel', 'arch-card-carousel', () => import('./ui/ArchCardCarouselShowcase')),
            makeLazy('Frosted Folder Card', 'frosted-folder-card', () => import('./ui/FrostedFolderCardShowcase')),
        ],
    },
    {
        id: 'ai-ui',
        name: 'UI for AI',
        icon: Bot,
        size: 'md',
        description: 'Interactive AI interfaces, Claude-style reasoning streams, thinking indicators, and 3D assistant companions.',
        components: [
            makeLazy('Marbled Fluid Orb', 'marbled-fluid-orb', () => import('./ui/MarbledFluidOrbShowcase')),
            makeLazy('Particle Dot Orb', 'particle-dot-orb', () => import('./ui/ParticleDotOrbShowcase')),
            makeLazy('Fluid Morph Orb', 'fluid-morph-orb', () => import('./ui/FluidMorphOrbShowcase')),
            makeLazy('Wireframe Ring Orb', 'wireframe-ring-orb', () => import('./ui/WireframeRingOrbShowcase')),
            makeLazy('Particle Morph Orb', 'particle-morph-orb', () => import('./ui/ParticleMorphOrbShowcase')),
        ],
    },
];

// Slugs that have a full reference-quality migration: real source code block,
// hand-written description, etc.
export const readyDetails = {
    'slide-to-confirm-button': {
        description: 'A slide-to-confirm button — drag the handle across the track to complete the order.',
        code: slideToConfirmSource,
    },
    'pixel-snow-background': {
        description: 'A ray-marched, pixelated snowfall background rendered with a custom three.js shader — chunky retro flakes, wind drift, and distance fade.',
        prompt: pixelSnowPrompt,
        code: pixelSnowSource,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'water-caustics-background': {
        description: 'An authentic animated swimming pool water-caustics background matching sunlit turquoise pool footage — shimmering caustic light nets, gentle surface wave ripples, and deep refractive water depth.',
        prompt: waterCausticsPrompt,
        code: waterCausticsSource,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'gradient-wave-background': {
        description: 'A luminous chromatic silk fluid wave background with undulating S-curved caustic light ribbons over a deep midnight navy base, featuring electric fuchsia, neon rose, and royal violet waves with HDR bloom.',
        prompt: gradientWavePrompt,
        code: gradientWaveCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'pixel-cloud-background': {
        description: 'A procedural retro pixel-art cloud background rendered with a custom three.js shader — posterized 3-tone clouds snapped to a chunky pixel grid, drifting slowly sideways over a flat sky-blue base.',
        prompt: pixelCloudPrompt,
        code: pixelCloudSource,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'silk-waves-background': {
        description: 'An iridescent flowing satin silk background matching deep electric-violet fabric footage — undulating liquid drapes sweeping diagonally with silver-lavender specular ridge crests and cool ambient teal lighting.',
        prompt: silkWavesPrompt,
        code: silkWavesCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'layered-paper-waves-background': {
        description: 'A minimal modern stacked 3D paper waves background with sculpted contour topography terraces, dynamic ambient lighting, and interactive mouse parallax.',
        prompt: layeredPaperWavesPrompt,
        code: layeredPaperWavesCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'halftone-pixel-background': {
        description: 'A retro-futuristic CRT halftone pixel background with interactive cursor lighting, dynamic pulsating pixel grid cells, and custom phosphor glow.',
        techStack: 'React · Canvas · Tailwind CSS',
    },
    'flower-sidebar': {
        description: 'A modern supersonic rail sidebar with a blooming lilac flower indicator gliding smoothly along an organic curved flightpath to track the active item.',
        techStack: 'React · Framer Motion · SVG',
    },
    'pill-trail-cursor': {
        description: 'A cursor trail made of rounded capsule pills that follow the pointer with physics-based spring lag, subtle rotation, and velocity-proportional stretch.',
        prompt: pillTrailPrompt,
        code: pillTrailCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'pill-expand-navbar': {
        description: 'A pill navbar that sits compact and expands horizontally on hover or tap, revealing navigation links with spring physics.',
        prompt: pillExpandNavbarPrompt,
        code: pillExpandNavbarSource,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'pixel-dot-navbar': {
        description: 'A retro pixel-art navbar with a dotted perimeter border and glowing neon accents.',
        prompt: pixelDotNavbarPrompt,
        code: pixelDotNavbarSource,
        techStack: 'React · Tailwind CSS',
    },
    'dark-mode-mobile-navbar': {
        description: 'A mobile-first bottom tab bar with an animated highlight pill that slides between active items.',
        prompt: darkModeMobileNavbarPrompt,
        code: darkModeMobileNavbarSource,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'fluid-wave-navbar': {
        description: 'A floating navbar with an organic fluid SVG wave that follows the cursor and morphs dynamically across tabs.',
        prompt: fluidWaveNavbarPrompt,
        code: fluidWaveNavbarCode,
        techStack: 'React · Framer Motion · SVG',
    },
    'wallet-card-reveal': {
        description: 'A dynamic credit card reveal effect that fans out stored payment cards with 3D perspective, interactive card selection, and tactile depth.',
        prompt: walletCardRevealPrompt,
        code: walletCardRevealCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'matte-folder-card': {
        description: 'A premium frosted matte folder card featuring interactive pocket expansion, floating paper previews, and tactile depth.',
        prompt: matteFolderCardPrompt,
        code: matteFolderCardCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'arch-card-carousel': {
        description: 'A carousel layout that positions cards along an elliptical arch curve with 3D tilt, perspective scaling, and keyboard/drag navigation.',
        prompt: archCardCarouselPrompt,
        code: archCardCarouselCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'frosted-folder-card': {
        description: 'A multi-layered translucent glass folder with blurred paper documents that fan out smoothly on hover.',
        prompt: frostedFolderCardPrompt,
        code: frostedFolderCardCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'animated-search-demo': {
        description: 'An intelligent search capsule that dynamically shifts suggestions, highlights matching tokens, and displays keyboard shortcut tags.',
        prompt: animatedSearchPrompt,
        code: animatedSearchCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'glass-orb-toggle': {
        description: 'A toggle switch shaped like a translucent glass orb with refracted ambient lighting, tactile click response, and smooth slide animation.',
        prompt: glassOrbTogglePrompt,
        code: glassOrbToggleCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'fluid-morph-orb': {
        description: 'A morphing 3D fluid sphere assistant that shifts shape organically with real-time perlin noise displacement and specular highlights.',
        prompt: fluidMorphOrbPrompt,
        code: fluidMorphOrbCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'wireframe-ring-orb': {
        description: 'A futuristic wireframe orb surrounded by concentric spinning rings with holographic luminescence and depth parallax.',
        prompt: wireframeRingOrbPrompt,
        code: wireframeRingOrbCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'particle-dot-orb': {
        description: 'A celestial particle sphere composed of hundreds of glowing points that swirl and react to pointer movement with elastic inertia.',
        prompt: particleDotOrbPrompt,
        code: particleDotOrbCode,
        techStack: 'React · three.js (WebGL) · Canvas',
    },
    'particle-morph-orb': {
        description: 'A multi-state particle orb that morphs dynamically between sphere, torus, and star shapes on user interaction.',
        prompt: particleMorphOrbPrompt,
        code: particleMorphOrbCode,
        techStack: 'React · three.js (WebGL) · Shaders',
    },
    'marbled-fluid-orb': {
        description: 'An AI companion orb with an iridescent marbled liquid surface that flows endlessly with vibrant swirl currents.',
        prompt: marbledFluidOrbPrompt,
        code: marbledFluidOrbCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'flightpath-toc': {
        description: 'A table of contents sidebar with an organic supersonic flightpath rail and an animated aircraft gliding smoothly between active sections.',
        prompt: flightpathTOCPrompt,
        code: flightpathTOCCode,
        techStack: 'React · Framer Motion · SVG',
    },
    'kinetic-lens-sidebar': {
        description: 'A minimalist navigation dock with a curved kinetic lens highlight that magnifies icons smoothly on hover and active state changes.',
        prompt: kineticLensSidebarPrompt,
        code: kineticLensSidebarCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'morph-search-capsule': {
        description: 'An expandable pill search input that seamlessly morphs from a floating icon button into an active input bar with animated placeholder rotation.',
        prompt: morphSearchCapsulePrompt,
        code: morphSearchCapsuleCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'rainbow-typewriter-badge': {
        description: 'A dark rounded badge text effect with typewriter animation, a rhythmic blinking cursor, and an animated flowing rainbow gradient edge with dynamic chromatic lighting.',
        prompt: rainbowTypewriterBadgePrompt,
        code: rainbowTypewriterBadgeCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'kinetic-reel-text': {
        description: 'A 3D kinetic slot-reel text animation with a static prefix and a vertical drum of items cycling through with perspective tilt, optical blur falloff, and mechanical spring inertia. Hover to pause, click to advance.',
        prompt: kineticReelTextPrompt,
        code: kineticReelTextCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'contribution-activity': {
        description: 'A lilac GitHub-style 53-week contribution heatmap in a glass card, with a floating pill that expands into a Recent Activity contributor panel via Framer Motion shared layout animation.',
        prompt: contributionActivityPrompt,
        code: contributionActivityCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'diagonal-card-stack': {
        description: 'A stacked diagonal card deck with perspective tilt and drag physics.',
        prompt: diagonalCardStackPrompt,
        code: diagonalCardStackCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'perspective-flip-deck': {
        description: 'A perspective flip deck carousel where cards flip in 3D on navigation.',
        prompt: perspectiveFlipDeckPrompt,
        code: perspectiveFlipDeckCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'orbital-card-arch': {
        description: 'Cards arranged along a convex orbital arch with tangent rotation and drag inertia.',
        prompt: orbitalCardArchPrompt,
        code: orbitalCardArchCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'editorial-3-d-orbit-carousel': {
        description: 'An editorial 3D orbit carousel with cards arranged in a circular ring.',
        prompt: editorial3DOrbitCarouselPrompt,
        code: editorial3DOrbitCarouselCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
};

export function findComponentBySlug(slug) {
    for (const category of categories) {
        const entry = category.components.find((c) => c.slug === slug || (slug === 'claude-thinking-orb' && c.slug === 'fluid-morph-orb'));
        if (entry) return { category, entry };
    }
    return null;
}
