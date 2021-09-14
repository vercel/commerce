<p align="center">
  <a href="https://www.medusa-commerce.com">
    <img alt="Medusa" src="https://user-images.githubusercontent.com/7554214/129161578-19b83dc8-fac5-4520-bd48-53cba676edd2.png" width="100" />
  </a>
</p>
<h1 align="center">
  Medusa Provider
</h1>
<p align="center">
Medusa is an open-source headless commerce engine that enables developers to create amazing digital commerce experiences.
</p>
<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Medusa is released under the MIT license." />
  </a>
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

## Demo

You can view a working demo of the Medusa provider for Next.js Commerce at https://medusa-provider.vercel.app/

## Quickstart

You need a [Medusa](https://medusa-commerce.com/) instance, either in the cloud or self-hosted.

Clone this repo and install dependencies using `yarn` or `npm install`

Copy the `.env.template` file in this directory to `.env.local` in the main directory (which will be ignored by Git):

```bash
mv framework/medusa/.env.template .env.local
```

Then, set the environment following variables in your `.env.local`.

- `NEXT_PUBLIC_MEDUSA_STORE_URL` must point to the URL where your Medusa instance is running.

- `NEXT_PUBLIC_MEDUSA_IMAGE_HOST` must point to your image hosting service.

```
COMMERCE_PROVIDER=medusa
NEXT_PUBLIC_MEDUSA_STORE_URL=https://medusa-demo.store
NEXT_PUBLIC_MEDUSA_IMG_HOST=medusa-public-images.s3.eu-west-1.amazonaws.com
```

## Notes

- The entire customer flow is carried out using the [Storefront API](https://docs.medusa-commerce.com/api/store). This means that there is no existing, pre-built checkout flow. The checkout flow must be built using the `Storefront API`, for an example of how to do this feel free to have a look at our [Next.js](https://github.com/medusajs/gatsby-starter-medusa) starter project.

- `Medusa` does not come with any page/blog building feature. This can be implemented using `Medusa` in conjunction with a CMS such as `Contentful`. For inspiration on how to do this check out our [Contentful starter](https://github.com/medusajs/medusa-starter-contentful)
