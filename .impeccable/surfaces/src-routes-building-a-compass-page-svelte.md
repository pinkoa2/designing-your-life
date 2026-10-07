---
version: 1
slug: "src-routes-building-a-compass-page-svelte"
primary_target: "src/routes/building-a-compass/+page.svelte"
related_targets: ["src/lib/components/Compass.svelte","src/lib/components/CompassPage.svelte"]
---

# Surface: Building a Compass (src/routes/building-a-compass/+page.svelte)

Mode: Read. The owner, Ting, or a friend with the link reads one person's Workview and Lifeview essays and how the two fit together. The world is inherited from DESIGN.md; this surface decides structure and the compass. The signed-in owner edits everything in place, like the dashboard. Answers live in Supabase (`public.compasses`, one row per person, read by `get_compass(uuid)`).

## Direction contract

THESIS: The page is one working compass and the writing behind it. Two needles, Work and Life, each set by hand by the owner; the wedge between them is the gap the essays reveal, shown honestly and without warning colors or numbers. The person's North Star line sits where N would be. This refuses the category default of a journaling form with stacked textareas.

OWN-WORLD: Inherited: #E9ECEE wall, white objects with the Object shadow, Bricolage Grotesque, weight 800 against 400. The dial is a white disc on the wall. The Work needle uses the Work ladder (5 to 7); the Life needle uses the Love ladder (5 to 7), coral against blue; the owner rejected an ink Life needle. The gap wedge is a faint ink hatch. Cardinal marks are small dots; a drawn four-point diamond star replaces N. There are no degrees or tick labels.

STORY: The visitor sees where this person's work and life point and how far apart they are, reads the two essays, then reads the three answers on where the views complement, where they clash, and which one leads.

FIRST VIEWPORT: Title top left with the whose-answers row and a short lede on the right, as on the dashboard. Below that, centered: the North Star sentence in heavy type under a small drawn star, then the dial at about 480px (most of the width on phone), its needle labels at the tips. The essays (two columns, stacked on phone) begin below the fold, then the three numbered questions. There is no primary action; the owner's "Edit compass" sits above the dial.

FORM: Compass on top, then essays, then questions. Structure #4 on the grounded list, dealt as THE ROLL (seed key f63785d3), reordered at the owner's request so the essays always come before the questions. Signature motion: on load the needles start at the star and swing out to their bearings with a damped spring, then keep a faint tremble; the three questions are plain question-and-answer with no small dials (the owner removed them on 2026-10-07). Needles have a short pale counterweight tail; unset needles wait at the star with no wedge. With reduced motion the needles appear in place, still.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
