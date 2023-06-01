[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?demo-title=Next.js%20Commerce&demo-description=An%20all-in-one%20starter%20kit%20for%20high-performance%20e-commerce%20sites.&demo-url=https%3A%2F%2Fdemo.vercel.store%2F&demo-image=%2F%2Fimages.ctfassets.net%2Fe5382hct74si%2F1RzhtOHEvW7xyn9qAsdr5E%2F783c7bbd498d0f3b752637d2efa0bb6e%2FNew_Project__5_.png&project-name=Next.js%20Commerce&repository-name=nextjs-commerce&repository-url=https://github.com/bigcommerce/nextjs-commerce/tree/vercel-init&from=templates&env=BIGCOMMERCE_ACCESS_TOKEN%2CBIGCOMMERCE_CHANNEL_ID%2CBIGCOMMERCE_STORE_HASH%2CBIGCOMMERCE_CANONICAL_STORE_DOMAIN%2CBIGCOMMERCE_API_URL%2CBIGCOMMERCE_CDN_HOSTNAME&envDescription=These%20values%20allow%20you%20to%20connect%20to%20your%20headless%20BigCommmerce%20store.&teamCreateStatus=hidden)

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
