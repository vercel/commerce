# [Spree Commerce][1] Provider

![Screenshots of Spree Commerce and NextJS Commerce][5]

An integration of [Spree Commerce](https://spreecommerce.org/) within NextJS Commerce. It supports browsing and searching Spree products and adding products to the cart.

**Demo**: [https://spree.vercel.store/][6]

## Installation

1. Setup Spree - [follow the Getting Started guide](https://dev-docs.spreecommerce.org/getting-started/installation).

1. Setup Nextjs Commerce - [instructions for setting up NextJS Commerce][2].

1. Copy the `.env.template` file in this directory (`/framework/spree`) to `.env.local` in the main directory

   ```bash
   cp framework/spree/.env.template .env.local
   ```

1. Set `NEXT_PUBLIC_SPREE_CATEGORIES_TAXONOMY_PERMALINK` and `NEXT_PUBLIC_SPREE_BRANDS_TAXONOMY_PERMALINK` environment variables:

   - They rely on [taxonomies'](https://dev-docs.spreecommerce.org/internals/products#taxons-and-taxonomies) permalinks in Spree.
   - Go to the Spree admin panel and create `Categories` and `Brands` taxonomies if they don't exist and copy their permalinks into `.env.local` in NextJS Commerce.

1. Finally, run `yarn dev` :tada:

[1]: https://spreecommerce.org/
[2]: https://github.com/vercel/commerce
[3]: https://github.com/spree/spree_starter
[4]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
[5]: ./README-assets/screenshots.png
[6]: https://spree.vercel.store/
