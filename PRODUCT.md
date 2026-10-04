# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit 3 + Svelte 5 with adapter-static, so every page is prerendered to plain HTML (the owner's choice, 2026-10-04, replacing plain HTML/CSS). Content lives in files under `src/lib/content/`, which Claude edits from chat. Shared pieces are Svelte components under `src/lib/components/`. Commands: `npm run dev` (localhost:5173), `npm run build` (output in `build/`), `npm run check`. Open decision: whether future exercises get their own pages or share one scrolling page. One page per exercise plus a home page was proposed but not confirmed.

## Users

The owner, one person working through _Designing Your Life_ (Bill Burnett & Dave Evans). They want a place where their exercise answers live and look good. They may show it to a few people: a partner, a friend, a coach, or a reading group. It is not public. The owner checks it on laptop and phone equally.

## Product Purpose

The site presents the owner's own answers to the book's exercises. It starts with "Start Where You Are": the Health / Work / Play / Love dashboard. Each area gets a 0–100% gauge score and a short note explaining the score. Together they show where the owner most needs work. Success means the owner opens it and wants to keep it, and isn't embarrassed to show it to someone.

## Positioning

It is a personal, read-only record of one person's life-design check-in. It is not a template, a tool for others, or a habit tracker.

## Operating Context

The owner gives answers by talking them through in conversation with Claude. Claude then edits the content file and the page shows the result. The site itself has no editing, forms, inputs, or saving. Further book chapters (for example Workview/Lifeview and the Good Time Journal) may be added later as new sections, but only when the owner asks.

## Capabilities and Constraints

- Editing happens inline on the page itself: drag a tube, type a number, and edit a note in place. There are no separate form screens; an early form-app attempt was rejected. Each person edits only their own dashboard (decided 2026-10-04, when the site became shared).
- The four areas are always Health, Work, Play, and Love, in the book's terms.
- Each area has a percentage score (0–100) and a short note, a few sentences long.
- The brief is "clean but fun". Two earlier visual attempts were rejected: a form app, and a cream/serif editorial card layout.

## Evidence on Hand

None yet. Scores and notes are placeholders and must be clearly replaceable. Never invent real-sounding personal answers.

## Product Principles

1. The owner's words come first. The page exists to frame what they said, not to explain the book.
2. The gaps should be obvious at a glance. The lowest area should be impossible to miss.
3. The owner should be comfortable showing it to a friend: personal and candid, never clinical.
4. Content changes are edits to data, never to layout.
