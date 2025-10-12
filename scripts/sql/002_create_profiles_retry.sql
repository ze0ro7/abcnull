begin;

create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  exam text check (exam in ('GATE','SSC','JEE','NEET')),
  branch text,
  institution text,
  created_at timestamptz not null default now()
);

-- Ensure roles can access via PostgREST (RLS still applies)
grant usage on schema public to anon, authenticated;
grant select, insert, update on public.profiles to anon, authenticated;

alter table public.profiles enable row level security;

do $$
begin
  if not exists (select 1 from pg_policies where polname = 'profiles_select_own') then
    create policy profiles_select_own on public.profiles for select using (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where polname = 'profiles_insert_own') then
    create policy profiles_insert_own on public.profiles for insert with check (auth.uid() = user_id);
  end if;

  if not exists (select 1 from pg_policies where polname = 'profiles_update_own') then
    create policy profiles_update_own on public.profiles for update using (auth.uid() = user_id);
  end if;
end $$;

-- Ask PostgREST to reload schema cache (safe if extension exists)
do $$
begin
  perform pg_notify('pgrst', 'reload schema');
exception when others then
  -- ignore if pgrst channel is not present
  null;
end $$;

commit;
