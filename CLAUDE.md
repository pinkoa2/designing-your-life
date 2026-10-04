# Designing Your Life

A personal website for one person, the owner, that **displays** their own answers to
the exercises in _Designing Your Life_ (Bill Burnett & Dave Evans). A few people
(partner, friends, a coach) may see it. It is not public.

Built so far is the **"Start Where You Are"** check-in, with the owner's real answers in
place. Nothing else is in scope until the owner asks.

Read these before design work:
- `PRODUCT.md` covers the product truth: users, purpose, stack, constraints.
- `DESIGN.md` and `.impeccable/design.json` hold the design system. They were derived
  from the shipped page; follow them on every new page.
- `.impeccable/surfaces/src-routes-page-svelte.md` is the direction contract for the
  check-in page.

## How content works

The owner never edits anything inside the site: no forms, no inputs, no save state.
They talk their answers through in chat, and Claude writes them into a content file.

The workflow that worked:
1. The owner gives a score and rambles about why.
2. Claude drafts a tighter **first-person note in the owner's voice**, about 60–90
   words. Keep every point they made and add nothing they didn't say.
3. Show the draft and **wait for approval** before writing it in. Mention anything
   left out, such as self-deprecating lines ("I'm kind of a boring person"), and offer
   to put it back.
4. Ask for specifics rather than inventing them. For example, when the owner wanted
   more about their girlfriend, Claude asked prompting questions and used only what
   they answered.
5. When every answer is real, set `placeholder: false`. That hides the "Placeholder
   scores" chip and the colophon line.

Content for the check-in lives in `src/lib/content/start-where-you-are.ts`. The
current answers are Health 80, Work 20, Play 40, Love 70, so Work carries the
"Start here" sticker.

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
- `src/routes/+page.svelte`: masthead, rack, notes, colophon.
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

- **Future exercises** (Workview & Lifeview, Good Time Journal): one page each plus a
  contents page at `/`, or one long scroll? Claude proposed one page per exercise; the
  owner hasn't decided. Design navigation once a second page exists.
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
