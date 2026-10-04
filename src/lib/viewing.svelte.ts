// Whose answers this visit is about. A shared link carries the person's ID as
// ?u=<id>, and every link on the site keeps it, so a visitor can move between
// that person's pages. With no ?u=, pages show the signed-in person's own answers.

import { loadDashboard } from "#lib/storage.ts";

export const viewing = $state<{
  id: string | null;
  name: string | null;
  checked: boolean;
}>({ id: null, name: null, checked: false });

/** Read ?u= from the address and look the person up. Call after every navigation. */
export async function readViewing() {
  const id = new URLSearchParams(location.search).get("u");
  viewing.checked = false;
  viewing.id = id;
  viewing.name = null;
  if (id) {
    try {
      viewing.name = (await loadDashboard(id))?.name ?? null;
    } catch {
      viewing.name = null;
    }
  }
  viewing.checked = true;
}

/** A site link that stays on the same person's answers (only once they're found). */
export const withPerson = (href: string) =>
  viewing.id && viewing.name !== null ? `${href}?u=${viewing.id}` : href;

/** "Alex's", or "your" when it's the signed-in person's own. */
export const possessive = (name: string | null) => (name ? `${name}'s` : "your");
