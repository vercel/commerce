# Lone Elk Coffee Company — Storefront

Headless storefront for **Lone Elk Coffee Company**: premium, small-batch
coffee, fresh-roasted on demand for outdoor athletes and rucking crews.

Built on the vercel/commerce template: Next.js App Router (React Server
Components, Server Actions, `useOptimistic`, PPR + `'use cache'`),
Tailwind CSS v4, and the Shopify Storefront API (GraphQL, version
**2026-07**), deployed on Vercel.

## How an order flows

```
Browser ── Next.js on Vercel ── Shopify Storefront API (catalog + cart)
   │
   │  "Proceed to Checkout" → server action returns cart.checkoutUrl
   └───► window.location.href → Shopify secure checkout (payment vault)
                 │
        Order created in Shopify
                 │
   Fulfillment app installed on the store (Tamacula Coffee Roasters)
   picks the order up automatically — no webhooks in this codebase
```

The storefront never handles payment or order data. Once Shopify checkout
completes, the order lands in the store's order pipeline where the
fulfillment partner's app subscribes to it directly. The only webhook this
repo exposes is `/api/revalidate`, which invalidates cached catalog data
when products/collections change in the admin.

## Getting started

```bash
cp .env.example .env.local   # fill in your values
pnpm install
pnpm dev
```

Required environment variables (`.env.local` — never commit tokens):

| Variable                          | Purpose                                 |
| --------------------------------- | --------------------------------------- |
| `SHOPIFY_STORE_DOMAIN`            | `your-store.myshopify.com`              |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API access token             |
| `SHOPIFY_REVALIDATION_SECRET`     | Shared secret for `/api/revalidate`     |
| `COMPANY_NAME` / `SITE_NAME`      | Brand strings (fallbacks are hardcoded) |

**No store yet?** Set `SHOPIFY_STORE_DOMAIN="mock.shop"` to run the UI
against Shopify's official mock Storefront API (catalog and cart work;
checkout handoff needs a real store).

## Shopify configuration checklist

1. **Headless / Hydrogen sales channel** — create a Storefront API token.
   Grant `unauthenticated_read_product_listings`, `..._read_product_inventory`
   (enables live stock badges), `..._read_product_tags`, `..._write_checkouts`
   and `..._write_customers` (cart).
2. **Grind profiles** — give each coffee a product option named **Grind**
   with values like `Whole Bean`, `Standard Drip`, `Coarse / Cold Brew`.
   The grid's quick-add chips key off that option; each chip adds the exact
   variant ID (which is what the fulfillment partner's backend maps to its
   SKU). Products with a second multi-value option fall back to a
   "Select Options" link.
3. **Variant SKUs** — keep them in sync with the fulfillment partner
   (Tamacula) catalog; they're displayed on the PDP and in the cart.
4. **Featured roster** — optional collection `hidden-homepage-featured-items`
   curates the homepage grid (falls back to best sellers). Collections
   prefixed `hidden-` never appear on the search page.
5. **Navigation** — menus `next-js-frontend-header-menu` and
   `next-js-frontend-footer-menu` drive the navbar/footer (sensible
   fallbacks render if they don't exist).
6. **Content revalidation webhooks** — point `products/*` and
   `collections/*` webhooks at
   `https://your-domain.com/api/revalidate?secret=<SHOPIFY_REVALIDATION_SECRET>`.
7. **Post-checkout return** — the Cart API has no per-request redirect
   parameter. Set the Headless channel's storefront URL (and on Plus, the
   checkout "order status" customization) to your production domain so
   post-purchase links return customers to `/success`, which also clears
   the spent cart cookie.

## Architecture map

| Path                  | What lives there                                                                                                                  |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `lib/shopify/`        | Storefront API client: typed queries/mutations/fragments, `'use cache'` + tag-based revalidation (the ISR layer), cart operations |
| `lib/constants.ts`    | API version (`/api/2026-07/graphql.json`), cache tags, sort keys                                                                  |
| `components/cart/`    | Optimistic cart context, server actions, native drawer, checkout handoff (`getCheckoutUrl` → `window.location.href`)              |
| `components/product/` | `ProductCard` (grind quick-add), variant selector, spec sheet, gallery                                                            |
| `components/home/`    | Landing sections: hero, marquee, metrics, featured roster, story                                                                  |
| `app/success/`        | Post-checkout landing; clears the stale cart cookie                                                                               |
| `app/api/revalidate/` | Shopify → cache invalidation webhook                                                                                              |

## Design system

Dark-only "field manual" theme defined in `app/globals.css` via Tailwind v4
`@theme` tokens: `night` (page), `coal` (panels), `seam` (hairlines),
`bone` (type), `field` (tactical green accent), `clay` (warnings/low
stock). Display type is Oswald (all-caps, tracked); spec labels use Geist
Mono; zero border radius throughout. No UI component libraries — native
primitives and Tailwind only.
