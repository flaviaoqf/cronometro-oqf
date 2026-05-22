-- ==============================================
-- CRONÔMETRO OQF — SQL para rodar no Supabase
-- SQL Editor > New Query > colar tudo > Run
-- ==============================================

-- Tabela de perfil dos usuários (nome, email, telefone)
create table if not exists study_timer_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  phone text,
  created_at timestamp default now()
);

-- Tabela de sessões de estudo
create table if not exists study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  subject text,
  started_at timestamp,
  ended_at timestamp,
  duration_seconds integer,
  created_at timestamp default now()
);

-- Ativar Row Level Security (cada usuário vê só os próprios dados)
alter table study_timer_profiles enable row level security;
alter table study_sessions enable row level security;

-- Policies: perfis
create policy "Users can view own profile"
  on study_timer_profiles for select using (auth.uid() = id);

create policy "Users can insert own profile"
  on study_timer_profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile"
  on study_timer_profiles for update using (auth.uid() = id);

-- Policies: sessões
create policy "Users can view own sessions"
  on study_sessions for select using (auth.uid() = user_id);

create policy "Users can insert own sessions"
  on study_sessions for insert with check (auth.uid() = user_id);

create policy "Users can update own sessions"
  on study_sessions for update using (auth.uid() = user_id);

create policy "Users can delete own sessions"
  on study_sessions for delete using (auth.uid() = user_id);
