// Who is signed in. Accounts are invite-only: signing in emails a link to an
// address that has already been added in Supabase (Authentication -> Users).

import { supabase } from "#lib/supabase.ts";

export interface User {
  id: string;
  name: string;
}

export const session = $state<{ user: User | null; ready: boolean }>({ user: null, ready: false });

let started = false;

async function nameFor(id: string): Promise<string> {
  const { data } = await supabase.from("profiles").select("display_name").eq("id", id).maybeSingle();
  return data?.display_name || "You";
}

/** Read the current session once, then follow sign-ins and sign-outs. */
export function restoreSession() {
  if (started) return;
  started = true;
  supabase.auth.onAuthStateChange((_event, auth) => {
    const id = auth?.user?.id ?? null;
    if (!id) {
      session.user = null;
      session.ready = true;
      return;
    }
    // Look the name up outside the auth callback, as Supabase recommends.
    setTimeout(async () => {
      session.user = { id, name: await nameFor(id) };
      session.ready = true;
    }, 0);
  });
}

/** Email a sign-in link. Fails for addresses that haven't been invited. */
export async function sendSignInLink(email: string): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false,
      emailRedirectTo: `${location.origin}/`,
    },
  });
  if (!error) return { ok: true, message: `Check ${email} for a sign-in link.` };
  if (/signups? not allowed|not found|otp_disabled/i.test(error.message)) {
    return { ok: false, message: "That email hasn't been invited yet." };
  }
  if (/rate limit|too many/i.test(error.message)) {
    return { ok: false, message: "Too many sign-in emails just now. Wait a few minutes and try again." };
  }
  return { ok: false, message: `Couldn't send the link: ${error.message}` };
}

/** Sign in with email and password. No email is sent, so there's no hourly limit. */
export async function signInWithPassword(email: string, password: string): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (!error) return { ok: true, message: "" };
  if (/invalid login credentials/i.test(error.message)) {
    return { ok: false, message: "That email and password don't match. If you haven't set a password yet, use an email link once and set one." };
  }
  if (/rate limit|too many/i.test(error.message)) {
    return { ok: false, message: "Too many tries just now. Wait a minute and try again." };
  }
  return { ok: false, message: `Couldn't sign in: ${error.message}` };
}

/** Set or change the signed-in person's password. */
export async function setPassword(password: string): Promise<{ ok: boolean; message: string }> {
  const { error } = await supabase.auth.updateUser({ password });
  if (!error) return { ok: true, message: "Password saved. Next time, sign in with it." };
  if (/reauthenticat|recent/i.test(error.message)) {
    return { ok: false, message: "For safety, sign in again with an email link, then set your password right away." };
  }
  if (/weak|short|at least/i.test(error.message)) {
    return { ok: false, message: `That password is too weak: ${error.message}` };
  }
  return { ok: false, message: `Couldn't save the password: ${error.message}` };
}

export async function signOut() {
  await supabase.auth.signOut();
  session.user = null;
}

/** The read-only link to a person's contents page, for browsing all their answers. */
export const shareHome = (id: string) => `${location.origin}/?u=${id}`;

/** The read-only link to one of a person's exercise pages (their dashboard by default). */
export const shareLink = (id: string, path = "/start-where-you-are/") => `${location.origin}${path}?u=${id}`;
