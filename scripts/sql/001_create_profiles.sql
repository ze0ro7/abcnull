
create table public.profiles (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null,
  full_name text null,
  email text null,
  exam text null,
  branch text null,
  institution text null,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_user_id_fkey foreign key (user_id) references auth.users (id) on delete cascade
);

alter table public.profiles enable row level security;

create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = user_id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = user_id);
