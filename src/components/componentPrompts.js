// Automatically generated and verified natural-language component prompts for Rewamp UI (RewampUI)
// Every component contains complete, 100% accurate visual and functional specifications,
// including exact styling tokens, interaction mechanics, and required tech stack dependencies.

export const componentPrompts = {
  // ──────────────────────────────────────────────────────────────────────────
  // 1. ANIMATED BACKGROUNDS (bgs)
  // ──────────────────────────────────────────────────────────────────────────
  "ascii-matrix-hover": `Create an interactive ASCII Matrix Character Stream background component in React:
- Visual Identity: Deep obsidian black canvas (#0D0C10 or #000000) filled with a dense orthogonal matrix grid of monospace typography characters ("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+<>[]{}").
- Baseline State: Characters render at 24px grid spacing with faint low-opacity slate (#333333 / 15% opacity), maintaining subtle ambient matrix density.
- Proximity Hover Interaction:
  - Tracks cursor position in real-time with Framer Motion spring physics (stiffness: 60, damping: 20).
  - A 250px radial spotlight mask (using CSS mask-image: radial-gradient) illuminates characters near the cursor.
  - Characters inside the cursor cone undergo rapid randomized character mutation (cycling at 60fps) and illuminate in brilliant neon mint / cyan (#4ECCA3 / #00F2FE) with vivid text-shadow bloom.
  - As the cursor leaves, characters smoothly stabilize back to their idle glyphs with exponential decay.
- Responsive canvas/grid sizing: Dynamically recalculates columns and rows on viewport resize with debounced window listeners.
- Overlay & Demo Shell: Includes centered hero title with Rewamp UI badge, high-contrast typography, and live demo content toggle switch.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "elastic-line-grid": `Create an interactive Elastic Line Grid Canvas background in React:
- Visual Identity: Dark minimalist grid system (#0D0C10) composed of intersecting horizontal and vertical vector grid lines (50px cell pitch) drawn in translucent silver-slate (#2A2734).
- Elastic Physics Simulation:
  - Line vertices act as physical elastic spring nodes with mass, damping (0.85), and stiffness tension (0.08).
  - Cursor pointer drag or hover physically displaces the nearest grid lines with an influence radius of 120px, stretching and bowing them along the mouse trajectory vector.
  - On cursor release or departure, displaced lines snap back and oscillate with harmonic damped harmonic vibration before settling to static rest.
  - Line stroke color and opacity dynamically brighten from faint mist to luminous neon orange (#EC5E27) proportionally to elongation strain.
- Performance: Native HTML5 Canvas 2D rendering loop with requestAnimationFrame, offscreen delta calculations, and zero React DOM re-renders during active drag.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "spotlight-grid": `Create an ultra-premium dark mode Spotlight Grid Background component in React:
- Visual Identity: Pitch-black container (#0A090D) overlaying a subtle geometric dot/line grid (40px square grid in #1E1B26 with 1px border stroke).
- Dynamic Cursor Spotlight:
  - Mouse coordinates tracked via Framer Motion useMotionValue with spring smoothing (stiffness: 300, damping: 30).
  - Two-stage radial gradient illumination mask created via useMotionTemplate:
    1. Intense inner core: 180px radial cone illuminating grid lines with radiant warm amber (#F59E0B) and brand orange (#EC5E27).
    2. Atmospheric outer halo: 450px soft ambient falloff fading seamlessly to 0% opacity into the dark background.
  - Subtle tactile grain noise overlay (mix-blend-mode: overlay, opacity: 0.04) across the entire surface.
- Smooth idle resting state: When mouse exits viewport, spotlight eases to the center of the canvas at 50% luminosity.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "liquid-cursor-gradient": `Create an ethereal Liquid Cursor Gradient ambient background in React:
- Visual Identity: Deep nocturnal indigo-slate backdrop (#0B0A10) layered with 4 massive, overlapping organic fluid gradient blobs.
- Color Symphony: Curated palette consisting of electric violet (#7C3AED), luminous neon peach (#FB923C), deep coral rose (#F43F5E), and cool cyan (#06B6D4).
- Multi-Layer Motion & Physics:
  - Background Blobs: 3 large background blobs (400px-600px diameter) float autonomously along smooth Lissajous curve paths using CSS keyframe oscillations (18s-25s durations).
  - Cursor Interactive Stalker: A dedicated primary gradient orb (350px diameter) follows cursor coordinates using Framer Motion springs (stiffness: 120, damping: 24, mass: 0.8).
  - Extreme Gaussian Depth Blur: Backdrop filter blur (backdrop-blur-[100px] to blur-[140px]) transforms sharp circles into voluptuous, interconnected chromatic silk metaballs.
  - Surface Frosted Card: Centered translucent frosted glass container (bg-white/5, backdrop-blur-xl, border border-white/10, rounded-3xl) floating above the fluid layer.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "ripple-grid": `Create a high-performance Ripple Grid Canvas background in React:
- Visual Identity: Minimalist dark matrix grid (#0D0C10) composed of a uniform 2D array of circular dot nodes (spaced 28px apart, baseline dot radius: 1.5px, color: #4B4658).
- Wave Propagation Dynamics:
  - On mouse move or click, an impulse wave emits outward from the cursor origin with propagation velocity (v = 320px/s) and exponential distance decay.
  - Wave peaks modulate both dot scale (enlarging up to 4.5px) and opacity (brightening to pure white #FFFDF2 and brand orange #EC5E27).
  - Constructive interference: Multiple concurrent wave pulses combine harmonically across intersecting wavefronts.
- Rendering Pipeline: HTML5 Canvas 2D context optimized with pre-allocated Float32Array buffers for wave centers, amplitudes, and phases, executing at a locked 60fps with zero garbage collection allocations.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "shooting-stars": `Create a cinematic Night Sky with Twinkling Stars and Shooting Star Meteor Showers in React:
- Visual Identity: Ultra-deep midnight gradient backdrop (linear-gradient from #050508 through #0D0C18 to #08060F).
- Starfield & Meteor Physics:
  - Static Starfield: 150-200 micro star points with randomized radii (0.5px to 2px) and individualized CSS animation delays creating organic scintillation/twinkling.
  - Dynamic Shooting Star Meteors:
    - Periodically spawn from randomized upper-canvas origins at a consistent 45° trajectory.
    - Each meteor features an intense luminous white head with a 160px tapered gradient tail (fading from pure white #FFF to electric cyan #38BDF8 and transparent).
    - High-velocity linear glide (duration: 800ms-1200ms) with ease-out dissipation and randomized interval triggers (every 2.5s-6s).
- Interactive Pulse: Clicking canvas spawns an immediate starburst cluster at cursor location.
- Tech Stack: React, HTML5 Canvas 2D / CSS Animations, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "soft-aurora": `Create an animated Soft Aurora Mesh Gradient background in React:
- Visual Identity: Dark luxury aesthetic (#09080D) with undulating, translucent aurora borealis ribbon waves blending seamlessly across the viewport.
- Gradient Architecture:
  - 4 layered mesh nodes shifting between royal purple (#6366F1), emerald teal (#10B981), celestial cyan (#06B6D4), and warm peach (#F97316).
  - Organic harmonic distortion using multi-octave Perlin/Simplex noise formulas to produce natural curtain-like folds and undulating wave crests.
  - Extreme layered diffusion blur (blur-[120px]) with high-precision color interpolation preventing banding artifacts.
- Performance & Interactivity: GPU-accelerated CSS/WebGL animation loop with subtle parallax shift reacting to mouse movements.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "plexus-engine": `Create an interactive Plexus Constellation Engine background in React:
- Visual Identity: Dark spatial canvas (#0B0A10) populated with 80-120 floating celestial nodes (radii: 2px to 3.5px, color: #E0E7FF).
- Autonomous Particle Dynamics:
  - Particles drift autonomously with 2D velocity vectors (vx, vy), softly bouncing off viewport boundaries with velocity preservation.
  - Dynamic Proximity Connections:
    - Distance between all node pairs calculated every frame.
    - When distance d < 120px, an anti-aliased connecting line is drawn with opacity proportional to (1 - d / 120).
    - When distance d < 60px, connecting lines glow with brand lilac-orange accent.
  - Interactive Cursor Gravity: Cursor exerts a magnetic attract/repel force within a 180px radius, with particles springing toward the pointer and forming dense constellation hubs.
- High Performance: Native Canvas 2D implementation with spatial hash grid partitioning for O(N log N) distance checks.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "particle-wave": `Create a 3D Oscillating Particle Wave data ocean surface in React:
- Visual Identity: Deep nocturnal perspective ocean (#07060A) displaying a 3D grid of 2,500 glowing data nodes (50 x 50 grid).
- 3D Wave Equations:
  - 3D perspective projection math (x, y, z -> 2D screen coordinates) with pitch tilt (45°) and depth scaling (1 / (1 + z * focalLength)).
  - Compound sine and cosine wave oscillation: y = sin(x * 0.15 + t * speed) * cos(z * 0.12 + t * speed * 0.8) * amplitude.
  - Dot scale (1px to 4px) and color luminance (from deep indigo #312E81 to radiant cyan #22D3EE and white) scale with wave apex elevation.
  - Interactive Camera Orbit: Mouse X/Y movement smoothly tilts camera elevation angle and wave propagation speed.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "hyperspeed-warp": `Create a 3D Hyperspeed Starfield Warp Tunnel background in React:
- Visual Identity: Pitch-black void (#050507) with 500 hyper-velocity star vectors streaking toward the viewer along the Z-axis.
- Warp Geometry & Projection:
  - Stars initialized with 3D coordinates (X, Y, Z) where Z ranges from depth 1000 to 0.
  - Screen projection: screenX = X / Z * fov + centerX, screenY = Y / Z * fov + centerY.
  - As stars approach Z = 0, they stretch from circular points into luminous motion-blurred light trails (from 2px to 60px length) with cyan-white (#E0F2FE to #38BDF8) gradient radiance.
  - Z-recycling: When a star crosses the camera plane (Z <= 0), it instantly resets to maximum depth Z = 1000 with randomized X/Y.
- Interactive Throttle: Mouse click/hold triggers hyperspeed boost (3x velocity acceleration with FOV camera expansion).
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "sine-ribbons": `Create an elegant Translucent Sine Ribbon Waves background in React:
- Visual Identity: Dark luxury container (#0A0910) with 6-8 overlapping chromatic sinusoidal ribbon bands sweeping horizontally across the screen.
- Harmonic Mathematics:
  - Each ribbon is generated by evaluating compound multi-frequency sine wave curves: y(x) = A1 * sin(w1 * x + phi1) + A2 * sin(w2 * x + phi2).
  - Ribbon thickness modulated by secondary harmonic envelopes, filled with semi-transparent linear gradients (violet #8B5CF6, rose #F43F5E, amber #F59E0B, cyan #06B6D4) with mix-blend-mode: screen.
  - Continuous silky smooth undulating motion with independent phase offsets per ribbon.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "ambient-glow-orbs": `Create an Ambient Glowing Orbs background component in React:
- Visual Identity: Deep nocturnal canvas (#0E0D13) with 5 massive atmospheric glowing spheres drifting in slow, continuous harmonic orbits.
- Lighting Architecture:
  - Spheres render with soft multi-stop radial gradient fills (warm coral #F97316, radiant violet #A855F7, soft amber #FBBF24, celestial blue #3B82F6).
  - Heavy 120px Gaussian surface diffusion transforms circles into radiant ambient cloud volumes that blend dynamically where they overlap.
  - Foreground content card (frosted glass with backdrop-filter, border border-white/10, soft inner glow) highlights the lighting shifts underneath.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "refracted-beams": `Create an interactive Refracted Laser Beams background in React:
- Visual Identity: Pure pitch-black canvas (#000000) intersected by sharp, dynamic geometric light beams and chromatic prism refractions.
- Optics & Raycasting:
  - 3 primary laser emitters project focused light vectors across the screen.
  - When beams intersect or strike interactive geometric prism nodes, they calculate reflection angle (theta_r = theta_i) and split into chromatic RGB dispersion rays (red #EF4444, green #10B981, blue #3B82F6).
  - Cursor acts as an interactive optical prism that captures, bends, and focuses laser paths in real time.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "cosmic-dust": `Create an ultra-slow Floating Cosmic Dust ambient background in React:
- Visual Identity: Deep obsidian canvas (#08070C) populated with 300 micro cosmic dust specks drifting in organic zero-gravity fluid currents.
- Fluid Brownian Motion:
  - Dust particles move according to low-frequency 2D Simplex noise vector fields, producing natural curling vortexes and eddy currents.
  - Particle radii vary from 0.8px to 2.2px with subtle luminance breathing (opacity pulsing between 0.2 and 0.85).
  - Cursor pointer emits a gentle ambient pressure wave that disperses nearby dust particles with soft aerodynamic damping.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "digital-rain": `Create a modern minimalist Digital Rain matrix background in React:
- Visual Identity: Deep charcoal canvas (#0B0A0F) with vertical monospace character columns raining downward with varying column velocities.
- Typography & Glyphs:
  - Custom font matrix containing Japanese katakana, alphanumeric glyphs, and mathematical symbols.
  - Column Heads: The leading character of each stream glows in brilliant cherry red / neon coral (#EC5E27 / #FF4D4D) with crisp text-shadow bloom.
  - Column Tails: Trailing characters fade through pure white (#FFFFFF) down to dark slate (#2A2833) over 16-24 character steps before dissolving into the background.
  - Randomized in-place glyph scrambling occurs at random character positions in falling streams.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "pixel-snow-background": `Create a full-bleed WebGL/Three.js animated Pixel Snow background component:
- Shading & Ray-marching Pipeline:
  - Single fullscreen orthographic quad rendered with a custom GLSL ShaderMaterial.
  - Ray-marches through a 3D voxel grid containing billboarded snowflakes drifting and wobbling with layered sine functions seeded by per-cell hash coordinates.
  - Three distinct snowflake SDF variants: flat-topped square, circular dot, and hex-branched crystal snowflake.
  - Screen coordinates snapped to a chunky pixel resolution grid (pixelResolution: 4-8px) for authentic retro pixel-art aesthetic.
- Configurable Props: color (#E2E8F0), flakeSize, speed, depthFade, density, variant, direction (wind angle in degrees).
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  "water-caustics-background": `Create a full-bleed WebGL/Three.js animated Water Caustics background component:
- 5-Pass WebGL Post-Processing Pipeline:
  - Pass 1: Renders water caustics into half-float RGBA target using multi-octave sine-feedback light convergence, perspective mapping (tight loops in background, broad loops in foreground), and ripple displacement.
  - Pass 2: Over-bright peak extraction (threshold: 0.85).
  - Passes 3-4: Separable 5-tap Gaussian blur (horizontal and vertical) for bloom radiance.
  - Pass 5: Composites sharp water base with blurred bloom, subtle chromatic aberration fringe, and filmic exposure tonemapping (1 - exp(-color * exposure)).
- Configurable Props: deepColor (#0E3A4D), midColor (#1A6B85), lineColor (#5CE1E6), speed, scale, refract, bloomStrength, exposure.
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  "gradient-wave-background": `Create a full-bleed WebGL/Three.js animated Gradient Wave Ribbon background component:
- Shader Architecture:
  - 5-pass fullscreen-quad WebGL pipeline rendering undulating chromatic silk ribbon waves.
  - Deep midnight navy base (#060514) accented with glowing fuchsia (#E11D48), neon rose (#F43F5E), and royal violet (#8B5CF6) silk ribbons.
  - Anchored by an intense luminous white caustic light beam with HDR bloom extraction and filmic tonemapping.
- Interactive & Responsive: Smoothly adapts to resize events with capped devicePixelRatio and IntersectionObserver performance gating.
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  "pixel-cloud-background": `Create a full-bleed WebGL/Three.js Pixel Cloud animated sky background component:
- Procedural Volumetric Modeling:
  - Asymmetric signed-distance cloud envelope filled with domain-warped billow noise (1 - abs(2 * valueNoise - 1)).
  - Self-shadowing occlusion calculation via secondary sun-offset density sampling.
  - Screen coordinates snapped to a chunky pixel grid (floor(coord / pixelSize) * pixelSize) and quantized flat step lighting for retro pixel-art aesthetic.
- Depth Layering: 6 independently seeded cloud strata drifting at distinct speeds with atmospheric perspective fade.
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  "silk-waves-background": `Create a full-bleed WebGL/Three.js Silk Waves animated background component:
- Shading Mechanics:
  - Single-pass fullscreen quad shader rendering voluptuous, liquid silk drapes sweeping diagonally across the canvas.
  - Deep electric-violet shadows (#1E1035), lustrous silver-lavender specular crests (#D4CBE5), and an ambient cool teal glow (#14B8A6).
  - Numerical surface normal calculation for satin anisotropic highlights and Fresnel grazing sheen.
- Exposed Props: speed (0.4), scale (1.0), intensity (1.2), shadowColor, violetColor, highlightColor, ambientColor.
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  "layered-paper-waves-background": `Create a full-bleed WebGL/Three.js Layered Paper Waves animated background component:
- Layered Topographic Papercraft:
  - Seven physical papercraft wave strata stacked with depth, casting soft realistic drop shadows onto lower layers with crisp cut paper bevel highlights.
  - Undulating wave sheets ripple smoothly across the diagonal axis with chromatic pastel gradient from powder blue through lilac and periwinkle to blush rose and deep mauve.
  - Single-pass fullscreen quad shader with back-to-front composite layering, smoothstep drop shadow penumbras, and fine-art paper grain texture.
- Props: speed (0.4), scale (1.0), amplitude (1.0).
- Tech Stack: React, Three.js, WebGL GLSL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 2. BUTTONS (buttons)
  // ──────────────────────────────────────────────────────────────────────────
  "googly-eyes-button": `Create an interactive Googly Eyes Button component in React:
- Visual Identity: Dark charcoal rounded-full pill button (bg-[#1E1C24], border border-white/10, shadow-xl) reading "Look Around".
- Googly Eyes Mechanics:
  - Contains two white circular eyeball discs (22px diameter) with dark iris pupils (8px diameter).
  - Pupils track the real-time global cursor position using trigonometric angle calculation: theta = atan2(mouseY - eyeCenterY, mouseX - eyeCenterX).
  - Pupil distance clamped inside the eyeball socket with elastic spring physics (stiffness: 300, damping: 20).
  - On button hover: Eyeballs widen and pupils bounce playfully with micro-vibrations.
  - On button press: Eyes squish vertically (scaleY: 0.7, scaleX: 1.15) with tactile click audio/visual confirmation.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "gloss-button": `Create an ultra-glossy Marbled Oil-Slick Pill Button component in React:
- Visual Identity: Rounded-full pill CTA with a living, iridescent marbled oil-slick surface (swirling blush rose, lavender, and champagne gold hues) that slowly undulates in an infinite loop.
- Optical Sheen: Fixed glossy top highlight arc (white 40% opacity gradient) simulating curved glass reflection with deep drop shadow beneath.
- Hover & Press Feedback: On hover, button lifts 2px with intensified specular sheen; on click, springs inward with a soft ripple pulse.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "neumorphic-download-button": `Create a 3-State Neumorphic Download Button component in React:
- Visual Identity: Soft raised light-gray tactile surface (#E5E7EB) with dual extruded neumorphic drop shadows.
- 3 Interactive States:
  1. Idle State: Circular disc with cloud-download icon on the left, reading "Download".
  2. Downloading State (on click): Amber progress ring sweeps clockwise around the disc over ~2s while the icon shifts to amber and label reads "Downloading...".
  3. Downloaded State (completion): Progress ring completes, disc displays a bright emerald checkmark, and label crossfades to "Downloaded". Resets after 2s.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "add-to-cart-glow-button": `Create an interactive Add to Cart Glow Button component in React:
- Visual Identity: Dark charcoal rounded pill (bg-[#18181B], text-white) reading "+ Add to cart", wrapped in a continuous rotating rainbow conic-gradient border.
- State Transition: On click, border swaps to emerald green with rotating sheen, label transitions to "Added to cart" with an animated checkmark, then reverts gracefully after 2 seconds.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "rainbow-button": `Create a clean minimalist Rainbow Border Button component in React:
- Visual Identity: Pristine near-white rounded-rectangle pill (bg-white/95 dark:bg-[#18181B]) wrapped in a static, delicate pastel iridescent rainbow border ring.
- Micro-Interactions: Subtle lift on hover (-1.5px) and spring compression on active press with crisp typography.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "slide-to-confirm-button": `Create an animated Slide to Confirm Order Button component in React:
- Visual Identity: Deep navy/charcoal rounded pill track reading "Complete Order".
- Interactive Sequence: On click, label fades out; a tan package icon appears on the left; a white cargo-trailer truck slides from left to right across the track leaving a dashed road line trail and headlight beams; track settles and label crossfades to "Order Placed" with an animated green check.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "chrome-border-button": `Create a Polished Chrome Border Pill Button component in React:
- Visual Identity: Crisp white rounded-full pill button wrapped in a rotating true-chrome metallic border ring (conic gradient in shades of silver, white, and obsidian).
- Metallic Text Sheen: Centered text rendered with a looping horizontal metallic gradient sweep simulating polished platinum reflection.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "book-a-call-button": `Create an agency-grade Book a Call interactive CTA button in React:
- Visual Identity: Frosted glass dark capsule with an embedded avatar stack on the left, glowing status pulse dot, and arrow action icon on the right.
- Motion: Hover expands avatar stack with spring physics, brightens ambient border glow, and translates arrow icon 4px diagonally.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "shimmer-button": `Create a Minimalist Shimmer Light Streak Button component in React:
- Visual Identity: Clean white pill with delicate slate border and dark charcoal typography.
- Light Streak Animation: A narrow soft specular light streak periodically sweeps diagonally across the surface at a 45° angle, accelerating smoothly on click with 1-2px hover lift.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 3. TEXT ANIMATIONS (text)
  // ──────────────────────────────────────────────────────────────────────────
  "kinetic-reel-text": `Create an authentic Kinetic Rolling Slot Reel Text animation in React:
- Visual Identity: Pure pitch-black backdrop (#000000). Static bold lowercase prefix "we do" on the left with letter-spacing -0.03em.
- 3D Drum Reel Mechanics:
  - 3D cylindrical tumbling reel on the right cycling through services: "Websites", "Brand identity", "SEO optimization", "Digital marketing", "Lead generation", "Influencer marketing".
  - Center active item is full opacity pure white (#FFFFFF), aligned perfectly with prefix baseline.
  - Above/below items curve along the cylinder with 3D perspective tilt (rotateX: ±35deg) and opacity falloff (0.35).
  - Interactive mouse wheel scrubbing, touch/pointer drag, click-to-roll, and auto-tumble timer with spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "split-text-reveal": `Create an editorial Split Text Character Reveal animation in React:
- Visual Identity: Dark container with large bold heading typography.
- Motion Mechanics: Text splits into individual character spans; on trigger/mount, characters fly in from randomized vertical offsets (-60px to +60px) with staggered spring timing (0.03s delay per char), blur-to-focus transitions (blur(8px) -> blur(0px)), and opacity fade.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "word-by-word-text": `Create a smooth Word-by-Word Sequence Reveal animation in React:
- Visual Identity: Dark minimalist editorial layout with high-contrast warm white typography (#FFFDF2).
- Motion: Splits sentence into word tokens; words slide up smoothly from an overflow-hidden mask with staggered spring physics, creating a rhythmic and unhurried reading experience.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "character-scramble-text": `Create a Hacker Matrix Character Scramble Decode text animation in React:
- Visual Identity: Monospace dark terminal layout with mint-green / cyan accent highlights (#4ECCA3).
- Scramble Algorithm: Each character cycles rapidly through random ASCII symbols ("!@#$%^&*<>[]{}~") for a randomized duration before locking smoothly into the final target character from left to right.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "gradient-reveal-text": `Create a Living Gradient Shimmer Heading text component in React:
- Visual Identity: Bold display typography masked over a continuous shifting multi-stop linear gradient (lavender #C084FC, cyan #38BDF8, rose #FB7185, and amber #FBBF24).
- Animation: Smooth 8s horizontal background-position animation loop with CSS background-clip: text.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "spotlight-text": `Create an interactive Spotlight Text Reveal component in React:
- Visual Identity: Pitch-black container where text is initially concealed.
- Mask Interaction: Cursor acts as a saturated gradient spotlight, revealing the high-contrast typography underneath using CSS mask-image and Framer Motion spring coordinates.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "flip-3-d-text": `Create a 3D Mechanical Flip Clock / Ticker Text animation in React:
- Visual Identity: Mechanical airport ticker board aesthetic.
- 3D Flip Physics: Text phrases split into character tiles; on transition, top and bottom tile halves rotate 180° along the horizontal X-axis (rotateX) with realistic bevel shadows and spring landing overshoot.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "typewriter-text": `Create a Typewriter Text component with an interactive blinking cursor in React:
- Visual Identity: Clean monospace typography on dark backdrop with warm white characters and an amber/cyan vertical blinking caret.
- Typing Logic: Types out phrases character-by-character with realistic randomized keystroke intervals (50ms-120ms), pauses at sentence completion, deletes with accelerated backspace, and cycles to next phrase.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "velocity-marquee-text": `Create an interactive Velocity Marquee Text component in React:
- Visual Identity: Large bold uppercase typography running continuously in an infinite horizontal track.
- Physics: Track scrolls at a baseline velocity (v = 2px/frame); user horizontal dragging or window scrolling increases velocity proportionally with momentum coasting and spring deceleration.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 4. TOGGLES (toggles)
  // ──────────────────────────────────────────────────────────────────────────
  "glass-orb-toggle": `Create an interactive Dark/Light Mode Toggle with an oversized 3D Crystal Glass Sphere in React:
- Pill Track: Sleek rounded capsule (248px x 78px) with inset shadow and subtle rim border.
  - Dark Mode: Deep charcoal surface (#18181B) with visible "Light" label on the right.
  - Light Mode: Soft graphite surface (#56565E) with visible "Dark" label on the left.
- 3D Glass Orb Thumb:
  - Oversized crystal sphere (104px diameter) extending beyond track boundaries.
  - Realistic multi-layered glass shader highlights: top-left specular reflection arc, bottom-right subsurface caustic glow, and backdrop blur refracting track labels as it slides.
  - Inside the sphere: morphs between a glowing white crescent moon (dark mode) and a radiant sun with 8 rounded beams (light mode) with spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "day-night-sky-toggle": `Create an illustrated Day/Night Sky Capsule Toggle component in React:
- Visual Identity: Wide glass pill containing a miniature illustrated sky scene.
- Transitions:
  - Night State: Deep navy sky with twinkling starfield, crescent moon, drifting clouds, and glowing orb on the right.
  - Day State: Morphs seamlessly to sky blue, orb glides left, moon rotates into a sun, stars fade out as tiny flying birds fade in.
  - Continuous 900ms spring-eased transition with zero hard cuts.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "landscape-orb-toggle": `Create a Circular Landscape Orb Theme Toggle in React:
- Visual Identity: 90px circular orb with a white ring border. Upper 60% shows flat sky fill, lower 40% shows two-layer wavy dune silhouette.
- Transitions: Dark mode shows indigo sky with crescent moon; light mode shows warm gold sky with glowing sun. Clicking smoothly cross-fades sky and dune colors over 400ms with scale-fade icon swap.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 5. CURSORS (cursors)
  // ──────────────────────────────────────────────────────────────────────────
  "splash-cursor": `Create a high-performance WebGL Fluid Splash Cursor in React:
- Simulation: Fullscreen WebGL fluid simulation with Navier-Stokes velocity advection, pressure Poisson solver, and vorticity confinement.
- Aesthetics: Mouse movement injects radiant lavender / violet fluid dyes with velocity-responsive bloom, realistic dissipation decay, and light/dark theme adaptability.
- Tech Stack: React, WebGL, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  "pill-trail-cursor": `Create a Custom Animated Cursor Trail of Biotech Pill Tags in React:
- Mechanics: Cursor leaves an overlapping ribbon trail of ~16 compact biotech pills ("biotech", "health", "science", "dna", "cells", "future") following an elastic inverse-kinematics spring chain.
- Constraints: Pills remain strictly 0° horizontal (never tilt), newer pills render above older pills, velocity expands/clusters spacing, executed at locked 60fps.
- Tech Stack: React, TypeScript, HTML5 Canvas / DOM, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "halftone-dot-cursor": `Create an interactive Halftone Dot Matrix Cursor in React:
- Mechanics: Canvas grid of halftone dots that dynamically scale up and bloom into an organic fluid wake following cursor trajectory with smooth exponential dissipation decay.
- Tech Stack: React, HTML5 Canvas 2D, Tailwind CSS, Lucide Icons.
- Dependencies: npm install lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 6. NAVBARS (navbars)
  // ──────────────────────────────────────────────────────────────────────────
  "hero-morph-navbar": `Create a Dual-State Morphing Hero Navbar component in React:
- Layout & Dynamics: Dual-state adaptive navbar that morphs between a full-bleed luxury hero header (unscrolled) and a compact floating frosted-glass capsule pill (scrolled).
- Mechanics: Framer Motion spring physics with layout animations. Features brand mark + wordmark, interactive navigation tabs with sliding active pill indicator (layoutId), search shortcut trigger, theme switch toggle, mobile responsive sheet menu with animated hamburger icon, and primary CTA button.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "pill-expand-navbar": `Create a Compact Expanding Icon Pill Navbar in React:
- Layout: Rounded-full dark container packed with 5 icon-only tabs (Home, Category, Cart, Save, Profile).
- Expand Interaction: Hovering or selecting any tab smoothly expands its width via spring physics to reveal the text label beside the icon while non-hovered tabs stay collapsed.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "pixel-dot-navbar": `Create a Minimalist Pixel-Dot Matrix Navbar component in React:
- Mechanics: Each nav link is preceded by a 7x7 pixel-matrix icon built from individual 1.5px dots (no SVG paths). Idle dots sit in light gray with subtle jitter; on hover/active, dots snap into a crisp aligned grid and darken with spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "dark-mode-mobile-navbar": `Create a Floating Dark/Light Mobile Toolbar in React:
- Layout: White rounded floating capsule with 5 icon buttons (Home, Profile, Theme, Chat, Brightness). The active item sits on a solid dark circle that glides between buttons using Framer Motion layoutId shared spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "fluid-wave-navbar": `Create an interactive Floating Pill Navbar with Liquid Scoop Notch in React:
- Visual Identity: White rounded capsule (350px) over a dark grey surface (#222227). 4 tabs (Home, Favorites, Messages, Files).
- Motion: Hovering over any tab springs the active icon upward (-5px, scale: 1.15) and glides a dark liquid scoop notch along the bottom edge beneath the active item via spring physics.
- Tech Stack: React, TypeScript, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "magnetic-pill-navbar": `Create a Magnetic Pill Navigation Bar in React:
- Mechanics: Floating glassmorphic navbar where hovering links smoothly slides a magnetic frosted pill indicator behind the active text using Framer Motion layoutId.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "circular-radial-navbar": `Create an Expanding Circular Radial Navigation Bar in React:
- Mechanics: Center floating trigger button; clicking/hovering fans out satellite navigation icon buttons in a radial 360° circle using spring physics and staggered delays.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "curtain-reveal-navbar": `Create an Luxury Editorial Curtain Reveal Navbar in React:
- Mechanics: Header nav where clicking menu triggers a majestic full-height silk backdrop curtain drop with staggered typography link entrances.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "jelly-scoop-navbar": `Create an Elastic Jelly Scoop Navbar in React:
- Mechanics: Navigation bar with a playful stretchable jelly active indicator that squashes and stretches dynamically during tab transitions using Framer Motion spring morphing.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "liquid-underline-navbar": `Create a Liquid Drawing Underline Navbar in React:
- Mechanics: Minimalist navbar where hovering links dynamically animates an SVG liquid line drawing across the bottom border to underline the active link.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "morphing-tab-navbar": `Create a Morphing Glassmorphic Tab Navbar in React:
- Mechanics: Floating glass navbar where the active background pill seamlessly stretches, morphs, and snaps between tabs of varying widths using Framer Motion layoutId.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "orbiting-planets-navbar": `Create an Orbiting Planets Navigation Menu in React:
- Mechanics: Avant-garde nav where icon nodes orbit around a central sun in idle state and snap smoothly into a horizontal linear toolbar on hover.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 7. SEARCH BARS (search-bars)
  // ──────────────────────────────────────────────────────────────────────────
  "morph-search-capsule": `Create an interactive Morphing Icon Search Capsule in React:
- Mechanics: Rounded pill search bar where clicking triggers an SVG icon morph: the magnifying glass ring scales down and its handle rotates and straightens into a vertical blinking text cursor line '|'. Text input auto-focuses for immediate typing.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "animated-search-demo": `Create an Expandable Search Capsule in React:
- Mechanics: Idle circular capsule (64px) with centered search icon; hovering smoothly expands via spring physics into a 420px wide search bar with placeholder and "⌘K" keyboard shortcut badge.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 8. SIDEBARS (sidebars)
  // ──────────────────────────────────────────────────────────────────────────
  "kinetic-lens-sidebar": `Create a vertical Kinetic Lens Rolodex Sidebar Menu in React:
- Visual Identity: Pitch-black canvas (#000000) with vector typography service items.
- Mechanics: Active center item is pure white (#FFFFFF), larger scale, semibold, with preceding horizontal dash " -  ". Peripheral items are deep indigo (#282D52) fading toward edges. Continuous mouse wheel scrubbing with inertia, touch drag, and snap physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "flightpath-toc": `Create a Supersonic Airplane Flightpath TOC Navigation in React:
- Visual Identity: Light-mode Rewamp UI Milk/Cream tokens (#FFFDF2, #FAF6ED, #E8E2D5) with hierarchical tree navigation.
- Mechanics: Continuous curved SVG rail connecting each item node with smooth cubic bezier S-curves. An animated supersonic airplane traveler physically glides along the rail with spring physics (stiffness: 360, damping: 26) pointing toward the active label.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "sidebar": `Create a full-featured Expandable SaaS Application Sidebar in React:
- Visual Identity: Refined dark/light surface with collapsible hierarchical navigation sections, search filter, active item indicator pill, and compact user profile footer.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "flower-sidebar": `Create a vertical Flower Flightpath Rail Sidebar in React:
- Visual Identity: Curved SVG flightpath rail with a blooming 6-petal lilac flower indicator icon gliding smoothly along the rail using Framer Motion springs. Active trace line draws filled progress up to the active flower node.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 9. CARDS (cards)
  // ──────────────────────────────────────────────────────────────────────────
  "diagonal-card-stack": `Create a Continuous Diagonal Card Stream & Stacked Deck component in React:
- Visual Identity: Deep obsidian matte rounded cards arranged in a cascading diagonal staircase gliding in an infinite seamless marquee.
- Mechanics: Pointer dragging along the diagonal axis, pause-on-hover, and a smooth spring-physics collapse into a 3D isometric stacked card deck in the center.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "perspective-flip-deck": `Create a 3D Perspective Card Deck with Peeling Flip Transitions in React:
- Visual Identity: Wide dark obsidian cards fanned along a 3D perspective plane. Front card flips open to the right in 3D around a vertical hinge as subsequent cards smoothly shift forward with spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "orbital-card-arch": `Create a 3D Curved Orbital Card Arch with Deck Collapse in React:
- Visual Identity: Three square matte obsidian cards arranged in an orbital arc with left and right cards tilted. Clicking smoothly collapses all three cards into a single stacked deck in the center with spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "editorial-3-d-orbit-carousel": `Create a 3D Tilted Elliptical Carousel of Editorial Poster Cards in React:
- Visual Identity: Six distinct artistic poster cards revolving smoothly in a 3D orbit with depth scaling, bank angles, draggable rotation, and click-to-center spring physics.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "arch-card-carousel": `Create an animated Curved Arch Card Carousel with Pendulum Gliding in React:
- Visual Identity: Borderless rounded portrait cards riding along a circular convex wheel trajectory with continuous harmonic pendulum oscillation and inertia scrubbing.
- Tech Stack: React, TypeScript, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "folder-tab-card": `Create a tactile Folder-Tab Card with Living Aurora Mesh Gradient in React:
- Visual Identity: Asymmetrical folder-tab cutout sheet, living aurora mesh gradient in brand lavender palette, frosted glass action button, category heading "Designs", and metrics row ("04 Tags", "1012 Shots").
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "matte-folder-card": `Create a tactile Matte Folder Card with Living Aurora Mesh Gradient in React:
- Visual Identity: Inverted-fillet folder tab geometry on dark matte obsidian surface with continuous animated aurora mesh gradient drifting beneath.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  // ──────────────────────────────────────────────────────────────────────────
  // 10. UI FOR AI (ai-ui)
  // ──────────────────────────────────────────────────────────────────────────
  "marbled-fluid-orb": `Create an Iridescent Marbled Fluid Silk Orb AI Thinking Indicator in React:
- Visual Identity: Clean white floating AI pill capsule (bg-white, border border-black/10, shadow-lg).
- Left: Interactive 3D WebGL sphere featuring a swirling iridescent silk fluid core (coral crimson #FF2E55, rose pink #FF7599, warm apricot #FFB38F, lilac violet #BD5CF0) with domain-warped 3D simplex noise and subsurface scattering.
- Right: Shimmery reasoning text cycling: "thinking..." -> "weaving thoughts..." -> "connecting sparks..." -> "almost there..." -> "crafting magic..." -> "all set for you".
- Tech Stack: React, Three.js (WebGL), GLSL Shaders, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three framer-motion lucide-react clsx tailwind-merge`,

  "particle-dot-orb": `Create a 3D Fibonacci Particle Dot Orb AI Thinking Capsule in React:
- Visual Identity: Pure white floating pill capsule (bg-white, border border-black/10, soft shadow).
- Left: 3D rotating Fibonacci particle sphere rendered with Three.js (crisp charcoal dots with depth scaling).
- Right: Shimmery text with animated light sweep cycling: "thinking..." -> "connecting dots..." -> "cooking up ideas..." -> "hold tight..." -> "let me cook..." -> "done bestie".
- Tech Stack: React, Three.js (WebGL), Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three framer-motion lucide-react clsx tailwind-merge`,

  "fluid-morph-orb": `Create a 3D Fluid Morph Orb AI Thinking Capsule in React:
- Visual Identity: Floating dark matte pill capsule (bg-[#1E1E23], border border-white/12, shadow-2xl).
- Left: Real-time 3D fluid morphing mesh orb displaced with harmonic 3D noise shaders.
- Right: Smooth cycling reasoning status text with blur-fade transitions: "pondering..." -> "manifesting vibes..." -> "brewing thoughts..." -> "hold up a sec..." -> "crafting magic..." -> "all set for you".
- Tech Stack: React, Three.js (WebGL), GLSL Shaders, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three framer-motion lucide-react clsx tailwind-merge`,

  "wireframe-ring-orb": `Create a 3D Wireframe Contour Ring Orb AI Reasoning Capsule in React:
- Visual Identity: Floating dark capsule (bg-[#1C1C21], border border-white/12, shadow-2xl).
- Left: Real-time 3D wireframe orb composed of concentric latitude contour rings slicing through a sphere at a 32° tilt with harmonic wave breathing.
- Right: Reasoning status text smoothly cycling: "analyzing..." -> "mapping contours..." -> "simulating..." -> "hold on tight..." -> "piecing it together..." -> "nailed it".
- Tech Stack: React, Three.js (WebGL), Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three framer-motion lucide-react clsx tailwind-merge`,

  "particle-morph-orb": `Create a 3D Particle Morph Mesh Orb AI Reasoning Capsule in React:
- Visual Identity: Deep obsidian dark matte capsule (bg-[#18181B], border border-white/12, shadow-2xl).
- Left: Real-time 3D particle mesh orb rendered with Three.js (thousands of luminous points displaced with 3D simplex noise harmonics and glowing fold edges).
- Right: Shimmery text cycling through reasoning phrases: "deep thinking..." -> "manifesting..." -> "cooking in the dark..." -> "hold up wait..." -> "let him cook..." -> "done bestie".
- Tech Stack: React, Three.js (WebGL), GLSL Shaders, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install three framer-motion lucide-react clsx tailwind-merge`,

  // Additional registered components
  "apple-navbar": `Create an authentic MacBook Dynamic Notch Navbar in React:
- Resting AI State: Black notch hanging from top screen bezel with live assistant action status and glowing orange breathing indicator pill (Rewamp UI brand #EC5E27).
- Expansion: Hover fluidly expands into macOS NotchNook navbar with calendar strip, Spotify media widget, navigation links, and action buttons using spring physics (stiffness: 360, damping: 28).
- Tech Stack: React, TypeScript, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "ai-product-bento": `Create a Dark Themed AI Product Bento Grid component in React:
- Visual Identity: Deep obsidian bento grid with animated SVG neural network graph, soft violet accents, interconnected pulsing nodes, typewriter prompt engine tile, and latency progress stats.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "data-viz-bento": `Create a Dark Analytics Dashboard Bento Grid in React:
- Visual Identity: Dark analytics dashboard bento grid with animated SVG sparkline drawing, animated donut chart, spring-up bar charts, and eased number counters.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,

  "gooey-metaball-ring": `Create an organic Gooey Metaball Ring component in React:
- Visual Identity: Organic liquid metaball droplets orbiting an elliptical ring path matching Recording 2026-09-20 182252.mp4.
- Fluid Fusion: As droplets approach each other along the ring, they form liquid bridges, fuse into larger fluid masses, and stretch and snap apart dynamically with surface tension.
- SVG Filter: Uses high-threshold feGaussianBlur + feColorMatrix for seamless fluid fusion.
- Interactive Mechanics: Real-time mouse gravity repulsion and harmonic speed modulations.
- Tech Stack: React, SVG Filters, Tailwind CSS, Framer Motion.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`,
};

export function getPromptForSlug(slug, title) {
  if (componentPrompts[slug]) return componentPrompts[slug];
  
  // Try matching without prefixes/suffixes
  const cleanSlug = slug.replace(/-(showcase|source|demo|background)$/, '');
  if (componentPrompts[cleanSlug]) return componentPrompts[cleanSlug];

  for (const [k, v] of Object.entries(componentPrompts)) {
    if (k.startsWith(cleanSlug) || cleanSlug.startsWith(k)) return v;
  }
  
  const componentName = (title || slug).replace(/\s+/g, '');
  return `Create a high-performance interactive \${title || slug} component in React:
- Visual Identity: Clean modern aesthetic matching Rewamp UI design tokens (Primary: #EC5E27, Milk: #FFFDF2, Sand: #F1E6D7, Charcoal: #1F1F1F).
- Interactive Mechanics: Smooth spring physics transitions (stiffness: 340, damping: 26), responsive hover & active states, and dark/light mode support.
- Component API: Supports customizable props (className, children, onChange) with zero layout shift.
- Tech Stack: React, Framer Motion, Tailwind CSS, Lucide Icons.
- Dependencies: npm install framer-motion lucide-react clsx tailwind-merge`;
}
