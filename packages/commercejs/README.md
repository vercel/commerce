# [Commerce.js](https://commercejs.com/) Provider

**Demo:** https://commercejs.vercel.store/

To use this provider you must have a [Commerce.js account](https://commercejs.com/) and you should add some products in the Commerce.js dashboard.

Next, copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/commercejs/.env.template .env.local
```

Then, set the environment variables in `.env.local` to match the ones from your store. You'll need your Commerce.js public API key, which can be found in your Commerce.js dashboard in the `Developer -> API keys` section.
