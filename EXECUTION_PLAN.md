# Ethereal Dwelling — Production Execution Plan

> **Brand:** Ethereal Dwelling · Premium Luxury Home Decor E-Commerce
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

## 0. Master Configuration & Conventions

### 0.1 Project Metadata

- [ ] Define brand constants file (`src/config/brand.ts`) — name, tagline, contact, socials, currency, locale
- [ ] Define site configuration (`src/config/site.ts`) — URL, OG defaults, robots, sitemap config
- [ ] Define navigation config (`src/config/navigation.ts`) — header menu, footer links, mega-menu structure
- [ ] Define feature flags (`src/config/features.ts`) — gated features (AI search, wishlist, etc.)

### 0.2 Strict TypeScript Conventions

- [ ] `tsconfig.json` with `strict: true`, `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`
- [ ] Path aliases: `@/*`, `@/components/*`, `@/lib/*`, `@/config/*`, `@/types/*`, `@/hooks/*`, `@/stores/*`, `@/server/*`
- [ ] ESLint + Prettier + `eslint-plugin-import` + `eslint-plugin-jsx-a11y` + `eslint-plugin-tailwindcss`
- [ ] Pre-commit hook via Husky + lint-staged

### 0.3 Folder Architecture (locked)

```
src/
├── app/                      # Next.js App Router
│   ├── (shop)/               # Public storefront route group
│   ├── (auth)/               # Auth pages route group
│   ├── (account)/            # Customer dashboard
│   ├── (admin)/              # Admin panel
│   ├── api/                  # Route handlers
│   └── layout.tsx
├── components/
│   ├── ui/                   # shadcn primitives (customized)
│   ├── shop/                 # Storefront components
│   ├── admin/                # Admin components
│   ├── motion/               # Motion wrappers
│   └── layout/               # Header, Footer, Cart drawer
├── config/                   # Brand, site, nav, features
├── lib/                      # Utilities (cn, formatters, etc.)
├── server/                   # Server-only: auth, db, services, actions
│   ├── auth/
│   ├── db/
│   ├── services/
│   └── actions/
├── stores/                   # Zustand stores
├── hooks/                    # Custom React hooks
├── types/                    # Global type definitions
├── styles/                   # Global CSS
└── providers/                # Context providers (theme, query, cart)
```

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

### 1.3 Premium UI Component Library Integration

- [ ] Initialize `shadcn/ui` with New York style + Tailwind v4
- [ ] Install Lucide React icon set
- [ ] Install & customize shadcn primitives (radii reduced to 0.25rem, borders removed where design dictates):
  - [ ] Button (variants: `primary-black`, `gold-cta`, `ghost-underline`, `icon-luxury`)
  - [ ] Input (underline variant per DESIGN.md)
  - [ ] Label (label-caps variant)
  - [ ] Card (flush, no border, soft-ambient shadow on hover)
  - [ ] Dialog (cream-tinted overlay)
  - [ ] Sheet (slide-out cart, slide-in filters)
  - [ ] Accordion (for PDP details)
  - [ ] Tabs, Tooltip, Toast, Dropdown, Select, Checkbox, RadioGroup, Separator
- [ ] Build luxury composite components:
  - [ ] `<LuxuryHeading>` — Playfair Display with kerning control
  - [ ] `<Eyebrow>` — label-caps tracked text
  - [ ] `<Container>` — 1440px max with responsive margins
  - [ ] `<Section>` — vertical stack wrapper (stack-md/xl options)

### 1.4 Animation Engine & Smooth Scroll Setup

- [ ] Install `motion` (Framer Motion successor), `gsap`, `lenis`, `split-type`, `lottie-react`
- [ ] Create `src/providers/MotionProvider.tsx` — global MotionConfig with luxury spring presets:
  - [ ] `easeLuxury = [0.22, 1, 0.36, 1]` (cubic-bezier)
  - [ ] `springSoft = { type: 'spring', stiffness: 280, damping: 32, mass: 0.8 }`
  - [ ] `springCart = { type: 'spring', stiffness: 320, damping: 30 }`
- [ ] Create `src/providers/LenisProvider.tsx` — global Lenis instance with RAF integration
- [ ] Create `src/lib/gsap.ts` — registered `gsap` + `ScrollTrigger` (client-only, tree-shaken)
- [ ] Build reusable motion wrappers:
  - [ ] `<RevealText>` — staggered word/line reveals via SplitType
  - [ ] `<RevealOnScroll>` — IntersectionObserver-driven fade/translate
  - [ ] `<MagneticButton>` — subtle magnetic hover for CTAs
  - [ ] `<ParallaxImage>` — scroll-driven parallax for hero imagery
- [ ] Ensure all motion respects `prefers-reduced-motion`

### 1.5 Database & ORM Initialization (Supabase + Prisma)

- [ ] Receive Supabase project URL + service role key from user
- [ ] Configure `DATABASE_URL` (Postgres pooler) + `DIRECT_URL` (for migrations)
- [ ] Author `prisma/schema.prisma` with Postgres provider
- [ ] Define core models (Phase 1 scope):
  - [ ] `User` (id, email, name, role enum CUSTOMER|ADMIN, timestamps)
  - [ ] `Category` (id, slug, name, parentId self-ref, imageUrl, sortOrder)
  - [ ] `Product` (id, slug, name, description, basePrice, currency, status, categoryId, images[], materials[], dimensions, careInstructions, isFeatured, createdAt, updatedAt)
  - [ ] `Order` (id, userId, status, subtotal, shipping, tax, total, currency, shippingAddress, billingAddress, createdAt)
  - [ ] `OrderItem` (id, orderId, productId, variantId, quantity, unitPrice, totalPrice)
- [ ] Configure Prisma Client singleton (`src/server/db/client.ts`) — prevent hot-reload exhaustion
- [ ] Export typed `db` from `src/server/db/index.ts`
- [ ] Run `bun run db:push` to sync schema
- [ ] Set up Prisma Studio access command

---

## Phase 2 — Core Backend Services & Authentication (Weeks 3–4)

### 2.1 Authentication System (Better Auth)

- [ ] Install `better-auth`
- [ ] Configure `src/server/auth/config.ts` — Better Auth server instance:
  - [ ] Email/password (bcrypt, min 8 chars, breach check)
  - [ ] Session strategy: JWT, 7-day expiry, refresh on activity
  - [ ] Admin role gate via `role` field on User
  - [ ] _(Google OAuth deferred — free tier constraint, can be added later)_
- [ ] Create auth API route handler at `app/api/auth/[...all]/route.ts`
- [ ] Create `src/server/auth/session.ts` — `getSession()`, `requireUser()`, `requireAdmin()` helpers
- [ ] Build middleware (`middleware.ts`) — protect `(account)` and `(admin)` route groups
- [ ] Build auth UI:
  - [ ] `/sign-in` page (email + Google button, underline inputs)
  - [ ] `/sign-up` page (with terms checkbox)
  - [ ] `/forgot-password` + `/reset-password` flows
  - [ ] `/verify-email` flow
- [ ] Add `<AuthProvider>` context for client session access
- [ ] Add `useSession()` hook

### 2.2 Database Schema Finalization & Migrations

- [ ] Expand Prisma schema with:
  - [ ] `ProductVariant` (id, productId, sku, size, color, material, stock, priceDelta, imageUrl)
  - [ ] `Review` (id, productId, userId, rating 1-5, title, body, verified, createdAt)
  - [ ] `ReviewImage` (id, reviewId, url)
  - [ ] `Cart` (id, userId, anonymousId, createdAt, updatedAt)
  - [ ] `CartItem` (id, cartId, productId, variantId, quantity)
  - [ ] `Wishlist` (id, userId) + `WishlistItem` (id, wishlistId, productId, variantId)
  - [ ] `Address` (id, userId, type, line1, line2, city, state, postalCode, country, isDefault)
  - [ ] `Coupon` (id, code, type PERCENT|FIXED, value, minOrder, maxUses, expiresAt, active)
  - [ ] `CouponUsage` (id, couponId, userId, orderId)
- [ ] Generate & run migration: `bun run db:migrate dev --name init_full_schema`
- [ ] Author seed script `prisma/seed.ts`:
  - [ ] 8 categories (Lighting, Seating, Tables, Storage, Textiles, Decor, Mirrors, Outdoor)
  - [ ] 40+ products with variants, materials, dimensions, care notes
  - [ ] 1 admin user + 3 customer users
  - [ ] Sample reviews on featured products
  - [ ] 3 active coupons
- [ ] Run `bun run db:seed`
- [ ] Add `db:reset` script for clean re-seed

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

| Phase               | Status | Started    | Completed | Notes                                                       |
| ------------------- | ------ | ---------- | --------- | ----------------------------------------------------------- |
| 0 — Master Config   | `[~]`  | 2026-06-26 | —         | Folder arch + brand config done; TS/ESLint/Husky configured |
| 1 — Foundation      | `[~]`  | 2026-06-26 | —         | 1.1 ✅ 1.2 ✅ 1.5 ✅. Next: 1.3 shadcn customization        |
| 2 — Auth & Backend  | `[ ]`  | —          | —         |                                                             |
| 3 — Catalog UI      | `[ ]`  | —          | —         |                                                             |
| 4 — Checkout        | `[ ]`  | —          | —         |                                                             |
| 5 — Polish & Launch | `[ ]`  | —          | —         |                                                             |

---

## Change Log

| Date       | Change                                                                                                                                                                                                                                                                      | Phase |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----- |
| 2026-06-26 | Initial execution plan authored                                                                                                                                                                                                                                             | —     |
| 2026-06-26 | Revised to in-house/free-tier approach (no paid 3rd-party deps)                                                                                                                                                                                                             | —     |
| 2026-06-26 | Skipped Google OAuth (free tier constraint)                                                                                                                                                                                                                                 | 2.1   |
| 2026-06-26 | Phase 1.1 complete: project init, strict TS/ESLint, Husky, config files, folder arch                                                                                                                                                                                        | 1.1   |
| 2026-06-26 | Rebrand: Ethereal Dwelling → Aura Living (Pakistani audience, PKR currency)                                                                                                                                                                                                 | 0.1   |
| 2026-06-26 | Supabase credentials received + DB connection verified; Phase 1.5 core models synced (5 tables, pg_trgm + unaccent)                                                                                                                                                         | 1.5   |
| 2026-06-26 | Added `instrumentation.ts` + `env -u` in dev script to override stale system env vars                                                                                                                                                                                       | 1.1   |
| 2026-06-26 | Updated Supabase keys to standard JWT format (anon + service_role)                                                                                                                                                                                                          | 1.5   |
| 2026-06-26 | Phase 1.2 complete: full luxury design system in globals.css (Playfair Display + Inter, brand palette, clamp() fluid type, motion tokens, glassmorphic + soft-ambient shadows), Container/Section/Eyebrow/LuxuryHeading composites, preview page verified via Agent Browser | 1.2   |

---

**Next action awaiting:** User command to begin **Phase 1.3: Premium UI Component Library Integration** (shadcn/ui customization to luxury spec).
