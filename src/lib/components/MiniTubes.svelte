<script lang="ts">
  import { checkin } from "#lib/content/start-where-you-are.ts";
  import type { Answer } from "#lib/storage.ts";

  // A thumbnail of someone's dashboard for the contents page: four tiny test
  // tubes, filled to each score, in the book's area order.
  let { answers }: { answers: Answer[] } = $props();

  // Each tube is 8 wide; the liquid runs from y=38 (empty) to y=4 (full).
  const level = (score: number) => 38 - (Math.max(0, Math.min(100, score)) / 100) * 34;

  const tubes = $derived(
    checkin.areas
      .map((a) => ({ ...a, score: answers.find((s) => s.id === a.id)?.score }))
      .filter((a): a is typeof a & { score: number } => a.score !== undefined)
  );

  const label = $derived(tubes.map((t) => `${t.name} ${t.score}%`).join(", "));
</script>

<svg class="tubes" viewBox="0 0 50 44" role="img" aria-label="Scores: {label}">
  {#each tubes as t, i (t.id)}
    {@const x = 1 + i * 13}
    <clipPath id="mini-tube-{t.id}">
      <path d="M{x},2 L{x},38 A4,4 0 0 0 {x + 8},38 L{x + 8},2 Z" />
    </clipPath>
    <g clip-path="url(#mini-tube-{t.id})">
      <rect x={x} y="0" width="8" height="44" style:fill="color-mix(in oklch, var(--{t.id}-4) 14%, white)" />
      <rect x={x} y={level(t.score)} width="8" height="44" style:fill="var(--{t.id}-6)" />
    </g>
    <path class="glass" d="M{x},2 L{x},38 A4,4 0 0 0 {x + 8},38 L{x + 8},2" />
  {/each}
</svg>

<style>
  .tubes {
    display: block;
    width: 50px;
    height: 44px;
  }

  .glass {
    fill: none;
    stroke: rgb(27 26 34 / 0.24);
    stroke-width: 1;
  }

  @media (forced-colors: active) {
    .glass { stroke: CanvasText; }
  }
</style>
