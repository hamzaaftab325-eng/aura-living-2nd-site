# Aura Living — Production Execution Plan

> **Brand:** Aura Living · Premium Luxury Home Decor E-Commerce (Pakistani market, PKR currency)
> **Stack:** Next.js 16 (App Router) · React 19 · TypeScript 5 (strict) · Tailwind v4 · Prisma · Supabase (Postgres + Storage) · Better Auth (email/password) · Motion · GSAP · Lenis · shadcn/ui
> **Vibe:** Refined Minimalism · Glassmorphic · Editorial · "Curated Calm"
> **Reference Aesthetic:** Zara Home, West Elm, Soho House interiors
> **Constraint:** FREE TIER — no paid 3rd-party services. Everything in-house, swappable later.
> **Status Legend:** `[ ]` Pending · `[~]` In Progress · `[x]` Done · `[!]` Blocked

## In-House Architecture (Revised — Free Tier)

| Concern        | In-House Solution                                                        | Swappable To (later)          |
| -------------- | ------------------------------------------------------------------------ | ----------------------------- |
| Auth           | Better Auth (email/password only)                                        | Add Google OAuth later        |
| Search         | Postgres Full-Text Search (tsvector + GIN index)                         | Meilisearch                   |
| Payments (dev) | Mock provider with typed `PaymentProvider` interface                     | Stripe / JazzCash / Easypaisa |
| Email          | In-app email queue table + console logger                                | Resend / Nodemailer SMTP      |
| Rate limiting  | Custom middleware (in-memory + Postgres)                                 | Arcjet                        |
| Error tracking | Custom logger → Postgres `ErrorLog` table                                | Sentry                        |
| Analytics      | Custom event tracker → Postgres `AnalyticsEvent` table + admin dashboard | GA4 / Meta Pixel / Clarity    |
| File storage   | Supabase Storage (free tier)                                             | —                             |
| Database       | Supabase Postgres (free tier)                                            | —                             |
| Deployment     | Local + Vercel free tier when ready                                      | Vercel Pro / Cloudflare       |

---

## 0. Master Configuration & Conventions ✅

### 0.1 Project Metadata

- [x] Define brand constants file (`src/config/brand.ts`) — Aura Living, Pakistani market, PKR currency, Lahore address, 17% tax, TCS/Leopards/DHL shipping
- [x] Define site configuration (`src/config/site.ts`) — URL, OG defaults, robots, locale en_PK, themeColor
- [x] Define navigation config (`src/config/navigation.ts`) — header mega-menu (8 categories), footer columns, legal links
- [x] Define feature flags (`src/config/features.ts`) — wishlist, recentlyViewed, multiAddress, abandonedCartEmails, etc.
- [x] Created barrel export `src/config/index.ts`

### 0.2 Strict TypeScript Conventions

- [x] `tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess: true`, `noImplicitAny: true`, `noFallthroughCasesInSwitch: true`, `noImplicitOverride: true`
- [x] Path aliases: `@/*`, `@/components/*`, `@/lib/*`, `@/config/*`, `@/types/*`, `@/hooks/*`, `@/stores/*`, `@/server/*`, `@/providers/*`
- [x] ESLint (strict config — `prefer-const` error, `no-console` warn, `react-hooks/exhaustive-deps` warn, `consistent-type-imports` warn) + Prettier + `prettier-plugin-tailwindcss` + `eslint-plugin-import` + `eslint-plugin-jsx-a11y` + `eslint-plugin-tailwindcss`
- [x] Pre-commit hook via Husky + lint-staged (eslint --fix + prettier --write on staged files)
- [x] `.editorconfig` + `.prettierrc` + `.gitignore` (with `.env`, `.env.production`, `.env*.local` patterns)

### 0.3 Folder Architecture (locked)

```
src/
├── app/                      # Next.js App Router
│   ├── (shop)/               # Public storefront route group
│   ├── (auth)/               # Auth pages route group (sign-in, sign-up)
│   ├── (account)/            # Customer dashboard
│   ├── (admin)/              # Admin panel
│   ├── api/                  # Route handlers (auth, webhooks)
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn primitives (customized to luxury spec)
│   ├── shop/                 # Storefront components
│   ├── admin/                # Admin components
│   ├── auth/                 # Auth form components
│   ├── motion/               # Motion wrappers (15 components)
│   └── layout/               # Container, Section, Eyebrow, LuxuryHeading
├── config/                   # Brand, site, nav, features, index barrel
├── lib/                      # Utilities (cn, formatters, animations, sound, gsap)
├── server/                   # Server-only: auth, db, services, actions
│   ├── auth/                 # Better Auth config + client + helpers
│   ├── db/                   # Prisma client (singleton) + queries
│   ├── services/             # Domain services (Phase 2.3)
│   ├── actions/              # Server Actions (Phase 2.3)
│   ├── payments/             # Payment providers (Phase 4.3)
│   ├── emails/               # Email templates (Phase 4.4)
│   ├── storage/              # Supabase Storage (Phase 2.4)
│   └── search/               # FTS search (Phase 3.2)
├── stores/                   # Zustand stores (cart, wishlist — Phase 4.1)
├── hooks/                    # Custom React hooks
├── types/                    # Global type definitions
└── providers/                # MotionProvider, LenisProvider, CursorFollower, PageLoader
```

### 0.4 Conventions Summary

- [x] **Server-first** — Server Components by default; `'use client'` only when interactivity requires it
- [x] **Server Actions** — All mutations via typed Server Actions with Zod validation (Phase 2.3)
- [x] **Provider abstraction** — Payments, email, search, storage all behind typed interfaces; concrete providers swappable
- [x] **Modular components** — Small, focused, reusable. Composite components composed from primitives
- [x] **Design system as source of truth** — All colors, spacing, typography via CSS variables in `globals.css` mapped to Tailwind v4 `@theme`. No hardcoded arbitrary values
- [x] **Performance budget** — Lighthouse 95+ target on all categories
- [x] **Accessibility** — Semantic HTML, ARIA labels, keyboard nav, focus-visible gold ring, `prefers-reduced-motion` respected throughout
- [x] **Animation philosophy** — Luxury easing `cubic-bezier(0.22, 1, 0.36, 1)`, no bouncy/chaotic motion, all animations reduced-motion compliant

---

## Phase 1 — Foundation & Global Architecture (Weeks 1–2)

### 1.1 Repository & Project Initialization ✅

- [x] Run `init-fullstack.sh` to bootstrap Next.js 16 + Bun + Prisma
- [x] Verify `package.json` engines, Node version, Bun lockfile
- [x] Install dev dependencies: `prettier`, `prettier-plugin-tailwindcss`, `husky`, `lint-staged`, `eslint-plugin-*` suite
- [x] Configure `.editorconfig`, `.prettierrc`
- [x] Configure `tsconfig.json` with strict flags + path aliases
- [x] Set up `.env.example` with all required keys (Supabase, Better Auth, optional SMTP)
- [x] Initialize Husky pre-commit hook running `lint-staged` (prettier + eslint)
- [x] Create `README.md` with setup instructions
- [x] Install runtime deps: `motion`, `gsap`, `lenis`, `better-auth`, `split-type`, `lottie-react`, `react-email`, `@react-email/components`
- [x] Tighten `next.config.ts` (strict TS, reactStrictMode, image optimization, security headers, bundle analyzer)
- [x] Tighten `eslint.config.mjs` (enable unused-vars, prefer-const, no-console, react-hooks/exhaustive-deps)
- [x] Create folder architecture: `config/`, `server/{auth,db,actions,services,payments,emails,storage,search}/`, `providers/`, `stores/`, `types/`, `components/{motion,layout,shop,admin,emails}/`
- [x] Create `src/config/brand.ts` (Ethereal Dwelling brand constants)
- [x] Create `src/config/site.ts` (URL, metadata, OG, robots)
- [x] Create `src/config/navigation.ts` (header mega-menu, footer columns, legal links)
- [x] Create `src/config/features.ts` (feature flags)
- [x] Create `src/config/index.ts` (barrel export)
- [x] Create `src/types/index.ts` (shared domain types: Money, Address, OrderStatus, etc.)
- [x] Verify `bun run lint` passes (0 errors, 2 warnings in shadcn primitives)
- [x] Verify `bun run typecheck` passes (0 errors)
- [x] Verify dev server runs without errors

### 1.2 Global Design System & Tailwind v4 Configuration ✅

- [x] Install fonts via `next/font`: **Playfair Display** (400/500/600/700 + italic) + **Inter** (300/400/500/600/700)
- [x] Configure `next/font` CSS variables (`--font-serif`, `--font-sans`)
- [x] Author `src/app/globals.css` with full CSS variable system:
  - [x] Color tokens: `--background` (#FFFFFF), `--surface`/`--cream` (#FAF8F4), `--cream-warm` (#FDFBF7), `--foreground`/`--ink` (#121212), `--gold` (#D4AF37), `--gold-soft`, `--gold-deep`, `--muted` (#8E8E8E), `--line` (#EBE9E4)
  - [x] shadcn bridge tokens (kept for component compatibility)
  - [x] Typography scale tokens (display-xl → label-caps) with `clamp()` fluid scaling
  - [x] Spacing tokens (gutter, margin-_, stack-_, container-max 1440px)
  - [x] Radius tokens (sm 0.125rem, default 0.25rem, md 0.375rem, lg 0.5rem, xl 0.75rem, full)
  - [x] Shadow tokens (soft-ambient, card-hover, glassmorphic, modal, gold-glow)
  - [x] Motion tokens (`--ease-luxury` cubic-bezier(0.22,1,0.36,1), ease-luxury-in/out, ease-soft)
  - [x] Duration tokens (fast 180ms, base 320ms, slow 540ms, luxury 800ms)
- [x] Configure Tailwind v4 `@theme inline` block mapping all CSS vars to utility classes
- [x] Set up `@layer base` — body font, heading defaults (Playfair Display + tight kerning), focus-visible gold ring, custom scrollbar, `::selection` gold tint, `prefers-reduced-motion` global guard
- [x] Set up `@layer components` — `.btn-primary`, `.btn-gold`, `.btn-underline`, `.input-underline`, `.chip`, `.label-caps`, `.container-luxury`, `.section-md`, `.section-xl`, `.glassmorphic`, `.modal-overlay`, `.text-display-xl/lg/md`, `.text-headline-lg/md/sm`, `.text-body-lg/md/sm`
- [x] Set up `@layer utilities` — `.no-scrollbar`, `.aspect-product/editorial/lookbook`, `.text-balance`, `.text-pretty`
- [x] Implement dark mode token set via `.dark` class
- [x] Build luxury composite components:
  - [x] `<Container>` — 1440px max with responsive outer margins (20/32/64px)
  - [x] `<Section>` — vertical stack wrapper with `spacing` (none/sm/md/lg/xl) + `tone` (default/surface/cream/ink/transparent)
  - [x] `<Eyebrow>` — label-caps tracked uppercase text with tone variants (default/gold/ink)
  - [x] `<LuxuryHeading>` — Playfair Display heading with variant scale (display-xl → headline-sm), `balance` + `italic` props
- [x] Rewrote `app/layout.tsx`: Playfair Display + Inter via next/font, full Aura Living metadata (title template, OG, Twitter, robots), viewport with themeColor
- [x] Authored Phase 1.2 design system preview page (`app/page.tsx`) showcasing palette, typography scale, buttons, inputs, chips, spacing
- [x] Verified `bun run lint` passes (0 errors, 1 pre-existing shadcn warning)
- [x] Verified `bun run typecheck` passes (0 errors)
- [x] Verified dev server compiles + serves page (200 OK, 0 console errors, 0 page errors)
- [x] Verified visually via Agent Browser: all headings, buttons, inputs, chips render correctly
- [x] Screenshot saved to `/home/z/my-project/download/phase-previews/phase-1.2-design-system.png`

### 1.3 Premium UI Component Library Integration ✅

- [x] shadcn/ui already initialized with New York style + Tailwind v4
- [x] Lucide React icon set installed
- [x] Customize shadcn primitives to luxury spec:
  - [x] Button — luxury variants added: `primary` (deep black, uppercase tracked, hover lift), `gold` (CTA, hover glow), `outline-luxury` (bordered, hover invert), `underline` (gold underline reveal). Sizes: default/sm/lg/xl/icon/icon-sm/icon-lg.
  - [x] Dialog — cream-tinted overlay (`rgba(253,251,247,0.6)` + 4px blur), reduced radius, soft luxury shadow
  - [x] Sheet — cream overlay, max-width bumped to `md` for cart drawer, luxury shadow
- [x] Build luxury composite components:
  - [x] `<UnderlineInput>` — underline input with floating Label-Caps label, gold animated focus underline, error/hint transitions
  - [x] `<MaterialChip>` — pill chip with default/gold/outline variants, selected state, dismissible, motion whileTap
  - [x] `<ProductCard>` — image 85% (aspect-product), hover image zoom 1.04, soft-ambient shadow, quick-add button slides up, wishlist heart toggle (gold fill), luxury badge variants (New/Bestseller/Limited/Sale), Playfair name + Inter price
  - [x] `<GlassmorphicHeader>` — sticky header with backdrop-blur-xl + 80% white + 5% black hairline border, height shrinks 80→56px on scroll via Motion
  - [x] `<LuxuryBadge>` — 5 variants (new/bestseller/limited/sale/subtle), 2 sizes, optional animate-in
- [x] Created `src/components/ui/index.ts` barrel export for luxury composites

### 1.4 Animation Engine & Smooth Scroll Setup ✅

- [x] `motion`, `gsap`, `lenis`, `split-type`, `lottie-react` already installed in Phase 1.1
- [x] Create `src/providers/motion-provider.tsx` — global MotionConfig with luxury spring presets:
  - [x] `luxuryEasing = [0.22, 1, 0.36, 1]` (cubic-bezier)
  - [x] `luxuryEasingIn = [0.7, 0, 0.84, 0]` / `luxuryEasingOut = [0.16, 1, 0.3, 1]`
  - [x] Springs: `soft` (stiffness 280, damping 32), `cart` (320/30), `snappy` (500/38), `gentle` (180/26)
  - [x] Durations: fast 0.18s, base 0.32s, slow 0.54s, luxury 0.8s
  - [x] Reduced-motion guard via `useReducedMotion()` → `reducedMotion="always"`
- [x] Create `src/providers/lenis-provider.tsx` — global Lenis instance with RAF integration, 1.2s duration, custom easing, reduced-motion bypass
- [x] Create `src/lib/gsap.ts` — registered `gsap` + `ScrollTrigger` (client-only, tree-shaken), luxury defaults
- [x] Create `src/providers/index.tsx` — combined Providers (MotionProvider + LenisProvider)
- [x] Wire Providers + ScrollProgress into root `app/layout.tsx`
- [x] Build reusable motion wrappers in `src/components/motion/`:
  - [x] `<RevealOnScroll>` — 9 variants (fade, up, fade-up, down, fade-down, left, right, scale, blur), delay + amount + once + as polymorphic
  - [x] `<SplitHeading>` — line-by-line reveal with overflow-hidden mask + staggered translate (110% → 0), immediate or whileInView trigger
  - [x] `<MagneticButton>` — magnetic hover with strength/radius config, springs back via luxury gentle spring
  - [x] `<ParallaxImage>` — scroll-driven parallax (±12% translate, scale 1.15-1.2), wraps next/image
  - [x] `<StaggerContainer>` + `<StaggerItem>` — orchestrate staggered children with 5 variants
  - [x] `<ScrollProgress>` — thin gold progress bar fixed at top, spring-tracked, fades in after 0.5% scroll
  - [x] `<Marquee>` — infinite horizontal scroll, slow/medium/fast speeds, direction control, pause-on-hover
  - [x] `<Counter>` — animated number count-up on scroll-into-view, prefix/suffix/decimals support, locale formatting
  - [x] `<Tilt>` — subtle 3D tilt on hover (max 6°), spring-back, optional glare gradient
- [x] All motion components respect `prefers-reduced-motion` (fall back to static or fade-only)
- [x] Verified via Agent Browser: page loads cleanly, all sections render, animations trigger on scroll, no console errors, no page errors

### 1.5 Database & ORM Initialization (Supabase + Prisma) ✅

- [x] Receive Supabase project URL + service role key from user
- [x] Configure `DATABASE_URL` (Postgres pooler) + `DIRECT_URL` (for migrations)
- [x] Author `prisma/schema.prisma` with Postgres provider + `pg_trgm` + `unaccent` extensions
- [x] Define core models (Phase 1 scope):
  - [x] `User` (id, email, name, role enum CUSTOMER|ADMIN|TRADE, timestamps)
  - [x] `Category` (id, slug, name, parentId self-ref, imageUrl, sortOrder)
  - [x] `Product` (id, slug, name, description, basePrice Decimal(10,2), currency, status enum, categoryId, images[], materials[], dimensions, careInstructions, isFeatured, timestamps)
  - [x] `Order` (id, userId, status enum, subtotal, shipping, tax, total Decimal, currency, shippingAddress JSON, billingAddress JSON, timestamps)
  - [x] `OrderItem` (id, orderId, productId, quantity, unitPrice, totalPrice Decimal)
- [x] Configure Prisma Client singleton at `src/server/db/client.ts` — prevents hot-reload exhaustion via globalThis cache
- [x] Export typed `db` + `prisma` + `PrismaClient` from `src/server/db/index.ts`
- [x] Build query helpers library at `src/server/db/queries.ts` (getUserByEmail, getFeaturedProducts, getProductBySlug, getOrdersByUser, etc.)
- [x] Removed old `src/lib/db.ts` — all imports updated to `@/server/db`
- [x] Run `bun run db:push` to sync schema (initial sync)
- [x] Set up Prisma Studio access command (`bun run db:studio`)
- [x] Set up `bun run db:seed` script + `"prisma": {"seed": ...}` config
- [x] **NEW:** Created `prisma/seed.ts` — idempotent seed script (uses upsert):
  - [x] 1 admin user (`admin@auraliving.pk`, role ADMIN)
  - [x] 8 categories (matching navigation config: lighting, seating, tables, storage, textiles, decor, mirrors, outdoor — each with Unsplash cover image)
  - [x] 16 products (2 per category, with real luxury decor data: name, description, PKR pricing, multiple images, materials, dimensions, care instructions, featured flag)
- [x] **NEW:** Created initial migration `prisma/migrations/00000000000000_init/migration.sql` + `migration_lock.toml`
- [x] Marked baseline migration as applied via `prisma migrate resolve`
- [x] Verified `prisma migrate status` → "Database schema is up to date!"
- [x] Created `prisma.config.ts` (Prisma 7+ config — replaces deprecated `package.json#prisma` block)
- [x] Ran seed — verified: 1 user, 8 categories, 16 products, 5 featured products
- [x] Updated smoke test (`scripts/smoke-test-db.ts`) to verify seeded data end-to-end
- [x] Verified `bun run lint` passes (0 errors)
- [x] Verified `bun run typecheck` passes (0 errors)

---

## Phase 2 — Core Backend Services & Authentication (Weeks 3–4)

### 2.1 Authentication System (Better Auth) ✅

- [x] Install `better-auth` + `bcryptjs` + `@types/bcryptjs` + `dotenv`
- [x] Extended Prisma schema with Better Auth models:
  - [x] `User` extended with `emailVerified`, `image`, `banned`, `banReason`, `banExpires` (admin plugin fields)
  - [x] `Account` model (stores credentials + future OAuth providers)
  - [x] `Session` model (JWT sessions)
  - [x] `Verification` model (email verification + password reset tokens)
- [x] Configure `src/server/auth/config.ts` — Better Auth server instance:
  - [x] Email/password (scrypt hashing via Better Auth, min 8 chars)
  - [x] Session strategy: 7-day expiry, refresh once per day, 5-min cookie cache
  - [x] Admin role gate via `admin()` plugin + `role` field on User
  - [x] Rate limiting (10 requests per 60s per IP)
  - [x] _(Google OAuth deferred — free tier constraint, can be added later)_
- [x] Create auth API route handler at `app/api/auth/[...all]/route.ts`
- [x] Created `src/server/auth/client.ts` — Better Auth client for client components (`signIn`, `signUp`, `signOut`, `useSession`)
- [x] Created `src/server/auth/index.ts` — barrel export
- [x] Session helpers built into config.ts:
  - [x] `getSession()` — get current session (Server Components / API routes)
  - [x] `requireUser()` — throws UNAUTHORIZED if not signed in
  - [x] `requireAdmin()` — throws UNAUTHORIZED or FORBIDDEN if not admin
- [x] Build middleware (`middleware.ts`) — protects `/admin/*` and `/account/*` (cookie check, redirect to `/sign-in?redirect=...`)
- [x] Build auth UI with luxury design system:
  - [x] `/sign-in` page with `<SignInForm>` — UnderlineInput, error states, redirect support
  - [x] `/sign-up` page with `<SignUpForm>` — name/email/password/confirm, validation
  - [x] _(forgot-password + verify-email flows deferred — will add when Resend integration lands in Phase 4)_
- [x] Created `scripts/create-admin.ts` — creates admin user via Better Auth (handles scrypt hashing)
  - [x] Email: `admin@auraliving.pk`, Password: `Aura@Admin2026!`
  - [x] Idempotent — checks if admin already exists, updates role to ADMIN if needed
- [x] Created `scripts/test-admin-auth.ts` — end-to-end auth verification
  - [x] Verifies user exists in DB with credential account
  - [x] Verifies password hash matches (via `verifyPassword`)
  - [x] Verifies Better Auth `signInEmail` API returns valid session
  - [x] **All tests PASS** — admin login verified working
- [x] Built protected `/account` page — shows profile + orders/wishlist/addresses/profile shortcuts + admin link (if admin) + sign-out
- [x] Built protected `/admin` page — shows real DB stats (users/products/categories/orders counts via animated Counters) + management shortcuts
- [x] Updated `prisma.config.ts` to load `.env` via dotenv (Prisma 7+ config pattern)
- [x] Created `.env.production` template with all Vercel env vars documented (gitignored)
- [x] Created `docs/VERCEL_DEPLOYMENT.md` — complete 9-step Vercel deployment walkthrough
- [x] Verified `bun run lint` passes (0 errors)
- [x] Verified `bun run typecheck` passes (0 errors)
- [x] Verified admin login works via direct Better Auth API test

### 2.2 Database Schema Finalization & Migrations ✅

- [x] Expand Prisma schema with:
  - [x] `ProductVariant` (id, productId, sku, productName, size, color, colorHex, material, stock, priceDelta, imageUrl, isActive) — HUMAN-READABLE: productName + sku columns
  - [x] `Review` (id, productId, userId, userEmail, userName, productName, productSlug, rating 1-5, title, body, isVerified, isApproved, createdAt) — HUMAN-READABLE: userEmail + userName + productName + productSlug
  - [x] `ReviewImage` (id, reviewId, url, alt, sortOrder)
  - [x] `Cart` (id, userId, userEmail, subtotal, itemCount, currency, createdAt, updatedAt) — HUMAN-READABLE: userEmail column
  - [x] `CartItem` (id, cartId, productId, variantId, productName, productSlug, variantSku, variantLabel, quantity, unitPrice, totalPrice) — HUMAN-READABLE: productName + variantSku + variantLabel
  - [x] `Wishlist` (id, userId, userEmail) + `WishlistItem` (id, wishlistId, productId, variantId, productName, productSlug, variantSku, variantLabel) — HUMAN-READABLE: all denormalized
  - [x] `Address` (id, userId, userEmail, type SHIPPING|BILLING|BOTH, firstName, lastName, company, line1, line2, city, state, postalCode, country, phone, isDefault) — HUMAN-READABLE: userEmail + full address fields
  - [x] `Coupon` (id, code, type PERCENT|FIXED|FREE_SHIPPING, value, minOrder, maxDiscount, maxUses, usesCount, maxUsesPerUser, startsAt, expiresAt, isActive, description)
  - [x] `CouponUsage` (id, couponId, userId, orderId, userEmail, couponCode, discountAmount) — HUMAN-READABLE: userEmail + couponCode
- [x] Added 2 new enums: `AddressType` (SHIPPING/BILLING/BOTH) + `CouponType` (PERCENT/FIXED/FREE_SHIPPING)
- [x] Expanded `Order` model with: discount, couponCode, trackingNumber, carrier, shippedAt, deliveredAt, customerNotes, adminNotes
- [x] Expanded `OrderItem` model with: variantId, variantSku, variantLabel relations
- [x] Added proper indexes on ALL foreign keys + commonly-queried fields (isActive, isApproved, isVerified, isDefault, rating, expiresAt, etc.)
- [x] Added cascade/restrict delete rules: Cart→CartItem (cascade), Product→ProductVariant (cascade), User→Cart/Wishlist/Address (cascade), Product→OrderItem (restrict — can't delete product in order history)
- [x] Pushed schema to Supabase Postgres (10 new tables + expanded existing)
- [x] Updated seed script with:
  - [x] 19 product variants (2-3 per product with specific size/color/material/stock/priceDelta)
  - [x] 5 sample reviews (with human-readable userEmail + userName + productName, isVerified=true, isApproved=true)
  - [x] 3 active coupons (WELCOME10 = 10% off, AURA5000 = ₨5000 off, FREESHIP = free shipping)
- [x] Ran `bun run db:seed` — verified: 1 user, 8 categories, 16 products, 19 variants, 5 reviews, 3 coupons
- [x] Updated query helpers (`src/server/db/queries.ts`) with 20+ typed queries:
  - Product: getFeaturedProducts (now includes variants), getProductBySlug (includes variants + reviews), getProductsByCategory (includes variants), getNewArrivals (includes variants)
  - Variant: getVariantsByProduct, getVariantBySku
  - Review: getApprovedReviews, getReviewSummary (average + distribution)
  - Cart: getCartByUserId (with items + product + variant), getOrCreateCart
  - Wishlist: getWishlistByUserId (with items + product), getOrCreateWishlist
  - Address: getAddressesByUser, getDefaultAddress
  - Coupon: getCouponByCode, getActiveCoupons, validateCoupon (full validation logic — min order, expiry, max uses, per-user limit, discount calculation)
  - Admin: getAllUsersWithStats, getAdminStats (now includes reviews + coupons counts)
- [x] Updated smoke test to verify ALL 15 tables + denormalized columns + sample data
- [x] Fixed Supabase free tier connection pool issue (sequential queries instead of Promise.all)
- [x] Verified `bun run lint` passes (0 errors)
- [x] Verified `bun run typecheck` passes (0 errors)
- [x] Full smoke test PASSED — all tables verified with human-readable data

### 2.3 API Route Handlers & Server Actions

- [ ] Build typed Server Actions in `src/server/actions/`:
  - [ ] `cart.ts` — `addToCart`, `updateQuantity`, `removeFromCart`, `mergeAnonymousCart`
  - [ ] `wishlist.ts` — `toggleWishlist`, `getWishlist`
  - [ ] `checkout.ts` — `createOrder`, `applyCoupon`, `removeCoupon`
  - [ ] `account.ts` — `updateProfile`, `updatePassword`, `manageAddresses`
  - [ ] `reviews.ts` — `createReview`, `markHelpful`
  - [ ] `admin/products.ts` — `createProduct`, `updateProduct`, `deleteProduct`, `toggleFeatured`
  - [ ] `admin/orders.ts` — `updateOrderStatus`, `getOrderMetrics`
- [ ] Define Zod schemas for every action payload in `src/server/actions/schemas/`
- [ ] Implement `withAuth()` and `withAdmin()` higher-order action wrappers
- [ ] Implement typed revalidation helpers (`revalidateTag`, `revalidatePath`)

### 2.4 File Storage Integration

- [ ] Receive Supabase Storage config from user
- [ ] Create buckets: `product-images` (public), `user-avatars` (public), `review-images` (public), `admin-assets` (private)
- [ ] Build `src/server/storage/client.ts` — typed Supabase Storage client
- [ ] Build upload utilities:
  - [ ] `uploadProductImage(file, productId)` — auto-generates thumbnail, medium, large via sharp
  - [ ] `uploadAvatar(file, userId)` — square crop + resize
  - [ ] `uploadReviewImage(file, reviewId)` — max 1080px
- [ ] Build admin upload component with progress + preview + drag-drop
- [ ] Configure RLS policies on each bucket (public read, auth write)

---

## Phase 3 — Frontend Product Catalog & Luxury UI (Weeks 5–6)

### 3.1 Global Layouts & Navigation

- [ ] Build root `app/layout.tsx` — fonts, providers (Theme, Query, Cart, Lenis, Motion, Toaster)
- [ ] Build `<Header>` component:
  - [ ] Glassmorphic container (backdrop-blur 20px, 80% white, 5% black hairline)
  - [ ] Logo (Playfair Display wordmark)
  - [ ] Mega-menu with categories (hover-triggered, staggered reveal)
  - [ ] Search trigger (opens overlay)
  - [ ] Account icon, Wishlist icon (with count badge), Cart icon (with count badge)
  - [ ] Scroll behavior: blur intensifies, shrinks height on scroll
- [ ] Build `<SearchOverlay>` — full-screen takeover with instant search (Meilisearch)
- [ ] Build `<Footer>`:
  - [ ] Multi-column layout (Shop, About, Help, Newsletter, Social)
  - [ ] Staggered link reveals on scroll
  - [ ] Newsletter signup (Resend integration)
  - [ ] Subtle parallax background imagery
- [ ] Build `<CartDrawer>` — slide-out from right (Motion + Zustand)
- [ ] Build `<WishlistDrawer>` — slide-out variant
- [ ] Build announcement bar (rotating luxury messages)
- [ ] Implement breadcrumb component for nested pages

### 3.2 Product Listing Page (PLP) & Search

- [ ] Configure Meilisearch instance (cloud or self-hosted) — receive credentials from user
- [ ] Build `src/server/search/meilisearch.ts` — typed client + index sync helpers
- [ ] Configure Meilisearch index: products with searchable attributes (name, description, materials), filterable (category, price, material, color), sortable (price, createdAt, popularity)
- [ ] Build `/shop` PLP:
  - [ ] 12-column responsive grid (asymmetric editorial option for featured rows)
  - [ ] Filter sidebar (category, price range, material, color, in-stock)
  - [ ] Sort dropdown (Featured, Newest, Price asc/desc, Top rated)
  - [ ] URL-driven state (search params) — shareable filtered views
  - [ ] Infinite scroll or "Load more" with skeleton loaders
  - [ ] Empty state with Lottie animation
- [ ] Build `<ProductCard>`:
  - [ ] Image 85% of card, sharp corners
  - [ ] Product name (Playfair), price (Inter)
  - [ ] Hover: soft-ambient shadow, image zoom (1.04), quick-add button slides up
  - [ ] Wishlist heart toggle (top-right)
  - [ ] Badge support ("New", "Bestseller", "Limited")
- [ ] Build category landing pages `/shop/[category]` with hero banner
- [ ] Implement instant search overlay with debounced Meilisearch queries + keyboard nav

### 3.3 Product Detail Page (PDP)

- [ ] Build `/product/[slug]` route:
  - [ ] Two-column layout: gallery (60%) + info (40%)
  - [ ] High-fidelity image gallery with thumbnails, smooth transitions, zoom-on-hover
  - [ ] Stacked image layout option (editorial scroll)
- [ ] Build PDP info section:
  - [ ] Breadcrumb (label-caps style)
  - [ ] Product name (Playfair Display, large)
  - [ ] Price with currency formatting
  - [ ] Star rating + review count (links to reviews section)
  - [ ] Variant selectors (size, color, material) — pill chips with selected gold state
  - [ ] Quantity stepper
  - [ ] "Add to Cart" gold CTA with micro-interaction (scale + checkmark)
  - [ ] "Buy Now" secondary (skips to checkout)
  - [ ] Wishlist toggle
  - [ ] Accordion: Materials · Dimensions · Care Instructions · Shipping & Returns
  - [ ] Trust badges (secure checkout, free shipping threshold, etc.)
- [ ] Build reviews section:
  - [ ] Summary (avg rating, distribution bars)
  - [ ] Filter/sort reviews
  - [ ] Verified buyer badge
  - [ ] Review submission form (with photo upload via Supabase Storage)
- [ ] Build "You may also like" related products carousel
- [ ] Build "Recently viewed" tracker (localStorage + Zustand)
- [ ] Implement structured data (JSON-LD Product schema for SEO)
- [ ] Generate static metadata + OpenGraph image per product

---

## Phase 4 — E-Commerce Workflows & Checkout (Weeks 7–8)

### 4.1 Advanced Shopping Cart

- [ ] Build Zustand cart store (`src/stores/cart-store.ts`):
  - [ ] State: items[], isOpen, isHydrated, coupon
  - [ ] Actions: addItem, removeItem, updateQty, clear, openDrawer, closeDrawer, applyCoupon
  - [ ] Persist to localStorage for guests
  - [ ] Sync to server Cart table on login (merge anonymous cart)
- [ ] Build `<CartDrawer>` UI:
  - [ ] Slide-out from right (Motion spring)
  - [ ] Line items with image, name, variant, qty stepper, remove
  - [ ] Subtotal, estimated shipping, tax
  - [ ] Coupon input
  - [ ] "Proceed to Checkout" gold CTA
  - [ ] Free shipping progress bar
  - [ ] Empty state with Lottie
- [ ] Implement optimistic updates with TanStack Query mutations
- [ ] Add cart badge animation on Header (Motion count bump)
- [ ] Implement "Add to Cart" toast with "View Cart" action

### 4.2 Multi-Step Checkout Flow

- [ ] Build `/checkout` route (auth-required, redirects guests to sign-in with redirect-back)
- [ ] Implement multi-step form with React Hook Form + Zod:
  - [ ] **Step 1 — Information**: email, shipping address (saved addresses selector)
  - [ ] **Step 2 — Shipping**: method selection (Standard, Express, White Gloove delivery)
  - [ ] **Step 3 — Payment**: payment method selector (Stripe / JazzCash / Easypaisa)
  - [ ] **Step 4 — Review**: order summary, final confirm
- [ ] Build progress indicator (editorial numbered steps)
- [ ] Implement step validation (block forward on invalid)
- [ ] Implement order summary sticky sidebar (cart items, totals, coupon)
- [ ] Build `/order/confirmation/[orderId]` page with confetti-free luxury success animation
- [ ] Implement order failure recovery flow

### 4.3 Payment Gateway Integration

- [ ] Install `stripe` + configure `src/server/payments/stripe.ts`:
  - [ ] Create PaymentIntent server action
  - [ ] Stripe webhook handler at `/api/webhooks/stripe` (signature verification)
  - [ ] Update Order status on `payment_intent.succeeded` / `.failed`
- [ ] Build Stripe Elements UI component (gold-themed card input)
- [ ] Configure JazzCash integration `src/server/payments/jazzcash.ts`:
  - [ ] Receive merchant ID, password, integrity salt from user
  - [ ] Build payment request with HMAC signature
  - [ ] Build redirect flow + callback handler at `/api/webhooks/jazzcash`
- [ ] Configure Easypaisa integration `src/server/payments/easypaisa.ts`:
  - [ ] Receive merchant credentials from user
  - [ ] Build token-based checkout flow
  - [ ] Webhook handler at `/api/webhooks/easypaisa`
- [ ] Build typed `PaymentProvider` interface — all providers conform
- [ ] Implement idempotency keys on order creation
- [ ] Implement payment retry on transient failures
- [ ] Log all payment events to `PaymentLog` table for audit

### 4.4 Transactional Emails

- [ ] Configure Resend with verified domain (receive API key from user)
- [ ] Build email templates with React Email:
  - [ ] Welcome email (on signup)
  - [ ] Order confirmation (with itemized summary + tracking link)
  - [ ] Payment failed
  - [ ] Order shipped (with carrier + tracking)
  - [ ] Order delivered
  - [ ] Password reset
  - [ ] Email verification
  - [ ] Abandoned cart reminder (24h delay)
- [ ] Style all templates with brand tokens (Playfair + Inter, gold accents)
- [ ] Build `src/server/emails/send.ts` — typed email dispatcher
- [ ] Implement email queue (in-memory for dev; Resend batch for prod)

---

## Phase 5 — Polish, Security & Production Readiness (Weeks 9–10)

### 5.1 Advanced Animations & Micro-Interactions

- [ ] Build hero section with SplitType text reveal + image parallax
- [ ] Implement GSAP ScrollTrigger storytelling sections:
  - [ ] Brand history timeline (horizontal scroll trigger)
  - [ ] Artisan focus section (pinned image with text reveal)
  - [ ] Material story section (image sequence scrub)
- [ ] Build collection landing pages with staggered card reveals
- [ ] Add Lottie animations:
  - [ ] Empty cart state
  - [ ] Empty search results
  - [ ] Order success
  - [ ] 404 page
- [ ] Implement page transition animations (Motion + App Router)
- [ ] Add magnetic hover on primary CTAs
- [ ] Add custom cursor on hero sections (optional luxury touch)
- [ ] Audit all animations for `prefers-reduced-motion`

### 5.2 Security Hardening

- [ ] Install + configure Arcjet:
  - [ ] Bot protection on auth + checkout routes
  - [ ] Rate limiting: 5 auth attempts/min, 10 checkout attempts/hour
  - [ ] Common attack signature detection (SQLi, XSS)
- [ ] Audit Supabase RLS policies on every table:
  - [ ] Users can only read own cart/wishlist/orders/addresses
  - [ ] Reviews readable by all, writable by auth users
  - [ ] Products/categories readable by all, writable by admin only
- [ ] Implement CSRF protection on all server actions
- [ ] Sanitize all user-generated HTML (reviews) with DOMPurify
- [ ] Add strict CSP headers in `next.config.ts`
- [ ] Set up Sentry for error tracking (receive DSN from user)
- [ ] Audit npm dependencies for vulnerabilities (`bun audit`)

### 5.3 Performance Optimization & Analytics

- [ ] Optimize images:
  - [ ] Use `next/image` with proper `sizes` attribute everywhere
  - [ ] Generate AVIF + WebP via Supabase transform or sharp
  - [ ] Lazy-load below-fold product imagery
- [ ] Optimize fonts: subset Playfair + Inter, `display: swap`
- [ ] Implement route segment config (`export const revalidate`, `dynamicParams`)
- [ ] Add ISR to product and category pages (60s revalidate)
- [ ] Implement `loading.tsx` skeletons on every route
- [ ] Add `error.tsx` boundaries on every route group
- [ ] Bundle analyzer setup (`@next/bundle-analyzer`)
- [ ] Integrate analytics (receive keys from user):
  - [ ] GA4 — page views, ecommerce events (view_item, add_to_cart, begin_checkout, purchase)
  - [ ] Meta Pixel — mirror key events for ads
  - [ ] Microsoft Clarity — session recordings + heatmaps
- [ ] Build typed analytics dispatcher (`src/lib/analytics.ts`)
- [ ] Implement consent banner (GDPR-friendly)

### 5.4 Final Testing & Deployment

- [ ] Cross-browser testing (Chrome, Safari, Firefox, Edge — latest 2 versions)
- [ ] Mobile responsiveness audit (iOS Safari, Android Chrome)
- [ ] Lighthouse audit — target 95+ on all categories
- [ ] Accessibility audit (axe-core, keyboard nav, screen reader)
- [ ] Payment flow end-to-end testing (Stripe test mode, JazzCash sandbox, Easypaisa sandbox)
- [ ] Load testing on key routes (k6 or similar)
- [ ] SEO audit: sitemap.xml, robots.txt, structured data, meta tags
- [ ] Configure Vercel deployment (receive token from user)
- [ ] Configure Cloudflare DNS + custom domain + SSL
- [ ] Set up Vercel environment variables (all keys)
- [ ] Set up preview deployments per branch
- [ ] Final production smoke test on live domain

---

## Credentials Needed From User (Track Here)

| Service                           | Required Keys                                                                                                  | Status                                                                                                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Supabase                          | `DATABASE_URL` (pooler), `DIRECT_URL`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_PUBLISHABLE_KEY` | `[x]` Received — DB connection verified, schema pushed, 5 tables created, `pg_trgm` + `unaccent` extensions installed |
| Better Auth                       | `BETTER_AUTH_SECRET` (auto-generated by us if not provided)                                                    | `[x]` Self-managed                                                                                                    |
| ~~Google OAuth~~                  | ~~Skipped — free tier~~                                                                                        | `[-]` Deferred                                                                                                        |
| ~~Stripe / JazzCash / Easypaisa~~ | ~~Skipped — mock provider for dev~~                                                                            | `[-]` Deferred                                                                                                        |
| ~~Resend~~                        | ~~Skipped — in-house email queue~~                                                                             | `[-]` Deferred                                                                                                        |
| ~~Meilisearch~~                   | ~~Skipped — Postgres FTS~~                                                                                     | `[-]` Deferred                                                                                                        |
| ~~Arcjet~~                        | ~~Skipped — in-house rate limiter~~                                                                            | `[-]` Deferred                                                                                                        |
| ~~Sentry~~                        | ~~Skipped — in-house error logger~~                                                                            | `[-]` Deferred                                                                                                        |
| ~~GA4 / Meta Pixel / Clarity~~    | ~~Skipped — in-house analytics~~                                                                               | `[-]` Deferred                                                                                                        |
| ~~Vercel / Cloudflare~~           | ~~Deferred until launch~~                                                                                      | `[-]` Deferred                                                                                                        |

---

## Phase Status Tracker

| Phase               | Status | Started    | Completed  | Notes                                                                               |
| ------------------- | ------ | ---------- | ---------- | ----------------------------------------------------------------------------------- |
| 0 — Master Config   | `[x]`  | 2026-06-26 | 2026-06-26 | Brand/site/nav/features config + strict TS/ESLint/Husky + folder arch + conventions |
| 1 — Foundation      | `[x]`  | 2026-06-26 | 2026-06-26 | 1.1 ✅ 1.2 ✅ 1.3 ✅ 1.4 ✅ 1.5 ✅ — Foundation COMPLETE                            |
| 2 — Auth & Backend  | `[~]`  | 2026-06-26 | —          | 2.1 ✅ 2.2 ✅. Next: 2.3 Server Actions + 2.4 Storage                               |
| 3 — Catalog UI      | `[ ]`  | —          | —          |                                                                                     |
| 4 — Checkout        | `[ ]`  | —          | —          |                                                                                     |
| 5 — Polish & Launch | `[ ]`  | —          | —          |                                                                                     |

---

## Change Log

| Date       | Change                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Phase   |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| 2026-06-26 | Initial execution plan authored                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | —       |
| 2026-06-26 | Revised to in-house/free-tier approach (no paid 3rd-party deps)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | —       |
| 2026-06-26 | Skipped Google OAuth (free tier constraint)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 2.1     |
| 2026-06-26 | Phase 1.1 complete: project init, strict TS/ESLint, Husky, config files, folder arch                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1.1     |
| 2026-06-26 | Rebrand: Ethereal Dwelling → Aura Living (Pakistani audience, PKR currency)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 0.1     |
| 2026-06-26 | Supabase credentials received + DB connection verified; Phase 1.5 core models synced (5 tables, pg_trgm + unaccent)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 1.5     |
| 2026-06-26 | Added `instrumentation.ts` + `env -u` in dev script to override stale system env vars                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 1.1     |
| 2026-06-26 | Updated Supabase keys to standard JWT format (anon + service_role)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | 1.5     |
| 2026-06-26 | Phase 1.2 complete: full luxury design system in globals.css (Playfair Display + Inter, brand palette, clamp() fluid type, motion tokens, glassmorphic + soft-ambient shadows), Container/Section/Eyebrow/LuxuryHeading composites, preview page verified via Agent Browser                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | 1.2     |
| 2026-06-26 | Phase 1.3 complete: customized shadcn Button (luxury variants primary/gold/outline-luxury/underline), Dialog (cream overlay), Sheet (cart drawer pattern). Built luxury composites: UnderlineInput, MaterialChip, ProductCard, GlassmorphicHeader, LuxuryBadge                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | 1.3     |
| 2026-06-26 | Phase 1.4 complete: MotionProvider (luxury springs + reduced-motion guard), LenisProvider (inertia smooth scroll), GSAP+ScrollTrigger registered, 9 motion wrappers (RevealOnScroll, SplitHeading, MagneticButton, ParallaxImage, Stagger, ScrollProgress, Marquee, Counter, Tilt). Awwwards-level preview page showcasing all components + animations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 1.4     |
| 2026-06-26 | **Phase 1 FOUNDATION COMPLETE** — ready for Phase 2 (Auth + Backend)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 1       |
| 2026-06-26 | **Refinement pass** (per user feedback): removed MagneticButton, replaced with premium CSS hover effects on Button (arrow translate, ink sweep-up overlay, gold color shifts). Added 4 new motion wrappers (BlurReveal, WordReveal, ImageReveal, DrawLine). Added 6 new luxury components (CategoryCard, TestimonialCard, JournalCard, FAQAccordion, NewsletterSignup, InstagramGrid). Rewrote page.tsx with 14 sections (hero, marquee, categories, editorial banner, products, stats, testimonials, atelier, journal, newsletter, FAQ, Instagram, footer). Added luxury utility CSS (line-clamp, ornament-dots, grain-overlay, ken-burns, accordion keyframes, text-vertical). Removed all non-animation inline styles. Verified via Agent Browser — 0 errors, 8 screenshots captured across scroll positions                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 1.3+1.4 |
| 2026-06-26 | **10/10 polish pass** (per user feedback): Added 20+ reusable global utility classes (hover-lift, hover-zoom, hover-glow, glass-panel, soft-shadow, layered-shadow, floating, organic-ease, reveal-mask, shimmer, icon-rotate, icon-slide-right, text-gradient-gold, text-outline, link-underline, gradient-gold/ink/cream, grid-editorial, etc.). Built sound utility (Web Audio API — 6 sound types, off by default, toggleable). Built 8 new motion components: CursorFollower (custom cursor with magnetic + glow + dynamic text), PageLoader (elegant logo animation), FloatingElement (decorative parallax accents), MagneticWrap (wrapper for ANY element), RippleEffect (material ripple on click), ImageSpotlight (mouse-follow radial), AlternateImage (crossfade swap), ScrollIndicator (animated mouse cue), SuccessCheckmark (animated SVG), StepProgress (multi-step indicator), DecorativeDivider (4 variants: line/diamond/dots/ornament). Built 6 new UI components: SkeletonLuxury (5 variants), MegaMenu (header mega menu with staggered reveal + featured image), CartBadge (animated count bouncer), QuantityStepper (animated qty controls), ParallaxFooter (footer with parallax bg + staggered links), SoundToggle (sound on/off toggle). Upgraded ProductCard with alternate image crossfade, mouse-follow spotlight, sound on add-to-cart, quick-view button, magnetic wrap option. Added luxury variants library (luxuryVariants.ts — 12 reusable Motion variants + staggerContainer + luxuryTransitions). Wired CursorFollower + PageLoader into Providers. Page now has 16 sections. Verified via Agent Browser — 0 errors, 7 screenshots across scroll positions | 1.3+1.4 |

---

**Next action awaiting:** User command to begin **Phase 2.2: Database Schema Finalization & Migrations**.

| 2026-06-26 | **Section 0 fix**: Updated EXECUTION_PLAN title from "Ethereal Dwelling" → "Aura Living". Filled Section 0 checkboxes (0.1 brand/site/nav/features config, 0.2 strict TS + ESLint + Husky, 0.3 folder architecture, 0.4 conventions summary). Marked Phase 0 as complete in tracker. | 0 |
| 2026-06-26 | **Admin Users page** (per user feedback "user IDs not professional"): Built `/admin/users` — shows users by NAME + EMAIL (not raw IDs), with avatar initials, role badge (Admin/Trade/Customer), status badge (Verified/Pending/Banned), joined date (relative), last login (from Session table). Updated admin dashboard Customers card to link here. Tested via Agent Browser — admin login → /admin/users shows "Aura Living Admin / admin@auraliving.pk" professionally. | 2.1 |
