# Madzshots Wedding Studio — Project Overview

A marketing and portfolio website for a wedding planning studio, with a Supabase-backed admin dashboard for managing gallery content.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 (JSX, no TypeScript) |
| Build Tool | Vite 8 |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v4 + inline styles |
| Backend / Auth | Supabase (PostgreSQL + Row-Level Security) |
| Email | EmailJS (booking inquiry form) |
| Fonts | Fraunces (serif headings) + Work Sans (body) |

---

## Running the Project

```bash
npm install
npm run dev      # dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview production build
```

Environment variables are in `.env`:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
```

---

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx               Landing page — hero, gallery preview, testimonials, stats, FAQs
│   ├── About.jsx              Team profiles, studio story, mission/values
│   ├── Services.jsx           3 service tiers: Planning, Coordination, Styling
│   ├── Process.jsx            4-step client journey timeline
│   ├── RealWeddings.jsx       Portfolio gallery with category filters (Supabase data)
│   ├── Weddingdetail.jsx      Individual wedding story + image gallery (by route :id)
│   ├── FAQ.jsx                7 Q&A accordion items
│   ├── AdminLogin.jsx         Email/password login (Supabase auth)
│   ├── AdminPages.jsx         Public pages wrapped with admin navbar
│   ├── AdminRealWeddings.jsx  Full CRUD for gallery tiles (protected)
│   └── ProtectedAdminRoute.jsx  UNUSED — duplicate of ProtectedRoute.jsx, safe to delete
├── components/
│   ├── Navbar.jsx             Fixed header + booking modal (EmailJS form)
│   ├── Footer.jsx             Footer with nav links and social icons
│   ├── ProtectedRoute.jsx     Auth guard — redirects to /admin/login if no session
│   └── LogoIcon.jsx           SVG brand logo (two overlapping circles)
├── context/
│   └── AuthContext.jsx        Supabase session state; exposes useAuth() hook
├── lib/
│   └── supabase.js            Supabase client singleton
├── assets/                    hero.png, react.svg, vite.svg
├── App.jsx                    Route definitions
├── index.css                  Global styles, Tailwind imports, CSS custom properties
└── main.jsx                   React entry point (note: index.css imported twice — minor bug)
```

---

## Routes

### Public

| Path | Page | Notes |
|---|---|---|
| `/` | Home | Hero, gallery preview, testimonials, stats, mini-FAQ |
| `/about` | About | Team (3 members), story, values |
| `/services` | Services | 3 tiers with descriptions and "best for" guidance |
| `/process` | Process | 4-step booking journey |
| `/real-weddings` | RealWeddings | Filterable gallery; reads from Supabase `real_weddings` table |
| `/real-weddings/:id` | WeddingDetail | Single wedding story + gallery |
| `/faq` | FAQ | 7 accordion Q&As |
| `/contact` | (inline) | **Placeholder only — "Coming soon" text, nothing functional** |

### Admin (all protected by Supabase auth)

| Path | Page | Notes |
|---|---|---|
| `/admin/login` | AdminLogin | Email/password login |
| `/admin` | AdminHome | Dashboard (protected) |
| `/admin/real-weddings` | AdminRealWeddings | Add / edit / delete gallery tiles; real-time Supabase sync |
| `/admin/about` | AdminAbout | Public About page with admin navbar |
| `/admin/services` | AdminServices | Public Services page with admin navbar |
| `/admin/process` | AdminProcess | Public Process page with admin navbar |
| `/admin/faq` | AdminFAQ | Public FAQ page with admin navbar |

---

## Design System

Custom CSS properties defined in `index.css`:

| Variable | Value | Role |
|---|---|---|
| `--color-ivory` | `#FBF7F2` | Page background |
| `--color-ink` | `#2B2420` | Body text |
| `--color-wine` | `#6E2A35` | Accent (maroon) |
| `--color-gold` | `#B79257` | Secondary accent |
| `--color-rose` | `#C98A93` | Soft accent |
| `--color-sage` | `#8A9A7E` | Nature accent |
| `--font-serif` | Fraunces | Headings (italic, weight 300–600) |
| `--font-sans` | Work Sans | Body / UI (weight 300–600) |

Primary CTA color is `#E8833A` (orange), used for buttons and hover states. Styling is a mix of Tailwind utility classes and inline `style` objects.

---

## Supabase Schema

**Table: `real_weddings`**

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Primary key |
| `couple` | text | Couple name label |
| `subtitle` | text | Short caption |
| `category` | text | `'planning'` / `'coordination'` / `'styling'` |
| `size` | text | `'normal'` / `'wide'` (grid display variant) |
| `image_url` | text | URL to cover image |
| `created_at` | timestamp | Auto-set |

RLS policy: public read, authenticated write only.

---

## What Is Complete

- All 7 public pages are built and styled
- Supabase auth (login, session, sign-out, protected routes)
- Admin gallery CRUD with real-time subscription and toast notifications
- Booking inquiry modal with EmailJS integration (UI complete)
- Responsive layouts with fluid typography (clamp)
- Custom brand design system (fonts, palette, components)

---

## What Is Incomplete / Needs Attention

### 1. EmailJS credentials not configured
**File:** `src/components/Navbar.jsx`, lines 6–8

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

The booking form UI works, but no email is actually sent until these are replaced with real EmailJS account credentials.

---

### 2. Contact page is a placeholder
**File:** `src/App.jsx`, inline route for `/contact`

Currently renders: `<div>Contact page coming soon</div>`. Needs a real contact form or can reuse the BookingModal component.

---

### 3. Social media links are dead
**File:** `src/components/Footer.jsx`

Facebook, Instagram, and TikTok all link to `#`. Replace with actual profile URLs.

---

### 4. All content is placeholder data
- Wedding gallery images are Unsplash URLs
- Couple names (Sofia & Rafael, Isabella & Marco, etc.) are invented
- Team member photos and testimonials are stock
- Real data needs to be entered through the admin dashboard or seeded into Supabase

---

### 5. Contact page is still a placeholder
`/contact` route renders "coming soon". All CTA buttons that used to link to `/contact`
now point to `/` temporarily with a `{/* TODO: contact page */}` comment marking each
spot. Wire them up once the Contact page is built.

---

### 6. Social media links are dead
**File:** `src/components/Footer.jsx`

Facebook, Instagram, and TikTok all link to `#`. Replace with actual profile URLs.

---

### 7. EmailJS credentials not configured
**File:** `src/components/Navbar.jsx`, lines 6–8

```js
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'YOUR_PUBLIC_KEY'
```

The booking form UI works, but no email is actually sent until these are replaced
with real EmailJS account credentials.

---

### 8. Placeholder content (intentional — student will replace)
- Wedding gallery images are Unsplash URLs — admin upload feature coming
- Team member photos and testimonials are stock
- Real data should be entered through the admin dashboard

---

## Git History (Recent)

```
6e7755d  New update
f5023f1  Navigation Bar
2442fde  still fixing the layout
b434c70  adjust the spacing and layout
9d07790  Fixing the layout
b6e4e99  i import index.css
99bd3b8  Add route for admin
e34daf2  added read me file
82b5dc3  initlize commit
```

Development has been incremental layout and navigation work. Admin routing was added in a later commit. No test suite exists.

---

## UI/UX Overhaul (2026-06-27)

A full visual overhaul is underway, built in phases. Direction: **Warm Romantic** base
with **deep-plum cinematic** moments. Animated with **Framer Motion** (moderate intensity).

### Design decisions
- **Fonts:** Fraunces (headings) + Work Sans (body) + **Cormorant Garamond** (display — couple names, hero lines)
- **Form language:** soft & rounded — 16px radii, pill buttons, rose-tinted soft shadows
- **Imagery:** full-bleed cinematic heroes + arch-top / soft-rounded gallery frames
- **Color:** leads with **wine · rose · gold** (bright orange demoted); three layered darks — aubergine `#3E2230`, deep wine `#4A1F2B`, espresso `#2A1A22`
- **Texture:** subtle paper grain + soft gradients (the `.paper`, `.wash-blush`, `.wash-plum` classes)

### New dependencies
- `framer-motion` — scroll reveals, mobile menu, hero parallax/slideshow, modal & page transitions, magnetic buttons
- `lenis` — smooth momentum scrolling

### Creative enhancements (round 2)
Reusable pieces added under `src/components/`:
- [`Loader.jsx`](src/components/Loader.jsx) — branded intro loader (shows ~1.5s on first load)
- [`ScrollProgress.jsx`](src/components/ScrollProgress.jsx) — thin gold/rose progress thread at the top of every page
- [`CountUp.jsx`](src/components/CountUp.jsx) — stats count up from zero on scroll-in (handles `150+`, `8 yrs`, `98%`, skips non-numeric like `Tarlac`)
- [`Magnetic.jsx`](src/components/Magnetic.jsx) — buttons that drift toward the cursor (wraps the primary CTAs)
- [`Ribbon.jsx`](src/components/Ribbon.jsx) — editorial infinite-scroll marquee band
- [`Petals.jsx`](src/components/Petals.jsx) — subtle falling rose petals (hero + final CTA only)

Wired globally in [`App.jsx`](src/App.jsx): Lenis smooth scroll, scroll-to-top on navigation, and **page fade transitions** between routes (`AnimatePresence`).
Home hero is now a **crossfading slideshow** with Ken-Burns zoom. Arch image frames were squared to soft rounded rectangles (the `.frame-arch` class now matches `.frame`). The hero also got top padding so the eyebrow no longer collides with the fixed navbar on short viewports.

### Creative enhancements (round 3)
- [`Tilt.jsx`](src/components/Tilt.jsx) — 3D cursor tilt on gallery & service cards (flat on touch)
- [`BlurImage.jsx`](src/components/BlurImage.jsx) — images fade from blur → sharp on load (all galleries)
- [`BackToTop.jsx`](src/components/BackToTop.jsx) — floating return-to-top pill (global)
- [`WordReveal.jsx`](src/components/WordReveal.jsx) — section headings animate in word-by-word
- [`TestimonialSlider.jsx`](src/components/TestimonialSlider.jsx) — Home testimonials are now an auto-rotating slider
- Home gallery tiles **cross-fade to a second photo on hover**
- About story image + Home About image enlarged; Home map widened (820→1080px) and taller (340→480px)

### Hero typography drama
- Home hero headline uses a **mask-rise reveal** ([`MaskWords.jsx`](src/components/MaskWords.jsx)) — each word rises from behind a mask on load — at weight 700, with an **animated gold shimmer** on "beautifully" (`.shimmer-gold`).
- Every page hero headline (About, Services, Process, FAQ, Real Weddings, Wedding detail) is now weight 700 with a **shimmer-gradient accent** on its key phrase (`.grad-rose` / `.shimmer-gold`). Shimmer respects `prefers-reduced-motion`.

**Code-splitting:** routes are now lazy-loaded ([`App.jsx`](src/App.jsx)). The old single ~700KB bundle is split into small per-route chunks (Home ~24KB, FAQ ~5KB, etc.) plus shared vendor chunks — initial load is much lighter and the branded loader covers it.

### Design-system files
- [`src/index.css`](src/index.css) — all tokens (color, type, radii, shadows, motion easings), base styles, paper texture, utility classes (`.btn`, `.card`, `.frame`, `.frame-arch`, `.media`, `.eyebrow`, `.container`, `.section`), and `prefers-reduced-motion` support
- [`src/components/Reveal.jsx`](src/components/Reveal.jsx) — `Reveal` and `RevealGroup` scroll-animation wrappers
- [`src/lib/motion.js`](src/lib/motion.js) — shared Framer Motion variants / easing

### Phase progress
- **Phase 1 — Foundation:** ✅ done (design tokens, fonts, motion primitives)
- **Phase 2 — Shell:** ✅ done — [`Navbar.jsx`](src/components/Navbar.jsx) (now has an **animated mobile hamburger menu** — the previous navbar had none and overflowed on phones), [`Footer.jsx`](src/components/Footer.jsx), and the restyled booking modal
- **Phase 3 — Hero pages:** ✅ done — Home, [`RealWeddings.jsx`](src/pages/RealWeddings.jsx) (animated gallery, rounded pill filters, responsive grid), and [`Weddingdetail.jsx`](src/pages/Weddingdetail.jsx) (full-bleed cinematic hero with couple name overlay, animated gallery, upgraded lightbox with **keyboard navigation** — Esc/←/→)
- **Phase 4 — Supporting pages:** ✅ done — [`About.jsx`](src/pages/About.jsx), [`Services.jsx`](src/pages/Services.jsx) (alternating image/text rows), [`Process.jsx`](src/pages/Process.jsx) (cinematic plum timeline + de-cluttered detail rows), [`FAQ.jsx`](src/pages/FAQ.jsx). Admin: login already on-brand; admin gallery grid made responsive (`auto-fill`). The `/admin/*` pages inherit the redesigned public pages automatically.

**All four phases complete.** Every page now shares the warm-romantic design system, Framer Motion reveals, soft-rounded forms, and stacks cleanly on mobile (single-column below ~820px, hamburger nav below 880px).

### Notes / follow-ups
- Placeholder Unsplash images are intentionally kept (admin upload feature is the student's planned work)
- Bundle is now code-split per route (see round 3). Largest shared chunks are the Framer Motion/React core and the Supabase client

---

## Code Fixes Applied (2026-06-27)

| # | File | What was fixed |
|---|---|---|
| A1 | `src/pages/ProtectedAdminRoute.jsx` | Deleted — dead file, never imported, used wrong auth field (`user` vs `session`) |
| A2 | `src/main.jsx` | Removed duplicate `import './index.css'` |
| A3 | `src/App.css` | Cleared Vite template CSS — nothing in the project used it |
| A4 | `src/pages/AdminRealWeddings.jsx` | Removed unused `Link` import; wired `EMPTY_FORM` constant into the modal state (was defined but ignored) |
| A5 | `src/pages/AdminPages.jsx` | Removed unused `Navbar` and `Footer` imports; cleaned up verbose comments |
| A6 | `src/pages/About.jsx` | Fixed stat: "120+ Weddings" → "150+" to match Home.jsx |
| A7 | `src/pages/About.jsx`, `Services.jsx`, `Process.jsx` | Replaced broken `to="/contact"` links with `to="/"` + `{/* TODO: contact page */}` comment |
| A8 | `src/components/Footer.jsx` | Fixed dead `href="#contact"` on Book a Call card → `href="#"` + TODO comment |
| A9 | `src/components/Navbar.jsx` | Added Sign Out button in admin mode — calls `signOut()` from AuthContext then navigates to `/admin/login` |
| A10 | `SUPABASE_SETUP.md` | Corrected SQL: table `wedding_tiles` → `real_weddings`, column `image` → `image_url` |

---

## Authentication — Fixes & Troubleshooting

> Notes from the admin-login debugging session (2026-06-26).

### How admin auth works here

There is **no signup page** — admin users are created manually in the Supabase
dashboard (**Authentication → Users → Add user**). The login form calls
`supabase.auth.signInWithPassword()` ([`AuthContext.jsx`](src/context/AuthContext.jsx)),
and `ProtectedRoute` redirects anyone without a session to `/admin/login`.
The code for all of this is correct — every login problem we hit was a
**data/config issue in Supabase**, not a bug in the app.

### Decisions made

| Decision | Choice | Reason |
|---|---|---|
| Email confirmation for new admins | **Keep ON** | New accounts must confirm their email before first login. |
| Login error messages | **Show the real Supabase error** | Generic "Invalid email or password" was masking the true cause and made this hard to debug. |
| Broken Supabase URL (`.env` + fallback) | **Fix the TLD to `.supabase.co`** | The real root cause — see below. |

### ⚠️ Root cause of the login failure: wrong Supabase URL

The project's Supabase URL was set to **`.supabase.com`** in `.env` — but Supabase
project API endpoints live at **`.supabase.co`** (`.co`, not `.com`). `.supabase.com`
is only the dashboard/marketing site. Verified by DNS:

- `xqycjnueybgrhjkgawqd.supabase.co` → resolves (Cloudflare) ✅
- `xqycjnueybgrhjkgawqd.supabase.com` → **Non-existent domain** ❌

This produced `net::ERR_NAME_NOT_RESOLVED` / `TypeError: Failed to fetch` in the
console — the browser couldn't even reach Supabase, so login could never work.

### Code changes applied

1. **[`.env`](.env) and [`.env.example`](.env.example)** — corrected
   `VITE_SUPABASE_URL` from `...supabase.com` to `...supabase.co`.
2. **[`src/lib/supabase.js`](src/lib/supabase.js)** — the hardcoded fallback URL was
   `xqycjnueybgrhjkgawqd.supabase.co` with no `https://`. Fixed to the full, correct
   `https://xqycjnueybgrhjkgawqd.supabase.co`.
3. **[`src/pages/AdminLogin.jsx`](src/pages/AdminLogin.jsx)** — login now displays the actual
   Supabase error (`error.message`) instead of always saying "Invalid email or password".
   So "Email not confirmed", "Invalid login credentials", rate-limit messages, etc. now
   show on screen.

> **IMPORTANT:** Vite only reads `.env` when the dev server **starts**. After this change
> you must stop the server (`Ctrl+C`) and run `npm run dev` again — a hot reload will
> not pick up the new URL.

### Manual steps still required in the Supabase dashboard (only you can do these)

These are **not code** — they must be done in the Supabase dashboard at
[supabase.com/dashboard](https://supabase.com/dashboard) (project `xqycjnueybgrhjkgawqd`):

- [ ] **Reset the password for `itsjayemramos@gmail.com`.** Logging in returned a `400`
      from the auth endpoint — the request reached Supabase fine, so it's a wrong-password
      mismatch. Go to **Authentication → Users → click the user → Change password**, then
      log in with the new password.
- [ ] **Confirm `textingaccount@gmail.com`.** That account has never signed in (no
      "Last sign in" timestamp) because email confirmation is ON and the link was never
      clicked. Either click the confirmation email in that inbox, or in the dashboard
      open the user and confirm/verify them manually.

### Quick reference: what the login errors mean

| Symptom | Cause | Fix |
|---|---|---|
| Console `400` on `...grant_type=password` | Wrong password (request reached Supabase) | Reset password in dashboard |
| "Email not confirmed" | Confirmation link never clicked | Confirm the user in the dashboard |
| Network error / `ERR_NAME_NOT_RESOLVED` | Bad Supabase URL or missing `.env` | Check `.env` and `supabase.js` |
| Always "Invalid email or password" (old behavior) | Error message was hardcoded | Already fixed — real errors now show |

---

## Setup Checklist (Before Showing to a Client)

- [ ] Add EmailJS credentials to `Navbar.jsx`
- [ ] Update social media links in `Footer.jsx`
- [ ] Implement or connect the `/contact` page
- [ ] Upload real wedding photos and enter actual couple data via `/admin/real-weddings`
- [ ] Verify Supabase RLS rules are correctly restricting write access
- [ ] Remove `ProtectedAdminRoute.jsx` (unused)
- [ ] Fix duplicate `index.css` import in `main.jsx`
