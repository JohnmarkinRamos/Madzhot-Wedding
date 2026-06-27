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

## 4. Real Weddings Table
Run this SQL in Supabase SQL Editor to create the gallery table:
```sql
create table real_weddings (
  id uuid primary key default gen_random_uuid(),
  couple text not null,
  subtitle text,
  category text check (category in ('planning','coordination','styling')),
  size text check (size in ('normal','wide')),
  image_url text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table real_weddings enable row level security;

-- Anyone can read
create policy "Public read" on real_weddings for select using (true);

-- Only authenticated users can write
create policy "Auth write" on real_weddings for all using (auth.role() = 'authenticated');
```

> Note: the table is `real_weddings` and the image column is `image_url`.
> The admin dashboard at `/admin/real-weddings` will seed default tiles on first load.

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
