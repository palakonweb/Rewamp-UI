export const waterCausticsPrompt = `A full-bleed WebGL/three.js animated background called WaterCaustics, matching sunlit swimming pool footage (Recording 2026-09-14 153504.mp4): authentic refracted turquoise and aquamarine pool water with shimmering caustic light filaments, perspective depth compression, light conservation shadow penumbras, and dancing surface sun glints. Built as a five-pass fullscreen-quad pipeline rendered to manual WebGLRenderTargets (no scene geometry, no camera movement, no EffectComposer). Pass 1 renders the water caustics into a half-float RGBA target so caustic peaks exceed 1.0 without clipping: the caustic pattern uses multi-octave sine-feedback light convergence, perspective mapping (compressed cells near top, broader loops in foreground), and ripple displacement. Pass 2 extracts over-bright peaks above a threshold at half resolution. Passes 3-4 run a separable 5-tap Gaussian blur (horizontal then vertical) over the bright buffer. Pass 5 composites the sharp water base with the blurred bloom (with a subtle per-channel chromatic fringe radiating from center on the bloom sample only) and applies filmic exposure tonemapping (1 - exp(-color * exposure)) so highlights roll off softly with authentic sunlit pool radiance. Exposed props: deepColor, midColor, lineColor, edgeColor, speed, scale, refract, ripple, threshold, bloomStrength, exposure.`;

export const waterCausticsUsage = `import WaterCaustics from './backgrounds/WaterCaustics';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <WaterCaustics
    deepColor="#125465"
    midColor="#226E80"
    lineColor="#66D6EB"
    edgeColor="#FFFFFF"
    speed={0.35}
    scale={1.0}
    bloomStrength={0.50}
    threshold={0.75}
    exposure={1.05}
  />
</div>`;
