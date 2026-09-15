export const pixelSnowPrompt = `A full-bleed WebGL/three.js animated background called PixelSnow: a ray-marched, pixelated snowfall shader rendered on a single full-screen orthographic quad via a custom ShaderMaterial (no scene geometry, no lighting). A fragment shader ray-marches through a 3D voxel grid where each occupied cell (chosen by a hashed per-cell density threshold) contains one snowflake billboard, animated to drift and wobble using layered sine functions seeded by the cell's hash, then advected over time along a camera position offset by a configurable wind "direction" angle and "speed". Each flake is rendered as a signed-distance shape in one of three variants: a flat-topped square (max of abs UV components), a round dot (UV length), or a faceted hex-branched snowflake distance function (angular-folded SDF with two branch segments). Flake screen size scales with camera depth via a "minFlakeSize" floor so distant flakes don't vanish, and brightness/opacity fall off exponentially with ray-march distance ("depthFade"), gamma-corrected and multiplied by a "brightness" uniform, tinted by a single "color" uniform. Before ray-marching, screen coordinates are snapped to a coarse pixel grid sized by "pixelResolution" so the whole effect renders in big chunky retro pixels rather than smooth antialiased dots. Marching runs up to 128 steps per pixel with an early break at "farPlane" distance, using DDA-style grid stepping (precomputed stride/phase per axis) for efficiency. The React component wraps this in a resizable, IntersectionObserver-gated canvas (pauses rendering when scrolled out of view, debounced resize handling, capped devicePixelRatio, disposes the renderer/geometry/material on unmount) and exposes every shader knob as a prop: color, flakeSize, minFlakeSize, pixelResolution, speed, depthFade, farPlane, brightness, gamma, density, variant ('square' | 'round' | 'snowflake'), direction (wind angle in degrees), plus className/style passthrough. Transparent background (alpha:true, no clear color) so it composites over existing page content as an overlay layer.`;

export const pixelSnowUsage = `import PixelSnow from './PixelSnow';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <PixelSnow
    color="#ffffff"
    flakeSize={0.01}
    minFlakeSize={1.25}
    pixelResolution={200}
    speed={1.25}
    density={0.3}
    direction={125}
    brightness={1}
  />
</div>`;
