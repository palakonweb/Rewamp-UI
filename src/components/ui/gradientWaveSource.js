export const gradientWavePrompt = `A full-bleed WebGL/three.js animated background called GradientWaveBackground, matching luminous chromatic silk fluid ribbon waves: undulating S-curved liquid waves over a deep midnight navy base with electric fuchsia, neon rose, and royal violet silk ribbons, anchored by an intense luminous white caustic light beam with HDR bloom. Built as a five-pass fullscreen-quad pipeline rendered to manual WebGLRenderTargets (no scene geometry, no camera movement, no EffectComposer). Pass 1 renders the fluid wave ribbons into a half-float RGBA target so peaks exceed 1.0 without clipping. Pass 2 extracts over-bright peaks above a threshold at half resolution. Passes 3-4 run a separable 5-tap Gaussian blur (horizontal then vertical) over the bright buffer. Pass 5 composites the sharp fluid base with the blurred bloom (with a subtle per-channel chromatic fringe radiating from center on the bloom sample only) and applies filmic exposure tonemapping (1 - exp(-color * exposure)) so highlights roll off softly with an ethereal glow.`;

export const gradientWaveCode = `import GradientWaveBackground from './backgrounds/GradientWaveBackground';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <GradientWaveBackground
    deepColor="#070818"
    midColor="#15143A"
    lineColor="#E11D74"
    edgeColor="#7C3AED"
    speed={0.40}
    scale={1.0}
    refract={0.045}
    ripple={0.015}
    bloomStrength={0.9}
    threshold={0.65}
    exposure={1.2}
  />
</div>`;
