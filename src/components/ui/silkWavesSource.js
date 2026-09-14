export const silkWavesPrompt = `A full-bleed WebGL/three.js animated background called SilkWaves, matching the iridescent flowing satin folds footage (Recording 2026-09-14 152443.mp4): voluptuous, liquid silk drapes sweeping diagonally across the canvas with deep electric-violet shadows, lustrous silver-lavender specular crests along the fold ridges, and an ambient cool teal glow in the lower-left corner. Built as a single-pass fullscreen quad shader with numerical surface normal calculation for satin anisotropic highlights and Fresnel grazing sheen. Exposed props: speed, scale, intensity, shadowColor, violetColor, highlightColor, ambientColor.`;

export const silkWavesCode = `import SilkWaves from './backgrounds/SilkWaves';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <SilkWaves
    speed={0.45}
    scale={1.0}
    intensity={1.0}
    shadowColor="#080314"
    violetColor="#461CEB"
    highlightColor="#B2CEF5"
    ambientColor="#2F6A82"
  />
</div>`;
