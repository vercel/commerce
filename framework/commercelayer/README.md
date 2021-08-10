# Commerce Layer Provider

⚠️ This provider is still a work in progress.

Before getting started, you should do the following:

- Create a Commerce Layer [developer account](https://commercelayer.io).
- Create a new [organization](https://commercelayer.io/docs/data-model/users-and-organizations/) for your business.
- Create an application with `sales_channel` kind.

Next, copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/commercelayer/.env.template .env.local
```

Next, add the application credentials from your organization application dashboard in `.env.local`.

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

If you find an issue with the provider or want a new feature, feel free to open a PR or [create a new issue](https://github.com/vercel/commerce/issues).