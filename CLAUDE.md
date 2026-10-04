# Designing Your Life

A small website where the owner and their girlfriend, Ting, each record and share their
answers to the exercises in _Designing Your Life_ (Bill Burnett & Dave Evans). It is public: anyone with the link, and the GitHub repo is public too.

Built so far: a landing/contents page at `/`, the **"Start Where You Are"** dashboard
(Health / Work / Play / Love) at `/start-where-you-are/`, and `/sign-in/`. Each person
keeps their own dashboard (see "How content works"). It is live at https://designing-your-life.pinkoa2.lol (GitHub Pages, deployed on
every push to `main`). Nothing else is in scope until the owner asks.

Read these before design work:
- `PRODUCT.md` covers the product truth: users, purpose, stack, constraints.
- `DESIGN.md` and `.impeccable/design.json` hold the design system. They were derived
  from the shipped page; follow them on every new page.
- `.impeccable/surfaces/` holds each page's direction contract: the landing/contents
  page (`src-routes-page-svelte.md`) and the check-in (`src-routes-start-where-you-are-page-svelte.md`).

## How content works (changed 2026-10-04)

The site is no longer display-only. Each person has an account and edits their own
dashboard in the site. Answers live in **Supabase** (project `swulxuvvhociubtwstkx`,
US East), not in content files.

- **Accounts:** invite-only. Sign-up is disabled in Supabase, and people are added in
  Authentication → Users ("Create new user", auto-confirm). They sign in with an emailed
  link (`/sign-in/`). There are currently two people: Alex (the owner) and Ting.
- **Sharing:** every dashboard is public read-only by link, `?u=<user id>`, and the ID is
  carried on every page link (`withPerson()` in `src/lib/viewing.svelte.ts`). Nothing lists
  dashboards; the owner wants link-only, with no directory.
- **Editing (owner only, signed in):** "Edit my gauges" edits all four tubes together (drag
  the centered handle, or type the number). Each note has its own Edit / Write button and
  edits in place. Both actions save straight to Supabase.
- **Database:** `supabase/schema.sql` creates `profiles` and `answers` with RLS. Anonymous
  visitors can only call `get_dashboard(uuid)` and have no table access; owners write only
  their own rows. Display names live in `public.profiles.display_name`, set with SQL for
  now.
- `src/lib/content/start-where-you-are.ts` now holds only the defaults (25/50/75/100)
  and the per-area writing prompts. The owner's original answers are kept in
  `answers.json`.
- Only the publishable key is in the repo (`src/lib/supabase.ts`). Never commit the
  secret/service_role key or the database password.

## Stack and commands

SvelteKit 3 + Svelte 5 with `@sveltejs/adapter-static`; every page is prerendered to
plain HTML. Node 24 comes from mise.

```sh
npm run dev              # http://localhost:5173 (add `-- --host` for phone on the LAN: http://10.0.0.250:5173)
npm run build            # static site in build/
npm run check            # svelte-check, must be 0 errors
```

SvelteKit 3 differs from SvelteKit 2 in ways that tripped up the port:
- Kit config goes in `vite.config.ts` as `sveltekit({ adapter: adapter() })`. There
  is **no `svelte.config.js`**.
- `$lib` is removed. Use **`#lib/...`**, mapped via `"imports"` in `package.json`.
  Import TS modules **with the `.ts` extension** (`#lib/content/start-where-you-are.ts`),
  or svelte-check can't resolve them.
- `tsconfig.json` extends `"$app/tsconfig"`, not `./.svelte-kit/tsconfig.json`.

Layout:
- `src/app.css`: global tokens (wall, ink, the four 10-step area ladders), the base,
  and `.measure`, the shared 1040px width that every block sits on.
- `src/lib/components/TestTube.svelte`: one SVG tube filled to `score`, with a sloshing
  wave, bubbles, and a still meniscus under reduced motion.
- `src/lib/components/TubeRack.svelte`: the rack, the labels, the "Start here"
  sticker, and the load animation (tubes drop in, then fill).
- `src/routes/+page.svelte`: the landing page, with the book's real cover (`BookCover.svelte`,
  `static/images/designing-your-life-cover.jpg` from Open Library, credited to Knopf in the
  footer; the owner rejected tubes on the cover and then a plain blue drawn one) beside a numbered contents list of all 12
  chapters. Finished exercises are white cards; the rest are "Not yet" rows.
- `src/routes/start-where-you-are/+page.svelte`: the check-in. It has a link back to all
  exercises, then the masthead, rack, notes and colophon.
- `src/lib/content/exercises.ts`: the chapter list. Give an exercise an `href` once its
  page exists. The list was written from memory, so check it against the book.
- Each page builds to its own folder (`trailingSlash = "always"`), so links end in `/`.
- `static/fonts/`: self-hosted Bricolage Grotesque variable font (opsz/wdth/wght).

## Design decisions the owner made (don't undo)

- **Gauges show fullness visually**, like a liquid level. Use no step numbers, tick
  labels, or per-level names; the owner rejected a 10-chip paint ladder for this.
- **Test tubes in a single rack.** The rack's top bar sits **behind** the tubes so it
  never covers a level; the owner flagged this.
- **The four area colors are approved**: Health green, Work blue, Play marigold, Love
  coral, each a 10-step ladder.
- **No "Checked in on <date>" line.** The owner removed it.
- The lowest area gets the black "Start here" sticker. On phone it sits centered
  above that tube's lip.
- Rejected before this build: a form app with textareas and autosave, and a
  cream/serif editorial card layout ("ugly"). Don't drift back toward either.

How the look was reached: Impeccable's direction round offered several cards, and the
owner picked "Paint Chip Cards". The owner then iterated: paint chips, then a glass,
then a test tube on cards, then four tubes in one rack. Earlier versions are saved
in `.impeccable/snapshots/` (`tubes-in-cards/`, `plain-html-rack/`) for reverting.

## Open questions

- **Future exercises** each get their own page at `/<slug>/`, listed on the contents
  page at `/` (decided). Use the arrow in `Arrow.svelte` for links, never a text arrow
  character.
- The check-in is meant to be repeated over time. If the owner does a second one,
  decide whether to keep a history and compare check-ins.

## Tooling notes

- The **Impeccable** plugin (`/impeccable:impeccable`) drove this build: init, the
  direction round, the craft floor, the detector, the finish reviewer, and the
  documenter. Its design hook auto-scans UI files on edit.
- Screenshots: headless Chrome is at `/usr/bin/google-chrome`. Use
  `--headless=new --force-prefers-reduced-motion --window-size=W,H --screenshot=...`.
  Serve `build/` with a **fresh** server per build. A long-running `vite preview`
  kept serving stale asset hashes after a rebuild and produced black screenshots.
- To test edge cases (for example a different lowest area), build a throwaway copy in
  the scratchpad. Never change the real content file just to take a screenshot.
- Git: local only so far; the owner will add a remote later. Commit only when asked.
