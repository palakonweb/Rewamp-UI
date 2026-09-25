// Structured, human-facing documentation for the Description drawer: a real
// description, how a viewer interacts with it, and its props (most of these
// registry entries install the showcase file itself as a fixed, self-contained
// demo with no configurable props - `props: []` reflects that honestly rather
// than inventing options that don't exist).
//
// Filled in batches as each component is reviewed; components not yet listed
// here fall back to the older auto-generated prompt text in the drawer.
export const componentDocs = {
  'liquid-cursor-gradient': {
    description: 'A full-bleed hero background of huge, heavily blurred color orbs. One orb follows the cursor with spring physics while two others drift on their own slow loop, giving a soft, premium SaaS-style glow.',
    interaction: 'Move the cursor anywhere over the panel and the tracking orb eases toward it. No click targets - it is a passive background.',
    props: [],
  },
  'ascii-matrix-hover': {
    description: 'A grid of monospace characters that sits dim until the cursor gets close, then randomizes into bright, glowing glyphs inside a soft circular mask that follows the pointer.',
    interaction: 'Move the cursor over the grid to scramble nearby characters and light them up in lilac; moving away lets that patch fade back to its dim base state.',
    props: [],
  },
  'elastic-line-grid': {
    description: 'A canvas grid of straight lines whose intersection points behave like a mesh of springs, physically stretching and snapping back as the cursor drags through them.',
    interaction: 'Move the cursor through the grid to displace nearby points based on your movement speed; release focus and the grid eases back to its resting shape.',
    props: [],
  },
  'spotlight-grid': {
    description: 'A near-black grid of faint lines that stays almost invisible until a soft radial spotlight, centered on the cursor, reveals a brighter version of the grid underneath.',
    interaction: 'Move the cursor over the panel to sweep the spotlight across the grid; the reveal fades out entirely once the cursor leaves the panel.',
    props: [],
  },
  'ripple-grid': {
    description: 'A dense field of small dots rendered on canvas that scale up in a rippling wave as the cursor passes through them, like disturbing the surface of water.',
    interaction: 'Move the cursor across the panel; dots near the pointer path swell and settle back down shortly after, creating a trailing ripple effect.',
    props: [],
  },
  'soft-aurora': {
    description: 'A WebGL fragment-shader background of slow, translucent aurora-like ribbons blending across a dark canvas for an ambient, luxury feel.',
    interaction: 'Fully ambient - the aurora animates continuously with no cursor or click interaction.',
    props: [],
  },
  'plexus-engine': {
    description: 'A field of small particles drifting freely on canvas, with thin lines drawn between any two particles that come within a set distance of each other, forming a shifting constellation network.',
    interaction: 'Ambient by default; particles bounce off the panel edges on their own. No pointer interaction is required to see the effect.',
    props: [],
  },
  'particle-wave': {
    description: 'Thousands of small glowing points arranged in a grid and displaced vertically by a rolling sine function, rendered on canvas to look like an oscillating, ocean-like data surface.',
    interaction: 'Fully ambient - the wave animates continuously on its own with no cursor interaction.',
    props: [],
  },
  'hyperspeed-warp': {
    description: 'A canvas starfield where thousands of points accelerate outward from the center toward the viewer, streaking into motion-blurred lines for a hyperspace-jump effect.',
    interaction: 'Fully ambient - stars continuously spawn near the center and fly outward with no cursor or click interaction.',
    props: [],
  },
  'sine-ribbons': {
    description: 'Overlapping translucent ribbons rendered on canvas, each following its own sine wave and color, blended together into a soft multi-layer gradient.',
    interaction: 'Move the cursor across the panel to nudge the wave motion; ribbons keep animating on their own even without pointer input.',
    props: [],
  },
  'ambient-glow-orbs': {
    description: 'A handful of huge, heavily blurred color orbs that drift and slowly overlap each other, giving a soft ambient SaaS-style glow with no hard edges.',
    interaction: 'Fully ambient - the orbs drift on a continuous loop with no cursor or click interaction.',
    props: [],
  },
  'refracted-beams': {
    description: 'Brand-lilac meteor streaks that fall across a dark canvas, each a bright head trailing a tapered, fading luminous tail.',
    interaction: 'Fully ambient - beams spawn and fall on their own timer with no cursor or click interaction.',
    props: [],
  },
  'cosmic-dust': {
    description: 'A field of tiny, dim particles drifting extremely slowly across a dark canvas, scattering light for a minimal ambient dust effect.',
    interaction: 'Fully ambient - particles drift continuously with no cursor or click interaction.',
    props: [],
  },
  'pixel-snow-background': {
    description: 'A canvas snowfall simulation where flakes drift downward with wind and can be stirred by the cursor like a realistic air draft.',
    interaction: 'Move the cursor through the falling snow to stir nearby flakes off their path; they settle back into the wind drift shortly after.',
    props: [
      { name: 'color', type: 'string', description: 'CSS color used for every snowflake.' },
      { name: 'density', type: 'number', description: 'Roughly how many flakes are on screen at once.' },
      { name: 'speed', type: 'number', description: 'Base fall speed multiplier.' },
      { name: 'wind', type: 'number', description: 'Strength of the constant horizontal drift applied to flakes.' },
      { name: 'interactive', type: 'boolean', description: 'Whether moving the cursor stirs nearby flakes.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
    ],
  },
  'water-caustics-background': {
    description: 'A WebGL shader background simulating the rippling light patterns seen on a pool floor, with a soft bloom pass over the brightest highlights.',
    interaction: 'Fully ambient - the caustic ripple animates continuously with no cursor or click interaction.',
    props: [
      { name: 'deepColor', type: 'string', description: 'Color of the deepest, darkest water areas.' },
      { name: 'midColor', type: 'string', description: 'Mid-tone water color between the deep and highlight areas.' },
      { name: 'lineColor', type: 'string', description: 'Color of the bright caustic ripple lines.' },
      { name: 'edgeColor', type: 'string', description: 'Color used at the sharpest edges of the ripple highlights.' },
      { name: 'speed', type: 'number', description: 'Playback speed of the ripple animation.' },
      { name: 'scale', type: 'number', description: 'Zoom level of the caustic pattern.' },
      { name: 'refract', type: 'number', description: 'Strength of the light-refraction distortion.' },
      { name: 'ripple', type: 'number', description: 'Amplitude of the surface ripple displacement.' },
      { name: 'bloomStrength', type: 'number', description: 'Intensity of the glow applied to bright highlights.' },
      { name: 'threshold', type: 'number', description: 'Brightness level above which the bloom pass kicks in.' },
      { name: 'exposure', type: 'number', description: 'Overall tonemapping exposure of the final image.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'gradient-wave-background': {
    description: 'A WebGL shader background of flowing gradient waves with a bloom pass, built on the same rendering pipeline as Water Caustics but tuned to a bolder, more saturated palette.',
    interaction: 'Fully ambient - the wave animates continuously with no cursor or click interaction.',
    props: [
      { name: 'deepColor', type: 'string', description: 'Color of the darkest base areas.' },
      { name: 'midColor', type: 'string', description: 'Mid-tone color between the base and highlight areas.' },
      { name: 'lineColor', type: 'string', description: 'Color of the bright wave ridge lines.' },
      { name: 'edgeColor', type: 'string', description: 'Color used at the sharpest highlight edges.' },
      { name: 'speed', type: 'number', description: 'Playback speed of the wave animation.' },
      { name: 'scale', type: 'number', description: 'Zoom level of the wave pattern.' },
      { name: 'refract', type: 'number', description: 'Strength of the light-refraction distortion.' },
      { name: 'ripple', type: 'number', description: 'Amplitude of the surface ripple displacement.' },
      { name: 'bloomStrength', type: 'number', description: 'Intensity of the glow applied to bright highlights.' },
      { name: 'threshold', type: 'number', description: 'Brightness level above which the bloom pass kicks in.' },
      { name: 'exposure', type: 'number', description: 'Overall tonemapping exposure of the final image.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'pixel-cloud-background': {
    description: 'A stylized low-poly sky of drifting pixel clouds over a vertical sky-color gradient, rendered with a chunky pixelated look.',
    interaction: 'Fully ambient - clouds drift across the sky on a loop with no cursor or click interaction.',
    props: [
      { name: 'cloudColor', type: 'string', description: 'Fill color used for every cloud.' },
      { name: 'skyTopColor', type: 'string', description: 'Sky gradient color at the top of the frame.' },
      { name: 'skyBottomColor', type: 'string', description: 'Sky gradient color at the bottom of the frame.' },
      { name: 'speed', type: 'number', description: 'Drift speed of the clouds.' },
      { name: 'count', type: 'number', description: 'Number of clouds rendered at once.' },
      { name: 'pixelSize', type: 'number', description: 'Size of each pixel block, controlling how chunky the render looks.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'silk-waves-background': {
    description: 'A WebGL shader background of voluptuous, folded silk drapery with anisotropic satin highlights and a soft ambient glow, lit like studio fabric photography.',
    interaction: 'Fully ambient - the fold animation runs continuously with no cursor or click interaction.',
    props: [
      { name: 'speed', type: 'number', description: 'Playback speed of the fold animation.' },
      { name: 'scale', type: 'number', description: 'Zoom level of the fold pattern.' },
      { name: 'intensity', type: 'number', description: 'Overall brightness/contrast of the final tonemap.' },
      { name: 'shadowColor', type: 'string', description: 'Color of the deepest fold shadows.' },
      { name: 'violetColor', type: 'string', description: 'Primary mid-tone fold color.' },
      { name: 'highlightColor', type: 'string', description: 'Color of the satin specular highlights.' },
      { name: 'ambientColor', type: 'string', description: 'Color of the ambient wash in the lower corner.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'singularity-flare-background': {
    description: 'A WebGL shader background of a glowing accretion-disk-like flare with flowing plasma streaks and sparkle particles, pinched toward a bright core.',
    interaction: 'Fully ambient - the flare animates continuously with no cursor or click interaction.',
    props: [
      { name: 'speed', type: 'number', description: 'Playback speed of the flare animation.' },
      { name: 'pinchX', type: 'number', description: 'Horizontal position (0-1) where the flare pinches toward its core.' },
      { name: 'flareHeight', type: 'number', description: 'Vertical extent of the flare shape.' },
      { name: 'flowIntensity', type: 'number', description: 'Strength of the flowing plasma distortion.' },
      { name: 'sparkleIntensity', type: 'number', description: 'Density/brightness of the sparkle particles.' },
      { name: 'colorBg', type: 'string', description: 'Background color behind the flare.' },
      { name: 'colorCore', type: 'string', description: 'Color of the brightest core.' },
      { name: 'colorCyan', type: 'string', description: 'One of the flare\'s gradient accent colors.' },
      { name: 'colorBlue', type: 'string', description: 'One of the flare\'s gradient accent colors.' },
      { name: 'colorViolet', type: 'string', description: 'One of the flare\'s gradient accent colors.' },
      { name: 'colorMagenta', type: 'string', description: 'One of the flare\'s gradient accent colors.' },
      { name: 'colorBeam', type: 'string', description: 'Color of the streaking plasma beams.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'layered-paper-waves-background': {
    description: 'A WebGL shader background of soft, layered wave shapes with a paper-like matte shading, gently rolling in overlapping bands.',
    interaction: 'Fully ambient - the wave animation runs continuously with no cursor or click interaction.',
    props: [
      { name: 'speed', type: 'number', description: 'Playback speed of the wave animation.' },
      { name: 'scale', type: 'number', description: 'Zoom level of the wave pattern.' },
      { name: 'amplitude', type: 'number', description: 'Height of the wave displacement.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root canvas wrapper.' },
      { name: 'style', type: 'React.CSSProperties', description: 'Inline styles merged onto the root canvas wrapper.' },
    ],
  },
  'googly-eyes-button': {
    description: 'A button with two cartoon eyes that track the cursor around the screen; the eyes go smirky and the label swaps text when clicked.',
    interaction: 'Move the cursor anywhere near the button to make both pupils follow it. Click the button to trigger the smirk expression and swap the label text.',
    props: [],
  },
  'gloss-button': {
    description: 'A rounded pill button with a marbled, iridescent oil-slick surface that drifts slowly on its own, topped with a fixed glossy highlight arc.',
    interaction: 'Ambient by default - the marbled surface keeps drifting continuously; hovering adds a subtle lift.',
    props: [],
  },
  'neumorphic-download-button': {
    description: 'A soft neumorphic circular download button with a progress ring that fills as a simulated download runs, finishing with a checkmark confirmation.',
    interaction: 'Click to start the simulated download; the ring fills in over a few seconds and swaps to a checkmark on completion before resetting.',
    props: [],
  },
  'rainbow-button': {
    description: 'A near-white rounded pill button with a thin iridescent pastel-spectrum border that continuously animates around the edge.',
    interaction: 'Purely visual - the border loops on its own; hover adds a small scale lift and click a slight press-down.',
    props: [],
  },
  'slide-to-confirm-button': {
    description: 'A dark pill-shaped order button where clicking sends a small truck animation sliding across the track before the label crossfades to a confirmed state.',
    interaction: 'Click the button to play the slide animation once; the label changes to a confirmation message with a checkmark when the truck reaches the end.',
    props: [],
  },
  'chrome-border-button': {
    description: 'A rounded white pill button with a thin rotating conic-gradient ring styled to look like polished chrome, and metallic-gradient text that shimmers left to right on a loop.',
    interaction: 'Ambient by default - the chrome ring and text shimmer keep animating continuously with no interaction required.',
    props: [],
  },
  'book-a-call-button': {
    description: 'A compact avatar-style button that expands its label on hover to invite booking a call, with a distinct pressed/active state.',
    interaction: 'Hover to expand the button and reveal its label; click to trigger the onBook callback.',
    props: [
      { name: 'onBook', type: '() => void', description: 'Called when the button is clicked, after its active-state animation.' },
    ],
  },
  'shimmer-button': {
    description: 'A clean white pill button with a subtle grey border and a narrow light streak that periodically sweeps diagonally across the surface.',
    interaction: 'The shimmer sweeps on a repeating timer by itself; hovering lifts the button slightly and clicking speeds up the next sweep.',
    props: [],
  },
  'kinetic-reel-text': {
    description: 'A centered 3D cylinder text reel that mechanically rotates through a list of words, like a slot-machine drum, cycling on a timer.',
    interaction: 'Cycles automatically on the configured interval; when `onSelect` is wired up, clicking the reel can also be used to trigger a selection.',
    props: [
      { name: 'prefix', type: 'string', description: 'Static text shown before the rotating word.' },
      { name: 'items', type: 'string[]', description: 'Words the reel cycles through, in order.' },
      { name: 'interval', type: 'number', description: 'Milliseconds between automatic word changes.' },
      { name: 'className', type: 'string', description: 'Extra classes merged onto the root wrapper.' },
      { name: 'theme', type: "'dark' | 'light'", description: 'Color scheme for the reel text and drum shading.' },
      { name: 'autoPlay', type: 'boolean', description: 'Whether the reel cycles automatically on its own.' },
      { name: 'onSelect', type: '(item: string) => void', description: 'Called with the newly active word whenever the reel advances.' },
    ],
  },
  'split-text-reveal': {
    description: 'A heading where every character flies in from a random vertical offset with staggered timing and a slight blur, settling into place.',
    interaction: 'Plays automatically once on mount/scroll into view; there is no ongoing pointer interaction.',
    props: [],
  },
  'word-by-word-text': {
    description: 'A paragraph that reveals one word at a time, each fading in and sliding up in sequence for an editorial, premium reading feel.',
    interaction: 'Plays automatically once on mount/scroll into view; there is no ongoing pointer interaction.',
    props: [],
  },
  'character-scramble-text': {
    description: 'A monospace text effect where each character cycles rapidly through random glyphs before settling on its real letter, like a matrix-style decode.',
    interaction: 'Plays automatically on mount; re-triggering (if wired to a button or hover in your usage) restarts the scramble-to-reveal sequence.',
    props: [],
  },
};

export function getComponentDoc(slug) {
  return componentDocs[slug] || null;
}
