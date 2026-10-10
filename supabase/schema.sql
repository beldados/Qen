create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  birth_date date not null,
  calendar_preference text default 'gregorian' check (calendar_preference in ('gregorian', 'ethiopian')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;
create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on public.profiles for insert with check (auth.uid() = id);
