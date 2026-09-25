# Replace font-bold/font-black emphasis with Semibold

Written against: c48ee9c

## Evidence chain

- Surface: Landing page Hero headline (`/`) and the Components/docs shell (`/components`, `/components/:slug`)
- Problem: Emphasis text uses Tailwind `font-bold` (700) or `font-black` (900) where Agent.md permits only Regular (400, default) and Semibold (600)
- Design evidence: `src/Agent.md:9-17` — "Primary typeface: SF Pro"; table restricts weight to Semibold for "Headings, component/nav labels, buttons, anything emphasized" and Regular for everything else; no weight above Semibold is documented
- Owner: individual `className` weight utilities on each element (no shared token governs weight choice; `font-semibold`/`font-bold`/`font-black` are applied ad hoc per component)
- Scope and affected surfaces:
  - `src/components/sections/Hero.jsx:67` — main landing headline (`font-bold`)
  - `src/components/dashboard/RewampShowcase.jsx:649,697,704,711,862,863` — sidebar wordmark, section headers ("Getting Started", "Architecture", "About"), and active nav-tree label (`font-bold`)
  - `src/components/sections/ComponentStage.jsx` (8 occurrences), `src/components/sections/FeaturesBento.jsx` (6), `src/components/sections/LiveProductDemo.jsx` (5), `src/components/sections/SiteFooter.jsx` (3), `src/components/sections/DomeGalleryCTA.jsx` (1) — all reachable from the landing page render tree via `Hero.jsx`'s sibling sections and shared components
- Uncertainty: `src/components/sections/Navbar.jsx` also uses `font-black`/`font-bold`, but this file is not imported by `App.jsx`, `LandingPage.jsx`, or `ComponentsPage.jsx` — it is dead code and excluded from this plan's scope.

## Design decision

Replace `font-bold` and `font-black` with `font-semibold` on every text element within the traced render path of the landing page and components page, since Agent.md caps emphasis weight at Semibold. This aligns the rendered weight scale with the documented two-weight system (Regular default, Semibold emphasis) instead of the current three-weight de facto system (400/700/900).

## Reuse

- Utility: `font-semibold` (Tailwind default weight 600, matching SF Pro Semibold) — already used correctly elsewhere in the same files, e.g. `RewampShowcase.jsx:1178,1428`
- Exemplar: `src/components/dashboard/RewampShowcase.jsx:1178` (`font-semibold text-sm ...`) shows the correct pattern already in use nearby

No new primitive required — this is a class-name substitution using an existing, already-adopted utility.

## Changes

1. `src/components/sections/Hero.jsx:67`
   - Change: replace `font-bold` with `font-semibold` on the `<h1>` headline
   - Preserve: `text-[44px] sm:text-[52px] leading-[1.05] tracking-tight` sizing/spacing and `normal-case` casing override — only the weight utility changes
   - Verify: headline renders at weight 600, not 700

2. `src/components/dashboard/RewampShowcase.jsx:649,697,704,711,862,863`
   - Change: replace each `font-bold` with `font-semibold` (lines 862/863 keep their existing conditional light/dark hex-color branch structure — see plan 03 for the hex-color fix itself)
   - Preserve: existing conditional theme logic, tracking/uppercase utilities, and surrounding layout
   - Verify: sidebar section headers and active nav-tree label render at weight 600

3. `src/components/sections/ComponentStage.jsx`, `src/components/sections/FeaturesBento.jsx`, `src/components/sections/LiveProductDemo.jsx`, `src/components/sections/SiteFooter.jsx`, `src/components/sections/DomeGalleryCTA.jsx`
   - Change: replace each `font-bold`/`font-black` occurrence with `font-semibold`, one at a time, confirming each instance is applied to emphasized text (heading, label, or button) and not body copy that should instead drop to `font-normal`/default per Agent.md
   - Preserve: all non-weight classes on each element
   - Verify: no visual regression in relative hierarchy (emphasized elements still read as emphasized against Regular-weight body text)

## Scope

- Inherit: all files listed above, reached from `LandingPage.jsx` → `Hero.jsx` and its imported sections, and `ComponentsPage.jsx` → `RewampShowcase.jsx`
- Verify: `AIProductBentoShowcase.jsx`, `FlowerSidebarShowcase.jsx`, `Sidebar.jsx`, and other `src/components/ui/*Showcase.jsx` files that carry `font-bold` — these render inside `RewampShowcase.jsx`'s live-demo stage, so confirm each is genuinely emphasis text (heading/label/button) before changing, since some may be demonstrating a component's own independent styling that Agent.md does not govern (the component *being showcased*, not the docs chrome)
- Exclude: `src/components/sections/Navbar.jsx` (unreferenced, dead code — not part of any traced render path)

## Validation

- Product: load `/` and confirm the Hero headline reads as Semibold; load `/components/:slug` and confirm sidebar headers and the active nav-tree label read as Semibold
- Interface: check light and dark theme on both surfaces; check the active vs. inactive nav-tree label states in `RewampShowcase.jsx`
- System: confirm no element that should stay Regular-weight (default body text) was mistakenly bumped to Semibold, and no remaining `font-bold`/`font-black` exists in the traced render path
- Repository: `grep -rn "font-bold\|font-black" src/components/sections src/components/dashboard src/pages` → zero matches outside `Navbar.jsx` (excluded) and any showcase-demo content confirmed out of scope per the Verify step above

## Stop conditions

- Stop if a `font-bold`/`font-black` instance turns out to belong to a showcased component's own independent design (the product being demonstrated) rather than the docs/landing chrome — that instance is out of scope and must not be changed.

## Design documentation

- After acceptance and validation: none — Agent.md already documents the two-weight rule; this plan brings implementation into compliance, no new documentation is needed.
