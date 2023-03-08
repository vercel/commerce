[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel%2Fcommerce&project-name=commerce&repo-name=commerce&demo-title=Next.js%20Commerce&demo-description=An%20all-in-one%20starter%20kit%20for%20high-performance%20e-commerce%20sites.&demo-url=https%3A%2F%2Fdemo.vercel.store&demo-image=https%3A%2F%2Fbigcommerce-demo-asset-ksvtgfvnd.vercel.app%2Fbigcommerce.png&integration-ids=oac_MuWZiE4jtmQ2ejZQaQ7ncuDT,oac_9HSKtXld74NG0srzdxSiBGty&skippable-integrations=1&root-directory=site&build-command=cd%20..%20%26%26%20yarn%20build)

# Next.js Commerce

The all-in-one starter kit for high-performance e-commerce sites. With a few clicks, Next.js developers can clone, deploy and fully customize their own store.
Start right now at [nextjs.org/commerce](https://nextjs.org/commerce)

Demo live at: [demo.vercel.store](https://demo.vercel.store/)

- Shopify Demo: https://shopify.vercel.store/
- Swell Demo: https://swell.vercel.store/
- BigCommerce Demo: https://bigcommerce.vercel.store/
- Vendure Demo: https://vendure.vercel.store
- Saleor Demo: https://saleor.vercel.store/
- Ordercloud Demo: https://ordercloud.vercel.store/
- Spree Demo: https://spree.vercel.store/
- Kibo Commerce Demo: https://kibocommerce.vercel.store/
- Commerce.js Demo: https://commercejs.vercel.store/
- SalesForce Cloud Commerce Demo: https://salesforce-cloud-commerce.vercel.store/

## Run minimal version locally

> To run a minimal version of Next.js Commerce you can start with the default local provider `@vercel/commerce-local` that has all features disabled (cart, auth) and uses static files for the backend

```bash
pnpm install & pnpm build # run these commands in the root folder of the mono repo
pnpm dev # run this command in the site folder
```

> If you encounter any problems while installing and running for the first time, please see the Troubleshoot section

## Features

- Performant by default
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming
- Standardized Data Hooks
- Integrations - Integrate seamlessly with the most common ecommerce platforms.
- Dark Mode Support

## Integrations

Next.js Commerce integrates out-of-the-box with BigCommerce, Shopify, Swell, Saleor, Vendure, Spree and Commerce.js. We plan to support all major ecommerce backends.

## Considerations

- `packages/commerce` contains all types, helpers and functions to be used as a base to build a new **provider**.
- **Providers** live under `packages`'s root folder and they will extend Next.js Commerce types and functionality (`packages/commerce`).
- We have a **Features API** to ensure feature parity between the UI and the Provider. The UI should update accordingly and no extra code should be bundled. All extra configuration for features will live under `features` in `commerce.config.json` and if needed it can also be accessed programmatically.
- Each **provider** should add its corresponding `next.config.js` and `commerce.config.json` adding specific data related to the provider. For example in the case of BigCommerce, the images CDN and additional API routes.

## Configuration

### How to change providers

Open `site/.env.local` and change the value of `COMMERCE_PROVIDER` to the provider you would like to use, then set the environment variables for that provider (use `site/.env.template` as the base).

The setup for Shopify would look like this for example:

```
COMMERCE_PROVIDER=@vercel/commerce-shopify
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=xxxxxxx.myshopify.com
```

### Features

Every provider defines the features that it supports under `packages/{provider}/src/commerce.config.json`

#### Features Available

The following features can be enabled or disabled. This means that the UI will remove all code related to the feature.
For example: turning `cart` off will disable Cart capabilities.

- cart
- search
- wishlist
- customerAuth
- customCheckout

#### How to turn Features on and off

> NOTE: The selected provider should support the feature that you are toggling. (This means that you can't turn wishlist on if the provider doesn't support this functionality out of the box)

- Open `site/commerce.config.json`
- You'll see a config file like this:
  ```json
  {
    "features": {
      "wishlist": false,
      "customCheckout": true
    }
  }
  ```
- Turn `wishlist` on by setting `wishlist` to `true`.
- Run the app and the wishlist functionality should be back on.

### How to create a new provider

Follow our docs for [Adding a new Commerce Provider](packages/commerce/new-provider.md).

If you succeeded building a provider, submit a PR with a valid demo and we'll review it asap.

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device.
2. Create a new branch `git checkout -b MY_BRANCH_NAME`
3. Install the dependencies: `pnpm install`
4. Build the packages: `pnpm build`
5. Duplicate `site/.env.template` and rename it to `site/.env.local`
6. Add proper store values to `site/.env.local`
7. Run `cd site` & `pnpm dev` to watch for code changes
8. Run `pnpm turbo run build` to check the build after your changes

## Work in progress

We're using Github Projects to keep track of issues in progress and todo's. Here is our [Board](https://github.com/vercel/commerce/projects/1)

People actively working on this project: @okbel, @lfades, @dominiksipowicz, @gbibeaul.

## Troubleshoot

<details>
<summary>I already own a BigCommerce store. What should I do?</summary>
<br>
First thing you do is: <b>set your environment variables</b>
<br>
<br>
.env.local

```sh
BIGCOMMERCE_STOREFRONT_API_URL=<>
BIGCOMMERCE_STOREFRONT_API_TOKEN=<>
BIGCOMMERCE_STORE_API_URL=<>
BIGCOMMERCE_STORE_API_TOKEN=<>
BIGCOMMERCE_STORE_API_CLIENT_ID=<>
BIGCOMMERCE_CHANNEL_ID=<>
```

If your project was started with a "Deploy with Vercel" button, you can use Vercel's CLI to retrieve these credentials.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and Github accounts (creates .vercel file): `vercel link`
3. Download your environment variables: `vercel env pull .env.local`

Next, you're free to customize the starter. More updates coming soon. Stay tuned..

</details>

<details>
<summary>BigCommerce shows a Coming Soon page and requests a Preview Code</summary>
<br>
After Email confirmation, Checkout should be manually enabled through BigCommerce platform. Look for "Review & test your store" section through BigCommerce's dashboard.
<br>
<br>
BigCommerce team has been notified and they plan to add more details about this subject.
</details>

<details>
<summary>When run locally I get `Error: Cannot find module '...@vercel/commerce/dist/config'`</summary>

```bash
commerce/site
❯ yarn dev
yarn run v1.22.17
$ next dev
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from /commerce/site/.env.local
error - Failed to load next.config.js, see more info here https://nextjs.org/docs/messages/next-config-error
Error: Cannot find module '/Users/dom/work/vercel/commerce/node_modules/@vercel/commerce/dist/config.cjs'
    at createEsmNotFoundErr (node:internal/modules/cjs/loader:960:15)
    at finalizeEsmResolution (node:internal/modules/cjs/loader:953:15)
    at resolveExports (node:internal/modules/cjs/loader:482:14)
    at Function.Module._findPath (node:internal/modules/cjs/loader:522:31)
    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:919:27)
    at Function.mod._resolveFilename (/Users/dom/work/vercel/commerce/node_modules/next/dist/build/webpack/require-hook.js:179:28)
    at Function.Module._load (node:internal/modules/cjs/loader:778:27)
    at Module.require (node:internal/modules/cjs/loader:1005:19)
    at require (node:internal/modules/cjs/helpers:102:18)
    at Object.<anonymous> (/Users/dom/work/vercel/commerce/site/commerce-config.js:9:14) {
  code: 'MODULE_NOT_FOUND',
  path: '/Users/dom/work/vercel/commerce/node_modules/@vercel/commerce/package.json'
}
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

The error usually occurs when running `pnpm dev` inside of the `/site/` folder after installing a fresh repository.

In order to fix this, run `pnpm build` in the monorepo root folder first.

> Using `pnpm dev` from the root is recommended for developing, which will run watch mode on all packages.

</details>
