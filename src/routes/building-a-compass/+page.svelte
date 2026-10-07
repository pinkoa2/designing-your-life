<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import CompassPage from "#lib/components/CompassPage.svelte";
  import TopBar from "#lib/components/TopBar.svelte";
  import { session } from "#lib/session.svelte.ts";
  import { viewing, readViewing } from "#lib/viewing.svelte.ts";

  // Dev only: ?preview shows your own editable page without signing in, saving nothing.
  let preview = $state(false);
  afterNavigate(() => {
    preview = import.meta.env.DEV && new URLSearchParams(location.search).has("preview");
    readViewing();
  });

  // With ?u=: that person's compass (editable only if it's yours).
  // Without: your own when signed in, or an example to sign in for.
  const owner = $derived(
    preview
      ? { id: "preview", name: "You" }
      : viewing.id
        ? (viewing.name !== null ? { id: viewing.id, name: viewing.name } : null)
        : session.user
  );
  const missing = $derived(viewing.checked && viewing.id !== null && viewing.name === null);
  const ready = $derived(preview || (viewing.checked && (viewing.id !== null || session.ready)));
  const title = $derived(viewing.name ? `${viewing.name}'s Building a Compass` : "Building a Compass");
</script>

<svelte:head>
  <title>{title} · Designing Your Life</title>
  <meta name="description" content="Workview and Lifeview, and how they fit together, from Designing Your Life." />
</svelte:head>

<TopBar />

{#if missing}
  <main class="missing measure">
    <h1>No compass here</h1>
    <p>This link doesn't match anyone's answers. Ask whoever sent it for the full link.</p>
    <a href="/">Go to all exercises</a>
  </main>
{:else if ready}
  <CompassPage {owner} {preview} editable={preview || (owner !== null && session.user?.id === owner.id)} />
{/if}

<footer class="colophon measure">
  <p>Exercise from <cite>Designing Your Life</cite> by Bill Burnett &amp; Dave Evans, “Building a Compass.”</p>
</footer>

<style>
  .missing {
    padding-top: clamp(32px, 8vh, 96px);
  }

  .missing h1 {
    margin: 0 0 12px;
    font-size: clamp(2rem, 4.4vw, 3.75rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.02em;
  }

  .missing p {
    margin: 0 0 16px;
    max-width: 44ch;
    font-size: 1.25rem;
    line-height: 1.4;
    color: var(--ink-soft);
  }

  .missing a {
    font-weight: 700;
    color: var(--ink);
    text-underline-offset: 3px;
  }

  .colophon {
    padding-top: clamp(40px, 8vh, 88px);
    padding-bottom: 40px;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }

  .colophon p { margin: 0; }
</style>
