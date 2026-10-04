<script lang="ts">
  import { onMount } from "svelte";

  // Old share links (/view/?u=<id>) forward to the dashboard's own address.
  onMount(() => location.replace(`/start-where-you-are/${location.search}`));
</script>

<svelte:head>
  <title>Designing Your Life</title>
  <meta name="robots" content="noindex" />
</svelte:head>
