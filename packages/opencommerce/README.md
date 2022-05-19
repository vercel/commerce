## Open Commerce Provider

**Preview:** https://commerce-pinkcloudvnn.vercel.app/

We are using this admin interface for demo: https://admin.open-commerce.io/
Storefront API URL: https://api.open-commerce.io/graphql

## Available Features

- Cart
- Search
- Custom Checkout
- Custom Navigation

## Steps to get started:

1. Duplicate `site/.env.template` and rename it to `site/.env.local`
2. Setup env variables related to open commerce provider, something looks like this:

```
COMMERCE_PROVIDER=@vercel/commerce-opencommerce
OPENCOMMERCE_STOREFRONT_API_URL=https://api.open-commerce.io/graphql
OPENCOMMERCE_PRIMARY_SHOP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENCOMMERCE_IMAGE_DOMAIN=api.open-commerce.io
```

**Note**: We can query the primary shop ID from the graphql api playground

3. Run `yarn` and `yarn dev` in the root folder

### Troubleshoot

https://github.com/reactioncommerce/commerce#troubleshoot

For more information about the repository, check out the README file here: https://github.com/reactioncommerce/commerce

## Custom Checkouts

The demo site use [Example Payment Plugin](https://github.com/reactioncommerce/api-plugin-payments-example) for processing payments. To make the checkout flow works as expected, some prerequisite steps need to be handled:

- Add and enable at least one flat-rate shipping option in the admin setting page. By default, we select the first shipping option to create the order
- Enable the `IOU Example` payment method in the admin setting page
- Fill in all the required fields in the `Add Shipping Address` step in the storefront
- After processing checkout, check the orders page in the admin interface to confirm the order has been successfully created

We can also use `Stripe` as the default payment method by following steps:

- Add and enable at least one flat-rate shipping option in the admin setting page. By default, we select the first shipping option to create the order
- Enable the `Stripe (SCA)` payment method in the admin setting page
- Add `OPENCOMMERCE_STRIPE_PUBLIC_API_KEY` env variable to the `site/.env.local` file
- Add `STRIPE_API_KEY` env variable to reaction API `.env` file with the private API key from Stripe
- Modify the `submit-checkout` api endpoint to include additional steps for Stripe payment (eg: create/confirm payment intent, pass payment intent id to placeOrder request body,...).

## Custom Navigation

By default NextJS only display two categories/tags of products in the navbar. This feature enables us to show the organized categories/tags as navigation in the admin to our storefront. Also we can leverage this feature to show URLs that are not relative to the shop (eg: admin page, documentation page, ...). This feature is enabled by default, we can turn it off anytime by modify the value in the `commerce.config.json` file.
