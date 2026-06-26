# Vercel Deployment Guide

Complete walkthrough for deploying Aura Living to Vercel + setting up environment variables.

---

## Step 1: Push Your Code to GitHub

✅ Already done — your repo is at:
**https://github.com/hamzaaftab325-eng/aura-living-2nd-site**

---

## Step 2: Create a Vercel Account + New Project

1. Go to **https://vercel.com/signup**
2. Sign up with your GitHub account (one click)
3. Once logged in, click **"Add New..."** → **"Project"**
4. You'll see a list of your GitHub repos. Find `aura-living-2nd-site` and click **"Import"**
5. Vercel auto-detects Next.js — leave all framework settings as default:
   - **Framework Preset:** Next.js
   - **Build Command:** `next build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `bun install` (Vercel auto-detects from `bun.lock`)

6. **DO NOT CLICK DEPLOY YET** — we need to add env vars first.
   Click **"Environment Variables"** to expand the section.

---

## Step 3: Add Environment Variables

You'll add **12 variables**. Copy each one from `.env.production` (which is in your project root — that file is gitignored so it won't be committed, but you can read it locally).

### Required (add ALL of these):

| #   | Name                        | Value                                                                                 | Environments         |
| --- | --------------------------- | ------------------------------------------------------------------------------------- | -------------------- |
| 1   | `NEXT_PUBLIC_APP_URL`       | `https://your-project-name.vercel.app`                                                | Production + Preview |
| 2   | `BETTER_AUTH_URL`           | `https://your-project-name.vercel.app`                                                | Production + Preview |
| 3   | `SUPABASE_URL`              | `https://slcelgqzdqbzxlapuuva.supabase.co`                                            | Production + Preview |
| 4   | `SUPABASE_PUBLISHABLE_KEY`  | (JWT starts with `eyJ...anon`)                                                        | Production + Preview |
| 5   | `SUPABASE_SERVICE_ROLE_KEY` | (JWT starts with `eyJ...service_role`)                                                | Production + Preview |
| 6   | `DATABASE_URL`              | `postgresql://...pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1` | Production + Preview |
| 7   | `DIRECT_URL`                | `postgresql://...supabase.com:5432/postgres`                                          | Production + Preview |
| 8   | `BETTER_AUTH_SECRET`        | (generate NEW — see below)                                                            | Production + Preview |
| 9   | `NODE_ENV`                  | `production`                                                                          | Production only      |
| 10  | `SUPABASE_BUCKET_PRODUCTS`  | `product-images`                                                                      | Production + Preview |
| 11  | `SUPABASE_BUCKET_AVATARS`   | `user-avatars`                                                                        | Production + Preview |
| 12  | `SUPABASE_BUCKET_REVIEWS`   | `review-images`                                                                       | Production + Preview |

### Generate a New BETTER_AUTH_SECRET for Production

Run this in your terminal:

```bash
openssl rand -base64 32
```

Or alternatively:

```bash
bun -e 'console.log(require("crypto").randomBytes(32).toString("base64"))'
```

Copy the output (something like `K7x9P2...xyz==`) and paste it as the `BETTER_AUTH_SECRET` value.

> ⚠️ **IMPORTANT:** Generate a NEW secret for production. Don't reuse the dev secret from your `.env` file.

### Tips for Adding Variables

- For each variable, paste the **Name**, **Value**, then select which environments it applies to
- Check **"Production"** for all of them
- Check **"Preview"** for all of them EXCEPT `NODE_ENV` (Preview should use development mode)
- Skip **"Development"** — that's for local `.env` only

---

## Step 4: Deploy

Once all 12 env vars are added, scroll up and click **"Deploy"**.

Vercel will:

1. Clone your repo
2. Run `bun install`
3. Run `next build`
4. Deploy to a `https://xxx.vercel.app` URL

This takes 2-4 minutes. Watch the build logs for any errors.

---

## Step 5: Database Setup

Since we're using Supabase Postgres (shared between local + production), the database is already set up. The schema + seed data from your local development is already in the production database.

**After your first deploy, verify:**

1. Visit `https://your-domain.vercel.app/sign-in`
2. Log in with admin credentials (see Step 8 below)
3. Visit `/admin` — you should see real DB stats (1 user, 8 categories, 16 products)

If you ever need to push schema changes:

```bash
# From your local machine — DATABASE_URL points to the same Supabase Postgres
bun run db:push
```

---

## Step 6: Create the Storage Buckets in Supabase

1. Go to **https://supabase.com/dashboard** → your project (`slcelgqzdqbzxlapuuva`)
2. Click **"Storage"** in the left sidebar
3. Click **"New bucket"** and create these 4 buckets:
   - `product-images` — **Public** (for product photos)
   - `user-avatars` — **Public** (for user profile pics)
   - `review-images` — **Public** (for review photos)
   - `admin-assets` — **Private** (for admin-only files)

4. For each public bucket, click the bucket → **"Policies"** → **"New Policy"** → **"For full customization"**:
   - Policy name: `public-read`
   - Allowed operation: `SELECT`
   - Target roles: `anon`
   - USING expression: `true`

5. For write access (auth users only), add another policy:
   - Policy name: `auth-write`
   - Allowed operation: `INSERT`
   - Target roles: `authenticated`
   - WITH CHECK expression: `auth.role() = 'authenticated'`

---

## Step 7: Add Your Custom Domain (Optional)

1. In Vercel dashboard → your project → **"Settings"** → **"Domains"**
2. Enter your domain (e.g., `auraliving.pk`)
3. Vercel will give you DNS records to add at your domain registrar
4. Once DNS propagates (5-30 min), Vercel auto-provisions SSL

After your domain is live, **update these env vars** in Vercel:

- `NEXT_PUBLIC_APP_URL` → `https://auraliving.pk`
- `BETTER_AUTH_URL` → `https://auraliving.pk`

Redeploy for changes to take effect.

---

## Step 8: Test Production Auth

1. Visit `https://your-domain.vercel.app/sign-in`
2. Log in with admin credentials:
   - **Email:** `admin@auraliving.pk`
   - **Password:** `Aura@Admin2026!`
3. You should redirect to `/account` and see the admin badge
4. Click "Go to Admin Dashboard" → should land on `/admin` with real DB stats

> ⚠️ **CHANGE THE ADMIN PASSWORD IMMEDIATELY** after first login in production.
> Run this locally to set a new password:
>
> ```bash
> bun -e '
> import { auth } from "./src/server/auth/config";
> import { db } from "./src/server/db";
> await auth.api.changePassword({
>   headers: new Headers(),
>   body: { newPassword: "YourNewSecurePassword!", currentPassword: "Aura@Admin2026!" }
> });
> await db.$disconnect();
> '
> ```

---

## Step 9: Set Up Preview Deployments (Optional)

Vercel automatically creates a preview deployment for every PR. To make preview deployments work:

1. All env vars that are checked for "Preview" will be applied
2. The `BETTER_AUTH_URL` should be set to your preview URL pattern
3. Or, set `BETTER_AUTH_URL` to your production URL only — previews will redirect to prod for auth (acceptable)

---

## Troubleshooting

### "Environment variable not found" build error

- Check that you added the variable for the correct environment (Production vs Preview)
- Vercel env vars are case-sensitive — match exactly

### "Database connection failed" runtime error

- Verify `DATABASE_URL` and `DIRECT_URL` are correct (no typos)
- Make sure your Supabase project is not paused (free tier pauses after 7 days of inactivity)
- Check that the password is URL-encoded (`!` → `%21`, `#` → `%23`)

### "Unauthorized" on protected routes

- Check that `BETTER_AUTH_SECRET` is set
- Check that `BETTER_AUTH_URL` matches your deployed URL
- Clear browser cookies and try again

### Auth redirects to wrong URL

- Update `NEXT_PUBLIC_APP_URL` and `BETTER_AUTH_URL` to your production domain
- Redeploy

### Prisma client not generated

- Vercel auto-runs `prisma generate` as part of the `postinstall` script
- If it doesn't, add `"postinstall": "prisma generate"` to `package.json` scripts

---

## Quick Reference — Production Admin Credentials

```
URL:      https://your-domain.vercel.app/sign-in
Email:    admin@auraliving.pk
Password: Aura@Admin2026!
```

**Change this password immediately after first production login.**
