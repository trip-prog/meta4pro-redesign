---
version: 1
slug: "src-app-jsx"
primary_target: "src/App.jsx"
related_targets: ["src/styles.css","src/components/SiteHeader.jsx","src/components/HardwareHero.jsx","src/components/ZoneExplorer.jsx","src/components/ClubGallery.jsx","src/components/BookingSection.jsx"]
---

## Surface

- Primary target: `src/App.jsx`
- Related targets: `src/styles.css`, `src/components/SiteHeader.jsx`, `src/components/HardwareHero.jsx`, `src/components/ZoneExplorer.jsx`, `src/components/ClubGallery.jsx`, `src/components/BookingSection.jsx`
- Scope: full public landing page foundation
- Mode: persuade

## Product job

Convince a young player on a phone that META4PRO is a serious, current gaming club and get them to choose a zone or contact the club. Desktop should feel cinematic, while mobile must remain fast, legible, tactile, and complete without WebGL.

## Chosen direction

**Live Match Lobby.** The page behaves like the seconds before a match: dark arena atmosphere, precise yellow signal, oversized condensed-feeling type, real club photography, and a single scroll-driven power-on moment. The approved first-surface comp is `.impeccable/mocks/decision/live-match-lobby-mobile.png`; desktop follows `.impeccable/mocks/decision/live-match-lobby-desktop.png`.

## Memorable moment

The hero assembles one photorealistic gaming PC from nine independently generated and registered transparent layers: chassis, motherboard, CPU, RAM, cooler, GPU, fans, cables, and glass. The build resolves into the final machine and one restrained Electric Border action. This is the signature interaction; the rest of the page supports it instead of competing with it.

## Component grammar

- Controls use compact, tactical geometry: 12px corners for buttons and interactive controls.
- Photography uses larger 14px frames and edge-to-edge crops.
- One primary electric CTA per viewport; yellow is signal, not wallpaper.
- Avoid generic floating cards, dashboard grids, neon-purple cyberpunk, fake booking forms, and repeated novelty effects.
- Zone selection is an editorial list plus one focused photo/spec panel, not a grid of interchangeable cards.

## Type and color

- Display: Unbounded Variable, heavy and tightly tracked.
- Body/UI: Onest Variable, direct and highly readable.
- Arena black: `#070706`
- Signal yellow: `#FFD400`
- Warm paper: `#F3F1E8`
- Steel: `#84847D`

## Asset and rendering inventory

- Semantic HTML and React for navigation, zone selection, facts, booking contacts, and footer.
- Raster/WebP for real club photography and the registered PC component stack.
- WebGL Liquid Ether only on capable desktop pointers and only near the hero.
- Circular Gallery only on capable desktop; mobile uses an accessible CSS scroll-snap photo strip.
- Reduced-motion and touch users receive the complete content without dependent canvas effects.

## Open product boundary

The current foundation has honest phone, Telegram, and official-tariff links. A true booking workflow requires the club's booking API/provider and explicit approval before public launch. Live prices and contacts were checked against the current official site on 23.08.2026, but publication still requires owner confirmation.
