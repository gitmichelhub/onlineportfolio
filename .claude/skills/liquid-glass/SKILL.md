---
name: liquid-glass
description: Apply or extend the Aave-style "liquid glass" aesthetic in this portfolio (frosted/refractive panels on nav, cards, orb, footer, pages). Use when adding a new glass surface, tuning the glass look, or debugging why the effect isn't visible.
---

# Liquid glass aesthetic

This portfolio uses an Aave-inspired liquid glass look. Reference:
https://aave.com/design/building-glass-for-the-web

## How to apply it

Add `className="glass liquid-glass"` to a panel. For small surfaces (nav pills,
badges) use `className="glass liquid-glass-soft"` so content reading through them
stays comfortable.

- `glass` — cross-browser frosted base (blur, bevel, specular, shadows).
- `liquid-glass` / `liquid-glass-soft` — upgrade that refracts the backdrop via
  an SVG displacement filter where supported.

## Where it lives

- `src/index.css` — `.glass`, `.glass::before` (rim), `.glass::after` (specular +
  `glass-sheen` animation), `.liquid-glass`, `.liquid-glass-soft`, the `@supports`
  gate, and `prefers-reduced-motion` handling.
- `src/App.tsx` — `<LiquidGlassFilters>` SVG `<defs>`: `#liquid-refraction` and
  `#liquid-refraction-soft`.

## Rules that took iteration (don't regress these)

1. **Refract the backdrop, not the element.** The displacement must live in
   `backdrop-filter`, never `filter: url()` on the element — filtering the element
   warps its own text and kills legibility. Aave's whole point is a crisp surface
   over a bent background.
2. **Chromatic aberration** = split source into R/G/B with `feColorMatrix`, run a
   separate `feDisplacementMap` per channel at different `scale`, then
   `feBlend mode="screen"` them back together.
3. **Never animate `feTurbulence baseFrequency`** while the filter feeds a
   `backdrop-filter` — it re-rasterizes the backdrop every frame and stutters on
   scroll. Motion comes from the cheap CSS `glass-sheen` highlight instead, and is
   disabled under `prefers-reduced-motion`.
4. **Keep the `@supports` gate + frosted fallback.** `backdrop-filter: url(#svg)`
   is effectively Chromium-only; Safari/Firefox fall back to plain blur.
5. **The effect only reads over contrast.** It's strong over the hero (floating
   shapes + gradient) and nav over scrolling content, and nearly invisible over
   flat `bg-white/50` sections. Don't expect drama on flat sections; add a
   gradient/shape behind a panel if you want the refraction to show.

## Palette / type

Copper `rgb(185 120 70)`, teal `rgb(20 184 166)`. Headings Playfair Display,
body DM Sans. Tailwind tokens: `glass-copper`, `glass-teal`, `glass-dark`,
`glass-muted`, `glass-cream`, `glass-light`.

## Verify changes visually

`backdrop-filter: url()` only renders in Chromium, so the desktop-screenshot and
preview-MCP paths are unreliable here. Use the project's Playwright screenshots:

```
npm run shots        # writes PNGs to tmp/shots/ (gitignored)
```

Then read `tmp/shots/hero-desktop.png` etc. Also run `npx tsc --noEmit` and
`npm run build` to confirm nothing broke.
