<script lang="ts">
  import Arrow from "#lib/components/Arrow.svelte";
  import TopBar from "#lib/components/TopBar.svelte";
  import { EXAMPLE_ANSWERS } from "#lib/content/example.ts";
  import { sendSignInLink } from "#lib/session.svelte.ts";

  let email = $state("");
  let sending = $state(false);
  let sentTo = $state("");
  let error = $state("");

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    const address = email.trim();
    if (!address) return;
    sending = true;
    error = "";
    const result = await sendSignInLink(address);
    sending = false;
    if (result.ok) sentTo = address;
    else error = result.message;
  }

  function startOver() {
    sentTo = "";
    error = "";
  }
</script>

<svelte:head>
  <title>Sign in · Designing Your Life</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<TopBar account={false} />

<main class="signin">
  {#if sentTo}
    <div role="status">
      <h1>Check your inbox</h1>
      <p class="lede">
        We sent a sign-in link to <strong>{sentTo}</strong>. Open it on this device and it'll take you to
        your dashboard.
      </p>
      <p class="note">It can take a minute to arrive. If it doesn't, look in spam.</p>
      <button type="button" class="text-button" onclick={startOver}>Use a different email</button>
    </div>
  {:else}
    <h1>Sign in</h1>
    <p class="lede">
      Keep your answers to <cite>Designing Your Life</cite>, one exercise at a time. We'll email you a
      link, so there's no password to remember.
    </p>

    <form onsubmit={submit}>
      <label for="email">Email</label>
      <input
        id="email"
        type="email"
        autocomplete="email"
        required
        bind:value={email}
        placeholder="you@example.com"
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? "email-error" : undefined}
      />
      {#if error}
        <p class="error" id="email-error" role="alert">{error}</p>
      {/if}
      <button type="submit" class="send" disabled={sending}>
        {sending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>

    <p class="note">Accounts are invite-only for now.</p>
  {/if}

  <a class="example" href="/?u={EXAMPLE_ANSWERS}">
    Just looking? See an example <Arrow />
  </a>
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

  .lede strong {
    color: var(--ink);
    overflow-wrap: anywhere;
  }

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

  input::placeholder { color: var(--ink-soft); }

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

  .send {
    display: block;
    width: 100%;
    height: 48px;
    margin-top: 12px;
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

  .note {
    margin: 14px 0 0;
    font-size: 0.875rem;
    color: var(--ink-soft);
  }

  .text-button {
    margin-top: 16px;
    padding: 0;
    border: 0;
    background: none;
    color: var(--ink);
    font: inherit;
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
  }

  /* A quiet way out for anyone who just wants to see what this is. */
  .example {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgb(27 26 34 / 0.12);
    width: 100%;
    color: var(--ink);
    font-size: 0.875rem;
    font-weight: 700;
    text-decoration: none;
  }

  .example:hover { text-decoration: underline; text-underline-offset: 3px; }
</style>
