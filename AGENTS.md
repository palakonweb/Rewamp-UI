# Conjure UI — Agent Guide

This file is the source of truth for visual and structural consistency while we
build **v2 of the component dashboard** (`/components`). Read this before
touching anything under `src/components/ui`, `src/components/ComponentShowcaseLayout.jsx`,
or any new dashboard chrome. The landing page (`src/pages/LandingPage.jsx` and
its sections) is **out of scope** for v2 and keeps its existing serif/display
look — do not change it unless explicitly asked.

## Scope of v2

v2 is a rebuild of the **component dashboard UX**: sidebar navigation, search,
and the preview/code grid. Reference layout: cream sidebar with logo + collapse
toggle + icon nav, white main area with a search bar and a grid of bordered
preview cards.

## Color palette (dashboard scope)

Already defined as Tailwind v4 theme tokens in `src/index.css` under `@theme` —
use the utility classes, don't hardcode hex values.

| Token | Hex | Tailwind utility | Use |
|---|---|---|---|
| Cotton | `#EDEBDD` | `bg-cotton` / `text-cotton` | Sidebar background, app shell background |
| White | `#FFFFFF` | `bg-white` | Main content surface, cards |
| Cherry Red | `#810100` | `bg-cherry` / `text-cherry` | Primary accent, active states, links, focus |
| Maroon | `#630000` | `bg-maroon` / `text-maroon` | Accent hover/pressed state |
| Noir Black | `#1B1717` | `bg-noir` / `text-noir` | Primary text, borders (via opacity), icons |

Rules:
- Sidebar background = cotton. Main content background = white.
- Active nav item = cherry text on a cotton/white pill, never filled solid cherry background (keep it light — see mockup).
- Borders use `border-noir/10` to `border-noir/20`, not gray. Never introduce a separate gray scale for the dashboard.
- No new colors without adding them to this table first.

## Typography

**Inter, everywhere in the dashboard** — including headings. Do not use the
landing page's `--font-display` (Sarpanch) or `--font-serif` (Playfair) inside
`/components`. Use `font-sans` (already mapped to Inter in `src/index.css`).

- Headings: `font-sans`, normal case (not uppercase), medium/semibold weight — not the landing page's uppercase display treatment.
- Body/UI text: `font-sans`, regular/medium weight.
- Code blocks keep `font-mono` (Geist Mono).

## Layout conventions

- Sidebar: fixed-width rail, collapsible to icon-only. Logo + wordmark at top, collapse toggle top-right of sidebar, nav list with `lucide-react` icons below.
- Main content: search bar pinned at top, then a responsive card grid below (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-3`, not the old single-column stacked list).
- Preview cards: white background, `border border-noir/10`, sharp-ish corners (`rounded-xl`, not the old `rounded-3xl`), no heavy shadows — flat, like the mockup. Card header shows the component title + Preview/Code tab switch.
- Icons: `lucide-react` only, `size={16}`–`18` in the sidebar.

## Data structure (component registry)

Do **not** add new categories via an `if/else` chain. `ComponentShowcaseLayout.jsx`
uses a `categories` array (`{ id, name, icon, components: [] }`) — each
`components` entry is `{ Component, title }`. Adding a component means pushing
into the relevant category's `components` array, not adding a new branch.

## When extending this doc

If you introduce a new token, spacing rule, or pattern while working on the
dashboard, add it to the relevant table/section above in the same change —
don't let this file drift from the code.
