---
version: 1
slug: "src-routes-page-svelte"
primary_target: "src/routes/+page.svelte"
related_targets: []
---

# Surface: Landing / contents (src/routes/+page.svelte)

Mode: Read. A visitor (the owner or a friend) lands, sees which book this is about, and opens a finished exercise. The world is inherited from DESIGN.md, so this surface decided only its structure.

## Direction contract

THESIS: The site's contents page, laid out like a lab notebook: a drawn book cover beside a numbered contents list of the book's chapters. The finished exercises are real white objects; the rest are quiet "not yet" rows. This replaces a marketing-style hero.

OWN-WORLD: Inherited unchanged: the #E9ECEE wall, white objects with soft shadows, the four area ladders, and Bricolage Grotesque. The cover is the book's real published cover (static/images/designing-your-life-cover.jpg, 352×500, from Open Library, © Alfred A. Knopf; origin embedded in the file), credited in the colophon. It is shown as a wall object with a spine fold and soft shadow, capped at its native 352px. The owner rejected test tubes on the cover and then a plain blue drawn cover. The page h1 is visually hidden because the cover image carries the title.

STORY: The visitor understands that this is one person's working through Designing Your Life, sees how far they've got, and taps into a finished exercise.

FIRST VIEWPORT: On desktop, the cover sits in the left column (5/12) and stays in place while scrolling. On the right: the lede, a big "Contents" heading, the chapter 1 card (Start Where You Are, Health / Work / Play / Love Dashboard, four score swatches, an arrow), then chapters 2–12 as ruled rows marked "Not yet". Below 900px, a small cover (about 34% of the width, max 220px) sits beside the lede, with the contents list right under both, so the list starts in the first screen. The owner found a tall left-aligned cover on phone looked off.

FORM: Lab Notebook Index, from the surface roll (seed key 913a5d68), chosen by the owner over The Journey Line and Exercise Shelf. Motion: the done card lifts slightly on hover, and its arrow nudges.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
