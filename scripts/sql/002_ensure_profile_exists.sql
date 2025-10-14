
-- This trigger automatically creates a profile for a new user.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (user_id, full_name, email, exam, branch, institution)
  values (
    new.id,
      new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'exam',
    new.raw_user_meta_data->>'branch',
    new.raw_user_meta_data->>'institution'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop the trigger if it exists to ensure a clean setup
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
