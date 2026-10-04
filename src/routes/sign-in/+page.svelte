<script lang="ts">
  import TopBar from "#lib/components/TopBar.svelte";
  import { sendSignInLink } from "#lib/session.svelte.ts";

  let email = $state("");
  let sending = $state(false);
  let result = $state<{ ok: boolean; message: string } | null>(null);

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    sending = true;
    result = await sendSignInLink(email.trim());
    sending = false;
  }
</script>

<svelte:head>
  <title>Sign in · Designing Your Life</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<TopBar account={false} />

<main class="signin measure">
  <h1>Sign in</h1>
  <p class="lede">
    We'll email you a link that signs you in, with no password. Anyone can view a dashboard you share without
    signing in.
  </p>

  {#if result?.ok}
    <div class="card" role="status">
      <p class="sent">{result.message}</p>
      <p class="hint">Open the link on this device. It signs you in and takes you to your dashboard.</p>
    </div>
  {:else}
    <form class="card" onsubmit={submit}>
      <label for="email">Your email</label>
      <div class="row">
        <input
          id="email"
          type="email"
          autocomplete="email"
          required
          bind:value={email}
          placeholder="you@example.com"
        />
        <button type="submit" class="pill" disabled={sending}>
          {sending ? "Sending…" : "Email me a link"}
        </button>
      </div>
      {#if result}<p class="error" role="alert">{result.message}</p>{/if}
      <p class="hint">Sign-in is invite-only for now.</p>
    </form>
  {/if}
</main>

<style>
  .signin {
    padding-top: clamp(32px, 8vh, 96px);
    padding-bottom: 64px;
  }

  h1 {
    margin: 0 0 12px;
    font-size: clamp(2.75rem, 7vw, 5.75rem);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.018em;
  }

  .lede {
    margin: 0 0 28px;
    max-width: 44ch;
    font-size: 1.25rem;
    line-height: 1.4;
    color: var(--ink-soft);
  }

  .card {
    max-width: 520px;
    padding: 20px;
    border-radius: 8px;
    background: var(--card);
    box-shadow: var(--shadow-card);
  }

  label {
    display: block;
    margin: 0 0 8px;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  input {
    flex: 1 1 220px;
    min-width: 0;
    padding: 10px 14px;
    border: 1.5px solid rgb(27 26 34 / 0.2);
    border-radius: 999px;
    background: var(--card);
    color: var(--ink);
    font: inherit;
  }

  input:focus {
    outline: 2px solid var(--work-6);
    outline-offset: 1px;
    border-color: transparent;
  }

  input::placeholder { color: var(--ink-soft); }

  .pill {
    padding: 10px 18px;
    border: 0;
    border-radius: 999px;
    background: var(--ink);
    color: var(--card);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    cursor: pointer;
  }

  .pill:hover:not(:disabled) { background: #33313d; }
  .pill:disabled { opacity: 0.6; cursor: wait; }

  .sent {
    margin: 0 0 6px;
    font-size: 1.25rem;
    font-weight: 700;
  }

  .error {
    margin: 12px 0 0;
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--love-7);
  }

  .hint {
    margin: 12px 0 0;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }
</style>
