<script lang="ts">
  import { onMount } from "svelte";
  import TestTube, { BOTTOM } from "./TestTube.svelte";
  import type { Area } from "#lib/content/start-where-you-are.ts";

  let { areas, lowest }: { areas: Area[]; lowest: number } = $props();

  let rack: HTMLOListElement;

  // Signature motion: each tube drops into its hole in the rack, then fills
  // to its level. The page renders in its final state; the animation only
  // plays from a starting pose, so nothing is ever hidden.
  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    rack.querySelectorAll<HTMLElement>(".slot").forEach((slot, n) => {
      slot.querySelector(".glass")?.animate(
        [{ transform: "translateY(-48px)" }, { transform: "none" }],
        { duration: 700, delay: 150 + n * 110, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }
      );
      const liquid = slot.querySelector<SVGGElement>(".liquid");
      if (!liquid) return;
      liquid.animate(
        [{ transform: `translateY(${BOTTOM + 8}px)` }, { transform: liquid.style.transform }],
        { duration: 1600, delay: 800 + n * 140, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "backwards" }
      );
    });
  });
</script>

<div class="stand">
  <span class="bar" aria-hidden="true"></span>
  <span class="post post-left" aria-hidden="true"></span>
  <span class="post post-right" aria-hidden="true"></span>
  <span class="base" aria-hidden="true"></span>

  <ol class="rack" aria-label="Scores" bind:this={rack}>
    {#each areas as area (area.id)}
      <li class="slot">
        <div
          class="glass"
          role="meter"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={area.score}
          aria-valuetext="{area.score}% full"
          aria-labelledby="area-{area.id}"
        >
          <TestTube id={area.id} score={area.score} />
        </div>
        <div class="label">
          <h2 class="area" id="area-{area.id}">{area.name}</h2>
          <p class="score"><span class="num">{area.score}</span><span class="pct">%</span></p>
        </div>
        {#if area.score === lowest}
          <span class="sticker">Start<br />here</span>
        {/if}
      </li>
    {/each}
  </ol>
</div>

<style>
  .stand {
    --tube-w: clamp(46px, 8vw, 108px);
    --tube-h: calc(var(--tube-w) * 220 / 64);
    --rack-top: 36px;
    --bar-y: calc(var(--rack-top) + var(--tube-h) * 0.2);
    --bar-h: clamp(16px, 1.8vw, 22px);
    /* The tube's wall ends at 210 of 220 units (plus half its stroke), so
       the base sits right there and the tube stands on it. */
    --base-y: calc(var(--rack-top) + var(--tube-w) * 211.5 / 64);
    --base-h: clamp(18px, 2vw, 26px);
    position: relative;
    padding-top: var(--rack-top);
  }

  .bar,
  .base,
  .post {
    position: absolute;
    z-index: 0;
    background: var(--card);
    box-shadow: var(--shadow-card);
  }

  /* The bar sits behind the tubes so it never covers a level. */
  .bar {
    top: var(--bar-y);
    left: 0;
    right: 0;
    height: var(--bar-h);
    border-radius: 6px;
  }

  .base {
    top: var(--base-y);
    left: -8px;
    right: -8px;
    height: var(--base-h);
    border-radius: 8px;
  }

  .post {
    top: var(--bar-y);
    height: calc(var(--base-y) - var(--bar-y));
    width: clamp(10px, 1.2vw, 16px);
    border-radius: 4px;
  }

  .post-left { left: clamp(10px, 2vw, 24px); }
  .post-right { right: clamp(10px, 2vw, 24px); }

  .rack {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .slot {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .glass {
    position: relative;
    z-index: 1;
    width: var(--tube-w);
  }

  /* Where the tube's round bottom meets the base. */
  .glass::after {
    content: "";
    position: absolute;
    left: 22%;
    right: 22%;
    top: calc(var(--tube-w) * 209 / 64);
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgb(27 26 34 / 0.22), transparent);
    z-index: -1;
  }

  .label {
    margin-top: calc(var(--base-y) - var(--rack-top) - var(--tube-h) + var(--base-h) + 18px);
    text-align: center;
  }

  .area {
    margin: 0;
    font-size: clamp(1rem, 1.8vw, 1.5rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .score {
    margin: 6px 0 0;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.04em;
    font-variant-numeric: tabular-nums lining-nums;
  }

  .num { font-size: clamp(2rem, 4.4vw, 3.75rem); }
  .pct { font-size: clamp(0.875rem, 1.4vw, 1.25rem); margin-left: 2px; letter-spacing: 0; }

  /* The sticker sits beside the lip of the lowest tube, never over it.
     On the last tube it moves to the left side to stay inside the page. */
  .sticker {
    --size: 66px;
    position: absolute;
    z-index: 3;
    top: -14px;
    left: calc(50% + var(--tube-w) / 2 + 2px);
    display: grid;
    place-items: center;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: var(--ink);
    color: var(--card);
    font-size: 0.8125rem;
    font-weight: 800;
    line-height: 1.05;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    transform: rotate(-12deg);
    box-shadow: 0 2px 3px rgb(27 26 34 / 0.18), 0 8px 16px -6px rgb(27 26 34 / 0.35);
  }

  .slot:last-child .sticker {
    left: auto;
    right: calc(50% + var(--tube-w) / 2 + 2px);
    transform: rotate(12deg);
  }

  /* On phone the slots are too narrow for a side sticker to read as
     belonging to one tube, so it sits centered directly above the lip. */
  @media (max-width: 719px) {
    .stand { --rack-top: 64px; }
    .label { margin-top: calc(var(--base-y) - var(--rack-top) - var(--tube-h) + var(--base-h) + 12px); }

    .sticker,
    .slot:last-child .sticker {
      --size: 44px;
      top: calc(-1 * var(--size) - 8px);
      left: calc(50% - var(--size) / 2);
      right: auto;
      font-size: 0.5625rem;
      transform: rotate(-8deg);
    }
  }
</style>
