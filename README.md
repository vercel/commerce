[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=SHOPIFY_STOREFRONT_ACCESS_TOKEN,SHOPIFY_STORE_DOMAIN,SHOPIFY_REVALIDATION_TOKEN)

# Next.js Commerce

Next.js 13 and App Router-ready ecommerce template, built with Shopify and Tailwind CSS.

We will be shortly updating the demo at [demo.vercel.store](https://demo.vercel.store/) with this new version.

Looking for Next.js Commerce v1? [View the release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Features

- Next.js App Router
- Optimized for SEO
- Styling with Tailwind CSS
- Checkout/Cart with Shopify
- Themeing with System (Light/Dark Mode) Support

## Running Locally

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and Github accounts (creates .vercel file): `vercel link`
3. Download your environment variables: `vercel env pull .env.local`


```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).
