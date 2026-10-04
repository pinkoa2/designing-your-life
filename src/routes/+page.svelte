<script lang="ts">
  import Arrow from "#lib/components/Arrow.svelte";
  import BookCover from "#lib/components/BookCover.svelte";
  import { checkin } from "#lib/content/start-where-you-are.ts";
  import { exercises } from "#lib/content/exercises.ts";

  const { areas } = checkin;
</script>

<svelte:head>
  <title>Designing Your Life</title>
  <meta
    name="description"
    content="My answers to the exercises in Designing Your Life by Bill Burnett & Dave Evans, one chapter at a time."
  />
</svelte:head>

<div class="notebook measure">
  <div class="cover">
    <BookCover />
  </div>

  <header class="intro">
    <h1 class="visually-hidden">Designing Your Life</h1>
    <p class="lede">
      My answers to the exercises in <cite>Designing Your Life</cite> by Bill Burnett &amp; Dave Evans,
      one chapter at a time.
    </p>
  </header>

  <main class="index">
    <h2 class="contents-title">Contents</h2>

    <ol class="contents">
      {#each exercises as item (item.chapter)}
        <li>
          {#if item.href}
            <a class="entry is-done" href={item.href}>
              <span class="num">{item.chapter}</span>
              <span class="names">
                <span class="chapter">{item.title}</span>
                {#if item.exercise}<span class="exercise">{item.exercise}</span>{/if}
              </span>
              <span class="scores" aria-label="Scores">
                {#each areas as area (area.id)}
                  <span class="score" style:--swatch="var(--{area.id}-6)">
                    <span class="visually-hidden">{area.name}</span>{area.score}
                  </span>
                {/each}
              </span>
              <span class="go"><Arrow /></span>
            </a>
          {:else}
            <div class="entry">
              <span class="num">{item.chapter}</span>
              <span class="names">
                <span class="chapter">{item.title}</span>
                {#if item.exercise}<span class="exercise">{item.exercise}</span>{/if}
              </span>
              <span class="later">Not yet</span>
            </div>
          {/if}
        </li>
      {/each}
    </ol>
  </main>
</div>

<footer class="colophon measure">
  <p>Exercises from <cite>Designing Your Life</cite> by Bill Burnett &amp; Dave Evans. Cover © Alfred A. Knopf, via Open Library.</p>
</footer>

<style>
  /* Desktop: the cover holds the left column while the intro and contents
     run down the right. */
  .notebook {
    display: grid;
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    grid-template-areas:
      "cover intro"
      "cover index";
    grid-template-rows: auto 1fr;
    column-gap: calc(var(--gap) * 2.5);
    align-items: start;
    padding-top: clamp(32px, 7vh, 80px);
  }

  .cover { grid-area: cover; }
  .intro { grid-area: intro; }
  .index { grid-area: index; }

  .cover {
    position: sticky;
    top: clamp(24px, 5vh, 56px);
  }

  .lede {
    margin: 0 0 clamp(20px, 3vh, 32px);
    max-width: 44ch;
    font-size: 1.25rem;
    line-height: 1.4;
    color: var(--ink-soft);
    text-wrap: pretty;
  }

  .contents-title {
    margin: 0 0 clamp(16px, 2.5vh, 28px);
    font-size: clamp(2rem, 4.4vw, 3.75rem);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.02em;
  }

  .contents {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .entry {
    display: grid;
    grid-template-columns: 2.25em minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 14px;
    padding: 14px 4px;
    border-top: 1px solid rgb(27 26 34 / 0.1);
    color: var(--ink-soft);
  }

  li:last-child .entry { border-bottom: 1px solid rgb(27 26 34 / 0.1); }

  .num {
    font-size: clamp(1rem, 1.8vw, 1.5rem);
    font-weight: 800;
    font-variant-numeric: tabular-nums;
  }

  .names {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .chapter {
    font-size: 1rem;
    font-weight: 700;
    line-height: 1.25;
  }

  .exercise {
    font-size: 0.875rem;
    line-height: 1.35;
  }

  .later {
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  /* The finished exercise is a real object on the wall: a white card. */
  .entry.is-done {
    grid-template-columns: 2.25em minmax(0, 1fr) auto auto;
    margin: 0 0 6px;
    padding: 18px 18px 18px 16px;
    border: 0;
    border-radius: 8px;
    background: var(--card);
    box-shadow: var(--shadow-card);
    color: var(--ink);
    text-decoration: none;
    transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .entry.is-done .chapter { font-size: clamp(1rem, 1.8vw, 1.5rem); font-weight: 800; }
  .entry.is-done .exercise { color: var(--ink-soft); }

  .entry.is-done:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 3px rgb(27 26 34 / 0.08), 0 18px 32px -14px rgb(27 26 34 / 0.38);
  }

  .entry.is-done:focus-visible { outline-offset: 4px; }

  .scores {
    display: flex;
    gap: 10px;
    font-size: 0.875rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  .score {
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }

  .score::before {
    content: "";
    width: 9px;
    height: 9px;
    border-radius: 2px;
    background: var(--swatch);
  }

  .go {
    font-size: 1.25rem;
    font-weight: 700;
    transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .entry.is-done:hover .go { transform: translateX(3px); }

  /* The row under the finished card starts flush, without a doubled rule. */
  li:has(.is-done) + li .entry { border-top: 0; }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .colophon {
    padding-top: clamp(40px, 8vh, 88px);
    padding-bottom: 40px;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }

  .colophon p { margin: 0; }

  /* Phone and tablet: a small cover with the intro beside it, so the
     contents list starts right below instead of after a tall image. */
  @media (max-width: 899px) {
    .notebook {
      grid-template-columns: minmax(96px, 34%) minmax(0, 1fr);
      grid-template-areas:
        "cover intro"
        "index index";
      grid-template-rows: auto auto;
      column-gap: 20px;
      row-gap: 32px;
      align-items: center;
      padding-top: 28px;
    }
    .cover { position: static; max-width: 220px; }
    .lede { margin: 0; }
  }

  @media (max-width: 559px) {
    .lede { font-size: 1rem; }
    .entry.is-done {
      grid-template-columns: 2.25em minmax(0, 1fr) auto;
      row-gap: 10px;
    }
    .scores { grid-column: 2 / 3; grid-row: 2; }
    .go { grid-column: 3; grid-row: 1 / 3; }
  }

  @media (prefers-reduced-motion: reduce) {
    .entry.is-done,
    .go { transition: none; }
  }
</style>
