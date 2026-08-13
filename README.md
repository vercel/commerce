[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&products=%255B%257B%2522type%2522%253A%2522integration%2522%252C%2522protocol%2522%253A%2522other%2522%252C%2522productSlug%2522%253A%2522shopify%2522%252C%2522integrationSlug%2522%253A%2522shopify%2522%257D%255D&env=COMPANY_NAME,SITE_NAME)

# Next.js Commerce

A high-performance, server-rendered Next.js App Router ecommerce application.

This template uses React Server Components, Server Actions, `Suspense`, `useOptimistic`, and more.

<h3 id="v1-note"></h3>

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Providers

Vercel will only be actively maintaining a Shopify version [as outlined in our vision and strategy for Next.js Commerce](https://github.com/vercel/commerce/pull/966).

Vercel is happy to partner and work with any commerce provider to help them get a similar template up and running and listed below. Alternative providers should be able to fork this repository and swap out the `lib/shopify` file with their own implementation while leaving the rest of the template mostly unchanged.

- Shopify (this repository)
- [BigCommerce](https://github.com/bigcommerce/nextjs-commerce) ([Demo](https://next-commerce-v2.vercel.app/))
- [Ecwid by Lightspeed](https://github.com/Ecwid/ecwid-nextjs-commerce/) ([Demo](https://ecwid-nextjs-commerce.vercel.app/))
- [Geins](https://github.com/geins-io/vercel-nextjs-commerce) ([Demo](https://geins-nextjs-commerce-starter.vercel.app/))
- [Medusa](https://github.com/medusajs/vercel-commerce) ([Demo](https://medusa-nextjs-commerce.vercel.app/))
- [Prodigy Commerce](https://github.com/prodigycommerce/nextjs-commerce) ([Demo](https://prodigy-nextjs-commerce.vercel.app/))
- [Saleor](https://github.com/saleor/nextjs-commerce) ([Demo](https://saleor-commerce.vercel.app/))
- [Shopware](https://github.com/shopwareLabs/vercel-commerce) ([Demo](https://shopware-vercel-commerce-react.vercel.app/))
- [Swell](https://github.com/swellstores/verswell-commerce) ([Demo](https://verswell-commerce.vercel.app/))
- [Umbraco](https://github.com/umbraco/Umbraco.VercelCommerce.Demo) ([Demo](https://vercel-commerce-demo.umbraco.com/))
- [Wix](https://github.com/wix/headless-templates/tree/main/nextjs/commerce) ([Demo](https://wix-nextjs-commerce.vercel.app/))
- [Fourthwall](https://github.com/FourthwallHQ/vercel-commerce) ([Demo](https://vercel-storefront.fourthwall.app/))

> Note: Providers, if you are looking to use similar products for your demo, you can [download these assets](https://drive.google.com/file/d/1q_bKerjrwZgHwCw0ovfUMW6He9VtepO_/view?usp=sharing).

## Integrations

Integrations enable upgraded or additional functionality for Next.js Commerce

- [Orama](https://github.com/oramasearch/nextjs-commerce) ([Demo](https://vercel-commerce.oramasearch.com/))

  - Upgrades search to include typeahead with dynamic re-rendering, vector-based similarity search, and JS-based configuration.
  - Search runs entirely in the browser for smaller catalogs or on a CDN for larger.

- [React Bricks](https://github.com/ReactBricks/nextjs-commerce-rb) ([Demo](https://nextjs-commerce.reactbricks.com/))
  - Edit pages, product details, and footer content visually using [React Bricks](https://www.reactbricks.com) visual headless CMS.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopify store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

<details>
  <summary>Expand if you work at Vercel and want to run locally and / or contribute</summary>

1. Run `vc link`.
1. Select the `Vercel Solutions` scope.
1. Connect to the existing `commerce-shopify` project.
1. Run `vc env pull` to get environment variables.
1. Run `pnpm dev` to ensure everything is working correctly.
</details>

## WebMCP tools for AI agents

[WebMCP](https://github.com/webmachinelearning/webmcp) is a proposed browser API that lets a page hand AI agents a set of typed tools, so an agent can call `shop.search_products` instead of guessing at the DOM. This storefront registers four:

| Tool                       | What it does                             |
| -------------------------- | ---------------------------------------- |
| `shop.search_products`     | Search the catalog                       |
| `shop.get_product_options` | List a product's option names and values |
| `shop.get_cart`            | Read what is in the cart                 |
| `shop.add_to_cart`         | Add one variant to the cart              |

Two files: `components/webmcp-tools.tsx` registers the tools with [`use-webmcp-tool`](https://github.com/GoogleChromeLabs/use-webmcp-tool), Chrome's React hook for `document.modelContext`, and `lib/webmcp/actions.ts` implements them as server actions on top of the existing `lib/shopify` functions. Browsers without WebMCP are unaffected — the hook feature-detects and does nothing.

### Try it locally

1. Open `chrome://flags/#enable-webmcp-testing`, enable **WebMCP for testing**, and relaunch Chrome.
2. Install the [Model Context Tool Inspector](https://github.com/beaufortfrancois/model-context-tool-inspector) extension.
3. Run `pnpm dev`, open the storefront, and use the inspector's side panel to list the tools and call them by hand.

The inspector is a development tool, not a security boundary. Only use it on pages you trust.

### Add your own tool

Write a server action that returns a plain object, then register it. That is the whole pattern:

```tsx
// lib/webmcp/actions.ts
export async function getShippingPolicy() {
  return { policy: "Free shipping over $50, delivered in 3-5 business days." };
}

// components/webmcp-tools.tsx
useWebMCP({
  name: "shop.get_shipping_policy",
  description: "Explain this store's shipping cost and delivery time.",
  annotations: { readOnlyHint: true, untrustedContentHint: true },
  execute: getShippingPolicy,
  formatOutput: reportErrors,
});
```

Two habits worth copying. Validate arguments inside the action — the `inputSchema` tells the agent what to send, but it cannot stop a confused or hostile one sending something else, which is why `shop.add_to_cart` re-derives the variant from the product instead of accepting a variant id. And return failures as `{ error: "..." }` so `reportErrors` can mark them as real MCP errors; otherwise the agent reads a failure as success.

### Enabling it on a deployment

The flag above only affects your own browser. For real visitors, WebMCP runs as a Chrome origin trial **through Chrome 156**, and the deployed origin needs its own token:

1. Register the exact origin at [developer.chrome.com/origintrials](https://developer.chrome.com/origintrials).
2. Set the token as `WEBMCP_ORIGIN_TRIAL_TOKEN`.

`app/layout.tsx` emits `<meta http-equiv="origin-trial">` only when that variable is set, so leaving it unset is a clean no-op. Tokens are origin-bound and expire, so a token for one deployment does nothing on preview URLs or forks.

> **Not yet enrolled.** No origin-trial token is registered for `demo.vercel.store`, so these tools currently register only in a browser with the testing flag on.

## Vercel, Next.js Commerce, and Shopify Integration Guide

You can use this comprehensive [integration guide](https://vercel.com/docs/integrations/ecommerce/shopify) with step-by-step instructions on how to configure Shopify as a headless CMS using Next.js Commerce as your headless Shopify storefront on Vercel.
