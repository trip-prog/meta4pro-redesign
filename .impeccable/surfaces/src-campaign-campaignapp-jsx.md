---
version: 1
slug: "src-campaign-campaignapp-jsx"
primary_target: "src/campaign/CampaignApp.jsx"
related_targets: ["src/campaign/campaign.css","src/main.jsx","index.html"]
---

## Surface

- Primary target: `src/campaign/CampaignApp.jsx`
- Related targets: `src/campaign/campaign.css`, `src/main.jsx`, `index.html`
- Scope: shipped public landing page replacing the previous visual world
- Mode: persuade

## Visitor job

Young players arrive mainly from a phone. In seconds they should recognize META4PRO as a real computer club in Rostov-on-Don, see four distinct zones and a starting price, then call or open Telegram to book.

## Approved visual contract

- Approved comp pack: `concepts/yellow-black-blocks/contact-sheet-yellow-black.png`.
- Section comps: `01-hero-yellow-black.png` through `07-reviews-booking-yellow-black.png` in the same directory.
- User approved this exact yellow-black pack on 2026-08-25 and explicitly requested the shipped site to follow it closely, with the dimensional objects implemented as reactive layers rather than a screenshot wallpaper.

## Chosen direction

**Black Gold Voltage.** Signal-yellow and gold advertising fields collide with real club photography, deep black stages, transparent black-gold acrylic, liquid chrome and oversized lightning. Purple, magenta, cyan and blue neon are excluded. The page behaves like one continuous esports campaign, not a stack of conventional gaming cards.

The memorable moment is the first viewport: the real Arena photo stays legible while a dimensional number 4, lightning and chrome react to a precise pointer. On touch, depth follows natural scrolling and swiping instead of requiring a tap; controls remain semantic and readable without motion.

## Comp inventory

| Ingredient | Commitment | Medium |
|---|---|---|
| Navigation and CTA | Small black header, yellow action visible immediately | Semantic HTML/CSS |
| Hero headline | Huge condensed white/yellow type overlapping the scene | Semantic HTML/CSS |
| Real club scene | Full-bleed Arena photograph | Existing `zone-arena.webp` |
| Acrylic 4 and chrome | Large dimensional objects with black, gold and white highlights, transparency and pointer/touch parallax | Produced transparent raster assets + CSS transforms |
| Lightning accents | Sharp gold energy objects; broad diagonal bands are excluded by user feedback | Produced raster plus pointer/touch parallax |
| Four zones | Large photographic portals with live selection and specifications | Semantic React + existing zone photos |
| Club atmosphere | Swipeable rail of seven unequal real-photo plates; mouse-drag on desktop | Native HTML/CSS scroll-snap + existing gallery photos |
| Prices | Dimensional black/yellow split plates, large tariff values and tabs | Semantic HTML/CSS |
| Rental | Oversized floating device products with readable rental prices | Produced transparent device images + HTML/CSS |
| Bonuses | Uneven poster bento with dimensional safe/taxi/friend/school/student props | Semantic HTML/CSS + produced prop raster |
| Reviews and close | Drag/swipe yellow quote plates, numbered gold-edged FAQ and spectacular booking finale | Semantic HTML/CSS + real club photo |

## Sampled visual record

- Page ground: `#010100` sampled from the approved hero.
- Raised graphite: `#181714` sampled from the hero fact plate.
- Signal yellow/gold: `#FDCD05` sampled from the approved hero title.
- Hot yellow highlight: `#FFF200`.
- Deep amber: `#CE9100` sampled from the approved price material.
- Paper white: `#FEFEFE` sampled from the approved hero title.
- Corners: 8–14px on dimensional plates; CTAs may use clipped corners, never generic pills.
- Lines: 1px luminous plate edge or no border; depth comes from offset soft shadow and authored material.
- Display: very condensed, heavy, uppercase; body: compact neutral sans with clear Russian readability.

## Constraints

- Preserve verified prices, address, phone, zones and device inventory already in the project.
- No invented booking backend or long fabricated reviews.
- Work from 360px, keep 44px interaction targets, keyboard focus and `prefers-reduced-motion`.
- The approved comps are reference images only; core UI text and controls cannot be rasterized. Image-native chrome, acrylic and object props stay raster; precise lightning, pointer/scroll response and control geometry stay code.
