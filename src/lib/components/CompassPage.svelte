<script lang="ts">
  import Compass from "./Compass.svelte";
  import {
    empty,
    prompts,
    questions,
    leadNames,
    restingNeedles,
    type CompassAnswers,
    type Lead,
    type TextField,
  } from "#lib/content/building-a-compass.ts";
  import { loadCompass, saveCompass } from "#lib/storage.ts";
  import { shareLink, type User } from "#lib/session.svelte.ts";

  // One person's Building a Compass page. `editable` is true only for the
  // signed-in owner; everyone else who has the link sees it read-only.
  // `preview` (dev only) makes the page editable without signing in, and saves nothing.
  let { owner, editable, preview = false }: { owner: User | null; editable: boolean; preview?: boolean } = $props();

  let saved: CompassAnswers = $state({ ...empty });
  // Two kinds of editing, like the dashboard: both needles together, or one
  // piece of writing at a time.
  let editingNeedles = $state(false);
  let editingField = $state<TextField | null>(null);
  let needleDraft = $state({ work: 0, life: 0 });
  let textDraft = $state("");
  let leadDraft = $state<Lead | null>(null);
  let status = $state("");
  let copied = $state(false);

  // Which questions are open, FAQ-style. All start closed.
  let opened = $state(new Set<string>());
  function toggle(id: string) {
    const next = new Set(opened);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    opened = next;
  }

  let loaded = $state(false);
  // The needles wait at the star until the answers are in, then swing out.
  let revealed = $state(false);

  $effect(() => {
    const id = owner?.id;
    editingNeedles = false;
    editingField = null;
    status = "";
    loaded = false;
    revealed = false;
    if (!id) {
      saved = { ...empty };
      loaded = true;
      return;
    }
    let current = true;
    loadCompass(id)
      .then((data) => {
        if (!current) return;
        saved = { ...empty, ...(data ?? {}) };
        loaded = true;
      })
      .catch(() => {
        if (current) status = "Couldn't load this compass. Try reloading the page.";
      });
    return () => (current = false);
  });

  $effect(() => {
    if (!loaded || revealed) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => (revealed = true)));
    return () => cancelAnimationFrame(frame);
  });

  const busy = $derived(editingNeedles || editingField !== null || !revealed);
  const unset = $derived(saved.work === null || saved.life === null);
  const needles = $derived(
    editingNeedles
      ? needleDraft
      : { work: saved.work ?? restingNeedles.work, life: saved.life ?? restingNeedles.life }
  );

  const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const words = (text: string) => text.trim().split(/\s+/).filter(Boolean).length;

  async function persist(next: CompassAnswers, message: string) {
    if (!owner) return;
    const before = saved;
    saved = next;
    if (preview) {
      status = "Preview: nothing is saved.";
      return;
    }
    status = "Saving…";
    try {
      await saveCompass(owner.id, next);
      status = message;
    } catch {
      saved = before;
      status = "Couldn't save. Check your connection and try again.";
    }
  }

  function editNeedles() {
    needleDraft = { ...needles };
    status = "";
    editingNeedles = true;
  }

  function saveNeedles() {
    persist({ ...saved, ...needleDraft }, "Needles saved.");
    editingNeedles = false;
  }

  function editField(field: TextField) {
    textDraft = saved[field];
    leadDraft = saved.lead;
    status = "";
    editingField = field;
  }

  function saveField() {
    const field = editingField;
    if (!field) return;
    const next = { ...saved, [field]: textDraft.trim() };
    if (field === "drives") next.lead = leadDraft;
    persist(next, field === "northStar" ? "North Star saved." : "Saved.");
    editingField = null;
  }

  async function copyShareLink() {
    if (!owner) return;
    const link = shareLink(owner.id, "/building-a-compass/");
    try {
      await navigator.clipboard.writeText(link);
      copied = true;
      setTimeout(() => (copied = false), 2500);
    } catch {
      window.prompt("Copy this link to share your compass:", link);
    }
  }

  function focusOnOpen(node: HTMLTextAreaElement) {
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }

  // Enter saves the one-line North Star; the essays keep Enter for new paragraphs.
  function oneLine(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      saveField();
    }
  }
</script>

{#snippet editButton(field: TextField, label: string)}
  {#if editable && editingField !== field}
    <button
      type="button"
      class="note-edit"
      onclick={() => editField(field)}
      disabled={busy}
      aria-label="{saved[field] ? 'Edit' : 'Write'} {label}"
    >
      <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3-8 8H2.5v-3z" /></svg>
      {saved[field] ? "Edit" : "Write"}
    </button>
  {/if}
{/snippet}

{#snippet editor(field: TextField, labelledby: string, rows: number)}
  <textarea
    class="note-input"
    class:is-line={field === "northStar"}
    bind:value={textDraft}
    placeholder={prompts[field]}
    aria-labelledby={labelledby}
    {rows}
    maxlength={field === "northStar" ? 300 : field === "workview" || field === "lifeview" ? 8000 : 4000}
    onkeydown={field === "northStar" ? oneLine : undefined}
    use:focusOnOpen
  ></textarea>
  <div class="note-actions">
    {#if field === "workview" || field === "lifeview"}
      <span class="count" aria-live="polite">{words(textDraft)} words · about 250 is the aim</span>
    {/if}
    <button type="button" class="pill is-small" onclick={() => (editingField = null)}>Cancel</button>
    <button type="button" class="pill is-small is-primary" onclick={saveField}>
      Save {field === "northStar" ? "North Star" : field === "workview" ? "Workview" : field === "lifeview" ? "Lifeview" : "answer"}
    </button>
  </div>
{/snippet}

{#snippet writing(field: TextField)}
  {#if saved[field]}
    {#each paragraphs(saved[field]) as p}
      <p class="note-body">{p}</p>
    {/each}
  {:else if editable || !owner}
    <p class="note-body is-prompt">{prompts[field]}</p>
  {:else}
    <p class="note-body is-prompt">Not written yet.</p>
  {/if}
{/snippet}

<header class="masthead measure">
  <h1 class="title">Building a&nbsp;Compass</h1>
  <div class="masthead-side">
    <div class="whose">
      {#if editable}
        <span class="whose-name">Your compass</span>
        <button type="button" class="note-edit" onclick={copyShareLink}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.8 2.8 0 0 1 4 4L11 8.5M9 11.5l-1.2 1.2a2.8 2.8 0 0 1-4-4L5 7.5" />
          </svg>
          <span aria-live="polite">{copied ? "Link copied" : "Copy share link"}</span>
        </button>
      {:else if owner}
        <span class="whose-name">{owner.name}'s compass</span>
        <span class="whose-mode">View only</span>
      {:else}
        <span class="whose-name">Example compass</span>
        <a class="whose-link" href="/sign-in/">Sign in to fill in yours</a>
      {/if}
    </div>
    <p class="lede">
      What work is for, what life is for, and how well the two point the same way.
    </p>
  </div>
</header>

<main class:is-loading={!loaded} aria-busy={!loaded}>
  <section class="bearing measure" aria-labelledby="north-star-head">
    <div class="bearing-top">
      <p class="status" role="status">{status}</p>
    </div>

    <div class="north-star" class:is-editing={editingField === "northStar"}>
      <div class="note-top">
        <h2 class="star-head" id="north-star-head">
          <svg viewBox="-14 -14 28 28" aria-hidden="true">
            <path d="M0.00,-13.00L2.39,-2.39L8.06,-0.00L2.39,2.39L0.00,13.00L-2.39,2.39L-8.06,0.00L-2.39,-2.39Z" />
          </svg>
          <span class="visually-hidden">North Star</span>
        </h2>
        {@render editButton("northStar", "your North Star")}
      </div>
      {#if editingField === "northStar"}
        {@render editor("northStar", "north-star-head", 2)}
      {:else if saved.northStar}
        <p class="star-line">{saved.northStar}</p>
      {:else if editable || !owner}
        <p class="star-line is-prompt">{prompts.northStar}</p>
      {:else}
        <p class="star-line is-prompt">No North Star yet.</p>
      {/if}
    </div>

    <div class="dial">
      <Compass
        work={needles.work}
        life={needles.life}
        lead={saved.lead}
        pending={!revealed}
        unset={unset}
        editing={editingNeedles}
        onangle={(n, deg) => (needleDraft[n] = deg)}
      />
    </div>
    <ul class="key" aria-hidden="true">
      <li style:--swatch="var(--work-6)">Work</li>
      <li style:--swatch="var(--love-6)">Life</li>
    </ul>
    {#if unset && !editingNeedles && revealed}
      <p class="apart">{editable ? "Your needles aren't set yet." : "Needles not set yet."}</p>
    {/if}
    {#if editable && !editingNeedles}
      <button type="button" class="note-edit needle-edit" onclick={editNeedles} disabled={busy}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3-8 8H2.5v-3z" /></svg>
        {unset ? "Set my needles" : "Move my needles"}
      </button>
    {/if}
  </section>

  <section class="essays measure" aria-label="The two essays">
    {#each [["workview", "Workview", "var(--work-6)"], ["lifeview", "Lifeview", "var(--love-6)"]] as const as [field, name, swatch] (field)}
      <article class="essay" style:--swatch={swatch}>
        <div class="note-top">
          <h2 class="note-head" id="{field}-head">{name}</h2>
          {@render editButton(field, `your ${name}`)}
        </div>
        {#if editingField === field}
          {@render editor(field, `${field}-head`, 12)}
        {:else}
          {@render writing(field)}
        {/if}
      </article>
    {/each}
  </section>

  <section class="fit measure" aria-labelledby="fit-head">
    <h2 class="fit-title" id="fit-head">How they fit together</h2>
    <ol class="questions">
      {#each questions as q (q.id)}
        {@const open = opened.has(q.id) || editingField === q.id}
        <li class="faq" class:is-open={open}>
          <h3 class="faq-q" id="{q.id}-head">
            <button
              type="button"
              class="faq-toggle"
              aria-expanded={open}
              aria-controls="{q.id}-panel"
              onclick={() => toggle(q.id)}
            >
              <span>{q.text}</span>
              <svg class="faq-icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M3.5 6 8 10.5 12.5 6" />
              </svg>
            </button>
          </h3>
          <div class="faq-panel" id="{q.id}-panel" role="region" aria-labelledby="{q.id}-head" inert={!open}>
            <div class="faq-inner">
              <div class="faq-body">
                {#if editable && editingField !== q.id}
                  <div class="faq-tools">{@render editButton(q.id, "your answer")}</div>
                {/if}
                {#if q.id === "drives" && editingField === "drives"}
                  <div class="leads" role="radiogroup" aria-label="Which one leads">
                    {#each ["work", "life", "neither"] as const as l (l)}
                      <button
                        type="button"
                        role="radio"
                        aria-checked={leadDraft === l}
                        class="lead-choice {l}"
                        onclick={() => (leadDraft = l)}
                      >{leadNames[l]}</button>
                    {/each}
                  </div>
                {:else if q.id === "drives" && saved.lead}
                  <p class="lead-chip {saved.lead}">{leadNames[saved.lead]}</p>
                {/if}
                {#if editingField === q.id}
                  {@render editor(q.id, `${q.id}-head`, 5)}
                {:else}
                  {@render writing(q.id)}
                {/if}
              </div>
            </div>
          </div>
        </li>
      {/each}
    </ol>
  </section>
</main>

{#if editingNeedles}
  <div class="editbar" role="region" aria-label="Setting the needles">
    <div class="editbar-inner measure">
      <p class="editbar-hint">
        Point each needle at how close that essay sits to your North Star: straight up is right on it.
        Lean them the same way if they drift together, opposite ways if they pull apart.
      </p>
      <div class="editbar-actions">
        <button type="button" class="pill" onclick={() => (editingNeedles = false)}>Cancel</button>
        <button type="button" class="pill is-primary" onclick={saveNeedles}>Save needles</button>
      </div>
    </div>
  </div>
{/if}

<style>
  main.is-loading .essays,
  main.is-loading .fit {
    opacity: 0.35;
    transition: opacity 300ms;
  }

  .masthead {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: end;
    gap: var(--gap) calc(var(--gap) * 2);
    padding-top: clamp(16px, 3vh, 40px);
    padding-bottom: clamp(4px, 1vh, 12px);
  }

  .title {
    margin: 0;
    font-size: clamp(2.75rem, 7vw, 5.75rem);
    font-weight: 800;
    line-height: 0.92;
    letter-spacing: -0.018em;
    text-wrap: balance;
  }

  .masthead-side { padding-bottom: 0.4em; }

  .lede {
    margin: 0;
    max-width: 34ch;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.35;
    text-wrap: pretty;
  }

  /* The North Star and the dial, centered as one object on the wall. */
  .bearing {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bearing-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    align-self: stretch;
    min-height: 28px;
  }

  .bearing-top .status { margin-right: auto; }

  /* Right under the dial it moves, in the same quiet voice as every Edit. */
  .needle-edit { margin: 10px 0 0; }

  .north-star {
    width: 100%;
    max-width: 30ch;
    margin: 0 0 clamp(16px, 2.5vh, 28px);
    font-size: clamp(1.5rem, 3vw, 2.25rem);
    text-align: center;
  }

  .north-star.is-editing { max-width: 640px; }

  .north-star .note-top {
    justify-content: center;
    position: relative;
    font-size: 1rem;
  }

  .north-star .note-edit {
    position: absolute;
    right: 0;
  }

  .star-head {
    display: flex;
    margin: 0;
    line-height: 1;
  }

  .star-head svg {
    width: 24px;
    height: 24px;
    fill: var(--ink);
  }

  .star-line {
    margin: 0;
    font-weight: 800;
    line-height: 1.08;
    letter-spacing: -0.02em;
    text-wrap: balance;
  }

  .star-line.is-prompt {
    font-size: 1.125rem;
    font-weight: 500;
    font-style: italic;
    line-height: 1.4;
    letter-spacing: 0;
    color: var(--ink-soft);
  }

  .note-input.is-line {
    min-height: 0;
    font-size: inherit;
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.02em;
    text-align: center;
  }

  .note-input.is-line::placeholder {
    font-size: 1.125rem;
    font-weight: 500;
    letter-spacing: 0;
  }

  .dial {
    /* Shrinks on short laptop screens so the whole dial is in the first view. */
    width: min(440px, 100%, max(300px, calc(100svh - 450px)));
    --swatch: var(--work-6);
  }

  /* Which needle is which, in the same voice as the essay heads below. */
  .key {
    display: flex;
    gap: 20px;
    margin: clamp(14px, 2vh, 20px) 0 0;
    padding: 0;
    list-style: none;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .key li {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .key li::before {
    content: "";
    width: 18px;
    height: 4px;
    border-radius: 2px;
    background: var(--swatch);
  }

  .apart {
    margin: 8px 0 0;
    font-size: 0.8125rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* Workview and Lifeview, side by side like facing pages. */
  .essays {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(32px, 4vw, 64px);
    margin-top: clamp(56px, 10vh, 112px);
  }

  .essay :global(.note-body) {
    max-width: 62ch;
    font-size: 1.0625rem;
    line-height: 1.6;
  }

  .essay :global(.note-body + .note-body) { margin-top: 0.85em; }

  .count {
    margin-right: auto;
    font-size: 0.8125rem;
    color: var(--ink-soft);
    font-variant-numeric: tabular-nums;
  }

  .note-actions { align-items: center; }

  /* The three questions, read like an interview: big question, answer under it. */
  .fit { margin-top: clamp(64px, 11vh, 128px); }

  .fit-title {
    margin: 0 0 clamp(24px, 4vh, 40px);
    font-size: clamp(2rem, 4.4vw, 3.25rem);
    font-weight: 800;
    line-height: 0.95;
    letter-spacing: -0.03em;
  }

  /* An FAQ: each question is its own white card on the wall, and opens to
     show the answer. */
  .questions {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 12px;
  }

  .faq {
    border-radius: 8px;
    background: var(--card);
    box-shadow: var(--shadow-card);
  }

  .faq-q { margin: 0; }

  .faq-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    width: 100%;
    padding: clamp(18px, 2.6vh, 24px) clamp(18px, 2.4vw, 28px);
    border: 0;
    border-radius: 8px;
    background: none;
    color: var(--ink);
    font: inherit;
    font-size: clamp(1.0625rem, 1.7vw, 1.25rem);
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: -0.01em;
    text-align: left;
    text-wrap: balance;
    cursor: pointer;
  }

  .faq-toggle:hover .faq-icon { background: var(--wall); }

  .faq-icon {
    flex-shrink: 0;
    width: 32px;
    height: 32px;
    padding: 8px;
    border-radius: 50%;
    fill: none;
    stroke: var(--ink);
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: background-color 200ms, transform 300ms cubic-bezier(0.25, 1, 0.5, 1);
  }

  /* A down chevron that flips up when the answer is open. */
  .is-open .faq-icon { transform: rotate(180deg); }

  /* The answer slides open by animating the row height. */
  .faq-panel {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 320ms cubic-bezier(0.25, 1, 0.5, 1);
  }

  .is-open .faq-panel { grid-template-rows: 1fr; }

  .faq-inner { overflow: hidden; }

  .faq-body {
    /* A few px of top padding so nothing (the Edit button, a focus ring) is
       clipped by the panel's hidden overflow. */
    padding: 4px clamp(18px, 2.4vw, 28px) clamp(20px, 3vh, 28px);
    --swatch: var(--work-6);
  }

  .faq-tools {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    .faq-panel, .faq-icon { transition: none; }
  }



  .faq-body :global(.note-body),
  .faq-body .note-input,
  .faq-body .leads,
  .faq-body .note-actions { max-width: 68ch; }

  .faq-body :global(.note-body) {
    font-size: 1.0625rem;
    line-height: 1.6;
  }

  .faq-body :global(.note-body + .note-body) { margin-top: 0.85em; }

  /* Which one leads: a chip when reading, three choices when editing. */
  .lead-chip {
    display: inline-block;
    margin: 0 0 10px;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .lead-chip.work { background: var(--work-2); color: var(--work-9); }
  .lead-chip.life { background: var(--love-2); color: var(--love-9); }
  .lead-chip.neither { background: rgb(27 26 34 / 0.08); color: var(--ink); }

  .leads {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 12px;
  }

  .lead-choice {
    padding: 7px 14px;
    border: 0;
    border-radius: 999px;
    background: var(--card);
    box-shadow: var(--shadow-card);
    color: var(--ink);
    font: inherit;
    font-size: 0.8125rem;
    font-weight: 700;
    cursor: pointer;
  }

  .lead-choice:hover { background: var(--wall); }
  .lead-choice[aria-checked="true"].work { background: var(--work-6); color: var(--card); }
  .lead-choice[aria-checked="true"].life { background: var(--love-6); color: var(--card); }
  .lead-choice[aria-checked="true"].neither { background: var(--ink); color: var(--card); }

  @media (max-width: 1039px) {
    .masthead { grid-template-columns: 1fr; align-items: start; }
  }

  @media (max-width: 719px) {
    .masthead { padding-top: 14px; }
    .lede { font-size: 1.125rem; }
    .north-star .note-top { justify-content: space-between; }
    .north-star .note-edit { position: static; }
    .north-star { text-align: left; }
    .note-input.is-line { text-align: left; }
    .dial { width: min(400px, 100%); }
    .essays { grid-template-columns: 1fr; gap: 40px; }
  }
</style>
