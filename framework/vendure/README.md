# Vendure Storefront Data Hooks

UI hooks and data fetching methods built from the ground up for e-commerce applications written in React, that use [Vendure](http://vendure.io/) as a headless e-commerce platform.

## Usage

#### 1. Running a local Vendure server

1. Install Vendure locally with one command:
   ```shell
   npx @vendure/create my-app
   ```
   (See the [Vendure getting started guide](https://www.vendure.io/docs/getting-started/) for more info).
2. Once you have Vendure set up, change the default port to something other than 3000, to avoid conflict with your Next.js Commerce dev server:
   ```TypeScript
   // my-app/src/vendure-config.ts
   export const config: VendureConfig = {
       apiOptions: {
           port: 3001,  // <----- here
           adminApiPath: 'admin-api',
           // ...
       }
   };
   ```
3. Start your local Vendure server
   ```shell
   yarn start
   ```

### 2. Set up the Commerce storefront

1. Clone this repo and install its dependencies with `yarn install` or `npm install`
2. Set the Vendure provider and API URL in your `.env.local` file:
   ```
   COMMERCE_PROVIDER=vendure
   NEXT_PUBLIC_VENDURE_SHOP_API_URL=http://localhost:3001/shop-api
   ```
3. With the Vendure server running, start this project using `yarn dev` or `npm run dev`.

## Known Limitations

1. Vendure does not ship with built-in wishlist functionality.
2. Nor does it come with any kind of blog/page-building feature. Both of these can be created as Vendure plugins, however.
3. The entire Vendure customer flow is carried out via its GraphQL API. This means that there is no external, pre-existing checkout flow. The checkout flow must be created as part of the Next.js app. See https://github.com/vercel/commerce/issues/64 for further discusion.
4. By default, the sign-up flow in Vendure uses email verification. This means that using the existing "sign up" flow from this project will not grant a new user the ability to authenticate, since the new account must first be verified. Again, the necessary parts to support this flow can be created as part of the Next.js app.

## Code generation

This provider makes use of GraphQL code generation. The [schema.graphql](./schema.graphql) and [schema.d.ts](./schema.d.ts) files contain the generated types & schema introspection results.

When developing the provider, changes to any GraphQL operations should be followed by re-generation of the types and schema files:

From the project root dir, run

```sh
graphql-codegen --config ./framework/vendure/codegen.json
```
