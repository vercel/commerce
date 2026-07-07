# Lone Elk Coffee Company — Storefront Design

**Date:** 2026-07-07
**Base:** vercel/commerce (Next.js 15.6 canary, App Router, React 19, Tailwind v4)
**Status:** Approved via detailed brief; implemented on branch `lone-elk-storefront`

## 1. Goal

Rebrand and harden the vercel/commerce template into a production storefront for
Lone Elk Coffee Company — a premium, rugged specialty coffee brand for outdoor
athletes and rucking enthusiasts. Headless Shopify backend, secure Shopify
checkout handoff, order fulfillment synced automatically to the roaster's order
management app (Tamacula Coffee Roasters) installed on the Shopify store.

## 2. Architecture

```
Browser ── Next.js (Vercel) ── Shopify Storefront API (GraphQL, 2026-07)
              │                        │
              │  cart.checkoutUrl      │
              └──────► Shopify Checkout (payment vault)
                              │
                     Shopify Order created
                              │
              Tamacula app (installed on store) receives order
              via its own app subscriptions — no frontend code
```

Key point on the automation workflow: **the frontend never touches order
webhooks.** Once checkout completes on Shopify's domain, the order exists in
Shopify's order pipeline and the fulfillment app picks it up through its own
app-level subscriptions. The only webhook this codebase owns is
`/api/revalidate`, which invalidates the _content cache_ (products/collections)
when catalog data changes in Shopify admin.

## 3. Decisions

### 3.1 Data layer (`lib/shopify`)

- **API version:** `/api/2026-07/graphql.json` (current stable as of today).
  Single constant in `lib/constants.ts`.
- **`cartCreate`, not `checkoutCreate`:** the legacy Checkout API was removed
  from the Storefront API; the Cart API (`cartCreate`, `cartLinesAdd`, …) with
  `cart.checkoutUrl` is the supported headless checkout path. The brief allowed
  either; only `cartCreate` exists in 2026-07.
- **Caching = `'use cache'` + `cacheTag`/`cacheLife`:** this is the
  current-generation ISR in Next 15.6 (PPR enabled). Product/collection reads
  are cached with `days` lifetimes and tag-invalidated by the Shopify
  `products/*` and `collections/*` webhooks hitting `/api/revalidate`. Cart
  reads use `'use cache: private'` with a `seconds` lifetime.
- **Variant fragment gains** `sku` (maps to the fulfillment partner's backend
  SKU), `quantityAvailable` (inventory status; nullable when the token lacks
  the `unauthenticated_read_product_inventory` scope), and `compareAtPrice`
  (sale display).
- **Graceful degradation:** every catalog read returns an empty/undefined
  result with a console note when `SHOPIFY_STORE_DOMAIN` is unset, so the site
  builds and renders without credentials.
- **Demo mode:** when `SHOPIFY_STORE_DOMAIN=mock.shop`, the fetch layer targets
  `https://mock.shop/api` (Shopify's official mock Storefront API) so the UI can
  be developed and previewed without a real store.

### 3.2 Cart & checkout handoff

- Keep the template's proven pattern: server actions own Shopify mutations
  (cart id lives in an httpOnly cookie), `useOptimistic` cart context gives
  instant UI. Line items always carry the **Shopify variant GID**
  (`merchandise.id`) — that is what maps to the roaster's SKU.
- **Checkout:** "Proceed to Checkout" calls a server action that syncs/reads
  the cart and returns the fresh `checkoutUrl`; the client then executes
  `window.location.href = checkoutUrl` (explicit client-side handoff per
  brief). Belt-and-braces: the action re-reads the cart from Shopify so the
  URL always reflects the server-side cart state.
- **Return to `/success`:** the Cart API has no parameter for a post-payment
  redirect. The supported wiring is in Shopify admin: set the Headless-channel
  storefront URL (and, on Plus, checkout customization) so the post-purchase
  "continue shopping" / order-status links point at our domain's `/success`.
  We ship the branded `/success` page; it clears the stale `cartId` cookie
  (Shopify nulls carts after checkout) and links back into the catalog.
  README documents the admin steps.

### 3.3 UI / design system

- **Dark-only rugged theme** (deliberate: the brand is matte black; no
  light/dark fork). Tokens in `globals.css` via Tailwind v4 `@theme`:
  night `#0C0C0A`, charcoal panels `#181815`/`#22221D`, tactical olive
  `#5F6F46` (+ bright field accent `#8AA062`), bone off-white `#ECE8DD`.
- **Type:** Oswald (condensed geometric, all-caps, tracked) for display via
  `next/font/google`; Geist Sans stays for body.
- **Native primitives only:** replace `@headlessui/react` (cart drawer, mobile
  menu) with hand-rolled fixed-position dialogs (escape/backdrop/scroll-lock),
  drop `sonner` + welcome toast. Heroicons stays (plain SVG icon set, not a
  component framework). No new UI dependencies.
- **Pages:**
  - `/` landing — full-bleed hero ("FRESH-ROASTED ON DEMAND"), performance
    metrics strip, featured roster grid, brand story band, CTA.
  - `/search` + `/search/[collection]` — responsive product grid; each card
    shows stock badge, price, and a **grind quick-add**: variant chips
    (Whole Bean / Standard Drip / Coarse — Cold Brew) that add the exact
    variant to the cart from the grid. Products whose options aren't a single
    grind axis fall back to a "Select Options" link to the PDP.
  - `/product/[handle]` — restyled PDP; variant selector is the grind
    profile picker; shows SKU + inventory state.
  - `/success` — post-checkout landing.
- Grind detection: use the product option named like `/grind/i`, else the only
  option if exactly one exists, else PDP fallback.

### 3.4 Explicit non-goals

- No test harness: the template ships none; verification is typecheck +
  production build + live preview against mock.shop. (Revisit if the data
  layer grows real logic worth unit-testing.)
- No customer accounts, subscriptions, or metafield-driven roast metrics in
  this pass (metrics strip is static brand copy).
- No changes to Shopify-side configuration beyond documentation.

## 4. Environment

```
SHOPIFY_STORE_DOMAIN            lone-elk.myshopify.com (or mock.shop for demo)
SHOPIFY_STOREFRONT_ACCESS_TOKEN Storefront API token (public, unauthenticated scopes)
SHOPIFY_REVALIDATION_SECRET     shared secret for /api/revalidate
COMPANY_NAME / SITE_NAME        brand strings (fallbacks hardcoded)
```
