[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&env=SHOPIFY_STOREFRONT_ACCESS_TOKEN,SHOPIFY_STORE_DOMAIN,SHOPIFY_REVALIDATION_TOKEN)

# Next.js Commerce

> Note: Looking for Next.js Commerce v1? [View the release notes](https://github.com/vercel/commerce/releases/tag/v1).

A Next.js 13 and App Router-ready ecommerce template, built with Shopify, featuring:

- Next.js App Router
- Optimized for SEO using Next.js's Metadata
- React Server Components (RSCs) and Suspense
- Route Handlers for mutations
- Edge functions
- New fetching and caching paradigms
- Dynamic OG images
- Styling with Tailwind CSS
- Checkout and payments with Shopify
- Automatic light/dark mode based on system settings

**_We will be shortly updating the demo at [demo.vercel.store](https://demo.vercel.store/) with this new version._**

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

## How to configure your Shopify store for Next.js Commerce

### Add Shopify domain to an environment variable

Create a `SHOPIFY_STORE_DOMAIN` environment variable and use your Shopify domain as the the value (ie. `acme-store.myshopify.com`).

> Note: Do not include the `https://`.

### Accessing the Shopify Storefront API

Next.js Commerce utilizes [Shopify's Storefront API](https://shopify.dev/docs/api/storefront) to create unique customer experiences. The API offers a full range of commerce options making it possible for customers to control products, collections, menus, pages, cart, checkout, and more.

In order to use the Shopify's Storefront API, you need to install the [Headless app](https://apps.shopify.com/headless) in your Shopify store.

Once installed, you'll need to create a `SHOPIFY_STOREFRONT_ACCESS_TOKEN` environment variable and use the public access token as the value

> Note: Shopify does offer a Node.js Storefront API SDK. We use the Storefront API via GraphQL directly instead of the Node.js SDK so we have more control over fetching and caching.

<details>
  <summary>View detailed visual walkthrough</summary>

1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/settings/apps`.
1. Click the green `Shopify App Store` button.
   ![Shopify App Store](.github/assets/install-headless-app-01.jpg)
1. Search for `Headless` and click on the `Headless` app.
   ![Headless](.github/assets/install-headless-app-02.jpg)
1. Click the black `Add app` button.
   ![Add app](.github/assets/install-headless-app-03.jpg)
1. Click the green `Add sales channel` button.
   ![Add sales channel](.github/assets/install-headless-app-04.jpg)
1. Click the green `Create storefront` button.
   ![Create storefront](.github/assets/install-headless-app-05.jpg)
1. Copy and paste the public access token and assign it to a `SHOPIFY_STOREFRONT_ACCESS_TOKEN` environment variable.
   ![Pubic access token](.github/assets/install-headless-app-06.jpg)
1. If you ever need to reference the public access token again, you can navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/headless_storefronts`.
</details>

### Install a headless theme

When using a headless Shopify setup, you normally don't want customers to access any of the theme pages except for checkout. However, you can't totally disable the theme and a lot of links will still point to the theme (e.g. links in emails, order details, plugins, checkout, etc.).

To enable a seamless flow between your headless site and Shopify, you can install the [Shopify Headless Theme](https://github.com/instantcommerce/shopify-headless-theme).

Follow the installation instructions and configure the theme with your headless site's values.

<details>
  <summary>View detailed visual walkthrough</summary>

1. Download [Shopify Headless Theme](https://github.com/instantcommerce/shopify-headless-theme).
   ![Download Shoify Headless Theme](.github/assets/install-headless-theme-01.jpg)
1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/themes`.
1. Click `Add theme`, then `Upload zip file`.
   ![Upload zip file](.github/assets/install-headless-theme-02.jpg)
1. Select the downloaded zip file from above, and click the green `Upload file` button.
   ![Select and upload file](.github/assets/install-headless-theme-03.jpg)
1. Click `Customize`.
   ![Customize theme](.github/assets/install-headless-theme-04.jpg)
1. Click `Theme settings` (ie. the paintbrush icon), expand the `STOREFRONT` section, enter your headless store domain, click the gray `Publish` button.
   ![Set headless domain in theme settings](.github/assets/install-headless-theme-05.jpg)
1. Confirm the theme change by clicking the green `Save and publish` button.
   ![Confirm save and publish](.github/assets/install-headless-theme-06.jpg)
1. The headless theme should now be your current active theme.
![Headless theme is current and active](.github/assets/install-headless-theme-07.jpg)
</details>

### Branding & Design

Since you're creating a headless Shopify store, you'll be in full control of your brand and design. However, there are still a few aspects we're leaving within Shopify's control.

- Checkout
- Emails
- Order status
- Order history
- Favicon (for any Shopify controlled pages)

You can use Shopify's admin to customize these pages to match your brand and design.

<details>
  <summary>View detailed visual walkthrough</summary>

#### Checkout, order status, and order history

1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/settings/checkout`.
1. Click the green `Customize` button.
   ![Customize](.github/assets/branding-01.jpg)
1. Click `Branding` (ie. the paintbrush icon) and customize your brand. Please note, there are three steps / pages to the checkout flow. Use the dropdown to change pages and adjust branding as needed on each page. Click `Save` when you are done.
   ![Branding](.github/assets/branding-02.jpg)
1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/settings/branding`.
1. Customize settings to match your brand.
   ![Branding](.github/assets/branding-03.jpg)

#### Emails

1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/settings/email_settings`.
1. Customize settings to match your brand.
   ![Branding](.github/assets/branding-04.jpg)

#### Favicon

1. Navigate to `https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/themes`.
1. Click the green `Customize` button.
   ![Customize theme](.github/assets/branding-05.jpg)
1. Click `Theme settings` (ie. the paintbrush icon), expand the `FAVICON` section, upload favicon, then click the `Save` button.
   ![Favicon](.github/assets/branding-06.jpg)

</details>

### Configure webhooks for on-demand incremental static regeneration (ISR)

Coming soon.

### Using Shopify as a CMS

Next.js Commerce is fully powered by Shopify in a truly headless and data driven way.

#### Products

`https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/products`

Only `Active` products are shown. `Draft` products will not be shown until they are marked as `Active`.

`Active` products can still be hidden and not seen by navigating the site, by adding a `nextjs-frontend-hidden` tag on the product. This tag will also tell search engines to not index or crawl the product. The product is still directly accessible via url. This feature is great for "secret" products you only want to people you share the url with.

Product options and option combinations are driven from Shopify options and variants. When selecting options on the product detail page, other option and variant combinations will be visually validated and verified for availability, like Amazon does.

Products that are active and "out of stock" are still shown on the site, but the ability to add the product to the cart is disabled.

### Collections

`https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/collections`

Create whatever collections you want and configure them however you want. All available collections will show on the search page as filters on the left, with one exception...

Any collection names that start with the word "hidden" will not show up on the headless front end. The Next.js Commerce theme comes pre-configured to look for two hidden collections. Collections were chosen for this over tags so that order of products could be controlled (collections allow for manual ordering).

Create the following collections:

- `Hidden: Homepage Featured Items` -- Products in this collection are displayed in the three featured blocks on the homepage.
- `Hidden: Homepage Carousel` -- Products in this collection are displayed in the auto-scrolling carousel section on the homepage.

![Shopify collections](.github/assets/collections-01.jpg)

![Shopify collection detail](.github/assets/collections-02.jpg)

### Pages

`https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/pages`

Next.js Commerce contains a dynamic `[page]` route. It will use the value to look for a corresponding page in Shopify. If a page is found, it will display its rich content using Tailwind's prose. If a page is not found, a 404 page is displayed.

![Shopify pages](.github/assets/pages-01.jpg)

![Shopify page detail](.github/assets/pages-02.jpg)

### Navigation menus

`https://YOUR_SHOPIFY_SUBDOMAIN.myshopify.com/admin/menus`

Next.js Commerce's header and footer navigation is pre-configured to be controlled by Shopify navigation menus. This means you have full control over what links go here. They can be to collections, pages, external links, and more.

Create the following navigation menus:

- `Next.js Frontend Header Menu` -- Menu items to be shown in the headless frontend header.
- `Next.js Frontend Footer Menu` -- Menu items to be shown in the headless frontend footer.

![Shopify navigation menus](.github/assets/navigation-menus-01.jpg)

![Shopify navigation menu detail](.github/assets/navigation-menus-02.jpg)

## SEO

Shopify's products, collections, pages, etc. allow you to create custom SEO titles and descriptions. Next.js Commerce is pre-configured to display these custom values, but also comes with sensible default fallbacks if they are not provided.

![Shopify SEO](.github/assets/seo.jpg)
