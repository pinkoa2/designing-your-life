<script lang="ts">
  import TubeRack from "./TubeRack.svelte";
  import { checkin, type Area, type AreaId } from "#lib/content/start-where-you-are.ts";
  import { loadDashboard, saveAnswers, type Answer } from "#lib/storage.ts";
  import { shareLink, type User } from "#lib/session.svelte.ts";

  // One person's Start Where You Are dashboard. `editable` is true only for the
  // signed-in owner; everyone else who has the link sees it read-only.
  let { owner, editable }: { owner: User | null; editable: boolean } = $props();

  const defaults = checkin.areas;

  // A dashboard is the defaults with the owner's saved answers laid over them.
  const merge = (answers: Answer[] | null): Area[] =>
    defaults.map((d) => {
      const saved = answers?.find((a) => a.id === d.id);
      return saved ? { ...d, score: saved.score, note: saved.note } : { ...d };
    });

  let saved: Area[] = $state(merge(null));
  // Two separate kinds of editing: all four gauges together, or one note at a time.
  let editingScores = $state(false);
  let editingNote = $state<AreaId | null>(null);
  let draft: Area[] = $state([]);
  let noteDraft = $state("");
  let status = $state("");
  let copied = $state(false);

  let loaded = $state(false);
  // The rack starts empty and fills once the answers are in; `revealed` flips a
  // frame after loading so the tubes are painted empty first.
  let revealed = $state(false);

  // Load whenever the dashboard's owner changes (runs in the browser only).
  $effect(() => {
    const id = owner?.id;
    editingScores = false;
    editingNote = null;
    status = "";
    loaded = false;
    revealed = false;
    if (!id) {
      saved = merge(null);
      loaded = true;
      return;
    }
    let current = true;
    loadDashboard(id)
      .then((data) => {
        if (!current) return;
        saved = merge(data?.answers ?? null);
        loaded = true;
      })
      .catch(() => {
        if (current) status = "Couldn't load this dashboard. Try reloading the page.";
      });
    return () => (current = false);
  });

  $effect(() => {
    if (!loaded || revealed) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => (revealed = true)));
    return () => cancelAnimationFrame(frame);
  });

  const busy = $derived(editingScores || editingNote !== null || !revealed);
  const areas = $derived(editingScores ? draft : saved);
  const lowest = $derived(Math.min(...areas.map((a) => a.score)));
  const highest = $derived(Math.max(...areas.map((a) => a.score)));
  const names = (score: number) =>
    areas.filter((a) => a.score === score).map((a) => a.name).join(" & ");

  async function persist(next: Area[], message: string) {
    if (!owner) return;
    const before = saved;
    saved = next;
    status = "Saving…";
    try {
      await saveAnswers(
        owner.id,
        next.map(({ id, score, note }) => ({ id, score, note }))
      );
      status = message;
    } catch {
      saved = before;
      status = "Couldn't save. Check your connection and try again.";
    }
  }

  function editScores() {
    draft = saved.map((a) => ({ ...a }));
    status = "";
    editingScores = true;
  }

  function saveScores() {
    persist(draft.map((a) => ({ ...a })), "Gauges saved.");
    editingScores = false;
  }

  function setScore(id: AreaId, score: number) {
    const area = draft.find((a) => a.id === id);
    if (area) area.score = score;
  }

  function editNote(id: AreaId) {
    noteDraft = saved.find((a) => a.id === id)?.note ?? "";
    status = "";
    editingNote = id;
  }

  function saveNote() {
    const id = editingNote;
    persist(
      saved.map((a) => (a.id === id ? { ...a, note: noteDraft.trim() } : a)),
      "Note saved."
    );
    editingNote = null;
  }

  async function copyShareLink() {
    if (!owner) return;
    const link = shareLink(owner.id);
    try {
      await navigator.clipboard.writeText(link);
      copied = true;
      setTimeout(() => (copied = false), 2500);
    } catch {
      window.prompt("Copy this link to share your dashboard:", link);
    }
  }

  // Put the cursor straight into a note when its editor opens.
  function focusOnOpen(node: HTMLTextAreaElement) {
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }
</script>

<header class="masthead measure">
  <h1 class="title">Start Where You&nbsp;Are</h1>
  <div class="masthead-side">
    <div class="whose">
      {#if editable}
        <span class="whose-name">Your dashboard</span>
        <button type="button" class="note-edit" onclick={copyShareLink}>
          <svg viewBox="0 0 16 16" aria-hidden="true">
            <path d="M6.5 9.5l3-3M7 4.5l1.2-1.2a2.8 2.8 0 0 1 4 4L11 8.5M9 11.5l-1.2 1.2a2.8 2.8 0 0 1-4-4L5 7.5" />
          </svg>
          <span aria-live="polite">{copied ? "Link copied" : "Copy share link"}</span>
        </button>
      {:else if owner}
        <span class="whose-name">{owner.name}'s dashboard</span>
        <span class="whose-mode">View only</span>
      {:else}
        <span class="whose-name">Example dashboard</span>
        <a class="whose-link" href="/sign-in/">Sign in to fill in yours</a>
      {/if}
    </div>
    <p class="summary" class:is-pending={!revealed}>
      Most room to grow: <strong>{names(lowest)}</strong>, at {lowest}%.
      Strongest: <strong>{names(highest)}</strong>, at {highest}%.
    </p>
  </div>
</header>

<main class="measure" class:is-loading={!loaded} aria-busy={!loaded}>
  <div class="rack-top">
    <p class="status" role="status">{status}</p>
    {#if editable && !editingScores}
      <button type="button" class="note-edit" onclick={editScores} disabled={busy}>
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3-8 8H2.5v-3z" /></svg>
        Edit my gauges
      </button>
    {/if}
  </div>

  <TubeRack
    areas={revealed ? areas : areas.map((a) => ({ ...a, score: 0 }))}
    lowest={revealed ? lowest : -1}
    pending={!revealed}
    editing={editingScores}
    onscore={setScore}
  />

  <ol class="notes" aria-label="Why each score">
    {#each areas as area (area.id)}
      <li class="note" style:--swatch="var(--{area.id}-6)">
        <div class="note-top">
          <h3 class="note-head" id="note-{area.id}">{area.name}</h3>
          {#if editable && editingNote !== area.id}
            <button
              type="button"
              class="note-edit"
              onclick={() => editNote(area.id)}
              disabled={busy}
              aria-label="{area.note ? 'Edit' : 'Write'} the {area.name} note"
            >
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M10.5 2.5l3 3-8 8H2.5v-3z" /></svg>
              {area.note ? "Edit" : "Write"}
            </button>
          {/if}
        </div>
        {#if editingNote === area.id}
          <textarea
            class="note-input"
            bind:value={noteDraft}
            placeholder={area.prompt}
            aria-labelledby="note-{area.id}"
            rows="6"
            use:focusOnOpen
          ></textarea>
          <div class="note-actions">
            <button type="button" class="pill is-small" onclick={() => (editingNote = null)}>Cancel</button>
            <button type="button" class="pill is-small is-primary" onclick={saveNote}>Save note</button>
          </div>
        {:else if area.note}
          <p class="note-body">{area.note}</p>
        {:else if editable || !owner}
          <p class="note-body is-prompt">{area.prompt}</p>
        {:else}
          <p class="note-body is-prompt">No note yet.</p>
        {/if}
      </li>
    {/each}
  </ol>
</main>

{#if editingScores}
  <div class="editbar" role="region" aria-label="Editing gauges">
    <div class="editbar-inner measure">
      <p class="editbar-hint">
        Drag the handle in each tube, or tap a number to type it.
      </p>
      <div class="editbar-actions">
        <button type="button" class="pill" onclick={() => (editingScores = false)}>Cancel</button>
        <button type="button" class="pill is-primary" onclick={saveScores}>Save gauges</button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Until a dashboard's answers arrive, the default levels show faintly. */
  main.is-loading :global(.stand),
  main.is-loading .notes {
    opacity: 0.35;
    transition: opacity 300ms;
  }

  .masthead {
    display: grid;
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: end;
    gap: var(--gap) calc(var(--gap) * 2);
    padding-top: clamp(16px, 3vh, 40px);
    padding-bottom: clamp(20px, 3vh, 36px);
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

  .summary {
    margin: 0 0 14px;
    font-size: 1.25rem;
    line-height: 1.35;
    font-weight: 500;
    max-width: 34ch;
    text-wrap: pretty;
  }

  .summary strong { font-weight: 800; }

  /* Keep the line's space but hide the default numbers until the real ones land. */
  .summary.is-pending { visibility: hidden; }

  .notes {
    list-style: none;
    margin: clamp(32px, 5vh, 56px) 0 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: var(--gap);
  }


  /* The gauges' edit button sits right above the rack, like each note's. */
  .rack-top {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 12px;
    min-height: 28px;
  }

  .rack-top .status { margin-right: auto; }

  @media (max-width: 1039px) {
    .masthead { grid-template-columns: 1fr; align-items: start; }
    .notes { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 28px; }
  }

  @media (max-width: 719px) {
    .masthead { padding-top: 14px; }
    .summary { font-size: 1.125rem; }
    .notes { grid-template-columns: 1fr; row-gap: 24px; }
  }
</style>
