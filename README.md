# Old English Bricklayer

Marketing site for **Old English Bricklayer** — time-served bricklayers in
Langley, Slough (walls, repointing, extensions, paving, restoration).

Built as a fast, hand-crafted Vite site. Design direction: **Ink & Ember** —
a dark, editorial charcoal-and-brick-red palette chosen to stand apart from
the usual light terracotta bricklayer template.

## Stack
- **Vite** (vanilla JS, ES modules)
- **Lenis** — smooth scrolling, synced to GSAP's ticker
- **GSAP + ScrollTrigger** — scroll-driven reveals
- **Splitting.js** — per-character heading reveals
- **Swiper** — reviews carousel

## Features
- Categorised services
- Filterable work gallery (drop real photos into `public/images` and set
  `data-src` / add `<img>` to the tiles — no JS changes needed)
- **Free estimate calculator** — indicative range from four inputs
- **Reviews** carousel + leave-a-review form (persisted in `localStorage` for
  the demo; swap in real Google/Facebook reviews in `src/lib/reviews.js`)
- **Booking** — pick a slot, then add it to Google Calendar or download an
  `.ics` (Apple/Outlook). No backend required.
- Prominent phone (`07480 947125`) throughout + sticky mobile call bar
- Fully responsive, respects `prefers-reduced-motion`

## Develop
```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the build
```

## Business details
- **Phone:** 07480 947125
- **Address:** 39 Humber Way, Langley, Slough SL3 8SR
- **Facebook:** https://www.facebook.com/oldenglishbricklayer1
