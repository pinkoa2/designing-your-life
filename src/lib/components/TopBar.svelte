<script lang="ts">
  import { onMount } from "svelte";
  import Arrow from "./Arrow.svelte";
  import { session, restoreSession, signOut } from "#lib/session.svelte.ts";
  import { viewing, withPerson } from "#lib/viewing.svelte.ts";

  // `back` shows the link to the contents page; the landing page leaves it off.
  // `account` shows sign-in state; the sign-in page itself leaves it off.
  let { back = true, account = true }: { back?: boolean; account?: boolean } = $props();

  onMount(restoreSession);
</script>

<nav class="topbar measure" aria-label="Site">
  {#if back}
    <a class="link" href={withPerson("/")}><Arrow direction="left" /> All exercises</a>
  {:else}
    <span></span>
  {/if}

  {#if account && session.ready}
    {#if session.user}
      <span class="account">
        {#if viewing.id && viewing.id !== session.user.id}
          <a class="link" href="/">Your answers</a>
        {/if}
        Signed in as <strong>{session.user.name}</strong>
        <button type="button" class="link" onclick={signOut}>Sign out</button>
      </span>
    {:else}
      <a class="link" href="/sign-in/">Sign in</a>
    {/if}
  {/if}
</nav>

<style>
  .topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    min-height: 24px;
    padding-top: clamp(20px, 3.5vh, 36px);
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--ink-soft);
  }

  .account {
    display: inline-flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: flex-end;
    gap: 4px 10px;
    font-weight: 500;
  }

  .account strong {
    color: var(--ink);
    font-weight: 700;
  }

  .link {
    padding: 0;
    border: 0;
    border-radius: 4px;
    background: none;
    color: var(--ink-soft);
    font: inherit;
    font-weight: 600;
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    color: var(--ink);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
</style>
