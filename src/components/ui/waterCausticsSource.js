export const waterCausticsPrompt = `A full-bleed, locked top-down WebGL/three.js animated background called WaterCaustics, matching sunlit pool footage: sunlight-through-water caustic nets over a deep-blue base, with a true HDR bloom on the brightest peaks. Built as a five-pass fullscreen-quad pipeline rendered to manual WebGLRenderTargets (no scene geometry, no camera movement, no EffectComposer). Pass 1 renders the water itself into a half-float RGBA target so caustic peaks can exceed 1.0 without clipping: the caustic pattern uses the classic sine-feedback trick — UVs are tiled into a repeating cell offset by a large -250.0 constant (load-bearing, sets the ratio against the per-octave intensity term), then a point is iteratively perturbed through 5 octaves of sin/cos feedback, and the accumulated intensity is inverted and gamma-sharpened (pow 8) into thin, cracked-glass bright lines. Three of these layers are sampled at different scale/speed/intensity (fine fast net, a counter-flowing medium net, and a large slow layer for bigger sunlit patches) and blended so the net drifts and never repeats. The base water color is a directional gradient between a deep and mid color plus a slow 4-octave value-noise FBM "breathe" and a fine high-frequency ripple noise. Caustic intensity mixes through a line color into an edge color and finally toward pure white at the brightest peaks, with unclamped HDR punch added on top of the very highest peaks so they can bloom. Pass 2 extracts everything above a brightness threshold at half resolution. Passes 3-4 run a separable 5-tap Gaussian blur (horizontal then vertical) over that bright buffer. Pass 5 composites the sharp base with the blurred bloom (with a tiny per-channel chromatic fringe radiating from center on the bloom sample only) and applies a filmic exposure tonemap (1 - exp(-color * exposure)) so highlights roll off softly instead of clipping to a flat white disc. Exposed props: deepColor, midColor, lineColor, edgeColor, speed, scale (caustic cell density), refract (per-layer feedback intensity), ripple (fine surface noise amount), threshold (bloom extraction cutoff), bloomStrength, exposure. The React component wraps this in a resizable, IntersectionObserver-gated canvas (pauses rendering when scrolled out of view, debounced resize handling that rebuilds all render targets at the container's actual size and capped devicePixelRatio, disposes the renderer/targets/geometries/materials on unmount) with className/style passthrough so it composites as a background layer and always fills its container.`;

export const waterCausticsUsage = `import WaterCaustics from './WaterCaustics';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <WaterCaustics
    deepColor="#0A6FA8"
    midColor="#189CEA"
    lineColor="#49C6FE"
    edgeColor="#FFFFFF"
    speed={0.35}
    scale={1.0}
    refract={0.005}
    ripple={0.025}
    bloomStrength={0.8}
    threshold={0.7}
    exposure={1.15}
  />
</div>`;
