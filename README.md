# Next.js Commerce & Shopware Composable Frontends

A Next.js 13 and App Router-ready ecommerce template featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Server Actions for mutations
- Edge Runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Automatic light/dark mode based on system settings

<h3 id="v1-note"></h3>

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1).

## Prerequisites

Next.js + Shopware requires a running [Shopware 6 Instance (Installation Guide)](https://developer.shopware.com/docs/guides/installation).

To get started, use this README and the example environment variable comments.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control your Shopware store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## How to configure your Shopware store for Next.js Commerce

You can find the `SHOPWARE_ACCESS_TOKEN` in the Admin at your SalesChannel configuration.

### Add Shopware domain to an environment variable

Copy `.env.example` file to `.env` and change the environment variables like descibed below.

Create a `SHOPWARE_STORE_DOMAIN` environment variable and use your Shopware domain as the the value (ie. `demo-frontends.shopware.store`).

> Note: Do not include the `https://`.

### Accessing the Shopware store API

Next.js Commerce utilizes [Shopware's store API](https://shopware.stoplight.io/docs/store-api/) to create unique customer experiences. The API offers a full range of commerce options making it possible for customers to control products, collections, menus, pages, cart, checkout, and more.

In order to use the Shopware's store API, you need at least one _(Storefront)_ SalesChannel _(for speaking URL's)_ in your Shopware instance.

Once installed, you'll need to create a `SHOPWARE_ACCESS_TOKEN` environment variable and use the public access token as the value

> Note: We using an [api Client package](https://www.npmjs.com/package/@shopware/api-client) that helps you with types, endpoints, params and returns.
