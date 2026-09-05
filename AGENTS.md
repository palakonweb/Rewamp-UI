# AGENTS.md — Purrform Rebuild

Read this before touching any code. It's the source of truth for the rebrand from **conjure-ui** to **Purrform**.

## Project identity
- Old name: conjure-ui (prompt-to-component UI library, live at conjure-ui.vercel.app)
- New name: **Purrform**
- Logo: flat orange cat-face mark — rounded triangular ears, oval head, two ring-shaped eyes in Milk (#FFFDF2), thin whisker strokes, single Orange (#EC5E27) fill, no outlines or gradients. Recreate as a clean SVG rather than shipping the raster PNG.

## Tech stack detection — do this first
1. Inspect `package.json` and the existing source to confirm the real framework, styling system, routing, and how prompt-to-component generation currently works.
2. Don't assume a stack — adapt everything below to whatever the repo actually uses.
3. This is a rebrand + layout overhaul, not a functional rewrite. Leave the generation logic alone unless a change is explicitly required to support the new UI (e.g. exposing the source prompt per component so it can be shown in a copy block).

## Design tokens
**Primary**
- `--color-orange: #EC5E27` — brand / primary actions
- `--color-milk: #FFFDF2` — base background

**Secondary**
- `--color-burnt-orange: #D2471A` — hover / active states
- `--color-peach: #FBA27A` — accents / highlights
- `--color-sand: #F1E6D7` — surfaces / cards

**Neutrals**
- `--color-charcoal: #1F1F1F` — high-emphasis text
- `--color-stone: #6B6B6B` — secondary text
- `--color-mist: #D9D9D6` — borders / dividers
- `--color-cream: #FAF6ED` — subtle backgrounds

**Semantic**
- `--color-success: #16A34A`
- `--color-warning: #FBBF24`
- `--color-error: #EF4444`

**Orange ramp** (for charts/badges/depth, darkest → lightest):
`#7A2D12  #A63E1B  #D2471A  #EC5E27  #F17648  #F58F6A  #F9B494  #FCD5C2  #FEEBE1`

**Rule:** Orange is the only saturated accent anywhere in the UI. Peach/Sand/Cream carry the warmth in large surfaces — don't let Orange bleed into decorative backgrounds or it stops reading as an accent.

## Layout system (reference: evilcharts.com docs pages)
Three-column shell:
1. **Left sidebar** (~260px, fixed) — Purrform logo + wordmark; searchable nav tree of component categories, each expandable into its individual components/variants (mirrors evilcharts' "Area Chart → Default / Area Blocks" pattern).
2. **Center panel** — component name + one-line description, a Preview/Code toggle, then a bordered live-preview canvas (Sand or Cream background, Mist border, generous padding).
3. **Right rail** (~220px, fixed) — contextual navigation for the open category: sibling variants and/or on-page anchors, so people can jump between related components without leaving the page.

Every component page needs **two independently-copyable blocks** below the preview:
- **Prompt block** — the natural-language prompt that generates this component. Own "Copy prompt" button, Sand background.
- **Code block** — the resulting, syntax-highlighted source. Own "Copy code" button. Add a framework tab if more than one output target is supported.

Both copy buttons swap to a check-mark for ~1.5s on click as confirmation.

## Interaction & motion
- The copy-button check-mark swap is the one deliberate motion moment. Keep hover/tab transitions quick and functional — no scroll-triggered reveals.
- Respect `prefers-reduced-motion`.
- Active sidebar item: Orange text/icon on a Sand pill, not a bare color swap.

## Accessibility & responsiveness
- Charcoal on Milk/Cream/Sand must pass WCAG AA for body text; Milk on Orange is fine for large/bold labels only — check smaller text separately.
- Visible focus rings (Orange, 2px, offset) on the sidebar tree, tabs, and copy buttons.
- Below ~960px: right rail collapses into a "Jump to" dropdown at the top of the center panel.
- Below ~720px: left sidebar collapses into a slide-over from a header menu button.

## Deliverable checklist
- [ ] Logo recreated as SVG + favicon set
- [ ] Global rebrand: package/site metadata, all "conjure-ui"/"Conjure" strings → "Purrform"
- [ ] Design tokens implemented as CSS variables / theme config for the detected stack
- [ ] Three-column shell built and responsive per the breakpoints above
- [ ] Component page template: Preview/Code toggle + independent Prompt/Code copy blocks
- [ ] Existing component catalog migrated into the new sidebar tree, no functional regressions
- [ ] QA pass: contrast, focus states, mobile collapse behavior