## Commercetools Provider

**Demo:** https://saleor.vercel.store/

## Installation

1. Copy the `.env.template` file in this directory to `/site/.env.local` in the main directory
2. Set the environment following variables in your `.env.local`.

```
COMMERCE_PROVIDER=saleor
NEXT_PUBLIC_SALEOR_API_URL=https://vercel.saleor.cloud/graphql/
NEXT_PUBLIC_SALEOR_CHANNEL=default-channel
COMMERCE_IMAGE_HOST=vercel.saleor.cloud
```

3. Run `yarn` and then `yarn dev` in root folder

## Features:

```json
{
  "provider": "commercetools",
  "features": {
    "wishlist": true,
    "cart": true,
    "search": true,
    "customerAuth": true,
    "customCheckout": false
  }
}
```

## References

- API: https://docs.commercetools.com/api/
- SDK: https://docs.commercetools.com/sdk/javascript-sdk
