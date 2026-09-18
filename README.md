# Rewamp UI

A copy-paste React component library — highly interactive, physically-accurate, Framer Motion-driven components you drop directly into your codebase. No NPM wrapper package; you own the code.

Repo: [github.com/palakonweb/Rewamp-UI](https://github.com/palakonweb/Rewamp-UI)

None of these designs are claimed as original work — inspired by the goats of the internet, made with love by Palak aka [palakonweb](https://github.com/palakonweb).

## Getting started

```bash
npm install
npm run dev
```

Other scripts: `npm run build`, `npm run preview`, `npm run lint`.

## Using components in your own project

Either copy a component's source straight from the `/components` browser in the app, or use the bundled CLI:

```bash
npx rewampui add theme-toggle
npx rewampui add arch-card-carousel theme-toggle
npx rewampui add --all
```

The CLI lives in [`cli/`](cli) — see `cli/package.json` for details. Requires Node 18+.

## Stack

- React 19 + Vite 7
- Tailwind CSS 4 (theme tokens as CSS variables in `src/index.css`, for light/dark support)
- Framer Motion for all interaction/animation
- react-router-dom for routing
- three.js for WebGL-based components

## Project structure

- `src/pages` — routed pages (landing, component browser, documentation)
- `src/components/ui` — the component library itself, one Showcase file per component
- `src/components/sections` — landing page marketing sections
- `src/components/docsRegistry.js` — the component registry (categories, slugs, lazy imports)
- `cli/` — the `rewampui` CLI package

Full docs, installation, and architecture notes live at `/documentation` in the running app.
