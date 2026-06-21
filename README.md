# Tideline

**Off the boat. Onto your table.** — the marketplace for the day's catch.

A design-showcase concept site by [made. by ac](https://made-by-ac.com). Book a seat
on a working fishing boat, or claim a share of the landing, direct from the skipper
at the dock price — cutting the five hands that usually stand between the net and the plate.

## Art direction

Tidal, data-as-poetry. Wet-sand and deep-water surfaces, a phosphor-aqua tide line that
draws itself across the page, and a warm coral that marks the catch. Every boat gets a
generative tide chart drawn from its id. Built on the made. studio DNA — Fraunces / Hanken
Grotesk / Space Mono, the made. easing, Lenis smooth scroll, GSAP.

## Stack

React 18 · Vite · Tailwind CSS v4 · GSAP · Lenis · React Router

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

## Routes

- `/` — the concept (hero, the five-hand problem, the price splitter, how it works)
- `/catch` — today's landings (browse boats / catch shares)
- `/boat/:id` — a boat, with a seat-or-share booking panel
- `/skipper` — the sell-before-you-sail dashboard

Concept demo · mock data · not a live marketplace.
