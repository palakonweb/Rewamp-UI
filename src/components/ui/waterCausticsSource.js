export const waterCausticsPrompt = `A full-bleed, locked top-down WebGL/three.js animated background called WaterCaustics, matching sunlit pool/sea footage: sunlight-through-water caustic nets over a deep teal-blue base, with occasional blown-out sun-glint clusters. Rendered on a single full-screen quad via a custom ShaderMaterial (no scene geometry, no camera movement). The caustic pattern uses the classic sine-feedback trick — UVs are folded into a repeating cell, then a point is iteratively perturbed through 5 octaves of sin/cos feedback (each octave time-scaled), and the accumulated intensity is inverted and gamma-sharpened (pow 8) into thin, cracked-glass-like bright lines rather than soft blobs. Two of these layers are sampled at different scale/rotation/time-direction (one rotated ~45° via a mat2, running at a negative time multiplier relative to the other) and blended so the net drifts and never repeats or looks like one flat static grid. The underlying water color is not a flat gradient: a 4-octave value-noise FBM, slowly scrolled by time, mixes between a deep and mid water color so the base itself breathes. Caustic intensity is mapped through the line color into an edge color and finally to pure white at the very brightest peaks (mix chain, never raw addition past 1.0). A separate, sparser "sun glint" layer places small jittered blob highlights on a coarse grid, each cell's visibility driven by its own slow value-noise timer thresholded through smoothstep so glints fade in and out on independent ~2-3s cycles rather than all flickering together — sharpened tight with an extra pow so they read as small blown-out highlights, not big caustic shapes. A soft radial vignette darkens the corners, and a mild color-grade pass (slight teal/green push plus a gentle S-curve contrast via smoothstep-mix) closes the gap between raw shader math and photographed water. Optional UnrealBloomPass post-processing (via three.js EffectComposer/RenderPass) blooms only the brightest glints and caustic peaks. Exposed props: deepColor, midColor, lineColor, edgeColor, speed (kept moderate — slow drifting motion, not choppy), scale (caustic cell density), intensity (caustic brightness), bloom (toggle post-processing). The React component wraps this in a resizable, IntersectionObserver-gated canvas (pauses rendering when scrolled out of view, debounced resize handling with composer resize, capped devicePixelRatio, disposes the renderer/composer/geometry/material on unmount) with className/style passthrough so it composites as a background layer.`;

export const waterCausticsUsage = `import WaterCaustics from './WaterCaustics';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <WaterCaustics
    deepColor="#0F4061"
    midColor="#4F85A4"
    lineColor="#69A9C2"
    edgeColor="#AAE3F3"
    speed={0.35}
    scale={3.4}
    intensity={1.0}
    bloom
  />
</div>`;
