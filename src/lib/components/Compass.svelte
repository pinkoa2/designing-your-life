<script lang="ts" module>
  // Compass geometry, in the SVG's own units, centered on the hub. Angles are
  // degrees from the North Star (straight up), clockwise, -180 to 180.
  const R_DIAL = 196;
  const R_NEEDLE = 150;
  const R_WEDGE = 132;
  const R_LABEL = 172;
  const R_MARKS = 182;

  /** The shortest turn from a to b, -180 to 180. */
  export const turn = (a: number, b: number) => ((((b - a) % 360) + 540) % 360) - 180;

  const wrap = (a: number) => turn(0, a);

  const at = (deg: number, r: number) => {
    const t = (deg * Math.PI) / 180;
    return [r * Math.sin(t), -r * Math.cos(t)];
  };

  // A long slim diamond pointing up, split down the middle so one side
  // catches the light.
  const NEEDLE_LEFT = `M0,${-R_NEEDLE} L-9,0 L0,0 Z`;
  const NEEDLE_RIGHT = `M0,${-R_NEEDLE} L9,0 L0,0 Z`;
  // A short, pale counterweight behind the hub, so the pointing end is obvious.
  const TAIL = `M-6,0 L-4,30 A4,4 0 0 0 4,30 L6,0 Z`;

  // The North Star: a four-pointed diamond star, tall at top and bottom,
  // with pinched waists between the points.
  const star = (r: number) => {
    let d = "";
    for (let i = 0; i < 8; i++) {
      const tall = i % 4 === 0;
      const [x, y] = at(i * 45, i % 2 ? r * 0.26 : tall ? r : r * 0.62);
      d += `${i ? "L" : "M"}${x.toFixed(2)},${y.toFixed(2)}`;
    }
    return d + "Z";
  };
  const STAR = star(17);

  const MARKS = [45, 90, 135, 180, 225, 270, 315].map((a) => ({ a, big: a % 90 === 0 }));

  const side = (a: number) =>
    Math.abs(a) < 1 ? "straight at the North Star" : `${Math.abs(Math.round(a))} degrees ${a < 0 ? "left" : "right"} of the North Star`;
</script>

<script lang="ts">
  import { untrack } from "svelte";
  import type { Lead } from "#lib/content/building-a-compass.ts";

  type Needle = "work" | "life";

  let {
    work,
    life,
    lead = null,
    pending = false,
    unset = false,
    editing = false,
    onangle,
  }: {
    work: number;
    life: number;
    lead?: Lead | null;
    /** Still loading: the needles wait at the North Star. */
    pending?: boolean;
    /** Nobody has set the needles yet: they rest faintly. */
    unset?: boolean;
    editing?: boolean;
    onangle?: (needle: Needle, deg: number) => void;
  } = $props();

  const uid = $props.id();

  // What's drawn trails what's set, through a damped spring, so the needles
  // swing out from the star and settle. Dragging skips the spring.
  let shown = $state({ work: 0, life: 0 });
  let dragging = $state<Needle | null>(null);
  let svg: SVGSVGElement;

  // Until the needles are set (or loaded) they wait at the star, so the dial
  // never shows a gap nobody chose.
  const parked = $derived(pending || (unset && !editing));
  const target = $derived({ work: parked ? 0 : work, life: parked ? 0 : life });

  $effect(() => {
    const goal = { ...target };
    const still = dragging !== null || matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      shown = goal;
      return;
    }
    const v = { work: 0, life: 0 };
    let x = untrack(() => ({ ...shown }));
    let last = performance.now();
    let frame = requestAnimationFrame(function step(now) {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      let moving = false;
      for (const k of ["work", "life"] as const) {
        const off = turn(x[k], goal[k]);
        v[k] += (70 * off - 6.5 * v[k]) * dt;
        x[k] = wrap(x[k] + v[k] * dt);
        if (Math.abs(off) > 0.05 || Math.abs(v[k]) > 0.05) moving = true;
      }
      shown = { ...x };
      if (moving) frame = requestAnimationFrame(step);
      else shown = goal;
    });
    return () => cancelAnimationFrame(frame);
  });

  const gap = $derived(turn(shown.work, shown.life));

  // The shaded wedge between the needles, the short way round.
  const wedge = $derived.by(() => {
    if (Math.abs(gap) < 0.5) return "";
    const [x1, y1] = at(shown.work, R_WEDGE);
    const [x2, y2] = at(shown.work + gap, R_WEDGE);
    return `M0,0 L${x1.toFixed(2)},${y1.toFixed(2)} A${R_WEDGE},${R_WEDGE} 0 0 ${gap > 0 ? 1 : 0} ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
  });

  // Labels sit just past each tip, nudged apart when the needles are close.
  const labels = $derived.by(() => {
    const push = Math.max(0, 18 - Math.abs(gap)) / 2;
    const dir = gap >= 0 ? 1 : -1;
    return {
      work: at(shown.work - push * dir, R_LABEL),
      life: at(shown.life + push * dir, R_LABEL),
    };
  });

  // The leading needle is drawn on top; otherwise Life sits over Work.
  const order = $derived<Needle[]>(lead === "life" || lead === "neither" || !lead ? ["work", "life"] : ["life", "work"]);

  const description = $derived(
    unset && !editing
      ? "Compass: the needles haven't been set yet."
      : `Compass: Work points ${side(work)}, Life points ${side(life)}. They are ${Math.abs(Math.round(turn(work, life)))} degrees apart.`
  );

  function angleFrom(e: PointerEvent) {
    const box = svg.getBoundingClientRect();
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    return Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
  }

  function grab(needle: Needle, e: PointerEvent) {
    if (!editing) return;
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    dragging = needle;
    onangle?.(needle, angleFrom(e));
  }

  function drag(e: PointerEvent) {
    if (dragging) onangle?.(dragging, angleFrom(e));
  }

  function key(needle: Needle, e: KeyboardEvent) {
    const step = e.shiftKey ? 15 : 3;
    const now = needle === "work" ? work : life;
    const by: Record<string, number> = { ArrowRight: step, ArrowUp: step, ArrowLeft: -step, ArrowDown: -step };
    if (e.key in by) onangle?.(needle, wrap(now + by[e.key]));
    else if (e.key === "Home") onangle?.(needle, 0);
    else return;
    e.preventDefault();
  }
</script>

<div
  class="compass"
  class:editing
  class:unset={unset && !editing}
  class:pending
>
  <svg
    bind:this={svg}
    viewBox="-200 -200 400 400"
    role="img"
    aria-label={description}
    onpointermove={drag}
    onpointerup={() => (dragging = null)}
    onpointercancel={() => (dragging = null)}
  >
    <defs>
      <pattern id="hatch-{uid}" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line class="hatch-line" x1="0" y1="0" x2="0" y2="7" />
      </pattern>
    </defs>

    <circle class="ring" r={R_DIAL - 26} />

    {#each MARKS as m (m.a)}
      {@const [x, y] = at(m.a, R_MARKS)}
      <circle class="mark" class:big={m.big} cx={x} cy={y} r={m.big ? 3.4 : 1.8} />
    {/each}
    <path class="star" d={STAR} transform="translate(0,{-R_MARKS})" />

    {#if wedge}
      <path class="wedge-fill" d={wedge} />
      <path class="wedge-hatch" d={wedge} fill="url(#hatch-{uid})" />
    {/if}

    <g class="needles" class:trembling={!pending && !editing && !unset}>
      {#each order as n (n)}
        <g class="needle {n}" class:leads={lead === n} style:transform="rotate({shown[n].toFixed(2)}deg)">
          <path class="tail" d={TAIL} />
          <path class="side-left" d={NEEDLE_LEFT} />
          <path class="side-right" d={NEEDLE_RIGHT} />
        </g>
      {/each}
    </g>

    <circle class="hub" r="12" />
    <circle class="hub-dot" r="4" />

    {#each ["work", "life"] as const as n (n)}
      <text class="label {n}" x={labels[n][0]} y={labels[n][1]}>{n === "work" ? "Work" : "Life"}</text>
    {/each}

    {#if editing}
      {#each ["work", "life"] as const as n (n)}
        {@const [x, y] = at(n === "work" ? work : life, R_NEEDLE - 6)}
        <g
          class="handle {n}"
          class:is-dragging={dragging === n}
          role="slider"
          tabindex="0"
          aria-label="{n === 'work' ? 'Work' : 'Life'} needle"
          aria-valuemin={-180}
          aria-valuemax={180}
          aria-valuenow={n === "work" ? work : life}
          aria-valuetext={side(n === "work" ? work : life)}
          onpointerdown={(e) => grab(n, e)}
          onkeydown={(e) => key(n, e)}
        >
          <circle class="handle-hit" cx={x} cy={y} r="26" />
          <circle class="handle-knob" cx={x} cy={y} r="13" />
          <circle class="handle-core" cx={x} cy={y} r="4.5" />
        </g>
      {/each}
    {/if}
  </svg>
</div>

<style>
  /* The dial is a white object on the wall, with the same shadow as the rack. */
  .compass {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    background: var(--card);
    box-shadow:
      0 1px 1px rgb(27 26 34 / 0.06),
      0 18px 40px -18px rgb(27 26 34 / 0.34);
  }


  svg {
    display: block;
    width: 100%;
    height: 100%;
    overflow: visible;
    touch-action: none;
  }

  .ring {
    fill: none;
    stroke: rgb(27 26 34 / 0.08);
    stroke-width: 1.5;
  }

  .mark { fill: rgb(27 26 34 / 0.2); }
  .mark.big { fill: rgb(27 26 34 / 0.34); }
  .star { fill: var(--ink); }

  .wedge-fill {
    fill: rgb(27 26 34 / 0.045);
    transition: fill 300ms;
  }

  .hatch-line {
    stroke: rgb(27 26 34 / 0.2);
    stroke-width: 1.4;
  }

  /* Needles turn about the hub (0,0 of the view box). */
  .needle {
    transform-box: view-box;
    transform-origin: 0 0;
    transition: opacity 300ms;
  }

  .needle.work .tail { fill: var(--work-2); }
  .needle.life .tail { fill: var(--love-2); }
  .needle.work .side-left { fill: var(--work-5); }
  .needle.work .side-right { fill: var(--work-7); }
  .needle.life .side-left { fill: var(--love-5); }
  .needle.life .side-right { fill: var(--love-7); }

  .hub {
    fill: var(--card);
    stroke: rgb(27 26 34 / 0.22);
    stroke-width: 1.5;
  }

  .hub-dot { fill: var(--ink); }

  .label {
    font-size: 15px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    text-anchor: middle;
    dominant-baseline: central;
    transition: opacity 300ms;
  }

  .label.work { fill: var(--work-7); }
  .label.life { fill: var(--love-7); }

  /* A faint, constant tremble, like a real needle that has just settled. */
  .needles {
    transform-box: view-box;
    transform-origin: 0 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    .needles.trembling { animation: tremble 5.2s ease-in-out infinite; }
  }

  @keyframes tremble {
    0%, 100% { transform: rotate(0deg); }
    23% { transform: rotate(0.7deg); }
    51% { transform: rotate(-0.45deg); }
    77% { transform: rotate(0.3deg); }
  }

  /* Before the answers arrive, and while nobody has set them yet. */
  .pending .label { opacity: 0; }
  .unset .needle { opacity: 0.28; }
  .unset .label { opacity: 0; }

  /* Editing: a round handle near each tip, dragged around the dial. */
  .handle { cursor: grab; outline: none; }
  .handle.is-dragging { cursor: grabbing; }
  .handle-hit { fill: transparent; }

  .handle-knob {
    fill: var(--card);
    stroke-width: 3;
    filter: drop-shadow(0 2px 3px rgb(27 26 34 / 0.3));
  }

  .handle.work .handle-knob { stroke: var(--work-6); }
  .handle.life .handle-knob { stroke: var(--love-6); }
  .handle.work .handle-core { fill: var(--work-6); }
  .handle.life .handle-core { fill: var(--love-6); }

  .handle:focus-visible .handle-knob {
    stroke-width: 4;
    r: 16;
  }

  @media (forced-colors: active) {
    .needle path, .star, .hub-dot, .handle-core { fill: CanvasText; }
    .label { fill: CanvasText; }
  }
</style>
