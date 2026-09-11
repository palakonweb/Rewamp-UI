export const pixelCloudPrompt = `A full-bleed, locked WebGL/three.js animated background called PixelCloud, matching a retro pixel-art sky: a flat sky-blue base with chunky, blocky drifting clouds rendered in exactly three flat posterized colors (sky, shadow underside, lit highlight) — never gradients or anti-aliased edges. Rendered on a single full-screen quad via a custom ShaderMaterial (no scene geometry, no camera movement). The core trick is snapping screen coordinates to a chunky pixel grid (floor(uv / pixelSize) * pixelSize) BEFORE any noise sampling, so every step downstream — the cloud shapes, their edges — stays blocky and stair-stepped instead of smooth. Cloud shapes come from two layers of 5-octave value-noise FBM sampled at different scales and drifting sideways at different speeds (one faster/smaller-scale, one slower/larger-scale), combined with a max() so denser foreground puffs and sparser background puffs coexist without needing hand-placed sprites. The combined noise field is posterized with hard if-threshold comparisons (not smoothstep) into exactly three flat bands: sky color below the first threshold, a shadow-blue band for the cloud underside above it, and a bright highlight band for the cloud body above the second threshold — giving the flat, sharp-edged look of hand-drawn pixel clouds rather than a soft rendered blob. A small per-pixel grain term (hashed noise added at low opacity, re-randomized every frame via uTime) is mixed into the final color to fake a light paper-grain texture. Drift is slow and strictly horizontal — clouds never rise or fall, only scroll sideways — for a lazy, ambient sky-motion feel rather than a scrolling background. Exposed props: skyColor, cloudShadowColor, cloudHighlightColor, speed (drift speed, kept slow), pixelSize (size in screen px of one pixel-art "block" — larger reads chunkier/more retro), grain (per-pixel grain intensity). The React component wraps this in a resizable, IntersectionObserver-gated canvas (pauses rendering when scrolled out of view, debounced resize handling, capped devicePixelRatio, disposes the renderer/geometry/material on unmount, and sets image-rendering: pixelated as a CSS backstop) with className/style passthrough so it composites as a background layer.`;

export const pixelCloudUsage = `import PixelCloud from './PixelCloud';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelCloud
    skyColor="#4FADF5"
    cloudShadowColor="#95D2EF"
    cloudHighlightColor="#F5F5F5"
    speed={0.03}
    pixelSize={6}
    grain={0.04}
  />
</div>`;
