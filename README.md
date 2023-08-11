# Next.js Commerce with Shopware

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

## Prerequisites

Next.js Commerce with Shopware requires a running [Shopware 6 Instance (Installation Guide)](https://developer.shopware.com/docs/guides/installation).

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

#### Activate SEO URLs for your Store

If you want to use your Store with SEO URLs you should set this Envoirment variable
`SHOPWARE_USE_SEO_URLS="true"`

## Checkout functionality

The template is provided as-is without an integrated checkout. For projects there are two options - redirect to a native checkout, provided by Shopware or implement a headless checkout flow using our API endpoints for [preparing](https://frontends.shopware.com/packages/api-client.html#context) and [placing](https://frontends.shopware.com/packages/api-client.html#checkout) orders.

## Community

Any questions, issues or feature requests? Feel free to join the community.

<p align="left">
<a href="https://shopwarecommunity.slack.com/archives/C050L6NCMGQ" target="_blank"><span style="position:relative; top:12px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24pt" height="28pt" viewBox="0 0 30 34" version="1.1"><g id="surface1"><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 18.46875 26.054688 C 18.316406 26.332031 18.027344 26.511719 17.679688 26.511719 C 17.183594 26.511719 16.78125 26.113281 16.78125 25.613281 C 16.78125 25.117188 17.183594 24.714844 17.679688 24.714844 C 18.011719 24.714844 18.304688 24.894531 18.46875 25.171875 L 19.324219 24.703125 C 19.007812 24.121094 18.386719 23.734375 17.679688 23.734375 C 16.644531 23.734375 15.800781 24.578125 15.800781 25.613281 C 15.800781 26.648438 16.644531 27.492188 17.679688 27.492188 C 18.386719 27.492188 19.007812 27.105469 19.324219 26.527344 Z M 18.46875 26.054688 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 6.527344 27.035156 L 6.832031 26.320312 C 7.179688 26.566406 7.605469 26.707031 8.050781 26.707031 C 8.367188 26.707031 8.574219 26.582031 8.574219 26.386719 C 8.558594 25.863281 6.625 26.261719 6.613281 24.9375 C 6.597656 24.261719 7.207031 23.734375 8.0625 23.734375 C 8.574219 23.734375 9.085938 23.859375 9.445312 24.148438 L 9.15625 24.882812 C 8.824219 24.675781 8.410156 24.523438 8.019531 24.523438 C 7.757812 24.523438 7.578125 24.648438 7.578125 24.8125 C 7.59375 25.335938 9.542969 25.046875 9.570312 26.320312 C 9.570312 27.007812 8.976562 27.492188 8.144531 27.492188 C 7.523438 27.492188 6.957031 27.355469 6.527344 27.035156 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 10.011719 22.175781 L 11.089844 22.175781 L 11.089844 27.421875 L 10.011719 27.421875 Z M 10.011719 22.175781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 19.753906 22.175781 L 19.753906 27.421875 L 20.832031 27.421875 L 20.832031 25.847656 L 22.101562 27.421875 L 23.472656 27.421875 L 21.855469 25.558594 L 23.359375 23.804688 L 22.046875 23.804688 L 20.832031 25.253906 L 20.832031 22.175781 Z M 19.753906 22.175781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 14.269531 26.070312 C 14.117188 26.332031 13.785156 26.527344 13.425781 26.527344 C 12.925781 26.527344 12.527344 26.125 12.527344 25.628906 C 12.527344 25.128906 12.925781 24.730469 13.425781 24.730469 C 13.785156 24.730469 14.117188 24.921875 14.269531 25.199219 Z M 14.269531 23.804688 L 14.269531 24.234375 C 14.089844 23.941406 13.660156 23.734375 13.203125 23.734375 C 12.265625 23.734375 11.515625 24.5625 11.515625 25.613281 C 11.515625 26.664062 12.265625 27.492188 13.203125 27.492188 C 13.660156 27.492188 14.089844 27.285156 14.269531 26.996094 L 14.269531 27.421875 L 15.34375 27.421875 L 15.34375 23.804688 Z M 14.269531 23.804688 "/>
<path style=" stroke:none;fill-rule:nonzero;fill:rgb(87.843137%,11.764706%,35.294118%);fill-opacity:1;" d="M 11.035156 15.15625 C 11.035156 15.957031 10.382812 16.605469 9.582031 16.605469 C 8.78125 16.605469 8.132812 15.957031 8.132812 15.15625 C 8.132812 14.355469 8.78125 13.703125 9.582031 13.703125 L 11.035156 13.703125 Z M 11.035156 15.15625 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(87.843137%,11.764706%,35.294118%);fill-opacity:1;" d="M 11.753906 15.15625 C 11.753906 14.355469 12.402344 13.703125 13.203125 13.703125 C 14.003906 13.703125 14.65625 14.355469 14.65625 15.15625 L 14.65625 18.761719 C 14.65625 19.5625 14.003906 20.210938 13.203125 20.210938 C 12.402344 20.210938 11.753906 19.5625 11.753906 18.761719 Z M 11.753906 15.15625 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(21.176471%,77.254902%,94.117647%);fill-opacity:1;" d="M 13.191406 9.378906 C 12.386719 9.378906 11.738281 8.730469 11.738281 7.929688 C 11.738281 7.128906 12.402344 6.492188 13.191406 6.492188 C 13.976562 6.492188 14.640625 7.144531 14.640625 7.945312 L 14.640625 9.394531 L 13.191406 9.394531 Z M 13.191406 9.378906 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(21.176471%,77.254902%,94.117647%);fill-opacity:1;" d="M 13.191406 10.113281 C 13.992188 10.113281 14.640625 10.761719 14.640625 11.5625 C 14.640625 12.363281 13.992188 13.015625 13.191406 13.015625 L 9.582031 13.015625 C 8.78125 13.015625 8.132812 12.363281 8.132812 11.5625 C 8.132812 10.761719 8.78125 10.113281 9.582031 10.113281 Z M 13.191406 10.113281 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(18.039216%,71.372549%,49.019608%);fill-opacity:1;" d="M 18.964844 11.550781 C 18.964844 10.75 19.617188 10.097656 20.417969 10.097656 C 21.21875 10.097656 21.867188 10.75 21.867188 11.550781 C 21.867188 12.351562 21.21875 13 20.417969 13 L 18.964844 13 Z M 18.964844 11.550781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(18.039216%,71.372549%,49.019608%);fill-opacity:1;" d="M 18.246094 11.550781 C 18.246094 12.351562 17.597656 13 16.796875 13 C 15.996094 13 15.359375 12.351562 15.359375 11.550781 L 15.359375 7.945312 C 15.359375 7.144531 16.007812 6.492188 16.808594 6.492188 C 17.613281 6.492188 18.261719 7.144531 18.261719 7.945312 L 18.261719 11.550781 Z M 18.246094 11.550781 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.54902%,69.803922%,18.039216%);fill-opacity:1;" d="M 16.808594 17.324219 C 17.613281 17.324219 18.261719 17.972656 18.261719 18.773438 C 18.261719 19.578125 17.613281 20.226562 16.808594 20.226562 C 16.007812 20.226562 15.359375 19.578125 15.359375 18.773438 L 15.359375 17.324219 Z M 16.808594 17.324219 "/><path style=" stroke:none;fill-rule:nonzero;fill:rgb(92.54902%,69.803922%,18.039216%);fill-opacity:1;" d="M 16.808594 16.605469 C 16.007812 16.605469 15.359375 15.957031 15.359375 15.15625 C 15.359375 14.355469 16.007812 13.703125 16.808594 13.703125 L 20.417969 13.703125 C 21.21875 13.703125 21.867188 14.355469 21.867188 15.15625 C 21.867188 15.957031 21.21875 16.605469 20.417969 16.605469 Z M 16.808594 16.605469 "/></g></svg></span>Channel</a> | <a href="https://github.com/shopware/frontends/discussions">💬 Discuss</a> | <a href="https://frontends.shopware.com/" target="_blank">📚 Docu</a> | <a href="https://shopware-vercel-commerce-react.vercel.app/" target="_blank">🚀 Demo</a>
</p>
