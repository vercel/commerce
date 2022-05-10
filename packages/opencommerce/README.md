## Open Commerce Provider

**Preview:** https://commerce-pinkcloudvnn.vercel.app/

We are using this admin interface for demo: https://admin.open-commerce.io/
Storefront API URL: https://api.open-commerce.io/graphql

## Available Features

- Cart
- Search
- Custom Checkout

## Steps to get started:

1. Duplicate `site/.env.template` and rename it to `site/.env.local`
2. Setup env variables related to open commerce provider, something looks like this:

```
COMMERCE_PROVIDER=@vercel/commerce-opencommerce
OPENCOMMERCE_STOREFRONT_API_URL=https://api.open-commerce.io
OPENCOMMERCE_PRIMARY_SHOP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENCOMMERCE_IMAGE_DOMAIN=api.open-commerce.io
OPENCOMMERCE_STRIPE_API_KEY=
```

3. Run `yarn` and `yarn dev` in the root folder

### Troubleshoot

https://github.com/reactioncommerce/commerce#troubleshoot

For more information about the repository, check out the README file here: https://github.com/reactioncommerce/commerce
