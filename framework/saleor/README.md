## Saleor Provider

**Demo:** https://saleor.vercel.store/

You need a [Saleor](https://saleor.io/) instance, either in the cloud or self-hosted.

This provider requires Saleor **3.x** or higher.

Copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/saleor/.env.template .env.local
```

Then, set the environment variables in `.env.local` to match the ones from your store.
