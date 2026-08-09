import React from 'react';
import { motion } from 'framer-motion';
import {
    Search,
    PanelLeftClose,
    PanelLeftOpen,
    Image as ImageIcon,
    MousePointerClick,
    ToggleLeft,
    PanelTop,
    PanelLeft,
    Bookmark,
    LayoutGrid,
    Type,
    MousePointer2,
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
import AmbientGlassMorphShowcase from './ui/AmbientGlassMorphShowcase';
import SpotlightGridShowcase from './ui/SpotlightGridShowcase';
import LiquidCursorGradientShowcase from './ui/LiquidCursorGradientShowcase';
import RippleGridShowcase from './ui/RippleGridShowcase';
import AsciiMatrixHoverShowcase from './ui/AsciiMatrixHoverShowcase';
import ElasticLineGridShowcase from './ui/ElasticLineGridShowcase';
import HexagonMeshHoverShowcase from './ui/HexagonMeshHoverShowcase';

import GooglyEyesButtonShowcase from './ui/GooglyEyesButtonShowcase';
import UploadProgressButtonShowcase from './ui/UploadProgressButtonShowcase';
import HoldToDeleteButtonShowcase from './ui/HoldToDeleteButtonShowcase';
import SlideToConfirmButtonShowcase from './ui/SlideToConfirmButtonShowcase';
import AddToCartGlowButtonShowcase from './ui/AddToCartGlowButtonShowcase';
import NeumorphicDownloadButtonShowcase from './ui/NeumorphicDownloadButtonShowcase';
import ShareSlideButtonShowcase from './ui/ShareSlideButtonShowcase';
import IceButtonShowcase from './ui/IceButtonShowcase';
import LiquidMetalButtonShowcase from './ui/LiquidMetalButtonShowcase';
import BlackButtonShowcase from './ui/BlackButtonShowcase';
import RainbowButtonShowcase from './ui/RainbowButtonShowcase';
import GlassButtonShowcase from './ui/GlassButtonShowcase';
import ShimmerButtonShowcase from './ui/ShimmerButtonShowcase';
import GlossButtonShowcase from './ui/GlossButtonShowcase';

import DayNightSkyToggleShowcase from './ui/DayNightSkyToggleShowcase';
import Flip3DToggleShowcase from './ui/Flip3DToggleShowcase';
import FocusModeGlassToggleShowcase from './ui/FocusModeGlassToggleShowcase';
import MinimalGlowToggleShowcase from './ui/MinimalGlowToggleShowcase';
import AuroraToggleShowcase from './ui/AuroraToggleShowcase';
import FrostedGlassToggleShowcase from './ui/FrostedGlassToggleShowcase';
import DayNightParallaxToggleShowcase from './ui/DayNightParallaxToggleShowcase';
import Skeuomorphic3DToggleShowcase from './ui/Skeuomorphic3DToggleShowcase';
import LiquidMagnetToggleShowcase from './ui/LiquidMagnetToggleShowcase';
import CyberpunkNeonToggleShowcase from './ui/CyberpunkNeonToggleShowcase';
import PrismaticTrackToggleShowcase from './ui/PrismaticTrackToggleShowcase';
import NeumorphicSoftToggleShowcase from './ui/NeumorphicSoftToggleShowcase';
import CosmicSparkleToggleShowcase from './ui/CosmicSparkleToggleShowcase';
import FluidMorphToggleShowcase from './ui/FluidMorphToggleShowcase';

import FloatingDockNavbarShowcase from './ui/FloatingDockNavbarShowcase';
import MagneticPillNavbarShowcase from './ui/MagneticPillNavbarShowcase';
import ExpandingSidebarShowcase from './ui/ExpandingSidebarShowcase';
import BlurryGlassNavbarShowcase from './ui/BlurryGlassNavbarShowcase';
import CircularRadialNavbarShowcase from './ui/CircularRadialNavbarShowcase';
import MorphingTabNavbarShowcase from './ui/MorphingTabNavbarShowcase';
import CyberpunkGlitchNavbarShowcase from './ui/CyberpunkGlitchNavbarShowcase';
import LiquidUnderlineNavbarShowcase from './ui/LiquidUnderlineNavbarShowcase';
import BentoDropMenuNavbarShowcase from './ui/BentoDropMenuNavbarShowcase';
import MinimalDotNavbarShowcase from './ui/MinimalDotNavbarShowcase';

import OrbitingPlanetsNavbarShowcase from './ui/OrbitingPlanetsNavbarShowcase';
import JellyScoopNavbarShowcase from './ui/JellyScoopNavbarShowcase';
import CurtainRevealNavbarShowcase from './ui/CurtainRevealNavbarShowcase';
import Perspective3DNavbarShowcase from './ui/Perspective3DNavbarShowcase';

import GlassSidebarShowcase from './ui/GlassSidebarShowcase';
import MinimalIconSidebarShowcase from './ui/MinimalIconSidebarShowcase';
import FloatingPillSidebarShowcase from './ui/FloatingPillSidebarShowcase';
import SaaSAdminSidebarShowcase from './ui/SaaSAdminSidebarShowcase';
import AnimatedHighlightSidebarShowcase from './ui/AnimatedHighlightSidebarShowcase';
import CollapsiblePinSidebarShowcase from './ui/CollapsiblePinSidebarShowcase';
import NeumorphicSidebarShowcase from './ui/NeumorphicSidebarShowcase';
import BentoSidebarShowcase from './ui/BentoSidebarShowcase';
import MacOSSidebarShowcase from './ui/MacOSSidebarShowcase';
import DynamicIslandSidebarShowcase from './ui/DynamicIslandSidebarShowcase';

import HighlandRealEstateCardShowcase from './ui/HighlandRealEstateCardShowcase';

import NexusEnergyCardShowcase from './ui/NexusEnergyCardShowcase';
import HoloDepthCardShowcase from './ui/HoloDepthCardShowcase';
import EtherealPulseCardShowcase from './ui/EtherealPulseCardShowcase';
import LiquidMorphCardShowcase from './ui/LiquidMorphCardShowcase';
import NeonTraceCardShowcase from './ui/NeonTraceCardShowcase';

import GooeyLiquidToggleShowcase from './ui/GooeyLiquidToggleShowcase';
import DayNightMorphToggleShowcase from './ui/DayNightMorphToggleShowcase';
import Soft3DFolderCardShowcase from './ui/Soft3DFolderCardShowcase';
import MeshFolderCardShowcase from './ui/MeshFolderCardShowcase';
import PastelPricingCardsShowcase from './ui/PastelPricingCardsShowcase';
import AIProductBentoShowcase from './ui/AIProductBentoShowcase';
import SaaSFeatureBentoShowcase from './ui/SaaSFeatureBentoShowcase';
import GradientGlowBentoShowcase from './ui/GradientGlowBentoShowcase';
import DataVizBentoShowcase from './ui/DataVizBentoShowcase';
import Soft3DBentoShowcase from './ui/Soft3DBentoShowcase';
import GlassmorphismBentoShowcase from './ui/GlassmorphismBentoShowcase';
import MinimalBlackBentoShowcase from './ui/MinimalBlackBentoShowcase';
import NeonTechBentoShowcase from './ui/NeonTechBentoShowcase';
import ProductivityBentoShowcase from './ui/ProductivityBentoShowcase';
import InteractiveCardsBentoShowcase from './ui/InteractiveCardsBentoShowcase';

import TypewriterTextShowcase from './ui/TypewriterTextShowcase';
import AuroraTextShowcase from './ui/AuroraTextShowcase';
import WordByWordTextShowcase from './ui/WordByWordTextShowcase';
import CharacterScrambleTextShowcase from './ui/CharacterScrambleTextShowcase';
import SplitTextRevealShowcase from './ui/SplitTextRevealShowcase';
import OdometerTextShowcase from './ui/OdometerTextShowcase';
import LiquidTextMorphShowcase from './ui/LiquidTextMorphShowcase';
import Flip3DTextShowcase from './ui/Flip3DTextShowcase';
import SpotlightTextShowcase from './ui/SpotlightTextShowcase';
import VelocityMarqueeTextShowcase from './ui/VelocityMarqueeTextShowcase';

import CanvasParticlesCursorShowcase from './ui/CanvasParticlesCursorShowcase';
import TextRingCursorShowcase from './ui/TextRingCursorShowcase';
import DifferenceLensCursorShowcase from './ui/DifferenceLensCursorShowcase';
import MatrixTrailCursorShowcase from './ui/MatrixTrailCursorShowcase';
import MagneticGooeyCursorShowcase from './ui/MagneticGooeyCursorShowcase';
import MagneticCursorShowcase from './ui/MagneticCursorShowcase'; // Hidden Reveal

import SplashCursorShowcase from './ui/SplashCursorShowcase';
import LensBlurCursorShowcase from './ui/LensBlurCursorShowcase';
import ElasticStringCursorShowcase from './ui/ElasticStringCursorShowcase';

// ---------------------------------------------------------------------------
// Component registry — data-driven, no per-category if/else branches.
// To add a component: import it above, then push it into the right
// category's `components` array below.
// ---------------------------------------------------------------------------

function titleFromComponent(Comp) {
    const name = (Comp.displayName || Comp.name || 'Component').replace(/Showcase$/, '');
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
        .trim();
}

function entries(...Comps) {
    return Comps.map((Comp) => ({ Component: Comp, title: titleFromComponent(Comp) }));
}

const categories = [
    {
        id: 'bgs',
        name: 'Animated Backgrounds',
        icon: ImageIcon,
        size: 'lg',
        components: entries(
            AsciiMatrixHoverShowcase, ElasticLineGridShowcase, HexagonMeshHoverShowcase,
            SpotlightGridShowcase, LiquidCursorGradientShowcase, RippleGridShowcase,
            ShootingStarsShowcase, SoftAuroraShowcase, PlexusEngineShowcase,
            ParticleWaveShowcase, HyperspeedWarpShowcase, SineRibbonsShowcase,
            AmbientGlowOrbsShowcase, RefractedBeamsShowcase, CosmicDustShowcase,
            DigitalRainShowcase,
        ),
    },
    {
        id: 'buttons',
        name: 'Buttons',
        icon: MousePointerClick,
        size: 'sm',
        components: entries(
            GooglyEyesButtonShowcase, UploadProgressButtonShowcase, HoldToDeleteButtonShowcase,
            SlideToConfirmButtonShowcase, AddToCartGlowButtonShowcase, NeumorphicDownloadButtonShowcase,
            ShareSlideButtonShowcase,
            GlossButtonShowcase, IceButtonShowcase, LiquidMetalButtonShowcase,
            BlackButtonShowcase, RainbowButtonShowcase, GlassButtonShowcase,
            ShimmerButtonShowcase,
        ),
    },
    {
        id: 'toggles',
        name: 'Toggles',
        icon: ToggleLeft,
        size: 'sm',
        components: entries(
            DayNightSkyToggleShowcase, Flip3DToggleShowcase, FocusModeGlassToggleShowcase,
            MinimalGlowToggleShowcase,
            AuroraToggleShowcase, GooeyLiquidToggleShowcase, DayNightMorphToggleShowcase,
            FrostedGlassToggleShowcase, DayNightParallaxToggleShowcase, Skeuomorphic3DToggleShowcase,
            LiquidMagnetToggleShowcase, CyberpunkNeonToggleShowcase, PrismaticTrackToggleShowcase,
            NeumorphicSoftToggleShowcase, CosmicSparkleToggleShowcase, FluidMorphToggleShowcase,
        ),
    },
    {
        id: 'navbars',
        name: 'Navbars',
        icon: PanelTop,
        size: 'lg',
        components: entries(
            FloatingDockNavbarShowcase, MagneticPillNavbarShowcase, ExpandingSidebarShowcase,
            BlurryGlassNavbarShowcase, CircularRadialNavbarShowcase, MorphingTabNavbarShowcase,
            CyberpunkGlitchNavbarShowcase, LiquidUnderlineNavbarShowcase, BentoDropMenuNavbarShowcase,
            MinimalDotNavbarShowcase, OrbitingPlanetsNavbarShowcase, JellyScoopNavbarShowcase,
            CurtainRevealNavbarShowcase, Perspective3DNavbarShowcase,
        ),
    },
    {
        id: 'sidebars',
        name: 'Sidebars',
        icon: PanelLeft,
        size: 'lg',
        components: entries(
            GlassSidebarShowcase, MinimalIconSidebarShowcase, FloatingPillSidebarShowcase,
            SaaSAdminSidebarShowcase, AnimatedHighlightSidebarShowcase, CollapsiblePinSidebarShowcase,
            NeumorphicSidebarShowcase, BentoSidebarShowcase, MacOSSidebarShowcase,
            DynamicIslandSidebarShowcase,
        ),
    },
    {
        id: 'cards',
        name: 'Cards',
        icon: Bookmark,
        size: 'sm',
        components: entries(
            NexusEnergyCardShowcase, HoloDepthCardShowcase, EtherealPulseCardShowcase,
            LiquidMorphCardShowcase, NeonTraceCardShowcase, HighlandRealEstateCardShowcase,
            Soft3DFolderCardShowcase, MeshFolderCardShowcase, PastelPricingCardsShowcase,
        ),
    },
    {
        id: 'bentos',
        name: 'Bento Grids',
        icon: LayoutGrid,
        size: 'lg',
        components: entries(
            AIProductBentoShowcase, SaaSFeatureBentoShowcase, GradientGlowBentoShowcase,
            DataVizBentoShowcase, Soft3DBentoShowcase, GlassmorphismBentoShowcase,
            MinimalBlackBentoShowcase, NeonTechBentoShowcase, ProductivityBentoShowcase,
            InteractiveCardsBentoShowcase,
        ),
    },
    {
        id: 'textanims',
        name: 'Micro Animations',
        icon: Type,
        size: 'sm',
        components: entries(
            LiquidTextMorphShowcase, Flip3DTextShowcase, SpotlightTextShowcase,
            VelocityMarqueeTextShowcase, AuroraTextShowcase, OdometerTextShowcase,
            TypewriterTextShowcase, WordByWordTextShowcase, CharacterScrambleTextShowcase,
            SplitTextRevealShowcase,
        ),
    },
    {
        id: 'cursors',
        name: 'Cursors',
        icon: MousePointer2,
        size: 'sm',
        components: entries(
            SplashCursorShowcase, LensBlurCursorShowcase, ElasticStringCursorShowcase,
            MagneticCursorShowcase, CanvasParticlesCursorShowcase, TextRingCursorShowcase,
            DifferenceLensCursorShowcase, MatrixTrailCursorShowcase, MagneticGooeyCursorShowcase,
        ),
    },
];

// ---------------------------------------------------------------------------
// FitFrame — measures a showcase's natural content size and scales it down
// (never up) to fit the card it's embedded in, so every preview is
// responsive regardless of the fixed pixel widths individual showcases use.
// ---------------------------------------------------------------------------

function FitFrame({ children }) {
    const outerRef = React.useRef(null);
    const innerRef = React.useRef(null);
    const [scale, setScale] = React.useState(1);
    const [height, setHeight] = React.useState(null);

    React.useLayoutEffect(() => {
        const outer = outerRef.current;
        const inner = innerRef.current;
        if (!outer || !inner) return undefined;

        const measure = () => {
            const containerWidth = outer.clientWidth;
            const contentWidth = inner.scrollWidth;
            const contentHeight = inner.scrollHeight;
            if (!containerWidth || !contentWidth || !contentHeight) return;
            const next = Math.min(1, containerWidth / contentWidth);
            setScale(next);
            setHeight(contentHeight * next);
        };

        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(outer);
        ro.observe(inner);
        return () => ro.disconnect();
    }, [children]);

    return (
        <div
            ref={outerRef}
            className="w-full flex items-center justify-center overflow-hidden"
            style={{ height: height ?? 'auto' }}
        >
            <div
                ref={innerRef}
                style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top center',
                    width: scale < 1 ? `${100 / scale}%` : '100%',
                }}
                className="flex justify-center prompt-embed"
            >
                {children}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// ShowcaseCard — Preview / Prompt toggle. The "prompt" text is read straight
// out of each showcase's own hidden footer <code> tag (see .prompt-embed in
// index.css), so there's no separate copy to keep in sync.
// ---------------------------------------------------------------------------

function ShowcaseCard({ title, size, children }) {
    const [tab, setTab] = React.useState('preview');
    const [copied, setCopied] = React.useState(false);
    const [prompt, setPrompt] = React.useState(null);
    const promptSourceRef = React.useRef(null);

    React.useEffect(() => {
        const codeEls = promptSourceRef.current?.querySelectorAll('code');
        const last = codeEls && codeEls.length ? codeEls[codeEls.length - 1] : null;
        setPrompt(last?.textContent?.trim() || null);
    }, []);

    const frameMaxHeight = size === 'lg' ? 480 : 260;

    return (
        <div className="w-full bg-white border border-noir/10 rounded-xl overflow-hidden font-sans flex flex-col">
            <div className="px-4 py-3 border-b border-noir/10 flex items-center justify-between gap-3 select-none">
                <span className="text-[13px] font-medium text-gray-800 truncate">{title}</span>
                <div className="flex bg-cotton/60 p-0.5 rounded-lg shrink-0">
                    <button
                        onClick={() => setTab('preview')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all select-none ${tab === 'preview' ? 'bg-white text-noir shadow-sm' : 'text-noir/50 hover:text-noir'
                            }`}
                    >
                        Preview
                    </button>
                    <button
                        onClick={() => setTab('prompt')}
                        className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all select-none ${tab === 'prompt' ? 'bg-white text-noir shadow-sm' : 'text-noir/50 hover:text-noir'
                            }`}
                    >
                        Prompt
                    </button>
                </div>
            </div>
            <div className="p-4 sm:p-6 bg-white flex flex-col justify-center flex-1" style={{ minHeight: frameMaxHeight * 0.7 }}>
                <div
                    ref={promptSourceRef}
                    className="w-full"
                    style={{ display: tab === 'preview' ? 'block' : 'none' }}
                >
                    <FitFrame>{children}</FitFrame>
                </div>
                {tab === 'prompt' && (
                    <div className="w-full rounded-lg bg-cotton/40 border border-noir/10 p-4 flex flex-col gap-3">
                        <p className="text-[13px] text-noir/80 font-mono leading-relaxed whitespace-pre-wrap">
                            {prompt || 'No prompt captured for this component yet.'}
                        </p>
                        {prompt && (
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(prompt);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className={`self-start px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer select-none border ${copied
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                                        : 'bg-white border-noir/15 text-noir hover:border-cherry/40 hover:text-cherry'
                                    }`}
                            >
                                {copied ? 'Copied!' : 'Copy prompt'}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Sidebar nav icon — small hover/active motion so the rail feels alive.
// ---------------------------------------------------------------------------

function NavIcon({ icon: Icon, active }) {
    return (
        <motion.span
            className="shrink-0 flex items-center justify-center"
            animate={{ scale: active ? 1.08 : 1, rotate: active ? -6 : 0 }}
            whileHover={{ scale: 1.15, rotate: -8 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        >
            <Icon size={17} strokeWidth={1.75} />
        </motion.span>
    );
}

export default function ComponentShowcaseLayout({ onBack }) {
    const [activeCategory, setActiveCategory] = React.useState('buttons');
    const [collapsed, setCollapsed] = React.useState(false);
    const [query, setQuery] = React.useState('');

    const trimmedQuery = query.trim().toLowerCase();
    const isSearching = trimmedQuery.length > 0;
    const activeCategoryData = categories.find((c) => c.id === activeCategory);

    const results = isSearching
        ? categories.flatMap((cat) =>
            cat.components
                .filter((entry) => entry.title.toLowerCase().includes(trimmedQuery))
                .map((entry) => ({ ...entry, categoryId: cat.id, size: cat.size }))
        )
        : (activeCategoryData?.components ?? []).map((entry) => ({
            ...entry,
            categoryId: activeCategory,
            size: activeCategoryData?.size,
        }));

    const heading = isSearching
        ? `Results for "${query.trim()}"`
        : activeCategoryData?.name ?? '';

    const gridClass = !isSearching && activeCategoryData?.size === 'lg'
        ? 'grid grid-cols-1 gap-6 pb-32'
        : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 pb-32';

    return (
        <div className="w-full min-h-screen bg-[#F1F1F1] font-sans flex">
            {/* SIDEBAR */}
            <aside
                className={`shrink-0 bg-cotton border-r border-noir/10 flex flex-col transition-all duration-300 sticky top-0 h-screen overflow-y-auto w-[76px] ${collapsed ? 'sm:w-[76px]' : 'sm:w-[248px]'
                    }`}
            >
                <div className="flex items-center justify-between px-3 sm:px-5 pt-6 pb-8">
                    <button
                        onClick={onBack}
                        className={`flex items-center gap-2.5 select-none ${collapsed ? 'mx-auto' : 'mx-auto sm:mx-0'}`}
                    >
                        <img src="/logo.png" alt="Conjure UI" className="w-7 h-7 object-contain shrink-0" />
                        <span className={`text-[15px] font-semibold text-noir tracking-tight hidden ${collapsed ? '' : 'sm:inline'}`}>Conjure UI</span>
                    </button>
                    <button
                        onClick={() => setCollapsed((v) => !v)}
                        className={`text-noir/50 hover:text-cherry transition-colors hidden ${collapsed ? '' : 'sm:block'}`}
                        aria-label="Collapse sidebar"
                    >
                        <PanelLeftClose size={18} strokeWidth={1.75} />
                    </button>
                </div>

                {collapsed && (
                    <button
                        onClick={() => setCollapsed(false)}
                        className="mx-auto mb-4 text-noir/50 hover:text-cherry transition-colors hidden sm:block"
                        aria-label="Expand sidebar"
                    >
                        <PanelLeftOpen size={18} strokeWidth={1.75} />
                    </button>
                )}

                <nav className="flex flex-col gap-1 px-2 sm:px-3">
                    {categories.map((cat) => {
                        const active = !isSearching && activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => {
                                    setActiveCategory(cat.id);
                                    setQuery('');
                                }}
                                title={cat.name}
                                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-[13.5px] font-medium transition-all select-none justify-center ${collapsed ? '' : 'sm:justify-start'
                                    } ${active
                                        ? 'text-cherry bg-white shadow-sm'
                                        : 'text-noir/70 hover:bg-white/60 hover:text-noir'
                                    }`}
                            >
                                <NavIcon icon={cat.icon} active={active} />
                                <span className={`truncate hidden ${collapsed ? '' : 'sm:inline'}`}>{cat.name}</span>
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 min-w-0 px-3 sm:px-6 md:px-10 py-6 sm:py-8">
                <div className="max-w-6xl mx-auto flex flex-col gap-8">
                    <div className="relative">
                        <Search size={17} strokeWidth={1.75} className="absolute left-4 top-1/2 -translate-y-1/2 text-noir/40" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search components"
                            className="w-full max-w-sm bg-cotton/50 border border-noir/10 rounded-full pl-11 pr-4 py-2.5 text-[13.5px] text-noir placeholder:text-noir/40 outline-none focus:border-cherry/40 transition-colors"
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight capitalize select-none">
                            {heading}
                        </h1>
                        {!isSearching && (
                            <p className="text-[13.5px] text-gray-600 max-w-2xl select-none">
                                A carefully curated showcase of premium {heading.toLowerCase()}, ready to preview, copy, or ship.
                            </p>
                        )}
                    </div>

                    {results.length > 0 ? (
                        <div className={gridClass}>
                            {results.map((entry, i) => (
                                <ShowcaseCard key={`${entry.categoryId}-${entry.title}-${i}`} title={entry.title} size={entry.size}>
                                    <entry.Component />
                                </ShowcaseCard>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full h-64 border border-dashed border-noir/20 rounded-xl flex items-center justify-center bg-noir/[0.02]">
                            <p className="text-noir/40 text-sm font-medium select-none">No components found.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
