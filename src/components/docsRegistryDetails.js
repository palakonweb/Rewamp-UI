// This file is intentionally NOT imported eagerly by docsRegistry.js.
// It holds the full prompt/code text for every component's docs 'Code' tab —
// dozens of multi-KB template-literal strings that add up to ~500KB uncompressed.
// DocsShell.jsx loads this module with a dynamic import() only when a docs
// detail page actually renders, so the main dashboard route (RewampShowcase)
// never pays for this text.

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

export default readyDetails;
