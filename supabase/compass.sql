-- Building a Compass (chapter 2): Workview, Lifeview, the three questions and
-- the compass needles. Added 2026-10-07, after schema.sql was already set up.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Same rules as schema.sql: anyone with a person's link can read their compass,
-- one ID at a time through get_compass(); only the signed-in owner can write it.

-- One row per person. Angles are degrees from the North Star, clockwise
-- (-180 to 180), and stay null until the owner first sets the needles.
create table public.compasses (
  user_id uuid primary key references auth.users (id) on delete cascade,
  north_star text not null default '' check (char_length(north_star) <= 300),
  workview text not null default '' check (char_length(workview) <= 8000),
  lifeview text not null default '' check (char_length(lifeview) <= 8000),
  complement text not null default '' check (char_length(complement) <= 4000),
  clash text not null default '' check (char_length(clash) <= 4000),
  drives text not null default '' check (char_length(drives) <= 4000),
  lead text check (lead in ('work', 'life', 'neither')),
  work_angle integer check (work_angle between -180 and 180),
  life_angle integer check (life_angle between -180 and 180),
  updated_at timestamptz not null default now()
);

alter table public.compasses enable row level security;

grant select, insert, update on public.compasses to authenticated;

create policy "Owner reads own compass" on public.compasses
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Owner adds own compass" on public.compasses
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Owner changes own compass" on public.compasses
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

-- Everyone reads a compass through this function, one person's ID at a time.
-- Returns null when that person hasn't saved anything yet.
create function public.get_compass(p_user uuid)
returns json
language sql
stable
security definer
set search_path = ''
as $$
  select json_build_object(
    'northStar', c.north_star,
    'workview', c.workview,
    'lifeview', c.lifeview,
    'complement', c.complement,
    'clash', c.clash,
    'drives', c.drives,
    'lead', c.lead,
    'work', c.work_angle,
    'life', c.life_angle
  )
  from public.compasses c
  where c.user_id = p_user;
$$;

revoke all on function public.get_compass(uuid) from public;
grant execute on function public.get_compass(uuid) to anon, authenticated;
