<script lang="ts">
  // A thumbnail of someone's compass for the contents page: just the star and
  // both needles, no dial.
  let { work, life }: { work: number; life: number } = $props();

  const at = (deg: number, r: number) => {
    const t = (deg * Math.PI) / 180;
    return [r * Math.sin(t), -r * Math.cos(t)];
  };

  const side = (a: number) =>
    Math.abs(a) < 1 ? "straight at the North Star" : `${Math.abs(Math.round(a))} degrees ${a < 0 ? "left" : "right"} of it`;
</script>

<svg
  class="mini"
  viewBox="-19 -20.5 38 39"
  role="img"
  aria-label="Compass: Work points {side(work)}, Life points {side(life)}."
>
  <path class="star" d="M0,-20 L1.3,-16.8 L3.2,-15.5 L1.3,-14.2 L0,-11 L-1.3,-14.2 L-3.2,-15.5 L-1.3,-16.8 Z" />
  <path class="needle work" d="M0,-18 L2,0 L0,3 L-2,0 Z" transform="translate(0,4) rotate({work})" />
  <path class="needle life" d="M0,-18 L2,0 L0,3 L-2,0 Z" transform="translate(0,4) rotate({life})" />
  <circle class="hub" cx="0" cy="4" r="1.6" />
</svg>

<style>
  .mini {
    display: block;
    width: 48px;
    height: 48px;
    /* A needle pointing down may reach just past the box; let it. */
    overflow: visible;
  }

  .star { fill: var(--ink); }
  .needle.work { fill: var(--work-6); }
  .needle.life { fill: var(--love-6); }
  .hub { fill: var(--ink); }

  @media (forced-colors: active) {
    .star, .needle.work, .needle.life, .hub { fill: CanvasText; }
  }
</style>
