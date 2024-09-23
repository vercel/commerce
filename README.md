# Next.js x Fourthwall

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=COMPANY_NAME,SHOPIFY_REVALIDATION_SECRET,SHOPIFY_STORE_DOMAIN,SHOPIFY_STOREFRONT_ACCESS_TOKEN,SITE_NAME,TWITTER_CREATOR,TWITTER_SITE)

A high-perfomance, server-rendered Next.js App Router ecommerce application.

## Create a store, get a storefront token

A storefront token is a public access token that allows you to pull product data from your Fourthwall store. To get a storefront token:

1. [Set up a store](https://fourthwall.com/get-started) on Fourthwall.

2. [Make some products](https://my-shop.fourthwall.com/admin/dashboard/products/all/) and [set up a collection](https://my-shop.fourthwall.com/admin/dashboard/products/collections/).

3. (optional) [Style your store](https://my-shop.fourthwall.com/admin/dashboard/store-design/layout/index/) for the [checkout flow](https://docs.fourthwall.com/storefront/checkout).

4. After you have signed up, [get a storefront token](https://my-shop.fourthwall.com/admin/dashboard/settings/for-developers).

5. Fill out the environment variables below in .env.local.

```bash
NEXT_PUBLIC_FW_API_URL="https://api.fourthwall.com"

NEXT_PUBLIC_FW_COLLECTION="<the handle of your collection>" # Example: launch. This is available at the details page for the collection. See below for more details.
NEXT_PUBLIC_FW_STOREFRONT_TOKEN="<your storefront token>" # Example: ptkn_...
NEXT_PUBLIC_FW_CHECKOUT="<your store url>" # Example: vercel-shop.fourthwall.com. Used for checkout

NEXT_PUBLIC_VERCEL_URL="<the url of your vercel site>" # Example: fw-commerce.vercel.app. This is used for sitemap.xml + robots.txt.
```

## Develop locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js Commerce. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables) for this, but a `.env.local` file is all that is necessary.

> Note: You should not commit your `.env.local` file or it will expose secrets that will allow others to use your Fourthwall store.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app should now be running on [localhost:3000](http://localhost:3000/).

## Deploying

```bash
vercel # Initializes the project
vercel env add NEXT_PUBLIC_FW_API_URL # Will prompt you for the value
vercel env add NEXT_PUBLIC_FW_COLLECTION
vercel env add NEXT_PUBLIC_FW_STOREFRONT_TOKEN
vercel env add NEXT_PUBLIC_FW_CHECKOUT
vercel env add NEXT_PUBLIC_VERCEL_URL

vercel --prod # Deploys to production
```

## Resources

* Visit the API docs [here](https://docs.fourthwall.com/storefront).

* How to get your [collection handle](https://docs.fourthwall.com/storefront/collection).
