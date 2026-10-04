// Loading and saving dashboards, through Supabase.

import { supabase } from "#lib/supabase.ts";
import type { AreaId } from "#lib/content/start-where-you-are.ts";

export interface Answer {
  id: AreaId;
  score: number;
  note: string;
}

export interface DashboardData {
  id: string;
  name: string;
  answers: Answer[];
}

/** One person's dashboard, by their ID. Null when no one has that ID. */
export async function loadDashboard(userId: string): Promise<DashboardData | null> {
  if (!/^[0-9a-f-]{36}$/i.test(userId)) return null;
  const { data, error } = await supabase.rpc("get_dashboard", { p_user: userId });
  if (error) throw error;
  return (data as DashboardData | null) ?? null;
}

/** Save the signed-in person's answers. The database only allows their own rows. */
export async function saveAnswers(userId: string, answers: Answer[]): Promise<void> {
  const { error } = await supabase.from("answers").upsert(
    answers.map((a) => ({
      user_id: userId,
      exercise: "start-where-you-are",
      area: a.id,
      score: a.score,
      note: a.note,
      updated_at: new Date().toISOString(),
    })),
    { onConflict: "user_id,exercise,area" }
  );
  if (error) throw error;
}
