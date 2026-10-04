<script lang="ts">
  import { onMount } from "svelte";
  import TestTube, { BOTTOM, BRIM, levelY } from "./TestTube.svelte";
  import type { Area, AreaId } from "#lib/content/start-where-you-are.ts";

  let {
    areas,
    lowest,
    editing = false,
    pending = false,
    onscore,
  }: {
    areas: Area[];
    lowest: number;
    editing?: boolean;
    /** The answers haven't arrived yet: show dashes instead of numbers. */
    pending?: boolean;
    onscore?: (id: AreaId, score: number) => void;
  } = $props();

  let rack: HTMLOListElement;

  const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

  // In edit mode a tube is a slider: drag the liquid to a level, or use the keys.
  function setFromPointer(event: PointerEvent, id: AreaId) {
    const box = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const y = ((event.clientY - box.top) / box.height) * 220;
    onscore?.(id, clamp(((BOTTOM - y) / (BOTTOM - BRIM)) * 100));
  }

  function pointerDown(event: PointerEvent, id: AreaId) {
    if (!editing) return;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
    setFromPointer(event, id);
  }

  function pointerMove(event: PointerEvent, id: AreaId) {
    if (!editing) return;
    if (!(event.currentTarget as HTMLElement).hasPointerCapture(event.pointerId)) return;
    setFromPointer(event, id);
  }

  function keyDown(event: KeyboardEvent, area: Area) {
    if (!editing) return;
    const step = event.shiftKey ? 5 : 1;
    const next: Record<string, number> = {
      ArrowUp: area.score + step,
      ArrowRight: area.score + step,
      ArrowDown: area.score - step,
      ArrowLeft: area.score - step,
      PageUp: area.score + 10,
      PageDown: area.score - 10,
      Home: 0,
      End: 100,
    };
    if (!(event.key in next)) return;
    event.preventDefault();
    onscore?.(area.id, clamp(next[event.key]));
  }

  // Signature motion: each tube drops into its hole in the rack. The levels
  // fill by themselves: the rack starts empty and the liquid eases up to each
  // score once the answers arrive (see the .liquid transition below).
  onMount(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    rack.querySelectorAll<HTMLElement>(".slot").forEach((slot, n) => {
      slot.querySelector(".glass")?.animate(
        [{ transform: "translateY(-48px)" }, { transform: "none" }],
        { duration: 700, delay: 150 + n * 110, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "backwards" }
      );
    });
  });
</script>

<div class="stand">
  <span class="bar" aria-hidden="true"></span>
  <span class="post post-left" aria-hidden="true"></span>
  <span class="post post-right" aria-hidden="true"></span>
  <span class="base" aria-hidden="true"></span>

  <ol class="rack" class:is-editing={editing} aria-label="Scores" bind:this={rack}>
    {#each areas as area, n (area.id)}
      <li class="slot" style:--n={n}>
        {#if editing}
          <div
            class="glass is-editing"
            role="slider"
            tabindex="0"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={area.score}
            aria-valuetext="{area.score}% full"
            aria-labelledby="area-{area.id}"
            onpointerdown={(e) => pointerDown(e, area.id)}
            onpointermove={(e) => pointerMove(e, area.id)}
            onkeydown={(e) => keyDown(e, area)}
          >
            <TestTube id={area.id} score={area.score} />
            <span class="handle" style:top="{(levelY(area.score) / 220) * 100}%" aria-hidden="true">
              <svg viewBox="0 0 16 16"><path d="M4.5 6.5 8 3l3.5 3.5M4.5 9.5 8 13l3.5-3.5" /></svg>
            </span>
          </div>
        {:else}
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
        {/if}
        <div class="label">
          <h2 class="area" id="area-{area.id}">{area.name}</h2>
          {#if editing}
            <label class="score is-editing">
              <span class="visually-hidden">{area.name} score, 0 to 100</span>
              <input
                class="num"
                type="number"
                inputmode="numeric"
                min="0"
                max="100"
                step="1"
                value={area.score}
                oninput={(e) => {
                  const raw = (e.currentTarget as HTMLInputElement).value;
                  if (raw !== "") onscore?.(area.id, clamp(Number(raw)));
                }}
                onblur={(e) => ((e.currentTarget as HTMLInputElement).value = String(area.score))}
              /><span class="pct">%</span>
            </label>
          {:else}
            <p class="score"><span class="num">{pending ? "–" : area.score}</span><span class="pct">%</span></p>
          {/if}
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

  /* Levels ease to new values, one tube after another; while dragging they
     follow the finger directly. */
  .rack :global(.liquid) {
    transition: transform 1400ms cubic-bezier(0.25, 1, 0.5, 1);
    transition-delay: calc(var(--n) * 120ms);
  }

  .rack.is-editing :global(.liquid) { transition: none; }

  @media (prefers-reduced-motion: reduce) {
    .rack :global(.liquid) { transition: none; }
  }

  /* Edit mode: the tube is a slider you drag. */
  .glass.is-editing {
    cursor: ns-resize;
    touch-action: none;
    border-radius: 999px;
  }

  .glass.is-editing:focus-visible { outline-offset: 6px; }

  /* The grab handle sits on the liquid's surface, centered in the tube. */
  .handle {
    position: absolute;
    z-index: 2;
    left: 50%;
    display: grid;
    place-items: center;
    width: 30px;
    height: 30px;
    margin: -15px 0 0 -15px;
    border-radius: 50%;
    background: var(--card);
    color: var(--ink);
    border: 2.5px solid var(--ink);
    box-shadow: 0 2px 8px rgb(27 26 34 / 0.3);
    pointer-events: none;
  }

  .handle svg {
    width: 14px;
    height: 14px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
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

  /* In edit mode the big number is a field you can type into. */
  .score.is-editing input {
    width: 3.2ch;
    padding: 2px 0 0;
    border: 0;
    border-bottom: 2px dashed var(--ink-soft);
    border-radius: 0;
    background: transparent;
    color: var(--ink);
    font: inherit;
    font-size: clamp(2rem, 4.4vw, 3.75rem);
    font-weight: 800;
    line-height: 0.85;
    letter-spacing: -0.04em;
    text-align: center;
    font-variant-numeric: tabular-nums lining-nums;
    appearance: textfield;
    -moz-appearance: textfield;
  }

  .score.is-editing input::-webkit-inner-spin-button,
  .score.is-editing input::-webkit-outer-spin-button { appearance: none; margin: 0; }

  /* Where supported, the field hugs its digits so the % sits right beside it. */
  @supports (field-sizing: content) {
    .score.is-editing input { width: auto; field-sizing: content; min-width: 1.2ch; }
  }

  .score.is-editing input:focus { outline: none; border-bottom: 2px solid var(--work-6); }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
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
