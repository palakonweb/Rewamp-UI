export const layeredPaperWavesPrompt = `A full-bleed WebGL/three.js animated background called LayeredPaperWaves, matching the pastel topographic paper cutout footage (Recording 2026-09-14 154048.mp4): seven physical papercraft wave strata stacked with depth, casting soft realistic drop shadows onto lower layers with crisp cut paper bevel highlights. The undulating wave sheets ripple smoothly across the diagonal axis, displaying a chromatic pastel gradient from top powder blue through lilac and periwinkle to blush rose and deep mauve. Built as a single-pass fullscreen quad shader with back-to-front composite layering, smoothstep drop shadow penumbras, and subtle fine-art paper grain. Exposed props: speed, scale, amplitude.`;

export const layeredPaperWavesCode = `import LayeredPaperWaves from './backgrounds/LayeredPaperWaves';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <LayeredPaperWaves
    speed={0.40}
    scale={1.0}
    amplitude={1.0}
  />
</div>`;
