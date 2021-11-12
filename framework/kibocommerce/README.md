# Kibo Commerce Provider

If you already have a Kibo Commerce account and want to use your current store, then copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
cp framework/kibocommerce/.env.template .env.local
```

Then, set the environment variables in `.env.local` to match the ones from your store.

```
COMMERCE_PROVIDER='kibocommerce'
KIBO_API_URL= 'https://t1234-s1234.sandbox.mozu.com/graphql'
KIBO_CART_COOKIE='kibo_cart'
KIBO_CUSTOMER_COOKIE='kibo_customer'
KIBO_CLIENT_ID='KIBO.APP.1.0.0.Release'
KIBO_SHARED_SECRET='12345secret'
KIBO_AUTH_URL='https://home.mozu.com'
```

- `KIBO_API_URL` - link to your Kibo Commerce GraphQL API instance.
- `KIBO_CART_COOKIE` - configurable cookie name for cart.
- `KIBO_CUSTOMER_COOKIE` - configurable cookie name for shopper identifier/authentication cookie
- `KIBO_CLIENT_ID` - Unique Application (Client) ID of your Application
- `KIBO_SHARED_SECRET` - Secret API key used to authenticate application/client id. 


Your Kibo Client ID and Shared Secret can be found from your [Kibo eCommerce Dev Center](https://mozu.com/login)

Visit [Kibo documentation](https://apidocs.kibong-perf.com/?spec=graphql#auth) for more details on API authentication

Based on the config, this integration will handle Authenticating your application against the Kibo API using the Kibo Client ID and Kibo Shared Secret.
## Contribute

Our commitment to Open Source can be found [here](https://vercel.com/oss).

If you find an issue with the provider or want a new feature, feel free to open a PR or [create a new issue](https://github.com/vercel/commerce/issues).
