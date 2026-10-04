-- Designing Your Life: database setup.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
--
-- Rules:
--   * Accounts are invite-only (people are added in Authentication -> Users).
--   * Anyone with a dashboard's link can read it, but only by asking for that one
--     person's ID through get_dashboard(). Nobody can list everyone's dashboards.
--   * Only the signed-in owner can change their own name and answers.

-- One row per person: the name shown on their dashboard.
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '' check (char_length(display_name) <= 60),
  created_at timestamptz not null default now()
);

-- One row per person, per exercise, per area.
create table public.answers (
  user_id uuid not null references auth.users (id) on delete cascade,
  exercise text not null default 'start-where-you-are',
  area text not null check (area in ('health', 'work', 'play', 'love')),
  score integer not null check (score between 0 and 100),
  note text not null default '' check (char_length(note) <= 4000),
  updated_at timestamptz not null default now(),
  primary key (user_id, exercise, area)
);

alter table public.profiles enable row level security;
alter table public.answers enable row level security;

-- Signed-in people can read and write only their own rows directly.
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.answers to authenticated;

create policy "Owner reads own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "Owner creates own profile" on public.profiles
  for insert to authenticated with check ((select auth.uid()) = id);
create policy "Owner renames self" on public.profiles
  for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

create policy "Owner reads own answers" on public.answers
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Owner adds own answers" on public.answers
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Owner changes own answers" on public.answers
  for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Owner removes own answers" on public.answers
  for delete to authenticated using ((select auth.uid()) = user_id);

-- Everyone reads a dashboard through this function, one person's ID at a time.
-- Returns null when the ID doesn't belong to anyone.
create function public.get_dashboard(p_user uuid)
returns json
language sql
stable
security definer
set search_path = ''
as $$
  select json_build_object(
    'id', p.id,
    'name', p.display_name,
    'answers', coalesce(
      (select json_agg(json_build_object('id', a.area, 'score', a.score, 'note', a.note))
         from public.answers a
        where a.user_id = p.id and a.exercise = 'start-where-you-are'),
      '[]'::json)
  )
  from public.profiles p
  where p.id = p_user;
$$;

revoke all on function public.get_dashboard(uuid) from public;
grant execute on function public.get_dashboard(uuid) to anon, authenticated;

-- Give every new account a profile, named after the part of their email before the @.
-- Change names afterwards in Table Editor -> profiles -> display_name.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, split_part(new.email, '@', 1));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
