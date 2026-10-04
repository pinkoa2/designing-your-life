# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

SvelteKit 3 + Svelte 5 with adapter-static, so every page is prerendered to plain HTML and hosted on GitHub Pages (the owner's choice, 2026-10-04, replacing plain HTML/CSS). Answers and accounts live in Supabase (free plan, US East); the browser talks to it directly with the public key. Shared pieces are Svelte components under `src/lib/components/`. Each exercise gets its own page, listed on a contents page at `/` (decided). Commands: `npm run dev` (localhost:5173), `npm run build` (output in `build/`), `npm run check`.

## Users

The owner (Alex) and their girlfriend Ting, working through _Designing Your Life_ (Bill Burnett & Dave Evans) together: Alex in Boston, Ting in Taiwan. Each keeps their own answers and shares a link with the other, and with anyone else they choose. Accounts are invite-only, but could expand to more people later. Both use it on laptop and phone.

## Product Purpose

Each person records and shares their own answers to the book's exercises. It starts with "Start Where You Are": the Health / Work / Play / Love dashboard. Each area gets a 0–100% gauge score and a short note explaining the score. Together they show where that person most needs work. Success means they open it, want to keep it up, and are happy to share their link.

## Positioning

A small, personal, shareable record of a couple's life-design work through one book. It is not a public directory or a social network (dashboards are reachable only by shared link), and it is not a habit tracker.

## Operating Context

Each person signs in with an emailed link and edits their own dashboard on the page itself. Everyone else, signed in or not, sees it read-only through a `?u=<id>` share link that stays with them as they browse that person's pages. The site is public by the owner's choice, with no privacy needs beyond unguessable links. Claude can still help word a note in chat, but the answers are saved through the site, not in files. Further book chapters (for example Workview/Lifeview and the Good Time Journal) get their own pages, but only when the owner asks.

## Capabilities and Constraints

- Editing happens inline on the page itself: drag a tube, type a number, and edit a note in place. There are no separate form screens; an early form-app attempt was rejected. Each person edits only their own dashboard (decided 2026-10-04, when the site became shared).
- The four areas are always Health, Work, Play, and Love, in the book's terms.
- Each area has a percentage score (0–100) and a short note, a few sentences long.
- The brief is "clean but fun". Two earlier visual attempts were rejected: a form app, and a cream/serif editorial card layout.

## Evidence on Hand

Real answers live in Supabase, entered by each person. The owner's first answers are also kept in `answers.json`. A new dashboard shows defaults (25/50/75/100) with writing prompts; never invent real-sounding personal answers.

## Product Principles

1. Each person's words come first. The page exists to frame what they said, not to explain the book.
2. The gaps should be obvious at a glance. The lowest area should be impossible to miss.
3. The owner should be comfortable showing it to a friend: personal and candid, never clinical.
4. Editing stays inline and light: no separate form screens.
5. Share by link only; never list or broadcast dashboards.
