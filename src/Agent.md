# AGENTS.md — RewampUI Brand & Typography Rules

This file defines the brand asset and font rules that **every agent working on this repo must follow**, for every component, every page, every part of the site. Do not deviate from these tokens or introduce alternate fonts/colors without explicit instruction.

---

## Typography

**Primary typeface: SF Pro**

| Use case | Weight |
|---|---|
| Headings, component/nav labels, buttons, anything emphasized | **SF Pro Semibold** |
| All body text, paragraphs, component content, UI copy, everywhere else by default | **SF Pro Regular** |

Rules:
- SF Pro Regular is the **default weight for the entire site** — every page, every component, every piece of text uses SF Pro Regular unless it is explicitly a heading, label, or emphasis element, in which case use SF Pro Semibold.
- Never substitute a system fallback as the primary choice. Load SF Pro properly (via `next/font`, `@font-face`, or the platform's supported method); fallback stack only applies if SF Pro genuinely fails to load:
  ```css
  font-family: "SF Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  ```
- Do not mix in other typefaces (no Inter, no Geist, no Google Fonts) anywhere in this project unless explicitly instructed otherwise — this overrides any earlier prompt that suggested Inter/Geist as a placeholder.
- Set `font-display: swap` on the font-face declaration so text isn't invisible during load.
- Apply the font at the root (`html`/`body` or global CSS variable `--font-sans`) so every component inherits it automatically — do not set font-family per-component.
- Semibold is for weight/emphasis only — do not use it as a substitute for font size or color to create hierarchy; combine with the type scale and `--text-primary` / `--text-secondary` tokens instead.

---

## Brand Colors — Rewamp Color Palette v1.0

**Primary (Lilac)**
| Token | Hex | Usage |
|---|---|---|
| lilac-600 | `#C1B4D8` | strongest brand accent |
| lilac-500 | `#D4CBE5` | primary brand color |
| lilac-400 | `#E4DDF0` | secondary accent, dark-mode brand |
| lilac-300 | `#EEEAF7` | soft tint / glow |
| lilac-200 | `#F6F4FB` | very light tint |
| lilac-100 | `#FBFAFE` | near-white tint |

**Neutrals**
| Token | Hex | Usage |
|---|---|---|
| neutral-900 | `#171717` | Primary Text |
| neutral-800 | `#262626` | Text / Icons |
| neutral-700 | `#404040` | Secondary Text |
| neutral-600 | `#525252` | Subtle Text |
| neutral-400 | `#A8A8A8` | Borders |
| neutral-300 | `#D4D4D4` | Dividers |
| neutral-200 | `#E5E5E5` | Surfaces |
| neutral-100 | `#F5F5F5` | Background |
| neutral-50  | `#FAFAFA` | Elevated BG |

Rules:
- Source every color from these tokens via CSS variables — never hardcode a hex value directly in component code.
- Brand (lilac) is used sparingly as accent/highlight (focus rings, active states, glows, hover accents) — never as a full-bleed background that overwhelms the neutral base.
- Light/dark mode both derive from this same palette (lilac shifts lighter in dark mode: use lilac-400/300 instead of lilac-600/500 for brand elements on dark backgrounds) — see the theme CSS variables already established for the shell (`--bg`, `--surface`, `--elevated`, `--border`, `--text-primary`, `--text-secondary`, `--brand`, `--brand-strong`).

---

## Logo / Wordmark
- Brand name across the entire product: **RewampUI** (sidebar wordmark, page title, meta tags, footer).
- Use the handwritten-script "Rewamp" mark only where a literal logo mark is called for (favicon, splash); UI chrome (nav, headers) uses the plain **RewampUI** text wordmark in SF Pro Semibold.

---

## Enforcement
- Any new component, page, or PR that introduces a font other than SF Pro (Regular/Semibold) or a color not sourced from the tokens above should be flagged and corrected before merge.
- If SF Pro licensing/webfont delivery is not available in a given environment, note it explicitly and use the documented fallback stack — do not silently switch to a different typeface without flagging it.