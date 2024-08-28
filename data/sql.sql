-- Users
create table
  users (
    id uuid primary key references auth.users (id) not null,
    email text unique not null,
    name text,
    type text default 'user' check (
      type in ('user', 'admin', 'regulator')
    ),
    avatar_url text not null,
    created_at timestamp default current_timestamp,
    is_away boolean default false not null,
    phone text,
    workspaces text[],
    channels text[]
  );

-- After Creating User Table, We turn on RowLevelSecurity
alter table users enable row level security;

-- Creating Policies on User Table
create policy "Everyone Can view own user data." on users for
select
  using (true);

create policy "Can update own user data." on users
for update
  using (auth.uid () = id);

-- Trigger for when creating new user
-- We'll set Avatar Image and 
create
or replace function public.handle_new_user () returns trigger as $$
begin
  if new.raw_user_meta_data->>'avatar_url' is null or new.raw_user_meta_data->>'avatar_url' = '' then
    new.raw_user_meta_data = jsonb_set(new.raw_user_meta_data, '{avatar_url}', '"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"' ::jsonb);
  end if;
  insert into public.users (id, name, type, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', 'user', new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create
or replace trigger on_auth_user_created
after insert on auth.users for each row
execute procedure public.handle_new_user ();

-- Create the 'workspaces' table
create table workspaces (
  id uuid primary key default gen_random_uuid() not null,
  name text not null,
  image_url text,
  invite_code text,
  members text[], -- An array of member IDs
  channels text[], -- An array of channel IDs
  slug text, -- Adding a unique constraint to slug if required
  regulators text[], -- An array of regulator IDs
  super_admin uuid not null references users(id) on update cascade on delete cascade, -- Foreign key referencing users.id
  created_at timestamp default current_timestamp
);

-- Enable Row-Level Security (RLS) for the 'workspaces' table
alter table workspaces enable row level security;

-- Create the RLS policy for inserting by authenticated users
create policy "Enable insert for authenticated users" 
on workspaces
for insert
with check (auth.role() = 'authenticated'); -- Allows insert if the user is authenticated

-- Create the RLS policy for reading workspaces by all users
create policy "Enable read access for all users" 
on workspaces
for select
using (true); -- Allows all users to read workspaces

-- Super Admin Policy
create policy "SuperAdminCanUpdate" on "public"."workspaces" as permissive
for update 
  to public using ("super_admin" = auth.uid ());
  
-- 
-- ADD Member TO WORKSPACE 
create
or replace function add_member_to_workspace (user_id text, workspace_id uuid) returns void as $$
BEGIN
  update workspaces set members = members || array[user_id]
  where id = workspace_id;
END;
$$ language plpgsql;

-- 
-- ADD USER TO WORKSPACE 
create
or replace function add_workspace_to_user (user_id uuid, new_workspace text) returns void as $$
BEGIN
  update users set workspaces = workspaces || array[new_workspace]
  where id = user_id;
END;
$$ language plpgsql;

-- CREATE CHANNELS
create table
  channels (
    id uuid primary key default gen_random_uuid () not null,
    name text not null,
    workspace_id uuid references public.workspaces (id) not null,
    user_id uuid references public.users (id) not null,
    members text[],
    regulators text[]
  );

alter table channels enable row level security;

create policy "Can view own user data." on channels for
select
  using (auth.uid () = user_id);

create policy "Can update own user data." on channels
for update
  using (auth.uid () = user_id);

create policy "Can insert own user data." on channels for insert
with
  check (auth.uid () = user_id);

-- UPDATE USER CHANNELS 
create
or replace function update_user_channels (user_id uuid, channel_id text) returns void as $$
BEGIN
  update users set channels = channels || array[channel_id]
  where id = user_id;
END;
$$ language plpgsql;

-- UPDATE CHANNEL MEMBERS 
create
or replace function update_channel_members (new_member text, channel_id uuid) returns void as $$
BEGIN
  update channels set members = members || array[new_member]
  where id = channel_id;
END;
$$ language plpgsql;

-- UPDATE WORKSPACE CHANNEL 
create
or replace function add_channel_to_workspace (channel_id text, workspace_id uuid) returns void as $$
begin
  update workspaces set channels = channels || array[channel_id]
  where id = workspace_id;
end;
$$ language plpgsql;

-- UPDATE CHANNEL REGULATORS 
create
or replace function update_channel_regulators (new_regulator text, channel_id uuid) returns void as $$
BEGIN
  update channels set regulators = regulators || array[new_regulator]
  where id = channel_id;
END;
$$ language plpgsql;

-- Create the 'messages' table
create table 
  messages (
    id uuid primary key default gen_random_uuid() not null,
    name text,
    user_id uuid not null references users(id) on update cascade on delete cascade, -- Foreign key referencing users.id
    file_url text,
    content text,
    workspace_id uuid not null references workspaces(id) on update cascade on delete cascade,
    channel_id uuid not null references channels(id) on update cascade on delete cascade,
    is_deleted boolean default false,
    created_at timestamp default current_timestamp,
    updated_at timestamp default current_timestamp
  );

-- Enable Row-Level Security (RLS) for the 'messages' table
alter table messages enable row level security;

-- Create the RLS policy for inserting by authenticated users
create policy "Enable insert for authenticated users" 
on messages
for insert
with check (auth.role() = 'authenticated'); -- Allows insert if the user is authenticated

-- Create the RLS policy for reading messages by all users
create policy "Enable read access for all users" 
on messages
for select
using (true); -- Allows all users to read messages

-- Create the RLS policy for updating messages by all users
create policy "Enable update own user messages." on messages
for update
  using (auth.uid () = user_id);


-- Send "previous data" on change 
alter table public.users replica identity full; 
alter table public.channels replica identity full; 
alter table public.messages replica identity full;

/**
 * REALTIME SUBSCRIPTIONS
 * Only allow realtime listening on public tables.
 */

begin; 
  -- remove the realtime publication
  drop publication if exists supabase_realtime; 

  -- re-create the publication but don't enable it for any tables
  create publication supabase_realtime;  
commit;

-- add tables to the publication
alter publication supabase_realtime add table public.channels;
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.users;