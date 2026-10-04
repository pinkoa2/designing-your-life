<script lang="ts">
  // A small drawn arrow, sized to the surrounding text.
  let { direction = "right" }: { direction?: "left" | "right" } = $props();
</script>

<svg
  class="arrow"
  class:left={direction === "left"}
  viewBox="0 0 16 16"
  aria-hidden="true"
  focusable="false"
>
  <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
</svg>

<style>
  .arrow {
    width: 1em;
    height: 1em;
    vertical-align: -0.125em;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .left { transform: scaleX(-1); }
</style>
