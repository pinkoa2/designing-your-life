---
name: Designing Your Life
description: Each person's answers to the Designing Your Life exercises, set out as clean, playful lab objects on a pale wall.
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
  section:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  star-line:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  question:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.3vw, 1.75rem)"
    fontWeight: 800
    lineHeight: 1.1
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
  essay:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  prompt:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.4
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
  dial-label:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 800
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
  whose-name:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  pill:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  pill-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "10px 18px"
  pill-small:
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  compass-dial:
    backgroundColor: "{colors.card}"
    rounded: "{rounded.round}"
    width: "min(440px, 100%, max(300px, calc(100svh - 450px)))"
  lead-chip-work:
    backgroundColor: "{colors.work-2}"
    textColor: "{colors.work-9}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
  lead-chip-life:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.card}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
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
- Read-only for visitors; the signed-in owner edits in place on the same page.
- One drawn instrument per exercise: the test tube for a score (chapter 1), the compass dial for a bearing (chapter 2).

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
- **Steps 5 and 7 with a step-2 tail**: a compass needle's two lit faces and its pale counterweight (the Work needle).

### Neutral
- **Cool Pale Wall** (`wall`): the page background everywhere. Never white, so the white objects can stand on it.
- **Bench White** (`card`): the rack's bar, posts and base, and the sticker's text. White is for objects, not for the page.
- **Lab Ink** (`ink`): all primary text, the score numerals, and the Start-here sticker's fill.
- **Soft Ink** (`ink-soft`): lede, colophon, and other secondary text. The owner removed the check-in date line; don't bring it back.
- **Faint Ink** (`ink-faint`): the scrollbar thumb and disabled pill text; not used for running text.
- **Ink tints** (Lab Ink at low alpha, not separate tokens): on the compass, the inner ring (8%), the dot marks (20%, 34% for the four cardinal dots), the gap wedge (4.5% fill under a 20% ink hatch), and the "neither leads" chip (8%). Dashed edit outlines are 28% ink, 50% on hover.

### Named Rules
**The Four Ladders Rule.** Color on the page belongs to Health, Work, Play, or Love, drawn from that area's own ten-step ladder. There is no brand accent and no fifth hue; the wall, white, and ink are the only colorless roles.

**The Step Roles Rule.** Use the ladder by role, not by taste: liquid 5 to 7, back wave 4, empty glass 14% of 4 in white, swatch 6, chip 2 with 9 text. A new surface that needs an area color reaches for one of these roles first.

**The Life Is Coral Rule.** On the compass, Life borrows the Love ladder by the owner's choice (2026-10-07: "I don't want black for the life"): Love 5 and 7 for its needle faces, Love 2 for its tail, Love 6 for its swatch, handle and the selected "Life leads" choice, Love 7 for its label, and a Love 2 chip with Love 9 text. Work keeps the Work ladder, so the two needles are blue against coral. No fifth hue is added.

## Typography

**Display Font:** Bricolage Grotesque (with ui-sans-serif, system-ui, sans-serif)
**Body Font:** Bricolage Grotesque (same stack)

**Character:** One variable grotesque, self-hosted (weights 200 to 800, optical sizing on), with quirky, slightly flared shapes that read friendly at 800 and calm at 400. Weight does the hierarchy: 800 for anything that should be seen from across the room, 400 to 500 for anything that is read.

### Hierarchy
- **Display** (800, clamp(2.75rem, 7vw, 5.75rem), 0.92, -0.018em, balanced wrap): the page title, top left. One per page.
- **Headline** (800, clamp(2rem, 4.4vw, 3.75rem), 0.85, -0.04em, tabular lining figures): the score numeral under each tube. The percent sign is set small (clamp(0.875rem, 1.4vw, 1.25rem)) and top-aligned beside it.
- **Title** (800, clamp(1rem, 1.8vw, 1.5rem), 1, -0.02em): the area name under each tube.
- **Section** (800, clamp(2rem, 4.4vw, 3.25rem), 0.95, -0.03em): a heading that opens a second part of a page ("How they fit together"). Smaller than Display, at most one or two per page.
- **Star line** (800, clamp(1.5rem, 3vw, 2.25rem), 1.08, -0.02em, balanced wrap, about 30ch, centered; left-aligned on phone): the person's North Star sentence on the compass page, under a 20px drawn ink star that serves as its heading. It is the one heavy sentence a person writes themselves.
- **Question** (800, clamp(1.25rem, 2.3vw, 1.75rem), 1.1, -0.02em, balanced wrap): an exercise question set as a heading over its answer.
- **Lead** (500, 1.25rem, 1.35, about 34ch, with 800 for named areas): the summary line that says where there is most room to grow and what is strongest. 1.125rem on phone.
- **Body** (400, 16px, 1.55, pretty wrap): the area notes. The lede sits at 1.0625rem in Soft Ink, about 40ch.
- **Essay** (400, 1.0625rem, 1.6, at most 62 to 68ch, 0.85em between paragraphs): long answers, such as the Workview and Lifeview essays and the compass questions' answers. Short notes stay at Body.
- **Prompt** (500, 1.125rem, 1.4, italic, Soft Ink): the writing prompt shown in place of an empty Star line, and that field's placeholder. Empty notes and essays use their own size in italic Soft Ink.
- **Meta** (400, 0.875rem, tabular figures, Soft Ink): colophon.
- **Label** (700, 0.8125rem, 0.06em, uppercase): the area name heading each note, always led by its 10px area swatch. The placeholder chip and the sticker use the same uppercase voice at 0.75rem and 0.8125rem with 0.04em tracking.
- **Dial label** (800, 15 units in the dial's 400-unit view box, 0.06em, uppercase): "Work" and "Life" at the needle tips, in Work 7 and Love 7. It scales with the dial (about 16px at full size, about 11px at its smallest), so it is set in SVG units rather than rem.

### Named Rules
**The Weight Carries It Rule.** Hierarchy comes from weight 800 against 400 within one family. No second typeface, no serif, no italic display; italic is reserved for book titles in `cite`.

**The Tabular Numbers Rule.** Every score uses tabular figures so numbers sit still when content changes.

## Layout

One shared measure (1040px content, plus a fluid gutter of clamp(16px, 4vw, 56px) each side) for every block: masthead, rack, notes, and colophon all share the same left and right edges. Rhythm uses one fluid gap (clamp(14px, 1.8vw, 28px)), doubled between masthead columns; vertical breathing room is fluid in vh (masthead top clamp(32px, 6vh, 72px), notes top clamp(32px, 5vh, 56px), colophon top clamp(40px, 8vh, 88px)).

- **Desktop (1040px and up):** masthead is two columns (1.4fr title, 1fr side text) aligned to the bottom; notes are four columns under their own tubes.
- **Tablet (1039px and down):** masthead stacks; notes go to two columns.
- **Phone (719px and down):** notes stack to one column. The rack stays whole: four tubes in a row, never wrapped or scrolled.

There is no primary action and no navigation on the current page.

**Compass page:** the same masthead (Display title left, whose-answers row and Lead-size lede right). Below it, one centered column: the Star line, then the dial at min(440px, 100%, max(300px, 100svh - 450px)) so it fits in the first view on short laptops (min(400px, 100%) on phone). Essays sit in two equal columns (gap clamp(32px, 4vw, 64px)) from clamp(56px, 10vh, 112px) below, stacking on phone. Then the Section heading and the three questions as an FAQ accordion across the full measure, lining up with both essays: a separate white card per question (Object shadow, 8px corners, 12px apart), each (600, clamp(1.0625rem, 1.7vw, 1.25rem), lighter than headings by the owner's request) with a drawn down chevron that flips up when open, and the answer sliding open below (320ms; instant with reduced motion). All questions start closed; the owner's Edit button sits at the top right of an open answer.

**The One Measure Rule.** Every block on a page uses the same measure and gutter, so all left edges line up. A new section joins the measure; it does not invent its own width.

## Elevation & Depth

Depth is soft and physical: white objects sit slightly off the wall with a diffuse two-layer shadow, glass is drawn rather than shadowed, and stacking order does structural work. There are no borders on surfaces and no hard or offset shadows.

### Shadow Vocabulary
- **Object** (`box-shadow: 0 1px 1px rgb(27 26 34 / 0.06), 0 10px 24px -12px rgb(27 26 34 / 0.28)`): every white rack part (bar, posts, base). The default for any white object on the wall.
- **Sticker** (`box-shadow: 0 2px 3px rgb(27 26 34 / 0.18), 0 8px 16px -6px rgb(27 26 34 / 0.35)`): the Start-here sticker, which sits a little higher than the rack.
- **Dial** (`box-shadow: 0 1px 1px rgb(27 26 34 / 0.06), 0 18px 40px -18px rgb(27 26 34 / 0.34)`): the full-size compass, a larger white object standing further off the wall.
- **Handle** (`filter: drop-shadow(0 2px 3px rgb(27 26 34 / 0.3))`): the round drag handles on the compass in edit mode.
- **Contact** (radial gradient of `rgb(27 26 34 / 0.22)` to transparent, 8px tall ellipse): where a tube's round bottom touches the base.

### Named Rules
**The Behind-the-Bar Rule.** The rack's top bar, posts and base sit behind the tubes (rack parts at the bottom layer, tubes above, the sticker on top), so no part of the rack ever covers a liquid level. Any new object that shares space with a gauge goes behind it.

## Shapes

Soft-cornered rectangles for objects, true circles for marks. Rack bar 6px, base 8px, posts 4px, note swatch 2px; chips are full pills; the sticker is a perfect circle tilted about 12 degrees (toward the page interior; -8 degrees on phone). The tube is a straight glass with a round bottom, drawn in SVG: translucent ink wall (24% ink, 3 units) and a heavier lip (4.5 units), a white shine streak, and an inside clipped to the glass. The compass is a true white disc with a faint inner ring; its needles are long slim diamonds, split down the middle so one face catches the light, with a shorter pale tail. The North Star mark is a drawn five-pointed star, never a glyph.

## Components

### Test Tube Gauge (signature)
The gauge for any 0 to 100 score. A 64 by 220 unit SVG scaled to clamp(46px, 8vw, 108px) wide.
- **Fill:** the liquid surface sits at a continuous height for the score, from empty to the brim. Liquid is a vertical gradient from step 5 to step 7, with a step-4 back wave just behind the front surface. The empty glass above is a 14% wash of step 4 in white.
- **Life:** two waves slosh sideways (7s and 11s, opposite directions); three white bubbles rise slowly (4.2 to 6.8s) when the liquid is deep enough.
- **Reduced motion:** waves and bubbles are removed and the surface is drawn still with a slight concave meniscus.
- **Forced colors:** liquid, wall and lip render in CanvasText.
- **Semantics:** the glass carries `role="meter"`, 0 to 100, labelled by the area name, with value text like "58% full".

**The Fullness Is the Picture Rule.** A gauge shows fullness visually: continuous fill, with no tick marks, step labels, or per-level names. The only number is the score set under the gauge.

### Compass Dial (signature, chapter 2)
The instrument for two bearings and the gap between them. A white disc (Dial shadow) drawn in a 400-unit SVG.
- **Face:** a faint 8% ink ring, eight dot marks (the four cardinal dots larger and darker), and a drawn ink star at the top in place of N. No degrees, no tick labels, no compass letters.
- **Needles:** two needles with short counterweight tails on one white hub with an ink center dot. Work: faces Work 5 and Work 7, tail Work 2. Life: faces Love 5 and Love 7, tail Love 2. The leading needle is drawn on top. "WORK" and "LIFE" sit just past each tip in the Dial label voice, nudged apart when the needles are close.
- **Gap:** the wedge between the needles is a faint ink fill under a 45-degree ink hatch. No red, no warning color, no number, no "far apart" caption; the screen-reader description carries the degrees.
- **Unset:** needles that nobody has set rest together at the star at 28% opacity, with no wedge and no labels, and a Label-voice line in Soft Ink under the dial says they aren't set yet.
- **Motion:** on load, needles start at the star and swing out to their bearings with a damped spring (stiffness 70, damping 6.5), then the pair keeps a faint tremble (5.2s, under 1 degree). Under reduced motion they appear in place, still.
- **Edit mode:** a round white handle (Handle shadow, 3px stroke in Work 6 or Ink, with a matching core dot) near each tip. Drag it around the dial, or focus it (`role="slider"`) and use the arrow keys (3 degrees, 15 with Shift; Home returns to the star). Cancel / Save needles sit in the sticky edit bar.
- **Forced colors:** needles, star, hub dot and labels render in CanvasText.

**The Honest Gap Rule.** The distance between two bearings is shown only as a shape: a neutral hatched wedge. It is never colored as a warning, numbered, or captioned with a verdict.

### North Star line
The person's one-sentence summary, set in the Star line voice, centered under a 24px drawn ink four-point star that serves as its heading (left-aligned on phone). Its Edit button sits to the right on the same row. When empty it shows its prompt in the Prompt voice. In edit mode the field keeps the Star line voice, centered, and Enter saves.

### Lead chip
A small uppercase pill (0.75rem, 700, 0.04em) under the "does one drive the other" question saying which leads: Work 2 with Work 9 text for Work, Love 2 with Love 9 text for Life, 8% ink for Neither. In edit mode it becomes three choice pills (white with the Object shadow; the chosen one fills Work 6, Love 6, or Ink for Neither).

### Rack
The white stand that holds all four tubes together: a top bar across the full measure, a post at each end, and a base the tubes stand on, each a white object with the Object shadow. Tubes sit in a four-column grid and stand directly on the base with a contact shadow. Under each tube: area name (Title) and score (Headline). Areas always appear in the book's order: Health, Work, Play, Love.

### Start-here Sticker
A round Lab Ink disc (66px, 44px on phone) with "Start / here" in white uppercase at 800. It marks the lowest-scoring area only. It sits beside that tube's lip, on the outside right (mirrored to the left for the last tube), never over the glass; on phone it sits centered just above the lip.

### Whose-answers row
At the top of the dashboard and the landing page: a Lab Ink pill (0.8125rem, 700, white) naming whose answers these are ("Your dashboard", "Your answers", "Alex's answers"). Next to it, either a quiet text button ("Copy share link", with a link icon) for the owner, or a "VIEW ONLY" label for everyone else.

### Edit affordances
Editing is inline and quiet, never a separate form screen.
- **Text buttons:** "Edit my gauges" sits at the top right of the rack, and each note has its own "Edit" / "Write" button at the right of its heading. They are 0.8125rem, 700, Soft Ink with a small drawn pencil icon, and show a white pill on hover.
- **Gauges in edit mode:** each tube becomes a slider. A centered round handle with up/down chevrons sits on the liquid surface; the big number becomes a typeable field with a dashed underline. A sticky bottom bar holds Cancel / Save gauges.
- **A note in edit mode:** the same text on the same wall, marked by a 1.5px dashed outline that turns solid in the area's step-6 color on focus. Cancel / Save note pills sit underneath it. Empty notes show the area's writing prompt in italic Soft Ink.
- **Pills:** white with the Object shadow for secondary actions, Lab Ink for primary (10px 18px, 0.875rem, 700; the small size is 7px 14px at 0.8125rem).
- **Long fields:** essay editors show a quiet tabular word count in Soft Ink beside Cancel / Save.
- **Shared:** the whose-answers row, the Edit buttons, notes edited in place, pills, the status line and the sticky edit bar are global styles in `src/app.css`, shared by every answers page. A new answers page uses them rather than restyling its own.

### Sign-in page
Minimal by the owner's choice: one narrow column with the heading, one line that mentions the book, an email field, a full-width Lab Ink button, an invite-only note, and a "See an example" link. It has no test tubes and no cover.

### Area Note
A column of prose explaining one area's score. Head: the area name in the Label voice, led by a 10px step-6 swatch with 2px corners. Body: Body text in Ink. Notes follow the rack's area order and columns.

### Focus
Any focusable element gets a 2px Work step 6 outline at 3px offset with 4px corners.

### Motion
On load (motion allowed), each tube drops 48px into the rack (700ms, cubic-bezier(0.16, 1, 0.3, 1), 110ms stagger). The rack starts empty while the answers load: numbers show "–" and the summary line and sticker are hidden. Then each liquid eases up to its score (1400ms, cubic-bezier(0.25, 1, 0.5, 1), 120ms stagger). Default levels are never shown first. While dragging in edit mode, the liquid follows the pointer with no easing.

## Do's and Don'ts

### Do:
- **Do** set every block on the shared 1040px measure and fluid gutter.
- **Do** show any 0 to 100 score as a continuous fill (the Test Tube Gauge), with the score as one big tabular numeral under it.
- **Do** keep the four area hues and their ten-step ladders exactly as defined, and use them by step role: liquid 5 to 7, back wave 4, empty wash 14% of 4, swatch 6, chip 2 with 9 text.
- **Do** keep the rack's bar, posts and base behind the tubes so a level is never covered.
- **Do** mark the lowest area with the single black Start-here sticker, beside the lip, never over the glass.
- **Do** keep editing inline on the page (drag, type, edit in place) and only for the signed-in owner; everyone else gets the same page read-only.
- **Do** give every animated element a still, fully legible reduced-motion state.
- **Do** draw Life on the compass from the Love ladder (coral against Work blue), by the owner's choice.
- **Do** show two bearings and their gap with the Compass Dial: needles from the star, a neutral hatched wedge, labels at the tips.
- **Do** keep pages other than the dashboard quiet: the test tubes belong to the dashboard and the gauge, not to the sign-in page or the book cover.

### Don't:
- **Don't** add tick marks, step labels, or per-level names ("low", "thriving", and so on) to a gauge.
- **Don't** build separate form screens or a form-app layout; editing happens in place.
- **Don't** put test tubes on the book cover or the sign-in page; the owner rejected both.
- **Don't** introduce a fifth hue or a brand accent; color belongs to the four areas.
- **Don't** add degrees, tick labels, compass letters, red, or "far apart" captions to the compass; the gap is a shape, not a score.
- **Don't** let any rack part, sticker, or label overlap a liquid level.
- **Don't** return to the rejected directions: cream paper, serif editorial type, a centered card, or inline rating meters.
- **Don't** put white surfaces on white; the wall is pale grey so white objects can stand on it.
