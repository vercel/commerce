[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmedusajs%2Fcommerce&env=MEDUSA_API_KEY,SITE_NAME,NEXT_PUBLIC_MEDUSA_BACKEND_API,NEXT_PUBLIC_VERCEL_URL,TWITTER_SITE,TWITTER_CREATOR&project-name=medusa-nextjs-commerce&repository-name=medusa-nextjs-commerce&redirect-url=https%3A%2F%2Fdocs.medusajs.com%2F%3Futm_source%3Dvercel%26utm_medium%3Ddeploy%2Bbutton%26utm_campaign%3Dcommerce&demo-title=Next.js%20Commerce%20by%20Medusa&demo-description=A%20Next.js%2013%20and%20ecommerce%20template%2C%20built%20with%20Medusa.&demo-url=https%3A%2F%2Fmedusa-nextjs-commerce.vercel.app%2F&demo-image=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F62591822%3Fs%3D200%26v%3D4)

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

[Medusa](https://medusajs.com/) is a set of commerce modules and tools that allow you to build rich, reliable, and performant commerce applications without reinventing core commerce logic. The modules can be customized and used to build advanced ecommerce stores, marketplaces, or any system that needs foundational commerce primitives. All modules are open-source and freely available on NPM.

Learn more about [Medusa’s architecture](https://docs.medusajs.com/development/fundamentals/architecture-overview) and [commerce modules](https://docs.medusajs.com/modules/overview) in Medusa's documentation.

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended to use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets.

1\. Install Vercel CLI:

```bash
npm i -g vercel
```

2\. Link local instance with Vercel and GitHub accounts (which creates a `.vercel` directory):

```bash
vercel link
```

3\. Download your environment variables:

```bash
vercel env pull
```

4\. Install dependencies and run your app:

```bash
npm install
npm run dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## How to configure your Medusa backend for Next.js Commerce

Next.js Commerce x Medusa requires a running [Medusa](https://github.com/medusajs/medusa) backend.

Please refer to [this guide in the Medusa documentation](https://docs.medusajs.com/development/backend/install) to learn how to create a Medusa backend.
