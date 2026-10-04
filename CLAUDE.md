# Designing Your Life — problem statement

No code exists yet. This file describes the problem, not a solution — don't scaffold
a stack or a file structure from it without checking first; two attempts at that
already got rejected (see below).

## What this is for

A personal website, for one person (the owner), that presents their own answers to
the exercises in _Designing Your Life_ (Bill Burnett & Dave Evans). Starting scope is
just the first exercise set, "Start Where You Are": the Health/Work/Play/Love
check-in, Workview & Lifeview, and the Good Time Journal. Nothing beyond that is
in scope until asked for.

## The actual shape of the problem

The owner does **not** want to write or edit anything inside the website itself —
no forms, no textareas, no "fill this in" UI. They give their answers by talking
them through (here, in conversation), and the website's only job is to **display**
that content well. So this is a publishing/presentation problem, not an input/data
problem: there is no form to design, no persistence layer to build, no save state to
manage. Whatever stores the content between conversations just needs to be something
Claude can edit from chat — it is not a UI concern.

The part that actually matters is that the output looks good. Two visual attempts
so far were both rejected:

1. A form-based app (textareas, IndexedDB, autosave indicators, a left nav across
   chapters) — rejected for being the wrong shape entirely (see above: no forms).
2. A static read-only redesign (warm paper/editorial look: cream background,
   serif type, a centered card, inline rating meters) — rejected on pure visual
   taste ("looks like ugly as fuck" / "I don't like any of this"), with no specifics
   given on what would look better.

Take neither as a direction to iterate from. The brief, as given, is "a nice looking
output" — that's it. No aesthetic reference, mood, or example has been supplied.

## Open questions worth asking before building again

- What does "nice looking" mean to the owner, concretely? Worth asking for a
  reference — a site, an app, a style — rather than guessing a third time.
- Does this need to be a built app at all, or would a well-designed static document
  (e.g. a single polished page, or even something like a nicely typeset PDF) satisfy
  "nice looking output" with far less code than a framework app implies?
- How does content actually get from "the owner said it in chat" into the published
  page — hand-edited by Claude each time, or something else?

## Tooling available, not yet used meaningfully

The **Impeccable** Claude Code plugin (`pbakaus/impeccable`, https://impeccable.style/)
is installed (via `/plugin`, marketplace `pbakaus/impeccable`) for design critique —
automated checks against generic "AI slop" UI defaults. It needs a Claude Code
session restart to be loadable as a skill (it was installed mid-session). It's a
polish/critique pass on existing UI, not a source of visual direction — it won't
answer the open questions above.
