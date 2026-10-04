<script lang="ts">
  import TubeRack from "#lib/components/TubeRack.svelte";
  import { checkin } from "#lib/content/start-where-you-are.ts";

  const { areas, placeholder } = checkin;

  const lowest = Math.min(...areas.map((a) => a.score));
  const highest = Math.max(...areas.map((a) => a.score));
  const names = (score: number) =>
    areas.filter((a) => a.score === score).map((a) => a.name).join(" & ");
</script>

<svelte:head>
  <title>Start Where You Are</title>
  <meta name="description" content="A Health, Work, Play and Love check-in from Designing Your Life." />
</svelte:head>

<header class="masthead measure">
  <h1 class="title">Start Where You&nbsp;Are</h1>
  <div class="masthead-side">
    <p class="lede">A check-in on Health, Work, Play and Love, from <cite>Designing Your Life</cite>.</p>
    <p class="summary">
      Most room to grow: <strong>{names(lowest)}</strong>, at {lowest}%.
      Strongest: <strong>{names(highest)}</strong>, at {highest}%.
    </p>
    {#if placeholder}<p class="checked"><span class="placeholder">Placeholder scores</span></p>{/if}
  </div>
</header>

<main class="measure">
  <TubeRack {areas} {lowest} />

  <ol class="notes" aria-label="Why each score">
    {#each areas as area (area.id)}
      <li class="note" style:--swatch="var(--{area.id}-6)">
        <h3 class="note-head">{area.name}</h3>
        <p class="note-body">{area.note}</p>
      </li>
    {/each}
  </ol>
</main>

<footer class="colophon measure">
  {#if placeholder}
    <p>Scores and notes are placeholders until the real answers go in.</p>
  {/if}
  <p>Exercise from <cite>Designing Your Life</cite> by Bill Burnett &amp; Dave Evans, “Start Where You Are.”</p>
</footer>

<style>
  .masthead {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: end;
    gap: var(--gap) calc(var(--gap) * 2);
    padding-top: clamp(32px, 6vh, 72px);
    padding-bottom: clamp(20px, 3vh, 36px);
  }

  .title {
    margin: 0;
    font-size: clamp(2.75rem, 7vw, 5.75rem);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.018em;
    text-wrap: balance;
  }

  .masthead-side { padding-bottom: 0.4em; }

  .lede {
    margin: 0 0 14px;
    font-size: 1.0625rem;
    color: var(--ink-soft);
    max-width: 40ch;
  }

  .summary {
    margin: 0 0 14px;
    font-size: 1.25rem;
    line-height: 1.35;
    font-weight: 500;
    max-width: 34ch;
    text-wrap: pretty;
  }

  .summary strong { font-weight: 800; }

  .checked {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 6px 10px;
    margin: 0;
    font-size: 0.875rem;
    color: var(--ink-soft);
    font-variant-numeric: tabular-nums;
  }

  .placeholder {
    padding: 2px 8px;
    border-radius: 999px;
    background: var(--play-2);
    color: var(--play-9);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .notes {
    list-style: none;
    margin: clamp(32px, 5vh, 56px) 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--gap);
  }

  .note-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 0 8px;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .note-head::before {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 2px;
    background: var(--swatch);
  }

  .note-body {
    margin: 0;
    line-height: 1.55;
    text-wrap: pretty;
  }

  .colophon {
    padding-top: clamp(40px, 8vh, 88px);
    padding-bottom: 40px;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }

  .colophon p { margin: 0 0 4px; }

  @media (max-width: 1039px) {
    .masthead { grid-template-columns: 1fr; align-items: start; }
    .notes { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 28px; }
  }

  @media (max-width: 719px) {
    .masthead { padding-top: 28px; }
    .summary { font-size: 1.125rem; }
    .notes { grid-template-columns: 1fr; row-gap: 24px; }
  }
</style>
