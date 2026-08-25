---
version: 1
slug: "src-campaign-campaignapp-jsx"
primary_target: "src/campaign/CampaignApp.jsx"
related_targets: ["src/campaign/campaign.css","src/campaign/AtmosphereFX.jsx","src/campaign/atmosphere.css","src/main.jsx","index.html"]
---

## Surface

- Primary target: `src/campaign/CampaignApp.jsx`
- Related targets: `src/campaign/campaign.css`, `src/campaign/AtmosphereFX.jsx`, `src/campaign/atmosphere.css`, `src/main.jsx`, `index.html`
- Scope: shipped public landing page replacing the previous visual world
- Mode: persuade

## Visitor job

Young players arrive mainly from a phone. In seconds they should recognize META4PRO as a real computer club in Rostov-on-Don, see four distinct zones and a starting price, then call or open Telegram to book.

## Approved visual contract

- Approved comp: `concepts/iziplay-blocks/01-hero.png`
- Section comps: `02-zones.png`, `03-atmosphere.png`, `04-prices.png`, `05-rental.png`, `06-bonuses.png`, `07-reviews-booking.png` in the same directory.
- User approved the complete pack on 2026-08-25 and explicitly requested the shipped site in the same design and style.

## Chosen direction

**Charged Acrylic Campaign.** Acid-yellow advertising fields collide with real club photography, deep black stages, ultraviolet and hot-magenta light, transparent acrylic, liquid chrome and oversized lightning. The page behaves like one continuous esports campaign, not a stack of conventional gaming cards.

The memorable moment is the first viewport: the real Arena photo stays legible while a dimensional number 4, lightning and liquid color react to pointer or finger movement. Motion continues as one bounded atmosphere system; controls remain semantic and readable without it.

## Comp inventory

| Ingredient | Commitment | Medium |
|---|---|---|
| Navigation and CTA | Small black header, yellow action visible immediately | Semantic HTML/CSS |
| Hero headline | Huge condensed white/yellow type overlapping the scene | Semantic HTML/CSS |
| Real club scene | Full-bleed Arena photograph | Existing `zone-arena.webp` |
| Acrylic 4 and chrome | Large dimensional objects with real highlights and transparency | Produced transparent raster assets |
| Lightning and diagonal tape | Oversized sharp yellow energy shapes | Authored SVG/CSS plus produced raster where depth is required |
| Reactive atmosphere | UV/magenta liquid field and yellow impulses following pointer/touch | Canvas, reduced-motion fallback |
| Four zones | Large photographic portals with live selection and specifications | Semantic React + existing zone photos |
| Club atmosphere | Uneven real-photo collage, not an equal carousel | Semantic HTML/CSS + existing gallery photos |
| Prices | Dominant yellow field, large tariff values and tabs | Semantic HTML/CSS |
| Rental | Oversized floating device products with readable rental prices | Existing transparent device images + HTML/CSS |
| Bonuses | Uneven poster bento with dimensional safe/taxi/friend props | Semantic HTML/CSS + produced prop raster |
| Reviews and close | Skewed yellow quote plates, compact FAQ and spectacular booking finale | Semantic HTML/CSS + real club photo |

## Sampled visual record

- Page ground: `#050505`
- Signal yellow: `#FFD400`
- Hot yellow highlight: `#FFF000`
- Ultraviolet: `#6B22FF`
- Hot magenta: `#FF2DBD`
- Paper white: `#F7F5EC`
- Corners: 8–14px on dimensional plates; CTAs may use clipped corners, never generic pills.
- Lines: 1px luminous plate edge or no border; depth comes from offset soft shadow and authored material.
- Display: very condensed, heavy, uppercase; body: compact neutral sans with clear Russian readability.

## Constraints

- Preserve verified prices, address, phone, zones and device inventory already in the project.
- No invented booking backend or long fabricated reviews.
- Work from 360px, keep 44px interaction targets, keyboard focus and `prefers-reduced-motion`.
- The approved comps are reference images only; core UI text and controls cannot be rasterized.
