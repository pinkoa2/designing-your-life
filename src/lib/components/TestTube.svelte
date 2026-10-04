<script lang="ts" module>
  // Test tube geometry, in the SVG's own 64×220 units. The liquid surface
  // sits at BOTTOM when empty and at BRIM when full.
  export const BRIM = 22;
  export const BOTTOM = 206.5;

  export const levelY = (score: number) =>
    BOTTOM - (Math.max(0, Math.min(100, score)) / 100) * (BOTTOM - BRIM);

  // One period of the surface wave is 60 units; the path runs wide enough to
  // slide a full period sideways and still cover the tube.
  const wave = (amp: number) => {
    let d = `M-120,0 q15,${-amp} 30,0`;
    for (let x = -90; x < 240; x += 30) d += " t30,0";
    return d + " L240,240 L-120,240 Z";
  };

  const WAVE_BACK = wave(2);
  const WAVE_FRONT = wave(2.4);

  // A still surface with a slight concave meniscus, for when motion is off.
  const STILL = "M0,-2.5 Q32,2.5 64,-2.5 L64,240 L0,240 Z";

  // [x, radius, seconds per rise, head start]
  const BUBBLES: [number, number, number, number][] = [
    [25, 1.6, 4.2, 0],
    [37, 1.1, 5.6, 1.7],
    [31, 2.0, 6.8, 3.1],
  ];
</script>

<script lang="ts">
  import type { AreaId } from "#lib/content/start-where-you-are.ts";

  let { id, score }: { id: AreaId; score: number } = $props();

  const c = (step: number) => `var(--${id}-${step})`;
  const level = $derived(levelY(score));
  const depth = $derived(BOTTOM - level);
</script>

<svg class="tube" viewBox="0 0 64 220" aria-hidden="true" focusable="false">
  <defs>
    <clipPath id="inside-{id}">
      <path d="M15.5,10 L15.5,190 A16.5,16.5 0 0 0 48.5,190 L48.5,10 Z" />
    </clipPath>
    <linearGradient id="liquid-{id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color={c(5)} />
      <stop offset="1" stop-color={c(7)} />
    </linearGradient>
  </defs>
  <g clip-path="url(#inside-{id})">
    <rect x="0" y="0" width="64" height="220" style:fill="color-mix(in oklch, {c(4)} 14%, white)" />
    <g class="liquid" style:transform="translateY({level.toFixed(2)}px)">
      <path class="wave wave-back" d={WAVE_BACK} style:fill={c(4)} transform="translate(0,-1.5)" />
      <path class="wave wave-front" d={WAVE_FRONT} fill="url(#liquid-{id})" />
      <path class="still" d={STILL} fill="url(#liquid-{id})" />
      {#if depth >= 24}
        {#each BUBBLES as [cx, r, dur, delay]}
          <circle
            class="bubble"
            {cx}
            cy="0"
            {r}
            style:--depth="{(depth - 6).toFixed(1)}px"
            style:animation-duration="{dur}s"
            style:animation-delay="-{delay}s"
          />
        {/each}
      {/if}
    </g>
  </g>
  <path class="shine" d="M21,26 L21,184" />
  <path class="wall" d="M12,9 L12,190 A20,20 0 0 0 52,190 L52,9" />
  <path class="lip" d="M7,8 L57,8" />
</svg>

<style>
  .tube {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
  }

  .wall,
  .lip {
    fill: none;
    stroke: rgb(27 26 34 / 0.24);
    stroke-linejoin: round;
    stroke-linecap: round;
  }

  .wall { stroke-width: 3; }
  .lip { stroke-width: 4.5; }

  .shine {
    fill: none;
    stroke: rgb(255 255 255 / 0.6);
    stroke-width: 3.5;
    stroke-linecap: round;
  }

  .still { display: none; }

  .bubble {
    fill: rgb(255 255 255 / 0.55);
    animation: rise 5s linear infinite;
  }

  @keyframes rise {
    0% { transform: translateY(var(--depth)); opacity: 0; }
    15% { opacity: 1; }
    85% { opacity: 1; }
    100% { transform: translateY(5px); opacity: 0; }
  }

  .wave-front { animation: slosh 7s linear infinite; }
  .wave-back { animation: slosh 11s linear infinite reverse; }

  @keyframes slosh {
    to { transform: translateX(-60px); }
  }

  @media (prefers-reduced-motion: reduce) {
    .wave,
    .bubble { display: none; }
    .still { display: inline; }
  }

  @media (forced-colors: active) {
    .wave,
    .still { fill: CanvasText; }
    .wall,
    .lip { stroke: CanvasText; }
  }
</style>
