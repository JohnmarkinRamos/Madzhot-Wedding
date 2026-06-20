# Supabase Setup Guide for Madzshots Weddings

## 1. Create a Supabase Project
Go to https://supabase.com and create a new project.

## 2. Set Environment Variables
Create a `.env` file in the project root:
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```
Find these values in: Supabase Dashboard → Project Settings → API

## 3. Create an Admin User
In Supabase Dashboard → Authentication → Users → Add User
- Email: admin@madzshots.com (or your preferred email)
- Password: (your secure password)

The admin login page at `/admin/login` uses Supabase email/password auth.

## 4. (Optional) Real Weddings Table
To persist gallery tiles across sessions instead of localStorage, run this SQL in Supabase:
```sql
create table wedding_tiles (
  id text primary key,
  couple text not null,
  subtitle text,
  category text check (category in ('planning','coordination','styling')),
  size text check (size in ('normal','wide')),
  image text not null,
  type text default 'image',
  created_at timestamptz default now()
);

-- Enable RLS
alter table wedding_tiles enable row level security;

-- Anyone can read
create policy "Public read" on wedding_tiles for select using (true);

-- Only authenticated users can write
create policy "Auth write" on wedding_tiles for all using (auth.role() = 'authenticated');
```

## 5. Install & Run
```bash
npm install
npm run dev
```

## Routes
- `/` — Home
- `/about` — About Us
- `/services` — Services
- `/process` — Our Process
- `/real-weddings` — Portfolio Gallery
- `/faq` — FAQ
- `/admin/login` — Admin Login (Supabase auth)
- `/admin` — Admin Home (protected)
- `/admin/real-weddings` — Manage gallery tiles (protected)
