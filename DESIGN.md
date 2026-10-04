---
name: Designing Your Life
description: One person's answers to the Designing Your Life exercises, set out as clean, playful lab objects on a pale wall.
colors:
  wall: "#e9ecee"
  card: "#ffffff"
  ink: "#1b1a22"
  ink-soft: "#4a4955"
  ink-faint: "#8e8d99"
  health-1: "#d2fbe9"
  health-2: "#a8ecce"
  health-3: "#7edbb5"
  health-4: "#55c99e"
  health-5: "#2cb589"
  health-6: "#0f7e5c"
  health-7: "#0a7254"
  health-8: "#1a5c45"
  health-9: "#0b4d39"
  health-10: "#033b2a"
  work-1: "#eaf0fd"
  work-2: "#cadbfd"
  work-3: "#a9c5fe"
  work-4: "#89aefe"
  work-5: "#6997fe"
  work-6: "#2f66f2"
  work-7: "#2855cb"
  work-8: "#26489b"
  work-9: "#1c3a85"
  work-10: "#0f2a70"
  play-1: "#fef2e0"
  play-2: "#ffe2b0"
  play-3: "#ffcb73"
  play-4: "#f5b032"
  play-5: "#d99500"
  play-6: "#9c6600"
  play-7: "#8a5a00"
  play-8: "#7d5507"
  play-9: "#674504"
  play-10: "#523602"
  love-1: "#feece8"
  love-2: "#fecdc4"
  love-3: "#feae9f"
  love-4: "#ff8a76"
  love-5: "#fe6049"
  love-6: "#c93a20"
  love-7: "#ae2716"
  love-8: "#92271a"
  love-9: "#7a1c12"
  love-10: "#5f0f07"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 7vw, 5.75rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.018em"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.85
    letterSpacing: "-0.04em"
    fontFeature: "\"tnum\", \"lnum\""
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1rem, 1.8vw, 1.5rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  lead:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  meta:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "\"tnum\""
  label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: "0.06em"
rounded:
  swatch: "2px"
  post: "4px"
  bar: "6px"
  base: "8px"
  pill: "999px"
  round: "50%"
spacing:
  gutter: "clamp(16px, 4vw, 56px)"
  gap: "clamp(14px, 1.8vw, 28px)"
  measure: "1040px"
components:
  rack-part:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.bar}"
    height: "clamp(16px, 1.8vw, 22px)"
  rack-base:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.base}"
    height: "clamp(18px, 2vw, 26px)"
  test-tube:
    width: "clamp(46px, 8vw, 108px)"
  start-sticker:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    typography: "{typography.label}"
    rounded: "{rounded.round}"
    size: "66px"
  start-sticker-phone:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.round}"
    size: "44px"
  placeholder-chip:
    backgroundColor: "{colors.play-2}"
    textColor: "{colors.play-9}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "2px 8px"
  note-head:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  note-swatch:
    rounded: "{rounded.swatch}"
    size: "10px"
---

# Design System: Designing Your Life

## Overview

**Creative North Star: "The Specimen Rack"**

Every life area is a specimen: a clean glass test tube standing in one white lab rack against a cool pale wall, filled with its own color to exactly its score. The world is a tidy, well-lit bench, not a lab report. It is clean but fun: flat white objects with soft shadows, saturated liquids that slosh and bubble, one heavy grotesque doing all the talking, and a round black sticker that says where to start. Nothing on the page asks for input; it only shows.

Density is low and the page reads in one pass: a heavy title and a short summary, then the rack, then one note per area. Every block shares a single measure so left edges line up. Color comes only from the four area ladders; everything else is wall, white, and ink. Hierarchy comes from weight and size inside one family, never from extra faces or decoration.

Two directions were explicitly rejected by the owner and stay rejected: a form-based app (inputs, autosave, chapter nav), and a cream-paper editorial look (serif type, a centered card, inline rating meters).

**Key Characteristics:**
- Cool pale wall, flat white objects, soft diffuse shadows.
- Four owned area hues, each a ten-step ladder from pale tint to deep shade.
- Gauges are liquid in glass: continuous fill, no ticks, no step names.
- One family, Bricolage Grotesque, carrying hierarchy through weight 800 against 400.
- Gentle, physical motion: drop, fill, slosh, rise; still and legible with motion off.
- Display only.

## Colors

A neutral cool-grey room in which only the four life areas are allowed to have color.

### Primary
- **The four area ladders** (`health-*`, `work-*`, `play-*`, `love-*`): Health is a fresh mint-to-forest green, Work a clear periwinkle-to-navy blue, Play a marigold-to-umber, Love a coral-to-oxblood. Each runs from step 1 (palest tint) to step 10 (deepest shade). The owner approved these hues and ladders; they are fixed. An area's color always comes from its own ladder and from nowhere else.

Step roles, as built:
- **Step 4**: the back wave of the liquid, and (at 14% in white) the wash that fills the empty part of the tube.
- **Steps 5 to 7**: the liquid's top-to-bottom gradient.
- **Step 6**: the solid swatch beside an area's note head, and the focus ring hue (Work 6).
- **Step 2 with step 9 text**: tinted chips (the Play placeholder chip).
- **Step 3**: text selection highlight (Play 3).

### Neutral
- **Cool Pale Wall** (`wall`): the page background everywhere. Never white, so the white objects can stand on it.
- **Bench White** (`card`): the rack's bar, posts and base, and the sticker's text. White is for objects, not for the page.
- **Lab Ink** (`ink`): all primary text, the score numerals, and the Start-here sticker's fill.
- **Soft Ink** (`ink-soft`): lede, colophon, and other secondary text. The owner removed the check-in date line; don't bring it back.
- **Faint Ink** (`ink-faint`): the scrollbar thumb only; not used for text.

### Named Rules
**The Four Ladders Rule.** Color on the page belongs to Health, Work, Play, or Love, drawn from that area's own ten-step ladder. There is no brand accent and no fifth hue; the wall, white, and ink are the only colorless roles.

**The Step Roles Rule.** Use the ladder by role, not by taste: liquid 5 to 7, back wave 4, empty glass 14% of 4 in white, swatch 6, chip 2 with 9 text. A new surface that needs an area color reaches for one of these roles first.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Bricolage Grotesque (same stack)

**Character:** One variable grotesque, self-hosted (weights 200 to 800, optical sizing on), with quirky, slightly flared shapes that read friendly at 800 and calm at 400. Weight does the hierarchy: 800 for anything that should be seen from across the room, 400 to 500 for anything that is read.

### Hierarchy
- **Display** (800, clamp(2.75rem, 7vw, 5.75rem), 0.92, -0.018em, balanced wrap): the page title, top left. One per page.
- **Headline** (800, clamp(2rem, 4.4vw, 3.75rem), 0.85, -0.04em, tabular lining figures): the score numeral under each tube. The percent sign is set small (clamp(0.875rem, 1.4vw, 1.25rem)) and top-aligned beside it.
- **Title** (800, clamp(1rem, 1.8vw, 1.5rem), 1, -0.02em): the area name under each tube.
- **Lead** (500, 1.25rem, 1.35, about 34ch, with 800 for named areas): the summary line that says where there is most room to grow and what is strongest. 1.125rem on phone.
- **Body** (400, 16px, 1.55, pretty wrap): the area notes. The lede sits at 1.0625rem in Soft Ink, about 40ch.
- **Meta** (400, 0.875rem, tabular figures, Soft Ink): colophon.
- **Label** (700, 0.8125rem, 0.06em, uppercase): the area name heading each note, always led by its 10px area swatch. The placeholder chip and the sticker use the same uppercase voice at 0.75rem and 0.8125rem with 0.04em tracking.

### Named Rules
**The Weight Carries It Rule.** Hierarchy comes from weight 800 against 400 within one family. No second typeface, no serif, no italic display; italic is reserved for book titles in `cite`.

**The Tabular Numbers Rule.** Every score uses tabular figures so numbers sit still when content changes.

## Layout

One shared measure (1040px content, plus a fluid gutter of clamp(16px, 4vw, 56px) each side) for every block: masthead, rack, notes, and colophon all share the same left and right edges. Rhythm uses one fluid gap (clamp(14px, 1.8vw, 28px)), doubled between masthead columns; vertical breathing room is fluid in vh (masthead top clamp(32px, 6vh, 72px), notes top clamp(32px, 5vh, 56px), colophon top clamp(40px, 8vh, 88px)).

- **Desktop (1040px and up):** masthead is two columns (1.4fr title, 1fr side text) aligned to the bottom; notes are four columns under their own tubes.
- **Tablet (1039px and down):** masthead stacks; notes go to two columns.
- **Phone (719px and down):** notes stack to one column. The rack stays whole: four tubes in a row, never wrapped or scrolled.

There is no primary action and no navigation on the current page.

**The One Measure Rule.** Every block on a page uses the same measure and gutter, so all left edges line up. A new section joins the measure; it does not invent its own width.

## Elevation & Depth

Depth is soft and physical: white objects sit slightly off the wall with a diffuse two-layer shadow, glass is drawn rather than shadowed, and stacking order does structural work. There are no borders on surfaces and no hard or offset shadows.

### Shadow Vocabulary
- **Object** (`box-shadow: 0 1px 1px rgb(27 26 34 / 0.06), 0 10px 24px -12px rgb(27 26 34 / 0.28)`): every white rack part (bar, posts, base). The default for any white object on the wall.
- **Sticker** (`box-shadow: 0 2px 3px rgb(27 26 34 / 0.18), 0 8px 16px -6px rgb(27 26 34 / 0.35)`): the Start-here sticker, which sits a little higher than the rack.
- **Contact** (radial gradient of `rgb(27 26 34 / 0.22)` to transparent, 8px tall ellipse): where a tube's round bottom touches the base.

### Named Rules
**The Behind-the-Bar Rule.** The rack's top bar, posts and base sit behind the tubes (rack parts at the bottom layer, tubes above, the sticker on top), so no part of the rack ever covers a liquid level. Any new object that shares space with a gauge goes behind it.

## Shapes

Soft-cornered rectangles for objects, true circles for marks. Rack bar 6px, base 8px, posts 4px, note swatch 2px; chips are full pills; the sticker is a perfect circle tilted about 12 degrees (toward the page interior; -8 degrees on phone). The tube is a straight glass with a round bottom, drawn in SVG: translucent ink wall (24% ink, 3 units) and a heavier lip (4.5 units), a white shine streak, and an inside clipped to the glass.

## Components

### Test Tube Gauge (signature)
The gauge for any 0 to 100 score. A 64 by 220 unit SVG scaled to clamp(46px, 8vw, 108px) wide.
- **Fill:** the liquid surface sits at a continuous height for the score, from empty to the brim. Liquid is a vertical gradient from step 5 to step 7, with a step-4 back wave just behind the front surface. The empty glass above is a 14% wash of step 4 in white.
- **Life:** two waves slosh sideways (7s and 11s, opposite directions); three white bubbles rise slowly (4.2 to 6.8s) when the liquid is deep enough.
- **Reduced motion:** waves and bubbles are removed and the surface is drawn still with a slight concave meniscus.
- **Forced colors:** liquid, wall and lip render in CanvasText.
- **Semantics:** the glass carries `role="meter"`, 0 to 100, labelled by the area name, with value text like "58% full".

**The Fullness Is the Picture Rule.** A gauge shows fullness visually: continuous fill, with no tick marks, step labels, or per-level names. The only number is the score set under the gauge.

### Rack
The white stand that holds all four tubes together: a top bar across the full measure, a post at each end, and a base the tubes stand on, each a white object with the Object shadow. Tubes sit in a four-column grid and stand directly on the base with a contact shadow. Under each tube: area name (Title) and score (Headline). Areas always appear in the book's order: Health, Work, Play, Love.

### Start-here Sticker
A round Lab Ink disc (66px, 44px on phone) with "Start / here" in white uppercase at 800. It marks the lowest-scoring area only. It sits beside that tube's lip, on the outside right (mirrored to the left for the last tube), never over the glass; on phone it sits centered just above the lip.

### Chips
- **Placeholder chip:** Play step 2 pill with Play step 9 text, 0.75rem, 700, 0.04em uppercase, 2px 8px padding. Appears in the masthead only while content is placeholder, alongside a plain-text placeholder line in the colophon.

### Area Note
A column of prose explaining one area's score. Head: the area name in the Label voice, led by a 10px step-6 swatch with 2px corners. Body: Body text in Ink. Notes follow the rack's area order and columns.

### Focus
Any focusable element gets a 2px Work step 6 outline at 3px offset with 4px corners.

### Motion
On load (motion allowed), each tube drops 48px into the rack (700ms, cubic-bezier(0.16, 1, 0.3, 1), 110ms stagger), then its liquid fills from empty to the score (1600ms, cubic-bezier(0.25, 1, 0.5, 1), starting at 800ms, 140ms stagger). The page renders in its final state; animation only plays from a starting pose, so nothing is ever hidden.

## Do's and Don'ts

### Do:
- **Do** set every block on the shared 1040px measure and fluid gutter.
- **Do** show any 0 to 100 score as a continuous fill (the Test Tube Gauge), with the score as one big tabular numeral under it.
- **Do** keep the four area hues and their ten-step ladders exactly as defined, and use them by step role: liquid 5 to 7, back wave 4, empty wash 14% of 4, swatch 6, chip 2 with 9 text.
- **Do** keep the rack's bar, posts and base behind the tubes so a level is never covered.
- **Do** mark the lowest area with the single black Start-here sticker, beside the lip, never over the glass.
- **Do** render pages as display only, prerendered, with content in `src/lib/content/*.ts` files that Claude edits from chat; a content change is an edit to data, never to layout.
- **Do** give every animated element a still, fully legible reduced-motion state.
- **Do** flag placeholder content on screen until the owner's real answers replace it.

### Don't:
- **Don't** add tick marks, step labels, or per-level names ("low", "thriving", and so on) to a gauge.
- **Don't** add forms, inputs, textareas, edit buttons, save states, or any "fill this in" UI.
- **Don't** introduce a fifth hue or a brand accent; color belongs to the four areas.
- **Don't** let any rack part, sticker, or label overlap a liquid level.
- **Don't** return to the rejected directions: cream paper, serif editorial type, a centered card, or inline rating meters.
- **Don't** put white surfaces on white; the wall is pale grey so white objects can stand on it.
