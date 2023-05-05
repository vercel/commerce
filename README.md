[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=SHOPIFY_STOREFRONT_ACCESS_TOKEN,SHOPIFY_STORE_DOMAIN,SITE_NAME,TWITTER_CREATOR,TWITTER_SITE)

_Todo: update deploy url_

# Next.js Commerce x Medusa

> Note: Looking for Next.js Commerce v1? View the [code](https://github.com/vercel/commerce/tree/v1), [demo](https://commerce-v1.vercel.store), and [release notes](https://github.com/vercel/commerce/releases/tag/v1)

A Next.js 13 and App Router-ready ecommerce template, built with [Medusa](https://github.com/medusajs/medusa), featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Route Handlers for mutations
- Edge runtime
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Automatic light/dark mode based on system settings

## What is Medusa?

Medusa is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any product that needs foundational commerce primitives. All modules are open-source and freely available on npm.

Learn more about [Medusa’s architecture](https://docs.medusajs.com/development/fundamentals/architecture-overview) and [commerce modules](https://docs.medusajs.com/modules/overview) in the Docs.

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

## How to configure your Medusa server for Next.js Commerce

Next.js Commerce x Medusa requires a running [Medusa](https://github.com/medusajs/medusa) server.

### Create a Medusa Backend[​](https://docs.medusajs.com/development/backend/install#create-a-medusa-backend 'Direct link to Create a Medusa Backend')

It is recommended to use [Yarn](https://yarnpkg.com/getting-started/install) for the installation process as it's much faster than using NPM.

#### 1. Install Medusa CLI[​](https://docs.medusajs.com/development/backend/install#1-install-medusa-cli 'Direct link to 1. Install Medusa CLI')

- npm
- Yarn

```
yarn global add @medusajs/medusa-cli
```

If you run into any errors while installing the CLI tool, check out the [troubleshooting guide](https://docs.medusajs.com/troubleshooting/cli-installation-errors).

#### 2. Create a new Medusa project[​](https://docs.medusajs.com/development/backend/install#2-create-a-new-medusa-project 'Direct link to 2. Create a new Medusa project')

```
medusa new my-medusa-store --seed
```

#### 3. Start your Medusa backend[​](https://docs.medusajs.com/development/backend/install#3-start-your-medusa-backend 'Direct link to 3. Start your Medusa backend')

```
cd my-medusa-store medusa develop
```

#### 4. Add Medusa backend domain to an environment variable

Create a `MEDUSA_BACKEND_API` environment variable in you Next.js Commerce project and use your Medusa backend domain as the the value (default: `http://localhost:9000`).
