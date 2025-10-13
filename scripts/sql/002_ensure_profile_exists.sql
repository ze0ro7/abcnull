-- check if a profile exists and if not, create one
do $$
begin
    if not exists (select 1 from public.profiles where user_id = auth.uid()) then
        insert into public.profiles (user_id, full_name, exam, branch, institution)
        values (auth.uid(), 'Test User', 'GATE', 'CHE', 'Test Institute');
    end if;
end $$;
