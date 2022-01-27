## Saleor Provider

**Demo:** https://saleor.vercel.store/

You need a [Saleor](https://saleor.io/) instance, either in the cloud or self-hosted.

This provider requires Saleor **3.x** or higher.

Copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp packages/saleor/.env.template .env.local
```

Then, set the environment following variables in your `.env.local`. Both, `NEXT_PUBLIC_SALEOR_API_URL` and `COMMERCE_IMAGE_HOST` must point to your own Saleor instance.

```
COMMERCE_PROVIDER=saleor
NEXT_PUBLIC_SALEOR_API_URL=https://vercel.saleor.cloud/graphql/
NEXT_PUBLIC_SALEOR_CHANNEL=default-channel
COMMERCE_IMAGE_HOST=vercel.saleor.cloud
```
