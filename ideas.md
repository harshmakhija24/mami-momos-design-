# Mami Momos Pamphlet Studio — Design Directions

## Three Possible Directions

### Theme Name: Pink City Heatwave
**Very Brief Intro:** An arresting street-poster direction that turns Jaipur’s sun, sandstone, and snack energy into a high-contrast printed object. It feels loud enough to stop a passer-by but disciplined enough to be genuinely readable outdoors.

**Probability:** 0.06

### Theme Name: Royal Bazaar Receipt
**Very Brief Intro:** A witty, collectible “order receipt from the bazaar” look with stamped offers, price markers, and the speed of a counter-service exchange. It connects Mami Momos to the local shopping lane without becoming faux-heritage.

**Probability:** 0.08

### Theme Name: Steam & Saffron Edition
**Very Brief Intro:** An editorial food-poster system built around rising steam, dramatic crop photography, and a tight saffron-and-ink color story. It gives the offer and menu hierarchy a premium food-zine character.

**Probability:** 0.04

---

# Chosen Direction: Pink City Heatwave

## Design Movement

Use a contemporary **Indian street-poster / risograph-inspired food editorial** style rather than a generic café flyer. Borrow the urgency of local handbills and the bold geometry of Jaipur’s built environment, but execute it with a clean information hierarchy suitable for a real printed coupon.

## Core Principles

1. **Read from a moving street:** Every key message must be recognizable at arm’s length in strong daylight: brand, offer, food cue, location, and redemption condition.
2. **Earn the drama:** Use one dominant typographic gesture and one food image per design, then leave enough quiet space for prices and conditions.
3. **Tactile, not ornamental:** Use block-print dots, hand-stamped seals, and steam-line motifs as texture—never as noise behind essential copy.
4. **One coupon, one job:** The front captures attention and communicates the offer; the reverse explains the redemption and helps the guest find the café.

## Color Philosophy

Base the system on **Pink City coral**, a sun-resistant deep **jaipuri maroon**, saffron-orange, and an almost-black brown. The intentional brightness makes the flyer visible in Jaipur sun, while the dark ink carries body copy and menu text with reliable contrast. Warm off-white is used sparingly to give the print surface a crafted paper quality. Every important message must use a dark-on-light or light-on-dark pair; no thin yellow copy, pale coral text, or low-contrast gradients.

## Layout Paradigm

Use a **poster-strip composition** rather than a centered card or standard restaurant menu. Each A5 flyer is built from stacked, offset bands: an offer stamp, a food headline zone, an expressive image crop, and a precise location/redemption strip. The dashboard borrows the language of a print-production studio: a left rail for design choice, a large “artboard” preview, and an export bench rather than a conventional marketing homepage.

## Signature Elements

1. **The Heat Stamp:** A distorted circular offer seal, always containing the redemption promise, and always large enough to read at a quick glance.
2. **Steam Ribbons:** Thick, sculptural steam contours that guide the eye from headline to offer without interfering with text.
3. **Bazaar Coordinates:** A narrow navigation-style address line paired with a small walking-direction glyph and the “near Hawa Mahal” cue.

## Interaction Philosophy

Interactions should resemble choosing a printed poster from a studio table: designs snap into focus, export formats are clear and direct, and controls never interrupt the preview. Hovering a variation reveals its print rationale; selecting a design updates the paper artboard rather than navigating away.

## Animation

Use restrained studio motion only: the active pamphlet slides a few pixels onto the artboard; stamp rings settle with a 180ms transform; buttons respond with a 0.97 active press. All motion stays below 260ms and is disabled under `prefers-reduced-motion`. The print artboards themselves remain stable to preserve layout trust.

## Typography System

Use **Bebas Neue** for compressed offer headlines and **DM Sans** for body copy, metadata, and controls. A limited use of **Fraunces Italic** adds a food-zine inflection to taste cues such as “hot, juicy, gone.” Headlines stay in upper case with generous tracking; prices, addresses, and fine print use clear mixed-case body copy at print-safe sizes.

## Brand Essence

**Mami Momos makes a hot, quick, memorable street-food stop for Jaipur’s explorers—minutes from Hawa Mahal, with a coupon worth walking for.**

Personality adjectives: **flavor-first, gutsy, local**.

## Brand Voice

Headlines should feel like a confident invitation shouted from a great food counter: short, hungry, and specific. CTAs should sound like a reward, not generic software language.

Example lines:

> “Hawa Mahal can wait. Your momos are steaming.”

> “Bring this slip. Unlock the good stuff.”

## Wordmark & Logo

Treat the existing Mami Momos logo as the primary brand asset. If a supplementary mark is needed for the dashboard, use a simple folded-dumpling silhouette inside the Heat Stamp—never a generic food emoji or a default wordmark.

## Signature Brand Color

**Pink City Coral — `#F25C46`**

## Print Specification

The master print format is **A5 portrait: 148 × 210 mm**, folded or single-sheet depending on the selected variation. It is exactly half an A4 sheet, easy for one-handed street distribution, common at local printers, and large enough for an offer, shortlist of combos, location line, and QR/contact block without microtype. The build uses a 3 mm bleed target and an 8 mm safe area in exported print PDFs.

## Content Architecture

Each variation uses the same factual system but changes the visual treatment:

| Design | Front-focus | Back / secondary content |
| --- | --- | --- |
| Heatwave | Offer-first, momos hero | Combo picks, address, redemption notes |
| Bazaar Receipt | Location and “bring this flyer” mechanic | Price/offer breakdown, menu highlights |
| Steam & Saffron | Food appetite and Shark Tank proof | Offer, find-us line, selected combos |
| Night Market (optional) | Dark ink, hot-orange high contrast | Late-shopping energy, QR and disclaimer |

## Style Decisions

- Prefer typography, iconography, and generated food imagery over a crowded generic grid.
- Keep all print-critical text in real HTML/SVG to preserve accuracy in PDF/SVG exports.
- Treat the discount and combos as editable placeholders until final pricing and redemption terms are confirmed.
- Make the **MAMI MOMOS** wordmark and dumpling mark the first-recognized campaign anchor in both dashboard and every A5 artboard; the studio identity remains subordinate.
- Extend Heat Stamp, Steam Ribbons, and Bazaar Coordinates into the supporting dashboard chrome using dashed print edges, stamped utility labels, and street-reward copy.
- Keep every utility functional, but phrase surrounding copy as a Jaipur street-food reward rather than generic design-software language.
- Add **Crossroads** as a fifth, calmer editorial collector’s cut: use Jaipur’s jharokha rhythm and Kyoto-inspired lattice restraint as visual motifs while keeping all menu names, prices, location, and the flyer reward grounded in the supplied Mami Momos material.
