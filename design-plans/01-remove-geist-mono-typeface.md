# Remove banned Geist Mono typeface from the mono font token

Written against: c48ee9c

## Evidence chain

- Surface: Components/docs page (`/components`, `/components/:slug`) — every code panel (Source/Usage/Terminal/Props tabs) in `RewampShowcase.jsx`; also every showcase component under `src/components/ui/*Showcase.jsx` that uses `.font-mono` for labels/code
- Problem: `--font-mono` resolves to `'Geist Mono'`, a typeface Agent.md explicitly bans by name
- Design evidence: `src/Agent.md:22` — "Do not mix in other typefaces (no Inter, no Geist, no Google Fonts) anywhere in this project unless explicitly instructed otherwise"
- Owner: `src/index.css:93` (`--font-mono` token definition, consumed everywhere via the `.font-mono` utility class at `src/index.css:203-205`)
- Scope and affected surfaces: Every element using the `font-mono` Tailwind/utility class — confirmed 25 occurrences in `src/components/dashboard/RewampShowcase.jsx`, plus 46 in `src/components/sections/ComponentStage.jsx`, and one or more in nearly every `src/components/ui/*Showcase.jsx` file (~50 files total)
- Uncertainty: Agent.md defines the primary typeface stack (SF Pro + system fallbacks) but does not name a specific monospace equivalent. SF Pro has no bundled monospace cut, so the correction must fall back to the platform system monospace stack rather than any named webfont, to stay consistent with Agent.md's "no other typeface" rule.

## Design decision

Change `--font-mono` to a system-monospace fallback stack (no named third-party webfont), consistent with Agent.md's rule that only SF Pro (or its documented system fallback) may be loaded, and that no other typeface — including Geist — may be introduced. This is a single-token fix; the `.font-mono` utility already cascades this everywhere it's used, so no per-component changes are needed.

## Reuse

- Token: `--font-mono` in `src/index.css` (`@layer base`, inside `:root`)
- Utility: `.font-mono` in `src/index.css:203-205` (already the sole consumer path — no other place hardcodes "Geist")
- Exemplar for fallback-stack style: `--font-sans` at `src/index.css:90` (`'SF Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`)

No new primitive is required — this is a value change on an existing token.

## Changes

1. `src/index.css:93`
   - Change: replace `--font-mono: 'Geist Mono', monospace;` with a system-monospace fallback stack that names no third-party font, e.g. `--font-mono: ui-monospace, 'SF Mono', 'Segoe UI Mono', 'Cascadia Code', Consolas, monospace;`
   - Preserve: the `--font-mono` variable name and the `.font-mono` utility class contract, so every existing consumer keeps working unchanged
   - Verify: no rendered surface requests or references "Geist" anywhere in computed styles or network requests

## Scope

- Inherit: every element currently using the `.font-mono` class — `RewampShowcase.jsx`, `ComponentStage.jsx`, `DomeGalleryCTA.jsx`, `FeaturesBento.jsx`, `LiveProductDemo.jsx`, `DocumentationContent.jsx`, `Sidebar.jsx`, and all `src/components/ui/*Showcase.jsx` files
- Verify: any inline `style={{ fontFamily: ... }}` that might bypass the `.font-mono` class and hardcode `'Geist Mono'` directly (none found in this audit, but re-check via `grep -rn "Geist" src` after the change to confirm zero remaining references outside comments/Agent.md)
- Exclude: `--font-serif` (`'Playfair Display'`) — out of scope; Agent.md does not name-ban Playfair Display, and this plan addresses only the Geist Mono violation

## Validation

- Product: open `/components/:slug` for any component with a source/usage panel; confirm code blocks render in a system monospace face
- Interface: check both light and dark theme, and the Terminal/Props tabs in `RewampShowcase.jsx`, plus at least one `*Showcase.jsx` component that uses `.font-mono` for a label
- System: confirm no other token or component independently declares `font-family: 'Geist Mono'` outside of `--font-mono`
- Repository: `grep -rn "Geist" src` → only comment references in `src/index.css` explaining the fallback rationale and `src/Agent.md`'s prohibition text remain; no active `font-family` declaration matches

## Stop conditions

- Stop if any consumer is found to hardcode `'Geist Mono'` directly (bypassing the token) — that requires a separate per-file change beyond this token-only plan.

## Design documentation

- After acceptance and validation: none — Agent.md already documents the "no Geist" rule; this plan brings the implementation into compliance with existing documentation, no new documentation is needed.
