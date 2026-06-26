# Aura Living

> Curated calm for considered living. A production-grade, premium luxury home decor e-commerce platform built for the Pakistani market.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript 5 (strict mode)
- **Styling:** Tailwind CSS v4 + shadcn/ui (customized to luxury spec)
- **Database:** Supabase Postgres + Prisma ORM
- **Auth:** Better Auth (email/password)
- **Animation:** Motion + GSAP + Lenis + SplitType + Lottie
- **State:** Zustand (client) + TanStack Query (server)
- **Forms:** React Hook Form + Zod
- **Storage:** Supabase Storage
- **Search:** Postgres Full-Text Search (in-house)

## Quick Start

```bash
# 1. Install dependencies
bun install

# 2. Copy environment template
cp .env.example .env
# Edit .env with your Supabase credentials

# 3. Push database schema
bun run db:push

# 4. Seed database (optional, creates admin + sample products)
bun run db:seed

# 5. Start dev server
bun run dev
# Open http://localhost:3000
```

## Project Structure

```
src/
├── app/              # Next.js App Router (pages, layouts, API routes)
├── components/
│   ├── ui/           # shadcn/ui primitives (customized)
│   ├── shop/         # Storefront components
│   ├── admin/        # Admin panel
│   ├── layout/       # Header, Footer, Cart drawer
│   ├── motion/       # Motion wrappers
│   └── emails/       # React Email templates
├── config/           # Brand, site, navigation, features
├── hooks/            # Custom React hooks
├── lib/              # Utilities (cn, formatters)
├── providers/        # Context providers
├── server/           # Server-only code
│   ├── auth/         # Better Auth config
│   ├── db/           # Prisma client + queries
│   ├── actions/      # Server Actions (typed, Zod-validated)
│   ├── services/     # Domain services
│   ├── payments/     # Payment provider abstraction
│   ├── emails/       # Email dispatcher + templates
│   ├── storage/      # Supabase Storage client
│   └── search/       # FTS search service
├── stores/           # Zustand stores (cart, wishlist, UI)
└── types/            # Shared TypeScript types
```

## Scripts

| Script               | Description                     |
| -------------------- | ------------------------------- |
| `bun run dev`        | Start dev server (port 3000)    |
| `bun run build`      | Production build                |
| `bun run lint`       | Run ESLint                      |
| `bun run lint:fix`   | Auto-fix lint issues            |
| `bun run format`     | Prettier write all files        |
| `bun run typecheck`  | TypeScript type check (no emit) |
| `bun run analyze`    | Bundle size analysis            |
| `bun run db:push`    | Push Prisma schema to DB        |
| `bun run db:migrate` | Create + apply Prisma migration |
| `bun run db:seed`    | Seed database with sample data  |
| `bun run db:studio`  | Open Prisma Studio GUI          |

## Architecture Principles

1. **Type Safety First** — Strict TypeScript everywhere; no `any` without justification.
2. **Design System as Source of Truth** — All colors, spacing, typography via CSS variables in `globals.css` mapped to Tailwind v4 `@theme`. No hardcoded arbitrary values.
3. **Server-First** — Server Components by default; `'use client'` only when interactivity requires it.
4. **Server Actions** — All mutations via typed Server Actions with Zod validation.
5. **Provider Abstraction** — Payments, email, search, storage all behind typed interfaces; concrete providers swappable.
6. **Modular Components** — Small, focused, reusable. Composite components composed from primitives.
7. **Performance Budget** — Lighthouse 95+ target on all categories.

## License

Proprietary — Ethereal Dwelling © 2026.
