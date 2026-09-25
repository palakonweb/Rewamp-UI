# Replace hardcoded hex colors with existing CSS-variable tokens

Written against: c48ee9c

## Evidence chain

- Surface: Components/docs page (`/components/:slug`) — sidebar nav-tree, active component label
- Problem: the active nav-tree label hardcodes hex values (`text-[#171717]`, `text-[#FAFAFA]`) instead of using the documented CSS-variable tokens, even though those exact values already exist as tokens
- Design evidence: `src/Agent.md:55` — "Source every color from these tokens via CSS variables - never hardcode a hex value directly in component code"
- Owner: `src/components/dashboard/RewampShowcase.jsx:862-863`
- Scope and affected surfaces: `RewampShowcase.jsx:862-863` only (the two conditional branches for the active nav-tree label's light/dark text color)
- Uncertainty: `#171717` matches `--neutral-900` (`src/index.css:57`) exactly, and `#FAFAFA` matches `--neutral-50` (`src/index.css:65`) exactly — both are already resolved into `--text-primary` (light) and are the base neutral-50 (dark elevated) values, so the mapping is unambiguous. No new token is needed.

## Design decision

Replace the two hardcoded hex values with the existing CSS-variable tokens they duplicate, so the active nav-tree label participates in the same token system as the rest of the docs shell (and inherits any future palette adjustment automatically instead of drifting).

## Reuse

- Token: `var(--text-primary)` (light-mode equivalent of `#171717`, defined at `src/index.css:69` as `var(--neutral-900)`)
- Token: `--neutral-50` (`#FAFAFA`, defined at `src/index.css:65`) — used directly since no existing semantic token (`--text-*`) maps to this value in dark mode context; confirm against sibling conditional branches in the same file for the correct semantic equivalent before finalizing (see Changes step)
- Exemplar: other theme-conditional color branches in the same component, e.g. `RewampShowcase.jsx:1178` (`theme === 'light' ? 'text-neutral-900' : 'text-white'`), which already uses semantic/Tailwind neutral classes instead of raw hex

## Changes

1. `src/components/dashboard/RewampShowcase.jsx:862-863`
   - Change: replace `'font-bold text-[#171717]'` with `'font-bold text-[var(--text-primary)]'` and `'font-bold text-[#FAFAFA]'` with the dark-mode equivalent already established elsewhere in this file for elevated-surface text (cross-check against line 1178's `text-white` / `text-neutral-900` pattern to pick the exact matching class rather than inventing a new one)
   - Preserve: the surrounding ternary structure (`theme === 'light' ? ... : ...`) and the `font-bold`/`font-semibold` weight class (weight is addressed separately in plan 02)
   - Verify: active nav-tree label renders visually identical to before (same computed color), now sourced from a token

## Scope

- Inherit: only `RewampShowcase.jsx:862-863`
- Verify: re-run a hex-literal scan across the traced render path to catch any other hardcoded color this audit's grep may have missed (the audit checked `font-bold`/`font-mono` contexts specifically, not every `text-[#...]`/`bg-[#...]` literal)
- Exclude: colors inside `src/components/ui/*Showcase.jsx` demo components — those render the product being showcased, not docs/landing chrome, and are not governed by this token rule unless independently confirmed to be chrome

## Validation

- Product: load `/components/:slug`, select a component, confirm the active nav-tree label's text color is visually unchanged in both light and dark theme
- Interface: toggle theme while a component is selected to confirm both branches resolve correctly
- System: confirm the replacement values are pixel-identical to the removed hex (tokens were chosen to match exactly, not approximate)
- Repository: `grep -n "text-\[#\|bg-\[#" src/components/dashboard/RewampShowcase.jsx` → no remaining literal hex color classes in this file

## Stop conditions

- Stop if no existing semantic token exactly matches the dark-mode `#FAFAFA` case — if the exact match requires inventing a new token rather than reusing one, widen scope back to the audit before proceeding.

## Design documentation

- After acceptance and validation: none — Agent.md already documents the token-sourcing rule; this plan brings implementation into compliance, no new documentation is needed.
