[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=SHOPIFY_STOREFRONT_ACCESS_TOKEN,SHOPIFY_STORE_DOMAIN,SITE_NAME,TWITTER_CREATOR,TWITTER_SITE)

# Next.js + BigCommerce

A Next.js 13 and App Router-ready headless storefront template for BigCommerce, featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- [React Server Components (RSCs)]() and [Suspense]()
- Route handlers for mutations
- Edge runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with [Tailwind CSS]()
- Automatic light/dark mode based on system settings

## Prerequisites

Next.js + BigCommerce requires a [BigCommerce sandbox or store provisioned to run a headless storefront]().

<!-- ++++ TODO: configuration directions from DevDocs quickstart -->

## Develop locally

<!-- +++ TODO: clarify that deploy button & auto repo creation is great and the way to go -->

To run Next.js + BigCommerce, use the environment variables [defined in .env.example](.env.example). The best practice is to use [Vercel environment variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: Do not commit your `.env` file. It exposes secrets that allow others to control your BigCommerce store.

1. Install the Vercel CLI:

```bash
npm i -g vercel
```

2. Link your local instance with the desired Vercel and GitHub accounts. This action creates a `.vercel` directory:

```bash
vercel link
```

3. Download the [Vercel environment variables](https://vercel.com/docs/concepts/projects/environment-variables):

```bash
vercel env pull
```

4. Install the app's default dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

The app runs on [localhost:3000](http://localhost:3000/).

## Configure checkout

- [Optimized One-Page Checkout]()
- [Stencil theme to customize checkout page]() and inform styling of shopper emails

## Get to know the BigCommerce GraphQL Storefront API

In addition to being compatible with BigCommerce's multi-storefront features, Next.js + BigCommerce uses the [GraphQL Storefront API](). This API makes it possible for merchants to control the representation of products and categories, carts, orders, customer segmentation, and more. To get a sense of what is possible to do directly on the storefront, check out the dedicated [GraphQL Playground]() for the sandbox.
<!-- ++++ TODO: directions on accessing the playground -->
## Explore BigCommerce features

BigCommerce's open SaaS feature set powers your store. Visit the BigCommerce developer documentation to learn more about your options for the following features:

Core store configuration:

- [Catalog management]()
- [Multi-Storefront and alternate channel sales]()
- [Buy Online, Pick up in Store](), also known as Click and Collect
- [Webhooks]()

Shopper journeys:

- [Faceted Search]()
- [Promotions]()
- [Customer Segmentation]()
- [Carts]()
- [Abandoned Carts]()
- [Checkout]()
- [Payments]()
- [Tax]()
- [Orders]()
- [Emails]()
- [Shipping]()

## Join our developer community

<!-- ++++ TODO add stuff per heather -->
