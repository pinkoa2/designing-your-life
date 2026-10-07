<script lang="ts">
  import TopBar from "#lib/components/TopBar.svelte";
  import { session, setPassword } from "#lib/session.svelte.ts";

  // Set or change your password, so you can sign in without waiting on an email.
  let password = $state("");
  let saving = $state(false);
  let error = $state("");
  let done = $state("");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (password.length < 8) {
      error = "Use at least 8 characters.";
      return;
    }
    saving = true;
    error = "";
    const result = await setPassword(password);
    saving = false;
    if (result.ok) {
      done = result.message;
      password = "";
    } else error = result.message;
  }
</script>

<svelte:head>
  <title>Password · Designing Your Life</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<TopBar />

<main class="signin">
  <h1>Your password</h1>
  {#if !session.ready}
    <p class="lede">Checking who's signed in…</p>
  {:else if !session.user}
    <p class="lede">Sign in first, then come back here to set a password.</p>
    <a class="text-link" href="/sign-in/">Go to sign in</a>
  {:else if done}
    <p class="lede" role="status">{done}</p>
    <a class="text-link" href="/">Back to your answers</a>
  {:else}
    <p class="lede">
      Set a password for <strong>{session.user.name}</strong>, so you can sign in without an email link.
    </p>
    <form onsubmit={submit}>
      <label for="new-password">New password</label>
      <input
        id="new-password"
        type="password"
        autocomplete="new-password"
        minlength="8"
        required
        bind:value={password}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? "password-error" : "password-hint"}
      />
      {#if error}
        <p class="error" id="password-error" role="alert">{error}</p>
      {:else}
        <p class="note" id="password-hint">At least 8 characters.</p>
      {/if}
      <button type="submit" class="send" disabled={saving}>{saving ? "Saving…" : "Save password"}</button>
    </form>
  {/if}
</main>

<style>
  .signin {
    width: min(100% - var(--gutter) * 2, 400px);
    margin: 0 auto;
    padding: clamp(48px, 12vh, 120px) 0 64px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2.75rem, 7vw, 3.75rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.018em;
  }

  .lede {
    margin: 0 0 28px;
    font-size: 1rem;
    line-height: 1.5;
    color: var(--ink-soft);
    text-wrap: pretty;
  }

  .lede strong { color: var(--ink); }

  label {
    display: block;
    margin: 0 0 8px;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  input {
    display: block;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    border: 0;
    border-radius: 8px;
    background: var(--card);
    box-shadow: var(--shadow-card);
    color: var(--ink);
    font: inherit;
    font-size: 1rem;
  }

  input:focus {
    outline: 2px solid var(--work-6);
    outline-offset: 2px;
  }

  input[aria-invalid="true"] {
    outline: 2px solid var(--love-6);
    outline-offset: 2px;
  }

  .error {
    margin: 10px 0 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--love-7);
  }

  .note {
    margin: 10px 0 0;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }

  .send {
    display: block;
    width: 100%;
    height: 48px;
    margin-top: 16px;
    border: 0;
    border-radius: 999px;
    background: var(--ink);
    color: var(--card);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
  }

  .send:hover:not(:disabled) { background: #33313d; }
  .send:disabled { opacity: 0.6; cursor: wait; }

  .text-link {
    font-size: 0.875rem;
    font-weight: 700;
    color: var(--ink);
    text-underline-offset: 3px;
  }
</style>
