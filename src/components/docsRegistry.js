import {
    Image as ImageIcon,
    MousePointerClick,
    ToggleLeft,
    MousePointer2,
    PanelTop,
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
import PixelCloudBackgroundShowcase from './ui/PixelCloudBackgroundShowcase';

import GooglyEyesButtonShowcase from './ui/GooglyEyesButtonShowcase';
import SlideToConfirmButtonShowcase from './ui/SlideToConfirmButtonShowcase';
import AddToCartGlowButtonShowcase from './ui/AddToCartGlowButtonShowcase';
import NeumorphicDownloadButtonShowcase from './ui/NeumorphicDownloadButtonShowcase';
import RainbowButtonShowcase from './ui/RainbowButtonShowcase';
import GlossButtonShowcase from './ui/GlossButtonShowcase';
import ChromeBorderButtonShowcase from './ui/ChromeBorderButtonShowcase';

import DayNightSkyToggleShowcase from './ui/DayNightSkyToggleShowcase';

import SplashCursorShowcase from './ui/SplashCursorShowcase';
import AppleNavbarShowcase from './ui/AppleNavbarShowcase';
import PillExpandNavbarShowcase from './ui/PillExpandNavbarShowcase';
import PixelDotNavbarShowcase from './ui/PixelDotNavbarShowcase';
import DarkModeMobileNavbarShowcase from './ui/DarkModeMobileNavbarShowcase';

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
        const title = titleFromComponent(Comp);
        return { Component: Comp, title, slug: slugify(title) };
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
            PixelCloudBackgroundShowcase,
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
            ChromeBorderButtonShowcase,
        ),
    },
    {
        id: 'toggles',
        name: 'Toggles',
        icon: ToggleLeft,
        size: 'sm',
        description: 'Switches and toggles with elastic, skeuomorphic, and ambient motion.',
        components: entries(
            DayNightSkyToggleShowcase,
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
        ),
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
        description: 'An animated water-caustics background rendered with a custom three.js shader — the crisscrossing light-web pattern and twinkling glints you see refracted on a swimming-pool floor, drifting over a deep-to-shallow color gradient.',
        prompt: waterCausticsPrompt,
        code: waterCausticsSource,
        techStack: 'React · three.js (WebGL) · GLSL',
    },
    'pixel-cloud-background': {
        description: 'A procedural retro pixel-art cloud background rendered with a custom three.js shader — posterized 3-tone clouds snapped to a chunky pixel grid, drifting slowly sideways over a flat sky-blue base.',
        prompt: pixelCloudPrompt,
        code: pixelCloudSource,
        techStack: 'React · three.js (WebGL) · GLSL',
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
};

export function findComponentBySlug(slug) {
    for (const category of categories) {
        const entry = category.components.find((c) => c.slug === slug);
        if (entry) return { category, entry };
    }
    return null;
}
