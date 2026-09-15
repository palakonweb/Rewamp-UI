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
    Sparkles,
} from 'lucide-react';

import ShootingStarsShowcase from './ui/ShootingStarsShowcase';
import SoftAuroraShowcase from './ui/SoftAuroraShowcase';
import PlexusEngineShowcase from './ui/PlexusEngineShowcase';
import ParticleWaveShowcase from './ui/ParticleWaveShowcase';
import HyperspeedWarpShowcase from './ui/HyperspeedWarpShowcase';
import SineRibbonsShowcase from './ui/SineRibbonsShowcase';
import AmbientGlowOrbsShowcase from './ui/AmbientGlowOrbsShowcase';
import RefractedBeamsShowcase from './ui/RefractedBeamsShowcase';
import CosmicDustShowcase from './ui/CosmicDustShowcase';
import DigitalRainShowcase from './ui/DigitalRainShowcase';
import SpotlightGridShowcase from './ui/SpotlightGridShowcase';
import LiquidCursorGradientShowcase from './ui/LiquidCursorGradientShowcase';
import RippleGridShowcase from './ui/RippleGridShowcase';
import AsciiMatrixHoverShowcase from './ui/AsciiMatrixHoverShowcase';
import ElasticLineGridShowcase from './ui/ElasticLineGridShowcase';
import HexagonMeshHoverShowcase from './ui/HexagonMeshHoverShowcase';
import PixelSnowBackgroundShowcase from './ui/PixelSnowBackgroundShowcase';
import WaterCausticsBackgroundShowcase from './ui/WaterCausticsBackgroundShowcase';
import GradientWaveBackgroundShowcase from './ui/GradientWaveBackgroundShowcase';
import PixelCloudBackgroundShowcase from './ui/PixelCloudBackgroundShowcase';
import SilkWavesBackgroundShowcase from './ui/SilkWavesBackgroundShowcase';
import LayeredPaperWavesBackgroundShowcase from './ui/LayeredPaperWavesBackgroundShowcase';
import { gradientWavePrompt, gradientWaveCode } from './ui/gradientWaveSource';
import { silkWavesPrompt, silkWavesCode } from './ui/silkWavesSource';
import { layeredPaperWavesPrompt, layeredPaperWavesCode } from './ui/layeredPaperWavesSource';
import FluidMorphOrbShowcase from './ui/FluidMorphOrbShowcase';
import WireframeRingOrbShowcase from './ui/WireframeRingOrbShowcase';
import ParticleDotOrbShowcase from './ui/ParticleDotOrbShowcase';
import ParticleMorphOrbShowcase from './ui/ParticleMorphOrbShowcase';
import MarbledFluidOrbShowcase from './ui/MarbledFluidOrbShowcase';

import GooglyEyesButtonShowcase from './ui/GooglyEyesButtonShowcase';
import SlideToConfirmButtonShowcase from './ui/SlideToConfirmButtonShowcase';
import AddToCartGlowButtonShowcase from './ui/AddToCartGlowButtonShowcase';
import NeumorphicDownloadButtonShowcase from './ui/NeumorphicDownloadButtonShowcase';
import RainbowButtonShowcase from './ui/RainbowButtonShowcase';
import GlossButtonShowcase from './ui/GlossButtonShowcase';
import ChromeBorderButtonShowcase from './ui/ChromeBorderButtonShowcase';
import BookACallButtonShowcase from './ui/BookACallButton';

import AuroraTextShowcase from './ui/AuroraTextShowcase';
import CharacterScrambleTextShowcase from './ui/CharacterScrambleTextShowcase';
import CountUpTextShowcase from './ui/CountUpTextShowcase';
import Flip3DTextShowcase from './ui/Flip3DTextShowcase';
import GradientRevealTextShowcase from './ui/GradientRevealTextShowcase';
import LiquidTextMorphShowcase from './ui/LiquidTextMorphShowcase';
import OdometerTextShowcase from './ui/OdometerTextShowcase';
import SplitTextRevealShowcase from './ui/SplitTextRevealShowcase';
import SpotlightTextShowcase from './ui/SpotlightTextShowcase';
import TextRingCursorShowcase from './ui/TextRingCursorShowcase';
import TypewriterTextShowcase from './ui/TypewriterTextShowcase';
import VelocityMarqueeTextShowcase from './ui/VelocityMarqueeTextShowcase';
import WordByWordTextShowcase from './ui/WordByWordTextShowcase';

import DayNightSkyToggleShowcase from './ui/DayNightSkyToggleShowcase';
import LandscapeOrbToggleShowcase from './ui/LandscapeOrbToggleShowcase';
import GlassOrbToggleShowcase from './ui/GlassOrbToggleShowcase';

import SplashCursorShowcase from './ui/SplashCursorShowcase';
import PillTrailCursorShowcase from './ui/PillTrailCursorShowcase';
import AppleNavbarShowcase from './ui/AppleNavbarShowcase';
import PillExpandNavbarShowcase from './ui/PillExpandNavbarShowcase';
import PixelDotNavbarShowcase from './ui/PixelDotNavbarShowcase';
import DarkModeMobileNavbarShowcase from './ui/DarkModeMobileNavbarShowcase';
import FluidWaveNavbarShowcase from './ui/FluidWaveNavbarShowcase';

import AnimatedSearchDemo from './ui/AnimatedSearchDemo';
import SidebarShowcase from './ui/Sidebar';
import WalletCardRevealShowcase from './ui/WalletCardRevealShowcase';
import MatteFolderCardShowcase from './ui/MatteFolderCardShowcase';
import ArchCardCarouselShowcase from './ui/ArchCardCarouselShowcase';
import FrostedFolderCardShowcase from './ui/FrostedFolderCardShowcase';
import DiagonalCardStackShowcase from './ui/DiagonalCardStackShowcase';
import { diagonalCardStackPrompt, diagonalCardStackCode } from './ui/diagonalCardStackSource';
import PerspectiveFlipDeckShowcase from './ui/PerspectiveFlipDeckShowcase';
import { perspectiveFlipDeckPrompt, perspectiveFlipDeckCode } from './ui/perspectiveFlipDeckSource';
import OrbitalCardArchShowcase from './ui/OrbitalCardArchShowcase';
import { orbitalCardArchPrompt, orbitalCardArchCode } from './ui/orbitalCardArchSource';
import Editorial3DOrbitCarouselShowcase from './ui/Editorial3DOrbitCarouselShowcase';
import { editorial3DOrbitCarouselPrompt, editorial3DOrbitCarouselCode } from './ui/editorial3DOrbitCarouselSource';

// Reference implementation: full end-to-end migration (preview + prompt + code)
import slideToConfirmSource from './ui/SlideToConfirmButtonShowcase.jsx?raw';
import { appleNavbarCode, appleNavbarPrompt } from './ui/appleNavbarSource';
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

// ---------------------------------------------------------------------------
// Component registry — data-driven, no per-category if/else branches.
// To add a component: import it above, then push it into the right
// category's `components` array below.
//
// Trimmed down (temporarily) to a curated set while the new docs shell is
// being finished — the rest of the catalog still exists on disk under
// src/components/ui/, just not wired into this registry right now.
// ---------------------------------------------------------------------------

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

function entries(...Comps) {
    return Comps.map((Comp) => {
        const title = Comp.customTitle || titleFromComponent(Comp);
        const slug = Comp.customSlug || slugify(title);
        return { Component: Comp, title, slug };
    });
}

export const categories = [
    {
        id: 'bgs',
        name: 'Animated Backgrounds',
        icon: ImageIcon,
        size: 'lg',
        description: 'Full-bleed animated backdrops — particles, gradients, grids, and warp effects.',
        components: entries(
            AsciiMatrixHoverShowcase, ElasticLineGridShowcase, HexagonMeshHoverShowcase,
            SpotlightGridShowcase, LiquidCursorGradientShowcase, RippleGridShowcase,
            ShootingStarsShowcase, SoftAuroraShowcase, PlexusEngineShowcase,
            ParticleWaveShowcase, HyperspeedWarpShowcase, SineRibbonsShowcase,
            AmbientGlowOrbsShowcase, RefractedBeamsShowcase, CosmicDustShowcase,
            DigitalRainShowcase, PixelSnowBackgroundShowcase, WaterCausticsBackgroundShowcase,
            GradientWaveBackgroundShowcase, PixelCloudBackgroundShowcase,
            SilkWavesBackgroundShowcase, LayeredPaperWavesBackgroundShowcase,
        ),
    },
    {
        id: 'buttons',
        name: 'Buttons',
        icon: MousePointerClick,
        size: 'sm',
        description: 'Tactile, physically-animated buttons — press states, glows, and material effects.',
        components: entries(
            GooglyEyesButtonShowcase, GlossButtonShowcase, NeumorphicDownloadButtonShowcase,
            AddToCartGlowButtonShowcase, RainbowButtonShowcase, SlideToConfirmButtonShowcase,
            ChromeBorderButtonShowcase, BookACallButtonShowcase,
        ),
    },
    {
        id: 'text',
        name: 'Text Animations',
        icon: TypeIcon,
        size: 'sm',
        description: 'Kinetic typography — reveals, scrambles, morphs, and counters.',
        components: entries(
            SplitTextRevealShowcase, WordByWordTextShowcase, CharacterScrambleTextShowcase,
            GradientRevealTextShowcase, AuroraTextShowcase, SpotlightTextShowcase,
            LiquidTextMorphShowcase, Flip3DTextShowcase, TypewriterTextShowcase,
            OdometerTextShowcase, CountUpTextShowcase, VelocityMarqueeTextShowcase,
            TextRingCursorShowcase,
        ),
    },
    {
        id: 'toggles',
        name: 'Toggles',
        icon: ToggleLeft,
        size: 'sm',
        description: 'Switches and toggles with elastic, skeuomorphic, and ambient motion.',
        components: entries(
            DayNightSkyToggleShowcase, LandscapeOrbToggleShowcase, GlassOrbToggleShowcase,
        ),
    },
    {
        id: 'cursors',
        name: 'Cursors',
        icon: MousePointer2,
        size: 'sm',
        description: 'Custom cursor replacements — trails, lenses, and magnetic effects.',
        components: entries(
            SplashCursorShowcase,
            PillTrailCursorShowcase,
        ),
    },
    {
        id: 'navbars',
        name: 'Navbars',
        icon: PanelTop,
        size: 'lg',
        description: 'Floating, sticky, and responsive navigation bars with spring physics.',
        components: entries(
            AppleNavbarShowcase, PillExpandNavbarShowcase, PixelDotNavbarShowcase, DarkModeMobileNavbarShowcase,
            FluidWaveNavbarShowcase,
        ),
    },
    {
        id: 'search-bars',
        name: 'Search Bars',
        icon: SearchIcon,
        size: 'sm',
        description: 'Search inputs with self-animating states, morphing icons, and expanding capsules.',
        components: entries(
            AnimatedSearchDemo,
        ),
    },
    {
        id: 'sidebars',
        name: 'Sidebars',
        icon: PanelLeft,
        size: 'sm',
        description: 'Floating and docked sidebars with sliding active-state highlights and hover micro-animations.',
        components: entries(
            SidebarShowcase,
        ),
    },
    {
        id: 'cards',
        name: 'Cards',
        icon: CreditCard,
        size: 'md',
        description: 'Layered, interactive, and tactile card components with physical animations.',
        components: entries(
            DiagonalCardStackShowcase,
            PerspectiveFlipDeckShowcase,
            OrbitalCardArchShowcase,
            Editorial3DOrbitCarouselShowcase,
            WalletCardRevealShowcase,
            MatteFolderCardShowcase,
            ArchCardCarouselShowcase,
            FrostedFolderCardShowcase,
        ),
    },
    {
        id: 'ai-ui',
        name: 'UI for AI',
        icon: Bot,
        size: 'md',
        description: 'Interactive AI interfaces, Claude-style reasoning streams, thinking indicators, and 3D assistant companions.',
        components: [
            {
                Component: MarbledFluidOrbShowcase,
                title: 'Marbled Fluid Orb',
                slug: 'marbled-fluid-orb',
            },
            {
                Component: ParticleDotOrbShowcase,
                title: 'Particle Dot Orb',
                slug: 'particle-dot-orb',
            },
            {
                Component: FluidMorphOrbShowcase,
                title: 'Fluid Morph Orb',
                slug: 'fluid-morph-orb',
            },
            {
                Component: WireframeRingOrbShowcase,
                title: 'Wireframe Ring Orb',
                slug: 'wireframe-ring-orb',
            },
            {
                Component: ParticleMorphOrbShowcase,
                title: 'Particle Morph Orb',
                slug: 'particle-morph-orb',
            },
        ],
    },
];

// Slugs that have a full reference-quality migration: real source code block,
// hand-written description, etc. Everything else still previews fine but
// shows a "migration pending" note instead of a source-code block.
export const readyDetails = {
    'slide-to-confirm-button': {
        description: 'A slide-to-confirm button — drag the handle across the track to complete the order.',
        code: slideToConfirmSource,
    },
    'apple-navbar': {
        description: 'Apple-style macOS floating glassmorphism capsule navbar with magnetic Framer Motion hover states, responsive mobile modal, and download button.',
        prompt: appleNavbarPrompt,
        code: appleNavbarCode,
        techStack: 'TypeScript · Framer Motion · Tailwind CSS',
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
        description: 'A tactile layered papercraft wave background matching pastel topographic cutout footage — seven physical curved paper strata with soft ambient drop shadows, crisp cut bevels, and a chromatic powder-blue to blush-rose gradient.',
        prompt: layeredPaperWavesPrompt,
        code: layeredPaperWavesCode,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'apple-navbar': {
        description: 'An authentic MacBook Dynamic Notch Navbar that rests as a compact camera notch at the top bezel and fluidly expands on hover into a sleek macOS NotchNook navbar with live widgets, calendar, music controls, and quick action pills.',
        prompt: appleNavbarPrompt,
        code: appleNavbarCode,
        techStack: 'React · Framer Motion · TypeScript · Tailwind CSS',
    },
    'pill-expand-navbar': {
        description: 'A compact black pill bottom navbar where the active or hovered tab smoothly, slowly expands to a fixed width to reveal its label, keeping the overall navbar width constant while the rest stay collapsed to icon-only.',
        prompt: pillExpandNavbarPrompt,
        code: pillExpandNavbarSource,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'pixel-dot-navbar': {
        description: 'A minimalist navbar with tiny dashed-outline pixel icons made of individual dots that scatter on idle and snap into an accent-colored square on hover/active.',
        prompt: pixelDotNavbarPrompt,
        code: pixelDotNavbarSource,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'dark-mode-mobile-navbar': {
        description: 'A white floating pill toolbar with a dark gliding active indicator between circular icon buttons, soft gray hover states, and white tooltips showing each icon\'s label.',
        prompt: darkModeMobileNavbarPrompt,
        code: darkModeMobileNavbarSource,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'pill-trail-cursor': {
        description: 'An animated cursor trail of colorful biotech pills following the mouse with fluid path physics, staying strictly horizontal and stacking gracefully along curves over an editorial helix.tech white canvas.',
        prompt: pillTrailPrompt,
        code: pillTrailCode,
        techStack: 'React · TypeScript · rAF Physics',
    },
    'wallet-card-reveal': {
        description: 'A tactile fintech leather wallet card with a hidden layered stack of payment cards (Stripe, Wise, PayPal) that smoothly fan out on clicking the interactive eye toggle.',
        prompt: walletCardRevealPrompt,
        code: walletCardRevealCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'matte-folder-card': {
        description: 'A sleek modern folder card featuring a living animated aurora mesh gradient and an inverted-fillet matte dark flap with high-contrast typography and interactive hover tilt.',
        prompt: matteFolderCardPrompt,
        code: matteFolderCardCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'arch-card-carousel': {
        description: 'An interactive curved arch card carousel where cards ride tangentially along a convex wheel trajectory with drag physics, tangent rotation, and inertia.',
        prompt: archCardCarouselPrompt,
        code: archCardCarouselCode,
        techStack: 'React · Framer Motion · TypeScript · Tailwind CSS',
    },
    'frosted-folder-card': {
        description: 'A tactile 3D card featuring a dark obsidian folder with a frosted acrylic flap and three wireframe document sheets that fan out upward on hover with spring physics.',
        prompt: frostedFolderCardPrompt,
        code: frostedFolderCardCode,
        techStack: 'React · Framer Motion · TypeScript · Tailwind CSS',
    },
    'animated-search-demo': {
        description: 'A minimalist circular search capsule that smoothly expands on hover with cushioned spring physics into an interactive search bar with ⌘K badge and instant clear action.',
        prompt: animatedSearchPrompt,
        code: animatedSearchCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'fluid-wave-navbar': {
        description: 'A floating white pill navbar with an organic dark grey fluid wave indicator that glides along the bottom edge on hover with spring physics.',
        prompt: fluidWaveNavbarPrompt,
        code: fluidWaveNavbarCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'glass-orb-toggle': {
        description: 'A tactile dark/light mode toggle with an oversized 3D crystal glass sphere that smoothly slides across a pill track with realistic refractive optics, caustics, and celestial icons.',
        prompt: glassOrbTogglePrompt,
        code: glassOrbToggleCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'marbled-fluid-orb': {
        description: 'A minimalist white AI thinking capsule in light mode featuring an iridescent marbled silk fluid sphere with coral, rose, peach, and violet ribbons on the left and shimmery reasoning text on the right.',
        prompt: marbledFluidOrbPrompt,
        code: marbledFluidOrbCode,
        techStack: 'React · Three.js (WebGL) · Framer Motion · GLSL',
    },
    'particle-dot-orb': {
        description: 'A minimalist white AI thinking capsule featuring a 3D Fibonacci particle sphere on the left and shimmery reasoning text on the right.',
        prompt: particleDotOrbPrompt,
        code: particleDotOrbCode,
        techStack: 'React · Three.js (WebGL) · Framer Motion',
    },
    'fluid-morph-orb': {
        description: 'A minimalist white AI thinking capsule featuring a velvety 3D fluid morphing orb on the left and shimmery reasoning text on the right.',
        prompt: fluidMorphOrbPrompt,
        code: fluidMorphOrbCode,
        techStack: 'React · Three.js (WebGL) · Framer Motion · GLSL',
    },
    'claude-thinking-orb': {
        description: 'A minimalist white AI thinking capsule featuring a velvety 3D fluid morphing orb on the left and shimmery reasoning text on the right.',
        prompt: fluidMorphOrbPrompt,
        code: fluidMorphOrbCode,
        techStack: 'React · Three.js (WebGL) · Framer Motion · GLSL',
    },
    'wireframe-ring-orb': {
        description: 'A minimalist white AI thinking capsule featuring a 3D wireframe contour ring orb on the left and shimmery reasoning text on the right.',
        prompt: wireframeRingOrbPrompt,
        code: wireframeRingOrbCode,
        techStack: 'React · Three.js (WebGL) · Framer Motion',
    },
    'particle-morph-orb': {
        description: 'A dark obsidian AI thinking capsule featuring a 3D morphing particle cloud orb on the left and shimmery reasoning text on the right.',
        prompt: particleMorphOrbPrompt,
        code: particleMorphOrbCode,
        techStack: 'React · Three.js (WebGL) · GLSL · Framer Motion',
    },
    'diagonal-card-stack': {
        description: 'An infinite diagonal cascading card conveyor that smoothly glides along a diagonal axis with drag scrub, pause-on-hover, and an isometric spring-physics collapse into a stacked card deck.',
        prompt: diagonalCardStackPrompt,
        code: diagonalCardStackCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'perspective-flip-deck': {
        description: 'A 3D isometric perspective card deck carousel with sequential peeling flip transitions, spring-physics forward slide, and prominent typographic numbering.',
        prompt: perspectiveFlipDeckPrompt,
        code: perspectiveFlipDeckCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'orbital-card-arch': {
        description: 'A 3D curved orbital card arch with subtle floating physics and smooth spring collapse into a centered card deck.',
        prompt: orbitalCardArchPrompt,
        code: orbitalCardArchCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'editorial-3d-orbit-carousel': {
        description: 'A clock-arm ticking sequence of full-bleed surreal art posters moving along an airy diagonal path with architectural watermark text, refined rotation angles, and mechanical step springs.',
        prompt: editorial3DOrbitCarouselPrompt,
        code: editorial3DOrbitCarouselCode,
        techStack: 'React · Framer Motion · Tailwind CSS',
    },
    'editorial3-d-orbit-carousel': {
        description: 'A clock-arm ticking sequence of full-bleed surreal art posters moving along an airy diagonal path with architectural watermark text, refined rotation angles, and mechanical step springs.',
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
