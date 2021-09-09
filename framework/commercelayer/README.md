# Commerce Layer Provider

Before getting started, you should do the following:

- Create a Commerce Layer [developer account](https://commercelayer.io).
- Create a new [organization](https://commercelayer.io/docs/data-model/users-and-organizations/) for your business.
- Create an application with the `sales_channel` kind.

Next, copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/commercelayer/.env.template .env.local
```

Next, add the application credentials from your organization's application dashboard in `.env.local`.

## Checkout

Demo checkout in this provider is powered by the open-sourced [Commmerce Layer Checkout](https://github.com/commercelayer/commercelayer-checkout) application that provides you with a PCI-compliant, PSD2-compliant, and production-ready checkout flow that lets you easily place orders through the Commerce Layer API. In addition, you can set up your checkout app and deploy it to Vercel with one click below:

[![Deploy to Vercel](https://vercel.co/button)](https://vercel.co/new/project?template=https://github.com/commercelayer/commercelayer-checkout)

## Future upgrades

For now, this provider supports a single market. In the future, we would add multi-market support by default so you can add more than one market from your organization to your application. Also, note that the demo is configured to serve a European market; hence you need to checkout with an address in Europe to get the available shipping methods. You can learn more about how to create markets in different categorized geographical regions for your organization [here](https://commercelayer.io/docs/data-model/markets-and-business-models).

## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

If you find an issue with the provider or want a new feature, feel free to open a PR or [create a new issue](https://github.com/vercel/commerce/issues).